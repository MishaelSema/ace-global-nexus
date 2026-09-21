import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How ace-global-nexus.com uses cookies and similar technologies, why we use them, and how you can control them in your browser.",
};

const SECTIONS = [
  {
    title: "1. What are cookies?",
    body: [
      "Cookies are small text files stored on your device by your web browser when you visit a website. They allow the site to remember your preferences, recognise a returning visitor and understand how the site is used.",
      "This policy explains which cookies and similar technologies may be set when you use ace-global-nexus.com and how you can control them.",
    ],
  },
  {
    title: "2. How we use cookies",
    body: [
      "We use cookies and similar client-side storage for the minimum necessary to run the website properly and securely. That includes short-lived session and security cookies used by the website's underlying technology to keep pages loading correctly and to protect forms from abuse.",
      "We aim to keep cookie use minimal: we do not currently run advertising or third-party marketing trackers on this site.",
    ],
  },
  {
    title: "3. Categories of cookies",
    body: [
      "Strictly necessary cookies — required for the website to function, such as session integrity and security tokens. These cannot be switched off. Where required by law, consent or specific notice for these is not requested because they are essential to provide the service you asked for.",
      "Preference cookies — used only if we later offer personalisation (for example remembering a language or display preference).",
      "Analytics cookies — used to understand aggregate visitor behaviour (for example which pages are read). Where we enable analytics, we will describe the provider and update this policy, and we will not load such cookies before valid consent where required by law.",
      "Marketing/advertising cookies — we do not currently use these.",
    ],
  },
  {
    title: "4. Specific cookies used",
    body: [
      "Because this website is built on the Next.js framework and hosted through international infrastructure, the platform may set small technical cookies (such as a short-lived session identifier) as part of routine operation. These are strictly necessary and do not identify you personally beyond your current visit.",
      "If we introduce consent-managed analytics or third-party cookies in the future, we will list them here and update the \"Last updated\" date.",
    ],
  },
  {
    title: "5. Managing cookies in your browser",
    body: [
      "You can control and delete cookies through your browser's settings. Most browsers allow you to block or remove cookies, or to be notified before a cookie is set. The settings differ between browsers — you can usually find them under the privacy or security section of your browser's preferences.",
      "Please note that blocking strictly necessary cookies may prevent parts of the website from working correctly, including the contact form and other interactive features.",
    ],
  },
  {
    title: "6. Consent",
    body: [
      "Where cookies are not strictly necessary (for example analytics or preference cookies), we will request your consent before they are placed, in accordance with the ePrivacy Directive and the GDPR. You may change or withdraw your consent at any time through your browser settings or the consent options provided on the site.",
    ],
  },
  {
    title: "7. Changes to this policy",
    body: [
      "We may update this Cookie Policy as our site and technologies evolve. The \"Last updated\" date reflects the most recent revision. Significant changes will be noted on this page.",
    ],
  },
  {
    title: "8. Contact",
    body: [
      "Questions about this Cookie Policy? Contact chris.ekom@aceglobalnexus.com. This policy is provided as general information and does not constitute legal advice.",
    ],
  },
];

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie Policy" updated="21 September 2026">
      {SECTIONS.map((s) => (
        <section key={s.title}>
          <h2>{s.title}</h2>
          {s.body.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </section>
      ))}
    </LegalPage>
  );
}