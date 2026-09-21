import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
  itemClassName?: string;
  speed?: "marquee" | "marquee-fast" | "marquee-slow";
  separator?: string;
  reverse?: boolean;
}

const ANIMATION: Record<NonNullable<MarqueeProps["speed"]>, string> = {
  marquee: "animate-marquee",
  "marquee-fast": "animate-marquee-fast",
  "marquee-slow": "animate-marquee-slow",
};

/**
 * Infinite horizontal marquee. Items are duplicated once so the -50%
 * translate loop is seamless.
 */
export default function Marquee({
  items,
  className,
  itemClassName,
  speed = "marquee",
  separator = "◆",
  reverse = false,
}: MarqueeProps) {
  const row = [...items, ...items];
  return (
    <div className={cn("mask-fade-x overflow-hidden whitespace-nowrap", className)}>
      <div className={cn("inline-flex items-center", ANIMATION[speed], reverse && "[animation-direction:reverse]")}>
        {row.map((item, i) => (
          <span key={i} className={cn("inline-flex items-center leading-none", itemClassName)}>
            {item}
            <span aria-hidden="true" className={cn("mx-10 text-current opacity-50", !separator && "hidden")}>
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}