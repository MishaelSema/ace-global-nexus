"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";

interface LogoProps {
  className?: string;
  light?: boolean;
  /** Locale-aware home link (e.g. "/fr" on the French site). */
  href?: string;
}

export default function Logo({ className = "", light = false, href }: LogoProps) {
  const { t, p } = useLocale();
  return (
    <Link
      href={href ?? p("/")}
      className={`inline-flex shrink-0 items-center ${className}`}
      aria-label={t("ACE Global Nexus — home")}
    >
      <img
        src="/ACEGLOBALNEXUS_ICON_with_name.png"
        alt="ACE Global Nexus"
        className="h-9 w-auto lg:h-[42px]"
        style={light ? { filter: "brightness(0) invert(1)" } : undefined}
      />
    </Link>
  );
}