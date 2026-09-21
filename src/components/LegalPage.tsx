import type { ReactNode } from "react";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { BRAND_IMAGE } from "@/lib/content";
import Parallax from "@/components/Parallax";

interface LegalPageProps {
  title: string;
  updated: string;
  children: ReactNode;
}

const LEGAL_LINKS = [
  { href: "/legal/terms", label: "Terms of Service" },
  { href: "/legal/privacy", label: "Privacy Policy" },
  { href: "/legal/cookies", label: "Cookie Policy" },
];

export default function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <article className="bg-white pb-24">
      {/* Slim navy band */}
      <section className="relative overflow-hidden bg-primary">
        <Parallax speed={0.08} className="absolute inset-0">
          <img src={BRAND_IMAGE} alt="" className="h-full w-full scale-110 object-cover opacity-40" draggable={false} />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/75 to-primary" />
        <div className="container-site relative pb-14 pt-36 sm:pb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-gold"
          >
            <FaArrowLeft size={12} /> Back to home
          </Link>
          <span className="mt-8 block h-px w-14 bg-gold" aria-hidden="true" />
          <h1 className="mt-6 max-w-3xl font-serif text-3xl font-bold text-white sm:text-4xl">{title}</h1>
          <p className="mt-3 text-sm text-white/55">
            Last updated: {updated} · This document is provided for general information and is not a substitute for
            professional legal advice.
          </p>
        </div>
      </section>

      <div className="container-site grid gap-12 pt-12 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:gap-16">
        <div className="prose-agn max-w-none">{children}</div>

        <aside className="h-fit lg:sticky lg:top-28 lg:self-start">
          <span className="block h-px w-14 bg-gold" aria-hidden="true" />
          <h2 className="mt-5 font-serif text-xl font-bold text-primary">Legal</h2>
          <ul className="mt-4 divide-y divide-gray-100 border-y border-gray-100">
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group flex items-center justify-between py-3.5 text-sm font-medium text-primary/80 transition-colors hover:text-gold-dark"
                >
                  {l.label}
                  <FaArrowRight size={12} className="text-gold-dark transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-gray-400">
            Questions about these policies? Reach us at{" "}
            <a href="mailto:chris.ekom@aceglobalnexus.com" className="text-gold-dark underline">
              chris.ekom@aceglobalnexus.com
            </a>
            .
          </p>
        </aside>
      </div>
    </article>
  );
}