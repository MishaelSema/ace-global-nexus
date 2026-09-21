"use client";

import Link from "next/link";
import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
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

/** Same page in the other language: "/about" ↔ "/fr/about", preserving query params. */
function alternateHref(pathname: string, search: string, next: Locale): string {
  let path = pathname || "/";
  if (next === "fr") {
    path = path === "/" ? "/fr" : `/fr${path}`;
  } else {
    path = path === "/fr" ? "/" : path.replace(/^\/fr/, "") || "/";
  }
  return search ? `${path}?${search}` : path;
}

/** Inner toggle — reads search params, so it must live inside a Suspense boundary. */
function LanguageToggleInner({ variant }: LanguageToggleProps) {
  const { locale } = useLocale();
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const other: Locale = locale === "en" ? "fr" : "en";
  const otherHref = alternateHref(pathname, search, other);

  const pill = (
    <div className="flex items-center gap-0.5 rounded-full border border-white/15 bg-white/5 p-0.5">
      {OPTIONS.map((opt) => {
        const active = locale === opt.value;
        return (
          <Link
            key={opt.value}
            href={alternateHref(pathname, search, opt.value)}
            aria-current={active ? "true" : undefined}
            className={
              active
                ? "rounded-full bg-gold px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-dark transition-colors"
                : "rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white/60 transition-colors hover:text-gold"
            }
          >
            {opt.label}
          </Link>
        );
      })}
    </div>
  );

  const iconOnly = (
    <Link
      href={otherHref}
      aria-label={locale === "en" ? "Switch to French" : "Passer à l'anglais"}
      className="flex h-9 w-9 items-center justify-center gap-1 rounded-full border border-white/15 bg-white/5 text-white/70 transition-colors hover:border-gold hover:text-gold"
    >
      <FaGlobe size={13} aria-hidden="true" />
      <span className="text-[10px] font-bold uppercase tracking-wide">{locale === "en" ? "EN" : "FR"}</span>
    </Link>
  );

  return (
    <span className="inline-flex">
      <span className="sr-only">{locale === "en" ? "Choose language" : "Choisir la langue"}</span>
      {variant === "pill" ? pill : iconOnly}
    </span>
  );
}

export default function LanguageToggle({ variant = "pill" }: LanguageToggleProps) {
  return (
    <Suspense fallback={null}>
      <LanguageToggleInner variant={variant} />
    </Suspense>
  );
}