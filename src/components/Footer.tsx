import Link from "next/link";
import { FaLocationDot, FaPhone, FaEnvelope } from "react-icons/fa6";
import { CONTACT_INFO } from "@/lib/content";
import { tForLocale, pathForLocale } from "@/lib/i18n/server";

const EXPLORE_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/sectors", label: "Sectors" },
  { href: "/about", label: "About & Founder" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

const LEGAL_LINKS = [
  { href: "/legal/terms", label: "Terms of Service" },
  { href: "/legal/privacy", label: "Privacy Policy" },
  { href: "/legal/cookies", label: "Cookie Policy" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const t = tForLocale();
  // Legal pages stay single-language English at root — only Explore is localized.
  const p = pathForLocale();

  return (
    <footer className="relative overflow-hidden bg-cream text-primary">
      {/*
        On small screens: the story sits centered first, then Explore (left) and
        Contact (right) share one horizontal line, as requested.
        On large screens: Explore far left, Contact far right, story in the middle.
      */}
      <div className="container-site relative z-10 mt-16 grid grid-cols-2 gap-x-6 gap-y-12 pb-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)_minmax(0,5fr)] lg:gap-10 lg:pb-24 lg:pt-10">
        <div className="order-1 col-span-2 text-center lg:order-2 lg:col-span-1">
          <p className="mx-auto max-w-md text-sm leading-relaxed text-gray-500">
            {t(
              "A global trade, investment and strategic advisory firm connecting businesses, investors and opportunities across Africa and the international marketplace."
            )}
          </p>
          <p className="mt-6 font-serif text-xl font-semibold leading-snug text-gold-dark sm:text-2xl">
            {t("“Connect businesses. Turn opportunities into results.”")}
          </p>
        </div>

        <nav aria-label="Explore" className="order-2 lg:order-1 lg:col-span-1 lg:justify-self-start">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary/40">{t("Explore")}</p>
          <ul className="mt-6 space-y-3 text-sm font-medium text-primary/75">
            {EXPLORE_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={p(l.href)} className="transition-colors hover:text-gold-dark">
                  {t(l.label)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="order-3 lg:order-3 lg:col-span-1 lg:justify-self-end">
          <p className="text-right text-xs font-bold uppercase tracking-[0.22em] text-primary/40">{t("Contact")}</p>
          <ul className="mt-6 space-y-4 text-sm font-medium text-primary/75">
            <li className="flex items-center justify-end gap-3 text-right">
              <span>{CONTACT_INFO.address}</span>
              <FaLocationDot className="shrink-0 text-gold" aria-hidden="true" />
            </li>
            <li className="flex items-center justify-end gap-3 text-right">
              <a href={CONTACT_INFO.phoneHref} className="transition-colors hover:text-gold-dark">
                {CONTACT_INFO.phone}
              </a>
              <FaPhone className="shrink-0 text-gold" aria-hidden="true" />
            </li>
            <li className="flex items-center justify-end gap-3 text-right">
              <a href={`mailto:${CONTACT_INFO.emailPrimary}`} className="break-all transition-colors hover:text-gold-dark">
                {CONTACT_INFO.emailPrimary}
              </a>
              <FaEnvelope className="shrink-0 text-gold" aria-hidden="true" />
            </li>
          </ul>
        </div>
      </div>

      {/* Clearance that leaves room for the top half of the oversized logo below */}
      <div className="container-site relative z-10">
        <div aria-hidden="true" className="h-36 sm:h-48 md:h-56 lg:h-72" />
      </div>

      {/* Giant logo — full width, natural colours, clipped in half by the footer edge */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center select-none">
        <img
          src="/ACEGLOBALNEXUS_ICON_with_name.png"
          alt=""
          draggable={false}
          className="w-[min(1500px,150vw)] max-w-none opacity-90 [transform:translateY(-6%)] sm:[transform:translateY(30%)]"
        />
      </div>

      {/* Copyright + legal links — bottom, laid in front of the giant logo */}
      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-primary/10 bg-cream/90 px-5 py-3.5 backdrop-blur-sm sm:px-8 sm:py-4">
        <div className="container-site flex flex-col items-center justify-between gap-2 text-[11px] text-primary/60 sm:flex-row sm:text-xs">
          <p className="text-center sm:text-left">
            © {year} {t("ACE Global Nexus. All rights reserved.")} · {t("Founded by Christopher A. Ekom")} ·{" "}
            {t("22+ years in international trade & investment promotion")}
          </p>
          <nav aria-label="Legal" className="flex flex-wrap justify-center gap-x-5 gap-y-1">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-gold-dark">
                {t(l.label)}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}