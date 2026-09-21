import { cn } from "@/lib/utils";
import { SERVICES } from "@/lib/content";

interface ServiceRowsProps {
  limit?: number;
  className?: string;
}

/**
 * Minimalist service index — numbered editorial rows instead of icon cards.
 * Used for both the home teaser and the full services list.
 */
export default function ServiceRows({ limit, className }: ServiceRowsProps) {
  const items = limit ? SERVICES.slice(0, limit) : SERVICES;
  return (
    <div className={cn("divide-y divide-gray-100 border-y border-gray-100", className)}>
      {items.map((service, i) => (
        <div
          key={service.title}
          className="group grid gap-2 py-6 transition-colors duration-300 hover:bg-cream sm:grid-cols-[3.5rem_1fr] sm:gap-6 sm:px-4 sm:py-7 sm:-mx-4 lg:grid-cols-[3.5rem_minmax(0,16rem)_1fr]"
        >
          <span className="font-serif text-sm text-gold-dark/80 transition-colors group-hover:text-gold">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="font-serif text-xl font-bold text-primary transition-colors group-hover:text-gold-dark">
            {service.title}
          </h3>
          <p className="leading-relaxed text-gray-500 sm:col-start-2 lg:col-start-3 lg:row-start-1 lg:pt-1">
            {service.description}
          </p>
        </div>
      ))}
    </div>
  );
}