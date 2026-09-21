import { ImageResponse } from "next/og";

export const alt = "ACE Global Nexus — Connecting businesses, markets & opportunity";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated on demand (avoids a static-prerender edge case in Next 14.2).
export const dynamic = "force-dynamic";

export default function OgImage() {
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
          backgroundColor: "#0b1e38",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            color: "#faf7f0",
            fontSize: 88,
            fontWeight: 700,
            letterSpacing: 4,
          }}
        >
          ACE GLOBAL NEXUS
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            color: "#c9a227",
            fontSize: 38,
            fontStyle: "italic",
          }}
        >
          Connecting businesses, markets &amp; opportunity
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 44,
            color: "rgba(250,247,240,0.55)",
            fontSize: 24,
            letterSpacing: 2,
          }}
        >
          TRADE · INVESTMENT · STRATEGIC ADVISORY
        </div>
      </div>
    ),
    { ...size }
  );
}