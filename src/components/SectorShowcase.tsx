"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { BRAND_IMAGE } from "@/lib/content";
import MosaicGrid from "@/components/MosaicGrid";

const ITEMS = [
  { title: "Agribusiness", note: "Value chains & export", pos: "object-center" },
  { title: "Energy", note: "Power & renewables", pos: "object-top" },
  { title: "Infrastructure", note: "Transport corridors", pos: "object-bottom" },
  { title: "ICT", note: "Digital & fintech", pos: "object-left" },
  { title: "Healthcare", note: "Health-sector investment", pos: "object-center" },
  { title: "Logistics", note: "Freight & supply chains", pos: "object-right" },
  { title: "Manufacturing", note: "Local value addition", pos: "object-bottom" },
];

const SCROLL_STEP = 220; // px of wheel/touch scroll to advance one sector

/**
 * Sectors imagery, two behaviours:
 *  - lg+: the Pinterest-style corner-curve mosaic grid.
 *  - below lg: one full-screen section where the current sector's image is the
 *    whole background. Scrolling auto-advances with a parallax drift, clicking
 *    a sector jumps straight to it, and the sequence loops 7 → 1.
 */
export default function SectorShowcase() {
  const [index, setIndex] = useState(0);
  const [bgOffset, setBgOffset] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useRef(false);
  const lastY = useRef(0);
  const acc = useRef(0);
  const n = ITEMS.length;

  const goTo = useCallback((i: number) => setIndex(((i % n) + n) % n), [n]);
  const step = useCallback((dir: 1 | -1) => setIndex((prev) => ((prev + dir) % n + n) % n), [n]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Track whether the section is actually the one being scrolled through.
    const io = new IntersectionObserver(([entry]) => {
      inView.current = entry.isIntersecting;
      if (entry.isIntersecting) lastY.current = window.scrollY;
    });
    io.observe(el);

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const visible = rect.bottom > vh * 0.25 && rect.top < vh * 0.75;
        // Parallax drift on the background while in sight.
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        setBgOffset(Math.round(-progress * 70));
        if (!inView.current || !visible) return;

        const y = window.scrollY;
        const dy = y - lastY.current;
        lastY.current = y;
        acc.current += dy;
        if (acc.current >= SCROLL_STEP) {
          acc.current = 0;
          step(1);
        } else if (acc.current <= -SCROLL_STEP) {
          acc.current = 0;
          step(-1);
        }
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [step]);

  const current = ITEMS[index];

  return (
    <>
      {/* Desktop / tablet: the corner-curve mosaic grid */}
      <div className="hidden lg:block">
        <MosaicGrid />
      </div>

      {/* Mobile: full-bleed scroll-driven full-screen section */}
      <section
        ref={sectionRef}
        aria-label="Sectors gallery — scroll, or tap a sector to switch the background"
        className="relative -mx-5 isolate overflow-hidden bg-primary sm:-mx-8 lg:hidden"
      >
        {/* Background stack — the active sector's image crossfades in */}
        {ITEMS.map((item, i) => (
          <img
            key={item.title}
            src={BRAND_IMAGE}
            alt=""
            draggable={false}
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${item.pos}`}
            style={{
              opacity: i === index ? 1 : 0,
              transform: `translateY(${bgOffset}px) scale(1.08)`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-transparent to-transparent" />

        <div className="relative flex min-h-[100svh] flex-col justify-between py-24">
          {/* Current sector */}
          <div className="px-5 pt-16 sm:px-8">
            <div className="flex items-center justify-between">
              <span className="h-px w-14 bg-gold" aria-hidden="true" />
              <span className="font-display text-sm tracking-[0.2em] text-white/50">
                {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
              </span>
            </div>
            <h2 className="mt-8 font-serif text-4xl font-bold leading-[1.02] text-white sm:text-5xl">
              {current.title}
            </h2>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/65">{current.note}</p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/sectors" className="btn bg-white text-primary-dark transition-colors hover:bg-gold-light">
                See all sectors <FaArrowRight size={13} />
              </Link>
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
                Scroll to explore
              </span>
            </div>
          </div>

          {/* Jump list — tap any sector to make it the background */}
          <div className="px-5 pb-8 sm:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-light">
              Jump to a sector
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-1">
              {ITEMS.map((item, i) => {
                const active = i === index;
                return (
                  <li key={item.title}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      className={`flex w-full items-baseline gap-3 border-b py-2.5 text-left transition-colors duration-300 ${
                        active
                          ? "border-gold/60 text-white"
                          : "border-white/10 text-white/55 hover:border-white/25 hover:text-white"
                      }`}
                    >
                      <span className={`font-serif text-[11px] ${active ? "text-gold-light" : "text-white/35"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="truncate text-sm font-semibold">{item.title}</span>
                      {active ? <FaChevronUp size={10} className="ml-auto shrink-0 text-gold-light" /> : null}
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 inline-flex items-center gap-2 text-[11px] text-white/40">
              <FaChevronDown size={10} aria-hidden="true" /> The background changes as you scroll
            </p>
          </div>
        </div>
      </section>
    </>
  );
}