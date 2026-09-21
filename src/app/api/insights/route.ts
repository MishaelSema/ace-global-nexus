import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Insight from "@/models/Insight";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const limit = Math.min(Number(searchParams.get("limit")) || 100, 100);
    const category = searchParams.get("category");
    const slug = searchParams.get("slug");

    const filter: { published: boolean; publishedAt: { $exists: boolean }; category?: string; slug?: string } = {
      published: true,
      publishedAt: { $exists: true },
    };
    if (category) filter.category = category;
    if (slug) filter.slug = slug;

    const insights = await Insight.find(filter)
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(limit)
      .select("-content -coverPublicId -published -updatedAt")
      .lean();

    return NextResponse.json({ success: true, data: insights });
  } catch (error) {
    console.error("Fetch insights error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch insights" }, { status: 500 });
  }
}