import { NextResponse } from "next/server";
import { isCloudinaryConfigured } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: true,
    mongodb: !!process.env.MONGODB_URI,
    cloudinary: isCloudinaryConfigured(),
    smtp: !!(process.env.SMTP_USER && process.env.SMTP_PASS),
    admin: !!(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD),
  });
}