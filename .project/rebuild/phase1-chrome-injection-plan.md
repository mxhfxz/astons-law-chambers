# Phase 1 §5.1 — Chrome Injection Plan

**Parent**: rebuild
**Phase**: 1 (foundation, conversion, compliance)
**Sub-step**: §5.1 — Per-page chrome
**Started**: 2026-05-12
**Completed**: 2026-05-13
**Status**: ✅ shipped as three Global Webflow Components (Astons Header `c49809ea-…998c`, Astons Sticky Emergency Bar `3afef828-…81f2`, Astons Cal Booking Band `779964a1-…9ecf`). See [progress.md](progress.md) 2026-05-13 entry for the full session log. Cal Booking Band carries neutral placeholder copy pending the literal-truth round.

## Context

The Astons Webflow site (`69f88bcd977766f39d880a96`) currently carries the MAST template page set — Home (titled "Mast - Style Guide"), `/styles`, `/components`, `/basic-layouts`, `/inspired-layouts`, `/blog` (CMS), `/404`, `/401`, plus two drafts. None of the named Astons pages (`/contact`, `/about`, `/direct-access`, `/practice-areas/*`, etc.) exist yet.

Per user decision 2026-05-12 (this session), Phase 1 §5.1 builds the chrome **as Webflow Components** without creating Astons pages. Component definitions land this session; per-page wiring on Home only; the Components are then ready to drop onto every Astons page as those pages are created in later sub-steps of Phase 1.

## Mechanism (locked this session)

Webflow Components, as the standard MAST chrome pattern. Approach **B** of the three considered:

- **Build new Global components** (Astons Header, Astons Sticky Emergency Bar, Astons Cal Booking Band)
- **Add to Home** (Header at body top, Sticky Bar at body bottom)
- **Remove the MAST Nav instance from Home** (`element_tool > remove_element`)
- **Leave MAST Nav definition untouched** — non-Astons MAST template demo pages (`/styles`, `/basic-layouts`, etc.) continue to work as references for the rest of the rebuild
- **Defer Footer rebuild** — no spec exists for the Astons footer; will be a separate decision round (see §6 carry-forward)

## Component definitions

### 1. Astons Header — `<header>` wrapping skip-link + quick-exit + site-nav (with mega-menu) + drawer

Single root `<header>` so `whtml_builder` accepts the whole tree in one insert. Markup verbatim from `webflow-injection.md` §3.1–§3.3, except wrapped in `<header class="astons-header">` for component rooting.

Children, in DOM order (matters for focus order and z-stacking):

1. `<a class="skip-link" href="#main">Skip to content</a>` — first focus stop, hides until focused
2. `<button class="quick-exit" data-quick-exit ...>Quick exit</button>` — fixed top-right via CSS, no flow effect
3. `<nav class="site-nav" aria-label="Primary">` containing:
   - `.site-nav__inner` (brand logo `<img>` from `cdn.jsdelivr.net/gh/mxhfxz/astons-law-chambers@v1.2.0/src/assets/logo-navy.svg`, menu list with mega-menu trigger, top-nav CALL anchor with `data-phone-link`, hamburger `<button data-drawer-toggle>`)
   - `<div id="mega-practice" class="mega-menu" hidden>` — 3-column grid (Person / Financial / Procedural) + foot row
4. `<aside id="primary-drawer" class="drawer" data-drawer hidden>` — mobile drawer with accordion practice list, Direct Access / About / Contact links

CSS dependency: classes already styled in `dist/bundle.min.css` v1.2.0, loaded via Project Settings head Custom Code (already in place). JS handlers (`[data-drawer-toggle]`, `[data-quick-exit]`, mega-menu pointer/touch/keyboard, etc.) already wired in `dist/site.min.js` v1.2.0, also loaded.

### 2. Astons Sticky Emergency Bar — `<div class="sticky-emergency-bar">`

Single root. Markup verbatim from `webflow-injection.md` §3.5. Two anchors (phone + WhatsApp) separated by a 1px divider. `data-whatsapp-context="homepage"` set as default for the Home instance; per-page overrides happen via `element_tool > add_or_update_attribute` when the bar is dropped onto each pillar (next session).

Stays visible on every page including `/contact` (Phase 0.5 iteration 2 override of Rapid Outreach §5.4).

### 3. Astons Cal Booking Band — `<section class="section cc-booking">`

Single root. Markup verbatim from `webflow-injection.md` §3.6. `#232536` band, white type, max-width 720 inner, lazy iframe wrapper. **Definition only this session** — built on the `/components` page so no instance is left on Home (Home is emergency-intent; cal embed is forbidden there).

