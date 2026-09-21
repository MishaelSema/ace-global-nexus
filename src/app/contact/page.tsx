import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Statement from "@/components/Statement";
import JsonLd from "@/components/JsonLd";
import ContactForm from "@/components/ContactForm";
import { canonical, openGraphMeta, breadcrumbSchema, professionalServiceSchema } from "@/lib/seo";
import { tForLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Contact Us | Trade & Investment Advisory in Cameroon",
  description:
    "Talk to a Cameroon-based trade & investment advisor. Market entry, matchmaking, export and diaspora services. Phone +237 675 033 792 or send a message today.",
  ...canonical("/contact"),
  ...openGraphMeta(
    "/contact",
    "Contact Us | Trade & Investment Advisory in Cameroon",
    "Talk to a Cameroon-based trade & investment advisor. Market entry, matchmaking, export and diaspora services. Phone +237 675 033 792 or send a message today."
  ),
};

export default function ContactPage() {
  const t = tForLocale();
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
          professionalServiceSchema(),
        ]}
      />
      <PageHero
        title={
          <>
            {t("Let's start")} <span className="italic text-gold">{t("the conversation")}</span>
          </>
        }
        description={t(
          "Tell us about your market, your sector and your objective — and we will map the path from opportunity to results."
        )}
      />
      <ContactForm />
      <Statement word="CONNECT" sub="You and the right markets, partners and opportunities." />
    </>
  );
}