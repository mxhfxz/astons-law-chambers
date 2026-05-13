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

### 2026-05-12 — v1.2.0 pushed + Webflow injection complete

- Visual review of multi-breakpoint preview: green
- Bumped [package.json](../../package.json) 1.1.0 → 1.2.0, committed, tagged `v1.2.0`, pushed `mxhfxz/astons-law-chambers` main
- jsDelivr `immutable`-cache verified: `bundle.min.css` 22.5KB, `site.min.js` 5.4KB, `logo-navy.svg` 19KB all resolve at the v1.2.0 tag
- Identified Astons Webflow site: `69f88bcd977766f39d880a96` ("Astons Law Chambers", custom domain `www.astonslaw.com`, MAST template populated)
- **User decision on MAST conflict:** overwrite conflicting MAST Variables to match Astons direction. Three MCP batches:
  - **Batch 1 (3 variables):** Fonts/Primary `Inter` → `IBM Plex Sans`; Fonts/Heading `Fraunces` → `IBM Plex Sans`; Primary/Navy `#232536` → `#0E1628`
  - **Batch 2 (1 create + 8 updates):** Created `Astons/Interactive Accent` `#0F4C81`; neutralised Secondary/Yellow → `#E4E4E7`, Secondary/Peach → `#F4F4F5`; aligned Secondary/Blue → `#0F4C81`; realigned five neutral greys (Light Gray, Mid Gray 1+2, Dark Gray, Black) to match Astons grey scale; Neutral/Black → `#0E1628`
  - **Batch 3 (7 updates):** H1+H2 font weight 500 → 700; H3-H6 + Eyebrow font weight 500 → 600. Match locked weight-contrast direction.
- **Custom code paste:** user manually pasted head + footer Custom Code blocks into Webflow Project Settings (MCP cannot reliably set project-level Custom Code). Bundle now loads from `cdn.jsdelivr.net/gh/mxhfxz/astons-law-chambers@v1.2.0/dist/bundle.min.css` and `site.min.js`.
- MAST smoke test: user-confirmed green. Variables panel shows new values, Preview mode renders correctly, no console errors.
- **Not done:** publishing to `astons-law-chambers.design.webflow.com` or to `www.astonslaw.com` — user did not authorise. Designer state is updated but not yet published.
- **Carry forward to next session:**
  - Per-page Custom Code (sticky bar markup, quick-exit, top nav with mega-menu, drawer, cal.com band) for each emergency-intent + advisory page — see [webflow-injection.md](webflow-injection.md) §3
  - IBM Plex Sans added to Webflow Project Settings → Fonts as a Google Fonts custom font so the Designer canvas renders it (optional but recommended for in-Designer accuracy)

### 2026-05-12 — Phase 1 §5.1 chrome injection opened, then checkpointed

- Resumed from [_START_HERE.md](_START_HERE.md); read full memory + spec/plan/aesthetic/visual-layering/findings/progress/webflow-injection stack
- Engaged TodoWrite + ToolSearch loaded webflow_guide_tool, data_sites_tool, data_pages_tool, data_components_tool, page_tool (de_page_tool), element_tool, element_builder, de_component_tool, component_builder, whtml_builder, element_snapshot_tool, style_tool
- AskUserQuestion round 1: Phase 1 start = chrome injection (over copy unblock / compliance fixes)
- AskUserQuestion round 2: chrome mechanism = Webflow Components (over per-page native elements / per-page Custom Code)
- Webflow MCP discovery (REST):
  - **Page inventory** (10 pages, all MAST template — none of the Astons named pages exist yet): `/` "Mast - Style Guide" (id `69f88bd1977766f39d880b04`), `/styles`, `/components` (id `69f88bd1977766f39d880b08`), `/basic-layouts`, `/inspired-layouts`, `/blog` CMS template, `/404`, `/401`, plus two drafts
  - **Component inventory** (37 MAST components): Global = `Nav` (`2bb3e920-91be-def7-1509-d38c2b3acc09`), `Footer` (`e2fa2670-5bca-38f1-9fbd-3bf287b462f6`), `Nav Banner`, `Custom Code`, `Theme Toggle`. Layout, Content, Interactive, Nested groups all populated.
