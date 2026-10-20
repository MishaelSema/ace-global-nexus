import { SERVICES, SECTORS, CONTACT_INFO, FOUNDER } from "@/lib/content";
import { translate, ogLocale, type Locale } from "@/lib/i18n/core";
import { localizedPath } from "@/lib/i18n/path";

/** Base site URL — configurable via env, defaults to the production domain. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.aceglobalnexus.com").replace(/\/+$/, "");

export const SITE_NAME = "ACE Global Nexus";

export const SITE_SLOGAN = "Connecting businesses, markets & opportunity.";

export const OG_IMAGE_DEFAULT = "/opengraph-image.png";

/**
 * Self-referencing canonical metadata for a route, with the full set of
 * hreflang alternates (en, fr, x-default) pointing at real URLs.
 *
 * The URLs are emitted absolute rather than site-relative on purpose.
 * SITE_URL has no trailing slash, so letting Next resolve the paths against
 * metadataBase was producing two different URLs for the same page — for `/`
 * the canonical resolved to `…/` while the `en` and `x-default` hreflangs
 * resolved to the bare origin. Google treats those as one URL, so it was never
 * a ranking bug, but an hreflang set that is not byte-identical to the
 * canonical is needless ambiguity. Absolute URLs remove the guesswork.
 */
export function canonical(path: string, locale: Locale = "en") {
  const url = (loc: Locale) => `${SITE_URL}${localizedPath(path, loc)}`;
  return {
    alternates: {
      canonical: url(locale),
      languages: {
        en: url("en"),
        fr: url("fr"),
        "x-default": url("en"),
      },
    },
  };
}

interface OpenGraphOptions {
  /**
   * Social card override. Omit for the shared brand card; pass `null` to emit no
   * `images` at all so Next falls back to the route's file-based
   * `opengraph-image.tsx` generator. (Setting `images` — on either `openGraph`
   * or `twitter` — suppresses that file convention, so a route that ships its
   * own card must leave both unset.)
   */
  image?: string | null;
}

/** Page-level Open Graph meta (locale-aware URL + og:locale). */
export function openGraphMeta(
  path: string,
  title: string,
  description: string,
  locale: Locale = "en",
  { image }: OpenGraphOptions = {}
) {
  const card = image === undefined ? `${SITE_URL}${OG_IMAGE_DEFAULT}` : image;
  return {
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${localizedPath(path, locale)}`,
      type: "website" as const,
      locale: ogLocale(locale),
      locales: ["en_US", "fr_FR"],
      siteName: SITE_NAME,
      ...(card ? { images: [{ url: card, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      ...(card ? { images: [card] } : {}),
    },
  };
}

/** Full localized page metadata: title, description, canonical, hreflang & Open Graph. */
export function localizedPageMeta({
  path,
  locale,
  en,
  fr,
  image,
}: {
  path: string;
  locale: Locale;
  en: { title: string; description: string };
  fr: { title: string; description: string };
  image?: string | null;
}) {
  const copy = locale === "fr" ? fr : en;
  return {
    // absolute: our titles already include the brand suffix, so opt out of the
    // root layout's title template and prevent double-branded <title> tags.
    title: { absolute: copy.title },
    description: copy.description,
    ...canonical(path, locale),
    ...openGraphMeta(path, copy.title, copy.description, locale, { image }),
  };
}

// ---------------------------------------------------------------------------
// JSON-LD structured data
// ---------------------------------------------------------------------------

/** Organization — injected site-wide from the root layout. */
export function organizationSchema(locale: Locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/ACEGLOBALNEXUS_ICON_with_name.png`,
    image: `${SITE_URL}${OG_IMAGE_DEFAULT}`,
    email: CONTACT_INFO.emailPrimary,
    telephone: CONTACT_INFO.phone.replace(/\s/g, ""),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Yaoundé",
      addressCountry: "CM",
    },
    areaServed: ["Cameroon", "Africa", "Central Africa", "International Markets"],
    description: translate(
      locale,
      "A global trade, investment and strategic advisory firm connecting businesses, investors and opportunities across Africa and the international marketplace."
    ),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: CONTACT_INFO.phone.replace(/\s/g, ""),
      email: CONTACT_INFO.emailPrimary,
      availableLanguage: ["English", "French"],
    },
    founder: personSchema(locale),
  };
}

