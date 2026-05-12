# Progress: Astons Law Chambers rebuild

## Session log

### 2026-05-12 — Project initialised
- Read three deep-research reports (Astons Strategy, Visual Practices, Rapid Outreach UX)
- Confirmed four locked decisions with user via AskUserQuestion:
  - URL migration `/practice-areas/[area]` with 301s — approved
  - Drop second phone number 07767 268 607 — confirmed not real
  - Named authorship line at pillar foot — approved
  - project-mgmt spec-driven workflow — approved
- Updated `verified_facts.md` to mark 07767 as confirmed-not-real
- Created `.project/rebuild/` with `spec.md`, `plan.md`, `findings.md`, `progress.md`
- Current phase: **plan** (Phase 0 of implementation — design system foundation)
- Blocker: brand accent colour decision pending

### 2026-05-12 — Aesthetic direction + brand inputs
- Brand colours locked: `#0E1628` main (navy/near-black, doubles as body), `#C23616` emergency accent (deep orange-red — call-now bands, sticky bar, emergency CTAs)
- Emails locked: `info@astonslaw.com` general; `ghulam@astonslaw.com` complaints-page only
- "Clerks answer outside office hours" → withdrawn; flagged by user as a stubborn imported claim. New memory written: [[feedback_flag_imported_truth_claims]]
- frontend-design skill invoked for design planning (skill file exists at top-level skills dir but not in Skill registry; read content directly and applied)
- Aesthetic direction locked: **crisis-grade institutional, brutally minimal with weight**. Written to [aesthetic.md](aesthetic.md).
- Type: IBM Plex Sans only, single family, weight-contrast boldness (user-confirmed)
- Wordmark: `ASTONS LAW CHAMBERS` all-caps tracked, no mark, no monogram (user-confirmed)
- Phase 0 unblocked

### 2026-05-12 — Phase 0 design system implemented
- Wrote src/tokens.css, src/typography.css, src/components.css, src/site.js
- Updated package.json to v1.1.0, added clean-css-cli, added build:css step
- Built dist/bundle.css (25.7KB), dist/bundle.min.css (10.4KB), dist/site.min.js (2.1KB)
- Removed @import for Plex Sans (clean-css strips it); loading via <link> in Webflow head instead
- Added dist/preview.html for local browser smoke test
- Wrote .project/rebuild/webflow-injection.md (head/body/per-page injection guide + Webflow Variable mappings)
- Updated DECISION_LOG.md with the full set of 2026-05-12 decisions
- **Not yet pushed to GitHub** — pausing on shared-state action per personal-preferences

## Errors / blockers