- AskUserQuestion round 3: Phase 1 §5.1 scope = chrome components only (over chrome + Astons page skeletons / switch to copy unblock)
- Wrote [phase1-chrome-injection-plan.md](phase1-chrome-injection-plan.md) — 11-call MCP sequence, mechanism rationale, what this session does NOT do, carry-forward open items, authorisation gate
- AskUserQuestion round 4: build authorisation = authorise as planned (over keep MAST Nav on Home / modify before start)
- MCP execution started:
  - **T1** `de_page_tool > switch_page` Home → success
  - **T2** `element_tool > query_elements` for body + MAST Nav instance → returned 0 + 0 matches; switched to `get_all_elements` to inspect tree. Discovered:
    - Body id `63f833ef451855a840b8a159` (component `69f88bd1977766f39d880b04`)
    - **`page-wrapper` div** id `d0cdf086-d32f-a18a-0349-54210ab403f1` (classes `page-wrapper` + `u-minh-100vh`) — natural insertion point for chrome
    - `main.page-main` id `f368e3da-252a-f5d0-10b7-7421290a9aee`
    - **No MAST Nav instance on Home** (Home is the MAST Style Guide page, not a representative production page) — T7 (remove MAST Nav from Home) is unnecessary
    - One existing `Custom Code` ComponentInstance on Home — leave in place (MAST head/script-slot mechanism)
  - **T3** `whtml_builder` Astons Header HTML (single root `<header>` wrapping skip-link + quick-exit + site-nav with mega-menu + drawer) into `page-wrapper` (prepend) → SUCCEEDED structurally. Returned new header element id `aa414bb2-885b-ef8d-4d18-da5eaa7188da`. Type `Block`, tag `header`, `styleNames: []`.
  - **T3-verify** `element_tool > query_elements` scoped to the new header, four queries (tag=nav, style=site-nav, style=skip-link, attr=data-quick-exit). Result: nav tag preserved, aria-label preserved, `data-quick-exit` attribute preserved on the (now-`Link`-typed) quick-exit element with full aria-label and title. **BUT classes returned 0 matches in style filter.** Whtml stripped the class attributes.
  - **T3-verify-2** `style_tool > query_styles` for six chrome class names (skip-link, quick-exit, site-nav, mega-menu, drawer, cc-nav-call). Result: only `nav-skip-link` matched (substring on existing MAST style); the six chrome classes do not exist as Webflow Styles. **Confirmed: whtml_builder strips `class` attributes that don't pre-exist as Webflow Styles.**
- AskUserQuestion round 5: fix path = pre-create Webflow Styles, then re-whtml (over HtmlEmbed inside Components / per-page Custom Code pivot)
- AskUserQuestion round 6: context strategy = stop now and checkpoint (over push through to Astons Header / push through everything with compaction risk)
- **Designer state at checkpoint:** broken Astons Header element (id `aa414bb2-885b-ef8d-4d18-da5eaa7188da`) sits at the top of Home `page-wrapper`. No styling, no Webflow Style entries. Needs removal next session before re-whtml.
- **Webflow Variables, Project-Settings Custom Code, MAST Variable overwrites** — all unchanged from previous session. Designer not republished.
- **Repo state:** clean working tree before this checkpoint write. After this entry: progress.md, phase1-chrome-injection-plan.md, DECISION_LOG.md updated.
- **Carry-forward for next session:** see [phase1-chrome-injection-plan.md](phase1-chrome-injection-plan.md) §7 (revised execution sequence). 35-style pre-creation list locked. ~40-call sequence to land Astons Header + Sticky Emergency Bar + Cal Booking Band components.

### 2026-05-13 — Phase 1 §5.1 chrome injection completed

- Resumed from [_START_HERE.md](_START_HERE.md). Read memory + spec / plan / aesthetic / visual-layering / findings / progress / webflow-injection / phase1-chrome-injection-plan in order
- AskUserQuestion round 1: **Execute §5.1 as planned** (over copy-unblock pause / re-open-fix-path-decision)
- `webflow_guide_tool` confirmed the fix-path basis: "Always create styles first if you plan to apply them while creating the element"

**Section A — pre-create chrome Webflow Styles (~35 calls)**
- Custom property `--astons-marker` rejected ("Invalid style property"); pivoted to `box-sizing: border-box` as the no-op marker. Webflow's reset already universally applies that, so no production CSS override conflict
- `skip-link` already existed (MAST `nav-skip-link` lineage); skipped per plan
- 34 new styles created across header chrome (28 + `astons-header` wrapper), sticky bar (3), cal band (3). All returned stable IDs

**Section B — `element_tool > remove_element`** on broken header (id `aa414bb2-885b-ef8d-4d18-da5eaa7188da`). Success

**Section C — `whtml_builder` Astons Header re-insert** at Home `page-wrapper` (`d0cdf086-d32f-a18a-0349-54210ab403f1`), prepend. New element id `d7344db6-5f97-b73c-2238-b8ad3715d178`. Root returned `styleNames: ["astons-header"]` — class retention confirmed at the root

**Section D — class-preservation verification** — `query_elements` scoped to the new header for `site-nav` / `mega-menu` / `drawer`: 5 / 23 / 4 matches. Triple combos preserved (`["btn","cc-nav-call","site-nav__cta"]`, `["btn","cc-nav-call","drawer__call"]`). `tel:` link types, `data-*`, `aria-*`, `hidden`, and `id` attributes all preserved through `whtml_builder`. Fix path validated

**Section E — `de_component_tool > transform_element_to_component`** "Astons Header", group `Global`, `replace: true`. Component id `c49809ea-8410-000c-2573-ab6e3c3d998c`

**Section F — Sticky Emergency Bar on Home**
- F.1 `whtml_builder` append at `page-wrapper`. Element id `e4b7ce9e-e4f3-84e7-c327-0405ee053e80`. Root `styleNames: ["sticky-emergency-bar"]`
- F.2 verification: 2× `sticky-emergency-bar__link` (phone + WhatsApp), 1× `sticky-emergency-bar__divider`. `tel:+447922247999` link type, `data-phone-link`, `data-whatsapp-context="homepage"` preserved
- F.3 transform to "Astons Sticky Emergency Bar", group `Global`. Component id `3afef828-2a68-0ed8-3fab-a37c95bc81f2`

