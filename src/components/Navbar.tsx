"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaXmark, FaArrowRight } from "react-icons/fa6";
import Logo from "@/components/Logo";

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
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
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
                {item.label}
              </Link>
            );
          })}
          <Link href="/start-a-conversation" className="btn-primary !px-5 !py-2.5">
            Start a Conversation <FaArrowRight size={12} />
          </Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className={`grid h-11 w-11 place-items-center rounded-lg text-xl lg:hidden ${
            isTransparent ? "text-white" : "text-primary"
          }`}
        >
          {open ? <FaXmark /> : <FaBars />}
        </button>
      </div>

      {open && (
        <div className="border-t border-gray-100 bg-white px-6 py-6 lg:hidden">
          <nav className="flex flex-col gap-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-base font-medium ${pathname === item.href ? "text-gold-dark" : "text-primary/85"}`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/start-a-conversation" className="btn-primary mt-2 w-fit">
              Start a Conversation <FaArrowRight size={12} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}