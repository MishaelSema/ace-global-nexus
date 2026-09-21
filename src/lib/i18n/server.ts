import { cookies } from "next/headers";
import { translate, DEFAULT_LOCALE } from "@/lib/i18n/core";
import type { Locale } from "@/lib/i18n/core";
import { isLocale } from "@/lib/i18n/core";

export const LANG_COOKIE = "lang";

/** Server helper: resolve the current locale from the `lang` cookie (default: en). */
export function getLocale(): Locale {
  try {
    const value = cookies().get(LANG_COOKIE)?.value;
    return isLocale(value) ? value : DEFAULT_LOCALE;
  } catch {
    // cookies() unavailable outside a request (e.g. build-time metadata).
    return DEFAULT_LOCALE;
  }
}

/** Bound translator for the request locale — handy in server components. */
export function tForLocale(): (text: string) => string {
  const locale = getLocale();
  return (text: string) => translate(locale, text);
}