**Section G — Cal Booking Band on /components**
- G.1 `switch_page` to Components (`69f88bd1977766f39d880b08`)
- G.2 `query_elements` for `page-wrapper` returned 18 matches (MAST reference page with multiple wrapper demos). Used the first match (`25207310-b4d0-a7d3-fd35-cee84c0b4552`) as the insertion target
- **STOP signal raised** — `webflow-injection.md` §3.6 cal-band copy carried three operational claims ("30-minute consultation", "consultation is paid", "clerks confirm fees in advance"). None confirmed in-session, none in [[verified_facts]]. AskUserQuestion round 2: user picked **neutral placeholder copy** (over halt / ship-verbatim)
- G.3 `whtml_builder` neutral markup: `<section class="section cc-booking"><div class="container cc-default"><span class="eyebrow">Consultation</span><h2>Book a consultation.</h2><div class="cal-embed" role="region" aria-label="Calendar booking"></div></div></section>`. No body paragraph, no duration / fee / clerks claim. Element id `bd324e76-60b0-7378-9406-0d118136f72a`
- G.4 verification: `container cc-default` combo, `cal-embed` solo, MAST `eyebrow` solo — all preserved with ARIA on the embed wrapper
- G.5 transform to "Astons Cal Booking Band", group `Global`. Component id `779964a1-7df9-7fce-2101-9a42d5299ecf`

**Section H — QA snapshot skipped.** Designer canvas does not execute Project Settings head Custom Code; snapshot would show unstyled markup. The `query_elements` verification at each section was the load-bearing check

**Total MCP calls this session:** 1 guide + 34 style creates + 1 remove + 2 whtml header/sticky + 1 query header verify + 2 transform header/sticky + 1 switch_page + 1 query wrapper + 1 whtml cal band + 1 query sticky verify + 1 query cal verify + 1 transform cal = ~47. Pacing held — one action per turn, no Read / Edit / Bash / TodoWrite between MCP calls

**Webflow Designer state at session close:**
- Three Global components registered: Astons Header, Astons Sticky Emergency Bar, Astons Cal Booking Band
- Home (`69f88bd1977766f39d880b04`) carries Astons Header (prepend) + Astons Sticky Emergency Bar (append) on `page-wrapper`
- Components page (`69f88bd1977766f39d880b08`) carries the Astons Cal Booking Band instance for definition only
- **Not published.** Staging (`astons-law-chambers.design.webflow.com`) and production (`www.astonslaw.com`) still on the pre-rebuild MAST state until explicit publish authorisation

**Carry-forward for next session** (consolidates phase1-chrome-injection-plan.md §6 + open copy gates):
1. **Astons Footer spec round.** No spec exists; needs an AskUserQuestion + ux-designer pass before build
2. **Astons page skeletons.** `/contact`, `/about`, `/direct-access`, `/consultation`, `/what-to-expect`, `/practice-areas` (index), 10 pillars at `/practice-areas/*`, `/compliance/complaints-policy`. Each gets Astons Header + Sticky Bar instances on creation
3. **Hero literal-truth round.** AskUserQuestion to lock Ghulam's commitments on availability, response times, first-call policy, fees-on-application. Unblocks §5.2 (homepage rewrite) and Phase 2 pillar copy. Per [[feedback_flag_imported_truth_claims]]
4. **Cal embed real copy + iframe snippet.** Replaces the neutral placeholder in the Astons Cal Booking Band component once Ghulam confirms the booking process and the cal.com link is finalised
5. **Hero image asset.** Architectural-detail subject for homepage hero slot (Phase 0.5 iteration 4 lock)
6. **Schema injection** (Phase 1 §5.5) — `LegalService` + `Person` + `Service` JSON-LD via `schema-markup` + `seo-schema` skills
7. **Publish authorisation** — staging first, then production — only after Astons page skeletons + Footer are in
8. **Compliance fixes** (Phase 1 §5.4) — 301 `/compliance/complaints` → `/compliance/complaints-policy`; add Barristers' Register + Legal Ombudsman links
9. **`webflow.js` suppression verification** (Phase 1 §5.6) via DevTools coverage tab once staging publishes

### 2026-05-13 — v1.3.0 hover micro-interaction rework

User-led design correction. The Phase 0.5 link rule (text-decoration-thickness 1px → 2px on `:hover` plus a 10% colour shift) decoupled the hit area from the visual response: the cursor could be deep into a padded link box while the underline appeared far below. Reworked the entire link / micro-interaction system through frontend-design + ux-designer scaffolding ([[feedback_decision_process_protocol]]).

