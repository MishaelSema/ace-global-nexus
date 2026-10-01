import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { LocaleProvider } from "@/components/LocaleProvider";
import { getLocale, tForLocale } from "@/lib/i18n/server";
import { htmlLang, ogLocale } from "@/lib/i18n/core";
import { SITE_URL, SITE_NAME, organizationSchema } from "@/lib/seo";

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

// Render every route per request: getLocale() reads the x-locale header set by
// middleware, so /fr/* must never be baked as a static English shell at build.
// (Also keeps the correct <html lang> for the requested URL.)
export const dynamic = "force-dynamic";

// Layout-level fallbacks. Every indexable page ships its own localized title
// and description (see `localizedPageMeta`), so these only surface on routes
// that define none — kept keyword-aligned with the homepage so the fallback
// never contradicts it.
const HOME_TITLE_EN = "Market Entry & Trade Advisory in Africa | ACE Global Nexus";
const HOME_TITLE_FR = "Conseil en Entrée de Marché en Afrique | ACE Global Nexus";
const HOME_DESCRIPTION_EN =
  "Market entry, trade and investment advisory from Yaoundé, Cameroon. We connect businesses and investors with African markets, partners and bankable deals.";
const HOME_DESCRIPTION_FR =
  "Conseil en entrée de marché, commerce et investissement depuis Yaoundé, Cameroun. Nous relions entreprises et investisseurs aux marchés et opportunités africains.";
const OG_DESCRIPTION_EN = "Global trade, investment and strategic advisory. Connect · Grow · Invest · Go Global.";
const OG_DESCRIPTION_FR =
  "Conseil mondial en commerce, investissement et stratégie. Connecter · Développer · Investir · S'internationaliser.";

export function generateMetadata(): Metadata {
  const locale = getLocale();
  const homeTitle = locale === "fr" ? HOME_TITLE_FR : HOME_TITLE_EN;
  const homeDescription = locale === "fr" ? HOME_DESCRIPTION_FR : HOME_DESCRIPTION_EN;
  const ogDescription = locale === "fr" ? OG_DESCRIPTION_FR : OG_DESCRIPTION_EN;

  return {
    title: {
      default: homeTitle,
      // `%s` is the page-title placeholder; keep it literal.
      template: "%s | ACE Global Nexus",
    },
    description: homeDescription,
    // No `keywords` meta: Google has ignored it since 2009 and Bing since 2012.
    // Targeting lives in the titles, descriptions and on-page copy instead —
    // see docs/SEO-KEYWORDS.md for the full EN/FR keyword map.
    metadataBase: new URL(SITE_URL),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
    manifest: "/manifest.json",
    // No `alternates` here on purpose: Next merges parent alternates into any
    // child that omits them, which would make every page self-canonical to the
    // homepage. Each page owns its own canonical via `canonical()`.
    openGraph: {
      title: homeTitle,
      description: ogDescription,
      type: "website",
      locale: ogLocale(locale),
      url: locale === "fr" ? `${SITE_URL}/fr` : SITE_URL,
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: homeTitle,
      description: ogDescription,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = getLocale();
  const t = tForLocale();
  return (
    <html lang={htmlLang(locale)}>
      <body className={`${display.variable} bg-white font-sans text-primary antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          {t("Skip to main content")}
        </a>
        {/* key={locale} remounts the provider when navigating between / and /fr,
            so client components pick up the new locale from the server render. */}
        <LocaleProvider key={locale} initialLocale={locale}>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter>
            <Footer />
          </SiteFooter>
        </LocaleProvider>
        {/* Site-wide Organization structured data */}
        <JsonLd data={organizationSchema(locale)} />
      </body>
    </html>
  );
}