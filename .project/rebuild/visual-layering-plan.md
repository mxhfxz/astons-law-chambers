# Plan: Visual Layering sub-phase (Phase 0.5)

**Parent**: rebuild
**Phase**: plan
**Started**: 2026-05-12
**Status**: awaiting re-decision sign-off before frontend-design skill engagement

## Why this sub-phase exists

Client review of [dist/preview.html](../../dist/preview.html) returned the verdict that the locked "brutally minimal" aesthetic feels soulless and will under-convert against more glossy competitors. Brief: add ~10–15% more engagement without losing the crisis-grade institutional core or the locked KPI (calls + WhatsApp).

This phase sits **between Phase 0** (design system foundation — built, not yet shipped) **and Phase 1** (foundation/conversion/compliance). It re-opens four design decisions that were locked on 2026-05-12 and adds three new components to the system. No copy or page work happens in this phase. No bundle is shipped until re-decisions are signed off.

## Inputs

- [aesthetic.md](aesthetic.md) — current locked direction
- [plan.md](plan.md) Phase 0 list — items 0.6 (component primitives), 0.7 (forbidden patterns) re-opened
- [src/tokens.css](../../src/tokens.css), [src/components.css](../../src/components.css), [dist/bundle.css](../../dist/bundle.css) — current build to amend
- Three deep-research reports — citation-grade evidence base (per [[research_reports_2026_05_12]])

## Constraints inherited (do not re-litigate)

- Phone + WhatsApp + cal.com only — no email funnels [[feedback_no_email_funnel]]
- No practitioner portrait, minimal name [[feedback_no_portrait_minimal_name]]
- GOV.UK plain-English register [[feedback_no_marketing_speak]] [[feedback_natural_voice]]
- KPI = calls + WhatsApp [[project_rebuild_goals]]
- Every departure from current locked direction flagged with reasoning [[feedback_callout_departures]]

## The seven asks — classified

Status legend: **GREEN** = research-supported, no conflict, scope-and-build. **YELLOW** = research-supported but conflicts with a current build artefact; needs reconciliation. **RED** = conflicts with a 2026-05-12 locked decision; needs explicit client re-decision before any work.

### 1. Add images — **RED**

**Conflict.** `aesthetic.md` line 65 forbids "Stock photography of any kind". `aesthetic.md` line 99 commits to "no mark, no monogram" and an imagery-free hero. The forbidden list does not, however, ban all imagery — only stock, gavels/scales, hero carousels, badge soup, decorative team photos.

**Research evidence (Visual Practices Finding 6, lines 129–143).** Three typed photography components are permitted: *practitioner-portrait* (excluded by client choice), *contextual-photography* (facility/situation), *editorial-image-card* (news/insight). Critically: "The legal sample mostly avoids photography of physical chambers buildings or interiors (the heritage-letterhead reflex of 'Inn of Court courtyard' or 'Georgian door' is largely absent), with the exception of the subtle texture overlay on Blackstone Chambers". Facility/context photography is appropriate where the physical facility is itself a credibility asset (medical clinics, hospitals) — which chambers and law firms are not.

**Implication.** Imagery on a chambers site is on a short leash. Options below are the research-defensible ones; anything outside this list (gavels, courthouses, stock people, AI-generated faces) is forbidden by the system.

**Options to surface to client:**
1. **Editorial-image-card only** — article cards on the (eventual) Insights/News section carry an image; pillar pages and homepage stay typographic-anchor. Cheapest, lowest risk, doesn't touch the hero.
2. **Editorial + a single contextual hero image on homepage** with overlay text (Freshfields/Bain pattern). Risk: this is the *firm* pattern, not the *chambers* pattern; the entire sixteen-site sample's chambers cohort avoided it.
3. **Subtle texture overlay** (Blackstone pattern) — a single low-opacity PNG behind sections, no chromatic shift, no photography. Adds atmosphere without committing to imagery.
4. **Custom architectural detail / line illustration** — a commissioned line drawing of the chambers entrance or interior detail, used once on homepage and once on about/contact. Highest production cost; no off-the-shelf option.
5. **Status quo — no imagery anywhere.**

### 2. Add an FAB (floating action button) — **YELLOW**

**Conflict.** Current build ships [src/components.css](../../src/components.css) `.sticky-emergency-bar` — a full-width bottom bar with phone + WhatsApp dual chip. Adding a FAB on top stacks two persistent contact elements on mobile, which violates the "one floating element" research norm and creates thumb-zone competition.

