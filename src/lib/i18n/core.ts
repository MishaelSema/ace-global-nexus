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

/** Translate an English string into `locale`; unknown keys pass through unchanged. */
export function translate(locale: Locale, text: string): string {
  if (locale === "fr") return fr[text] ?? text;
  return text;
}

export function localeLabel(locale: Locale): string {
  return locale === "fr" ? "Français" : "English";
}