"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface ParallaxProps {
  children: ReactNode;
  /** Vertical drift in % of viewport height (lower = subtler). */
  speed?: number;
  className?: string;
}

/**
 * Subtle scroll parallax for background imagery. Automatically disabled on
 * touch / coarse-pointer devices so mobile stays smooth and accessible.
 */
export default function Parallax({ children, speed = 0.14, className = "" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const enabled = useRef(false);

  useEffect(() => {
    enabled.current = window.matchMedia("(pointer: fine)").matches;
    if (!enabled.current) return;

    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < 0 || rect.top > vh) return; // off screen — skip work
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      raf = requestAnimationFrame(() => setOffset(Math.round(progress * speed * -100)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={className}
      style={{
        transform: `translate3d(0, ${offset}px, 0)`,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}