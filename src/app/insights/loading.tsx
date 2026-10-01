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
