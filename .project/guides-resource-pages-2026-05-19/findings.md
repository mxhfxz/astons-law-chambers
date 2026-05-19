# Findings — hero-colour consistency fix + full-site audit

**Date:** 2026-05-19 (follow-up to the guides build)
**Skills routed:** systematic-debugging → frontend-dev-guidelines → verification-before-completion → finishing-a-development-branch

Running notes so decisions stay consistent and are not made in a silo.

---

## Issue reported

Homepage hero uses the "duller blue"; other dark-hero pages use the "deeper
blue". User confirms the **duller blue is the wanted brand colour**. Major
branding inconsistency.

## Phase 1 — root cause (systematic-debugging)

Two dark tones in the design system:
- `bg-footer` = `#232536` — desaturated dark slate (the **duller** one, wanted)
- `bg-navy-950` = `#0E1628` — deep royal navy (the **deeper** one)

Hero-background map (evidence: grepped every `content/sections/*.html`):

| Hero | Pages |
|------|-------|
| `bg-footer` (correct) | `/` homepage only |
| `bg-navy-950` (wrong) | `/police-station-representation`, `/guides`, `/guides/first-24-hours-after-arrest`, `/guides/do-i-need-a-lawyer-at-a-voluntary-police-interview` |
| white hero (not affected) | practice-areas hub + all PA detail pages, about, fees, contact, direct-access, complaints, timescales, privacy-policy, terms-of-engagement, 404 |

**Root cause:** hero markup is hand-duplicated per fragment — no shared hero
component/token. Commit `4aad5af` ("Soften hero background to the footer
colour") changed **only** `home.html`. `police-station.html` was never
updated. The 2026-05-19 guides build copied `police-station.html`'s stale
`bg-navy-950` hero into 3 new pages, propagating it.

Structural root cause = the duplication. Not refactoring it now (15 fragments,
separate user-approved task); instead: correct the 4 divs + record the
canonical rule so new heroes use it.

## Decision

- **Canonical dark-hero background = `bg-footer` (#232536).**
- `bg-navy-950` stays the **mid-page emphasis-band** colour (the homepage
  itself pairs a `bg-footer` hero with `bg-navy-950` emphasis bands — that
  pairing is the established pattern and is kept).
- Fix = swap `bg-navy-950 text-white` → `bg-footer text-white` on 4 hero
  wrapper divs only. `text-white` kept (the `<h1>` inherits it).
  `bg-footer`+`text-white` is already proven together in `footer.html`.
- Guide mid-article dark bands left as `bg-navy-950` — changing them would
  create a *new* inconsistency vs the homepage.

## Actions log

- ✓ Fixed 4 hero divs: `bg-navy-950 text-white` → `bg-footer text-white`
  (police-station.html, guides-index.html, guide-first-24-hours.html,
  guide-voluntary-interview.html). `text-white` kept — `<h1>` inherits it.
- ✓ `rm -rf .next && npm run build` — clean, 26/26 static pages.
- ✓ `npm run type-check` — clean.
- ✓ Contrast: heroes use `text-navy-100/80` + `/90` on `bg-footer` — the
  exact tokens the homepage hero already uses (AA-verified in commit
  `4aad5af`). My heroes use a stricter subset (no `/70`). AA holds (~8:1).
- ✓ Browser check: home, police-station, guides hub, both guide articles —
  all heroes now render the same `#232536`. Confirmed visually.

## Full-site audit results

Walked every route at the production build (localhost:3100), checked render
+ console errors:

| Route | Render | Console |
|-------|--------|---------|
| `/` | ok — hero `bg-footer`, situation cards link to guides | clean |
| `/police-station-representation` | ok — hero fixed, Guides aside box ok | clean |
| `/guides` | ok — hero fixed | clean |
| `/guides/first-24-hours-after-arrest` | ok — hero fixed | clean |
| `/guides/do-i-need-a-lawyer-at-a-voluntary-police-interview` | ok — hero fixed | clean |
| `/practice-areas` | ok — white hero | clean |
| `/practice-areas/criminal-defence` | ok — white hero | clean |
| `/fees` `/about` `/contact` `/direct-access` | ok | clean |
| `/complaints` `/timescales` `/privacy-policy` `/terms-of-engagement` | ok | clean |
| 404 (any bad URL) | ok | only the expected HTTP-404 document status |

**No breakage found. No console errors site-wide.** Footer "Guides" link
renders on every page; police-station Guides aside box renders; homepage
situation-card guide links render.

### Observations — pre-existing, by design, NOT changed

1. **Two hero archetypes.** Dark heroes (`bg-footer`) on the conversion /
   crisis pages — home, police-station, guides. White heroes on the
   practice-area pages + all info/compliance pages. This is a deliberate
   pre-existing split, not the reported issue and not introduced this
   session — left as-is.
2. **`bg-navy-950` is the emphasis-band colour.** Used for mid-page dark
   bands (home "how instruction works", guide mid-article CTAs, pa-detail
   police banner, 404 aside). Consistent. Correct that it stays — the
   homepage itself pairs a `bg-footer` hero with `bg-navy-950` bands.
3. **404 "Looking for something specific?" list** predates the guides and
   does not list Guides. Optional future addition — not a bug, not changed
   unprompted.

## Canonical rule (recorded to memory)

Dark page heroes use **`bg-footer` (#232536)**. `bg-navy-950` (#0E1628) is
the mid-page emphasis-band colour only. Any new dark hero must use
`bg-footer text-white`.
