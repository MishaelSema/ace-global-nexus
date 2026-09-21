import type { Metadata } from "next";
import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Insight from "@/models/Insight";
import InsightCard from "@/components/InsightCard";
import { INSIGHT_CATEGORIES } from "@/lib/content";
import PageHero from "@/components/PageHero";
import Statement from "@/components/Statement";
import JsonLd from "@/components/JsonLd";
import { canonical, openGraphMeta, breadcrumbSchema } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Insights on African Trade & Investment | ACE Global Nexus",
  description:
    "Practical market intelligence on doing business in Africa – trade, investment, AfCFTA, export and sector analysis from ACE Global Nexus, Yaoundé, Cameroon.",
  ...canonical("/insights"),
  ...openGraphMeta(
    "/insights",
    "Insights on African Trade & Investment | ACE Global Nexus",
    "Practical market intelligence on doing business in Africa – trade, investment, AfCFTA, export and sector analysis from ACE Global Nexus, Yaoundé, Cameroon."
  ),
};

export default async function InsightsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  interface InsightListItem {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    tags: string[];
    coverUrl?: string;
    author: string;
    publishedAt?: string;
  }

  const category = searchParams.category;
  let insights: InsightListItem[] = [];

  try {
    await connectDB();
    const filter: { published: boolean; publishedAt: { $exists: boolean }; category?: string } = {
      published: true,
      publishedAt: { $exists: true },
    };
    if (category) filter.category = category;
    const docs = await Insight.find(filter)
      .sort({ publishedAt: -1, createdAt: -1 })
      .select("-content -coverPublicId -published -updatedAt")
      .lean();
    insights = docs.map((d) => ({
      ...d,
      _id: d._id.toString(),
      publishedAt: d.publishedAt ? d.publishedAt.toISOString() : undefined,
    }));
  } catch (e) {
    console.error("Insights page error:", e);
  }

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
          ]),
        ]}
      />
      <PageHero
        title={
          <>
            Practical market intelligence,
            <br className="hidden sm:block" /> <span className="italic text-gold">from experience and research</span>
          </>
        }
        description="Trade, investment, entrepreneurship, agribusiness and doing business in Africa — written to be read, acted on and shared."
      />

      <section className="bg-white py-20 sm:py-24">
        <div className="container-site">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/insights"
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                !category ? "bg-gold text-primary-dark" : "border border-gray-100 bg-cream text-primary/70 hover:bg-gold/15"
              }`}
            >
              All
            </Link>
            {INSIGHT_CATEGORIES.map((c) => (
              <Link
                key={c}
                href={`/insights?category=${encodeURIComponent(c)}`}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  category === c ? "bg-gold text-primary-dark" : "border border-gray-100 bg-cream text-primary/70 hover:bg-gold/15"
                }`}
              >
                {c}
              </Link>
            ))}
          </div>

          {insights.length === 0 ? (
            <div className="my-16 rounded-3xl border border-dashed border-gray-200 px-8 py-20 text-center">
              <p className="font-serif text-2xl font-bold text-primary">No insights published yet</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                {category
                  ? `There are no articles in “${category}” yet — check the other categories or come back soon.`
                  : "Check back soon for fresh, practical market intelligence."}
              </p>
            </div>
          ) : (
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {insights.map((insight) => (
                <InsightCard key={String(insight._id)} insight={insight} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Statement word="INSIGHT" sub="Practical market intelligence — read it, act on it, share it." />
    </>
  );
}