"use client";

import { useRouter } from "next/navigation";
import { FaGlobe } from "react-icons/fa6";
import { useLocale } from "@/components/LocaleProvider";
import type { Locale } from "@/lib/i18n/core";

interface LanguageToggleProps {
  /** Show the "EN | FR" pill (default). Use iconOnly for tight spots like the mobile bar. */
  variant?: "pill" | "iconOnly";
}

const OPTIONS: Array<{ value: Locale; label: string }> = [
  { value: "en", label: "EN" },
  { value: "fr", label: "FR" },
];

export default function LanguageToggle({ variant = "pill" }: LanguageToggleProps) {
  const { locale, setLocale } = useLocale();
  const router = useRouter();

  function switchTo(next: Locale) {
    if (next === locale) return;
    document.cookie = `lang=${next}; path=/; max-age=31536000; SameSite=Lax`;
    setLocale(next);
    document.documentElement.lang = next;
    router.refresh();
  }

  const pill = (
    <div className="flex items-center gap-0.5 rounded-full border border-white/15 bg-white/5 p-0.5">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => switchTo(opt.value)}
          aria-pressed={locale === opt.value}
          className={
            locale === opt.value
              ? "rounded-full bg-gold px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-dark transition-colors"
              : "rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white/60 transition-colors hover:text-gold"
          }
        >
          {opt.label}
        </button>
      ))}
    </div>
  );

  const iconOnly = (
    <button
      type="button"
      onClick={() => switchTo(locale === "en" ? "fr" : "en")}
      aria-label="Switch language"
      className="flex h-9 w-9 items-center justify-center gap-1 rounded-full border border-white/15 bg-white/5 text-white/70 transition-colors hover:border-gold hover:text-gold"
    >
      <FaGlobe size={13} aria-hidden="true" />
      <span className="text-[10px] font-bold uppercase tracking-wide">{locale === "en" ? "EN" : "FR"}</span>
    </button>
  );

  return (
    <span className="inline-flex">
      <span className="sr-only">
        {locale === "en" ? "Choose language" : "Choisir la langue"}
      </span>
      {variant === "pill" ? pill : iconOnly}
    </span>
  );
}