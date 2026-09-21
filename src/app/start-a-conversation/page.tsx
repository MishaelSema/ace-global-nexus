import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Statement from "@/components/Statement";
import ConversationWizard from "@/components/ConversationWizard";

export const metadata: Metadata = {
  title: "Start a Conversation — ACE Global Nexus",
  description:
    "Tell us about your market, your sector and your objective in three quick steps. We map the path from opportunity to results.",
};

export default function StartAConversationPage() {
  return (
    <>
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