# SEO keyword map — ACE Global Nexus

Last reviewed: 1 October 2026.

Covers the two indexable locales: English (`/…`) and French (`/fr/…`).

---

## Read this first: `<meta name="keywords">` does nothing

The site had a `keywords` array in `src/app/layout.tsx`. **I removed it**, because:

- Google has ignored `<meta name="keywords">` since 2009.
- Bing stopped using it in 2012.
- It was mixing ten English and French terms in a single tag, which no search
  engine parses anyway.

Adding keywords to a meta tag is not SEO. Everything below is therefore mapped to
places that are actually read: **title tags, meta descriptions, H1/H2 copy,
internal anchor text, and structured data.** The keyword lists below are the
brief for those placements.

### About the confidence level in this document

I do not have Ahrefs/Semrush/Keyword Planner access, so **these are not ranked by
measured search volume.** They are derived from:

1. Search-intent analysis of what a buyer in this market actually types.
2. Terminology verified against the live landscape — the wording Cameroon and
   CEEAC/CEMAC institutions use (`règles d'origine`, `ZLECAf`, `port de
   Douala-Bonabéri`, `conseil en commerce international`), and the phrasing
   competing African market-entry consultancies use in their own titles.

**Validate before you commit budget.** The two places to check real numbers:

- Google Search Console → Performance, once you have ~50 clicks. This is the
  only source of *your* actual demand, and it beats any third-party estimate.
- Google Keyword Planner, filtered to your location (Cameroon, Nigeria, France,
  diaspora markets) — it will show volume ranges per term per country.

