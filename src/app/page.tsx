import type { Metadata } from "next";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { SECTORS, FOUNDER, BRAND_IMAGE } from "@/lib/content";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Parallax from "@/components/Parallax";
import Marquee from "@/components/Marquee";
import ServiceRows from "@/components/ServiceRows";
import Showcase from "@/components/Showcase";
import SectorShowcase from "@/components/SectorShowcase";
import MosaicGrid from "@/components/MosaicGrid";
import JsonLd from "@/components/JsonLd";
import {
  localizedPageMeta,
  webSiteSchema,
  professionalServiceSchema,
  serviceCatalogSchema,
} from "@/lib/seo";
import { tForLocale, pathForLocale, getLocale } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = getLocale();
  return localizedPageMeta({
    path: "/",
    locale,
    en: {
      title: "Trade & Investment Advisory in Africa | ACE Global Nexus",
      description:
        "Market entry & trade advisory from Cameroon. We connect businesses and investors with African markets, partners and bankable deals.",
    },
    fr: {
      title: "Conseil en Commerce & Investissement en Afrique | ACE Global Nexus",
      description:
        "Conseil en entrée de marché et facilitation commerciale depuis le Cameroun. Nous connectons entreprises et investisseurs aux marchés africains, aux partenaires et aux opportunités finançables.",
    },
  });
}

const STATS = [
  { value: "22+", label: "Years in trade & investment promotion" },
  { value: "10", label: "Strategic sectors across Africa" },
  { value: "8", label: "Integrated advisory services" },
  { value: "1", label: "Trusted bridge: Cameroon ↔ the world" },
];

