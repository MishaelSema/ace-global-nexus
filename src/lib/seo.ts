import { SERVICES, SECTORS, CONTACT_INFO, FOUNDER } from "@/lib/content";
import type { Locale } from "@/lib/i18n/core";
import { localizedPath } from "@/lib/i18n/path";

/** Base site URL — configurable via env, defaults to the production domain. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.aceglobalnexus.com").replace(/\/+$/, "");

export const SITE_NAME = "ACE Global Nexus";

export const SITE_SLOGAN = "Connecting businesses, markets & opportunity.";

export const OG_IMAGE_DEFAULT = "/opengraph-image.png";

/**
 * Self-referencing canonical metadata for a route, with the full set of
 * hreflang alternates (en, fr, x-default) pointing at real URLs.
 */
export function canonical(path: string, locale: Locale = "en") {
  return {
    alternates: {
      canonical: localizedPath(path, locale),
      languages: {
        en: localizedPath(path, "en"),
        fr: localizedPath(path, "fr"),
        "x-default": localizedPath(path, "en"),
      },
    },
  };
}

/** Page-level Open Graph meta (locale-aware URL + og:locale). */
export function openGraphMeta(path: string, title: string, description: string, locale: Locale = "en") {
  const image = `${SITE_URL}${OG_IMAGE_DEFAULT}`;
  return {
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${localizedPath(path, locale)}`,
      type: "website" as const,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      locales: ["en_US", "fr_FR"],
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [image],
    },
  };
}

/** Full localized page metadata: title, description, canonical, hreflang & Open Graph. */
export function localizedPageMeta({
  path,
  locale,
  en,
  fr,
}: {
  path: string;
  locale: Locale;
  en: { title: string; description: string };
  fr: { title: string; description: string };
}) {
  const copy = locale === "fr" ? fr : en;
  return {
    // absolute: our titles already include the brand suffix, so opt out of the
    // root layout's title template and prevent double-branded <title> tags.
    title: { absolute: copy.title },
    description: copy.description,
    ...canonical(path, locale),
    ...openGraphMeta(path, copy.title, copy.description, locale),
  };
}

// ---------------------------------------------------------------------------
// JSON-LD structured data
// ---------------------------------------------------------------------------

/** Organization — injected site-wide from the root layout. */
export function organizationSchema() {
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
    description:
      "A global trade, investment and strategic advisory firm connecting businesses, investors and opportunities across Africa and the international marketplace.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: CONTACT_INFO.phone.replace(/\s/g, ""),
      email: CONTACT_INFO.emailPrimary,
      availableLanguage: ["English", "French"],
    },
    founder: personSchema(),
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
    founder: personSchema(),
  };
}

/** OfferCatalog of the advisory services — homepage + services pages. */
export function serviceCatalogSchema(locale: Locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Advisory Services",
    url: `${SITE_URL}${localizedPath("/services", locale)}`,
    itemListElement: SERVICES.map((s, i) => ({
      "@type": "Service",
      position: i + 1,
      name: s.title,
      description: s.description,
      serviceType: s.title,
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
    jobTitle: [FOUNDER.title, FOUNDER.role],
    url: `${SITE_URL}${localizedPath("/about", locale)}`,
    worksFor: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    description: FOUNDER.credentials,
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

export { SECTORS };