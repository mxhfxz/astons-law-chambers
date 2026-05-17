# Phase 2 Execution Plan — Design System (Penpot) + Token Implementation

> **For Claude:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task.

**Written:** 2026-05-14
**Skill used:** writing-plans (structural form)
**Skill team (per `.claude/CLAUDE.md`):** ux-designer, mobile-design, nextjs-best-practices, web-performance-optimization, content-strategy, legal-advisor, writing-plans
**Input files:** `09-design-system-spec.md`, `10-mobile-layout-spec.md`, `12-tailwind-token-spec.md`, `13-nextjs-scaffold-spec.md`, `15-performance-plan.md`, `.project/plan.md` §Phase 2

---

## Goal

Stand up the complete visual contract on the `With Claude` Penpot page and implement the full token set (semantic + component layers) in code, so Phase 3 (Header, Footer, StickyBar) can begin with zero token ambiguity.

## Architecture

- All Phase 2 Penpot output lives as named Boards on the `With Claude` page only (apex rule). No new Penpot pages created. Other pages in the Astons file (Logos, Website 2026, Design v2, Website, Mobile) are not touched and not referenced.
- Code-side work appends semantic + component layers to `styles/tokens.css`, confirms the `tailwind.config.ts` extension matches, and adds the base layer to `app/globals.css`. The primitive layer is already on disk from Phase 1.
- Palette is locked to `09-design-system-spec.md` §2 (decided 2026-05-14). No revisits.
- Sequential team mode: each task ships, user reviews/tweaks, next task starts. One artefact per task, per the existing `one component per task` rule in CLAUDE.md.

## Tech Stack

Next.js 14 App Router · TypeScript strict · Tailwind CSS + CSS custom properties · `next/font/google` for Inter Variable + Playfair Display · Penpot (MCP) for design source.

## Skill team attribution

| Concern | Skill |
|---|---|
| Visual contract, hierarchy, focus states, motion patterns | ux-designer |
| Breakpoint visualisation, sticky bar, thumb-zone constraints | mobile-design |
| tokens.css structure, Tailwind extension, next/font wiring | nextjs-best-practices |
| Font loading, CLS protocol, type-scale floor enforcement | web-performance-optimization |
| Labels and microcopy on the token gallery and frames | content-strategy |
| BSB-required disclaimer surfaces, regulatory footer readability, complaints link | legal-advisor |
| Plan structure itself (this file) | writing-plans |

Decisions outside these skills' remit get bounced back to user, not invented.

## Sequence

```
T1 Token gallery frame ──▶ T2 Penpot library tokens ──▶ T3 tokens.css semantic+component
   (ux-designer +              (ux-designer)              (nextjs-best-practices +
    content-strategy)                                      web-performance-optimization)
                                                                  │
                                                                  ▼
                                                  T4 tailwind.config.ts validation
                                                  (nextjs-best-practices)
                                                                  │
                                                                  ▼
                                                  T5 globals.css base layer
                                                  (nextjs-best-practices +
                                                   legal-advisor)
                                                                  │
                                                                  ▼
T6 Header frame ◀──── T7 Footer frame ◀──── T8 Mobile StickyBar frame ◀──── T9 Homepage Above-Fold frame
   (ux + mobile +        (ux +                  (mobile + ux)                   (ux + mobile +
    legal-advisor)        legal-advisor)                                          content-strategy)
                                                                                          │
                                                                                          ▼
                                                                              Phase 2 DoD validation
```

T1–T5 are the token spine. T6–T9 are the four Penpot frames `.project/plan.md` §Phase 2 names as the Phase 3 prerequisites (Header / Footer / StickyBar / Homepage above-fold). User can resequence T6–T9 freely without breaking T1–T5; the token spine has to land first.

---

## Task 1: Token gallery frame on `With Claude`

**Owner skills:** ux-designer, content-strategy

**Files:**
- Create (Penpot): Board `Tokens` on page `With Claude` (`fbd0c4dd-760c-804b-8008-04284678d008`)

**Step 1: Confirm the page is still empty**

Run: `mcp__penpot__execute_code` with `penpotUtils.shapeStructure(penpotUtils.getPageById('fbd0c4dd-760c-804b-8008-04284678d008').root, 2)`
Expected: root with no real children (or one placeholder).

**Step 2: Create the `Tokens` Board**

Create a top-level Board on `With Claude` at `(0, 0)`, width 1440, height auto (flex column layout, padding 64).
Layer name: `tokens` (Penpot convention: lowercase, slashed sub-layers).

