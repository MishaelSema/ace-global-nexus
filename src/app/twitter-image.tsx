import { ImageResponse } from "next/og";
import { getLocale } from "@/lib/i18n/server";
import { translate } from "@/lib/i18n/core";

export const alt = "ACE Global Nexus — Connecting businesses, markets & opportunity";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated on demand (avoids a static-prerender edge case in Next 14.2).
export const dynamic = "force-dynamic";

export default async function TwitterImage() {
  const locale = getLocale();
  const slogan = translate(locale, "Connecting businesses, markets & opportunity");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#071527",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#faf7f0",
            fontSize: 84,
            fontWeight: 700,
            letterSpacing: 4,
          }}
        >
          ACE GLOBAL NEXUS
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            color: "#e3c66b",
            fontSize: 36,
            fontStyle: "italic",
          }}
        >
          {slogan}
        </div>
      </div>
    ),
    { ...size }
  );
}