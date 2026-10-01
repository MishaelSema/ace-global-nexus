import {
  SkeletonArticleBody,
  SkeletonArticleHero,
  SkeletonRegion,
} from "@/components/Skeleton";
import { tForLocale } from "@/lib/i18n/server";

/** Article detail — also MongoDB-backed, so it gets its own loading state. */
export default function LoadingInsight() {
  const t = tForLocale();

  return (
    <SkeletonRegion label={t("Loading articles…")}>
      <div className="bg-white pb-24">
        <SkeletonArticleHero />
        <SkeletonArticleBody />
      </div>
    </SkeletonRegion>
  );
}