**Step 3: Populate colour-swatch sub-Board**

Sub-Board `tokens/color`. Inside: one swatch per primitive in `09-design-system-spec.md` §2 (14 swatches), then one swatch per semantic mapping (17 entries). Swatch layer naming `tokens/color/primitive/navy-950`, `tokens/color/semantic/text-primary`, etc. Each swatch: 120×120 colour fill, label above (token name in `--text-sm`), value below (`--text-xs`).

No raw hex values in the layer attributes — every fill references the Penpot library token set up in Task 2. Until Task 2 ships, fills are flagged with a `TODO-token` Penpot annotation.

**Step 4: Populate type-ramp sub-Board**

Sub-Board `tokens/typography`. One Text element per scale entry from `09-design-system-spec.md` §4 (10 sizes). Each uses `applyToText` with the corresponding `LibraryTypography` entry once Task 2 ships. Sample string: `Astons Law Chambers — 020`. Show Inter rows and one Playfair Display row (`--text-display` only).

**Step 5: Populate spacing-scale sub-Board**

Sub-Board `tokens/spacing`. 11 horizontal bars, each height 32, width = the scale value (4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96). Labelled with token name + computed px.

**Step 6: Populate motion sub-Board**

Sub-Board `tokens/motion`. Plain-text reference: three duration tokens and three easing tokens with their values. No animations rendered (motion preview not in scope; this Board documents the contract).

**Step 7: Validate frame**

Run: `mcp__penpot__execute_code` with a `penpotUtils.findShapes(s => s.fills?.some(f => f.fillColor && !s.tokens?.fill), tokensBoard)` check.
Expected: empty array once Task 2 has applied tokens. While Task 2 is pending, this returns the swatches awaiting token application — acceptable mid-task.

**Step 8: Commit**

```bash
git add .project/planning/18-phase-2-execution-plan.md
git commit -m "Phase 2 Task 1: Token gallery frame on With Claude"
```

(Penpot state is autosaved server-side; nothing to commit in git for the design itself.)

---

## Task 2: Penpot library tokens (TokenColor, TokenTypography, TokenDimension, TokenNumber)

**Owner skill:** ux-designer

**Files:**
- Create (Penpot): tokens in `penpot.library.local.tokens` — one set `astons` containing all primitive + semantic tokens from `09-design-system-spec.md`.

**Step 1: Inspect existing token state**

Run: `mcp__penpot__execute_code` with `return penpotUtils.tokenOverview();`
Expected: empty or only Penpot defaults. Confirm clean start.

**Step 2: Create the `astons` token set and add primitive colour tokens**

Iterate over the 14 primitive colour entries from `09-design-system-spec.md` §2 Primitive Colour Tokens. Use `set.addToken({type: "color", name: "color.navy.950", value: "#0B1423"})` etc. Name uses dot-notation, lowercased.

**Step 3: Add semantic colour tokens that reference primitives**

For each semantic mapping (e.g. `color.text.primary → navy.950`), `set.addToken({type: "color", name: "color.text.primary", value: "{color.navy.950}"})`. Penpot will resolve the reference.

**Step 4: Add spacing tokens**

11 entries — `space.1` through `space.24` per `09-design-system-spec.md` §3, using `type: "spacing"` (or `"dimension"` if spacing token type rejects rem values; fall back per Penpot API).

**Step 5: Add typography tokens**

Use `set.addToken({type: "fontSizes", name: "text.base", value: "1rem"})` for the 10 size tokens. Font family tokens via `type: "fontFamilies"`. Font weight is handled at the typography token level — confirm Penpot's `TokenTypography` accepts the full text style as one entry; if not, fall back to per-property tokens.

**Step 6: Re-apply tokens to the Task 1 swatches**

For each swatch, find the matching `Token` via `penpotUtils.findTokenByName('color.navy.950')` and apply with `shape.applyToken(token, ['fill'])`. Wait 100ms after each batch.

**Step 7: Validate**

Run: `mcp__penpot__execute_code` returning `findShapes(s => s.name.startsWith('tokens/color/') && !s.tokens?.fill).length` — expected `0`.

**Step 8: Commit**

```bash
git add .project/planning/18-phase-2-execution-plan.md
git commit -m "Phase 2 Task 2: Penpot library tokens (primitive + semantic)"
```

### T2 landing notes (2026-05-14)

