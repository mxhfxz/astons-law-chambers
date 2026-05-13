# Aesthetic Direction

> **This file describes the locked v1.3.0 state.** Iteration provenance (Phase 0.5 rounds 1–4, v1.3.0 iterations 1–3 + ship-gate audit fixes) lives in `progress.md` session-log entries dated 2026-05-12 and 2026-05-13, and in `DECISION_LOG.md`. Departures from the live `www.astonslaw.com` and departures from the three deep-research reports are retained inline below per [[feedback_callout_departures]].

## Commitment

**Crisis-grade institutional. Brutally minimal, with weight.**

Reference category: GOV.UK + Doughty Street + a court summons. Not chambers letterhead, not wealth-manager calm, not law-firm-marketing-template. The audience is a defendant in cognitive-tunnelling crisis; the design serves urgency by being uncompromisingly austere.

Applies frontend-design skill's "pick an extreme" rule landed on: **refined minimalism with brutalist structural moves**.

## Colour system

| Token | Hex | Role |
|---|---|---|
| `brand-primary` | `#0E1628` | Dominant brand colour. Doubles as body text. Wordmark. Borders. Section rules. |
| `emergency-accent` | `#C23616` | Reserved for chrome-only emergency channels — sticky bar + top-nav `Call now` + designated emergency banners. Never decorative, never on hero CTAs, body content, links, dividers, icon fills, footer chrome, mega-menu chips. The quick-exit pill uses solid black (`#000`) — see Quick-exit section. |
| `interactive-accent` | `#0F4C81` | Carbon blue 60. Reserved for text-link state colour and the global focus ring. Never on buttons, banners, hero fills, or decorative surfaces. |
| `booking-frame` | `#232536` | cal.com embed wrapper band only. Advisory pages only. Never bled into other surfaces. |
| `surface` | `#FFFFFF` | Pure white background everywhere. No tint, no ivory, no paper. |
| `grey-100` / `surface-secondary` | `#F4F4F5` | Surgical tonal-step surface for emphasis sections (1–2 per page max, never alternated). |
| `grey-200` | `#E4E4E7` | Divider, card border. |
| `grey-500` | `#71717A` | Disabled, placeholder. |
| `grey-600` | `#52525B` | Caption / fine print (regulator line, footnotes). |

**Palette scope (research delta):** Visual Practices Finding 2 documents elite sample sites operating with a 3–5 hue functional palette. Astons sits at the low end of that range — brand + emergency-accent + interactive-accent + booking-frame. The `interactive-accent` is link-state and focus-ring only; the `booking-frame` is the cal.com wrapper only. No fifth hue.

**Red allocation rule:**
- **Solid `#C23616`** = emergency-channel chrome. Top-nav `Call now` button + sticky bottom-bar + designated page-level emergency banners.
- **Solid black (`#000`)** = safety-exit chrome. The "Leave website" pill anchored below the nav-left. See Quick-exit section.

The top-nav `Call now` button + sticky bottom-bar + black safety pill stack as three vertically-rhythmed chrome bands. Each carries a distinct urgent-channel meaning. Hero CTAs and body buttons remain navy per the Buttons table.

## Type system

**Single family — IBM Plex Sans only.** Body 400, medium 500, semibold 600, bold 700, extra-bold 800. True italic. Tabular figures. Full Latin Extended.

- Body: 16–18px, leading 1.5–1.7, measure capped at 66ch
- Section labels (eyebrow): Plex Sans 600, all-caps, tracked +80, 12px (static, not clamped)
- H3: Plex Sans 600, 20–24px
- H2: Plex Sans 700, 24–36px, leading 1.15
- H1: Plex Sans 700, 32–52px, leading 1.15
- Hero display: Plex Sans 800, 36–64px, leading 1.1, sentence-case
- Microcopy / caption: Plex Sans 400, 13–14px, `grey-600`

Boldness lives in **weight contrast**, not in family contrast. No serif companion. No condensed cut. No second display family.

All six fluid tokens (hero / h1 / h2 / h3 / body / caption) carry `clamp(min, preferred, max)` so a single token answers every viewport class without media queries. Formulas are in `src/tokens.css`. The eyebrow stays static at 12px because tracking and case do the size work.

Rationale: the 16-elite-site visual practices research shows single-sans convergence across the category; Plex Sans is the distinctive choice within that convention (humanist character, free, complete glyph set, matches IBM Carbon foundation). Cleanest LCP, simplest fallback chain.

## Layout system

