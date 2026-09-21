import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";
import { requireAdmin } from "@/lib/adminAuth";
import { sendEmail, getContactReceivedTemplate, getContactConfirmationTemplate, ContactSubmission } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  let body: Partial<ContactSubmission>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }

  if (!body.name || !body.email || !body.message) {
    return NextResponse.json({ success: false, error: "Name, email and message are required" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json({ success: false, error: "Please enter a valid email address" }, { status: 400 });
  }

  const submission: ContactSubmission = {
    name: String(body.name).slice(0, 120),
    email: String(body.email).slice(0, 160),
    phone: body.phone ? String(body.phone).slice(0, 40) : undefined,
    company: body.company ? String(body.company).slice(0, 120) : undefined,
    country: body.country ? String(body.country).slice(0, 80) : undefined,
    topic: body.topic ? String(body.topic).slice(0, 80) : undefined,
    service: body.service ? String(body.service).slice(0, 120) : undefined,
    message: String(body.message).slice(0, 5000),
  };

  try {
    await connectDB();
    const saved = await ContactMessage.create(submission);

    const smtpConfigured = !!(process.env.SMTP_USER && process.env.SMTP_PASS);
    const adminInbox = process.env.CONTACT_EMAIL || process.env.SMTP_USER || "";
    if (smtpConfigured && adminInbox) {
      try {
        const topic = submission.topic || "General";
        await sendEmail(adminInbox, `New inquiry: ${submission.name} — ${topic}`, getContactReceivedTemplate(submission));
      } catch (e) {
        console.error("Contact notification email failed:", e);
      }
      try {
        await sendEmail(submission.email, "Thanks for contacting ACE Global Nexus — we've received your inquiry", getContactConfirmationTemplate(submission));
      } catch (e) {
        console.error("Contact confirmation email failed:", e);
      }
    }

    return NextResponse.json({ success: true, data: saved }, { status: 201 });
  } catch (error) {
    console.error("Contact submit error:", error);
    return NextResponse.json({ success: false, error: "Failed to submit message" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { searchParams } = new URL(request.url);
    const unreadOnly = searchParams.get("unread");
    const filter: { read?: boolean } = {};
    if (unreadOnly === "1") filter.read = false;

    await connectDB();
    const messages = await ContactMessage.find(filter).sort({ createdAt: -1 }).limit(500).lean();
    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    console.error("Fetch messages error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch messages" }, { status: 500 });
  }
}