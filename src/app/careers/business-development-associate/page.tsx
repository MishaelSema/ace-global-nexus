import type { Metadata } from "next";
import Link from "next/link";
import {
  FaArrowRight,
  FaLocationDot,
  FaHandshake,
  FaChartLine,
  FaClock,
  FaEnvelope,
  FaPhone,
  FaCheck,
} from "react-icons/fa6";
import { JOB } from "@/lib/jobs";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import Statement from "@/components/Statement";
import JsonLd from "@/components/JsonLd";
import ApplicationForm from "@/components/ApplicationForm";
import { localizedPageMeta, breadcrumbSchema, jobPostingSchema } from "@/lib/seo";
import { tForLocale, pathForLocale, getLocale } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = getLocale();
  return localizedPageMeta({
    path: JOB.path,
    locale,
    // This route ships its own opengraph-image.tsx (a recruitment card, not the
    // shared brand card), so `images` must stay unset — any value there
    // suppresses the file-based generator for both Open Graph and Twitter.
    image: null,
    en: {
      title: "Business Development Associate Job | ACE Global Nexus",
      description:
        "Independent, commission-based business development role in Yaoundé and remote — introduce ACE Global Nexus to clients across trade, investment and energy.",
    },
    fr: {
      title: "Recrutement — Développement Commercial | ACE Global Nexus",
      description:
        "Poste indépendant, rémunéré à la commission, à Yaoundé et à distance — présentez ACE Global Nexus à des clients en commerce, investissement et énergie.",
    },
  });
}

const FACTS = [
  { icon: FaLocationDot, label: "Location", value: JOB.location },
  { icon: FaHandshake, label: "Engagement", value: JOB.engagement },
  { icon: FaChartLine, label: "Remuneration", value: JOB.remuneration },
  { icon: FaClock, label: "Duration", value: JOB.duration },
];

