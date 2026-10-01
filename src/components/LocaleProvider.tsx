"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  translate,
  translateList,
  localizedField,
  DEFAULT_LOCALE,
  dateLocale,
} from "@/lib/i18n/core";
import type { Locale } from "@/lib/i18n/core";
import { localizedPath } from "@/lib/i18n/path";

interface LocaleContextValue {
  locale: Locale;
  /** Set from the URL; navigation is handled by `LanguageToggle`. */
  setLocale: (locale: Locale) => void;
  /** Translate a string into the current locale (falls back to English). */
  t: (text: string) => string;
  /** Translate a list of strings. */
  tl: (list: readonly string[]) => string[];
  /** Localize an internal path ("/services" → "/fr/services"). */
  p: (path: string) => string;
  /** Resolve a `field` / `fieldFr` pair (admin-authored content). */
  tf: (record: object, field: string) => string;
  /** BCP-47 tag for <html lang> / Intl formatting. */
  lang: string;
  /** `fr-FR` | `en-US` — pass to `toLocaleDateString`. */
  dateLang: string;
  isRtl: false;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: (text) => text,
  tl: (list) => [...list],
  p: (path) => path,
  tf: (record, field) => localizedField(record, DEFAULT_LOCALE, field),
  lang: "en",
  dateLang: "en-US",
  isRtl: false,
});

export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    // Remember the choice for non-localized surfaces (emails, /admin, API
    // responses) and so a first-time visitor is not bounced back to English.
    try {
      document.cookie = `lang=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    } catch {
      // Cookies unavailable (e.g. privacy mode) — URL routing still works.
    }
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      t: (text: string) => translate(locale, text),
      tl: (list: readonly string[]) => translateList(locale, list),
      p: (path: string) => localizedPath(path, locale),
      tf: (record: object, field: string) => localizedField(record, locale, field),
      lang: locale === "fr" ? "fr-FR" : "en",
      dateLang: dateLocale(locale),
      isRtl: false,
    }),
    [locale, setLocale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  return useContext(LocaleContext);
}
