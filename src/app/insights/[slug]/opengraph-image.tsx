import { ImageResponse } from "next/og";
import { connectDB } from "@/lib/mongodb";
import Insight from "@/models/Insight";
import { SITE_URL } from "@/lib/seo";
import { getLocale } from "@/lib/i18n/server";
import { translate, localizedField } from "@/lib/i18n/core";

export const alt = "ACE Global Nexus insight article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated on demand (avoids a static-prerender edge case in Next 14.2).
export const dynamic = "force-dynamic";

export default async function Image({ params }: { params: { slug: string } }) {
  const fallback = (
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#0b1e38" }} />
  );

  const locale = getLocale();
  const eyebrow = `ACE GLOBAL NEXUS — ${translate(locale, "INSIGHTS")}`;

  try {
    await connectDB();
    const post = await Insight.findOne({ slug: params.slug })
      .select("title titleFr")
      .lean<{ title?: string; titleFr?: string }>();
    const headline = post ? localizedField(post, locale, "title") : "ACE Global Nexus";

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
          <div style={{ display: "flex", color: "#c9a227", fontSize: 26, letterSpacing: 3 }}>
            {eyebrow}
          </div>
          <div style={{ display: "flex", fontSize: 54, fontWeight: 700, lineHeight: 1.15, maxWidth: 1000 }}>
            {headline}
          </div>
          <div style={{ display: "flex", color: "rgba(250,247,240,0.55)", fontSize: 20, letterSpacing: 2 }}>
            {SITE_URL}
          </div>
        </div>
      ),
      { ...size }
    );
  } catch {
    return new ImageResponse(fallback, { ...size });
  }
}