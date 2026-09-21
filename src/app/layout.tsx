import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ace-global-nexus.com"),
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} bg-white font-sans text-primary antialiased`}>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}