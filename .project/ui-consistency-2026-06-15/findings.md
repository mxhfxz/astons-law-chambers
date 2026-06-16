# UI Consistency Audit — 2026-06-15 (post hero Step 1/2)

Method: structural grep across all 18 `content/sections/*.html` + full-page screenshots at 1440px
(about, fees, legal-aid, police-station, practice-areas, contact, guide-first). Measured against the
canonical UI model in `.project/ui-model/`.

## CONSISTENT already (the shared design language holds)
- Hero: dark `.hero-split`, image right, H1 (uniform 52px clamp) + line + CTA + BSB. Equal 500px band.
- Body grid: `grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16` — 10 instances, byte-identical.
- Main column: `lg:col-span-2 space-y-12` (fees uses `mt-12` per heading = same gap; Body.md says equivalent).
- Section headings: `text-3xl font-semibold tracking-tight2` site-wide.
- FinalStrip: identical markup + `py-16 md:py-24`; present on all content pages.
- TL;DR / callout blocks: all use `border-l-2 border-navy-950 bg-offwhite pl-5 pr-4 py-4` (legal-aid,
  authorised, fees) — consistent visual.
- Aside card visual: `bg-offwhite border border-grey-300 rounded p-6` everywhere.
- Buttons, colours, `max-w-wide`, body text `text-navy-700` — consistent.

## DEFECTS to fix (structural, low-risk)
### D1 — police-station aside sticky offset is wrong (HIGH; real bug)
police-station right column = `space-y-6 lg:sticky lg:top-28 self-start` (top:7rem). Every other aside
uses `.pa-aside` (sticky top:8.5rem = navbar 7.5rem + 1rem gap). At 7rem the police aside tucks BEHIND
the 7.5rem sticky navbar on scroll. → swap to `.pa-aside`.

### D2 — legal/utility body bottom padding diverges (LOW)
complaints / privacy-policy / terms-of-engagement body = `pb-20 md:pb-28`. Canonical content-page body
bottom = `pb-20` (from `py-16 md:py-20`). → align to `pb-16 md:pb-20` (these are pb-only by design;
ArticleHeader supplies the top spacing — keep that, only normalise the bottom).

## INTENTIONAL variation (NOT defects — leave unless user directs)
- Body-top blocks: some pages carry a TL;DR/callout right after the hero (legal-aid, authorised, fees),
  others go straight to sections (about) or a plain intro (practice-areas, direct-access). Content-driven
  (AEO TL;DR, VAT/legal-aid notice). All styled identically; only presence differs.
- Aside CONTENT differs (ContactAside / PracticeAside / none) — F6, user-accepted; visual language identical.
- guides (guide-first/voluntary): 3-col grid, no aside → empty right third. Text width matches other pages'
  main column; acceptable. (Option if wanted: single-column article, or add ContactAside.)
- home: landing-page section rhythm differs by design.
- Compliance pages (complaints/privacy/terms/timescales): light ArticleHeader by decision (user: "except compliance").

