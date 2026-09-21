import type { Metadata } from "next";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { FOUNDER, BRAND_IMAGE } from "@/lib/content";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import PageHero from "@/components/PageHero";
import Parallax from "@/components/Parallax";
import Statement from "@/components/Statement";

export const metadata: Metadata = {
  title: "About & Founder",
  description:
    "Meet ACE Global Nexus — a trusted business bridge between Africa and the world — and its founder, Christopher A. Ekom, a retired US Embassy Senior Commercial Specialist with 22+ years in trade and investment promotion.",
};

const VALUES = [
  { title: "Integrity", description: "Trusted relationships built on transparency and reliability." },
  { title: "Professionalism", description: "Executive-grade advisory rooted in commercial diplomacy." },
  { title: "Innovation", description: "Modern, pragmatic approaches to cross-border business." },
  { title: "Impact", description: "Measurable commercial results for every partner we serve." },
];

const WHO_WE_SERVE = [
  "Multinational corporations entering or expanding in Africa",
  "SMEs and export-oriented enterprises seeking international buyers",
  "Diaspora investors exploring opportunities at home",
  "Entrepreneurs looking for strategic partners and finance",
  "Development organizations and government agencies",
];

const EXPERTISE_TAGS = ["Business Development", "International Trade", "Investment Promotion", "Market Intelligence", "Strategic Partnerships"];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Africa&apos;s next economic transformation will be built by entrepreneurs, companies, investors
            <span className="italic text-gold"> and partnerships</span>.
          </>
        }
        description="We exist to make sure the right people find each other — and turn opportunity into commercial results."
      >
        <Link href="/contact" className="btn-primary !text-base">Work With Us <FaArrowRight size={14} /></Link>
        <Link href="/services" className="btn border border-white/30 text-white transition-colors hover:border-gold hover:text-gold">Our Services</Link>
      </PageHero>

      {/* MISSION / VISION */}
      <section className="bg-white py-24 sm:py-32">
        <div className="container-site grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <span className="block font-serif text-sm text-gold-dark">01 — Mission</span>
            <h2 className="mt-5 font-serif text-3xl font-bold leading-tight text-primary sm:text-4xl">
              Connect businesses and opportunities.
            </h2>
            <p className="mt-6 max-w-xl leading-relaxed text-gray-600">
              We connect Cameroonian companies with international markets, entrepreneurs with investors, businesses
              with strategic partners — and international companies with opportunities in Cameroon and Africa — then
              help them transform those connections into commercial results.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <span className="block font-serif text-sm text-gold-dark">02 — Vision</span>
            <h2 className="mt-5 font-serif text-3xl font-bold leading-tight text-primary sm:text-4xl">
              A leading bridge across markets.
            </h2>
            <p className="mt-6 max-w-xl leading-relaxed text-gray-600">
              To become a leading international trade and investment advisory platform recognized for integrity,
              professionalism, innovation and impactful global business connectivity — starting from Cameroon and
              connecting Cameroon to the world.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="relative overflow-hidden bg-primary py-24 text-white sm:py-32">
        <Parallax speed={0.1} className="absolute inset-0">
          <img src={BRAND_IMAGE} alt="" className="h-full w-full scale-110 object-cover opacity-40" draggable={false} />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-primary" />

        <div className="container-site relative grid items-start gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl bg-primary-light">
                <img src={BRAND_IMAGE} alt="" className="h-full w-full object-cover opacity-50" draggable={false} />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8 text-center">
                  <img
                    src="/ACEGLOBALNEXUS_ICON.png"
                    alt="ACE Global Nexus mark"
                    className="mx-auto h-16 w-16 rounded-2xl object-contain"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                  <p className="mt-4 font-serif text-2xl font-bold">Christopher A. Ekom</p>
                  <p className="mt-1 text-sm text-gold-light">{FOUNDER.title}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-white/45">{FOUNDER.role}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <h2 className="font-serif text-3xl font-bold sm:text-4xl">Who is Christopher Ekom Anyang?</h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-6 leading-relaxed text-white/70">
                Christopher spent more than two decades at the intersection of business, trade, investment and
                international economic relations — first as a {FOUNDER.credentials.toLowerCase()}
              </p>
              <p className="mt-5 leading-relaxed text-white/70">
                His work placed him alongside companies looking for markets, investors looking for opportunities,
                governments looking to attract investment, and entrepreneurs looking for the connections that could
                take their businesses further. He saw clearly that opportunity alone does not become business — it
                takes the right information, the right partners and the right strategy.
              </p>
              <p className="mt-5 leading-relaxed text-white/70">
                <strong className="text-gold-light">ACE Global Nexus</strong> was founded around one simple idea:
                connect businesses and opportunities — and help turn those connections into results.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <blockquote className="mt-9 border-l-2 border-gold pl-6">
                <p className="font-serif text-2xl italic leading-snug text-gold-light">
                  “Helping businesses grow, compete, connect and go global — that is the ACE Global Nexus mission.”
                </p>
              </blockquote>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-9 flex flex-wrap gap-2.5">
                {EXPERTISE_TAGS.map((tag) => (
                  <span key={tag} className="rounded-full border border-gold/35 px-4 py-1.5 text-xs font-semibold text-gold-light">
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="container-site">
          <SectionHeading title="The values behind every engagement" />
          <div className="mt-14 grid gap-x-12 sm:grid-cols-2 lg:gap-x-20">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={(i % 2) * 80}>
                <div className="border-b border-gray-200 py-8">
                  <span className="font-serif text-sm text-gold-dark">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-serif text-2xl font-bold text-primary">{v.title}</h3>
                  <p className="mt-2 max-w-md leading-relaxed text-gray-500">{v.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="bg-white py-24 sm:py-32">
        <div className="container-site grid items-center gap-14 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-20">
          <Reveal>
            <span className="block h-px w-14 bg-gold" aria-hidden="true" />
            <h2 className="mt-6 font-serif text-3xl font-bold leading-tight text-primary sm:text-4xl">
              Built for a full spectrum of partners
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-gray-500">
              From multinationals to diaspora investors, we work with organizations and individuals at every stage of
              the international business journey.
            </p>
          </Reveal>
          <div>
            <div className="divide-y divide-gray-100 border-y border-gray-100">
              {WHO_WE_SERVE.map((item, i) => (
                <div key={item} className="flex items-center gap-6 py-5">
                  <span className="font-serif text-sm text-gold-dark">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-sm font-medium text-primary/85 sm:text-base">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="relative overflow-hidden bg-primary">
        <Parallax speed={0.12} className="absolute inset-0">
          <img src={BRAND_IMAGE} alt="" className="h-full w-full scale-110 object-cover" draggable={false} />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/75 to-primary" />
        <div className="container-site relative py-24 text-center sm:py-28">
          <h2 className="mx-auto max-w-2xl font-serif text-2xl font-bold leading-tight text-white sm:text-4xl">
            Let&apos;s build partnerships that turn into results
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/65">
            Whether you are entering a market or looking for the right partner, the conversation starts here.
          </p>
          <Link href="/contact" className="btn-primary mt-8">
            Start the Conversation <FaArrowRight size={13} />
          </Link>
        </div>
      </section>

      <Statement word="TRUST" sub="Integrity. Professionalism. Innovation. Impact." />
    </>
  );
}