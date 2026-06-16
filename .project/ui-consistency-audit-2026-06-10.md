# UI Consistency Audit — astonslaw.com (2026-06-10)

**Read-only audit. No files changed. Findings only — each needs a user decision before any fix.**
Method: structural grep across all 18 `content/sections/*.html` page templates + browser
spot-checks (about, fees, legal-aid). Measured against the site's already-decided patterns
(PA-page / pa-detail canonical). Severity = how much it breaks the "one design language" goal.

## Page inventory (header + container + aside + closing CTA)

| Page | Header | Body top pad | Section h2 | Aside | Final strip |
|------|--------|--------------|-----------|-------|-------------|
| home | dark hero | mixed (landing) | 3xl | — | ✓ |
| about | dark hero | ✓ py-16/20 | 3xl | light card | ✓ |
| contact | dark hero (no CTA) | ✓ | 2xl | channel cards | ✗ |
| fees | dark hero | ✓ | 3xl | light card | ✓ |
| direct-access | dark hero | ✓ | 3xl | light card | ✓ |
| practice-areas | dark hero | ✗ pb-only | (cards) | — | ✓ |
| guides-index | dark hero | ✓ | (cards) | — | ✓ |
| guide-first-24-hours | dark hero | ✓ | 2xl | — | ✗ |
| guide-voluntary-interview | dark hero | ✓ | 2xl | — | ✗ |
| pa-detail (PA + sub) | dark hero | ✓ | 3xl | red box + light cards | ✓ |
| police-station | dark hero | ✓ | 2xl | red box + light cards | ✓ |
| authorised-to-conduct-litigation | **light header** | ✓ | 3xl | light card | ✓ |
| legal-aid | **light header** | ✓ | 3xl | light card | ✓ |
| complaints | light header | ✗ pb-only | 2xl | — | ✗ |
| privacy-policy | light header | ✗ pb-only | 2xl | — | ✗ |
| terms-of-engagement | light header | ✗ pb-only | 2xl | — | ✗ |
| timescales | light header | mixed | 2xl | — | ✓ |

## Findings

### F1 — Two header treatments for the same page tier (HIGH)
Informational pages split between **dark hero-split** (about, fees, direct-access) and the
**light article header** (authorised-to-conduct-litigation, legal-aid). Same content tier,
two different headers — this is the single biggest "feels like a different page" driver.
Legal/utility pages (complaints, privacy, terms, timescales) also use the light header.
**Decision needed:** which header does each tier get? (e.g. all conversion/info pages →
dark hero; legal text → light header.)

### F2 — Section-heading scale is split 3xl vs 2xl (MEDIUM)
- `text-3xl`: pa-detail (PA+sub), about, fees, direct-access, legal-aid, authorised, not-found
- `text-2xl`: **police-station** (the reference page), both guides, complaints, privacy, terms, timescales

The two most-polished pages disagree: **pa-detail = 3xl, police-station = 2xl**. The 6 info
pages were aligned to pa-detail (3xl) earlier this session, so they now match pa-detail but
not police-station. **Decision needed:** pick the canonical section-heading size, then make
police-station + guides match (or revert the info pages to 2xl).

### F3 — Missing body top padding (MEDIUM)
`practice-areas` uses `pb-20 md:pb-28` (no top padding) after its dark hero, so its card grid
jams under the hero — same defect that was fixed on the info pages. complaints/privacy/terms
also have body `pb`-only (less critical: their light header carries top spacing).
**practice-areas is a primary nav page** — most visible instance.

### F4 — Closing CTA strip is inconsistent (MEDIUM)
The "Speak to someone today" final strip is on most content pages but **absent on the two
guide articles** (guide-first-24-hours, guide-voluntary-interview) — they end on an inline
"Book a Free Consultation" instead. contact (is the contact page) and legal pages omit it,
which is defensible. The two guides are the odd ones out among content pages.

### F5 — contact hero has no CTA (LOW)
Every dark-hero page leads with a white "Book a Free Consultation" (police-station = "Call
Now", intentional) **except contact**, whose hero has no button (CTAs live in channel cards
below). Consistent-looking heroes, one without a primary action.

### F6 — Aside content varies (INFORMATIONAL — likely intentional)
Light contact card (about/fees/direct-access/legal-aid/authorised/not-found), red-box+cards
(pa-detail/police), channel cards (contact), none (guides, legal). All now share the **light
card visual language** post-alignment; the variation is contextual content, not a style break.
No action unless a single aside content model is wanted.

