import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";
import { requireAdmin } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

function isObjectId(id: string): boolean {
  return /^[a-f0-9]{24}$/i.test(id);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    if (!isObjectId(id)) {
      return NextResponse.json({ success: false, error: "Invalid id" }, { status: 400 });
    }
    const body = await request.json();

    await connectDB();
    const message = await ContactMessage.findByIdAndUpdate(
      id,
      { read: body.read !== undefined ? !!body.read : true },
      { new: true }
    );
    if (!message) {
      return NextResponse.json({ success: false, error: "Message not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: message });
  } catch (error) {
    console.error("Update message error:", error);
    return NextResponse.json({ success: false, error: "Failed to update message" }, { status: 500 });
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
    const message = await ContactMessage.findByIdAndDelete(id);
    if (!message) {
      return NextResponse.json({ success: false, error: "Message not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Message deleted" });
  } catch (error) {
    console.error("Delete message error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete message" }, { status: 500 });
  }
}