import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Loading skeletons.
 *
 * Deliberately plain server components (no "use client") so the same pieces
 * work from a `loading.tsx` file, from a server page, and from a client
 * component that is waiting on a `fetch`.
 *
 * The block shapes mirror the real components (`PageHero`, `InsightCard`, the
 * article body) so the page doesn't jump when content replaces them.
 *
 * Colour is chosen with the `tone` prop rather than a class name on purpose:
 * `cn()` is a plain string join with no tailwind-merge, so a default `bg-*` on
 * this base plus a different `bg-*` passed in would both land in the class
 * attribute and be resolved by stylesheet order, not by the order written here.
 * For the same reason no default border-radius is set — pass `rounded-*` when
 * you need it.
 *
 * Every block is `aria-hidden`. Wrap a group in `SkeletonRegion` so assistive
 * technology announces one status message instead of a pile of empty boxes.
 */

/** `light` sits on cream/white sections, `dark` on the navy ones. */
export type SkeletonTone = "light" | "dark";

const TONE_CLASS: Record<SkeletonTone, string> = {
  light: "bg-primary/10",
  dark: "bg-white/15",
};

/** A single pulsing block. Decorative only. */
export function Skeleton({
  tone = "light",
  className,
}: {
  tone?: SkeletonTone;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse motion-reduce:animate-none", TONE_CLASS[tone], className)}
    />
  );
}

/**
 * Announce a group of skeletons to screen readers. The visible blocks are all
 * `aria-hidden`, so the only thing read out is this status message.
 */
export function SkeletonRegion({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div role="status" className={className}>
      <span className="sr-only">{label}</span>
      {children}
    </div>
  );
}

/** A stack of text-width bars; the last one is short, like a real paragraph. */
export function SkeletonText({
  lines = 3,
  tone = "light",
  className,
  gap = "space-y-3",
}: {
  lines?: number;
  tone?: SkeletonTone;
  className?: string;
  gap?: string;
}) {
  return (
    <div className={cn(gap, className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          tone={tone}
          // one width class only — `cn` has no tailwind-merge to resolve a clash
          className={cn("h-3 rounded-full", i === lines - 1 ? "w-3/5" : "w-full")}
        />
      ))}
    </div>
  );
}

/** Mirrors `PageHero`: gold hairline, two title lines, a description. */
export function SkeletonHero({
  compact = false,
  align = "left",
}: {
  compact?: boolean;
  align?: "left" | "center";
}) {
  return (
    <section className="relative overflow-hidden bg-primary">
      {/* stands in for the parallax cover image */}
      <Skeleton tone="dark" className="absolute inset-0 opacity-70" />
      <div
        className={cn(
          "container-site relative",
          compact
            ? "pb-8 pt-16 sm:pb-28 lg:pb-32 lg:pt-48"
            : "pb-24 pt-40 sm:pb-28 lg:pb-32 lg:pt-48",
          align === "center" && "text-center"
        )}
      >
        <span
          className={cn("inline-flex h-px w-14 bg-gold/70", align === "center" && "mx-auto")}
          aria-hidden="true"
        />
        <div className={cn("mt-7 max-w-3xl space-y-4", compact && "mt-4")}>
          <Skeleton tone="dark" className="h-8 w-11/12 sm:h-14 sm:w-4/5" />
          <Skeleton tone="dark" className="h-8 w-7/12 sm:h-14 sm:w-3/5" />
        </div>
        <div className="mt-6 max-w-2xl">
          <SkeletonText lines={2} tone="dark" />
        </div>
      </div>
    </section>
  );
}

/** Mirrors `InsightCard`: cover block, meta, serif title, excerpt, link. */
export function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white">
      <div className="relative h-48 sm:h-52">
        <Skeleton tone="dark" className="absolute inset-0" />
        {/* the gold category pill that sits over the cover */}
        <Skeleton tone="dark" className="absolute left-4 top-4 h-6 w-20 rounded-full opacity-80" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Skeleton className="h-3 w-32 rounded-full" />
        <Skeleton className="mt-3 h-5 w-4/5 rounded" />
        <Skeleton className="mt-2 h-5 w-2/3 rounded" />
        <div className="mt-4">
          <SkeletonText lines={3} />
        </div>
        <Skeleton className="mt-5 h-3 w-24 rounded-full" />
      </div>
    </div>
  );
}

/** A responsive grid of `SkeletonCard`s — the insights listing shape. */
export function SkeletonCardGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

const CHIP_WIDTHS = ["w-20", "w-24", "w-16", "w-28", "w-20", "w-24"] as const;

/** The category filter pills above the insights grid. */
export function SkeletonChips({ count = 6 }: { count?: number }) {
  return (
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className={cn("h-7 rounded-full", CHIP_WIDTHS[i % CHIP_WIDTHS.length])} />
      ))}
    </div>
  );
}

/** A stack of list rows — the admin tables and inboxes. */
export function SkeletonListRows({
  count = 4,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 sm:flex-row sm:items-center"
        >
          <Skeleton className="h-16 w-full rounded-xl sm:w-28" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-4 w-3/4 rounded" />
            <Skeleton className="h-3 w-1/2 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Mirrors the full-bleed cover header of an insight article. */
export function SkeletonArticleHero() {
  return (
    <section className="relative flex min-h-[72vh] items-end overflow-hidden bg-primary">
      <Skeleton tone="dark" className="absolute inset-0 opacity-80" />
      <div className="container-site relative pb-16 pt-40">
        <Skeleton tone="dark" className="h-3 w-28 rounded-full" />
        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Skeleton tone="dark" className="h-6 w-24 rounded-full" />
          <Skeleton tone="dark" className="h-3 w-28 rounded-full" />
          <Skeleton tone="dark" className="h-3 w-20 rounded-full" />
        </div>
        <div className="mt-6 max-w-4xl space-y-4">
          <Skeleton tone="dark" className="h-8 w-11/12 sm:h-12" />
          <Skeleton tone="dark" className="h-8 w-7/12 sm:h-12" />
        </div>
      </div>
    </section>
  );
}

/** Mirrors the article body: gold-ruled excerpt, prose, dark CTA panel. */
export function SkeletonArticleBody() {
  return (
    <div className="container-site">
      <div className="mx-auto max-w-3xl">
        <div className="mt-12 space-y-4 border-l-2 border-gold/60 pl-6">
          <Skeleton className="h-6 w-full rounded" />
          <Skeleton className="h-6 w-10/12 rounded" />
        </div>
        <div className="mt-10">
          <SkeletonText lines={8} gap="space-y-4" />
        </div>
        <div className="relative mt-16 overflow-hidden rounded-3xl bg-primary px-8 py-14 sm:px-14">
          <Skeleton tone="dark" className="absolute inset-0 opacity-60" />
          <div className="relative text-center">
            <Skeleton tone="dark" className="mx-auto h-8 w-2/3 rounded" />
            <div className="mx-auto mt-4 max-w-md">
              <SkeletonText lines={2} tone="dark" />
            </div>
            <Skeleton tone="dark" className="mx-auto mt-7 h-11 w-56 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