/** WebSite — homepage only. */
export function webSiteSchema(locale: Locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: `${SITE_URL}${localizedPath("", locale)}`,
    inLanguage: locale === "fr" ? "fr" : "en",
  };
}

/** ProfessionalService (LocalBusiness) — homepage only. */
export function professionalServiceSchema(locale: Locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    name: SITE_NAME,
    url: `${SITE_URL}${localizedPath("", locale)}`,
    image: `${SITE_URL}${OG_IMAGE_DEFAULT}`,
    telephone: CONTACT_INFO.phone.replace(/\s/g, ""),
    email: CONTACT_INFO.emailPrimary,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Yaoundé",
      addressCountry: "CM",
    },
    areaServed: ["Cameroon", "Africa", "Central Africa", "International Markets"],
    priceRange: "$$",
    inLanguage: locale === "fr" ? "fr" : "en",
    founder: personSchema(locale),
  };
}

/** OfferCatalog of the advisory services — homepage + services pages. */
export function serviceCatalogSchema(locale: Locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: translate(locale, "Advisory Services"),
    url: `${SITE_URL}${localizedPath("/services", locale)}`,
    itemListElement: SERVICES.map((s, i) => ({
      "@type": "Service",
      position: i + 1,
      name: translate(locale, s.title),
      description: translate(locale, s.description),
      serviceType: translate(locale, s.title),
      provider: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
      areaServed: ["Cameroon", "Africa", "International Markets"],
    })),
  };
}

/** Founder Person schema — about page. */
export function personSchema(locale: Locale = "en") {
  return {
    "@type": "Person",
    name: FOUNDER.name,
    jobTitle: [translate(locale, FOUNDER.title), translate(locale, FOUNDER.role)],
    url: `${SITE_URL}${localizedPath("/about", locale)}`,
    worksFor: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    inLanguage: locale === "fr" ? "fr" : "en",
    description: translate(locale, FOUNDER.credentials),
  };
}

/** Breadcrumbs for inner pages. */
export function breadcrumbSchema(items: Array<{ name: string; path: string }>, locale: Locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${localizedPath(item.path, locale)}`,
    })),
  };
}

/** Article / BlogPosting — insight detail pages. */
export function articleSchema(
  insight: {
    title: string;
    slug: string;
    excerpt?: string;
    coverUrl?: string;
    author: string;
    publishedAt?: Date;
    category?: string;
  },
  locale: Locale = "en"
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.excerpt || "",
    image: insight.coverUrl ? [insight.coverUrl] : [`${SITE_URL}${OG_IMAGE_DEFAULT}`],
    url: `${SITE_URL}${localizedPath(`/insights/${insight.slug}`, locale)}`,
    datePublished: insight.publishedAt ? insight.publishedAt.toISOString() : undefined,
    inLanguage: locale === "fr" ? "fr" : "en",
    articleSection: insight.category,
    author: {
      "@type": "Person",
      name: insight.author || FOUNDER.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/ACEGLOBALNEXUS_ICON_with_name.png`,
      },
    },
  };
}

/** FAQPage — only include Q&As that are visible on the page (no rich result in 2026, still parsed by Bing/AI). */
export function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * JobPosting — careers pages.
 *
 * `jobLocation` is required by Google (or `jobLocationType: "TELECOMMUTE"` for
 * a fully remote role); this opening is "Yaoundé / Remote", so the physical
 * address carries the schema and the remote side stays in the description —
 * claiming TELECOMMUTE would advertise the role as remote-only.
 *
 * No `validThrough`: the position stays open until it is filled, and a date in
 * the past would expire the listing in search results.
 */
export function jobPostingSchema(
  job: {
    title: string;
    summary: string;
    datePosted: string;
    employmentType: string;
    path: string;
  },
  locale: Locale = "en"
) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: translate(locale, job.title),
    description: translate(locale, job.summary),
    url: `${SITE_URL}${localizedPath(job.path, locale)}`,
    datePosted: job.datePosted,
    employmentType: job.employmentType,
    // The application form on this page is the application channel — no
    // "apply on an external site" hop.
    directApply: true,
    hiringOrganization: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/ACEGLOBALNEXUS_ICON_with_name.png`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Yaoundé",
        addressCountry: "CM",
      },
    },
    inLanguage: ["en", "fr"],
  };
}

export { SECTORS };