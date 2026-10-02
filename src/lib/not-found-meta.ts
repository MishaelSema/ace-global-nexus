import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n/server";
import { SITE_NAME } from "@/lib/seo";

/**
 * Metadata for the 404 boundaries.
 *
 * A `not-found.tsx` must set this itself. When `notFound()` throws, the page's
 * own `generateMetadata` is discarded and Next falls back to the root layout's
 * static metadata — so without this, every bad `/insights/*` URL answered with
 * the *homepage* title, description, og:title and twitter:title. Duplicate
 * titles across unbounded URLs is its own soft-404 signal.
 *
 * `robots: noindex` is belt-and-braces on top of the real 404 status: if the
 * status is ever lost again (a `loading.tsx` creeping back in above
 * `/insights/[slug]` would do it), the page still refuses to be indexed.
 *
 * Exported as a `generateMetadata` factory rather than a static `metadata`
 * object so the French site does not serve an English `<title>` over French
 * body copy.
 */
export function notFoundMetadata(what: "page" | "article"): Metadata {
  const fr = getLocale() === "fr";

  const title = fr
    ? `Page introuvable | ${SITE_NAME}`
    : `Page not found | ${SITE_NAME}`;

  const description =
    what === "article"
      ? fr
        ? "L'article demandé est introuvable."
        : "The requested article could not be found."
      : fr
        ? "La page demandée est introuvable."
        : "The requested page could not be found.";

  return {
    // absolute: opt out of the layout's title template, which would append "| ACE
    // Global Nexus" a second time.
    title: { absolute: title },
    description,
    robots: { index: false, follow: true },
    // Overridden explicitly so the layout's homepage Open Graph does not leak.
    openGraph: { title, description, siteName: SITE_NAME, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}