- **Grid:** 12-col desktop / 8-col tablet / 4-col mobile, 8px base unit
- **Spacing tokens:** 4, 8, 12, 16, 24, 32, 48, 64, 96 (Carbon-aligned)
- **Section padding:** compact / default / generous tokens, all clamp()'d so desktop pages do not become claustrophobic at 1440px+ widths
- **Section bands:** vertical padding tokens at compact/default/generous; 1px `brand-primary` rule between bands as structural rib
- **Cards:** 1px `grey-200` border, no shadow, no hover-lift; 24px desktop / 16px mobile padding. Border darkens 10% on hover.
- **Hero pattern:** typographic-anchor on offence pages; typographic-anchor + contextual image slot on homepage (see Hero composition section).

**Containers.** Three width tiers and a clamp() gutter.

| Token | Width | Use |
|---|---|---|
| `--container-narrow` | 720px | Long-form body, measure-respecting prose, single-column pages |
| `--container-default` | 960px | Mixed-content pages, disclosure rows, mid-density grids |
| `--container-wide` | 1200px | Homepage hero, practice-areas grid, footer |
| `--gutter` | `clamp(20px, 5vw, 96px)` | Horizontal padding on every container |

Sticky bar and the cal.com band intentionally full-bleed. Everything else respects a container. The 66ch measure cap on paragraph text remains in force.

## Buttons

| Variant | Treatment | Use |
|---|---|---|
| `cc-emergency` | `#C23616` solid fill, white text, 2px radius, ≥56px tall, weight 700 | Sticky bar, designated emergency banners. Chrome only. |
| `cc-nav-call` | `#C23616` solid fill, white text, 2px radius, 44px tall, weight 700, label "Call now" | Top-nav `Call now` button. Chrome only. Label is "Call now" (not the full phone number) so the button fits the desktop row without sprawl. |
| `cc-hero-call` | `#0E1628` solid fill, white text, 2px radius, ≥56px tall, weight 700 | Phone CTA on hero. Phone number printed in button text in title case — "Call 07922 247 999". All-caps button labels are forbidden per [[feedback_natural_voice]]. |
| `cc-hero-whatsapp` | `#0E1628` 2px outline, transparent fill, brand text; inverts to white-on-navy on hover; ≥56px tall | WhatsApp CTA on hero. Equal weight to phone. |
| `cc-advisory` | `#0E1628` solid fill, white text, 4px radius, 48px tall, weight 600 | cal.com bookings, fees, Direct Access explainer. Secondary visual weight. |
| `cc-outline` | `#0E1628` 1.5px outline, transparent fill, brand text; inverts on hover; 48px tall | Neutral outline button outside the hero. |
| Quick-exit pill | `#000` solid surface, white text, anchored below nav-left, `z-index: 9999`, 36–44px tall | Safety exit only — see Quick-exit section for full spec. |

**Modifiers (composable onto any `.btn.cc-*` variant):**

| Modifier | Treatment | Use |
|---|---|---|
| `cc-with-arrow` | Adornment-only: appends a `→` after-pseudo with 4px nudge on hover (200ms `--ease-out-emphasised`). Does not touch the button's own surface, padding, or hover treatment. | Pair with `cc-advisory` for the "How Direct Access works"-style CTA. Replaces the fragile `btn cc-advisory link-arrow` combo. |

Hero CTA pair is navy solid (phone) + navy outline (WhatsApp). Equal weight, hierarchy by fill-vs-outline only. Maintains dual-channel parity per Rapid Outreach UX §3.1. Red surfaces on every page are the top-nav `Call now` and the sticky bottom-bar — never the hero CTAs.

## Motion

Restrained but state-legible. No bounce, no overshoot, no scale-on-hover, no parallax, no scroll-triggered reveals. The motion budget is reserved for state legibility and direction-of-action affordance. Cursor-led actions land the response under the cursor — chrome links bg-fill on hover, inline body prose underlines at rest and bg-swells on hover. Underline-thickness shifts on hover are explicitly forbidden (see Forbidden list); they decouple the hit area from the visual area.

Token durations:
- `--motion-duration-nudge: 120ms` — cursor-led: link bg-fill, button bg, card border, arrow nudge, focus ring opacity
- `--motion-duration-quick: 200ms` — state morphs: hamburger ↔ close-cross, chevron rotations, `aria-expanded` flips, mega-menu open animation
- `--motion-duration-fast:  240ms` — page-led entries: sticky bar slide-up on first paint, accordion expand
- `--motion-duration-grace: 280ms` — system reveals with displacement: drawer slide-in, mega-menu close-grace wait

