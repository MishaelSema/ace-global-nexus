import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { connectDB } from "@/lib/mongodb";
import Insight from "@/models/Insight";
import { cloudImageUrl, formatDate } from "@/lib/utils";
import { BRAND_IMAGE } from "@/lib/content";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, SITE_NAME, OG_IMAGE_DEFAULT, canonical, breadcrumbSchema, articleSchema } from "@/lib/seo";
import { tForLocale, pathForLocale, getLocale } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = getLocale();
  let title = "Insight | ACE Global Nexus";
  let description = "";
  let coverUrl: string | undefined;
  let publishedAt: Date | undefined;
  try {
    await connectDB();
    const insight = await Insight.findOne({ slug }).select("title excerpt category coverUrl publishedAt").lean();
    if (insight) {
      title = insight.title;
      description = insight.excerpt || "";
      coverUrl = insight.coverUrl;
      publishedAt = insight.publishedAt;
    }
  } catch {
    // fall through
  }
  const image = coverUrl ? cloudImageUrl(coverUrl, 1200) : `${SITE_URL}${OG_IMAGE_DEFAULT}`;
  const path = `/insights/${slug}`;
  return {
    // absolute: article titles carry the brand suffix already — skip the layout template.
    title: { absolute: title },
    description,
    ...canonical(path, locale),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${locale === "fr" ? `/fr${path}` : path}`,
      type: "article",
      siteName: SITE_NAME,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      publishedTime: publishedAt?.toISOString(),
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function InsightDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const t = tForLocale();
  const p = pathForLocale();

  interface InsightDetail {
    title: string;
    slug: string;
    excerpt?: string;
    content?: string;
    category: string;
    tags?: string[];
    coverUrl?: string;
    author: string;
    publishedAt?: Date;
  }

  let insight: InsightDetail | null = null;
  try {
    await connectDB();
    insight = await Insight.findOne({ slug, published: true, publishedAt: { $exists: true } })
      .select("-coverPublicId -updatedAt")
      .lean();
  } catch (e) {
    console.error("Insight detail error:", e);
  }

  if (!insight) notFound();

  return (
    <article className="bg-white pb-24">
      <JsonLd
        data={[
          breadcrumbSchema(
            [
              { name: "Home", path: "/" },
              { name: "Insights", path: "/insights" },
              { name: insight.title, path: `/insights/${insight.slug}` },
            ],
            getLocale()
          ),
          articleSchema(
            {
              title: insight.title,
              slug: insight.slug,
              excerpt: insight.excerpt,
              coverUrl: insight.coverUrl ? cloudImageUrl(insight.coverUrl, 1200) : undefined,
              author: insight.author,
              publishedAt: insight.publishedAt,
              category: insight.category,
            },
            getLocale()
          ),
        ]}
      />
      {/* Full-bleed cover header */}
      <section className="relative flex min-h-[72vh] items-end overflow-hidden bg-primary">
        <img
          src={insight.coverUrl ? cloudImageUrl(insight.coverUrl, 1920) : BRAND_IMAGE}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/30" />

        <div className="container-site relative pb-16 pt-40">
          <Link href={p("/insights")} className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-gold">
            <FaArrowLeft size={12} /> {t("All insights")}
          </Link>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary-dark">
              {insight.category}
            </span>
            <span className="text-xs text-white/60">{insight.publishedAt ? formatDate(insight.publishedAt) : ""}</span>
            <span className="text-xs text-white/60">{insight.author}</span>
          </div>

          <h1 className="mt-6 max-w-4xl font-serif text-3xl font-bold leading-tight text-white sm:text-5xl">
            {insight.title}
          </h1>
        </div>
      </section>

      <div className="container-site">
        <div className="mx-auto max-w-3xl">
          {insight.excerpt ? (
            <p className="mt-12 border-l-2 border-gold pl-6 font-serif text-xl leading-relaxed text-primary sm:text-2xl">
              {insight.excerpt}
            </p>
          ) : null}

          <div className="prose-agn mt-10">
            {insight.content ? (
              <ReactMarkdown>{insight.content}</ReactMarkdown>
            ) : (
              <p className="text-gray-500">{t("Full article coming soon.")}</p>
            )}
          </div>

          {insight.tags && insight.tags.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2 border-t border-gray-100 pt-8">
              {insight.tags.map((tag: string) => (
                <span key={tag} className="rounded-full border border-gray-100 bg-cream px-3 py-1 text-xs font-medium text-primary/70">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="relative mt-16 overflow-hidden rounded-3xl bg-primary px-8 py-14 text-center sm:px-14">
            <img
              src={BRAND_IMAGE}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary" />
            <div className="relative">
              <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">{t("Let's discuss your opportunity")}</h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/65">
                {t(
                  "If this insight speaks to a market, sector or partnership you are exploring, our team would be glad to help."
                )}
              </p>
              <Link href={p("/contact")} className="btn-primary mt-7">
                {t("Contact ACE Global Nexus")} <FaArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}