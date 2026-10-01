/**
 * Shared i18n core — safe to import from both server and client code.
 * (No `next/headers` here; server-only helpers live in `./server.ts`.)
 */
import { fr } from "@/lib/i18n/dictionaries";

export const LOCALES = ["en", "fr"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "en" || value === "fr";
}

/**
 * Dictionary keys are the exact English strings used in the markup, so the
 * lookup normalises whitespace first — a stray newline or double space must
 * never silently drop a translation.
 */
function key(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

/** Translate an English string into `locale`; unknown keys pass through unchanged. */
export function translate(locale: Locale, text: string): string {
  if (locale === "en" || !text) return text;
  return fr[key(text)] ?? text;
}

/** Translate a list of strings, preserving order. */
export function translateList(locale: Locale, list: readonly string[]): string[] {
  return list.map((item) => translate(locale, item));
}

/**
 * Resolve a localized field pair (`title` / `titleFr`), falling back to the
 * English value when the translation is missing or blank. Used for the
 * admin-authored insight content.
 *
 * Accepts any object (Mongo lean documents, typed view models, API payloads) —
 * the cast keeps callers from having to declare an index signature.
 */
export function localizedField(base: object, locale: Locale, field: string): string {
  const record = base as Record<string, unknown>;
  const fallback = record[field];
  if (locale === "en") return typeof fallback === "string" ? fallback : "";
  const translated = record[`${field}Fr`];
  if (typeof translated === "string" && translated.trim()) return translated;
  return typeof fallback === "string" ? fallback : "";
}

export function localeLabel(locale: Locale): string {
  return locale === "fr" ? "Français" : "English";
}

/** Short badge text for the language switch. */
export function localeShort(locale: Locale): string {
  return locale === "fr" ? "FR" : "EN";
}

/** BCP-47 tags for <html lang>, Intl and Open Graph. */
export function htmlLang(locale: Locale): string {
  return locale === "fr" ? "fr-FR" : "en";
}

export function dateLocale(locale: Locale): string {
  return locale === "fr" ? "fr-FR" : "en-US";
}

export function ogLocale(locale: Locale): string {
  return locale === "fr" ? "fr_FR" : "en_US";
}