Easings (v1.3.0):
- `--ease-out-quick` — `cubic-bezier(0.32, 0.72, 0, 1)`. Cursor-led: snaps under the cursor. Pairs with `nudge`.
- `--ease-out-soft` — `cubic-bezier(0.16, 1, 0.3, 1)`. Critically damped — no overshoot, soft settle. Pairs with `fast`.
- `--ease-out-emphasised` — `cubic-bezier(0.2, 0, 0, 1)` (was the single `--motion-ease`). Strong deceleration. Pairs with mega-menu open animation and drawer slide-in.
- `--ease-in-out-snappy` — `cubic-bezier(0.4, 0, 0.2, 1)`. Symmetric — reads the same forward and back. Pairs with state morphs.

Behaviours:
- **Hover.** Every interactive element. Primary solid navy buttons (cc-hero-call, cc-advisory) lighten 18% + gain a 2px Carbon-blue inset ring on hover. Secondary outline buttons (cc-hero-whatsapp, cc-outline) get a subtle bg tint + border-recolour to Carbon-blue. Both buttons carry the same Carbon-blue accent cue on hover while preserving their at-rest distinction. `.link-arrow` inverts on hover (transparent → navy fill + white text + 4px arrow nudge). The `.btn.cc-with-arrow` modifier composes cleanly on top of any `.btn.cc-*` variant — adornment-only, leaves the button's own surface intact. Emergency-accent solid buttons (cc-emergency, cc-nav-call, sticky bar) keep their dedicated red-darken tokens (`#A02D12` / `#861F08`) — emergency hovers stay decisive and stable. Card border darkens 10% on hover.
- **Chrome links** (top-nav, mega-menu, drawer, mega-menu foot, `.link-arrow`). At rest: no underline, no decoration. Hover: bg-fill in `--color-link-bg` (`#F4F4F5`) across the full padded box, 120ms `--ease-out-quick`. Mega-menu and drawer-accordion practice-area links add a 2px inset-left bar in `--color-interactive-accent` as a directional cue.
- **Inline body prose links.** At rest: 1px underline in `--color-link` (`#0F4C81`), no thickness shift on hover. Hover: bg-fill swell in `--color-link-bg` with `box-decoration-break: clone` so multi-line wraps fill correctly + 10% darken on colour.
- **State-change icons.** Hamburger glyph morphs to a close-cross on drawer-open, 280ms `--ease-in-out-snappy`. All three bars share `top: 6px` (vertical centre); at rest they `translateY(±6px)` to top/bottom; on open they `translateY(0) rotate(±45deg)` — single transform per bar, single coherent state morph. Mega-menu chevron and drawer accordion chevron morph via `scaleY(-1)` (vertical mirror) at 280ms — V flattens to a horizontal line at scaleY=0 then unfolds as ^. State inversion, not a spin.
- **Arrow nudge.** `.link-arrow::after` and `.btn.cc-with-arrow::after` translate 4px on hover, 200ms `--ease-out-emphasised`. Explicit `transform: translateX(0)` at rest stabilises the reverse transition. Text stays still. The padded `.link-arrow` box also bg-fills on hover — two coupled cues on one surface.
- **Sticky bar.** Slide-up on first paint, 240ms `--ease-out-soft`. Single page-level entry.
- **Mega-menu.** Hover-open no delay; close on 280ms grace. Touch press-to-open. Keyboard Enter/Space opens. Esc closes (and counts toward quick-exit double-tap). Open animation: 200ms fade + 4px translate-down, `--ease-out-emphasised`.
- **Drawer.** Slide-in from the right, 280ms `--ease-out-emphasised`.
- **Focus rings.** Outline appears instantly — accessibility requirement, no transition.
- **Reduced motion.** `prefers-reduced-motion` zeros every duration token. Decorative motion (arrow nudge, chevron rotation, bg-fill transition) disappears; state-essential changes (drawer open/close, accordion hidden/shown) flip instantly without animation.

## Hero composition

Homepage hero carries one contextual image alongside the typographic anchor. All other heroes (offence pages, advisory pages) remain typographic-anchor only.

- **Layout:** two-column grid on desktop (text 1.15fr / image 1fr), single-column stack on tablet/mobile with content first, image second. The image is a context-setter, not a conversion driver; the conversion path (eyebrow + h1 + dual CTAs + regulator line) must stay in the opening fold on touch.
- **Image slot:** 4:5 aspect on desktop, 16:9 on mobile. Background placeholder `#F4F4F5` until image provided.
- **Subject matter:** architectural detail — chambers entrance / Marylebone street geometry. Specific subject TBD; sourced separately before Phase 1 homepage build.
- **Forbidden subjects:** stock photography of any kind, gavels, scales, Inn courtyards, courthouse exteriors, people, AI-generated faces, heraldic vocabulary.

