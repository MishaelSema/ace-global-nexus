import type { MetadataRoute } from "next";
import { connectDB } from "@/lib/mongodb";
import Insight from "@/models/Insight";
import { SITE_URL } from "@/lib/seo";

// Revalidate the cached sitemap every 6h (avoids a DB hit on every crawl).
export const revalidate = 21600;

const PAGE_LAST_MODIFIED = new Date();

/** Public marketing routes — mirrored in French under /fr with hreflang alternates. */
const LOCALIZED_ROUTES = [
  "",
  "/services",
  "/sectors",
  "/about",
  "/insights",
  "/contact",
  "/start-a-conversation",
];

/** Legal pages are fully localized too — /legal/* and /fr/legal/* both exist. */
const LEGAL_ROUTES = ["/legal/terms", "/legal/privacy", "/legal/cookies"];

/** Build one sitemap entry with en/fr/x-default hreflang alternates. */
function alternates(path: string) {
  const enUrl = `${SITE_URL}${path}`;
  const frUrl = `${SITE_URL}/fr${path}`;
  return {
    en: enUrl,
    fr: frUrl,
    "x-default": enUrl,
  };
}

/**
 * Every locale gets its own <url> entry carrying the full hreflang set.
 * Google requires each version to list itself and all other versions
 * (reciprocal annotations), so a single clustered entry is not enough.
 */
function mirrored(path: string, lastModified: Date): MetadataRoute.Sitemap {
  const langs = alternates(path);
  return [langs.en, langs.fr].map((url) => ({
    url,
    lastModified,
    alternates: { languages: langs },
  }));
}

/** Flatten the per-locale entries produced by mirrored(). */
function flat(entries: MetadataRoute.Sitemap[]): MetadataRoute.Sitemap {
  return entries.flat();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Google ignores <priority> and <changefreq> — only stable lastModified is included.
  const localizedEntries = flat(LOCALIZED_ROUTES.map((path) => mirrored(path, PAGE_LAST_MODIFIED)));

  const legalEntries = flat(LEGAL_ROUTES.map((path) => mirrored(path, PAGE_LAST_MODIFIED)));

  let insightEntries: MetadataRoute.Sitemap = [];
  try {
    await connectDB();
    const docs = await Insight.find({ published: true, publishedAt: { $exists: true } })
      .select("slug publishedAt updatedAt")
      .lean<Array<{ slug: string; publishedAt?: Date; updatedAt?: Date }>>();

    insightEntries = flat(
      docs.map((d) => mirrored(`/insights/${d.slug}`, d.updatedAt || d.publishedAt || PAGE_LAST_MODIFIED))
    );
  } catch (error) {
    // Keep the static routes alive if the database is unreachable.
    console.error("Sitemap: insight lookup failed, serving static routes only.", error);
  }

  return [...legalEntries, ...localizedEntries, ...insightEntries];
}