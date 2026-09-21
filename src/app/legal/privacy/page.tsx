import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How ACE Global Nexus collects, uses, stores and protects your personal information when you use our website or contact us.",
};

const SECTIONS = [
  {
    title: "1. Who we are",
    body: [
      "ACE Global Nexus is a trade, investment and strategic advisory firm based in Yaoundé, Cameroon. This Privacy Policy explains how we collect, use, store and protect personal information when you visit ace-global-nexus.com or contact us through it.",
      "For any privacy-related question, contact: chris.ekom@aceglobalnexus.com.",
    ],
  },
  {
    title: "2. Information we collect",
    body: [
      "Information you give us. When you use our contact form or email us, we receive the details you provide — typically your name, email address, phone number, company, country, the topic and service of interest, and the message itself.",
      "Technical information. Like most websites, our servers and hosting providers may record limited technical data such as your IP address, browser type, device type, pages visited, referral source and approximate timestamps. This helps us keep the site secure, understand general usage and fix technical issues.",
      "We do not collect sensitive categories of personal data (such as health, religion or political opinions), and we ask that you do not include financial or other sensitive details in public messages.",
    ],
  },
  {
    title: "3. How we use your information",
    body: [
      "We use the information you provide to respond to your inquiry, assess how we can help, and — if you continue working with us — to deliver our advisory services.",
      "Technical information is used to maintain and improve the website's security, performance and usability, and to understand what content is most useful to visitors.",
      "We do not sell, rent or trade your personal information to third parties for marketing purposes.",
    ],
  },
  {
    title: "4. Legal basis for processing",
    body: [
      "We process personal information on the following bases: your consent, given when you submit an inquiry; the legitimate interest of running our business and responding to prospective clients; and, where applicable, steps taken before entering into a contract with you.",
      "You may withdraw your consent at any time by contacting us, without affecting the lawfulness of processing carried out before the withdrawal.",
    ],
  },
  {
    title: "5. Sharing and third parties",
    body: [
      "To operate the website we rely on trusted service providers — for example hosting and infrastructure, email delivery, and image storage and delivery. Where your inquiry involves images or documents, they may pass through these providers. Each provider is engaged with appropriate data-protection safeguards.",
      "We may disclose personal information where required by law, regulation or legal process, or to protect the rights, property or safety of ACE Global Nexus, our clients or the public.",
      "We never sell your personal information.",
    ],
  },
  {
    title: "6. Data security and retention",
    body: [
      "We apply reasonable organisational and technical measures to protect personal information — including secure transmission (HTTPS) over the internet and restricted access to stored data. No method of transmission over the internet is completely secure, and we cannot guarantee absolute security.",
      "We retain contact-form messages and correspondence only as long as needed to respond to you and, where relevant, to maintain records for legitimate business purposes. Retention periods are kept as short as reasonably possible.",
    ],
  },
  {
    title: "7. International data transfers",
    body: [
      "Our website is hosted through international service providers. Data you submit may therefore be processed in countries outside Cameroon. Where such processing involves your personal information, we rely on providers that offer appropriate safeguards (such as standard contractual clauses or equivalent mechanisms) where required by applicable law.",
    ],
  },
  {
    title: "8. Your rights",
    body: [
      "Depending on your location, you may have rights under applicable law (including the EU General Data Protection Regulation where it applies) to request: access to your personal information; correction of inaccurate data; erasure of your data, subject to legal obligations; restriction of processing in certain circumstances; and data portability.",
      "You may also object to processing based on legitimate interest. To exercise any of these rights, contact us at chris.ekom@aceglobalnexus.com. We will respond within the time required by applicable law. You also have the right to lodge a complaint with your local data-protection supervisory authority.",
    ],
  },
  {
    title: "9. Children's privacy",
    body: [
      "Our services are directed at businesses and professionals. We do not knowingly collect personal information from children under the age of 16. If you believe a child has provided us with personal information, contact us and we will delete it where required.",
    ],
  },
  {
    title: "10. Changes to this policy",
    body: [
      "We may update this Privacy Policy from time to time. The \"Last updated\" date at the top of this page indicates the latest revision. Material changes will be highlighted on this page.",
    ],
  },
  {
    title: "11. Contact",
    body: [
      "For questions about this policy or how your information is handled, email chris.ekom@aceglobalnexus.com or use the contact page. This policy is provided as general information and does not constitute legal advice.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="21 September 2026">
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