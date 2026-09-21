import { cn } from "@/lib/utils";
import Reveal from "@/components/Reveal";

interface SectionHeadingProps {
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}

export default function SectionHeading({ title, description, align = "center", dark = false, className }: SectionHeadingProps) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left", className)}>
      <span className={cn("block h-px w-14 bg-gold", align === "center" && "mx-auto")} aria-hidden="true" />
      <h2 className={cn("mt-6 font-serif text-3xl font-bold leading-tight sm:text-4xl", dark ? "text-white" : "text-primary")}>
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-base leading-relaxed", dark ? "text-white/60" : "text-gray-500")}>{description}</p>
      )}
    </Reveal>
  );
}