export default function HomePage() {
  const t = tForLocale();
  const p = pathForLocale();
  return (
    <>
      <JsonLd data={[webSiteSchema(getLocale()), professionalServiceSchema(getLocale()), serviceCatalogSchema(getLocale())]} />
      {/* ============ HERO ============ */}
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-primary">
        <Parallax speed={0.16} className="absolute inset-0">
          <img
            src={BRAND_IMAGE}
            alt=""
            className="h-full w-full scale-110 object-cover"
            draggable={false}
          />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/55 to-primary" />

        <div className="container-site relative flex flex-1 flex-col items-center justify-center pb-16 pt-36 text-center">
          <h1 className="max-w-4xl font-serif text-4xl font-bold leading-[1.05] text-white animate-fade-up sm:text-6xl lg:text-7xl">
            {t("Connecting businesses,")}
            <br />
            <span className="italic text-gold">{t("markets & opportunity.")}</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-white/70 animate-fade-up sm:text-lg" style={{ animationDelay: "120ms" }}>
            {t(
              "We help businesses and investors navigate Africa and the international marketplace — turning commercial opportunity into measurable results."
            )}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4 animate-fade-up" style={{ animationDelay: "220ms" }}>
            <Link href={p("/start-a-conversation")} className="btn-primary !text-base">
              {t("Start a Conversation")} <FaArrowRight size={14} />
            </Link>
            <Link href={p("/services")} className="btn border border-white/30 text-white transition-colors hover:border-gold hover:text-gold">
              {t("Explore Our Services")}
            </Link>
          </div>
        </div>

        <div className="relative pb-10">
          <div className="mx-auto h-12 w-px bg-gradient-to-b from-gold/0 via-gold/70 to-gold/0" aria-hidden="true" />
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="bg-white py-14">
        <div className="container-site">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 70} className="flex flex-col items-center text-center lg:border-l lg:border-gray-100 lg:first:border-l-0">
                <p className="font-serif text-4xl font-bold text-primary sm:text-5xl">{s.value}</p>
                <p className="mt-2 max-w-[14rem] text-xs leading-relaxed text-gray-500 sm:text-sm">{t(s.label)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SECTORS MARQUEE ============ */}
      <section className="border-y border-white/10 bg-primary py-10">
        <Marquee
          items={SECTORS.map((s) => t(s.title))}
          speed="marquee-slow"
          itemClassName="font-serif text-2xl font-semibold text-white/55 sm:text-3xl"
          separator="◆"
        />
      </section>

      {/* ============ SECTORS MOSAIC ============ */}
      <section className="bg-white py-24 sm:py-32">
        <div className="container-site">
          <SectionHeading
            title={t("Where we create connections")}
            description={t(
              "From agribusiness to logistics, the sectors shaping Africa's next economic transformation — where opportunity meets capital and markets."
            )}
          />
          <SectorShowcase>
            <MosaicGrid />
          </SectorShowcase>
          <Reveal className="mt-10 hidden text-center lg:block">
            <Link
              href={p("/sectors")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold-dark transition-colors hover:text-gold"
            >
              {t("Explore all sectors")} <FaArrowRight size={13} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section className="bg-white py-24 sm:py-32">
        <div className="container-site grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <span className="block h-px w-14 bg-gold" aria-hidden="true" />
              <h2 className="mt-6 font-serif text-3xl font-bold leading-tight text-primary sm:text-4xl">
                {t("Advisory services built around results")}
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-gray-500">
                {t(
                  "Every engagement is tailored to help you find the right market, the right partner and the right strategy — from first assessment to a deal that closes."
                )}
              </p>
              <Link
                href={p("/services")}
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold-dark transition-colors hover:text-gold"
              >
                {t("Explore all services")} <FaArrowRight size={13} />
              </Link>
            </Reveal>
          </div>
          <ServiceRows />
        </div>
      </section>

      {/* ============ FOUNDER TEASER ============ */}
      <section className="relative overflow-hidden bg-primary">
        <Parallax speed={0.1} className="absolute inset-0">
          <img
            src={BRAND_IMAGE}
            alt=""
            className="h-full w-full scale-110 object-cover opacity-35"
            draggable={false}
          />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-primary/95" />
        <div className="container-site relative grid items-center gap-14 py-24 sm:py-32 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20">
          <Reveal>
            {/* Compact identity row — keeps the portrait grounded on small screens */}
            <div className="mb-9 flex items-center gap-4 lg:hidden">
              <img
                src="/ACEGLOBALNEXUS_ICON.png"
                alt=""
                className="h-14 w-14 rounded-2xl bg-cream p-2.5 object-contain"
              />
              <div>
                <p className="font-serif text-xl font-bold text-white">{FOUNDER.name}</p>
                <p className="text-sm text-gold-light">{t(FOUNDER.title)}</p>
              </div>
            </div>

            <h2 className="font-serif text-3xl font-bold leading-tight text-white sm:text-4xl">
              {t("Experience at the intersection of business and opportunity")}
            </h2>
            <p className="mt-6 leading-relaxed text-white/70">{t(FOUNDER.summary)}</p>
            <blockquote className="mt-8 border-l-2 border-gold pl-6 font-serif text-xl italic leading-snug text-gold">
              “{t(FOUNDER.quote)}”
            </blockquote>
            <Link href={p("/about")} className="btn-primary mt-9">
              {t("Meet Christopher A. Ekom")} <FaArrowRight size={13} />
            </Link>
          </Reveal>

          <Reveal delay={120} className="hidden lg:block">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-primary">
              <Parallax speed={0.08} className="absolute inset-0">
                <img src={BRAND_IMAGE} alt="" className="h-full w-full scale-110 object-cover opacity-70" draggable={false} />
              </Parallax>
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-primary/10" />
              <div className="absolute inset-x-0 bottom-0 p-10 text-center">
                <img
                  src="/ACEGLOBALNEXUS_ICON.png"
                  alt="ACE Global Nexus mark"
                  className="mx-auto h-16 w-16 rounded-2xl bg-cream p-2.5 object-contain"
                />
                <p className="mt-4 font-serif text-2xl font-bold text-white">{FOUNDER.name}</p>
                <p className="mt-1 text-sm text-gold-light">{t(FOUNDER.title)}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ INSIGHTS SHOWCASE ============ */}
      <section className="bg-white py-24 sm:py-32">
        <div className="container-site">
          <SectionHeading
            title={t("Practical market intelligence")}
            description={t(
              "Perspectives on trade, investment, entrepreneurship and doing business in Africa — from experience and research, not theory."
            )}
          />
          <Reveal className="mt-14">
            <Showcase />
          </Reveal>
          <Reveal className="mt-10 text-center">
            <Link
              href={p("/insights")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold-dark transition-colors hover:text-gold"
            >
              {t("Browse all insights")} <FaArrowRight size={13} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative overflow-hidden bg-primary">
        <Parallax speed={0.12} className="absolute inset-0">
          <img src={BRAND_IMAGE} alt="" className="h-full w-full scale-110 object-cover" draggable={false} />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/80 to-primary" />
        <div className="container-site relative py-28 text-center sm:py-36">
          <h2 className="mx-auto max-w-3xl font-serif text-3xl font-bold leading-tight text-white sm:text-5xl">
            {t("Ready to turn an opportunity into a result?")}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-white/65">
            {t(
              "African SME looking for international buyers, a company seeking investment, a diaspora investor exploring opportunities, or a global business entering Cameroon — let's start the conversation."
            )}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href={p("/contact")} className="btn-primary text-base">
              {t("Contact Us Today")} <FaArrowRight size={13} />
            </Link>
            <Link href={p("/sectors")} className="btn border border-white/30 text-white transition-colors hover:border-gold hover:text-gold">
              {t("Explore Sectors")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}