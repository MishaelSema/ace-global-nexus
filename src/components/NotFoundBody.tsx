import Link from "next/link";
import PageHero from "@/components/PageHero";
import { tForLocale, pathForLocale } from "@/lib/i18n/server";

/**
 * Presentational body of the 404 page, shared by every `not-found.tsx` boundary
 * (`src/app/` for unmatched URLs, `src/app/insights/[slug]/` for `notFound()`
 * thrown from an article lookup). Keeping it here means the two boundaries
 * cannot drift, and the metadata each boundary exports stays next to its own
 * `robots`/title decisions.
 */
export default function NotFoundBody() {
  const t = tForLocale();
  const p = pathForLocale();

  const links = [
    { label: t("Home"), href: "/" },
    { label: t("Services"), href: "/services" },
    { label: t("Sectors"), href: "/sectors" },
    { label: t("Insights"), href: "/insights" },
    { label: t("Contact"), href: "/contact" },
  ];

  return (
    <>
      <PageHero title={t("Not found")} description={t("This page could not be found.")} compact />

      <section className="bg-white py-20 sm:py-24">
        <div className="container-site">
          <div className="mx-auto max-w-2xl">
            <p className="text-base leading-relaxed text-primary/70">
              {t("The page you are looking for has moved, or the link may be out of date.")}
            </p>

            <Link href={p("/")} className="btn-primary mt-8">
              {t("Return to homepage")}
            </Link>

            <p className="mt-14 text-xs font-bold uppercase tracking-widest text-primary/40">
              {t("You might be looking for:")}
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={p(link.href)}
                    className="text-sm font-medium text-primary/70 underline-offset-4 transition-colors hover:text-gold hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}