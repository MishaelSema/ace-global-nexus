import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Insight from "@/models/Insight";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    await connectDB();
    const insight = await Insight.findOne({ slug, published: true, publishedAt: { $exists: true } })
      .select("-coverPublicId -updatedAt")
      .lean();

    if (!insight) {
      return NextResponse.json({ success: false, error: "Insight not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: insight });
  } catch (error) {
    console.error("Fetch insight error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch insight" }, { status: 500 });
  }
}