The actual `cal.com` iframe snippet remains a placeholder until the booking link is finalised (carry-forward from `webflow-injection.md` §8).

## Discovered post-authorisation (2026-05-12)

After steps 1–3 of the original sequence ran, the following surfaced and require the sequence below to be revised:

1. **Home is the MAST Style Guide page** — its body wraps in `page-wrapper` (`d0cdf086-d32f-a18a-0349-54210ab403f1`) inside `body` (`63f833ef451855a840b8a159`). There is **no MAST Nav instance on Home**. The original step 7 (`remove_element` on MAST Nav from Home) is unnecessary on this page. Other MAST pages (`/styles`, `/components`, `/basic-layouts`, `/inspired-layouts`) likely do carry MAST Nav, but those are template demo pages and not in this session's scope.
2. **`whtml_builder` strips HTML `class` attributes that don't pre-exist as Webflow Styles.** The Astons Header inserted at step 3 came back as a structurally correct tree (right tags, right hierarchy, `data-*` attributes preserved, `aria-*` preserved) but with `styleNames: []` on every element. A `style_tool > query_styles` check of six chrome class names (`skip-link`, `quick-exit`, `site-nav`, `mega-menu`, `drawer`, `cc-nav-call`) returned only one substring match — `nav-skip-link`, a pre-existing MAST style. The chrome classes were dropped on import. The published HTML would render without those classes; the bundle CSS targets nothing.
3. **The fix path** (locked by user via AskUserQuestion 2026-05-12): pre-create the chrome class names as empty Webflow Styles via `style_tool > create_style`, then remove the broken header element and re-run `whtml_builder`. With matching style names already in the registry, whtml is expected to retain the classes on the inserted elements.
4. **Designer state at checkpoint:** the broken Astons Header element (id `aa414bb2-885b-ef8d-4d18-da5eaa7188da`, type `Block`, tag `header`) sits at the top of Home `page-wrapper`. Needs `remove_element` before re-whtml. No other writes from this session reached Webflow.

## Revised MCP execution sequence (resume here)

Pacing rule: one action per call, no other tool use between calls. Each numbered step is one assistant turn with one MCP call.

### A. Pre-create chrome Webflow Styles (~35 calls)

