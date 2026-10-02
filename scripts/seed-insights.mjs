#!/usr/bin/env node
/**
 * Seed the launch batch of insight articles into MongoDB.
 *
 * The articles are authored as files under `content/insights/<slug>/` so that
 * they can be reviewed in a diff, edited by hand, and re-run safely. Once they
 * exist in the database the normal authoring path is the admin dashboard at
 * `/admin/insights` — these files are the import format, not a second CMS.
 *
 *   npm run seed:insights            # validate + print the plan, touch nothing
 *   npm run seed:insights -- --apply # write to MongoDB
 *   npm run seed:insights -- --apply --force
 *                                    # also overwrite rows already in the DB
 *
 * By default an existing slug is left alone, so re-running the seed after
 * editing articles in the admin dashboard cannot silently revert that work.
 * `--force` is the only way to overwrite, and it never touches `createdAt`.
 *
 * Writes go through the raw collection rather than the Mongoose model: the
 * model is TypeScript and this script is plain Node, and an upsert by slug
 * needs no schema. Field names match `src/models/Insight.ts` exactly, and
 * `createdAt` / `updatedAt` are written by hand to match `timestamps: true`.
 */

import { readFile, readdir } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT_DIR = path.join(ROOT, "content", "insights");

/** Mirrors `INSIGHT_CATEGORIES` in src/lib/content.ts. */
const CATEGORIES = [
  "Market Intelligence",
  "Investment",
  "Trade & Export",
  "Agribusiness",
  "Entrepreneurship",
  "Doing Business in Africa",
];

/** Soft target from the "Length targets" table in docs/SEO-KEYWORDS.md. */
const MIN_WORDS = 700;

const argv = process.argv.slice(2);
const APPLY = argv.includes("--apply");
const FORCE = argv.includes("--force");

const errors = [];
const warnings = [];
const fail = (slug, msg) => errors.push(`${slug ? `${slug}: ` : ""}${msg}`);

/**
 * Catch characters that have no business in English or French copy: CJK, emoji,
 * Cyrillic, Arabic, control characters. These arrive as corruption when French
 * text is round-tripped through a shell that does not handle UTF-8, and they
 * are very easy to miss by eye because the surrounding sentence still reads
 * correctly.
 *
 * A denylist of scripts rather than an allowlist of characters, because
 * legitimate French and English typography is broad — guillemets, en dashes,
 * typographic apostrophes, the "less than or equal to" used in rules-of-origin
 * arithmetic, and superscript ordinals such as 33e are all correct.
 */
const CORRUPTION_SCRIPTS = [
  [0x0080, 0x009f, "C1 control"],
  [0x0370, 0x03ff, "Greek"],
  [0x0400, 0x04ff, "Cyrillic"],
  [0x0530, 0x058f, "Armenian"],
  [0x0590, 0x05ff, "Hebrew"],
  [0x0600, 0x06ff, "Arabic"],
  [0x0750, 0x077f, "Arabic supplement"],
  [0x0900, 0x097f, "Devanagari"],
  [0x0e00, 0x0e7f, "Thai"],
  [0x1100, 0x11ff, "Hangul Jamo"],
  [0x2e80, 0x2fdf, "CJK radicals"],
  [0x3040, 0x309f, "Hiragana"],
  [0x30a0, 0x30ff, "Katakana"],
  [0x3100, 0x318f, "Hangul compatibility"],
  [0x3400, 0x4dbf, "CJK extension A"],
  [0x4e00, 0x9fff, "CJK unified ideographs"],
  [0xa960, 0xa97f, "Hangul Jamo extended A"],
  [0xac00, 0xd7af, "Hangul syllables"],
  [0xf900, 0xfaff, "CJK compatibility ideographs"],
  [0xfe30, 0xfe4f, "CJK compatibility forms"],
  [0xff00, 0xffef, "Halfwidth and fullwidth forms"],
  [0x1f000, 0x1faff, "Emoji and pictographs"],
];

function describeStrayCharacters(slug, label, text) {
  const counts = new Map();
  for (const char of text) {
    const code = char.codePointAt(0);
    for (const [lo, hi, name] of CORRUPTION_SCRIPTS) {
      if (code < lo || code > hi) continue;
      const desc = `U+${code.toString(16).toUpperCase().padStart(4, "0")} "${char}" (${name})`;
      counts.set(desc, (counts.get(desc) || 0) + 1);
      break;
    }
  }
  if (counts.size === 0) return;
  fail(
    slug,
    `${label} contains characters that look like UTF-8 corruption: ` +
      // Deduplicate with a count, so one bad paste does not print fifty lines.
      [...counts].map(([desc, n]) => (n > 1 ? `${desc} x${n}` : desc)).join(", ")
  );
}

function loadEnvFile(file) {
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([\w.]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let value = m[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[m[1]] === undefined) process.env[m[1]] = value;
  }
}

