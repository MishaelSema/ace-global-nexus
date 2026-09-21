import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Insight from "@/models/Insight";
import { requireAdmin } from "@/lib/adminAuth";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    await connectDB();
    const insight = await Insight.findById(id);
    if (!insight) {
      return NextResponse.json({ success: false, error: "Insight not found" }, { status: 404 });
    }

    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof Blob) || !file.size) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = file instanceof File ? file.name : `cover-${Date.now()}.jpg`;

    const existing = insight.coverPublicId;
    const result = await uploadToCloudinary(buffer, filename, "ace-global-nexus/covers");
    if (!result) {
      return NextResponse.json({ success: false, error: "Upload to Cloudinary failed" }, { status: 502 });
    }

    insight.coverUrl = result.url;
    insight.coverPublicId = result.publicId;
    await insight.save();

    if (existing) {
      await deleteFromCloudinary(existing, "image");
    }

    return NextResponse.json({ success: true, data: { coverUrl: result.url, coverPublicId: result.publicId } });
  } catch (error) {
    console.error("Cover upload error:", error);
    return NextResponse.json({ success: false, error: "Failed to upload cover" }, { status: 500 });
  }
}