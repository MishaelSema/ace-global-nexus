import type { MetadataRoute } from "next";
import { connectDB } from "@/lib/mongodb";
import Insight from "@/models/Insight";
import { SITE_URL } from "@/lib/seo";

// Revalidate the cached sitemap every 6h (avoids a DB hit on every crawl).
export const revalidate = 21600;

const PAGE_LAST_MODIFIED = new Date();

const STATIC_ROUTES = [
  "",
  "/services",
  "/sectors",
  "/about",
  "/insights",
  "/contact",
  "/start-a-conversation",
  "/legal/terms",
  "/legal/privacy",
  "/legal/cookies",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_URL;

  // Google ignores <priority> and <changefreq> — only stable lastModified is included.
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${base}${path}`,
    lastModified: PAGE_LAST_MODIFIED,
  }));

  let insightEntries: MetadataRoute.Sitemap = [];
  try {
    await connectDB();
    const docs = await Insight.find({ published: true, publishedAt: { $exists: true } })
      .select("slug publishedAt updatedAt")
      .lean<Array<{ slug: string; publishedAt?: Date; updatedAt?: Date }>>();

    insightEntries = docs.map((d) => ({
      url: `${base}/insights/${d.slug}`,
      lastModified: d.updatedAt || d.publishedAt || PAGE_LAST_MODIFIED,
    }));
  } catch (error) {
    // Keep the static routes alive if the database is unreachable.
    console.error("Sitemap: insight lookup failed, serving static routes only.", error);
  }

  return [...staticEntries, ...insightEntries];
}