- Need user authorisation to git commit + push (jsDelivr can't serve until pushed to public main)
- Outstanding at copy layer: Ghulam's literal-truth commitments before any hero copy ships

### 2026-05-12 — Visual Layering sub-phase opened (Phase 0.5)
- Client reviewed dist/preview.html; verdict: too austere, needs ~10–15% more engagement without losing crisis-grade core
- Asks: images, FAB, SVG logo, light colour variation, mega-menu for legal services, top-nav CTA (Jakob's Law), responsive optimisation
- project-mgmt skill engaged to plan re-decisions before frontend-design skill activates (per user instruction)
- Wrote [visual-layering-plan.md](visual-layering-plan.md) — classifies the 7 asks as Green/Yellow/Red against locked aesthetic.md decisions, with deep-research citations
- 4 RED items requiring client re-decision: imagery scope, SVG logo (was wordmark-only-locked), colour variation (was "zero third hue"-locked), FAB-vs-sticky-bar reconciliation
- 2 GREEN items ready to build: top-nav phone CTA (Matrix Chambers chrome pattern), responsive breakpoints
- 1 YELLOW item ready to scope: mega-menu for practice areas (research permits, just needs grouping decision)
- No bundle changes yet; v1.1.0 push paused until re-decisions resolve into a v1.2.0

### 2026-05-12 — Session cleared for fresh context
- User installed two new skills mid-session: `webflow-skills` plugin (from `webflow/webflow-skills` marketplace) and `webflow-development` skill (cloned from `monmush/webflow-development` to `~/.claude/skills/`)
- Session cleared deliberately to avoid token drift / compaction loss before the Webflow build phase
- Comprehensive handoff document written to [.project/rebuild/_START_HERE.md](_START_HERE.md) — points the next session at the read-order, skill protocol, locked decisions, hard "don't" list, and pending open items
- MEMORY.md updated to point new sessions at `_START_HERE.md` first
- Next session picks up at: ask user for any final iteration items → engage `webflow-development` + `ux-designer` skills → execute Phase 0.5 bundle changes → multi-breakpoint preview → user review → push v1.2.0 → Webflow injection

### 2026-05-12 — Visual Layering iteration round 3
- Mega-menu interaction locked: desktop hover-open no delay + ~250–300ms close delay; touch press-to-open; mobile absorbs into hamburger drawer as vertical accordion; keyboard parity per WAI-ARIA
- Medium-optimised UX rule codified: every component × viewport × input modality must be specified (no "mobile = phone" or "desktop = pointer" assumptions)
- Accessibility tokens locked: WCAG 2.2 AA floor; skip-to-content, focus rings (2px solid + 2px offset using `#0F4C81`), ARIA landmarks/labels/live regions, tooltips on cursor only, keyboard parity, `prefers-reduced-motion` honoured for decorative motion only
- Safe-exit / "Quick exit" feature locked as a new design-system component — outside the three deep-research reports' coverage; ux-designer skill engaged to scaffold the question per [[feedback_decision_process_protocol]]. Spec: floating outlined red button top-right, Esc-twice-within-1s shortcut, replace-in-place to google.com, every page, full ARIA + tooltip on cursor devices. UK Refuge / Women's Aid / gov.uk convention.
- Logo SVG received from client and saved at [src/assets/logo-white.svg](../../src/assets/logo-white.svg) — single asset, mark-left-of-wordmark. Resolves arrangement question by construction. Navy variant (`#0E1628`) to be generated for light-surface use; white variant retained for dark surfaces (footer / cal.com band).
- spec.md updated: new Must Have items (safe-exit, WCAG AA, medium-optimised, `clamp()`, containers); new Acceptance Criteria (axe-core zero violations, safe-exit reachable on every page)

### 2026-05-12 — Visual Layering iteration round 2
- Client iteration on consolidated direction. Layered into [visual-layering-plan.md](visual-layering-plan.md) as "Iteration round 2".
- Motion locked: 10% hover darken/lighten, state-change icon animation, arrow nudge on hover, reduced-motion fallbacks
- Red allocation rule: emergency-accent reserved for chrome only (sticky + top-nav CALL + designated emergency banners). Hero CTAs and body buttons must move to navy.
- Mobile sticky never hides — explicit override of Rapid Outreach §5.4 for /contact
- cal.com embed component added with `#232536` frame colour (fourth brand-system surface value — logged as departure)
- Responsive type → `clamp()` formulas locked for six type tokens
- Container system → narrow / default / wide + `clamp()` gutter
- Two new durable memories saved:
  - [[feedback_decision_process_protocol]] — all decisions trace to PM / frontend-design / research; no Claude defaults
  - [[feedback_no_ai_framing_in_responses]] — extends [[feedback_natural_voice]] to chat + planning files
- Hero CTA replacement, logo arrangement, mega-menu trigger, card hover treatment all flagged as frontend-design questions (gated on skill engagement + SVG receipt)

### 2026-05-12 — Phase 0.5 implementation (v1.2.0-pre)

- Resumed from cold-start handoff [.project/rebuild/_START_HERE.md](_START_HERE.md); read full memory + spec/plan/aesthetic/visual-layering/findings stack
- Engaged `webflow-development` + `ux-designer` skills; read `~/.claude/skills/frontend-design.md` directly
- AskUserQuestion at re-entry locked four remaining items: no further iteration, hero CTAs navy solid + navy outline, hero image direction "architectural detail (chambers entrance / Marylebone street geometry)", mega-menu keyboard standard WAI-ARIA (Tab → Enter/Space opens). Logged as iteration round 4 in [visual-layering-plan.md](visual-layering-plan.md).
- **Tokens** [src/tokens.css](../../src/tokens.css): added `--color-interactive-accent` (`#0F4C81`), `--color-focus`, `--color-booking-frame` (`#232536`), `--hover-darken/--hover-lighten` scalars, four motion-duration variants (120 / 150 / 200 / 280ms), six clamp() type sizes, three container widths + clamp() gutter, nav-height + quick-exit-size + z-index scale, MAST-aligned breakpoint names (tiny / small / medium / main / xl).
- **Typography** [src/typography.css](../../src/typography.css): links now use interactive-accent across `:link/:hover/:focus`; hover shifts via `color-mix(in srgb, var(--color-link), #000 var(--hover-darken))`; focus ring uses `--border-focus`; removed `@media (min-width: 992px)` wordmark size escalation (clamp() carries the rest).
- **Components** [src/components.css](../../src/components.css): grew from 308→669 lines. Added skip-link, container classes, `.btn cc-hero-call` (navy solid), `.btn cc-hero-whatsapp` (navy outline), `.btn cc-nav-call` (red chrome CTA), `.quick-exit` (outlined-red top-right), `.site-nav` + `.site-nav__menu`, `.mega-menu` + `.mega-menu__panel/__list/__foot/__col-title` (3-col grid), `.hamburger` + `.drawer` + `.drawer__accordion-list`, `.hero` + `.hero__layout/__media/__content/__ctas` (image-slot hero), `.section.cc-booking` + `.cal-embed` (`#232536` fourth-surface), `.link-arrow` (arrow-nudge on hover), global `*:focus-visible`, card hover (border darkens 10%). Removed `body.cc-on-contact .sticky-emergency-bar { display: none }` per iteration 2 override.
- **JS** [src/site.js](../../src/site.js): added mega-menu open/close (pointer hover, touch click, keyboard Enter/Space, 280ms close grace), hamburger drawer toggle + drawer-internal accordion, quick-exit double-Esc-within-1000ms with single-Esc still closing open menus, ARIA polite live-region announcing CALL/WhatsApp clicks. Existing sticky-bar reveal + WhatsApp prefill + tel-link assurance preserved.
- **Logo** [src/assets/logo-navy.svg](../../src/assets/logo-navy.svg) generated via `sed s/fill="white"/fill="#0E1628"/g` from the supplied white SVG.
- **Build** ran `npm run build`: `dist/bundle.css` 49.3KB / `dist/bundle.min.css` 22.5KB / `dist/site.min.js` 5.4KB. Build dependencies cleancss-cli + terser already in package.json.
- **Preview** rebuilt as multi-breakpoint chrome — [dist/preview.html](../../dist/preview.html) shows three live iframes (1280 / 768 / 390) side-by-side; [dist/preview-content.html](../../dist/preview-content.html) is the shared chambers site rendered.
- **Docs** updated: [aesthetic.md](aesthetic.md) rewritten with departure callouts per `feedback_callout_departures` (red allocation, fourth surface, clamp type, containers, motion expansion, quick-exit, cal.com band, hero image, WCAG 2.2 AA, sticky-never-hides, logo SVG); [DECISION_LOG.md](../../DECISION_LOG.md) appended with 20 Phase 0.5 entries; [visual-layering-plan.md](visual-layering-plan.md) appended with iteration round 4.
- **Not yet:** package.json still at v1.1.0; not pushed; no Webflow MCP work. Awaiting user visual review on `dist/preview.html` before either step.

## Next session

- User opens [dist/preview.html](../../dist/preview.html) and reviews all three breakpoints
- Iterate on any visual feedback (likely focal points: hero image placeholder text, mega-menu density, mobile sticky+quick-exit spacing, booking band copy)
- On explicit user authorisation only:
  - Bump [package.json](../../package.json) version to `1.2.0`
  - Commit, tag `v1.2.0`, push to GitHub main
  - Verify jsDelivr resolves the new tag (https://cdn.jsdelivr.net/gh/mxhfxz/astons-law-chambers@v1.2.0/dist/bundle.min.css)
- Then Webflow MCP work:
  - Update [webflow-injection.md](webflow-injection.md) with new Variable mappings (interactive-accent, booking-frame, hover scalars, motion durations, container tokens)
  - Mirror new tokens into Webflow Variable collections via `variable_tool`
  - Update head + footer injection version pins to `@v1.2.0`
  - MAST smoke test on staging site
- Resume Phase 1 (Foundation, conversion, compliance) from [plan.md](plan.md)