**Tokens** [src/tokens.css](../../src/tokens.css):
- Added `--color-link-bg` (alias to `--color-grey-100` `#F4F4F5`) — single source of truth for the hover surface
- Added four named easings:
  - `--ease-out-quick` `cubic-bezier(0.32, 0.72, 0, 1)` — cursor-led
  - `--ease-out-soft` `cubic-bezier(0.16, 1, 0.3, 1)` — page-led entries, critically damped
  - `--ease-out-emphasised` `cubic-bezier(0.2, 0, 0, 1)` — system reveals with displacement (was the single `--motion-ease`)
  - `--ease-in-out-snappy` `cubic-bezier(0.4, 0, 0.2, 1)` — state morphs
- Retained `--motion-ease` as a back-compat alias to `--ease-out-emphasised`
- Retuned duration token meanings: `nudge` 120ms (hover responses), `quick` 200ms (state morphs — was 150ms), `fast` 240ms (page-led entries — was 200ms), `grace` 280ms (system reveals + close grace, unchanged)

**Typography** [src/typography.css](../../src/typography.css) — global `a` rules rewritten:
- Static 1px underline at rest in `--color-link` (identifiability per Visual Practices Finding 2); no thickness shift on hover
- Tiny inline padding (`0.05em 0.15em`) + negative margin (`-0.15em`) + `border-radius: 2px` + `box-decoration-break: clone` so multi-line wraps fill correctly without layout shift
- Hover: `background-color: var(--color-link-bg)` + 10% darken on colour, `120ms --ease-out-quick`
- Focus ring rule preserved

**Components** [src/components.css](../../src/components.css):
- Top-nav menu items (`.site-nav__menu > li > a/button`): hover bg-fill across a padded box (`padding: space-2 space-3`, `border-radius: 2px`); gap on `.site-nav__menu` reduced from `space-6` → `space-2` to absorb the new padding-inline; colour stays static
- Mega-menu links (`.mega-menu__link`): bg-fill + 2px inset-left accent bar in `--color-interactive-accent`; `box-shadow` animates from `inset 0 0 0` to `inset 2px 0 0` so the bar grows in
- Mega-menu foot links (`.mega-menu__foot a`): bg-fill on a padded box
- Drawer list rows (`.drawer__list a/button`): full-row bg-fill, `padding: space-3 space-3`, `margin-inline: -space-3` extends the fill 12px into the drawer gutter; border-bottom hairline retained
- Drawer accordion practice-area items (`.drawer__accordion-list a`): same bg-fill + 2px inset accent-bar pattern as the desktop mega-menu
- `.link-arrow`: bg-fill on the padded box PLUS the existing 4px arrow nudge — two coupled cues on one surface
- All button transitions retuned from `--motion-duration-quick` `--motion-ease` to `--motion-duration-nudge` `--ease-out-quick` — hover response 30ms snappier, cursor-coupled curve
- `.has-mega__chevron` rotation: `--motion-duration-quick` `--ease-in-out-snappy`
- `.hamburger__bars` morph: `--motion-duration-quick` `--ease-in-out-snappy`
- `.mega-menu` open animation: `--motion-duration-quick` `--ease-out-emphasised`
- `.drawer` slide-in: `--motion-duration-grace` (280ms, was `fast` 200ms) `--ease-out-emphasised`
- `.sticky-emergency-bar` entry: `--motion-duration-fast` (240ms) `--ease-out-soft`
- `.card.cc-bordered` border-darken on hover: retuned to `--motion-duration-nudge` `--ease-out-quick`

**Docs**:
- [aesthetic.md](aesthetic.md) Motion section rewritten with the four easings + the per-interaction routing table; departure callout for the retired underline-shift rule
- [aesthetic.md](aesthetic.md) Forbidden list adds "line-thickness hover shifts" and "single system easing curve"

**Build**: bumped [package.json](../../package.json) 1.2.0 → 1.3.0, ran `npm run build`. Output: `dist/bundle.css` 56KB / `dist/bundle.min.css` 25.5KB (was 22.5KB) / `dist/site.min.js` 5.4KB unchanged. No JS edits — all motion lives in tokens + class rules.

**Not yet:**
- Local preview at [dist/preview.html](../../dist/preview.html) — user-side visual validation before push
- `git commit` + `git tag v1.3.0` + `git push origin main --follow-tags`
- Webflow Project Settings → Custom Code: refresh head + footer pins from `@v1.2.0` → `@v1.3.0` (manual paste — MCP cannot reliably set project-level Custom Code)

### 2026-05-13 — v1.3.0 iteration 2 — preview review feedback applied

User-led design iteration on the v1.3.0 preview. Six tweaks plus a logo-hover refinement; an explicit "Home" nav item identified for a separate Webflow MCP batch.

**Mega-menu column titles** [src/components.css](../../src/components.css) — colour changed from `--color-caption` (grey-600) to `--color-brand-primary` (navy); added a 1px bottom hairline rule + `padding-bottom: var(--space-3)`. Same eyebrow type, decisive header break. Resolves the read-as-just-another-link cognitive disconnect.

**Mega-menu column separators** [src/components.css](../../src/components.css) — pseudo-element on `.mega-menu__col:not(:last-child)::after`, centred in the 48px grid gap. `.mega-menu__col { position: relative }` to anchor the absolutely-positioned line. Doesn't change the grid template.

