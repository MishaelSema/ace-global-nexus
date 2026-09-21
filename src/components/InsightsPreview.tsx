"use client";

import { useEffect, useState } from "react";
import InsightCard, { InsightPreview } from "@/components/InsightCard";

export default function InsightsPreview() {
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
      <div className="grid place-items-center py-20 text-primary/25">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent" />
      </div>
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