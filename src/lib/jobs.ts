import { CONTACT_INFO } from "@/lib/content";

/**
 * Open positions at ACE Global Nexus.
 *
 * Single source of truth for a careers page: the on-page copy, the JobPosting
 * JSON-LD, the generated social card and the application form all read from
 * here, so a role edit never has to be repeated in four places.
 *
 * Copy is authored in English and translated at render time through the shared
 * i18n dictionary (`t()` / `translate()`), like the rest of the site.
 */

const WHATSAPP_DIGITS = CONTACT_INFO.phone.replace(/\D/g, "");

export const JOB = {
  slug: "business-development-associate",
  path: "/careers/business-development-associate",

  /** Role title — also the `service` badge shown in the admin inbox. */
  title: "Independent Business Development Associate",

  /** schema.org employmentType. An independent commercial partnership is a contract, not an employee role. */
  employmentType: "CONTRACTOR",

  /** Kept as an ISO date for JobPosting JSON-LD; no `validThrough` — the role stays open until filled. */
  datePosted: "2026-10-20",

  location: "Yaoundé, Cameroon / Remote",
  engagement: "Independent Commercial Partnership",
  remuneration: "Performance-based commission (10–15%)",
  duration: "3 months, renewable",

  /** Used for the meta description and the JobPosting `description`. */
  summary:
    "ACE Global Nexus SARL, an international trade, investment advisory and business facilitation company headquartered in Yaoundé, is recruiting motivated and well-connected independent Business Development Associates to support its expansion in Cameroon and international markets.",

  responsibilities: [
    "Identify prospective corporate and institutional clients.",
    "Generate qualified leads for consultancy and advisory services.",
    "Facilitate introductions and business meetings.",
    "Promote ACE Global Nexus services to potential clients.",
    "Support commercial negotiations and follow-up.",
    "Develop opportunities in international trade, investment, agriculture, energy, infrastructure and technology.",
  ],

  qualifications: [
    "Experience in business development, sales, consultancy or commercial representation.",
    "Strong professional networks and communication skills.",
    "Ability to identify and develop business opportunities independently.",
    "Good command of English and/or French.",
    "Familiarity with Cameroonian and international business environments.",
  ],

  offer: [
    "Negotiable commission, initially proposed at 10–15% of eligible business generated.",
    "Flexible, independent working arrangements.",
    "Opportunity to collaborate with an emerging international consultancy.",
    "Potential for expanded assignments based on performance.",
  ],

  /** Stated under "What We Offer" — an independent arrangement carries no salary. */
  conditions: "No fixed salary is offered under this independent commercial arrangement.",

  /** What an application must contain, restated above the form and in the confirmation email. */
  statementPrompt:
    "Describe your business network, your relevant experience, and how you would generate clients for ACE Global Nexus.",

  /** Prefilled subject line for the "apply by email" route. */
  emailSubject: "Application — Business Development Associate",

  email: CONTACT_INFO.emailPrimary,
  phone: CONTACT_INFO.phone,
  phoneHref: CONTACT_INFO.phoneHref,
  whatsapp: `https://wa.me/${WHATSAPP_DIGITS}`,
} as const;