**Research evidence (Rapid Outreach UX §5.4, lines 233–242).** The two endorsed persistent-contact patterns are interchangeable: "sticky header CTA, *or* a floating WhatsApp/phone chip in the thumb zone". Either delivered +55% CTA clicks in the cited mobile test. Both are forbidden on the contact page itself. The line between "respectful sticky CTA" and "needy chat bot" is exactly the one to hold.

**Recommended scope.** Treat FAB and sticky-bar as **alternative implementations of the same pattern, not stackable additions**. Two viable shapes:
- **A.** Keep the sticky-emergency-bar as built (full-width, dual chip, ~56px) — already an FAB-equivalent always-on door. Add nothing.
- **B.** Replace the sticky-emergency-bar on mobile with a single thumb-zone FAB chip (phone OR WhatsApp), and leave the sticky bar as the desktop pattern. Trade-off: loses dual-channel parity on mobile (the user has to pick which channel surfaces).
- **C.** Keep the sticky bar but collapse it on scroll-down to a single corner chip (Mast supports `data-sticky-collapse`), expanding back to the dual chip on scroll-up. Compromise — keeps dual-channel parity, reduces visual footprint mid-page.

### 3. SVG block for the actual logo — **RED**

**Conflict.** `aesthetic.md` line 99 locks the wordmark as the entire visual identity: "ASTONS LAW CHAMBERS — single line, all caps, Plex Sans 600, tracked +80, brand-primary #0E1628. No mark, no monogram, no crest." User-confirmed 2026-05-12.

