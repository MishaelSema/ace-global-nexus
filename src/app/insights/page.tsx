import type { Metadata } from "next";
import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Insight from "@/models/Insight";
import InsightCard from "@/components/InsightCard";
import { INSIGHT_CATEGORIES } from "@/lib/content";
import PageHero from "@/components/PageHero";
import Statement from "@/components/Statement";
import JsonLd from "@/components/JsonLd";
import { localizedPageMeta, breadcrumbSchema } from "@/lib/seo";
import { tForLocale, pathForLocale, getLocale } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = getLocale();
  return localizedPageMeta({
    path: "/insights",
    locale,
    en: {
      title: "Insights on African Trade & Investment | ACE Global Nexus",
      description:
        "Practical market intelligence on doing business in Africa – trade, investment, AfCFTA, export and sector analysis from ACE Global Nexus, Yaoundé, Cameroon.",
    },
    fr: {
      title: "Analyses sur le Commerce & l'Investissement en Afrique | ACE Global Nexus",
      description:
        "Intelligence économique pratique pour faire des affaires en Afrique : commerce, investissement, ZLECAf, exportation et analyses sectorielles d'ACE Global Nexus, Yaoundé, Cameroun.",
    },
  });
}

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
  const t = tForLocale();
  const p = pathForLocale();
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
          breadcrumbSchema(
            [
              { name: "Home", path: "/" },
              { name: "Insights", path: "/insights" },
            ],
            getLocale()
          ),
        ]}
      />
      <PageHero
        title={
          <>
            {t("Practical market intelligence,")}
            <br className="hidden sm:block" /> <span className="italic text-gold">{t("from experience and research")}</span>
          </>
        }
        description={t(
          "Trade, investment, entrepreneurship, agribusiness and doing business in Africa — written to be read, acted on and shared."
        )}
      />

      <section className="bg-white py-20 sm:py-24">
        <div className="container-site">
          <div className="flex flex-wrap gap-2">
            <Link
              href={p("/insights")}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                !category ? "bg-gold text-primary-dark" : "border border-gray-100 bg-cream text-primary/70 hover:bg-gold/15"
              }`}
            >
              {t("All")}
            </Link>
            {INSIGHT_CATEGORIES.map((c) => (
              <Link
                key={c}
                href={`${p("/insights")}?category=${encodeURIComponent(c)}`}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  category === c ? "bg-gold text-primary-dark" : "border border-gray-100 bg-cream text-primary/70 hover:bg-gold/15"
                }`}
              >
                {t(c)}
              </Link>
            ))}
          </div>

          {insights.length === 0 ? (
            <div className="my-16 rounded-3xl border border-dashed border-gray-200 px-8 py-20 text-center">
              <p className="font-serif text-2xl font-bold text-primary">{t("No insights published yet")}</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                {category ? (
                  <>
                    {t("There are no articles in")} “{category}” {t("yet — check the other categories or come back soon.")}
                  </>
                ) : (
                  t("Check back soon for fresh, practical market intelligence.")
                )}
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