import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { LocaleProvider } from "@/components/LocaleProvider";
import { getLocale } from "@/lib/i18n/server";
import { SITE_URL, SITE_NAME, organizationSchema } from "@/lib/seo";

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: {
    default: "ACE Global Nexus — Connecting Businesses, Markets & Opportunities",
    template: "%s | ACE Global Nexus",
  },
  description:
    "ACE Global Nexus is a global trade, investment and strategic advisory firm in Yaoundé, Cameroon, connecting businesses, investors and opportunities across Africa and the international marketplace.",
  keywords: [
    "trade advisory",
    "investment promotion",
    "market entry Africa",
    "business matchmaking",
    "export promotion",
    "Cameroon business",
    "Africa investment",
    "market intelligence",
  ],
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
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "ACE Global Nexus — Connecting Businesses, Markets & Opportunities",
    description:
      "Global trade, investment and strategic advisory. Connect · Grow · Invest · Go Global.",
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: "ACE Global Nexus — Connecting Businesses, Markets & Opportunities",
    description:
      "Global trade, investment and strategic advisory. Connect · Grow · Invest · Go Global.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = getLocale();
  return (
    <html lang={locale}>
      <body className={`${display.variable} bg-white font-sans text-primary antialiased`}>
        <LocaleProvider initialLocale={locale}>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter>
            <Footer />
          </SiteFooter>
        </LocaleProvider>
        {/* Site-wide Organization structured data */}
        <JsonLd data={organizationSchema()} />
      </body>
    </html>
  );
}