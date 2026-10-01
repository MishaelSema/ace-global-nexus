import { NextRequest, NextResponse } from "next/server";
import { LOCALE_HEADER } from "@/lib/i18n/server";

/**
 * URL-based locale routing:
 *  - `/fr/*` serves the French mirror (src/app/fr/*) and sets `x-locale: fr`
 *  - every other public path sets `x-locale: en`
 *
 * Server components read `x-locale` (via getLocale()) to render the right
 * language for the requested URL — no cookie required, which keeps the
 * French pages crawlable at their own canonical URLs with hreflang alternates.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isFrench = pathname === "/fr" || pathname.startsWith("/fr/");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LOCALE_HEADER, isFrench ? "fr" : "en");

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  // Exclude API, admin, Next.js internals and static assets.
  // (`legal` is deliberately NOT excluded: /legal/* and /fr/legal/* both need
  // the x-locale header so each renders in the language of its own URL.)
  // Admin/API are locale-neutral.
  matcher: [
    "/((?!api|admin|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|json)$).*)",
  ],
};