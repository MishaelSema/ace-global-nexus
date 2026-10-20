import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";
import {
  sendEmail,
  getApplicationReceivedTemplate,
  getApplicationConfirmationTemplate,
  type ApplicationSubmission,
} from "@/lib/email";
import { isLocale } from "@/lib/i18n/core";
import { JOB } from "@/lib/jobs";

export const dynamic = "force-dynamic";

const MAX_CV_BYTES = 5 * 1024 * 1024;
const CV_EXTENSIONS = ["pdf", "doc", "docx", "rtf", "odt", "txt"];

/** Messages are stored in the same inbox as contact submissions, tagged by topic. */
const TOPIC = "Job application";

export async function POST(request: NextRequest) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }

  const value = (key: string) => String(form.get(key) ?? "").trim();
  const name = value("name").slice(0, 120);
  const email = value("email").slice(0, 160);
  const phone = value("phone").slice(0, 40);
  const location = value("location").slice(0, 80);
  const cvLink = value("cvLink").slice(0, 300);
  const statement = value("statement").slice(0, 5000);
  const locale = isLocale(value("locale")) ? value("locale") : "en";

  if (!name || !email || !statement) {
    return NextResponse.json(
      { success: false, error: "Name, email and statement are required" },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { success: false, error: "Please enter a valid email address" },
      { status: 400 }
    );
  }
  if (statement.length < 40) {
    return NextResponse.json(
      { success: false, error: "Please add a short statement describing your network and experience" },
      { status: 400 }
    );
  }

  // CV: an attached file and/or a link (Drive, Dropbox, LinkedIn portfolio…).
  const file = form.get("cv");
  let cvUrl = "";
  let cvPublicId = "";
  if (file instanceof Blob && file.size > 0) {
    const filename = file instanceof File && file.name ? file.name : `cv-${Date.now()}.pdf`;
    const extension = filename.split(".").pop()?.toLowerCase() ?? "";
    if (!CV_EXTENSIONS.includes(extension)) {
      return NextResponse.json(
        { success: false, error: "Unsupported CV format — please use PDF, DOC, DOCX, RTF, ODT or TXT" },
        { status: 400 }
      );
    }
    if (file.size > MAX_CV_BYTES) {
      return NextResponse.json(
        { success: false, error: "Your CV must be smaller than 5 MB" },
        { status: 400 }
      );
    }
    const uploaded = await uploadToCloudinary(
      Buffer.from(await file.arrayBuffer()),
      filename,
      "ace-global-nexus/applications"
    );
    if (!uploaded) {
      return NextResponse.json(
        {
          success: false,
          error: `Your CV could not be uploaded — please email it to ${JOB.email} instead`,
        },
        { status: 502 }
      );
    }
    cvUrl = uploaded.url;
    cvPublicId = uploaded.publicId;
  }

  if (!cvUrl && !cvLink) {
    return NextResponse.json(
      { success: false, error: "Please attach your CV or add a link to it" },
      { status: 400 }
    );
  }

  const submission: ApplicationSubmission = {
    name,
    email,
    phone: phone || undefined,
    location: location || undefined,
    role: JOB.title,
    statement,
    cvUrl: cvUrl || undefined,
    cvLink: cvLink || undefined,
    locale,
  };

  try {
    await connectDB();
    await ContactMessage.create({
      name,
      email,
      phone,
      // `country` is the badge slot the inbox renders next to the topic — used
      // here for where the candidate is based.
      country: location,
      topic: TOPIC,
      service: JOB.title,
      message: [statement, cvLink ? `CV / profile: ${cvLink}` : "", cvUrl ? `CV file: ${cvUrl}` : ""]
        .filter(Boolean)
        .join("\n\n"),
      cvUrl,
      cvPublicId,
    });
  } catch (error) {
    console.error("Application submit error:", error);
    // Do not leave an orphaned CV in Cloudinary when the record was never saved.
    if (cvPublicId) await deleteFromCloudinary(cvPublicId, "raw").catch(() => false);
    return NextResponse.json(
      { success: false, error: "Failed to submit your application" },
      { status: 500 }
    );
  }

  const smtpConfigured = !!(process.env.SMTP_USER && process.env.SMTP_PASS);
  const adminInbox = process.env.CONTACT_EMAIL || process.env.SMTP_USER || "";
  if (smtpConfigured && adminInbox) {
    try {
      await sendEmail(
        adminInbox,
        `New job application: ${name} — ${JOB.title}`,
        getApplicationReceivedTemplate(submission)
      );
    } catch (e) {
      console.error("Application notification email failed:", e);
    }
    try {
      await sendEmail(
        email,
        locale === "fr"
          ? "Nous avons bien reçu votre candidature — ACE Global Nexus"
          : "We've received your application — ACE Global Nexus",
        getApplicationConfirmationTemplate(submission)
      );
    } catch (e) {
      console.error("Application confirmation email failed:", e);
    }
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
