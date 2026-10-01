/**
 * French dictionary — keyed by the exact English strings used across the site.
 * Unknown keys pass through unchanged (safe fallback keeps the UI whole).
 *
 * Split by area so translators can work on one section at a time:
 *   ./site   → public chrome, pages, forms, data strings
 *   ./legal  → legal pages (Terms / Privacy / Cookies)
 *   ./admin  → private admin dashboard
 */
import { siteFr } from "./site";
import { legalFr } from "./legal";
import { adminFr } from "./admin";

export const fr: Record<string, string> = {
  ...siteFr,
  ...legalFr,
  ...adminFr,
};