The map below is ordered by **intent fit**, not by volume, because for a niche
advisory firm a low-volume, high-intent term ("conseiller en commerce
Yaoundé") converts far better than a high-volume, low-intent term ("investir en
Afrique").

---

## The strategic idea

The site has two genuinely different audiences, and they search in two
different languages. Do not try to rank one page for both.

| | English | French |
|---|---|---|
| **Audience** | Foreign companies entering Africa; international investors; diaspora investors comfortable in English | Cameroonian/Central African SMEs going abroad; Francophone African investors; the local market |
| **Mindset** | "How do I enter this market, and who do I call?" | "Qui peut m'aider à exporter / investir ?" |
| **Geography to target in Search Console** | United States, United Kingdom, France, Nigeria, South Africa, Canada, UAE | Cameroon, Senegal, Côte d'Ivoire, France, Belgium, Canada |
| **Tone** | Executive, advisory, structured | Direct, practical, relational |

A single page cannot serve both. That is exactly what the `/fr/` mirror solves.

---

## English keyword map

`Primary` = the one term the page must win. `Secondary` = supporting terms that
belong in the copy. `Long-tail` = low volume, high intent, and where the actual
enquiries come from.

### `/` — Home

| Role | Keyword |
|---|---|
| **Primary** | market entry Africa |
| Secondary | trade advisory Africa; investment promotion Africa; business matchmaking Africa; Africa market intelligence |
| Long-tail | market entry consultancy Africa; trade and investment advisory Cameroon; business advisory Yaoundé; Africa market entry strategy |
| **Do not use** | "Africa" alone, "business" alone — uncompetitive and meaningless |

### `/services` — Services

| Role | Keyword |
|---|---|
| **Primary** | trade and investment advisory services |
| Secondary | business matchmaking Africa; export promotion Africa; market intelligence Africa; investor advisory Africa; global sourcing Africa |
| Long-tail | B2B matchmaking Africa; export promotion consultant Africa; Africa market research firm; find a distributor in Africa; corporate training on trade Africa |
| Note | This page already carries an FAQ block (`FAQS` in `src/app/services/page.tsx`) — FAQs are the single best way to absorb long-tail here. |

### `/sectors` — Sectors

| Role | Keyword |
|---|---|
| **Primary** | investment opportunities in Africa |
| Secondary | agribusiness investment Africa; mining investment Africa; energy investment Africa; infrastructure investment Africa; ICT investment Africa; healthcare investment Africa; logistics investment Africa |
| Long-tail | where to invest in Africa 2026; Africa sector analysis; investment opportunities in Cameroon; Africa FDI by sector |
| Note | "2026" is a recurring seasonal term. Refresh the year in the title and in one on-page sentence each January. |

### `/insights` — Insights

| Role | Keyword |
|---|---|
| **Primary** | Africa trade and investment insights |
| Secondary | AfCFTA; doing business in Africa; Africa market analysis; export opportunities Africa |
| Long-tail | what is the AfCFTA; AfCFTA rules of origin; how to export from Africa; Africa trade statistics; ZLECAf for businesses |
| Note | This is your highest-leverage long-term page — it is the only one that can rank for informational queries with real volume. It is currently empty (no published articles). Publishing here matters more than any metadata change. |

### `/about` — About

| Role | Keyword |
|---|---|
| **Primary** | trade and investment advisors in Cameroon |
| Secondary | commercial diplomacy; market access advisor; US Embassy commercial specialist; Yaoundé business advisor |
| Long-tail | trade advisor Yaoundé; who can help me export from Cameroon; investment advisor Cameroon; ex-embassy trade consultant |
| Note | The founder's 22 years at the **U.S. Embassy's Commercial Specialist** role is a genuine differentiator and almost nobody in this market can claim it. Say it in the title-adjacent copy, not buried. |

### `/contact` — Contact

| Role | Keyword |
|---|---|
| **Primary** | contact trade and investment advisor Cameroon |
| Secondary | talk to an Africa market entry advisor; Cameroon business advisor contact |
| Long-tail | find an export advisor in Cameroon; book a market entry consultation; contact advisory firm Yaoundé |
| Note | This page should not chase traffic — it should convert the traffic the other pages bring. Brand + phone + "Cameroon" is the whole job. |

### `/start-a-conversation` — Conversion

| Role | Keyword |
|---|---|
| **Primary** | Africa market entry consultation |
| Secondary | free initial consultation; investment advisory enquiry |
| Long-tail | get advice on entering the African market; talk to an investment advisor |
| Note | Deliberately no brand in the title — this page targets the generic consultation intent. |

### Legal pages

No keyword targeting. `Terms`, `Privacy Policy` and `Cookie Policy` are indexed
for trust signals, not for traffic. Leave the titles alone.

---

## French keyword map

Same structure. Note that the French market uses different vocabulary for the
same concepts — translating English keywords literally is the classic mistake.

| Page | Rôle | Mot-clé principal | Secondaires | Long-tail |
|---|---|---|---|---|
| `/fr` | **Primary** | conseil en commerce et investissement en Afrique | entrée de marché Afrique; promotion des exportations; mise en relation entreprises Afrique | conseil en commerce international Cameroun; accompagnement export Cameroun; conseil entrée de marché Afrique |
| `/fr/services` | **Primary** | services de conseil en commerce | mise en relation B2B Afrique; promotion des exportations; intelligence économique; conseil aux investisseurs; formation professionnelle | promotion à l'export Cameroun; mettre en relation un partenaire africain; étude de marché Afrique; trouver un distributeur en Afrique |
| `/fr/sectors` | **Primary** | opportunités d'investissement en Afrique | investissement agro-industrie; investissement minier Afrique; énergie et renouvelables Afrique; infrastructures; TIC; santé; logistique | investir en Afrique 2026; opportunités d'investissement Cameroun; investissement de la diaspora en Afrique; où investir en Afrique |
| `/fr/insights` | **Primary** | analyses commerce et investissement en Afrique | ZLECAf; faire des affaires en Afrique; règles d'origine; marché africain | comprendre la ZLECAf; règles d'origine ZLECAf; comment exporter depuis le Cameroun; commerce intra-africain |
| `/fr/about` | **Primary** | conseillers en commerce et investissement au Cameroun | diplomatie économique; conseiller Yaoundé; ancien spécialiste commercial ambassade | conseiller commercial Yaoundé; qui peut m'aider à exporter; conseil en investissement Cameroun |
| `/fr/contact` | **Primary** | contacter un conseiller en commerce au Cameroun | conseil export Cameroun; mise en relation professionnelle | trouver un conseiller export Cameroun; demander conseil entrée de marché |
| `/fr/start-a-conversation` | **Primary** | accompagnement entrée de marché en Afrique | consultation investissement; étude de projet Afrique | être conseillé pour entrer sur le marché africain; parler à un conseiller en investissement |

### French vocabulary — do not translate literally

| English | Wrong French | Right French | Why |
|---|---|---|---|
| matchmaking | *matchmaking* | **mise en relation** | "Matchmaking" is an anglicism nobody in Cameroon uses |
| market entry | *entrée sur le marché* (acceptable) | **entrée de marché** | the established business term |
| market intelligence | *intelligence de marché* | **intelligence économique** | the term used by the institutions you deal with |
| export promotion | *promotion des exportations* | **promotion des exportations** / **accompagnement export** | both work; the second is what SMEs actually search |
| trade facilitation | *facilitation commerciale* | **facilitation des échanges** / **formalités de commerce** | "commerce" alone reads retail |
| know-how | *savoir-faire* | **expertise** / **accompagnement** | "savoir-faire" skews artisanal |
| AfCFTA | — | **ZLECAf** (or *ZLECAf* / *AfCFTA* both) | the acronym is what people actually type |

---

## Sector keyword clusters

`SECTORS` in `src/lib/content.ts` lists ten sectors. Each one is a keyword
cluster you can target from the `/sectors` page and from future insight
articles. This is where long-tail volume actually lives — "investissement
minier en Afrique" is a real query with real volume; "investment opportunities
in Africa by sector" is not how anyone searches.

| Sector (`content.ts`) | English cluster | French cluster |
|---|---|---|
| Agribusiness | agribusiness investment Africa; cocoa export; agriculture value chain Africa | investissement agro-industrie; exportation cacao; chaîne de valeur agricole |
| Mining | mining investment Africa; critical minerals Africa; copper cobalt Cameroon | investissement minier; minerais critiques; cuivre et cobalt Cameroun |
| Energy | energy investment Africa; renewables Africa; power infrastructure Cameroon | investissement énergétique; énergies renouvelables Cameroun; hydroélectricité |
| Infrastructure | infrastructure investment Africa; construction PPP Africa; transport corridors | investissement infrastructure; partenariats public-privé; corridors de transport |
| ICT | ICT investment Africa; fintech Africa; technology partnerships Africa | investissement TIC; fintech en Afrique; partenariats technologiques |
| Healthcare | healthcare investment Africa; medical equipment Africa; health investment Cameroon | investissement santé; matériel médical Afrique; hôpitaux et cliniques Cameroun |
| Logistics | logistics investment Africa; trade corridors; freight Africa; Douala port | investissement logistique; corridors commerciaux; port de Douala-Bonabéri; fret Afrique |
| Manufacturing | manufacturing investment Africa; local production Africa; value addition | investissement industriel; production locale; transformation locale |
| Education | education investment Africa; capacity building Africa; training programmes | investissement éducation; renforcement des capacités; programmes de formation |
| Professional Services | legal and financial services Africa; cross-border advisory Africa | services juridiques et financiers Afrique; conseil transfrontalier |

---

## Placement rules

This is where the keywords have to live to count.

1. **Title tag** — one primary keyword, natural phrasing, ≤ 60 characters.
   Google truncates around 580px. Brand last, after a `|`.
2. **Meta description** — 140–160 characters. It is not a ranking factor, but it
   is the click-through rate lever, so it must contain the primary term and a
   reason to click.
3. **H1** — one per page, and it should be close to the title keyword without
   being a copy of it.
4. **H2/H3** — carry the secondary terms. This is normal, natural topical
   coverage, not stuffing.
5. **Internal anchor text** — the link text matters. `Insights` is weak;
   `market intelligence on African trade` is strong. Use descriptive anchors for
   the money pages.
6. **Structured data** — already implemented (`src/lib/seo.ts`):
   `ProfessionalService`, `WebSite`, `ServiceCatalog`, `BreadcrumbList`,
   `Article`, `FAQPage`. Verify with Google's Rich Results Test after any change.
7. **Image alt text** — descriptive, keyword-bearing, never stuffed.

## Length targets

| Element | Target | Hard limit |
|---|---|---|
| Title tag | 50–60 chars | 65 |
| Meta description | 140–160 chars | 175 |
| H1 | 50–70 chars | 90 |
| URL slug | short, lowercase, hyphenated, no stop words | 4 words |

## What we deliberately do **not** do

- **No keyword stuffing.** Repeating a term unnaturally gets a page suppressed,
  not promoted.
- **No `<meta name="keywords">`.** See the top of this document.
- **No keyword in every H2.** If it reads badly to a human, it reads badly to
  Google too.
- **No doorway pages.** One page per intent. Do not build `/market-entry-africa`
  and `/africa-market-entry` as duplicates.
- **No cloaking, no hidden text**, and no location pages for cities the firm
  does not actually serve.

## What actually moves the needle, in priority order

Honest ranking of SEO work for this specific site:

1. **Publish insight articles.** `/insights` is the only page that can rank for
   informational queries, and it is currently empty. Everything else is
   second-order. This is the single biggest available win.
2. **Earn links / build presence.** Local business listings, the Cameroon
   Chamber of Commerce, CEEAC/CEMAC and AfCFTA directories, diaspora
   investment networks. Authority is the hard part; metadata is not.
3. **Fill out Google Business Profile** if the firm serves walk-ins/clients in
   the Yaoundé office. This drives local pack results.
4. **Keep titles and descriptions current** — including refreshing "2026" each
   January on `/sectors`.
5. **Improve Core Web Vitals.** `Largest Contentful Paint` on mobile.
6. **Internal linking.** Link to `/services` and `/sectors` with descriptive
   anchor text from the high-traffic pages.
7. **Metadata.** Done, and now keyword-targeted. Small but free.

## Maintenance

- Review this document each January (year-fresh terms) and after any new service
  or sector is added.
- Re-check Search Console quarterly: queries with impressions but no clicks mean
  the title is wrong; clicks with no impressions mean nobody is searching for it.
- If a keyword in here has no page targeting it, that is a content gap — note it,
  and decide whether to write the article or drop the keyword.