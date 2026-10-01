const fs = require("fs");
const path = require("path");

/**
 * French dictionary coverage check.
 *
 * Gate 1 (hard failure) — every t("…") literal call site must resolve.
 * Gate 2 (advisory)    — scan for prose literals that look like display copy but
 *                        are never passed through t() as a literal, e.g. content
 *                        held in arrays/objects and rendered as t(faq.question).
 *                        Those silently stay English on /fr pages, so they are
 *                        worth surfacing — with known-intentional cases excluded.
 *
 * Run: node scripts/check-i18n-coverage.cjs
 */

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]
  );
}

const DICT_FILES = ["site.ts", "legal.ts", "admin.ts"].map((f) =>
  path.join("src", "lib", "i18n", "dictionaries", f)
);

const dict = Object.create(null);
for (const file of DICT_FILES) {
  const src = fs.readFileSync(file, "utf8");
  const start = src.indexOf("export const fr");
  const brace = src.indexOf("{", start);
  const objSrc = src.slice(brace, src.lastIndexOf("};") + 1);
  // eslint-disable-next-line no-eval
  Object.assign(dict, eval("(" + objSrc + ")"));
}

// Lookup mirrors lib/i18n/core.ts, which normalises whitespace.
const norm = (s) => s.replace(/\s+/g, " ").trim();
const dictNorm = new Set(Object.keys(dict).map(norm));
const has = (s) => dictNorm.has(norm(s));

const looksFrench = (s) => /[À-ÿŒœ]/.test(s);

const files = walk("src").filter(
  (f) =>
    /\.(tsx?|jsx?)$/.test(f) &&
    !f.includes(`${path.sep}dictionaries${path.sep}`) &&
    !f.endsWith(path.join("i18n", "core.ts"))
);

/**
 * Deliberately not translated:
 *  - server-side log/diagnostic text (never reaches a visitor)
 *  - the admin editor's markdown placeholder, which is switched inline by locale
 *  - FOUNDER.mission, which is unused data
 */
const INTENTIONAL = [
  { test: (s, w) => /^Sitemap: /.test(s), why: "server log" },
  { test: (s, w) => /^## Heading|^## Titre/.test(s), why: "admin placeholder (locale-switched inline)" },
  {
    test: (s) => s.startsWith("Connect businesses and opportunities — and help turn"),
    why: "unused FOUNDER.mission data",
  },
];

/** Prose heuristic: sentence-like, no code-ish characters, not a class list. */
function isProse(s) {
  if (s.length < 25 || s.length > 1200) return false;
  if (/[<>{}$`\\]|=>|https?:|\/\/|@\/|className|=>|px-|text-|bg-/.test(s)) return false;
  const words = s.split(/\s+/);
  if (words.length < 6) return false;
  // Tailwind / CSS utility strings: no sentence punctuation and no capitalised
  // word after the first character.
  const sentenceish = /[.!?;:,]/.test(s) || words.slice(1).some((w) => /^[A-Z]/.test(w));
  if (!sentenceish) return false;
  if (!/^[A-ZÀ-Ÿ]/.test(s)) return false;
  return words.filter((w) => /^[a-zà-ÿ][a-zà-ÿ'’-]{2,}$/i.test(w)).length >= 4;
}

const callSiteRe = /(?<![A-Za-z0-9_])t\(\s*"((?:[^"\\]|\\.)*)"\s*\)/g;
const literalRe = /"((?:[^"\\\n]|\\.){25,1200})"/g;

const callSites = new Set();
const proseMisses = new Map();

for (const file of files) {
  const src = fs.readFileSync(file, "utf8");

  let m;
  while ((m = callSiteRe.exec(src))) {
    try {
      callSites.add(JSON.parse(`"${m[1]}"`));
    } catch {
      /* ignore malformed */
    }
  }

  literalRe.lastIndex = 0;
  while ((m = literalRe.exec(src))) {
    let s;
    try {
      s = JSON.parse(`"${m[1]}"`);
    } catch {
      continue;
    }
    if (!isProse(s) || has(s) || looksFrench(s)) continue;

    const line = src.slice(0, m.index).split("\n").length;
    const where = `${file}:${line}`;

    if (INTENTIONAL.some((r) => r.test(s, where))) continue;

    // Metadata descriptions are authored as explicit { en, fr } pairs rather
    // than dictionary keys, so skip literals whose neighbourhood holds the
    // other language of the same string.
    const window = src.slice(Math.max(0, m.index - 400), m.index + 400);
    if (/\bfr:\s*"/.test(window) && looksFrench(window)) continue;

    if (!proseMisses.has(s)) proseMisses.set(s, where);
  }
}

const missingKeys = [...callSites].filter((k) => !has(k));

console.log("Dictionary keys:", Object.keys(dict).length);
console.log('t("...") call sites:', callSites.size);
console.log("Missing call-site keys:", missingKeys.length);
if (missingKeys.length) console.log(JSON.stringify(missingKeys, null, 2));

console.log("\nPossible untranslated prose (review):", proseMisses.size);
for (const [text, where] of proseMisses) {
  console.log(`  ${where}\n    ${JSON.stringify(text.slice(0, 160))}`);
}

if (missingKeys.length) {
  console.log("\nFAIL — t() call sites with no French entry.");
  process.exitCode = 1;
} else if (proseMisses.size) {
  console.log("\nOK — all t() keys resolve; review the prose list above.");
} else {
  console.log("\nOK — full French coverage.");
}
