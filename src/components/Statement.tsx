import Parallax from "@/components/Parallax";
import { BRAND_IMAGE } from "@/lib/content";
import { tForLocale } from "@/lib/i18n/server";

interface StatementProps {
  /** One powerful word, set huge in the display face. */
  word: string;
  /** Small gold caption under the word. */
  sub?: string;
}

/**
 * Editorial "impact word" band: one word set dramatically larger than
 * everything else around it, in a completely different font family,
 * sitting over a parallax photograph background.
 */
export default function Statement({ word, sub }: StatementProps) {
  const t = tForLocale();
  return (
    <section className="relative overflow-hidden bg-primary">
      <Parallax speed={0.14} className="absolute inset-0">
        <img src={BRAND_IMAGE} alt="" className="h-full w-full scale-110 object-cover opacity-45" draggable={false} />
      </Parallax>
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/85 to-primary" />

      <div className="container-site relative px-4 py-16 text-center sm:py-20 lg:py-24">
        <p
          aria-hidden="true"
          className="select-none font-display text-[16vw] leading-[0.82] tracking-[0.01em] text-white/95 sm:text-[13vw] md:text-[10.5vw] lg:text-[8.5vw] xl:text-[7.5vw]"
        >
          {t(word)}
        </p>
        {sub && (
          <p className="mx-auto mt-4 max-w-md text-[11px] font-semibold uppercase tracking-[0.32em] text-gold-light sm:text-sm">
            {t(sub)}
          </p>
        )}
      </div>
    </section>
  );
}