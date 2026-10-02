// `/fr/insights/[slug]` has no generator of its own, so re-export the English
// one. It resolves the locale from the `x-locale` request header, so the
// headline it renders is already the French title — no separate implementation
// needed.
//
// `alt` is read statically at build time and cannot come from the header, so it
// is declared here rather than inherited from the English file.
import Image from "../../../insights/[slug]/opengraph-image";

export const alt = "Article d'analyse ACE Global Nexus";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated on demand (avoids a static-prerender edge case in Next 14.2).
export const dynamic = "force-dynamic";

export default Image;