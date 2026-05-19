# SEO Audit — Astons Law Chambers — 2026-05-19

Deep audit after the keyword + performance work this session. Scope: schema,
meta tags, technical SEO, on-page, AEO/GEO. Skills: seo-audit, seo-technical,
schema-markup, seo-meta-optimizer, seo-geo, seo-keyword-strategist.

## Executive summary

The site is in good technical shape. Core Web Vitals are excellent
(desktop 100, mobile ~99 after this session's work), HTTPS is enforced,
canonicals and 301 redirects are comprehensive, every page has exactly one
H1, the sitemap is clean, and the homepage carries solid Organization /
LegalService / Person / WebSite schema. Content renders server-side, so
Google and AI crawlers see it without running JavaScript.

The gaps are not blockers — they are missed opportunities. The biggest
on-site wins: under-used title tags, no `llms.txt`, breadcrumb + service
schema only partly deployed. The biggest off-site constraint (backlinks /
brand mentions) is client-owned and outside the codebase.

## Already strong — do not touch

- Core Web Vitals: desktop 100, mobile ~99. CLS ~0.
- HTTPS enforced; clean, hyphenated, lowercase URLs; `trailingSlash: false`
  so canonicals (`/about`) match served URLs — no slash mismatch.
- Comprehensive 301 redirects for every legacy URL and removed practice area.
- `robots.txt`: allows Googlebot + the AI search crawlers (GPTBot,
  OAI-SearchBot, ClaudeBot, PerplexityBot via `*`), blocks Google-Extended
  and Bytespider (training). Sitemap referenced.
- `sitemap.xml`: all 18 routes, `lastmod` tracks real file mtimes.
- One H1 per page on all 13 sections.
- Homepage JSON-LD `@graph`: LegalService+LocalBusiness, Person, WebSite.
- Practice-area detail pages: FAQPage + BreadcrumbList JSON-LD.
- Open Graph + Twitter card + favicons + web manifest all present.
- Static SSR — content is in the initial HTML (AI crawlers don't run JS).

## Findings

### HIGH priority

**H1 — Under-used title tags.** Impact: High (ranking coverage + CTR).
Several `<title>` tags waste the 50–60 char budget:
- `/fees` → "Barrister Fees" (~36 chars w/ brand)
- `/contact` → "Contact" (~29)
- `/timescales` → "Timescales"
- `/about` → "About"
- `/practice-areas` → "Criminal Defence Services" (generic)
Fix — rewrite to use the budget and carry keywords + location:
- Fees → `Barrister Fees & Legal Aid — London`
- Contact → `Contact a Criminal Defence Barrister — London`
- Timescales → `Criminal Case Timescales — England & Wales`
- About → `About Astons Law Chambers — Criminal Defence, London`
- /practice-areas → `Criminal Defence Barristers in London`
All in `app/*/page.tsx` metadata. Low-risk, no layout impact.

**H2 — `llms.txt` missing.** Impact: High for AEO. No `/llms.txt` to guide
AI crawlers (ChatGPT, Perplexity, Claude) to the key pages. Fix: add
`public/llms.txt` listing the site, practice areas, contact, fees, and the
key facts (barrister, Direct Access, 24/7 police station, London).

**H3 — BreadcrumbList schema only on practice-area pages.** Impact: High
(SERP breadcrumb display). `/fees`, `/about`, `/direct-access`,
`/police-station-representation`, `/complaints`, `/timescales` etc. all show
a visual "Home / X" breadcrumb but emit no BreadcrumbList JSON-LD, so Google
can't render the breadcrumb trail in their result. Fix: emit BreadcrumbList
on every deep page (a shared helper in `lib/`).

**H4 — No per-practice-area Service schema.** Impact: Medium-High (topical /
entity strength). PA detail pages carry FAQPage + Breadcrumb but nothing
describing the practice area itself as a service. Fix: add a `Service`
(or `LegalService`) node per PA page — `name` = area title, `serviceType`,
`provider` = the org `@id`, `areaServed` = London/England & Wales.

### MEDIUM priority

**M1 — Person schema has no `sameAs`.** The `Person` (Ghulam Humayun) node
has no entity links. The Organization node has `sameAs` (LinkedIn,
Trustpilot, share.google) but the Person doesn't. Entity linking is a
direct AI-visibility signal (seo-geo). Fix: add `sameAs` to the Person node
(LinkedIn profile, BSB Barristers' Register entry if linkable).

**M2 — police-station page FAQ block has no schema.** `police-station.html`
has a visible "Common questions" `<dl>` (4 Q&As) with no FAQPage JSON-LD.
Fix: emit FAQPage for it. Note: Google restricted FAQ rich results to
gov/health sites in 2023 — this will NOT show FAQ snippets in Google, but
Bing and AI engines still parse it. Worth doing, modest value.

**M3 — Homepage `<title>` is brand-first.** Currently
`Astons Law Chambers — Criminal Defence Barrister, London`. Keyword-first
(`Criminal Defence Barrister in London — Astons Law Chambers`) usually wins
CTR on non-brand queries, which is where new visitors come from. A choice,
not a defect — flag to the user.

**M4 — IndexNow not implemented.** Faster indexing on Bing / Yandex / Naver.
Optional; low effort (a key file + ping on deploy).

**M5 — Practice-area H2s are generic.** "What Astons Law Chambers does",
"Process" — not keyword- or question-bearing. Question-style H2s ("What
happens at a police station interview?") help AEO passage extraction.
Low-risk copy change; keep within barrister voice.

### LOW / NOTE

**L1 — aggregateRating (review stars).** The single biggest CTR lever in a
SERP is star ratings, via `aggregateRating` on the LegalService node. Only
valid with genuine, verifiable reviews. 🚩 Project rule: review widgets only
with 20+ verified reviews — CONFIRM the Trustpilot review count with the
client before adding. Do not fabricate.

**L2 — FAQPage on PA pages won't show Google rich results.** Expected, not a
bug (2023 restriction). Keep the schema; it still helps Bing + AI.

## Off-site / client-owned (not code)

- **Backlinks** — profile is near-empty; the dominant ranking constraint.
- **Brand mentions** — per seo-geo (Ahrefs Dec 2025), brand mentions on
  Reddit / YouTube / Wikipedia / LinkedIn correlate ~3× more strongly with
  AI-search citations than backlinks. A marketing task.
- **Google Search Console + Bing Webmaster Tools** — confirm the property is
  verified and the sitemap submitted; monitor Coverage + CWV.
- **Google Business Profile** — for "criminal defence barrister London" the
  local pack matters; confirm a GBP exists and is optimised (NAP matches the
  site: 85 Great Portland Street, W1W 7LT).

## Content / AEO opportunity

The two pending arrest PDF guides: publishing them as **HTML pages** (with
Article schema, an author, and published/updated dates) — not only as PDFs —
creates indexable, AI-citable content. HTML articles with self-contained
134–167-word answer blocks are far more citable than PDFs. This is the
single biggest content lever for both Google and AI search.

## Prioritised action plan

1. **Code, quick wins (this can ship now):** rewrite the short title tags
   (H1); add `public/llms.txt` (H2); add BreadcrumbList to deep pages (H3).
2. **Code, medium:** per-PA Service schema (H4); Person `sameAs` (M1);
   police-station FAQPage (M2).
3. **Decisions for the user:** homepage title brand-first vs keyword-first
   (M3); aggregateRating — needs the client's verified review count (L1).
4. **Client / marketing:** backlinks, brand mentions, GSC/Bing, GBP.
5. **Content:** publish the arrest guides as HTML articles when approved.
