import nodemailer from "nodemailer";

const COMPANY_NAME = "ACE Global Nexus";
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || process.env.SMTP_USER || "";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.zoho.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS?.replace(/\s+/g, "").replace(/"/g, "") || "",
  },
  tls: { rejectUnauthorized: false, minVersion: "TLSv1.2" },
  connectionTimeout: 10000,
  greetingTimeout: 5000,
  socketTimeout: 15000,
});

function escapeHtml(value: string): string {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function multiline(value: string): string {
  return escapeHtml(value).replace(/\r?\n/g, "<br/>");
}

interface LayoutInput {
  title: string;
  subtitle: string;
  body: string;
}

// Branded email shell — header, gold accent band, content area, footer.
function wrap({ title, subtitle, body }: LayoutInput): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(title)} — ACE Global Nexus</title>
</head>
<body style="margin:0;padding:0;background:#f2efe9;font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#333;">
  <div style="max-width:620px;margin:0 auto;padding:24px 14px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      <tr>
        <td style="background:#0b1e38;border-radius:14px 14px 0 0;padding:30px 32px 24px;text-align:center;">
          <div style="color:#e3c66b;font-size:22px;font-weight:800;letter-spacing:3px;">ACE&nbsp;<span style="color:#f5d97e;">GLOBAL</span>&nbsp;NEXUS</div>
          <div style="color:#c9a227;font-size:10px;letter-spacing:4px;margin-top:8px;">CONNECT • GROW • INVEST • GO GLOBAL</div>
        </td>
      </tr>
      <tr>
        <td style="padding:0;border:none;">
          <div style="height:4px;background:linear-gradient(90deg,#c9a227,#f0d477,#c9a227);"></div>
        </td>
      </tr>
      <tr>
        <td style="background:#ffffff;padding:34px 34px 26px;border-left:1px solid #ece7dd;border-right:1px solid #ece7dd;">
          <p style="margin:0 0 8px;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:#a07f18;font-weight:700;">${subtitle}</p>
          <h1 style="margin:0 0 22px;font-size:24px;color:#0b1e38;line-height:1.3;font-weight:700;">${title}</h1>
          ${body}
        </td>
      </tr>
      <tr>
        <td style="background:#0b1e38;border-radius:0 0 14px 14px;padding:26px 32px;text-align:center;">
          <div style="color:#c9a227;font-size:13px;font-weight:700;letter-spacing:1.5px;">ACE GLOBAL NEXUS</div>
          <div style="color:#cbd5e1;font-size:12px;margin-top:6px;">Connecting Businesses, Markets &amp; Opportunities</div>
          <div style="color:#7f93b5;font-size:11px;margin-top:8px;">
            Yaoundé, Cameroon &nbsp;•&nbsp; +237 675 033 792 &nbsp;•&nbsp; ${escapeHtml(CONTACT_EMAIL || "chris.ekom@aceglobalnexus.com")}
          </div>
          <div style="color:#556e92;font-size:11px;margin-top:6px;">© ${new Date().getFullYear()} ${COMPANY_NAME}. All rights reserved.</div>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`;
}

function infoTable(rows: [string, string][]): string {
  const body = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #f0ece3;background:#faf7f0;width:32%;font-size:12px;font-weight:700;color:#0b1e38;vertical-align:top;">${label}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #f0ece3;font-size:13px;color:#444;vertical-align:top;">${value || '<span style="color:#a8a29a;">—</span>'}</td>
        </tr>`
    )
    .join("");

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:18px 0;border:1px solid #e7e1d6;border-radius:10px;overflow:hidden;">
      ${body}
    </table>`;
}

function quoteBlock(text: string): string {
  return `
    <div style="background:#faf7f0;border-left:4px solid #c9a227;padding:14px 18px;border-radius:0 8px 8px 0;font-size:13px;color:#555;margin:16px 0;">${multiline(text)}</div>`;
}

export async function sendEmail(to: string, subject: string, html: string) {
  const fromAddress = process.env.SMTP_FROM || `"${COMPANY_NAME}" <${process.env.SMTP_USER}>`;
  try {
    const info = await transporter.sendMail({ from: fromAddress, to, subject, html });
    console.log(`Email sent to ${to}: ${info.messageId}`);
    return { success: true };
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error);
    throw error;
  }
}

export interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  topic?: string;
  service?: string;
  message: string;
}

// NDA-style notification sent to the admin inbox when someone submits the contact form.
export function getContactReceivedTemplate(d: ContactSubmission) {
  const rows: [string, string][] = [
    ["Name", escapeHtml(d.name)],
    ["Email", `<a href="mailto:${escapeHtml(d.email)}" style="color:#a07f18;text-decoration:none;">${escapeHtml(d.email)}</a>`],
    ["Phone", d.phone ? escapeHtml(d.phone) : ""],
    ["Company", d.company ? escapeHtml(d.company) : ""],
    ["Country", d.country ? escapeHtml(d.country) : ""],
    ["Topic", d.topic ? escapeHtml(d.topic) : ""],
    ["Service of interest", d.service ? escapeHtml(d.service) : ""],
  ];

  const body = `
    <p>A new business inquiry has just been submitted through the ACE Global Nexus website.</p>
    ${infoTable(rows)}
    <p style="margin:14px 0 4px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#a07f18;">Message</p>
    ${quoteBlock(d.message)}
    <p style="font-size:12px;color:#8a8a8a;">Reply to the sender directly using the email above.</p>`;

  return wrap({
    title: "New Contact Submission",
    subtitle: "Action needed — review inquiry",
    body,
  });
}

// Confirmation sent back to the person who submitted the contact form.
export function getContactConfirmationTemplate(d: ContactSubmission) {
  const details = `${[d.topic, d.service]
    .filter((v): v is string => !!v)
    .map(escapeHtml)
    .join(" · ")}`;

  const body = `
    <p>Dear <strong>${escapeHtml(d.name)}</strong>,</p>
    <p>Thank you for reaching out to <strong>ACE Global Nexus</strong>. Your inquiry has been received and is now being reviewed by our team — we typically respond within one business day.</p>
    ${details ? `<p style="font-size:13px;"><strong style="color:#0b1e38;">Your inquiry:</strong> ${details}</p>` : ""}
    <p style="margin-top:6px;">A copy of your message is included below for your records.</p>
    ${quoteBlock(d.message)}
    <div style="margin:22px 0 0;padding:16px 18px;background:#f4f1ea;border-radius:10px;font-size:13px;color:#444;">
      <strong style="color:#0b1e38;display:block;margin-bottom:6px;">Need a faster answer?</strong>
      Phone / WhatsApp: <a href="tel:+237675033792" style="color:#a07f18;text-decoration:none;">+237 675 033 792</a><br/>
      Email: <a href="mailto:${escapeHtml(CONTACT_EMAIL || "chris.ekom@aceglobalnexus.com")}" style="color:#a07f18;text-decoration:none;">${escapeHtml(CONTACT_EMAIL || "chris.ekom@aceglobalnexus.com")}</a>
    </div>
    <p>Best regards,<br/><strong style="color:#0b1e38;">Christopher A. Ekom</strong><br/>Founder &amp; Principal Consultant, ACE Global Nexus</p>`;

  return wrap({
    title: "We received your inquiry",
    subtitle: "Thank you for contacting ACE Global Nexus",
    body,
  });
}