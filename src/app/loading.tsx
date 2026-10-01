import {
  Skeleton,
  SkeletonCardGrid,
  SkeletonHero,
  SkeletonRegion,
  SkeletonText,
} from "@/components/Skeleton";
import { tForLocale } from "@/lib/i18n/server";

/**
 * Shown while the router streams in a page. The root layout is untouched during
 * a navigation, so the header and footer stay put and only the page area is
 * replaced — which is exactly why this was worth adding: every route is
 * `force-dynamic`, so a navigation always waits on a server round trip.
 *
 * Mirrors the shared page shape (hero + copy + card grid) rather than any one
 * page, so it reads as "the site is working" instead of a misleading guess at
 * the content that's coming.
 */
export default function Loading() {
  const t = tForLocale();

  return (
    <SkeletonRegion label={t("Loading page…")}>
      <SkeletonHero />

      <section className="bg-white py-20 sm:py-24">
        <div className="container-site">
          <div className="mx-auto max-w-2xl">
            <Skeleton className="h-3 w-24 rounded-full" />
            <Skeleton className="mt-4 h-8 w-3/4 rounded" />
            <div className="mt-5">
              <SkeletonText lines={3} />
            </div>
          </div>
          <div className="mt-14">
            <SkeletonCardGrid count={3} />
          </div>
        </div>
      </section>
    </SkeletonRegion>
  );
}
