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

/** Inverse of `localizedPath` — strips the `/fr` prefix ("/fr/about" → "/about"). */
export function delocalizePath(path: string): string {
  if (path === "/fr") return "/";
  if (path.startsWith("/fr/")) return path.slice(3) || "/";
  return path || "/";
}

/**
 * The same page in the other locale, preserving the path shape.
 * "/about" ↔ "/fr/about", "/" ↔ "/fr", "/fr" ↔ "/".
 */
export function alternateLocalePath(pathname: string, next: Locale): string {
  const base = delocalizePath(pathname || "/");
  return localizedPath(base, next);
}
