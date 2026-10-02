// `/fr/insights/[slug]` is its own segment, so the boundary declared on the
// English route doesn't reach it — re-export rather than fall back to the root
// 404. `generateMetadata` is re-exported too: it reads the locale off the
// request header, so this serves a French `<title>` on the French site.
export { default, generateMetadata } from "../../../insights/[slug]/not-found";