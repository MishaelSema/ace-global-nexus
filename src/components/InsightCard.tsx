import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { cloudImageUrl, formatDate } from "@/lib/utils";
import { BRAND_IMAGE } from "@/lib/content";
import { tForLocale } from "@/lib/i18n/server";

export interface InsightPreview {
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

export default function InsightCard({ insight }: { insight: InsightPreview }) {
  const t = tForLocale();
  return (
    <Link
      href={`/insights/${insight.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-colors duration-300 hover:border-gold/50"
    >
      <div className="relative h-48 overflow-hidden bg-primary sm:h-52">
        <img
          src={insight.coverUrl ? cloudImageUrl(insight.coverUrl, 900) : BRAND_IMAGE}
          alt={insight.title}
          className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute left-4 top-4 rounded-full bg-primary/85 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-gold backdrop-blur-sm">
          {insight.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs text-gray-400">
          {insight.publishedAt ? formatDate(insight.publishedAt) : ""}
          {insight.author ? <span> · {insight.author}</span> : null}
        </p>
        <h3 className="mt-2 font-serif text-lg font-bold leading-snug text-primary transition-colors group-hover:text-gold-dark">
          {insight.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-500">
          {insight.excerpt || t("Read this insight from ACE Global Nexus.")}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-dark">
          {t("Read article")} <FaArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}