// --- French dictionary, so tags can be checked for translation ---------------
async function loadDictionarySource() {
  const file = path.join(ROOT, "src", "lib", "i18n", "dictionaries", "site.ts");
  return existsSync(file) ? readFileSync(file, "utf8") : "";
}

/**
 * The dictionary is keyed by the exact English string, and the lookup in
 * `src/lib/i18n/core.ts` collapses whitespace first — so normalise the same way
 * before looking for a key. Entries are either `"quoted key":` or a bare
 * identifier key, both indented two spaces inside the exported object.
 */
function hasFrenchEntry(dictSrc, text) {
  const needle = text.replace(/\s+/g, " ").trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`^\\s{2}("?)${needle}\\1\\s*:`, "m").test(dictSrc);
}

// --- Read + validate the article files --------------------------------------
async function readArticles() {
  const dictSrc = await loadDictionarySource();
  const dirs = (await readdir(CONTENT_DIR, { withFileTypes: true }))
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();

  const articles = [];

  for (const dir of dirs) {
    const metaPath = path.join(CONTENT_DIR, dir, "meta.json");
    if (!existsSync(metaPath)) {
      fail(dir, "missing meta.json");
      continue;
    }

    let meta;
    try {
      meta = JSON.parse(await readFile(metaPath, "utf8"));
    } catch (e) {
      fail(dir, `meta.json is not valid JSON - ${e.message}`);
      continue;
    }

    const slug = meta.slug || dir;
    if (slug !== dir) fail(slug, `meta.slug "${meta.slug}" must match the directory name`);
    if (slug !== slug.toLowerCase()) fail(slug, "slug must be lowercase");
    if (slug.split("-").length > 4) {
      warnings.push(`${slug}: slug is ${slug.split("-").length} words, target is 4`);
    }

    if (!meta.title) fail(slug, "meta.title is required");
    if (!meta.excerpt) fail(slug, "meta.excerpt is required");
    if (!meta.category) fail(slug, "meta.category is required");
    else if (!CATEGORIES.includes(meta.category)) {
      fail(slug, `category "${meta.category}" is not in INSIGHT_CATEGORIES`);
    }
    if (!meta.publishedAt) fail(slug, "meta.publishedAt is required");
    else if (Number.isNaN(Date.parse(meta.publishedAt))) {
      fail(slug, `publishedAt "${meta.publishedAt}" is not a valid date`);
    }
    if (!Array.isArray(meta.tags) || meta.tags.length === 0) {
      fail(slug, "meta.tags must be a non-empty array");
    } else {
      for (const tag of meta.tags) {
        // Tags render through t(tag) on the article page, so an untranslated
        // tag shows up as English text on /fr/insights/...
        if (dictSrc && !hasFrenchEntry(dictSrc, tag)) {
          fail(slug, `tag "${tag}" has no entry in the French dictionary`);
        }
      }
    }

    // The excerpt doubles as the meta description, so its length matters.
    for (const [field, limit] of [["excerpt", 175], ["excerptFr", 175]]) {
      const len = (meta[field] || "").length;
      if (len > limit) fail(slug, `${field} is ${len} chars, hard limit is ${limit}`);
      else if (field === "excerpt" && len && len < 110) {
        warnings.push(`${slug}: excerpt is only ${len} chars`);
      }
    }

    const readBody = async (name) => {
      const file = path.join(CONTENT_DIR, dir, name);
      return existsSync(file) ? readFile(file, "utf8") : "";
    };

    const content = await readBody("en.md");
    const contentFr = await readBody("fr.md");

    if (!content.trim()) fail(slug, "en.md is empty or missing");

    const wordCount = content.trim().split(/\s+/).length;
    if (wordCount < MIN_WORDS) {
      warnings.push(`${slug}: en.md is ${wordCount} words, target is ${MIN_WORDS}+`);
    }
    if (contentFr.trim()) {
      const frWords = contentFr.trim().split(/\s+/).length;
      // French runs roughly 15% longer than English for the same content, so
      // anything under 80% is a sign the translation was cut short.
      if (frWords < wordCount * 0.8) {
        warnings.push(`${slug}: fr.md is ${frWords} words vs ${wordCount} in en.md - looks truncated`);
      }
    } else {
      warnings.push(`${slug}: no fr.md - /fr will fall back to the English body`);
    }

    if (!meta.titleFr) warnings.push(`${slug}: no titleFr - /fr falls back to English`);
    if (!meta.excerptFr) warnings.push(`${slug}: no excerptFr - /fr falls back to English`);

    // Corruption guard across every French-facing string and both bodies.
    for (const [label, text] of [
      ["title", meta.title || ""],
      ["titleFr", meta.titleFr || ""],
      ["excerpt", meta.excerpt || ""],
      ["excerptFr", meta.excerptFr || ""],
      ["en.md", content],
      ["fr.md", contentFr],
    ]) {
      describeStrayCharacters(slug, label, text);
    }

    const ownPath = `/insights/${slug}`;

    for (const [label, body, expectFr] of [
      ["en.md", content, false],
      ["fr.md", contentFr, true],
    ]) {
      if (!body) continue;

      // `.prose-agn` styles headings, lists, quotes, links and strong text but
      // has no rules for tables or images, so those would render unstyled.
      if (/^\s*\|/m.test(body)) {
        fail(slug, `${label} contains a markdown table - .prose-agn has no table styles`);
      }
      if (/!\[[^\]]*\]\(/.test(body)) {
        fail(slug, `${label} contains an image - cover images are set per article in the admin`);
      }

      // An internal link that skips the locale prefix drops the reader out of
      // the language they chose.
      for (const m of body.matchAll(/\]\((\/[^)#\s]*)\)/g)) {
        const href = m[1];
        const isFr = href === "/fr" || href.startsWith("/fr/");
        if (isFr !== expectFr) {
          fail(slug, `${label} links to "${href}", which is not locale-correct`);
        }
        if (href === ownPath || href === `/fr${ownPath}`) {
          warnings.push(`${slug}: ${label} links to itself`);
        }
      }
    }

    articles.push({
      slug,
      title: meta.title,
      titleFr: meta.titleFr || "",
      excerpt: meta.excerpt,
      excerptFr: meta.excerptFr || "",
      content,
      contentFr,
      category: meta.category,
      tags: meta.tags,
      coverUrl: meta.coverUrl || "",
      coverPublicId: meta.coverPublicId || "",
      author: meta.author || "Christopher A. Ekom",
      published: meta.published !== false,
      featured: !!meta.featured,
      publishedAt: new Date(meta.publishedAt),
      _wordCount: wordCount,
    });
  }

  return articles;
}

// --- Report ------------------------------------------------------------------
function report(articles) {
  const pad = (s, n) => String(s).padEnd(n);
  console.log(`\nArticles found: ${articles.length}\n`);
  console.log(`  ${pad("slug", 38)}${pad("category", 24)}${pad("words", 7)}${pad("EN", 5)}FR`);
  for (const a of articles) {
    console.log(
      `  ${pad(a.slug, 38)}${pad(a.category, 24)}${pad(a._wordCount, 7)}` +
        `${pad(a.content.trim() ? "yes" : "NO", 5)}${a.contentFr.trim() ? "yes" : "no"}`
    );
  }

  if (warnings.length) {
    console.log(`\nWarnings (${warnings.length}):`);
    for (const w of warnings) console.log(`  - ${w}`);
  }
  if (errors.length) {
    console.log(`\nErrors (${errors.length}):`);
    for (const e of errors) console.log(`  - ${e}`);
    return false;
  }
  console.log("\nValidation passed.");
  return true;
}

// --- Write -------------------------------------------------------------------
async function write(articles) {
  loadEnvFile(path.join(ROOT, ".env.local"));
  loadEnvFile(path.join(ROOT, ".env"));

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("\nMONGODB_URI is not set and was not found in .env.local or .env.");
    process.exit(1);
  }

  // Imported lazily so the default dry run never needs a database.
  const { default: mongoose } = await import("mongoose");

  await mongoose.connect(uri, { bufferCommands: false, serverSelectionTimeoutMS: 15000 });
  const collection = mongoose.connection.collection("insights");

  let inserted = 0;
  let skipped = 0;
  let updated = 0;

  for (const a of articles) {
    const existing = await collection.findOne({ slug: a.slug }, { projection: { createdAt: 1 } });

    const doc = {
      title: a.title,
      titleFr: a.titleFr,
      slug: a.slug,
      excerpt: a.excerpt,
      excerptFr: a.excerptFr,
      content: a.content,
      contentFr: a.contentFr,
      category: a.category,
      tags: a.tags,
      coverUrl: a.coverUrl,
      coverPublicId: a.coverPublicId,
      author: a.author,
      published: a.published,
      featured: a.featured,
      publishedAt: a.publishedAt,
      updatedAt: new Date(),
    };

    if (!existing) {
      doc.createdAt = doc.updatedAt;
      await collection.insertOne(doc);
      console.log(`  + inserted  ${a.slug}`);
      inserted++;
    } else if (!FORCE) {
      console.log(`  = kept      ${a.slug} (already in DB - use --force to overwrite)`);
      skipped++;
    } else {
      // Preserve the original createdAt, so an overwrite is not a new article.
      doc.createdAt = existing.createdAt || new Date();
      await collection.replaceOne({ slug: a.slug }, doc);
      console.log(`  ~ updated   ${a.slug}`);
      updated++;
    }
  }

  await mongoose.disconnect();
  console.log(`\nDone - ${inserted} inserted, ${updated} updated, ${skipped} left untouched.\n`);
}

const articles = await readArticles();

if (!report(articles)) {
  console.error("\nFix the errors above and re-run.\n");
  process.exit(1);
}

if (!APPLY) {
  console.log("\nDry run - nothing was written. Re-run with --apply to seed the database.\n");
  process.exit(0);
}

await write(articles);
