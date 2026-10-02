import {
  SkeletonCardGrid,
  SkeletonChips,
  SkeletonHero,
  SkeletonRegion,
} from "@/components/Skeleton";
import { tForLocale } from "@/lib/i18n/server";

/**
 * The insights index waits on a MongoDB query, so it gets its own loading file
 * that matches the real page: hero, category pills, then the card grid.
 *
 * This file lives inside the `(index)` route group on purpose. A `loading.tsx`
 * at `src/app/insights/` would sit *above* `src/app/insights/[slug]/page.tsx`
 * and wrap the article route in a Suspense boundary — which flushes a `200` to
 * the client before the slug lookup has run, turning every unknown slug into a
 * soft 404. Keeping the skeleton inside a group that is a sibling of `[slug]`
 * scopes it to the listing only. See the note in `[slug]/page.tsx`.
 */
export default function LoadingInsights() {
  const t = tForLocale();

  return (
    <SkeletonRegion label={t("Loading articles…")}>
      <SkeletonHero />

      <section className="bg-white py-20 sm:py-24">
        <div className="container-site">
          <SkeletonChips />
          <div className="mt-14">
            <SkeletonCardGrid count={6} />
          </div>
        </div>
      </section>
    </SkeletonRegion>
  );
}