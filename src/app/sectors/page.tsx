import type { Metadata } from "next";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { SECTORS, BRAND_IMAGE } from "@/lib/content";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import Parallax from "@/components/Parallax";
import Marquee from "@/components/Marquee";
import Statement from "@/components/Statement";

export const metadata: Metadata = {
  title: "Sectors",
  description:
    "ACE Global Nexus operates across agribusiness, mining, energy, infrastructure, ICT, healthcare, logistics, manufacturing, education and professional services in Africa.",
};

export default function SectorsPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Where African opportunity meets
            <br className="hidden sm:block" /> <span className="italic text-gold">global capital and markets</span>
          </>
        }
        description="We focus on the sectors driving Africa's growth — and pair them with the market intelligence, partners and investors that make them work."
      />

      <section className="bg-white py-24 sm:py-32">
        <div className="container-site">
          <div className="grid gap-x-12 lg:grid-cols-2 lg:gap-x-16">
            {SECTORS.map((sector, i) => (
              <Reveal key={sector.title} delay={(i % 2) * 80}>
                <div className="group flex items-baseline gap-6 border-b border-gray-100 py-7 transition-colors duration-300 hover:bg-cream sm:px-4 sm:-mx-4">
                  <span className="font-serif text-sm text-gold-dark transition-colors group-hover:text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="font-serif text-xl font-bold text-primary transition-colors group-hover:text-gold-dark">
                      {sector.title}
                    </h2>
                    <p className="mt-1.5 max-w-md text-sm leading-relaxed text-gray-500">{sector.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-primary py-10">
        <Marquee
          items={SECTORS.map((s) => s.title)}
          speed="marquee"
          itemClassName="font-serif text-2xl font-semibold text-white/45 sm:text-3xl"
          separator="◆"
        />
      </section>

      {/* CTA band with imagery */}
      <section className="relative overflow-hidden bg-primary">
        <Parallax speed={0.12} className="absolute inset-0">
          <img src={BRAND_IMAGE} alt="" className="h-full w-full scale-110 object-cover" draggable={false} />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/75 to-primary" />
        <div className="container-site relative py-24 text-center sm:py-28">
          <h2 className="font-serif text-2xl font-bold leading-tight text-white sm:text-4xl">
            Not sure where your opportunity fits?
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/65">
            Tell us your sector and objectives — we will map the market, the partners and the path forward.
          </p>
          <Link href="/contact" className="btn-primary mt-8">
            Talk to Our Team <FaArrowRight size={13} />
          </Link>
        </div>
      </section>

      <Statement word="AFRICA" sub="Ten sectors. One mission — connect opportunity with capital." />
    </>
  );
}