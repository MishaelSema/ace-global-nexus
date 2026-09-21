"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { cloudImageUrl } from "@/lib/utils";
import { BRAND_IMAGE } from "@/lib/content";
import { useLocale } from "@/components/LocaleProvider";

interface Slide {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  coverUrl?: string;
  author: string;
  publishedAt?: string;
}

export default function Showcase() {
  const { t, p } = useLocale();
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetch("/api/insights?limit=5")
      .then((r) => r.json())
      .then((d) => setSlides(d.success ? d.data : []))
      .catch(() => setSlides([]))
      .finally(() => setLoading(false));
  }, []);

  const next = useCallback(() => setIndex((i) => (i + 1) % Math.max(slides.length, 1)), [slides.length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + Math.max(slides.length, 1)) % Math.max(slides.length, 1)), [slides.length]);

  // Autoplay — paused while the user hovers or is on a coarse (touch) device
  useEffect(() => {
    if (!slides.length) return;
    timer.current = setInterval(next, 6500);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [next, slides.length]);

  const stop = () => {
    if (timer.current) clearInterval(timer.current);
  };
  const start = () => {
    stop();
    next();
    timer.current = setInterval(next, 6500);
  };

  if (loading) {
    return (
      <div className="grid h-[420px] place-items-center rounded-3xl bg-cream text-primary/30">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent" />
      </div>
    );
  }

  if (!slides.length) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-3xl bg-cream px-8 text-center">
        <p className="font-serif text-2xl font-bold text-primary">{t("Fresh market intelligence is on the way.")}</p>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-500">
          {t(
            "ACE Global Nexus is publishing practical insights on African trade, investment and doing business — follow along to read them first."
          )}
        </p>
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden rounded-3xl bg-primary"
      onMouseEnter={stop}
      onMouseLeave={start}
      onFocusCapture={stop}
      onBlurCapture={start}
    >
      <div className="relative h-[420px] sm:h-[480px]">
        {slides.map((slide, i) => (
          <div
            key={slide._id}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === index ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src={slide.coverUrl ? cloudImageUrl(slide.coverUrl, 1600) : BRAND_IMAGE}
              alt={slide.title}
              className="h-full w-full scale-105 object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/20" />
          </div>
        ))}

        <div className="absolute inset-x-0 bottom-0 p-8 pb-16 sm:p-12 sm:pb-16 lg:p-16">
          <Link
            href={p(`/insights/${slides[index].slug}`)}
            className="group block max-w-3xl"
            aria-label={slides[index].title}
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-gold">
              <span className="h-px w-8 bg-gold" />
              {slides[index].category}
            </span>
            <h3 className="mt-4 font-serif text-2xl font-bold leading-snug text-white sm:text-3xl lg:text-4xl">
              {slides[index].title}
            </h3>
            <p className="mt-3 hidden max-w-xl line-clamp-2 text-sm leading-relaxed text-white/70 sm:block">
              {slides[index].excerpt}
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-transform duration-300 group-hover:translate-x-1">
              {t("Read the insight")} <FaArrowRight size={12} />
            </span>
          </Link>
        </div>
      </div>

      <div className="absolute inset-x-0 top-1/2 hidden -translate-y-1/2 justify-between px-4 sm:flex">
        <button
          onClick={prev}
          aria-label="Previous insight"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-primary/30 text-white backdrop-blur-sm transition-colors hover:border-gold hover:text-gold"
        >
          <FaChevronLeft size={15} />
        </button>
        <button
          onClick={next}
          aria-label="Next insight"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-primary/30 text-white backdrop-blur-sm transition-colors hover:border-gold hover:text-gold"
        >
          <FaChevronRight size={15} />
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2 sm:hidden">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to insight ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-gold" : "w-1.5 bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
}