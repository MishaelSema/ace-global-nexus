"use client";

import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { FaGlobe, FaCheck, FaChevronDown } from "react-icons/fa6";
import { useLocale } from "@/components/LocaleProvider";
import { LOCALES, localeLabel, localeShort } from "@/lib/i18n/core";
import type { Locale } from "@/lib/i18n/core";
import { alternateLocalePath } from "@/lib/i18n/path";

interface LanguageToggleProps {
  /** "pill" = full EN/FR segmented pill (default). "iconOnly" = compact globe. "menu" = dropdown. */
  variant?: "pill" | "iconOnly" | "menu";
  /** Where to render — drives the colour treatment. */
  tone?: "light" | "dark" | "auto";
  className?: string;
}

/** Same page in the other language, preserving query params. */
function hrefFor(pathname: string, search: string, next: Locale): string {
  const path = alternateLocalePath(pathname || "/", next);
  return search ? `${path}?${search}` : path;
}

/** Inner toggle — reads search params, so it must live inside a Suspense boundary. */
function LanguageToggleInner({ variant, tone, className }: Required<LanguageToggleProps>) {
  const { locale, t, setLocale } = useLocale();
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const other: Locale = locale === "en" ? "fr" : "en";
  const otherHref = hrefFor(pathname, search, other);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Close on outside click / Escape — standard dropdown dismissal.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const shell = `inline-flex items-center gap-0.5 rounded-full border p-0.5 ${
    tone === "light" || tone === "auto"
      ? "border-white/15 bg-white/5"
      : "border-gray-200 bg-cream"
  } ${className ?? ""}`;

  // ---- Segmented pill: EN | FR -------------------------------------------
  if (variant === "pill") {
    return (
      <span className="inline-flex">
        <span className="sr-only">{t("Choose language")}</span>
        <div
          className={shell}
          role="group"
          aria-label={t("Choose language")}
        >
          {LOCALES.map((opt) => {
            const active = locale === opt;
            return (
              <Link
                key={opt}
                href={hrefFor(pathname, search, opt)}
                hrefLang={opt}
                lang={opt}
                aria-current={active ? "true" : undefined}
                title={localeLabel(opt)}
                onClick={() => setLocale(opt)}
                className={
                  active
                    ? "rounded-full bg-gold px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-dark transition-colors"
                    : "rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white/60 transition-colors hover:text-gold"
                }
              >
                {localeShort(opt)}
              </Link>
            );
          })}
        </div>
      </span>
    );
  }

  // ---- Compact globe button ----------------------------------------------
  if (variant === "iconOnly") {
    return (
      <Link
        href={otherHref}
        hrefLang={other}
        lang={other}
        onClick={() => setLocale(other)}
        aria-label={locale === "en" ? t("Switch to French") : t("Switch to English")}
        title={localeLabel(other)}
        className="flex h-9 w-9 items-center justify-center gap-1 rounded-full border border-white/15 bg-white/5 text-white/70 transition-colors hover:border-gold hover:text-gold"
      >
        <FaGlobe size={13} aria-hidden="true" />
        <span className="text-[10px] font-bold uppercase tracking-wide">{localeShort(locale)}</span>
      </Link>
    );
  }

  // ---- Dropdown menu with full language names ---------------------------
  return (
    <div ref={wrapRef} className={`relative ${className ?? ""}`}>
      <span className="sr-only">{t("Choose language")}</span>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`${t("Choose language")} — ${localeLabel(locale)}`}
        className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${
          tone === "dark"
            ? "border-gray-200 bg-cream text-primary/70 hover:border-gold hover:text-gold-dark"
            : "border-white/15 bg-white/5 text-white/70 hover:border-gold hover:text-gold"
        }`}
      >
        <FaGlobe size={13} aria-hidden="true" />
        {localeShort(locale)}
        <FaChevronDown
          size={10}
          aria-hidden="true"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="menu"
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-gray-100 bg-white py-1.5 shadow-lift"
        >
          {LOCALES.map((opt) => {
            const active = locale === opt;
            return (
              <li key={opt} role="none">
                <Link
                  role="menuitem"
                  href={hrefFor(pathname, search, opt)}
                  hrefLang={opt}
                  lang={opt}
                  onClick={() => {
                    setLocale(opt);
                    setOpen(false);
                  }}
                  aria-current={active ? "true" : undefined}
                  className={`flex items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors ${
                    active ? "bg-gold/10 font-semibold text-gold-dark" : "text-primary/80 hover:bg-cream"
                  }`}
                >
                  <span>{localeLabel(opt)}</span>
                  {active ? <FaCheck size={12} aria-hidden="true" /> : null}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function LanguageToggle({
  variant = "pill",
  tone = "auto",
  className = "",
}: LanguageToggleProps) {
  return (
    <Suspense fallback={null}>
      <LanguageToggleInner variant={variant} tone={tone} className={className} />
    </Suspense>
  );
}
