import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for ace-global-nexus.com — the agreement governing your use of the ACE Global Nexus website and our trade and investment advisory services.",
};

const SECTIONS = [
  {
    title: "1. Agreement to these terms",
    body: [
      "These Terms of Service (“Terms”) govern your access to and use of the ACE Global Nexus website (ace-global-nexus.com) and the trade, investment and strategic advisory services we provide.",
      "By browsing this website or contacting us through it, you accept these Terms. If you do not agree with any part of them, please do not use the website.",
    ],
  },
  {
    title: "2. About us",
    body: [
      "ACE Global Nexus is a trade, investment and strategic advisory firm headquartered in Yaoundé, Cameroon, connecting businesses, investors and opportunities across Africa and the international marketplace.",
      "Nothing on this website creates a client–adviser relationship unless and until a separate engagement agreement is signed by both parties.",
    ],
  },
  {
    title: "3. Nature of our services",
    body: [
      "Our services include market entry guidance, trade and investment facilitation, business matchmaking, market intelligence, export promotion, sourcing support, investor advisory and corporate training.",
      "The information we share — on this website, in consultations, briefs or proposals — is provided to help you evaluate opportunities. It does not guarantee any particular commercial outcome.",
    ],
  },
  {
    title: "4. No guarantee of results",
    body: [
      "International business outcomes depend on factors outside any adviser's control, including market conditions, third-party decisions, regulation and your own execution.",
      "We work diligently toward your objectives, but we do not and cannot guarantee profits, contracts, funding, partnerships or any specific result. Any indication of results in case studies or references reflects past situations and is not a promise of future performance.",
    ],
  },
  {
    title: "5. Not professional or investment advice",
    body: [
      "Content on this website is general information about trade, investment and business topics. It is not legal, financial, tax or investment advice under any jurisdiction.",
      "Before making investment, contractual or legal decisions, you should obtain advice from qualified professionals licensed in your jurisdiction. We do not accept liability for decisions made solely on the basis of this website's content.",
    ],
  },
  {
    title: "6. Confidentiality and communications",
    body: [
      "Information you share with us — through the contact form, email or consultations — is treated as confidential and used to respond to your inquiry and, with your agreement, to work with you.",
      "Do not send sensitive personal, commercial or financial information through the public contact form. Once contact is established, we will agree on a secure channel appropriate to the matter.",
    ],
  },
  {
    title: "7. Intellectual property",
    body: [
      "The ACE Global Nexus name, logo, brand identity and all content published on this website (text, graphics, design, insights and original research) are our property or used with permission, and are protected by applicable intellectual property law.",
      "You may view, download and share content for personal, non-commercial purposes with attribution. You may not republish, sell or modify our content or identity without written permission, and you may not use our logo or name in a way that implies endorsement of your business.",
    ],
  },
  {
    title: "8. Acceptable use",
    body: [
      "You agree not to misuse the website, including attempting to gain unauthorised access to our systems, transmitting malware, scraping data at scale, or using the site to harass or defraud others.",
      "We may restrict access to any part of the website if we reasonably believe these Terms are being breached.",
    ],
  },
  {
    title: "9. Third-party links and content",
    body: [
      "Our website and insights may reference or link to external resources, reports or partner organisations. We are not responsible for the content, accuracy or practices of third-party websites and do not endorse them simply by linking to them.",
    ],
  },
  {
    title: "10. Limitation of liability",
    body: [
      "To the maximum extent permitted by law, ACE Global Nexus, its founder and any affiliated persons shall not be liable for indirect, incidental or consequential damages, or for loss of profits, data or opportunities, arising from your use of this website or reliance on its content.",
      "Where the website is used free of charge, our total liability arising from its use is limited to the greatest extent permitted by applicable law.",
    ],
  },
  {
    title: "11. Governing law",
    body: [
      "These Terms are governed by the laws of the Republic of Cameroon, without regard to conflict-of-law principles. Any dispute relating to the website that cannot be resolved amicably shall fall within the jurisdiction of the competent courts of Cameroon.",
    ],
  },
  {
    title: "12. Changes to these terms",
    body: [
      "We may update these Terms from time to time to reflect changes in our services or legal requirements. The \"Last updated\" date at the top of this page indicates the latest revision. Continued use of the website after changes are published constitutes acceptance of the revised Terms.",
    ],
  },
  {
    title: "13. Contact",
    body: [
      "If you have questions about these Terms, contact us at chris.ekom@aceglobalnexus.com or via the contact page. This document is provided as general information and does not constitute legal advice.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="21 September 2026">
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