**Top-nav CALL button → solid navy** [src/components.css](../../src/components.css) — `.btn.cc-nav-call` background-color from `--color-emergency-accent` to `--color-brand-primary`; hover from `--color-emergency-hover` to `color-mix(navy, #fff 18%)`. Red allocation tightens — only the sticky bottom-bar is solid red on every page now. Departure flagged in [aesthetic.md](aesthetic.md).

**`--hover-lighten` 10% → 18%** [src/tokens.css](../../src/tokens.css) — dark navy `#0E1628` lifts to `#34394C` on hover, clearly responding. Solid hero CTAs and cc-advisory + the new navy cc-nav-call now have hover amplitude comparable to the outline button's full inversion. Side-by-side paired CTAs read as coherent.

**Arrow nudge timing** [src/components.css](../../src/components.css) — `.link-arrow::after` duration bumped from `--motion-duration-nudge` (120ms) `--ease-out-quick` to `--motion-duration-quick` (200ms) `--ease-out-emphasised`. The shorter snap-under-cursor curve felt right for link bg-fills but read as a snap for a translate. Explicit `transform: translateX(0)` at rest stabilises the reverse transition.

**Quick-exit placement** [src/components.css](../../src/components.css) — `top` recomputed from `calc(nav-height + space-3)` (below the nav, floating in white) to `calc((nav-height - quick-exit-size) / 2)` (centred vertically in the nav band). Reads as nav chrome, not stray UI. At ≤991px the right offset shifts to `calc(gutter + 44px + space-3)` to clear the hamburger. `position: fixed` retained — reachability invariant preserved. Departure flagged in [aesthetic.md](aesthetic.md).

**Logo bg-fill hover** [src/components.css](../../src/components.css) — `.site-nav__brand` gains the same chrome-link hover language (`--color-link-bg`, `--motion-duration-nudge`, `--ease-out-quick`). Reinforces the logo as a clickable home affordance, paired with the planned explicit "Home" nav item.

**Docs**:
- [aesthetic.md](aesthetic.md) Red allocation rule rewritten with v1.3.0 iteration 2 departure callout
- [aesthetic.md](aesthetic.md) Buttons table updated (`cc-nav-call` now navy)
- [aesthetic.md](aesthetic.md) Motion / Hover paragraph updated (hover-lighten 18%, arrow nudge timing)
- [aesthetic.md](aesthetic.md) Quick-exit section updated with placement departure callout

**Build**: ran `npm run build` again. Output: `dist/bundle.css` 59.4KB / `dist/bundle.min.css` 26.2KB (was 25.5KB after iteration 1) / `dist/site.min.js` 5.4KB unchanged. No version bump — still under the v1.3.0 banner pre-ship.

**Pending — separate Webflow MCP batch:**
- Add explicit "Home" nav item as the first entry in `.site-nav__menu` and `.drawer__list` within the Astons Header component (id `c49809ea-8410-000c-2573-ab6e3c3d998c`). gov.uk convention; reinforces the logo→home cue for the cognitive-tunnelling audience. Requires `de_component_tool > open_component_view` + `whtml_builder` insert + close. Also updates [webflow-injection.md](webflow-injection.md) §3.3 reference markup
- Decision: do this AFTER the v1.3.0 bundle ships (so the chrome looks right with the new hover treatment when the new item is inserted), or BEFORE (so the bundle push + component edit + Webflow pin refresh ship together). User to choose

### 2026-05-13 — v1.3.0 iteration 3 — preview-2 feedback applied (seven changes, plus quick-exit revised mid-iteration)

Second round of user-led design iteration on the v1.3.0 preview. Larger change-set than iteration 2; one item (the quick-exit placement) revised twice within this iteration.

**Top-nav CALL → red, label "Call now"** [src/components.css](../../src/components.css) — reverts iteration 2's navy treatment. The shorter label fits the desktop row without phone-number sprawl. Label change is HTML markup — handled in the next Webflow MCP batch.

**Quick-exit — small black pill** [src/components.css](../../src/components.css) — re-architected twice in this iteration:
1. First attempt: full-width sticky sub-nav banner (rejected on review)
2. Final: small black pill, `position: fixed; top: calc(nav-height + 0.5rem); left: var(--gutter); z-index: 9999`. Width is content-driven (label + padding). 44px tall (WCAG floor; safety never compromises tap targets). Anchored below the nav's left edge, aligned with the logo

The pill dominates every other surface via z-index 9999 — sticky-bar, mega-menu, drawer, future 3rd-party widgets all sit beneath it. Esc-twice-within-1000ms + `window.location.replace('https://www.google.com')` action both preserved.

**Primary buttons invert on hover** [src/components.css](../../src/components.css) — `.btn.cc-hero-call` and `.btn.cc-advisory` lose their bg-fill on hover (transparent), text shifts to navy, an `inset 0 0 0 2px navy` box-shadow (invisible at rest, same colour as bg) becomes visible against the new transparent surface. End state mirrors the secondary outline button's at-rest treatment. Unifies the hover language across the primary/secondary pair.

