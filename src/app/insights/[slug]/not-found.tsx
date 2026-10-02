import NotFoundBody from "@/components/NotFoundBody";
import { notFoundMetadata } from "@/lib/not-found-meta";

/**
 * 404 boundary for a bad article slug.
 *
 * This boundary has to exist at the `[slug]` segment rather than relying on the
 * root `src/app/not-found.tsx`. With only the root boundary, `notFound()` thrown
 * from this page did not reliably render the site's 404 page — Next fell back
 * to a bare error document. Declaring it here pins the behaviour to this route.
 *
 * It does not reintroduce the soft 404: a `not-found.tsx` is not a Suspense
 * boundary, so nothing is streamed ahead of the slug lookup. There must still
 * never be a `loading.tsx` at this segment or above it — see the note in
 * `page.tsx`.
 */
export function generateMetadata() {
  return notFoundMetadata("article");
}

export default function NotFoundInsight() {
  return <NotFoundBody />;
}