## OPEN (needs user) — hero height true-equality
min-height:500px = equal at ≥~1280px; the two long guide-question H1s grow at the 1024–1200px edge.
TRUE fixed-equal needs those 2 guide H1s shortened (copy — user's words). Else the floor stands.

---
## RESOLVED (2026-06-15) — all fixed + verified (build ✓, type-check ✓, browser 1280/1440)
- **D1** police-station aside → `.pa-aside` (sticky top 136px / 8.5rem; was tucking behind navbar). ✓
- **D2** complaints/privacy/terms/timescales body bottom `pb-20 md:pb-28` → `pb-16 md:pb-20` (canonical). ✓
- **Home hero buttons** `btn-xl` + mixed widths → `btn-lg btn-full` (matches all 12 other heroes). Band still 500px. ✓
- **Home hero BSB link** `mt-8 text-sm`/`text-white`/new-tab → standard `mt-4 text-xs text-navy-100/80` styling. ✓
- Confirmed uniform: hero line class (12×), hero BSB line (12×+home), all hero CTAs btn-lg btn-full,
  final strips (btn-xl primary + btn-lg secondaries) on all 13, body grid/main-col/headings identical.
- Hero equal-height: 500px on every page at ≥1280px (verified). Long guide H1s only grow at 1024–1200px edge.

## Still OPEN (needs user decision — not defects)
- Hero TRUE-equal at the 1024–1200 edge needs the 2 long guide H1s shortened (copy → user).
- Content-driven body-top blocks (TL;DR/callouts) + aside content vary by page purpose (intentional, F6).
- guides empty right third (3-col grid, no aside): leave / single-column / add ContactAside?

---
## PASS 2 (2026-06-15) — user caught: H1 weight + Insights. Full app/ sweep done.
CORRECTION to PASS 1: guides are NOT empty-right — they have a sticky `<div>` aside (my `<aside>`
grep missed it). That aside used the wrong `lg:top-28` offset (now fixed). 

Anti-pattern sweep across content/ + app/ + lib/ — ALL fixed + verified (type-check/lint/build ✓, browser):
- **Hero H1 weight**: home was `font-bold`; all others `font-semibold`. → home `font-semibold` + `tracking-tight2`.
  Confirmed all 15 fluid-h1 heroes now font-semibold (weight 600).
- **Insights hub + article** (`app/insights/page.tsx`, `app/insights/[slug]/page.tsx`): were the OLD single-
  column dark header with eyebrow + breadcrumb + `mt-3` h1, no image, no BSB. → converted both to the
  `.hero-split` 2-col pattern (image right, eyebrow/breadcrumb removed, h1 flush, BSB added). 500px band,
  weight 600, image fills — verified.
- **Wrong aside sticky offset `lg:top-28`** (tucks behind 7.5rem navbar) found in 4 MORE places →
  all → `.pa-aside` (sticky top 136px): home (col-span-4 aside), guide-first, guide-voluntary, insights article.
  (police-station was fixed in PASS 1.) `.pa-aside` is now the ONLY hero/body sticky-aside mechanism site-wide.

RESULT: every dark hero across the whole app (content/sections + app/insights) is `.hero-split` 2-col,
equal 500px band, uniform font-semibold H1, eyebrow/breadcrumb-free, BSB link, canonical `.pa-aside`.

---
## PASS 3 (2026-06-15) — spacing / gutters / margins. User kept the 500px equal hero (centered).
Root cause of the "different gap on every page": fixed 500px hero + centered content → variable empty
space below shorter heroes' text. User chose to KEEP equal height, so the fix = make the band→content
gap (and all body rhythm) uniform; the centering whitespace is accepted as part of the equal-height look.

Fixed + verified (type-check/build ✓, browser 1440 — band→content padding-top = 80px on every page):
- **fees**: had two stacked body containers; intro block was `md:pt-16` (64px). → intro `py-16 md:py-20`,
  grid `pb-16 md:pb-20` (top removed) → uniform 80px rhythm (hero→intro, intro→grid, grid→end all 80px).
- **home**: first section after hero `py-12 md:py-16` (64px) → `py-16 md:py-20` (80px).
- **Inter-paragraph rhythm**: guides + police-station used `mt-4` between body paragraphs (vs the canonical
  `mt-3` on about/fees/legal). → all body para→para now `mt-3`. (List-adjacent `mt-4` left as-is — it's the
  uniform para↔list gap across the majority of pages.) pa-detail `situation` para also `max-w-3xl`→`max-w-prose`.

CANONICAL SPACING (styleguide) — now holds site-wide:
- Body container after hero: `max-w-wide mx-auto px-6 py-16 md:py-20` (80px top = the hero→content gap).
- Grid gutters `gap-10 lg:gap-16`; main col `space-y-12`; heading→para & para→para `mt-3`; para↔list `mt-4`.
- Cards: aside `p-6`, body/feature cards `p-6 md:p-8` (two deliberate sizes). Legal pages: `space-y-8` prose,
  `pb-16 md:pb-20` (ArticleHeader supplies top) — separate tier (light header), intentionally.

---
## PASS 4 (2026-06-15) — home police-custody card removed (user)
Removed the grey "If someone is in police custody" card (eyebrow "POLICE STATION — 24/7", red
Call CTA, "How attendance works →") from `home.html`, incl. its comment block. The following
"What to do now" section became first after the hero → given `py-16 md:py-20` so the 80px
hero→content gap holds. Verified: card gone, gap 80px, build ✓.
