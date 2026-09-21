import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Statement from "@/components/Statement";
import JsonLd from "@/components/JsonLd";
import ContactForm from "@/components/ContactForm";
import { localizedPageMeta, breadcrumbSchema, professionalServiceSchema } from "@/lib/seo";
import { tForLocale, getLocale } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = getLocale();
  return localizedPageMeta({
    path: "/contact",
    locale,
    en: {
      title: "Contact Us | Trade & Investment Advisory in Cameroon",
      description:
        "Talk to a Cameroon-based trade & investment advisor. Market entry, matchmaking, export and diaspora services. Phone +237 675 033 792 or send a message today.",
    },
    fr: {
      title: "Contactez-Nous | Conseil en Commerce & Investissement au Cameroun",
      description:
        "Parlez à un conseiller en commerce et investissement basé au Cameroun. Entrée de marché, mise en relation, export et services diaspora. Téléphone +237 675 033 792 ou envoyez un message dès aujourd'hui.",
    },
  });
}

export default function ContactPage() {
  const t = tForLocale();
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(
            [
              { name: "Home", path: "/" },
              { name: "Contact", path: "/contact" },
            ],
            getLocale()
          ),
          professionalServiceSchema(getLocale()),
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