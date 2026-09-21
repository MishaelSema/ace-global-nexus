"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import { translate, DEFAULT_LOCALE } from "@/lib/i18n/core";
import type { Locale } from "@/lib/i18n/core";
import { localizedPath } from "@/lib/i18n/path";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** Translate a string into the current locale (falls back to English). */
  t: (text: string) => string;
  /** Localize an internal path for the current locale ("/services" → "/fr/services"). */
  p: (path: string) => string;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: (text) => text,
  p: (path) => path,
});

export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: ReactNode;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const t = useCallback((text: string) => translate(locale, text), [locale]);
  const p = useCallback((path: string) => localizedPath(path, locale), [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, p }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  return useContext(LocaleContext);
}