What actually landed in the Penpot file:

| Subsystem | Outcome |
|---|---|
| Penpot Tokens (new Token API) | 61 tokens created in set `astons` — 14 primitive colour, 16 semantic colour with `{...}` references, 11 primitive + 5 semantic spacing, 3 sizing (container max-widths), 2 fontFamilies, 10 fontSizes. **The set is active.** Visible in Penpot's UI tokens panel. |
| LibraryColor (older API, used as workaround) | 30 LibraryColors mirroring the 14 primitive + 16 semantic colour set. Used as the binding mechanism for swatch fills because `shape.applyToken()` and `tokens.addTheme()` both throw `Field message is invalid` from the plugin runtime. Filed for follow-up. |
| Gallery visualisation | tokens/color rebuilt as row-Boards with library-colour-bound 56×56 swatches; tokens/typography rebuilt with Inter + Playfair Display samples at each scale entry; tokens/spacing rebuilt with navy-700 bars sized to actual px values (max-desktop/max-wide truncated visually with note); tokens/motion stayed as label rows (motion previews not static-renderable). |
| Pending-token-fill plugin data | Initial markers used the wrong `setPluginData` signature (3-arg call; Penpot API is 2-arg). Harmless residue. Fills are now correctly bound via `fillColorRefId`. |
| Font choice | Penpot's `findByName` returned fuzzy matches; using `penpot.fonts.all.find(f => f.name === 'Inter')` exact-match works. Inter Variable is not installed in Penpot — using regular Inter. Tokens.css retains 'Inter Variable' as primary stack since `next/font` loads the variable build server-side. |
| Aliasing limitation | Library-colour-bound semantic swatches duplicate the primitive's hex; they do not propagate from primitives. The source of truth is `styles/tokens.css` (T3 onwards). |

Net Penpot library state: 61 Tokens (`astons` set) + 30 new LibraryColors + 6 pre-existing LibraryColors (left untouched per apex rule).

---

## Task 3: tokens.css — semantic + component layers

**Owner skills:** nextjs-best-practices, web-performance-optimization

**Files:**
- Modify: `styles/tokens.css` (append semantic + component layers per `12-tailwind-token-spec.md` §2)

**Step 1: Read current tokens.css**

Confirm only primitive layer present (64 lines). Strip the "provisional stubs" header note; values are now locked.

**Step 2: Append semantic layer**

Add the semantic block from `12-tailwind-token-spec.md` §2 lines 93–129 verbatim. 17 colour entries + 5 spacing entries + 4 layout entries. All reference primitives via `var(--…)`.

**Step 3: Append component layer**

Add the component block from `12-tailwind-token-spec.md` §2 lines 131–179 verbatim. Component tokens reference semantic layer, never primitives.

**Step 4: Run lint to catch any raw hex outside tokens.css**

Run: `npm run lint`
Expected: pass (project ESLint rule rejects raw hex in JSX/CSS outside tokens.css per `12-tailwind-token-spec.md` §5).

**Step 5: Run type-check**

Run: `npm run type-check`
Expected: pass.

**Step 6: Run build**

Run: `npm run build`
Expected: pass.

**Step 7: Commit**

```bash
git add styles/tokens.css
git commit -m "Phase 2 Task 3: tokens.css semantic + component layers"
```

---

## Task 4: tailwind.config.ts validation

**Owner skill:** nextjs-best-practices

**Files:**
- Modify (if drift detected): `tailwind.config.ts`

**Step 1: Diff against spec 12 §3**

Open `tailwind.config.ts` and the Tailwind extension block in `12-tailwind-token-spec.md` §3. Confirm every semantic colour, fontSize entry, spacing entry, maxWidth entry, and transitionDuration entry from the spec is present in `theme.extend`.

**Step 2: Add any missing extensions**

Per spec verbatim. Do not add Tailwind features not in spec (YAGNI).

**Step 3: Type-check**

Run: `npm run type-check`
Expected: pass.

**Step 4: Build**

Run: `npm run build`
Expected: pass with no PostCSS warnings about unknown variables.

**Step 5: Commit**

```bash
git add tailwind.config.ts
git commit -m "Phase 2 Task 4: Tailwind config aligned to semantic token set"
```

---

## Task 5: globals.css base layer

**Owner skills:** nextjs-best-practices, legal-advisor

**Files:**
- Modify: `styles/globals.css` (or `app/globals.css` — verify scaffold location)

**Step 1: Locate the existing globals.css**

