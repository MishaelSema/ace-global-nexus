import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Insight from "@/models/Insight";
import { requireAdmin } from "@/lib/adminAuth";
import { slugify } from "@/lib/utils";
import { deleteFromCloudinary } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

function isObjectId(id: string): boolean {
  return /^[a-f0-9]{24}$/i.test(id);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }

  try {
    const { id } = await params;
    if (!isObjectId(id)) {
      return NextResponse.json({ success: false, error: "Invalid id" }, { status: 400 });
    }

    await connectDB();
    const insight = await Insight.findById(id);
    if (!insight) {
      return NextResponse.json({ success: false, error: "Insight not found" }, { status: 404 });
    }

    const allowed = ["title", "excerpt", "content", "category", "tags", "coverUrl", "coverPublicId", "author", "published", "featured"];
    for (const key of allowed) {
      if (key in body) {
        if (key === "tags") {
          insight.tags = Array.isArray(body[key]) ? (body[key] as string[]) : String(body[key] || "").split(",").map((t: string) => t.trim()).filter(Boolean);
        } else {
          (insight as unknown as Record<string, unknown>)[key] = body[key];
        }
      }
    }
    if (typeof body.title === "string" && body.title) {
      const newSlug = slugify(body.title);
      if (newSlug && newSlug !== insight.slug) {
        let slug = newSlug;
        let n = 2;
        while (await Insight.exists({ slug, _id: { $ne: insight._id } })) {
          slug = `${newSlug}-${n++}`;
        }
        insight.slug = slug;
      }
    }
    if (body.published && !insight.publishedAt) {
      insight.publishedAt = new Date();
    }

    const updated = await insight.save();
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Update insight error:", error);
    return NextResponse.json({ success: false, error: "Failed to update insight" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    if (!isObjectId(id)) {
      return NextResponse.json({ success: false, error: "Invalid id" }, { status: 400 });
    }

    await connectDB();
    const insight = await Insight.findByIdAndDelete(id);
    if (!insight) {
      return NextResponse.json({ success: false, error: "Insight not found" }, { status: 404 });
    }

    if (insight.coverPublicId) {
      await deleteFromCloudinary(insight.coverPublicId, "image");
    }

    return NextResponse.json({ success: true, message: "Insight deleted" });
  } catch (error) {
    console.error("Delete insight error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete insight" }, { status: 500 });
  }
}