**.link-arrow inverts on hover** [src/components.css](../../src/components.css) — extends the invert pattern to button-like text links. At rest: transparent + navy text. On hover: navy fill + white text + 4px arrow nudge.

**Hamburger restructure for clean X** [src/components.css](../../src/components.css) — all three bars share `top: 6px` (vertical centre); at rest they `translateY(±6px)` to top/bottom; on open they `translateY(0) rotate(±45deg)`. Single transform per bar; previous rule animated `top` AND `transform` separately, producing the awkward curved path. Duration bumped to `--motion-duration-grace` (280ms) with `--ease-in-out-snappy`.

**Chevron morph via `scaleY(-1)`** [src/components.css](../../src/components.css) — `.has-mega__chevron` switches from `rotate(180deg)` to `scaleY(-1)`. V flattens to a horizontal line at scaleY=0 then unfolds as ^. Same 280ms grace duration with snappy ease.

**Drawer accordion chevron added** [src/components.css](../../src/components.css) — `[data-drawer-accordion]::after` pseudo-element with an inline SVG data URI. No HTML markup change required. Uses the same scaleY(-1) morph. Drawer list rows switched to flex (justify-content: space-between) so the chevron pins to the right edge. Touch users now see a visual cue that the row opens further.

**Logo min-width + remove <480px mark-only crop** [src/components.css](../../src/components.css) — `.site-nav__brand img` gains `min-width: 148px` (native SVG width); the `@media (max-width: 479px)` override that cropped to mark-only is removed. With the top-nav CTA hidden at ≤991px and the safety pill anchored below the nav, nav real-estate is no longer the constraint.

**Top-nav CTA hide extended to ≤991px** [src/components.css](../../src/components.css) — phone + WhatsApp are in the sticky bottom-bar on every touch viewport. Grid template collapses to three columns (logo / 1fr / hamburger) at ≤991px.

**Preview-content.html updated to reflect future Webflow component DOM** [dist/preview-content.html](../../dist/preview-content.html) — Home item added as first entry in `.site-nav__menu` and `.drawer__list`. CALL label changed to "Call now". `.quick-exit` moved from before the nav to after the nav (so screen-reader / keyboard focus order is nav → safety pill). Preview now matches what the Webflow Astons Header component will look like after the next MCP batch.

**aesthetic.md** updates: Red allocation rule revised; Buttons table updated; Quick-exit section re-architected; Motion section state-morph paragraph rewritten; Hover paragraph rewritten with the invert-on-hover pattern.

**Build**: `npm run build`. Output: `dist/bundle.css` ~60KB / `dist/bundle.min.css` 26.7KB (was 26.2KB after iteration 2) / `dist/site.min.js` 5.4KB unchanged. No version bump — still under the v1.3.0 banner pre-ship.

**Webflow MCP batch (pending, post-push):**
- Re-order DOM in the Astons Header component: move quick-exit from before nav to after nav
- Add Home item as first `<li>` in `.site-nav__menu` and `.drawer__list`
- Change cc-nav-call label from `CALL 07922 247 999` to `Call now` (nav + drawer)
- Update [webflow-injection.md](webflow-injection.md) §3.3 reference markup to match

### 2026-05-13 — v1.3.0 iteration 3 + 4 — bug-fix marathon, audit, and ship-gate

Multiple rapid iteration rounds on the v1.3.0 preview. Consolidated here so the next session can resume cleanly.