Run: `find /Users/mahfuzpholby/Documents/Agency-Work/astons-law-chambers -name 'globals.css' -not -path '*/node_modules/*'`
Expected: one match.

**Step 2: Confirm tokens.css import is at the top**

If not, add `@import './tokens.css';` (or relative path) as the first line.

**Step 3: Add base body styles**

Body uses `var(--font-sans)`, `font-size: var(--text-base)` (16px floor — no responsive rule may shrink this per spec 09 §4), `color: var(--color-text-primary)`, `background: var(--color-bg-base)`, `line-height: 1.7`.

**Step 4: Add prose-container helper**

`.prose { max-width: var(--prose-max-width); color: var(--prose-text); }` — used wherever long-form copy lands (practice area Zone 2, compliance pages).

**Step 5: Add `has-sticky-bar` body class**

When applied, the body gets `padding-bottom: var(--sticky-bar-height)` to prevent the StickyBar from occluding final-screen content. The class is toggled by `hooks/useStickyBarVisibility.ts` in Phase 3.

**Step 6: Confirm `--text-xs` (12px) is only referenced in BSB-disclaimer-permitted contexts**

`legal-advisor` review: ensure no body, nav, or interactive use of `--text-xs`. Grep:

Run: `grep -rn 'text-xs\|--text-xs' app/ components/ styles/ 2>/dev/null | grep -v tokens.css`
Expected: zero results outside `tokens.css` until BSB disclaimer components ship in Phase 6.

**Step 7: Build**

Run: `npm run build`
Expected: pass.

**Step 8: Commit**

```bash
git add styles/globals.css app/globals.css
git commit -m "Phase 2 Task 5: globals.css base layer + sticky-bar offset"
```

---

## Task 6: Header (Navigation) frame on `With Claude`

**Owner skills:** ux-designer, mobile-design, legal-advisor

**Files:**
- Create (Penpot): Board `Header` on page `With Claude`, with two child Boards `Header/Mobile` (375 wide) and `Header/Desktop` (1280 wide).

**Step 1: Read site-architecture nav inventory**

Open `.project/planning/03-site-architecture.md` and list nav items. Do not invent items. If anything is missing, ask user; do not fabricate.

**Step 2: Build `Header/Mobile`**

Height 64px (per spec 10 §6). Layers: `nav/logo` (left, navy logo SVG from `00_Design System/logo-navy.svg`), `nav/menu-trigger` (right, hamburger icon — described in spec 10 §6), `nav/phone-cta` (visible inline at mobile per the mobile sticky-first-priority pattern — confirm with mobile-design rules in spec 10).

**Step 3: Build `Header/Desktop`**

Height 72px. Layers: `nav/logo` left, `nav/primary-link/{slug}` inline horizontal nav items, `nav/phone-cta` right, `nav/whatsapp-cta` right of phone CTA.

**Step 4: Apply tokens to every fill, stroke, type, spacing**

No raw values. Use `applyToken` against the `astons` set from Task 2.

**Step 5: Run design-reader subagent against the Header Board**

Spawn `design-reader` with target: `Header` Board on `With Claude`. Confirm zero raw hex flagged, layer names follow `section/element` convention.

**Step 6: Commit**

```bash
git add .project/planning/18-phase-2-execution-plan.md
git commit -m "Phase 2 Task 6: Header frame (mobile + desktop)"
```

---

## Task 7: Footer frame on `With Claude`

**Owner skills:** ux-designer, legal-advisor

**Files:**
- Create (Penpot): Board `Footer` with `Footer/Mobile` + `Footer/Desktop`.

**Step 1: List required Footer content**

From `02-bsb-compliance-map.md`: BSB regulatory statement, complaints procedure link, Legal Ombudsman link with time limits, BSB Barristers' Register link, Public Access Guidance link, indicative fee disclosure note. Plus practice-area sitemap and `contact.ts`-sourced phone + WhatsApp.

**Step 2: Build `Footer/Desktop`**

Background `--color-bg-footer` (navy-800). Text `--color-text-inverse`. Layer naming `footer/regulatory-statement`, `footer/complaints-link`, `footer/leo-link`, `footer/bsb-register-link`, `footer/public-access-link`, `footer/sitemap/{slug}`, `footer/phone`, `footer/whatsapp`.

**Step 3: Build `Footer/Mobile`**

Same content, single column, regulatory block at bottom. Confirm `--text-xs` only on BSB disclaimer line; regulatory statement at `--text-sm` minimum.

