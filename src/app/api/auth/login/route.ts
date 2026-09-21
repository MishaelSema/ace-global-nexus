import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { safeEqual } from "@/lib/adminAuth";

const JWT_SECRET = process.env.JWT_SECRET || "ace-global-nexus-jwt-secret-change-in-production";

export async function POST(request: NextRequest) {
  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  const password = body.password || "";

  const adminEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || "";

  if (!adminEmail || !adminPassword) {
    return NextResponse.json({ success: false, error: "Admin not configured" }, { status: 500 });
  }

  const emailOk = email === adminEmail;
  const passOk = safeEqual(password, adminPassword);

  if (!emailOk || !passOk) {
    return NextResponse.json({ success: false, error: "Invalid email or password" }, { status: 401 });
  }

  const token = jwt.sign({ email: adminEmail, role: "admin" }, JWT_SECRET, { expiresIn: "7d" });

  const res = NextResponse.json({ success: true, token });
  res.cookies.set("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return res;
}