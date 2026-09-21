"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { BRAND_IMAGE } from "@/lib/content";
import Reveal from "@/components/Reveal";
import { useLocale } from "@/components/LocaleProvider";

const ITEMS = [
  { title: "Agribusiness", note: "Value chains & export", pos: "object-center" },
  { title: "Energy", note: "Power & renewables", pos: "object-top" },
  { title: "Infrastructure", note: "Transport corridors", pos: "object-bottom" },
  { title: "ICT", note: "Digital & fintech", pos: "object-left" },
  { title: "Healthcare", note: "Health-sector investment", pos: "object-center" },
  { title: "Logistics", note: "Freight & supply chains", pos: "object-right" },
  { title: "Manufacturing", note: "Local value addition", pos: "object-bottom" },
];

/** Each sector gets this share of viewport height worth of scroll while pinned. */
const WRAP_FACTOR = 70;

/**
 * Sectors imagery, two behaviours:
 *  - lg+: the Pinterest-style corner-curve mosaic grid (reveal-wrapped).
 *  - below lg: a pinned full-screen gallery. The current sector's image fills the
 *    viewport while the section stays fixed; it starts advancing only once the
 *    section is fully visible, releases and scrolls away with the page after the
 *    last sector. Tap a chip to jump straight to a sector.
 */
export default function SectorShowcase({ children }: { children: ReactNode }) {
  const { t, p } = useLocale();
  const [index, setIndex] = useState(0);
  const [bgOffset, setBgOffset] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const n = ITEMS.length;

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const vh = window.innerHeight;
        // Scroll distance the pinned section can be driven through before it
        // releases at the very end of its tall wrapper.
        const total = Math.max(1, el.offsetHeight - vh);
        const done = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / total));
        setIndex(Math.min(n - 1, Math.floor(done * n)));
        setBgOffset(Math.round(-done * 90));
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [n]);

  const jumpTo = (i: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const vh = window.innerHeight;
    const total = Math.max(1, el.offsetHeight - vh);
    const top = el.offsetTop + ((i + 0.5) / n) * total;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const current = ITEMS[index];

  return (
    <>
      {/* Desktop / tablet: the corner-curve mosaic grid (server-rendered child) */}
      <Reveal className="mt-14 hidden lg:block">{children}</Reveal>

      {/* Mobile: pinned full-screen sector gallery */}
      <div className="-mx-5 mt-14 sm:-mx-8 lg:hidden">
        <div ref={wrapRef} className="relative" style={{ height: `${n * WRAP_FACTOR}vh` }}>
          <section
            aria-label="Sectors gallery — scroll to change the sector, or tap a sector to jump straight to it"
            className="sticky top-0 flex h-[100svh] flex-col justify-between overflow-hidden bg-primary"
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

            {/* Current sector */}
            <div className="relative px-5 pt-28 sm:px-8">
              <div className="flex items-center justify-between">
                <span className="h-px w-14 bg-gold" aria-hidden="true" />
                <span className="font-display text-sm tracking-[0.2em] text-white/50">
                  {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                </span>
              </div>
              <h2 className="mt-8 font-serif text-4xl font-bold leading-[1.02] text-white sm:text-5xl">
                {t(current.title)}
              </h2>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/65">{t(current.note)}</p>
            </div>

            {/* Tap-to-jump sectors + bottom-centre CTA */}
            <div className="relative px-5 pb-8 sm:px-8">
              <ul className="flex flex-wrap justify-center gap-2">
                {ITEMS.map((item, i) => {
                  const active = i === index;
                  return (
                    <li key={item.title}>
                      <button
                        type="button"
                        onClick={() => jumpTo(i)}
                        className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                          active
                            ? "border-gold bg-gold/15 text-gold-light"
                            : "border-white/20 bg-white/5 text-white/60 hover:border-white/40 hover:text-white"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")} {t(item.title)}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-6 flex justify-center">
                <Link href={p("/sectors")} className="btn bg-white text-primary-dark transition-colors hover:bg-gold-light">
                  {t("See all sectors")} <FaArrowRight size={13} />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}