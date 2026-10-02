import NotFoundBody from "@/components/NotFoundBody";
import { notFoundMetadata } from "@/lib/not-found-meta";

/**
 * Root 404, used for URLs that match no route at all.
 *
 * The metadata lives here because a `not-found.tsx` has to supply its own — see
 * `notFoundMetadata` for why. The article side has its own boundary at
 * `src/app/insights/[slug]/not-found.tsx`.
 */
export function generateMetadata() {
  return notFoundMetadata("page");
}

export default function NotFound() {
  return <NotFoundBody />;
}