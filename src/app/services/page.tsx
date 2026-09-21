import type { Metadata } from "next";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { SERVICES } from "@/lib/content";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import ServiceRows from "@/components/ServiceRows";
import Marquee from "@/components/Marquee";
import Statement from "@/components/Statement";
import JsonLd from "@/components/JsonLd";
import { canonical, openGraphMeta, breadcrumbSchema, serviceCatalogSchema, faqSchema } from "@/lib/seo";
import { tForLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Market Entry & Trade Advisory Services | ACE Global Nexus",
  description:
    "African market entry, trade & investment facilitation, B2B matchmaking, market intelligence, export promotion and investor advisory — from Yaoundé, Cameroon.",
  ...canonical("/services"),
  ...openGraphMeta(
    "/services",
    "Market Entry & Trade Advisory Services | ACE Global Nexus",
    "African market entry, trade & investment facilitation, B2B matchmaking, market intelligence, export promotion and investor advisory — from Yaoundé, Cameroon."
  ),
};

const DELIVERY_METHODS = [
  "One-on-one strategic advisory",
  "Sector and market research briefs",
  "Introduced partnerships & investor links",
  "Training workshops and programmes",
  "Ongoing deal support and follow-through",
];

const FAQS = [
  {
    question: "How can my company enter the Cameroonian market?",
    answer:
      "Start with market intelligence and a vetted local partner. The practical path is: shortlist your segment, confirm demand and regulation, identify a distributor, agent or joint-venture partner, then register and execute. Companies can complete one-stop registration quickly — and foreign investors may hold 100% ownership in most sectors. ACE Global Nexus supports every step with local advisors on the ground.",
  },
  {
    question: "What does market entry or trade facilitation cost?",
    answer:
      "There is no flat rate. Engagements are scoped as project fees, monthly retainers or success-linked facilitation fees, depending on the objective. We agree the scope on a discovery call, and many clients start with a scoping study before committing to a full programme.",
  },
  {
    question: "Can a foreigner own a business in Cameroon?",
    answer:
      "Yes — 100% ownership is allowed in most activities. For majority-foreign shareholding above 50%, a Ministry of Trade authorisation is required, and expatriate managers need work and residence permits. An experienced local advisor can run the entire process for you remotely.",
  },
  {
    question: "Which sectors offer the best investment opportunities in Cameroon?",
    answer:
      "Agribusiness and agro-processing, critical minerals, energy and renewables, infrastructure corridors, ICT and fintech, healthcare, logistics and manufacturing. Recent high-level commercial dialogue identified billions of dollars in opportunities, and Cameroon's AfCFTA membership gives investors access to a market of roughly 1.4 billion people.",
  },
  {
    question: "How long does a market entry engagement take?",
    answer:
      "Typically four to eight weeks: one to two weeks of discovery, two to three weeks of market and entry-mode assessment, then a roadmap with partner and buyer introductions running in parallel while you execute.",
  },
  {
    question: "Do you work outside Cameroon?",
    answer:
      "Yes. Our headquarters is in Yaoundé, but we operate across Central and West Africa first, then the wider continent — plus established connections to North America, Europe, Asia and the Middle East for sourcing, export and investment links.",
  },
];

export default function ServicesPage() {
  const t = tForLocale();
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          serviceCatalogSchema(),
          faqSchema(FAQS),
        ]}
      />
      <PageHero
        title={
          <>
            {t("Expertise that turns cross-border ambition into")}{" "}
            <span className="italic text-gold">{t("commercial results")}</span>
          </>
        }
        description={t(
          "Eight integrated services covering the full journey of international business — from market entry and intelligence to matchmaking, investment and export growth."
        )}
      />

      <section className="bg-white py-24 sm:py-32">
        <div className="container-site">
          <Reveal>
            <p className="max-w-2xl leading-relaxed text-gray-500">
              {t(
                "No two engagements are alike. Each service is a lane of a single journey — one that takes you from first assessment to the right market, the right partner and a result that is bankable."
              )}
            </p>
          </Reveal>
          <ServiceRows className="mt-14" />
        </div>
      </section>

      <section className="border-y border-gray-100 bg-cream py-10">
        <Marquee
          items={SERVICES.map((s) => t(s.title))}
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
              {t("A practical, partnership-based approach")}
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-gray-500">
              {t(
                "Every mandate begins with understanding your objective — then we build the market picture, the right relationships and the execution path that gets you there."
              )}
            </p>
          </Reveal>

          <div>
            <ol className="divide-y divide-gray-100 border-y border-gray-100">
              {DELIVERY_METHODS.map((m, i) => (
                <li key={m} className="group flex items-center gap-6 py-6 transition-colors duration-300 hover:bg-cream sm:px-4 sm:-mx-4">
                  <span className="font-serif text-sm text-gold-dark transition-colors group-hover:text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base font-medium text-primary/85">{t(m)}</span>
                </li>
              ))}
            </ol>
            <Link href="/contact" className="btn-primary mt-10">
              {t("Discuss Your Objective")} <FaArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ — real, visible Q&A for market-entry and trade questions */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="container-site grid items-start gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div>
            <span className="block h-px w-14 bg-gold" aria-hidden="true" />
            <h2 className="mt-6 font-serif text-3xl font-bold leading-tight text-primary sm:text-4xl">
              {t("Market entry questions, answered")}
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-gray-500">
              {t(
                "Straight answers on entering African markets, costs, ownership and timelines — from advisors who work these corridors every day."
              )}
            </p>
            <Link href="/contact" className="btn-primary mt-10">
              {t("Ask Your Own Question")} <FaArrowRight size={13} />
            </Link>
          </div>

          <div className="divide-y divide-gray-200 border-y border-gray-200">
            {FAQS.map((faq) => (
              <details key={faq.question} className="group">
                <summary className="flex list-none cursor-pointer items-center justify-between gap-6 py-6 text-base font-semibold text-primary/90 transition-colors hover:text-gold-dark [&::-webkit-details-marker]:hidden">
                  {t(faq.question)}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold/50 font-serif text-lg text-gold-dark transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 text-sm leading-relaxed text-gray-500">{t(faq.answer)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Statement word="STRATEGY" sub="From first assessment to a deal that closes." />
    </>
  );
}