export default function BusinessDevelopmentAssociatePage() {
  const t = tForLocale();
  const p = pathForLocale();
  const locale = getLocale();

  const applyMailto = `mailto:${JOB.email}?subject=${encodeURIComponent(JOB.emailSubject)}`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(
            [
              { name: t("Home"), path: "/" },
              { name: t("Careers"), path: JOB.path },
            ],
            locale
          ),
          jobPostingSchema(
            {
              title: JOB.title,
              summary: JOB.summary,
              datePosted: JOB.datePosted,
              employmentType: JOB.employmentType,
              path: JOB.path,
            },
            locale
          ),
        ]}
      />

      <PageHero
        compact
        title={
          <>
            {t("Recruitment opportunity —")}{" "}
            <span className="italic text-gold">{t(JOB.title)}</span>
          </>
        }
        description={t(
          "Open doors for ACE Global Nexus in Cameroon and international markets — and earn performance-based commission for the business you generate."
        )}
      >
        <a href="#apply" className="btn-primary !text-base">
          {t("Apply now")} <FaArrowRight size={14} />
        </a>
        <a
          href="#role"
          className="btn border border-white/30 text-white transition-colors hover:border-gold hover:text-gold"
        >
          {t("Role details")}
        </a>
      </PageHero>

      {/* FACTS */}
      <section className="bg-white py-14 sm:py-16">
        <div className="container-site">
          <dl className="grid gap-px overflow-hidden rounded-3xl border border-gray-100 bg-gray-100 sm:grid-cols-2 lg:grid-cols-4">
            {FACTS.map((fact) => (
              <div key={fact.label} className="bg-white p-7">
                <fact.icon className="text-gold" aria-hidden="true" />
                <dt className="mt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-primary/40">
                  {t(fact.label)}
                </dt>
                <dd className="mt-2 font-serif text-lg font-bold leading-snug text-primary">
                  {t(fact.value)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* INTRO */}
      <section id="role" className="scroll-mt-24 bg-white pb-4 pt-14 sm:pt-20">
        <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <Reveal>
            <span className="block font-serif text-sm text-gold-dark">01 — {t("The opportunity")}</span>
            <h2 className="mt-5 font-serif text-3xl font-bold leading-tight text-primary sm:text-4xl">
              {t("Represent a firm that connects businesses and markets.")}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="leading-relaxed text-gray-600">{t(JOB.summary)}</p>
            <p className="mt-5 leading-relaxed text-gray-500">
              {t(
                "This is an independent commercial engagement: you work your own network, on your own schedule, and are paid on the business you bring in."
              )}
            </p>
          </Reveal>
        </div>
      </section>

      {/* RESPONSIBILITIES */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-20">
          <Reveal>
            <span className="block font-serif text-sm text-gold-dark">02 — {t("Key Responsibilities")}</span>
            <h2 className="mt-5 font-serif text-3xl font-bold leading-tight text-primary sm:text-4xl">
              {t("What you will do as an associate.")}
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-gray-500">
              {t(
                "You are the introduction. We bring the advisory capability — you bring the relationships, the meetings and the follow-through."
              )}
            </p>
          </Reveal>
          <div className="divide-y divide-gray-100 border-y border-gray-100">
            {JOB.responsibilities.map((item, i) => (
              <Reveal key={item} delay={(i % 3) * 70}>
                <div className="flex items-start gap-6 py-5">
                  <span className="mt-1 font-serif text-sm text-gold-dark">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm font-medium leading-relaxed text-primary/85 sm:text-base">
                    {t(item)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* QUALIFICATIONS */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="container-site">
          <Reveal>
            <span className="block font-serif text-sm text-gold-dark">03 — {t("Preferred Qualifications")}</span>
            <h2 className="mt-5 max-w-2xl font-serif text-3xl font-bold leading-tight text-primary sm:text-4xl">
              {t("Who thrives in this role.")}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-x-14 sm:grid-cols-2">
            {JOB.qualifications.map((item, i) => (
              <Reveal key={item} delay={(i % 2) * 80}>
                <div className="flex items-start gap-4 border-b border-gray-200 py-6">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold/15 text-[11px] text-gold-dark">
                    <FaCheck aria-hidden="true" />
                  </span>
                  <p className="leading-relaxed text-gray-600">{t(item)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OFFER */}
      <section className="relative overflow-hidden bg-primary py-20 text-white sm:py-28">
        <div className="container-site relative grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <Reveal>
            <span className="block font-serif text-sm text-gold">04 — {t("What We Offer")}</span>
            <h2 className="mt-5 font-serif text-3xl font-bold leading-tight sm:text-4xl">
              {t("A commercial partnership, not a salaried post.")}
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-white/65">{t(JOB.conditions)}</p>
          </Reveal>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {JOB.offer.map((item, i) => (
              <Reveal key={item} delay={(i % 3) * 70}>
                <div className="flex items-start gap-6 py-5">
                  <span className="mt-1 font-serif text-sm text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-sm font-medium leading-relaxed text-white/80 sm:text-base">{t(item)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO APPLY */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-site">
          <Reveal>
            <span className="block font-serif text-sm text-gold-dark">05 — {t("How to Apply")}</span>
            <h2 className="mt-5 max-w-2xl font-serif text-3xl font-bold leading-tight text-primary sm:text-4xl">
              {t("Three steps to put your name forward.")}
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <Reveal>
              <div className="h-full rounded-3xl border border-gray-100 bg-cream p-8">
                <span className="font-serif text-sm text-gold-dark">01</span>
                <h3 className="mt-3 font-serif text-xl font-bold text-primary">{t("Prepare your documents")}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">
                  {t("Your CV, plus a short statement covering three points:")} {t(JOB.statementPrompt)}
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="h-full rounded-3xl border border-gray-100 bg-cream p-8">
                <span className="font-serif text-sm text-gold-dark">02</span>
                <h3 className="mt-3 font-serif text-xl font-bold text-primary">{t("Apply online")}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">
                  {t(
                    "Use the form below: your contact details, your CV as a file or a link, and your statement."
                  )}
                </p>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="h-full rounded-3xl border border-gray-100 bg-cream p-8">
                <span className="font-serif text-sm text-gold-dark">03</span>
                <h3 className="mt-3 font-serif text-xl font-bold text-primary">{t("Or apply by email / WhatsApp")}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">
                  {t("Send your CV and statement with the subject line:")}{" "}
                  <span className="font-medium text-primary/80">“{t(JOB.emailSubject)}”</span>
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="mt-8 flex flex-wrap items-center gap-4 rounded-3xl border border-gold/40 bg-gold/5 p-6 sm:p-8">
              <a href={applyMailto} className="btn-primary">
                <FaEnvelope /> {t("Email your application")}
              </a>
              <a
                href={JOB.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn border border-primary/20 text-primary transition-colors hover:border-gold hover:text-gold-dark"
              >
                <FaPhone /> {t("WhatsApp / Call")}
              </a>
              <p className="text-xs leading-relaxed text-gray-500">
                {t("Shortlisted candidates will be contacted directly by email or WhatsApp.")}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section id="apply" className="scroll-mt-24 bg-white pb-24 sm:pb-32">
        {/*
          Splits at md (768px), not lg (1024px). The breakpoint is evaluated
          against the viewport while the container is capped by `container-site`,
          so at lg the form and the apply-details sidebar stayed stacked on any
          window narrower than 1024px — including a laptop at 150% display
          scaling. There is room for two columns from md up.
        */}
        <div className="container-site grid gap-14 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-10 lg:gap-16">
          <ApplicationForm />
          <aside className="space-y-8">
            <div className="rounded-3xl bg-primary p-8 text-white sm:p-10">
              <h3 className="font-serif text-xl font-bold text-gold">{t("Apply by email or WhatsApp")}</h3>
              <ul className="mt-8 space-y-6">
                <li className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-gold">
                    <FaEnvelope aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">{t("Email")}</p>
                    <a
                      href={applyMailto}
                      className="mt-1 block break-all text-sm font-medium transition-colors hover:text-gold"
                    >
                      {JOB.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-gold">
                    <FaPhone aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">
                      {t("Phone / WhatsApp")}
                    </p>
                    <a
                      href={JOB.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-sm font-medium transition-colors hover:text-gold"
                    >
                      {JOB.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-gold">
                    <FaLocationDot aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">{t("Head office")}</p>
                    <p className="mt-1 text-sm font-medium">{t(JOB.location)}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-dashed border-gold/50 bg-cream p-8">
              <h3 className="font-serif text-xl font-bold text-primary">{t("Before you apply")}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                {t(
                  "This is an independent, commission-based engagement with no fixed salary. Only apply if that arrangement suits you."
                )}
              </p>
              <Link
                href={p("/about")}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold-dark transition-colors hover:text-primary"
              >
                {t("Learn about ACE Global Nexus")} <FaArrowRight size={12} />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <Statement word="JOIN" sub="Independent. Performance-based. Renewable." />
    </>
  );
}
