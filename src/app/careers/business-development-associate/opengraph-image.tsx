import { ImageResponse } from "next/og";
import { SITE_URL } from "@/lib/seo";
import { getLocale } from "@/lib/i18n/server";
import { translate } from "@/lib/i18n/core";
import { JOB } from "@/lib/jobs";

export const alt = "ACE Global Nexus — recruitment opportunity: Independent Business Development Associate";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated on demand (avoids a static-prerender edge case in Next 14.2).
export const dynamic = "force-dynamic";

/**
 * Social card for the careers posting — what renders when the URL is shared on
 * WhatsApp, LinkedIn, X or Slack. Deliberately not the generic brand card: a
 * job link has to say which role it is before anyone clicks.
 *
 * The page metadata sets no `images`, which is what allows this file-based
 * generator to be picked up (see `localizedPageMeta({ image: null })`).
 */
export default async function Image() {
  const locale = getLocale();
  const t = (text: string) => translate(locale, text);

  const eyebrow = t("RECRUITMENT OPPORTUNITY");
  const title = t(JOB.title);
  const chips = [t(JOB.location), t(JOB.remuneration), t(JOB.duration)];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0b1e38",
          color: "#faf7f0",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", color: "#c9a227", fontSize: 26, letterSpacing: 3 }}>
            ACE GLOBAL NEXUS — {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 62,
              fontWeight: 700,
              lineHeight: 1.14,
              marginTop: 38,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          {chips.map((chip) => (
            <div
              key={chip}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 24px",
                border: "1px solid rgba(201,162,39,0.55)",
                borderRadius: 999,
                color: "#f0d477",
                fontSize: 23,
              }}
            >
              {chip}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            color: "rgba(250,247,240,0.55)",
            fontSize: 21,
            letterSpacing: 2,
          }}
        >
          <span>{SITE_URL.replace(/^https?:\/\//, "")}</span>
          <span>{t("Connecting Businesses, Markets & Opportunities")}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