## What is already consistent (good)
- Dark hero-split structure + skyscraper image: uniform across all hero pages (no leftover
  decorative marks).
- Hero main CTA: white "Book a Free Consultation" everywhere except police-station (Call Now).
- Aside sticky behaviour: `.pa-aside` (1rem gap below navbar) site-wide.
- Final strip styling, button color system (navy/secondary/outline/red/white-on-dark),
  `max-w-wide` width, body text `text-navy-700`, breadcrumbs.

## Recommended decision order
1. F1: define which header (dark hero vs light) each page tier uses.
2. F2: pick the canonical section-heading size.
3. F3: practice-areas top padding.
4. F4: guides closing CTA.
5. F5: contact hero CTA.

---

## Resolution log (2026-06-10) — user directives

- **F2 — DONE.** Canonical section heading = `text-3xl`. Converted all 44 remaining
  `text-2xl font-semibold tracking-tight2` (police-station, both guides, contact, complaints,
  privacy-policy, terms, timescales) → `text-3xl`. Verified live (police-station: 0 left at 2xl).
- **F4 — DONE.** Added the standard FinalStrip (verbatim, page-specific `data-track`) to
  `guide-first-24-hours` and `guide-voluntary-interview`. Verified live.
- **F5 — DONE.** `contact` hero now has the standard CTA row: white "Book a Free Consultation"
  + outline "Call 07922 247 999" (`data-track-location="contact_hero"`). Verified white in browser.
- **F6 — explained** (see below). No change; the variation is contextual, not a defect.
- **F1 — DONE (2026-06-15).** Rule: dark Hero for conversion/content pages, ArticleHeader
  for legal/utility. Converted `authorised-to-conduct-litigation` + `legal-aid` to the dark
  hero; their TL;DR blockquote relocated to the body top (hero has no lead — see hero rule
  below). complaints/privacy/terms/timescales keep the ArticleHeader. Verified in browser.
- **F3 — DONE (2026-06-15).** `practice-areas` body `pb-20 md:pb-28` → `py-16 md:py-20`
  (was jamming under its hero; now 80px top padding). ArticleHeader legal pages left `pb`-only
  by design — their light header already supplies top spacing (adding body pt would double-gap).

### Hero clutter — HARD RULE (user, 2026-06-15)
"People do not think like robots. A UI-led site must not clutter the hero with paragraphs;
lay information out for humans, not machines." => Hero = eyebrow + h1 + CTA only. No lead /
summary / TL;DR paragraph in the hero; that copy lives in the body. Recorded in
`ui-object-model.md` (Hero class). Note: existing heroes still carry a `fluid-lead` line
(pre-dates this rule) — flagged there for the planned UI pass, not changed.

### Executive call (2026-06-10) — hero height
Non-homepage heroes: desktop `min-height` dropped to **40vh** (two-column retained). Homepage
keeps the full-height hero via a new `.hero-split-tall` modifier.
- Implementation: `app/preview-styles.css` `.hero-split` @≥1024px → `min-height: 40vh`; added
  `.hero-split-tall = clamp(540px,82vh,900px)`; `content/sections/home.html` hero carries
  `hero-split-tall`.
- **Note:** `min-height` is a floor. Measured contact hero = 568px (~71vh) because its content
  + the hero's `5rem` top/bottom padding exceed 40vh. A hard `height:40vh` would clip the
  h1/lead/buttons (contradicting "content visible"), so the floor approach is used. If a truer
  ~40vh is wanted, the lever is reducing `.hero-split-left` desktop padding (`5rem`) — a separate
  decision, not taken.

### F6 explained (aside content variation)
"Aside" = the right-hand sidebar that scrolls with the page. There are three *content* fillings,
all now sharing one *visual* language (light offwhite card, grey eyebrow, navy/outline buttons):
1. **ContactAside** — Call / WhatsApp / Book buttons (about, fees, direct-access, legal-aid,
   authorised, not-found).
2. **PracticeAside** — red "at a station now" box + Related areas + Guides (PA pages, police-station).
3. **None** — single-column pages (guides, legal pages) and contact (uses channel cards instead).
The point of F6: this is *fine*. The boxes look the same; only their contents differ by page
purpose — which is exactly the "one design language, differing by content" goal. No action needed
unless you want every page forced to the same aside content, which would remove useful context.

Full design system now captured as an object model in `ui-object-model.md`.
