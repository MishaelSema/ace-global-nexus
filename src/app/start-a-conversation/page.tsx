import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Statement from "@/components/Statement";
import ConversationWizard from "@/components/ConversationWizard";
import JsonLd from "@/components/JsonLd";
import { canonical, openGraphMeta, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Start a Conversation | Market Entry & Investment Advisory",
  description:
    "Tell us your market, sector and objective in 3 quick steps. We map the path from opportunity to results – no obligation, no jargon.",
  ...canonical("/start-a-conversation"),
  ...openGraphMeta(
    "/start-a-conversation",
    "Start a Conversation | Market Entry & Investment Advisory",
    "Tell us your market, sector and objective in 3 quick steps. We map the path from opportunity to results – no obligation, no jargon."
  ),
};

export default function StartAConversationPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Start a Conversation", path: "/start-a-conversation" },
          ]),
        ]}
      />
      <PageHero
        compact
        title={
          <>
            Start <span className="italic text-gold">the conversation</span>
          </>
        }
        description="Share your market, your sector and your objective in a few short steps — and we will map the path from opportunity to results."
      />
      <ConversationWizard />
      <Statement word="START" sub="Every opportunity begins with a conversation." />
    </>
  );
}