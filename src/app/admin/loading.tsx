import { SkeletonRegion, SkeletonListRows } from "@/components/Skeleton";
import { tForLocale } from "@/lib/i18n/server";

/**
 * The admin sits under the same root layout, so without its own loading file it
 * would flash the marketing hero skeleton while the dashboard streammed in.
 */
export default function LoadingAdmin() {
  const t = tForLocale();

  return (
    <SkeletonRegion label={t("Loading…")} className="min-h-screen bg-cream">
      <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8">
        <SkeletonListRows count={5} />
      </div>
    </SkeletonRegion>
  );
}