**Step 4: Apply tokens**

Per Task 6 step 4 pattern.

**Step 5: design-reader review**

Same as Task 6 step 5.

**Step 6: Commit**

```bash
git add .project/planning/18-phase-2-execution-plan.md
git commit -m "Phase 2 Task 7: Footer frame (mobile + desktop)"
```

---

## Task 8: Mobile StickyBar frame on `With Claude`

**Owner skills:** mobile-design, ux-designer

**Files:**
- Create (Penpot): Board `StickyBar` on `With Claude` (mobile only, 375 wide × 56 tall).

**Step 1: Layout**

Full-width two-cell row. Left cell `stickybar/phone` — amber CTA, label "Call now", phone glyph. Right cell `stickybar/whatsapp` — WhatsApp green CTA, label "WhatsApp", WA glyph. Each cell 50% width.

**Step 2: Apply component-layer tokens directly**

`--sticky-bar-height: 56px`, `--sticky-bar-bg: var(--color-bg-footer)`, `--btn-phone-bg: var(--color-cta-phone)`, `--btn-whatsapp-bg: var(--color-cta-whatsapp)`, `--btn-whatsapp-text: var(--color-text-inverse)`. These resolve to the swatches in the `tokens` Board.

**Step 3: Confirm thumb-zone compliance**

Each CTA ≥ 44×44px (WCAG 2.5.5); whole bar at 56px height comfortably exceeds. Label `--text-sm` minimum.

**Step 4: design-reader review**

Same pattern as Task 6 step 5.

**Step 5: Commit**

```bash
git add .project/planning/18-phase-2-execution-plan.md
git commit -m "Phase 2 Task 8: Mobile StickyBar frame"
```

---

## Task 9: Homepage Above-Fold frame on `With Claude`

**Owner skills:** ux-designer, content-strategy, mobile-design

**Files:**
- Create (Penpot): Board `Homepage/AboveFold` with `Homepage/AboveFold/Mobile` + `Homepage/AboveFold/Desktop`.

**Step 1: Pull above-fold contract from research synthesis**

Open `.project/research-01/synthesis.md` + `.project/planning/11-ux-flows.md`. The above-fold elements for crisis-state user: entity name, single positioning line (one short clause — no marketing speak, no rhetorical question), phone CTA, WhatsApp CTA, legal-aid signal (per resolved flag 🚩3). No portrait. No hero image. No alternating banding.

**Step 2: Microcopy proposals**

`content-strategy` produces 2–3 candidate positioning lines. User picks. Until user picks, the frame uses placeholder text `[positioning line — pending user pick]` flagged with a Penpot TODO annotation.

**Step 3: Build `Homepage/AboveFold/Mobile`**

Top: header (linked to `Header/Mobile`). Body: h1 at `--text-4xl`, positioning line at `--text-lg`, two stacked CTAs (phone first, WhatsApp second). Legal-aid signal as a single line `--text-sm` below CTAs.

**Step 4: Build `Homepage/AboveFold/Desktop`**

h1 at `--text-display` (Playfair Display) per spec 09 §4. Positioning line at `--text-xl`. CTAs inline horizontally.

**Step 5: Apply tokens + design-reader review**

Same pattern as previous tasks.

**Step 6: Commit**

```bash
git add .project/planning/18-phase-2-execution-plan.md
git commit -m "Phase 2 Task 9: Homepage above-fold frame"
```

---

## Phase 2 DoD validation

**Owner skill:** writing-plans (gate), legal-advisor (BSB pass)

**Step 1: design-reader full sweep of `With Claude`**

Spawn `design-reader` against the entire `With Claude` page. Expected: every layer namespaced `section/element`, zero raw hex, every fill/stroke/typography references a token in the `astons` set.

**Step 2: tokens.css completeness**

Confirm `styles/tokens.css` contains all three layers (primitive, semantic, component) and that every component-layer token references a semantic token, not a primitive.

**Step 3: Build, lint, type-check**

Run sequentially:
```bash
npm run lint
npm run type-check
npm run build
```
Expected: all pass.

**Step 4: BSB readability check**

`legal-advisor` confirms the Footer regulatory block uses `--text-sm` minimum, not `--text-xs`. Complaints link visible without scrolling on mobile Footer.

**Step 5: Phase 1 DoD back-fill (if not done)**

