import type { Locale } from "@/lib/i18n/core";

/**
 * Prefix a site-relative path with the French locale segment
 * ("/services" → "/fr/services"). English paths are returned unchanged.
 * Already-localized paths pass through untouched.
 */
export function localizedPath(path: string, locale: Locale): string {
  if (locale === "en") return path;
  if (path === "/fr" || path.startsWith("/fr/")) return path;
  if (path.startsWith("/")) return `/fr${path}`;
  return path;
}