**Iteration 3 changes** (after the user-led design iteration on the v1.3.0 preview-2):
- Mega-menu column titles changed from caption-grey to brand-primary navy + 1px bottom hairline rule (resolves the read-as-just-another-link feel)
- 1px vertical separators between mega-menu columns via pseudo-element centred in the 48px grid gap
- Top-nav CALL button reverted from navy back to solid red (iteration 2's "two solid reds over-saturate" reasoning overruled by user direction); label shortened to "Call now"
- `--hover-lighten` bumped from 10% to 18% so dark navy buttons clearly respond on hover
- Arrow nudge duration bumped from 120ms `--ease-out-quick` to 200ms `--ease-out-emphasised` (smoother glide vs snap on translates)
- Quick-exit moved from below-nav floating button to centred-vertically-in-nav-band (first revision)
- Logo `min-width: 148px`; `<480px` mark-only crop removed
- Top-nav CTA hide extended from ≤767px to ≤991px (full touch range)
- Drawer accordion gets a CSS-only chevron via `[data-drawer-accordion]::after` with embedded SVG data URI
- Chevron state morph changed from `rotate(180deg)` to `scaleY(-1)` (vertical-mirror morph, V → ^ through flat line) for both mega-menu and drawer accordion
- Hamburger restructured for clean X morph (all bars share `top: 6px`, `translateY(±6px)` at rest, `translateY(0) rotate(±45deg)` on open, single transform per bar, 280ms `--ease-in-out-snappy`)

**Iteration 4 changes — bug-fix rounds from the iteration-3 preview**:
- **Bug 1 (hover pair collapse)** — abandoned the iteration-3 invert pattern (primary → outline-look, secondary → solid-fill caused both buttons to look identical when either was hovered). New pattern: parallel hover responses. Primary buttons lighten 18% + 2px Carbon-blue inset ring; secondary buttons get subtle bg tint + border-recolour to Carbon-blue. Both buttons get the SAME Carbon-blue accent cue while preserving at-rest distinction
- **Bug 2 (cc-nav-call visible on touch)** — `.btn.cc-nav-call { display: inline-flex }` was beating `.site-nav__cta { display: none }` on specificity. Fixed with `.btn.cc-nav-call.site-nav__cta { display: none }` (0,3,0 specificity)
- **Bug 4 (sticky-nav padding jitter)** — UA default `body { margin: 8px }` was in-flow at scroll 0 but consumed by sticky positioning on scroll. Reset to `body { margin: 0 }` — chrome state now identical at every scroll position
- **Quick-exit re-architected twice** (mid-iteration revisions): first as a full-width sticky black sub-nav banner under the nav (rejected on review), then as a small black bottom-right pill anchored 4px from viewport edges, hides via `body:has(.drawer.is-open)` when the drawer is open. Label "Leave website" + alert-circle SVG icon, 36px tall, z-index 9999
- **Nav layout restructure** — `.site-nav__inner` changed from grid (`auto 1fr auto auto`) to flex with `margin-right: auto` on `.site-nav__brand`. Cleanly pushes everything else flush-right
- **Card overscroll fix** — added `.card-grid` class with `grid-template-columns: repeat(auto-fill, minmax(min(260px, 100%), 1fr))`. The `min(260px, 100%)` lets tracks shrink below 260px when the container is narrower, eliminating overflow at all viewports
- **Drawer overscroll fix** — added `html { overflow-x: clip }` to neutralise the drawer's `translateX(100%)` off-screen position (which was creating 360px of horizontal scroll). `clip` over `hidden` so `position: sticky` keeps working
- **Box-sizing global reset** — `*, *::before, *::after { box-sizing: border-box }` added. Was missing from Phase 0. Fixed: `.drawer__call width: 100%` overflow, `.drawer__list a width: 100%` overflow, every card with padding overflowing its 1fr grid track. One-line fix resolved all visible gutter inconsistencies the user flagged
- **Hero CRO reorder** — removed `order: -1` on `.hero__media` at touch viewports. Content-then-image stack on mobile/tablet keeps the conversion path (eyebrow + h1 + dual CTAs + regulator line) in the opening fold

**preview-content.html** updated to mirror the future Webflow component DOM:
- Home item added as first entry in `.site-nav__menu` and `.drawer__list`
- CALL label changed to "Call now" in nav and drawer
- `.quick-exit` moved from before nav to after nav (so focus order is nav → safety pill)
- Quick-exit content updated to include alert-circle SVG icon + "Leave website" label
- Cards section grid switched from inline style to `class="card-grid"`

**aesthetic.md** updates: Red allocation rule revised twice (iteration 2 navy → iteration 3 reverted to red); Buttons table updated; Quick-exit section re-architected as small pill (twice); Motion / Hover paragraph rewritten with the parallel-hover-with-Carbon-blue-cue pattern; Forbidden list adds "line-thickness hover shifts" and "single system easing curve"; Hero composition section adds the touch-stack reorder departure.

**Bundle**: `dist/bundle.css` 60KB / `dist/bundle.min.css` 27.1KB / `dist/site.min.js` 5.4KB unchanged. No version bump beyond v1.3.0 — all changes consolidated under that banner pre-push.

### 2026-05-13 — Audit findings (frontend-design + WCAG 2.2 AA pass)

Cross-checked the bundle, preview, site.js, and aesthetic.md against locked direction + feedback memories + WCAG 2.2 AA. Findings:

**Critical (a11y blockers — must fix before production ship):**
1. **Drawer focus management missing** ([src/site.js:153-187](../../src/site.js)) — `initDrawer` toggles state but never moves focus. On open, focus should go to first focusable element inside drawer; on close (Esc / outside-click), focus should return to hamburger toggle. WCAG SC 2.4.3 + 3.2.1.
2. **Drawer focus trap missing** — Tab inside open drawer escapes to page content. Standard modal pattern requires Tab cycle within drawer only. WCAG SC 2.4.3.

**Notable (real issues, not blockers):**
3. Inline `style="..."` repeated 30+ times in the cards section (eyebrow colour, h3 margin, p margin). Should scope under `.card.cc-bordered .eyebrow / h3 / p`.
4. Combo class `class="btn cc-advisory link-arrow"` on the "How Direct Access works" CTA is fragile — two classes with conflicting layout properties. Either drop the combo or create a `.btn.cc-with-arrow` modifier.
5. Hero CTA label "CALL 07922 247 999" is all-caps while sticky bar uses "Call 07922 247 999" and top-nav uses "Call now". Per `feedback_natural_voice` — all-caps reads as theatrical. Align to title case for consistency.
6. Drawer accordion practice-area items are 32px tall — passes WCAG AA, fails AAA (44px). For a crisis audience tapping on mobile, bumping to 44px is more inclusive.
7. WhatsApp `rel="noopener"` should add `noreferrer` — minor privacy upgrade for the safety-sensitive audience.
8. Drawer accordion chevron hardcodes `stroke='%230E1628'` in the data URI. Use `mask-image` + `background-color: currentColor` for brand-colour inheritance.

**Polish (future iterations):**
- Inline styles in footer + hero h2 should move to component classes
- `.site-nav__brand` mixes `margin-inline: -12px` and `margin-right: auto` — works via cascade order but fragile; use explicit margin-left + margin-right
- `.skip-link` uses `top: -200px` while `.u-sr-only` uses the standard visually-hidden pattern; align
- Sticky-emergency-bar full-bleed at ultra-wide viewports (>1600px) has generous column whitespace; could add max-width inner container
- Footer email `info@astonslaw.com` is plain text — making it `mailto:` would help keyboard users (does not violate `feedback_no_email_funnel`)

## Next session — v1.3.0 ship gate

Open work, prioritised:

1. **Audit fixes** — apply the 2 critical drawer-focus items (focus management + focus trap in `initDrawer`) and the 6 notable items. Estimated: ~50 lines of JS for the drawer focus pattern; ~5 CSS / markup edits for the notable items
2. **Doc consolidation** — single pass through aesthetic.md / DECISION_LOG.md / progress.md to align everything under v1.3.0. The current docs have multiple "iteration N" callouts that can be flattened to a single locked direction post-ship
3. **Build, commit, tag, push** — bump no version (still v1.3.0), `git add src/ dist/ preview-content.html package.json` (already at 1.3.0), `git commit`, `git tag v1.3.0`, `git push origin main --follow-tags` — requires explicit user authorisation per STOP signal §9
4. **Webflow pin refresh** — user manually updates Project Settings Custom Code head + footer pins from `@v1.2.0` → `@v1.3.0` (MCP cannot reliably set project-level Custom Code)
5. **Webflow MCP batch** — DOM reorder in Astons Header component (quick-exit moves from before nav to after nav); add Home item to nav menu + drawer list; change cc-nav-call label "CALL 07922 247 999" → "Call now"; update webflow-injection.md §3 reference markup to match
6. **Resume Phase 1** per [plan.md](plan.md) — §5.4 compliance fixes, §5.5 schema injection, §5.7 security headers, §5.8 live mobile QA, §5.9 CrUX/PageSpeed baseline

**Webflow Designer state at checkpoint (unchanged from 2026-05-13 morning):**
- 3 Global components: Astons Header (`c49809ea-…998c`), Astons Sticky Emergency Bar (`3afef828-…81f2`), Astons Cal Booking Band (`779964a1-…9ecf`)
- Home page (`69f88bd1977766f39d880b04`) carries Header + Sticky Bar instances
- Components page (`69f88bd1977766f39d880b08`) carries the Cal Booking Band instance for definition only
- Project Settings Custom Code still pinned at `@v1.2.0`
- Not published — staging + production both on pre-rebuild MAST state

**Carry-forward copy-layer open questions** (still unresolved):
- Ghulam's literal-truth commitments on availability + response time before any hero copy ships ([[feedback_flag_imported_truth_claims]])
- Cal Booking Band real copy + cal.com iframe snippet to replace the neutral placeholder on the component
- Verifiable credentials beyond verified_facts.md (Inn, year of call, BSB number, panel grades, reported cases) — none invented; only added on direct user confirmation
- Hero image specific subject (architectural-detail direction locked; specific subject TBD before homepage build)
- Real verified cases for anonymised case examples (Hansard / BAILII links only)

## Next session — Phase 1 continued

Phase 1 §5.1 (per-page chrome) **closes** as Webflow Components this session — see the 2026-05-13 entry above for the carry-forward list (Footer spec, page skeletons, hero literal-truth round, cal embed real copy, schema, compliance fixes, publish, etc.).

Remaining Phase 1 items still ahead (per [plan.md](plan.md) §1.7–§1.14, not yet in the 2026-05-13 carry-forward):
- **§5.7 Security headers** — HSTS preload, CSP (script-src includes `cdn.jsdelivr.net`), `nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`. Configure via Webflow hosting panel — gates on a Webflow plan that exposes those controls
- **§5.8 Live mobile QA** — tap targets, `tel:` and `wa.me/` native resolution, INP measurement on real hardware. Gates on publish
- **§5.9 CrUX / PageSpeed baseline** — pre/post-rebuild snapshot for comparison. Gates on publish + `seo-google` skill engagement

After Phase 1: Phase 2 — ten practice-area pillars at 1,800–2,500 words each.

### Carry-forward open questions (still unresolved at copy layer)

- Ghulam's literal-truth commitments on availability + response time before any hero copy ships (per [[feedback_flag_imported_truth_claims]])
- Cal Booking Band — booking process, fees-on-application policy, duration framing — all needed to replace the current neutral placeholder copy on the component
- Verifiable credentials beyond verified_facts.md (Inn, year of call, BSB number, panel grades, reported cases) — none invented; only added on direct user confirmation
- Hero image specific subject (architectural detail direction locked; specific subject TBD before homepage build)
- Real verified cases for anonymised case examples (Hansard / BAILII links only)