`.project/plan.md` Phase 1 DoD required `app/practice-areas/[slug]/page.tsx` + `app/page.tsx` stubs. If still missing (see `_START_HERE.md` "Gap to surface"), Phase 2 cannot ship until these stubs exist or the user explicitly defers them.

**Step 6: Mark Phase 2 complete**

Update `.project/_START_HERE.md` "Current state" block. Update memory entry `project_rebuild_decisions.md` only if a new decision was locked in (not just executed).

---

## Open items the team flagged for user input mid-flight

| Item | Surfaces in task | Why team can't decide |
|---|---|---|
| Above-fold positioning line | T9 step 2 | `feedback_natural_voice.md`: copy decisions need user pick, no Claude-default |
| Inline phone CTA on mobile Header (vs hamburger-only) | T6 step 2 | Spec 10 §6 doesn't fully specify; conversion vs visual-density tradeoff |
| BSB regulatory statement exact wording | T7 step 2 | Pending 🚩 — see `_START_HERE.md` flag table |
| Final word for legal-aid signal on Homepage | T9 step 3 | 🚩3 PARTIAL — partner-firms framing needs user-approved short phrase |

All four are blocked-but-not-blocking — the frames can be built with `TODO` annotations and the user picks at review.

---

## Departures from existing planning files

- `.project/plan.md` Phase 2 says "User creates Astons Law Chambers Penpot file. Pages: Homepage, Navigation, Footer, etc." → **overridden** by the apex rule. Phase 2 design lives as frames on `With Claude` only. Recorded for traceability.
- `styles/tokens.css` Phase 1 header note ("provisional stubs, will be revised when Phase 2 begins") → **removed in T3**. Values are now locked.
- T1+T2 visual approach: original plan put swatches/type-samples/spacing-bars in T1 with raw-hex fills bridged by TODO markers until T2. Self-edited at execution to split — T1 ships labels-only skeleton (no fills), T2 creates tokens AND visuals from the start. User confirmed via question. Net: no transient rule-violation state, same end artefact.
- T2 binding mechanism: planned to use the new Penpot Token API (`shape.applyToken`). API throws `Field message is invalid` from the plugin runtime. Fell back to LibraryColor (older API) which works. 61 Penpot Tokens still created and visible in Penpot UI panel; LibraryColors carry the actual `fillColorRefId` bindings. Aliasing lost (semantic colours duplicate the primitive hex); source of truth is `styles/tokens.css`.

---

## Phase 2 close-out (2026-05-14)

**Definition of Done — met:**

- All 5 named frame groups on `With Claude`: `Tokens`, `Header` (Mobile + Desktop), `Footer` (Mobile + Desktop), `StickyBar`, `Homepage/AboveFold` (Mobile + Desktop).
- `With Claude` page raw-hex audit: 0 unbound fills, 0 unbound strokes across 295 styled shapes. Every fill/stroke binds to a LibraryColor via `fillColorRefId`. Root Frame default fill excluded (cannot be bound).
- `styles/tokens.css` contains all 3 layers (primitive, semantic, component). Component tokens reference semantic only.
- `tailwind.config.ts` matches spec 12 §3 verbatim.
- `styles/globals.css` body rerouted to semantic tokens, `.has-sticky-bar` + `.prose` helpers added.
- `npm run lint`: clean. `npm run type-check`: clean. `npm run build`: clean, 15 static pages, 87.4 kB First Load JS.

**Penpot library state on the Astons file:**
- 61 Penpot Tokens in set `astons` (14+16 colour, 11+5 spacing, 3 sizing, 2 fontFamilies, 10 fontSizes) — visible in Penpot UI for manual application.
- 30 new LibraryColors (14 primitive + 16 semantic) used as binding mechanism.
- 6 pre-existing LibraryColors from off-limits pages — untouched.

**Open items still pending user decision** (carried into Phase 3+):
- 🚩7/🚩8 Indicative fee ranges + VAT status — affects `/fees/` + Motoring/Immigration/Licensing practice-area pages. Placeholder text on Footer frames.
- 🚩10 Internal complaints response timeframe + LeO link wording. Placeholder text on Footer frames.
- Homepage above-fold positioning line — pending user pick. Placeholder text on Homepage/AboveFold/Mobile + Desktop frames.
- Penpot plugin Token API `applyToken`/`addTheme` "Field message is invalid" bug — to file upstream once confirmed not a missing activation step.

**Branch:** `phase-2-design-system` · 4+ commits ahead of main. Ready for merge or for Phase 3 to start from.
