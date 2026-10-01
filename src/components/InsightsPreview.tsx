"use client";

import { useEffect, useState } from "react";
import InsightCard, { InsightPreview } from "@/components/InsightCard";
import { SkeletonCardGrid, SkeletonRegion } from "@/components/Skeleton";
import { useLocale } from "@/components/LocaleProvider";

export default function InsightsPreview() {
  const { t } = useLocale();
  const [insights, setInsights] = useState<InsightPreview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/insights?limit=3")
      .then((r) => r.json())
      .then((d) => setInsights(d.success ? d.data : []))
      .catch(() => setInsights([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <SkeletonRegion label={t("Loading…")}>
        <SkeletonCardGrid count={3} />
      </SkeletonRegion>
    );
  }

  if (insights.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="font-serif text-2xl font-bold text-primary">Fresh insights are on the way.</p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-500">
          Practical market intelligence on African trade, investment and doing business — coming soon.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {insights.map((insight) => (
        <InsightCard key={insight._id} insight={insight} />
      ))}
    </div>
  );
}