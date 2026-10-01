"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaXmark, FaArrowRight } from "react-icons/fa6";
import Logo from "@/components/Logo";
import LanguageToggle from "@/components/LanguageToggle";
import { useLocale } from "@/components/LocaleProvider";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/sectors", label: "Sectors" },
  { href: "/about", label: "About & Founder" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { t, p } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isTransparent = !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isTransparent ? "bg-transparent" : "border-b border-gray-100 bg-white/90 backdrop-blur-md"
      }`}
    >
      <div className="container-site flex h-[72px] items-center justify-between">
        <Logo light={isTransparent} />

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => {
            const href = p(item.href);
            const active = pathname === href;
            return (
              <Link
                key={item.href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`text-sm font-medium transition-colors ${
                  active
                    ? isTransparent
                      ? "text-gold"
                      : "text-gold-dark"
                    : isTransparent
                      ? "text-white/85 hover:text-gold"
                      : "text-primary/75 hover:text-primary"
                }`}
              >
                {t(item.label)}
              </Link>
            );
          })}
          <LanguageToggle tone={isTransparent ? "light" : "dark"} />
          <Link href={p("/start-a-conversation")} className="btn-primary !px-5 !py-2.5">
            {t("Start a Conversation")} <FaArrowRight size={12} />
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageToggle variant="iconOnly" />
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? t("Close") : t("Toggle menu")}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={`grid h-11 w-11 place-items-center rounded-lg text-xl lg:hidden ${
              isTransparent ? "text-white" : "text-primary"
            }`}
          >
            {open ? <FaXmark /> : <FaBars />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100svh-72px)] overflow-y-auto border-t border-gray-100 bg-white px-6 py-6 lg:hidden"
        >
          <nav className="flex flex-col gap-4">
            {NAV.map((item) => {
              const href = p(item.href);
              return (
                <Link
                  key={item.href}
                  href={href}
                  aria-current={pathname === href ? "page" : undefined}
                  className={`text-base font-medium ${
                    pathname === href ? "text-gold-dark" : "text-primary/85"
                  }`}
                >
                  {t(item.label)}
                </Link>
              );
            })}
            <Link href={p("/start-a-conversation")} className="btn-primary mt-4 w-full">
              {t("Start a Conversation")} <FaArrowRight size={12} />
            </Link>
            <div className="mt-2 flex items-center justify-between gap-4 border-t border-gray-100 pt-4">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-primary/40">
                {t("Choose language")}
              </span>
              <LanguageToggle tone="dark" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