## Quick-exit safety feature

UK Refuge / Women's Aid / gov.uk safety convention. Outside the three deep-research reports' coverage; scaffolded via the `ux-designer` skill per [[feedback_decision_process_protocol]].

- **Component:** small black pill, `position: fixed`, anchored `0.5rem` below the sticky nav's bottom edge (`top: calc(var(--nav-height) + 0.5rem)`), left-aligned with the logo (`left: var(--gutter)`). Width driven by the label + horizontal padding. 36–44px tall (WCAG tap-target floor — never compromise the safety button). Black surface (`#000`), white text. `z-index: 9999` so the pill dominates every other surface (sticky-bar, mega-menu, drawer, any 3rd-party widget) — safety always reaches. Hides via `body:has(.drawer.is-open)` when the drawer is open so it doesn't sit on top of the modal.
- **DOM:** `position: fixed` means DOM order doesn't matter for stacking. For screen-reader / keyboard focus order, the pill follows `<nav>` in the Astons Header markup so the focus traversal lands nav → safety pill.
- **Label:** "Leave website" + alert-circle SVG icon.
- **Keyboard:** Esc-twice within 1000ms triggers. Single Esc closes any open mega-menu / drawer / modal.
- **Action:** `window.location.replace('https://www.google.com')`. Same tab. No confirmation, no farewell page.
- **ARIA:** `aria-label="Leave this site immediately — opens Google in this tab"`.
- **Tooltip on cursor devices only:** "Quickly leaves this site. Press Esc twice as a shortcut."
- **Z-index:** above the sticky bar. Hidden when printing.

## cal.com embed band

- **Placement:** advisory pages only — `/consultation`, `/practice-areas/*/fees`, `/direct-access`, `/what-to-expect`. Never on emergency-intent pages.
- **Surface:** full-bleed `#232536` band; iframe wrapper centred, max-width 720px, white background, 2px radius.
- **Type inversion:** white headings and eyebrows; ~85% white body text within this band only.
- **Performance:** iframe lazy-loaded with `loading="lazy"` and `importance="low"`; never above the fold; cal.com script deferred.

## Sticky emergency bar

**DEPARTURE from research norm (Rapid Outreach §5.4):** Rapid Outreach UX research recommended hiding the sticky bar on the `/contact` route itself. The locked direction overrides this — the sticky bar persists across every route including `/contact`. Reason: brand signal of always-reachability outweighs the minor redundancy on the contact page.

## Accessibility floor (WCAG 2.2 AA)

- **Skip-to-content link** — visually hidden until keyboard focus, then surfaces top-left at high contrast. Skips directly to `<main>`.
- **Focus rings** — 2px solid `--color-focus` (`#0F4C81`) with 2px offset on every interactive element. White ring with negative inset on emergency-accent solid surfaces (sticky bar, top-nav `Call now`) so the ring is visible on red.
- **Modal focus management (drawer + any future overlay)** — overlays that lock document scroll must save `document.activeElement` on open, move focus to the first focusable inside the overlay, trap Tab and Shift+Tab within the overlay, restore focus on close, and expose `role="dialog"` + `aria-modal="true"` + `aria-label` for screen readers. Esc closes the overlay. Pattern: WAI-ARIA APG dialog-modal. Esc-twice within 1000ms still triggers quick-exit per the safety convention.
- **ARIA landmarks** — `<header>`, `<nav aria-label="Primary">`, `<main id="main">`, `<aside>`, `<footer>` on every page.
- **ARIA labels** — every icon-only button (hamburger, quick-exit) carries an `aria-label` describing intent.
- **ARIA live regions** — polite announcements after CTA click ("Calling 07922 247 999", "Opening WhatsApp") in a single page-level `aria-live="polite"` region.
- **Tooltips** — cursor devices only, `aria-describedby` linked, ~500ms appear delay. Touch devices show permanent labels in their place.
- **Keyboard parity** — every action triggerable by mouse or touch is triggerable by keyboard. No hover-only content. No mouse-only operations.
- **Contrast** — body 4.5:1 minimum, UI / large text 3:1 minimum.
- **`prefers-reduced-motion`** — honoured for decorative motion; state-essential changes (open/close, focus rings) remain.
- **`prefers-color-scheme`** — out of scope for v1. Site is white-ground only.

## Medium-optimised UX

Every component must be specified for every viewport class × every input modality.

