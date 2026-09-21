import { headers, cookies } from "next/headers";
import { translate, DEFAULT_LOCALE } from "@/lib/i18n/core";
import type { Locale } from "@/lib/i18n/core";
import { isLocale } from "@/lib/i18n/core";
import { localizedPath } from "@/lib/i18n/path";

export const LANG_COOKIE = "lang";

/** Header set by middleware.ts so /fr/* URLs render French server-side. */
export const LOCALE_HEADER = "x-locale";

/**
 * Resolve the current locale, in order of authority:
 *  1. `x-locale` header set by middleware for /fr/* URLs (URL-based locale)
 *  2. `lang` cookie (legacy personalization fallback)
 *  3. `en` default
 */
export function getLocale(): Locale {
  try {
    const header = headers().get(LOCALE_HEADER);
    if (isLocale(header)) return header;
  } catch {
    // headers() unavailable outside a request (e.g. build-time).
  }
  try {
    const value = cookies().get(LANG_COOKIE)?.value;
    return isLocale(value) ? value : DEFAULT_LOCALE;
  } catch {
    // cookies() unavailable outside a request.
    return DEFAULT_LOCALE;
  }
}

/** Bound translator for the request locale — handy in server components. */
export function tForLocale(): (text: string) => string {
  const locale = getLocale();
  return (text: string) => translate(locale, text);
}

/** Bound path localizer: `/services` → `/fr/services` on the French site. */
export function pathForLocale(): (path: string) => string {
  const locale = getLocale();
  return (path: string) => localizedPath(path, locale);
}