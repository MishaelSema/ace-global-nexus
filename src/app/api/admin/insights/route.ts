import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Insight from "@/models/Insight";
import { requireAdmin } from "@/lib/adminAuth";
import { slugify } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    await connectDB();
    const insights = await Insight.find().sort({ updatedAt: -1, createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: insights });
  } catch (error) {
    console.error("Admin fetch insights error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch insights" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  interface CreateInsightBody {
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    category?: string;
    tags?: string[] | string;
    coverUrl?: string;
    coverPublicId?: string;
    author?: string;
    published?: boolean;
    featured?: boolean;
  }

  let body: CreateInsightBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }

  if (!body?.title) {
    return NextResponse.json({ success: false, error: "Title is required" }, { status: 400 });
  }

  try {
    await connectDB();
    const baseSlug = slugify(body.title) || `insight-${Date.now()}`;
    let slug = baseSlug;
    let n = 2;
    while (await Insight.exists({ slug })) {
      slug = `${baseSlug}-${n++}`;
    }

    const insight = new Insight({
      title: body.title,
      slug: body.slug && slugify(body.slug) !== baseSlug ? slugify(body.slug) : slug,
      excerpt: body.excerpt || "",
      content: body.content || "",
      category: body.category || "Market Intelligence",
      tags: Array.isArray(body.tags) ? body.tags : String(body.tags || "").split(",").map((t: string) => t.trim()).filter(Boolean),
      coverUrl: body.coverUrl || "",
      coverPublicId: body.coverPublicId || "",
      author: body.author || "Christopher A. Ekom",
      published: !!body.published,
      featured: !!body.featured,
      publishedAt: body.published ? new Date() : undefined,
    });

    const saved = await insight.save();
    return NextResponse.json({ success: true, data: saved }, { status: 201 });
  } catch (error) {
    console.error("Create insight error:", error);
    return NextResponse.json({ success: false, error: "Failed to create insight" }, { status: 500 });
  }
}