**Research evidence (Visual Practices Finding 1 + Finding 5).** Chambers in the sample are overwhelmingly wordmark-only (Blackstone, Matrix Chambers, Brick Court, 4 New Square). Marks/monograms appear in unified-brand firms (Linklaters' L, Pictet's monogram, Bain's red mark) — institutions where the brand is the unit of credibility rather than the individual. The "elite chambers" empirical pattern supports the wordmark-only lock; departing from it is a brand-positioning decision, not an aesthetic one.

**Open question to client.** Does an existing logo SVG asset exist anywhere (Webflow brand library, old design files, business cards, email signature, social profiles)? If yes, that changes the calculation — we'd be re-introducing an existing mark, not commissioning one. The verified_facts memory does not list any logo asset.

**Options to surface to client:**
1. **Keep wordmark-only.** Status quo. Empirically the chambers norm.
2. **Existing SVG already in hand** — share the file; we'll evaluate fit and scale slot (chrome / favicon / footer-only).
3. **Minimal monogram** — e.g., `ALC` or `A` in Plex Sans 700, set inside a thin square or framed by a single hairline rule. Used only at chrome scale (32px header / 16px favicon). Wordmark stays as the full-name treatment in hero/footer.
4. **Commissioned mark** — bespoke design work; out of Claude Code's scope, would need a designer. Highest cost.

### 4. More colour variation (light touch) — **RED**

**Conflict.** `aesthetic.md` line 24 locks "Two saturated colours separated by function. Zero third hue."

**Research evidence (Visual Practices Finding 2, lines 69–81).** "Every one of the sixteen sites operates with a functional palette of three to five distinct hues." Astons sits at the low end (2 saturated + 4 cool greys + white = 7 functional values, 2 saturated hues). Research headroom: up to 3 more functional hues, used at small scale, *never* for hero fills or decorative bands. Linklaters/Freshfields/Slaughter and May go in the opposite direction (no chromatic accent at all) — the elite range spans both extremes.

**Options to surface to client (compatible — can stack):**
1. **Cool interactive accent** — single link-state colour for `:link`, `:hover`, `:focus`. Recommend `#0F4C81` (Carbon blue 60) at 4.5:1 on white. Used only on text links, never on buttons or banners. Adds chromatic life to long-form pages.
2. **Tonal-step surfaces** (4 New Square pattern) — alternate `surface-primary` (white) with `surface-secondary` (`#F4F4F5`, already in tokens) for section banding. Already supported by `cc-secondary-surface` in components.css; just used more intentionally.
3. **Texture overlay** (Blackstone pattern) — see Option 1.3 above. Adds atmosphere without adding a hue. Costs one PNG asset, no chromatic shift.
4. **Warm accent in a single chrome slot** — e.g., a pale amber `#F5E6D3` strip in the regulator/disclosure footer band. Risky — research warns that warm tints render inconsistently and degrade trust signal.
5. **Status quo — two saturated hues, no addition.**

Recommend stacking 1 + 2 + 3 for max research alignment; reject 4 unless there's a brand reason.

### 5. Mega menu for legal services — **YELLOW**

**Conflict.** Current preview ships a flat top-nav with four items. `plan.md` item 0.6 lists "nav (wide-pattern for chambers, not lean-five)" as a design primitive but it isn't built yet. This is a green-field expansion, not a re-decision.

**Research evidence (Visual Practices Finding 5, lines 113–127).** Chambers run wide-nav (8–11 items); the lean-five-with-matrix-mega-menu is the unified-firm pattern. Mega-menu discipline (line 121): "maximum five column groups, seven to nine items per group, accessible keyboard navigation, a single hover delay token, and an explicit close affordance." For chambers specifically: "mega-menu pattern but not deeply nested". With ten practice areas, a shallow 2–3 column mega-menu under a single "Practice areas" parent is exactly the research-endorsed shape.

**Recommended structure** (subject to client preference on grouping):
- Parent nav item: **Practice areas**
- Mega-menu panel — 3 columns, all titles in Plex Sans 600 eyebrow style:
  - **Col 1 — Person offences:** Violent Offences · Sexual Offences · Drug Offences · Youth Crime · Theft & Robbery
  - **Col 2 — Financial offences:** Fraud & Financial Crime · Money Laundering & POCA
  - **Col 3 — Procedural & other:** Driving Offences · Appeals · Inquests
- Foot of panel: "Full practice list →" link to a hub page; phone + WhatsApp chip mirrored from sticky bar
- Mobile: panel becomes a vertical accordion under a hamburger (desktop hamburger forbidden per `aesthetic.md`; mobile hamburger permitted per Visual Practices line 125)

Alternative grouping: by procedural stage (Police station / Magistrates / Crown / Appeal / Inquest) — but this requires a 4–5 col layout that's tighter at desktop and harder to scan.

### 6. Top-nav CTA — Jakob's Law — **GREEN**

**Research evidence (Visual Practices line 123 + Rapid Outreach §5.4).** Matrix Chambers' "clerks-line-in-chrome" pattern places the 24-hour clerks phone number permanently in the global header. Rapid Outreach §5.4 endorses sticky header CTA as one of two persistent-contact patterns. This isn't even a departure — it's a research-positive addition.

**Build:**
- Right-aligned in top-nav: a single emergency-accent solid button reading **CALL 07922 247 999** at desktop ≥1024px
- Tablet 768–1023px: same button, no number truncation (Plex Sans 600 tabular figures); icon-only fallback only on viewports <420px
- Mobile <768px: hamburger drawer; in-drawer top item is the phone CTA (full-width). The sticky bottom-bar still surfaces the dual chip.
- The button is **not** the same component as the hero phone CTA; it's chrome, narrower (40–44px tall), and slightly less prominent so the hero CTA stays primary on the page.

### 7. Responsive optimisation (desktop/tablet/mobile) — **GREEN**

Already required by spec.md ("Mobile-first design: tap targets ≥48×48px, emergency CTAs 56–64px, content above the fold readable on a 390×844 viewport") and plan.md item 1.13. Current [dist/preview.html](../../dist/preview.html) uses inline `style=""` blocks and lacks media queries — it's a desktop snapshot only.

**Build:**
- Move all inline styles out of preview.html and into [src/components.css](../../src/components.css) as proper component classes
- Add three breakpoint tokens: `--bp-mobile: 390px`, `--bp-tablet: 768px`, `--bp-desktop: 1024px`
- Tablet adjustments: hero `<h1>` clamps from 64px to 48px; practice-areas grid 4-col → 2-col; mega-menu hides, drawer surfaces
- Mobile adjustments: hero clamps to 36px; practice-areas grid → 1-col; nav collapses; sticky-bar appears; FAB option (per ask #2) resolves here
- All emergency CTAs at 56–64px min-height across all breakpoints; tap-target rule on every interactive element
- `prefers-reduced-motion` disables sticky-bar entry animation

## Sequence

1. **Surface re-decisions** (asks 1, 3, 4, plus FAB reconciliation in 2) to client via `AskUserQuestion` — locked decisions only change via explicit client confirmation
2. **Update [aesthetic.md](aesthetic.md)** with the resolved direction and an explicit departure callout for any line that changes ([[feedback_callout_departures]])
3. **Engage frontend-design skill** with the locked direction in hand; produce token deltas + component specs for: top-nav CTA button, mega-menu panel, FAB/sticky reconciliation, optional logo mark, optional texture overlay, optional interactive accent colour, responsive breakpoints
4. **Amend the build** — update [src/tokens.css](../../src/tokens.css), [src/components.css](../../src/components.css), [src/site.js](../../src/site.js); regenerate [dist/bundle.css](../../dist/bundle.css), [dist/bundle.min.css](../../dist/bundle.min.css), [dist/site.min.js](../../dist/site.min.js); update [dist/preview.html](../../dist/preview.html) to a multi-breakpoint preview (desktop / tablet / mobile views)
5. **Visual review** — client opens preview.html and sanity-checks before push
6. **Push + tag** — bump to v1.2.0, push to GitHub main, verify jsDelivr resolves the pinned tag
7. **Update [webflow-injection.md](webflow-injection.md)** with any new Variable mappings (e.g., logo mark slot, interactive-accent colour, mega-menu interactions if not Mast-native)
8. **Resume Phase 1** as scheduled

## Open questions for client

- **Imagery scope** (ask 1) — which option from the five?
- **FAB reconciliation** (ask 2) — keep sticky bar A, replace with FAB B, or scroll-collapse hybrid C?
- **Logo asset** (ask 3) — does an existing SVG exist? If not, which path (wordmark-only / monogram / commissioned)?
- **Colour additions** (ask 4) — recommend stacking interactive-accent + tonal-step + texture; confirm?
- **Mega-menu grouping** (ask 5) — by offence type (recommended) or by procedural stage?
- **Out of scope confirmation** — copy / pages / Webflow injection do not move in this phase. Phase 1 resumes after sign-off.

## Validation

- [ ] All four RED items have explicit client sign-off recorded in [DECISION_LOG.md](../../DECISION_LOG.md)
- [ ] All departures from 2026-05-12 locked decisions flagged with reasoning per [[feedback_callout_departures]]
- [ ] Updated aesthetic.md remains internally consistent (no lingering "zero third hue" if hues added, etc.)
- [ ] No fabricated facts introduced via imagery or logo (no invented chambers heritage, no fake architectural claims)
- [ ] Mobile preview at 390×844 surfaces all five mandatory hero elements within one viewport
- [ ] Desktop preview shows mega-menu open-state with keyboard focus rings
- [ ] Sticky-bar / FAB hidden on /contact route per Rapid Outreach §5.4

## Blockers

- Awaiting client SVG logo file (will arrive separately)
- frontend-design skill not yet engaged — gated on re-decisions per user instruction (resolved below) and a final iteration round before we hand to design

## Locked re-decisions (2026-05-12, post-AskUserQuestion round)

1. **Imagery — editorial + contextual hero image.** Article cards carry images; homepage gets one contextual hero image with overlay text. Flag as departure: the entire chambers cohort in Visual Practices research avoided contextual hero imagery; this is a *firm-pattern* import. Hero image source TBD — must not be stock, must not feature gavels/scales/Inn courtyard/courthouse exterior/people. Architectural-detail and abstract-context options to be proposed by frontend-design.
2. **Logo — existing SVG.** Client has an existing logo asset and will share. Frontend-design holds until file received. Wordmark-only fallback remains valid if SVG turns out to be unusable.
3. **Colour — interactive accent + surgical tonal-step.** Add Carbon blue 60 (`#0F4C81`) as the link-state accent only (text links; never buttons/banners/hero fills). Tonal-step surfaces (`#F4F4F5`) used surgically to emphasise specific sections — never alternated. **New durable constraint:** [[feedback_no_alternating_banding]] — saved to memory. Texture overlay (Blackstone pattern) and warm-chrome-strip both rejected for this round.
4. **FAB — keep sticky bar as-is.** No second floating element. Current `.sticky-emergency-bar` is the FAB-equivalent. Hide on /contact route per Rapid Outreach §5.4.
5. **Mega-menu — by offence type, 3 columns.** Col 1 *Person offences* (Violent, Sexual, Drug, Youth, Theft) · Col 2 *Financial offences* (Fraud, POCA) · Col 3 *Procedural & other* (Driving, Appeals, Inquests). Foot of panel: "Full practice list →" + phone + WhatsApp chip.
6. **Top-nav CTA — locked as designed in section 6 above.** No re-decision needed.
7. **Responsive — locked as designed in section 7 above.** No re-decision needed.

## Departures from aesthetic.md (to flag explicitly when amending)

- **aesthetic.md line 24** "Two saturated colours separated by function. Zero third hue." → updated: two saturated brand hues + one cool interactive accent at link-state scale only.
- **aesthetic.md line 65 (forbidden list)** retains "stock photography of any kind"; expands the section to permit two typed image components (contextual-hero, editorial-card) within strict subject-matter constraints (no gavels, no scales, no Inn courtyard, no courthouse exterior, no people).
- **aesthetic.md line 99** "No mark, no monogram, no crest. The wordmark is the entire visual identity." → updated pending SVG receipt: wordmark + existing logo mark used together, mark at chrome scale (≤32px header), wordmark continues as the full-name treatment in hero/footer/regulator lines.
- **aesthetic.md (new line)** "Tonal-step section bands are surgical — 1–2 per page maximum, used for emphasis, never alternated." Cross-reference [[feedback_no_alternating_banding]].

## Iteration window

Before engaging frontend-design skill, surface this consolidated direction to the client for a final iteration pass — any further additions, removals, or refinements get layered in here, not after design begins.

## Iteration round 2 (2026-05-12, post-consolidated-direction)

### Motion — locked

- Hover transitions on every interactive element. Light-background buttons darken 10% on hover; dark-background buttons (navy fills) lighten 10% on hover. Tokenise as `--hover-darken: 0.1` and `--hover-lighten: 0.1`. Transition `~150ms ease-out`.
- State-change icons animate. Hamburger glyph morphs into a close cross on drawer-open. Mega-menu chevron rotates 180° on open. Accordion chevrons rotate 90°. All disclosure / collapse icons follow the same pattern.
- Arrow-bearing links (e.g., "Full practice list →", "How Direct Access works →") nudge the arrow 4px in the direction it faces on hover, on a `~120ms ease-out` transition. The link text does not move.
- The site should feel professionally tasteful, not cartoonish. No bounce easings, no overshoot, no scale-on-hover. The motion budget is reserved for state legibility and direction-of-action affordance.
- `prefers-reduced-motion` disables all decorative motion (arrow nudge, mega-menu icon rotation) while keeping state-essential changes (drawer open/close becomes instant, chevron flips without rotation).

### Red allocation — locked (red overuse on current preview is a bug)

The current preview ships emergency-accent `#C23616` on three surfaces (sticky bar, hero phone CTA, top-nav future CTA). That oversaturates the signal — red on the hero stops reading as "emergency".

Restricted use:
- **Allowed:** sticky bottom-bar (mobile + desktop), top-nav CALL button (chrome-only), any future page-level emergency banner explicitly designated as urgent.
- **Forbidden:** hero CTAs, body content, links, dividers, icon fills, footer chrome, mega-menu chips.
- Effect: red appears only in the chrome (top + bottom + designated emergency banners). The single source of red on a page is its emergency channel. Visitor in crisis sees one red signal, never three.

The hero CTAs and any in-page action buttons get redesigned in navy (see "Hero CTA replacement" below).

### Mobile sticky bar — never hides

Override of Rapid Outreach §5.4 "hide on contact page itself". Client-directed: the sticky bar is the main point of contact and must remain accessible on every route, including `/contact`. Flag as departure from research norm with reasoning: contact page already shows phone + WhatsApp, but the redundancy is acceptable because the sticky bar's presence is a brand signal of always-reachability that outweighs the minor visual duplication.

### cal.com embed component — new primitive

Goes into the design system as a typed component:

- **Placement:** advisory pages only — `/consultation`, `/practice-areas/*/fees`, `/direct-access`, `/what-to-expect`. Never on emergency-intent pages (homepage, pillar tops). Source: spec.md "two-tier CTA routing" + Astons Strategy direction 2 + Rapid Outreach §5.
- **Frame colour:** `#232536` (a step lighter than `--color-brand-primary` `#0E1628`). This adds a fourth brand-system surface tone — log as departure from "white surface + cool greys only" pattern in aesthetic.md. Used only on the cal.com embed wrapper, never bled into other surfaces.
- **Structure:** full-bleed `#232536` section band; iframe constrained to `max-width: 720px` and centred; generous top/bottom padding (`var(--space-16)`); eyebrow label + short intro copy above the iframe in white/light-grey text.
- **Token additions:** `--color-booking-frame: #232536`; `--booking-iframe-max: 720px`.
- **Defer-load:** iframe lazy-loaded with `loading="lazy"` and `importance="low"`; never above the fold; cal.com script deferred so it does not block LCP. Source: Rapid Outreach §3 / spec.md "cal.com embed times out and blocks LCP".

### Responsive type — `clamp()` for everything

Replace the planned media-query font-size breakpoints with `clamp(min, preferred, max)` per type token. Webflow Variables support `clamp()` natively, so the tokens propagate cleanly.

- Hero display: `clamp(2.25rem, 1.25rem + 4vw, 4rem)` (≈36 → 64px)
- H1: `clamp(2rem, 1.25rem + 3.5vw, 3.25rem)` (≈32 → 52px)
- H2: `clamp(1.5rem, 1.1rem + 1.5vw, 2.25rem)` (≈24 → 36px)
- H3: `clamp(1.25rem, 1rem + 0.75vw, 1.5rem)` (≈20 → 24px)
- Body: `clamp(1rem, 0.95rem + 0.25vw, 1.125rem)` (≈16 → 18px)
- Caption: `clamp(0.8125rem, 0.78rem + 0.15vw, 0.875rem)` (≈13 → 14px)

`clamp()` also applied to vertical rhythm tokens where appropriate (section padding, hero top padding) — desktop pages do not become claustrophobic at 1440px+ widths.

### Side gutters / max-width — new container tokens

The current preview is edge-to-edge, which reads poorly at desktop widths. New container system:

- `--container-narrow: 720px` — long-form body, measure-respecting prose, single-column pages
- `--container-default: 960px` — mixed-content pages, disclosure rows, mid-density grids
- `--container-wide: 1200px` — homepage hero, practice-areas grid, footer
- `--gutter: clamp(20px, 5vw, 96px)` — horizontal page padding on every container; never tighter than 20px on mobile, never wider than 96px on desktop
- Measure cap on paragraph text remains 66ch (already locked in aesthetic.md)
- The cal.com section and the sticky bar can full-bleed; everything else respects a container.

### Hero CTA replacement — frontend-design question, not yet locked

Now that red is reserved for chrome only, the hero CTAs (phone + WhatsApp) need new styling. Options to surface to client when frontend-design is engaged:

- **A. Navy solid (phone) + navy outline (WhatsApp).** Two equal-weight navy buttons; hierarchy carried by fill vs outline. Cleanest, matches the existing `.btn cc-advisory` pattern.
- **B. Navy solid (phone) + interactive-accent text-link (WhatsApp).** Phone CTA gets primary visual weight; WhatsApp demoted to a textual secondary action ("or message us on WhatsApp →").
- **C. Two navy outline buttons, identical weight.** Visitor self-chooses channel; sticky bar carries the emergency signal.

Recommendation pending frontend-design engagement. The Rapid Outreach UX §3.1 and §3.3 evidence will be the deciding input.

### Logo + wordmark arrangement — frontend-design question, gated on SVG

Once the SVG arrives, frontend-design will need to resolve:
- Mark left of wordmark in the same line (Linklaters pattern)
- Mark above wordmark, stacked (Pictet pattern)
- Mark alone in chrome at small breakpoints, wordmark surfacing only at hero / footer scale (Bain pattern)

Decision criteria: legibility at 32px header height, no truncation at 320px viewport, no visual competition between mark and wordmark.

## Updated departures from aesthetic.md (post-iteration 2)

- **aesthetic.md line 65 (forbidden list)** — add: "Use of emergency-accent `#C23616` outside the chrome surfaces (sticky bar, top-nav CALL button, designated emergency banners). Forbidden in hero CTAs, body content, links, dividers, icon fills, mega-menu chips, footer chrome."
- **aesthetic.md colour table** — add `--color-booking-frame: #232536` row, role "cal.com embed wrapper only". Note this is the fourth saturated value in the system.
- **aesthetic.md motion section** — replace the current "sticky bar only" motion line with the full motion token set (hover darken/lighten, state-change icon animation, arrow nudge, reduced-motion fallbacks).
- **aesthetic.md (new section) — responsive type** — document `clamp()` strategy and the six token formulas.
- **aesthetic.md (new section) — containers** — document the four container tokens and the `--gutter` formula.
- **aesthetic.md sticky-bar paragraph** — append "On mobile, the sticky bar persists across every route including /contact, by explicit user override of Rapid Outreach §5.4. Justification: brand signal of always-reachability outweighs the redundancy on /contact."

## Iteration round 3 (2026-05-12, post-iteration-round-2)

### Mega-menu interaction — locked

- **Desktop (pointer device):** opens on hover with no opening delay; closes on a small ~250–300ms delay after `mouseleave` to forgive accidental cursor exits. Single open at a time; opening one menu closes any other.
- **Touch device (tablet + phone):** press to open. Tap outside or tap the parent again to close.
- **Mobile (≤768px):** mega-menu is absorbed into the hamburger drawer. Inside the drawer, the practice-areas section opens as a vertical accordion rather than a 3-column matrix — the viewport is too narrow to grid the columns without truncation.
- **Keyboard:** Tab focuses parent → Enter or Space opens the panel. Arrow keys navigate within the panel. Esc closes. Source: WAI-ARIA Authoring Practices for disclosure menus.
- **Animation:** chevron rotates 180° on open (~150ms ease-out); panel fades in with a 4px translate-down (~150ms ease-out). `prefers-reduced-motion` removes the translate and the rotation transition (chevron flips instantly).

### Medium-optimised UX — locked as system rule

Every interactive component must be designed against the input modality and viewport class it appears in, not just the breakpoint. Codified as a system constraint:

- **Cursor devices:** hover states active; transitions visible; tooltips appear on hover after ~500ms; arrow-nudge animations active.
- **Touch devices:** hover states suppressed (no sticky `:hover` after tap); tap targets ≥48×48px enforced (≥56×64px on emergency CTAs); tooltips disabled on touch and replaced with permanent labels where needed; press-and-hold reveals secondary actions where applicable.
- **Large device (≥1024px):** containers respected; mega-menu in full 3-column matrix; gutters at upper bound of `clamp()`.
- **Tablet (768–1023px):** containers tightened; hero font clamps mid-range; mega-menu still present but column count may drop to 2 if width tight.
- **Phone (≤767px):** drawer navigation; sticky bottom-bar; hero typography clamps to lower bound; mega-menu becomes accordion; all action buttons full-width within container.

Frontend-design must produce specs for **every component × every viewport × every input modality** matrix. No assumption that "mobile = phone" or "desktop = pointer".

### Accessibility tokens — locked, WCAG AA minimum

Required in the design system at token + component level:

- **Skip-to-content link** — visually hidden until keyboard focus, then visible top-left at high contrast. Skips directly to `<main>`.
- **Focus rings** — 2px solid `--color-focus` outline + 2px offset on every interactive element. `--color-focus` token: high-contrast against both white and navy surfaces (proposed `#0F4C81` Carbon blue 60 — same as the interactive accent, doubles as focus colour to economise tokens).
- **ARIA landmarks** — `<header>`, `<nav aria-label="Primary">`, `<main>`, `<aside>`, `<footer>` on every page.
- **ARIA labels** — every icon-only button has an `aria-label` describing intent. Every form input has an associated `<label>` (not placeholder-only).
- **ARIA live regions** — confirmation messages after CTA click ("Calling 07922 247 999…", "Opening WhatsApp…") in `aria-live="polite"`.
- **Tooltips** — only for non-obvious actions (e.g., the quick-exit button). Implemented with `aria-describedby`. Disabled on touch devices (per medium-optimised rule).
- **Keyboard parity** — every action triggerable by mouse / touch must be triggerable by keyboard. No hover-only content. No mouse-only drag operations.
- **Contrast** — body text 4.5:1 minimum on its surface (already locked in aesthetic.md). UI elements and large text 3:1 minimum. Audit at every token + surface combination.
- **`prefers-reduced-motion`** — disables all decorative motion: arrow nudge, chevron rotation, panel translate-on-open, sticky-bar entry. State-essential changes remain but become instant.
- **`prefers-color-scheme`** — out of scope for v1. Site is white-ground only.

### Safe-exit / "Quick exit" feature — new design-system component

Outside the coverage of the three deep-research reports (which focus on professional-services UX, not safety conventions). Scaffolded via the **ux-designer skill** per [[feedback_decision_process_protocol]]. Pattern source: UK Refuge, Women's Aid, gov.uk pages on abuse, Police.uk.

**Locked spec:**
- **Component:** floating outlined button, fixed top-right, always visible regardless of scroll. Border `2px solid #C23616`, transparent fill, text `#C23616` at rest. Hover: fill becomes `#C23616`, text becomes white (10% darken rule does not apply — full inversion communicates the destructive nature of the action).
- **Label:** "Quick exit"
- **Coverage:** every page on the site, no exclusions.
- **Keyboard shortcut:** Esc-twice within 1000ms triggers. Single Esc retains its existing duty (closes open mega-menus / drawers / modals).
- **Action on trigger:** `window.location.replace('https://www.google.com')` — replaces current URL in history so the browser back button does not return to the site. Same tab (no `window.open`). No confirmation dialog (defeats the speed purpose). No farewell page.
- **Aria-label:** `"Leave this site immediately — opens Google in this tab"`. Visible button text remains "Quick exit".
- **Tooltip on cursor devices:** appears on hover after ~500ms — single line, neutral: `"Quickly leaves this site. Press Esc twice as a shortcut."`. Tooltip suppressed on touch devices.
- **Mobile placement:** mirrors desktop — floating fixed top-right, same dimensions (no shrinking — discoverability is the point). Lives outside the hamburger drawer so it's accessible without opening it.
- **Z-index:** above the sticky-emergency-bar's z-index, since it must be reachable at all times.
- **Print stylesheet:** hidden when printing.
- **Why this matters in plain prose:** a defendant in a coercive household or domestic-abuse context can clear the criminal-defence site from screen in two keystrokes or one tap if someone walks in. The same applies to a young person whose family controls the device, or anyone in a surveillance context. The pattern is established in UK regulated services and adopted by Astons under the same principle.
- **Departure from aesthetic.md to flag:** this is a fourth surface to carry red, but as an outlined treatment it remains visually distinct from the solid-red emergency-contact chrome. The red allocation rule expands to: "solid red = emergency contact (sticky bar + top-nav CALL); outlined red = safety exit (quick-exit only)". Two distinct uses of red, two distinct visual treatments, each with a different signal.

### Logo SVG received — arrangement decided by the asset

The user-supplied SVG (saved at [src/assets/logo-white.svg](../../src/assets/logo-white.svg)) is a single asset: 32×32 mark on the left, wordmark "ASTONS LAW CHAMBERS" on the right, all on the same baseline, total dimensions 148×34. This resolves the mark-arrangement question by construction — no decision needed.

**Specs:**
- **Default colour** for use on white surfaces: re-rendered with `fill="#0E1628"` for the mark paths + wordmark paths. Saved as `logo-navy.svg`.
- **White version** (as supplied): used on dark surfaces (`#0E1628` navy footer band if present; `#232536` cal.com embed band).
- **Header display size:** mark at 32×32, wordmark scales with it. Total chrome height ~40px.
- **Mobile display size:** mark only at 28×28, wordmark hidden below 480px to preserve top-nav real estate for the CALL CTA and quick-exit. Wordmark surfaces in the footer.
- **Favicon:** mark portion only, exported at 32×32 + 16×16 + 180×180 (Apple touch icon) + 512×512 (web manifest).
- **The mark itself:** four quarter-form shapes arranged in a 2×2 grid with rounded outer corners — reads as an abstract crest without using heraldic vocabulary. Within research permissions (no gavels, no scales, no Inn courtyard).

## Iteration round 4 (2026-05-12, session re-entry)

Confirmed via `AskUserQuestion` at session pickup before bundle amendments began. No additional iteration items.

### Hero CTA pair — locked

**Navy solid (phone) + navy outline (WhatsApp).** Two equal-weight navy buttons on the homepage hero; visual hierarchy carried by fill vs outline, not by colour. Both at 56–64px tall to meet emergency tap-target rule. Matches the existing `.btn cc-advisory` pattern, extended to a dedicated `.btn cc-hero-call` (solid `#0E1628`, white text) and `.btn cc-hero-whatsapp` (2px outline `#0E1628`, transparent fill, inverts on hover). The Rapid Outreach UX §3.1 dual-channel parity principle is preserved; the red signal is left to the chrome (sticky bar + top-nav CALL).

### Homepage contextual hero image — locked direction (subject TBD)

**Architectural detail — chambers entrance / Marylebone street geometry.** Direction confirmed; specific subject TBD. Must not be stock, gavels, scales, Inn courtyards, courthouse exteriors, or people. Tight, undecorated photograph of a real architectural feature (door reveal, lintel, street-corner geometry, façade detail) that reads as situated and specific without performing heritage. Bundle ships with a placeholder slot; final image sourced separately before Phase 1 homepage build.

### Mega-menu keyboard parity — locked

**Tab focuses parent → Enter/Space opens the panel.** Standard WAI-ARIA Authoring Practices for disclosure menus. Esc closes. Arrow keys navigate inside the panel. Matches the touch press-to-open pattern; mirrors the pointer hover-open behaviour without surprising assistive-tech users with auto-opening panels on Tab.

### Card hover treatment — decided inside frontend-design

Per the open question deferred from iteration 3: card hover follows the **border darken 10%** rule (consistent with the global hover-darken/lighten motion tokens). The card heading colour does not shift; the card does not lift; no shadow. Implemented via `color-mix(in srgb, var(--color-divider), #000 10%)` on `.card.cc-bordered:hover`. Reduced-motion still applies the colour change instantly (it's state, not decoration).
