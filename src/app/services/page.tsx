import type { Metadata } from "next";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { SERVICES } from "@/lib/content";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import ServiceRows from "@/components/ServiceRows";
import Marquee from "@/components/Marquee";
import Statement from "@/components/Statement";

export const metadata: Metadata = {
  title: "Services",
  description:
    "International market entry, trade and investment facilitation, business matchmaking, market intelligence, export promotion, global sourcing, investor advisory and corporate training.",
};

const DELIVERY_METHODS = [
  "One-on-one strategic advisory",
  "Sector and market research briefs",
  "Introduced partnerships & investor links",
  "Training workshops and programmes",
  "Ongoing deal support and follow-through",
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Expertise that turns cross-border ambition into <span className="italic text-gold">commercial results</span>
          </>
        }
        description="Eight integrated services covering the full journey of international business — from market entry and intelligence to matchmaking, investment and export growth."
      />

      <section className="bg-white py-24 sm:py-32">
        <div className="container-site">
          <Reveal>
            <p className="max-w-2xl leading-relaxed text-gray-500">
              No two engagements are alike. Each service is a lane of a single journey — one that takes you from first
              assessment to the right market, the right partner and a result that is bankable.
            </p>
          </Reveal>
          <ServiceRows className="mt-14" />
        </div>
      </section>

      <section className="border-y border-gray-100 bg-cream py-10">
        <Marquee
          items={SERVICES.map((s) => s.title)}
          speed="marquee"
          itemClassName="font-serif text-xl font-semibold text-primary/40 sm:text-2xl"
          separator="·"
          reverse
        />
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="container-site grid items-start gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <Reveal className="lg:sticky lg:top-28">
            <span className="block h-px w-14 bg-gold" aria-hidden="true" />
            <h2 className="mt-6 font-serif text-3xl font-bold leading-tight text-primary sm:text-4xl">
              A practical, partnership-based approach
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-gray-500">
              Every mandate begins with understanding your objective — then we build the market picture, the right
              relationships and the execution path that gets you there.
            </p>
          </Reveal>

          <div>
            <ol className="divide-y divide-gray-100 border-y border-gray-100">
              {DELIVERY_METHODS.map((m, i) => (
                <li key={m} className="group flex items-center gap-6 py-6 transition-colors duration-300 hover:bg-cream sm:px-4 sm:-mx-4">
                  <span className="font-serif text-sm text-gold-dark transition-colors group-hover:text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base font-medium text-primary/85">{m}</span>
                </li>
              ))}
            </ol>
            <Link href="/contact" className="btn-primary mt-10">
              Discuss Your Objective <FaArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      <Statement word="STRATEGY" sub="From first assessment to a deal that closes." />
    </>
  );
}