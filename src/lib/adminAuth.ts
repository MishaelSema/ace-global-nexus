import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET || "ace-global-nexus-jwt-secret-change-in-production";

export interface AdminAuth {
  email?: string;
  role?: string;
}

export function getAdminFromRequest(request: NextRequest): AdminAuth | null {
  const authHeader = request.headers.get("authorization");
  const cookieToken = request.cookies.get("token")?.value;
  const headerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  const token = headerToken || cookieToken;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email?: string; role?: string };
    if (decoded?.role !== "admin") return null;
    return { email: decoded.email, role: decoded.role };
  } catch {
    return null;
  }
}

export function requireAdmin(request: NextRequest): NextResponse | null {
  const auth = getAdminFromRequest(request);
  if (!auth) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) {
    const diff = bufA.length ^ bufB.length;
    let acc = 0;
    const len = Math.min(bufA.length, bufB.length);
    for (let i = 0; i < len; i++) acc |= bufA[i] ^ bufB[i];
    return acc === 0 && diff === 0;
  }
  return crypto.timingSafeEqual(bufA, bufB);
}