- **Cursor devices:** hover states active; transitions visible; tooltips appear on hover after ~500ms; arrow-nudge animations active.
- **Touch devices:** hover suppressed (no sticky `:hover` after tap); tap targets ≥48×48; emergency CTAs ≥56×64; tooltips replaced by permanent labels; press-and-hold reveals secondary actions where applicable.
- **Large viewport (≥1024px):** containers respected; mega-menu in 3-column matrix; gutters at upper bound of `clamp()`.
- **Tablet (768–1023px):** containers tightened; hero clamps mid-range; mega-menu hides, hamburger drawer surfaces.
- **Phone (≤767px):** drawer navigation; sticky bottom-bar always visible; hero clamps to lower bound; mega-menu absorbed into drawer as a vertical accordion; nav CALL button moves into drawer.

## Forbidden (system-level)

- Stock photography of any kind (scales of justice, gavels, suited people)
- Coat-of-arms, heraldic crest, legal-scales iconography (costume)
- Hero image carousels
- Animated number counters
- Trust-badge rails / "as seen in" logo carousels
- Award seals from unnamed sources
- Shadows, gradients, glassmorphism
- Rounded buttons over 4px radius
- Hover-to-reveal content
- Modals for routine info
- Chat-bot widgets
- Warm/ivory backgrounds
- Tinted "paper" textures
- Hamburger menu on desktop
- Inter, Roboto, Arial, generic system stacks
- Emergency-accent `#C23616` outside the chrome surfaces (sticky bar, top-nav `Call now`, designated emergency banners). Forbidden in hero CTAs, body, links, dividers, icon fills, mega-menu chips, footer chrome.
- Alternating tonal-step section bands across a page. Tonal-step is surgical — 1–2 emphasis sections per page maximum, never alternated. Cross-reference [[feedback_no_alternating_banding]].
- Hero image subjects: stock, gavels, scales, Inn courtyards, courthouse exteriors, people, AI-generated faces.
- Line-thickness hover shifts (e.g., `text-decoration-thickness: 1px → 2px` on hover). Reason: hit area decouples from visual area; the underline can appear far from the cursor when padding extends the hit box. Use bg-fill hovers across every link surface — chrome and body prose alike.
- A single system easing curve for every motion. Each interaction class (cursor-led, state morph, page-led entry, system reveal) uses its own named easing. Reusing one curve everywhere flattens the perceived quality of micro-interactions.
- Inline `style="..."` attributes on repeated component instances (cards, list rows). Scope under the component selector instead.
- Fragile combo classes that overlap on layout properties (e.g., `btn cc-advisory link-arrow`). Use a single dedicated modifier (`btn cc-with-arrow`) instead.
- Drawer/modal overlays that lock document scroll without focus management. Modal overlays must save previous focus, move focus into the overlay, trap Tab, restore focus on close, and expose `role="dialog"` + `aria-modal="true"`.

## Atmosphere notes

The single design move that creates atmosphere on a no-portrait, restrained-imagery, no-decoration site is **type weight + structural rule + the unflinching `#C23616` in the chrome**. The page should feel built, not designed. The visitor in crisis should read it and think "these people are serious."

Boldness shows up as:
- Heavy weight contrast in the hero (regular body / 700+ display)
- Sentence-case display copy that lands like a statement, not a tagline
- 1px solid hairlines as section ribs, not gentle gradients
- The emergency band as a single uncompromising colour with no decoration
- Generous white space on long pages — confidence by understatement
- One photographic note on the homepage that situates the practice in a real place, used sparingly

Boldness does NOT show up as:
- Maximalist composition
- Asymmetric editorial layouts
- Display-font dominance
- Decorative colour fills

## Wordmark + logo

Client-supplied logo SVG: a single asset with a 32×32 abstract mark left of the wordmark "ASTONS LAW CHAMBERS" on the same baseline. The four quarter-form shapes read as an abstract crest without using heraldic vocabulary; within research permissions.

- **Navy variant** at [src/assets/logo-navy.svg](../../src/assets/logo-navy.svg) — used on white surfaces (nav, footer, light backgrounds).
- **White variant** at [src/assets/logo-white.svg](../../src/assets/logo-white.svg) — used on `#0E1628` navy footer bands and the `#232536` cal.com band.
- **Header display:** mark + wordmark together at ~32px height; total chrome height ~40px.
- **Mobile (<480px):** mark only at 28×28; wordmark hidden in chrome to preserve real estate for the CALL CTA and quick-exit. Wordmark surfaces in the footer.
- **Favicon:** mark portion only, 32 / 16 / 180 (Apple touch) / 512 (manifest).
- The wordmark text class (`.wordmark` in `typography.css`) remains for any footer or copy contexts where the SVG is not appropriate.
