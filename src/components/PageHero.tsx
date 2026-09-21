import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { BRAND_IMAGE } from "@/lib/content";
import Parallax from "@/components/Parallax";

interface PageHeroProps {
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
  /** Content image override — falls back to the single placeholder. */
  image?: string;
  /** Slim variant for pages with a form below (mobile stays compact). */
  compact?: boolean;
  className?: string;
}

export default function PageHero({
  title,
  description,
  children,
  align = "left",
  image,
  compact,
  className,
}: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden bg-primary", className)}>
      <Parallax speed={0.12} className="absolute inset-0">
        <img
          src={image || BRAND_IMAGE}
          alt=""
          className="h-full w-full scale-110 object-cover"
          draggable={false}
        />
      </Parallax>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/70 to-primary" />

      <div
        className={cn(
          compact
            ? "container-site relative pb-8 pt-16 sm:pb-28 lg:pb-32 lg:pt-48"
            : "container-site relative pb-24 pt-40 sm:pb-28 lg:pb-32 lg:pt-48",
          align === "center" && "text-center"
        )}
      >
        <span
          className={cn(
            "inline-flex h-px w-14 bg-gold",
            align === "center" && "mx-auto"
          )}
          aria-hidden="true"
        />
        <h1
          className={cn(
            compact
              ? "mt-4 max-w-3xl font-serif text-2xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl"
              : "mt-7 max-w-3xl font-serif text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl",
            compact && "sm:mt-7"
          )}
        >
          {title}
        </h1>
        {description && (
          <p
            className={cn(
              compact
                ? "mt-3 hidden max-w-2xl text-sm leading-relaxed text-white/70 sm:block sm:text-lg"
                : "mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg",
              align === "center" && "mx-auto"
            )}
          >
            {description}
          </p>
        )}
        {children && (
          <div className={cn("mt-10 flex flex-wrap gap-4", align === "center" && "justify-center")}>{children}</div>
        )}
      </div>
    </section>
  );
}