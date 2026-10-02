# Insight articles — source files

These are the **import format** for the launch batch of `/insights` articles.
They exist so the content can be reviewed in a diff, edited by hand, and
imported into MongoDB reproducibly. Once imported, the normal authoring path is
the admin dashboard at `/admin/insights`.

## Layout

One directory per article:

```
content/insights/<slug>/
  meta.json   titles, excerpts, category, tags, author, publication date
  en.md       English body (markdown)
  fr.md       French body (markdown)
```

`fr.md` is optional. If it is absent — or if `titleFr` / `excerptFr` are blank —
`localizedField()` in `src/lib/i18n/core.ts` falls back to the English value, so
a half-translated article degrades to English rather than breaking.

## Importing

```bash
npm run seed:insights              # validate and print a plan, writes nothing
npm run seed:insights -- --apply   # insert into MongoDB
```

The script reads `MONGODB_URI` from the environment, or from `.env.local` /
`.env`. An existing slug is **never** overwritten without `--force`, so
re-running after editing in the admin dashboard cannot revert that work.

## What the validator enforces

These are the rules from `docs/SEO-KEYWORDS.md`, checked so they cannot rot:

- `slug` matches its directory, is lowercase, and is at most 4 words.
- `category` is one of the six values in `INSIGHT_CATEGORIES`
  (`src/lib/content.ts`).
- Every tag has a French dictionary entry, because tags render through `t()`.
- `excerpt` / `excerptFr` are within the 175-character hard limit.
- `en.md` is present and non-empty; `fr.md` is not a truncated stub.
- `meta.title` and `meta.excerpt` are present.

## Writing rules for these articles

- **One intent per article.** The keyword map warns against doorway pages; two
  articles competing for the same query splits the signal.
- **Say something true.** Every figure, law name, institution and date in these
  articles was checked against a primary source before publication. An advisory
  firm that publishes a wrong number about rules of origin loses the trust the
  rest of the site depends on.
- **No unsupported superlatives.** "Africa's fastest-growing market" needs a
  source or it does not go in.
- **Secondary keywords live in H2s.** Natural topical coverage, not repetition.
- **English and French are written separately.** The French is not a translation
  exercise — the vocabulary differs (`mise en relation`, `intelligence
  économique`, `ZLECAf`, `règles d'origine`), and the examples should be
  recognisable to a Cameroonian or West African reader.