Each call: `style_tool > create_style` with `name: <class>`, `properties: [{ property_name: "--astons-marker", property_value: "1" }]` (no-op CSS custom property to satisfy the schema's required `properties` array without affecting rendering — the bundle CSS provides actual styling).

**Astons Header chrome (29 styles):**
`skip-link`, `quick-exit`, `site-nav`, `site-nav__inner`, `site-nav__brand`, `brand-logo`, `site-nav__menu`, `nav-item`, `has-mega`, `has-mega__trigger`, `has-mega__chevron`, `btn`, `cc-nav-call`, `site-nav__cta`, `hamburger`, `hamburger__bars`, `mega-menu`, `mega-menu__inner`, `mega-menu__panel`, `mega-menu__col`, `mega-menu__col-title`, `mega-menu__list`, `mega-menu__link`, `mega-menu__foot`, `link-arrow`, `drawer`, `drawer__call`, `drawer__list`, `drawer__accordion-list`

Plus optional `astons-header` (wrapper class — not styled in bundle but useful for component identification).

**Sticky Emergency Bar (3 styles):**
`sticky-emergency-bar`, `sticky-emergency-bar__link`, `sticky-emergency-bar__divider`

**Cal Booking Band (3 styles):**
`cc-booking`, `cc-default`, `cal-embed`

(`section`, `container`, `eyebrow` likely exist as MAST styles already — `create_style` may error with "already exists". Skip those errors and proceed.)

If `create_style` fails on any name with "already exists", note the existing style ID returned by the error or by a follow-up `query_styles`, and continue. Don't re-create.

**Cost:** ~35 calls, one per turn. Substantial but mechanical.

### B. Remove broken Astons Header on Home (1 call)

`element_tool > remove_element` on id `{component: "69f88bd1977766f39d880b04", element: "aa414bb2-885b-ef8d-4d18-da5eaa7188da"}`.

This is the destructive marker — flagged "DANGEROUS" by the tool — but appropriate here.

### C. Re-run whtml_builder Astons Header on Home (1 call)

`whtml_builder` with the same Astons Header HTML payload as before, `parent_element_id` = page-wrapper (`d0cdf086-d32f-a18a-0349-54210ab403f1`), `creation_position: prepend`.

The HTML payload is captured verbatim in `webflow-injection.md` §3.1–§3.3 (with the wrapping `<header class="astons-header">`). Refer there.

### D. Verify class preservation (1 call)

`element_tool > query_elements` scoped to the new header element ID, with element_filter `style: "site-nav"` (or any chrome class). Should return ≥1 match this time. If still 0, the fix did not work; fall back to the HtmlEmbed pivot (Option 2 in the AskUserQuestion fix-path round) — re-spec required.

### E. Transform to component (1 call)

`de_component_tool > transform_element_to_component` with id = new header element, name = "Astons Header", group = "Global", `replace: true`. Home now carries an Astons Header component instance.

### F. Build Sticky Emergency Bar on Home (3 calls)

- `whtml_builder` sticky-bar HTML at `page-wrapper` `append`
- `element_tool > query_elements` verify class (`sticky-emergency-bar`) → ≥1 match
- `de_component_tool > transform_element_to_component` "Astons Sticky Emergency Bar", group "Global", `replace: true`

### G. Switch to Components page and build Cal Booking Band (4 calls)

- `de_page_tool > switch_page` to `/components` (`69f88bd1977766f39d880b08`)
- `element_tool > get_all_elements` (or `query_elements` with body filter) to find the page-wrapper / body insertion target on this page
- `whtml_builder` cal-booking-band HTML at body/page-wrapper `append`
- `de_component_tool > transform_element_to_component` "Astons Cal Booking Band", group "Global", `replace: true`

### H. Optional QA snapshot (1 call)

`element_snapshot_tool` on the Astons Header instance on Home — visual confirmation. Note: Designer canvas may not load Project Settings head Custom Code (per `_START_HERE.md` §10), so the snapshot may show unstyled HTML even if production rendering would be correct. Treat the snapshot as a structural sanity check, not a styling verification.

### Total

~35 + 1 + 1 + 1 + 1 + 3 + 4 + 1 = **~46 MCP calls** to complete the chrome component build. Each call is one turn under the pacing rule.

## Original MCP execution sequence (superseded — kept for reference)

Pacing rule: one action per call, no other tool use between calls. Each numbered step is one assistant turn with one MCP call.

### Setup
1. `page_tool > switch_page` — Home (`69f88bd1977766f39d880b04`)
2. `element_tool > query_elements` — single call, two queries: `body` element (tag filter), MAST Nav instance (`component_filter.component_name = "Nav"`). Captures both element IDs in one round-trip.

### Build Astons Header on Home
3. `whtml_builder` — insert the full `<header>` HTML tree (skip-link + quick-exit + nav with mega-menu + drawer) at body top (`creation_position: prepend`). Returns the new `<header>` element ID.
4. `de_component_tool > transform_element_to_component` — convert the header element to component "Astons Header", group "Global", `replace: true`. Home now carries an Astons Header component instance at body top.

### Build Sticky Emergency Bar on Home
5. `whtml_builder` — insert sticky bar HTML at body end (`creation_position: append`). Returns sticky bar element ID.
6. `de_component_tool > transform_element_to_component` — convert to "Astons Sticky Emergency Bar", group "Global", `replace: true`. Home now carries the sticky bar instance.

### Remove MAST Nav from Home
7. `element_tool > remove_element` — MAST Nav instance ID from step 2. Home now has Astons Header in its place.

### Build Cal Booking Band on Components page
8. `page_tool > switch_page` — Components (`69f88bd1977766f39d880b08`). The `/components` page is the natural home for component samples; leaving an instance there is acceptable.
9. `element_tool > query_elements` — body element on Components page.
10. `whtml_builder` — insert cal booking band HTML at body end.
11. `de_component_tool > transform_element_to_component` — convert to "Astons Cal Booking Band", group "Global", `replace: true`. Definition exists; instance on `/components` only.

### Verify
12. `element_snapshot_tool` — visual snapshot of Home (or Astons Header instance) for QA evidence. Optional, but recommended before closing the session.

Total: **11 write calls + 1 optional snapshot**. ~12 turns.

## What this session does NOT do

- **No publish.** Designer changes only. Staging (`astons-law-chambers.design.webflow.com`) and production (`www.astonslaw.com`) both stay on the pre-rebuild state until the user authorises a publish (separate STOP).
- **No new Astons pages** (Contact, Direct Access, pillars, etc.). Page creation begins in the next session.
- **No copy work.** Hero text, sticky bar microcopy, and pillar bodies all gate on Ghulam's literal-truth commitments per `feedback_flag_imported_truth_claims`. The Astons Header includes only the structural markup verbatim from `webflow-injection.md` (CALL phone label `07922 247 999`, mega-menu link labels by practice area).
- **No MAST Footer touch.** Astons footer markup not specified; deferred.
- **No removal of MAST Nav definition.** Only the instance on Home is removed; the definition remains so MAST template demo pages keep working as references.
- **No removal of MAST template demo pages.** `/styles`, `/basic-layouts`, `/inspired-layouts`, etc. survive the session for use as visual references during pillar build.

## Class-name → bundle CSS / JS contract

The bundle (`bundle.min.css`, `site.min.js` at `@v1.2.0`) is loaded site-wide via Project Settings head + footer Custom Code (already pasted by the previous session). Each chrome class is styled and wired:

| Selector / data attr | Source | Purpose |
|---|---|---|
| `.skip-link` | bundle.css | Visually hidden until focused; jumps to `#main` |
| `.quick-exit`, `[data-quick-exit]` | bundle.css + site.js | Outlined red top-right; click + Esc-twice-within-1000ms = `window.location.replace('https://www.google.com')` |
| `.site-nav`, `.site-nav__*`, `.mega-menu`, `.mega-menu__*`, `.has-mega__trigger`, `.has-mega__chevron` | bundle.css + site.js | Pointer hover-open, touch press-to-open, keyboard Enter/Space, ~280ms close grace |
| `.hamburger`, `[data-drawer-toggle]`, `.drawer`, `[data-drawer]`, `.drawer__accordion-list`, `[data-drawer-accordion]` | bundle.css + site.js | Hamburger morphs to close-cross; drawer slides; internal accordion toggles |
| `[data-phone-link]` | site.js | Ensures `tel:` href, no JS interception, polite live-region announcement on click |
| `[data-whatsapp-context]` | site.js | Per-page WhatsApp prefill message, `<80` char target |
| `.sticky-emergency-bar`, `.sticky-emergency-bar__*` | bundle.css + site.js | Bottom-fixed; slide-up entry on first paint (~200ms ease-out, reduced-motion zeros it) |
| `.section.cc-booking`, `.cal-embed`, `.container.cc-default`, `.eyebrow` | bundle.css | `#232536` band, max-720 inner, lazy iframe wrapper |
| `.btn.cc-nav-call` | bundle.css | Top-nav CALL CTA, solid `#C23616`, 44px tall |

If any of those selectors fail to apply in the Designer canvas, that's a Designer-canvas styling issue (canvas does not always execute Project Settings head Custom Code), **not** a production rendering issue. Verify in published staging once authorised.

## STOP signals applied

- Building MAST template demo pages keeps the no-Webflow-publish stance.
- The Cal Booking Band lives on `/components` (a non-production page) so no production-page instance is created prematurely.
- Footer left untouched until a Footer spec round happens.
- Webflow MCP write operations on the production site (`69f88bcd977766f39d880a96`) require explicit user authorisation before each batch — see §5 below.

## Carry-forward for the next session

1. **Footer spec round.** Author Astons footer markup (regulator line, address, phone, WhatsApp, email, secondary nav, BSB compliance link). Then build as a Webflow Component analogous to Astons Header, replacing MAST Footer instance on Home.
2. **Astons page skeletons.** Create `/contact`, `/about`, `/direct-access`, `/consultation`, `/what-to-expect`, `/practice-areas` (index), 10 pillar pages at `/practice-areas/*`, `/compliance/complaints-policy`. Each new page receives Astons Header + Sticky Bar instances on creation.
3. **Hero literal-truth round.** AskUserQuestion to lock Ghulam's commitments on availability, response times, first-call policy, fees-on-application, operational claims (per `feedback_flag_imported_truth_claims`). Unblocks Phase 1 §5.2 (homepage rewrite) and Phase 2 (pillar copy).
4. **Cal embed snippet.** Replace placeholder in `.cal-embed` wrapper with actual cal.com inline embed snippet for the booked routine.
5. **Hero image asset.** Source the architectural-detail subject for the homepage hero image slot (Phase 0.5 iteration 4 lock).
6. **Schema injection** (Phase 1 §5.5) — `LegalService` + `Person` + `Service` JSON-LD. Engage `schema-markup` + `seo-schema` skills.

## Authorisation gate

Before step 1 of the MCP execution sequence runs, this plan needs explicit user sign-off via `AskUserQuestion`. Per `_START_HERE.md` §9, MCP write operations on the production site beyond what was authorised in the original handoff require fresh authorisation. The original handoff authorised "per-page chrome injection" in the abstract; this plan converts that into 11 specific writes against the production site.

After authorisation, the writes execute sequentially across ~12 turns. The user can interrupt at any point.
