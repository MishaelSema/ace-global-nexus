import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Statement from "@/components/Statement";
import ConversationWizard from "@/components/ConversationWizard";
import JsonLd from "@/components/JsonLd";
import { localizedPageMeta, breadcrumbSchema } from "@/lib/seo";
import { tForLocale, getLocale } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = getLocale();
  return localizedPageMeta({
    path: "/start-a-conversation",
    locale,
    en: {
      title: "Start a Conversation | Market Entry & Investment Advisory",
      description:
        "Tell us your market, sector and objective in 3 quick steps. We map the path from opportunity to results – no obligation, no jargon.",
    },
    fr: {
      title: "Démarrer une Conversation | Conseil en Entrée de Marché & Investissement",
      description:
        "Dites-nous votre marché, votre secteur et votre objectif en 3 étapes rapides. Nous traçons le chemin de l'opportunité au résultat — sans engagement, sans jargon.",
    },
  });
}

export default function StartAConversationPage() {
  const t = tForLocale();
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(
            [
              { name: "Home", path: "/" },
              { name: "Start a Conversation", path: "/start-a-conversation" },
            ],
            getLocale()
          ),
        ]}
      />
      <PageHero
        compact
        title={
          <>
            {t("Start")} <span className="italic text-gold">{t("the conversation")}</span>
          </>
        }
        description={t(
          "Share your market, your sector and your objective in a few short steps — and we will map the path from opportunity to results."
        )}
      />
      <ConversationWizard />
      <Statement word="START" sub="Every opportunity begins with a conversation." />
    </>
  );
}