import { SERVICES, SECTORS, CONTACT_INFO, FOUNDER } from "@/lib/content";

/** Base site URL — configurable via env, defaults to the production domain. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.aceglobalnexus.com").replace(/\/+$/, "");

export const SITE_NAME = "ACE Global Nexus";

export const SITE_SLOGAN = "Connecting businesses, markets & opportunity.";

export const OG_IMAGE_DEFAULT = "/opengraph-image.png";

/** Self-referencing canonical metadata for a route. */
export function canonical(path: string) {
  return {
    alternates: { canonical: path },
  };
}

/** Page-level Open Graph meta. */
export function openGraphMeta(path: string, title: string, description: string) {
  return {
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${path}`,
      type: "website" as const,
      locale: "en_US",
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
    },
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
export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en",
  };
}

/** ProfessionalService (LocalBusiness) — homepage only. */
export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    name: SITE_NAME,
    url: SITE_URL,
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
export function serviceCatalogSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Advisory Services",
    url: `${SITE_URL}/services`,
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
export function personSchema() {
  return {
    "@type": "Person",
    name: FOUNDER.name,
    jobTitle: [FOUNDER.title, FOUNDER.role],
    url: `${SITE_URL}/about`,
    worksFor: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    description: FOUNDER.credentials,
  };
}

/** Breadcrumbs for inner pages. */
export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/** Article / BlogPosting — insight detail pages. */
export function articleSchema(insight: {
  title: string;
  slug: string;
  excerpt?: string;
  coverUrl?: string;
  author: string;
  publishedAt?: Date;
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.excerpt || "",
    image: insight.coverUrl ? [insight.coverUrl] : [`${SITE_URL}${OG_IMAGE_DEFAULT}`],
    url: `${SITE_URL}/insights/${insight.slug}`,
    datePublished: insight.publishedAt ? insight.publishedAt.toISOString() : undefined,
    inLanguage: "en",
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