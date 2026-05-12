# Aesthetic Direction

## Commitment

**Crisis-grade institutional. Brutally minimal, with weight.**

Reference category: GOV.UK + Doughty Street + a court summons. Not chambers letterhead, not wealth-manager calm, not law-firm-marketing-template. The audience is a defendant in cognitive-tunnelling crisis; the design serves urgency by being uncompromisingly austere.

Applies frontend-design skill's "pick an extreme" rule landed on: **refined minimalism with brutalist structural moves**.

## Colour system (locked 2026-05-12 → expanded Phase 0.5)

| Token | Hex | Role |
|---|---|---|
| `brand-primary` | `#0E1628` | Dominant brand colour. Doubles as body text. Wordmark. Borders. Section rules. |
| `emergency-accent` | `#C23616` | Reserved for chrome-only emergency channels (sticky bar + top-nav CALL + designated emergency banners) and the quick-exit safety button (outlined treatment). Never decorative, never on hero CTAs, body content, links, dividers, icon fills, footer chrome, mega-menu chips. |
| `interactive-accent` | `#0F4C81` | Carbon blue 60. Reserved for text-link state colour and the global focus ring. Never on buttons, banners, hero fills, or decorative surfaces. |
| `booking-frame` | `#232536` | cal.com embed wrapper band only. Advisory pages only. Never bled into other surfaces. |
| `surface` | `#FFFFFF` | Pure white background everywhere. No tint, no ivory, no paper. |
| `grey-100` / `surface-secondary` | `#F4F4F5` | Surgical tonal-step surface for emphasis sections (1–2 per page max, never alternated). |
| `grey-200` | `#E4E4E7` | Divider, card border. |
| `grey-500` | `#71717A` | Disabled, placeholder. |
| `grey-600` | `#52525B` | Caption / fine print (regulator line, footnotes). |

**DEPARTURE from original lock (2026-05-12 iteration round 1):** original aesthetic stated "Two saturated colours separated by function. Zero third hue." Phase 0.5 adds one cool interactive accent (`#0F4C81`) at link-state and focus-ring scale only. Justification: Visual Practices Finding 2 — every elite sample site operates with a 3–5 hue functional palette; Astons remains at the low end of that range. Hero/button/banner usage remains forbidden.

**DEPARTURE from original lock (2026-05-12 iteration round 2):** added `booking-frame` `#232536` as a fourth saturated surface value, scoped exclusively to the cal.com embed wrapper on advisory pages.

**Red allocation rule (locked 2026-05-12 iteration round 2):**
- **Solid red (`#C23616`)** = emergency chrome only. Sticky bottom-bar, top-nav CALL button, designated page-level emergency banners.
- **Outlined red** = safety exit only. Quick-exit floating button (2px border, transparent fill, full inversion on hover).
- Two distinct uses, two distinct visual treatments. One red signal per concern, never overloaded.

## Type system (locked 2026-05-12 → responsive Phase 0.5)

**Single family — IBM Plex Sans only.** Body 400, medium 500, semibold 600, bold 700, extra-bold 800. True italic. Tabular figures. Full Latin Extended.

- Body: 16–18px, leading 1.5–1.7, measure capped at 66ch
- Section labels (eyebrow): Plex Sans 600, all-caps, tracked +80, 12px (static, not clamped)
- H3: Plex Sans 600, 20–24px
- H2: Plex Sans 700, 24–36px, leading 1.15
- H1: Plex Sans 700, 32–52px, leading 1.15
- Hero display: Plex Sans 800, 36–64px, leading 1.1, sentence-case
- Microcopy / caption: Plex Sans 400, 13–14px, `grey-600`

Boldness lives in **weight contrast**, not in family contrast. No serif companion. No condensed cut. No second display family.

**Phase 0.5 — Responsive type via `clamp()`.** All six fluid tokens (hero / h1 / h2 / h3 / body / caption) carry `clamp(min, preferred, max)` so a single token answers every viewport class without media queries. Formulas are in `src/tokens.css`. The eyebrow stays static at 12px because tracking and case do the size work.

Rationale: the 16-elite-site visual practices research shows single-sans convergence across the category; Plex Sans is the distinctive choice within that convention (humanist character, free, complete glyph set, matches IBM Carbon foundation). Cleanest LCP, simplest fallback chain.

## Layout system (locked 2026-05-12 → containers Phase 0.5)

- **Grid:** 12-col desktop / 8-col tablet / 4-col mobile, 8px base unit
- **Spacing tokens:** 4, 8, 12, 16, 24, 32, 48, 64, 96 (Carbon-aligned)
- **Section padding:** compact / default / generous tokens, all clamp()'d so desktop pages do not become claustrophobic at 1440px+ widths
- **Section bands:** vertical padding tokens at compact/default/generous; 1px `brand-primary` rule between bands as structural rib
- **Cards:** 1px `grey-200` border, no shadow, no hover-lift; 24px desktop / 16px mobile padding. Border darkens 10% on hover (Phase 0.5).
- **Hero pattern:** typographic-anchor on offence pages; typographic-anchor + contextual image slot on homepage (Phase 0.5 — see Hero composition section).

**Phase 0.5 — Containers.** Three width tiers and a clamp() gutter replace the old edge-to-edge layout.

| Token | Width | Use |
|---|---|---|
| `--container-narrow` | 720px | Long-form body, measure-respecting prose, single-column pages |
| `--container-default` | 960px | Mixed-content pages, disclosure rows, mid-density grids |
| `--container-wide` | 1200px | Homepage hero, practice-areas grid, footer |
| `--gutter` | `clamp(20px, 5vw, 96px)` | Horizontal padding on every container |

Sticky bar and the cal.com band intentionally full-bleed. Everything else respects a container. The 66ch measure cap on paragraph text remains in force.

## Buttons (locked 2026-05-12 → red moved off hero Phase 0.5)

| Variant | Treatment | Use |
|---|---|---|
| `cc-emergency` | `#C23616` solid fill, white text, 2px radius, ≥56px tall, weight 700 | Sticky bar, designated emergency banners. Chrome only. |
| `cc-nav-call` | `#C23616` solid fill, white text, 2px radius, 44px tall, weight 700, small label | Top-nav CALL button. Chrome only. |
| `cc-hero-call` | `#0E1628` solid fill, white text, 2px radius, ≥56px tall, weight 700 | Phone CTA on hero. Phone number printed in button text — "CALL 07922 247 999". |
| `cc-hero-whatsapp` | `#0E1628` 2px outline, transparent fill, brand text; inverts to white-on-navy on hover; ≥56px tall | WhatsApp CTA on hero. Equal weight to phone. |
| `cc-advisory` | `#0E1628` solid fill, white text, 4px radius, 48px tall, weight 600 | cal.com bookings, fees, Direct Access explainer. Secondary visual weight. |
| `cc-outline` | `#0E1628` 1.5px outline, transparent fill, brand text; inverts on hover; 48px tall | Neutral outline button outside the hero. |
| Quick-exit | `#C23616` 2px outline, transparent fill, brand text; inverts on hover; 44px tall | Safety exit only — fixed top-right floating chip. |

**DEPARTURE from original lock (Phase 0.5 iteration round 2):** original aesthetic specified `#C23616` solid as the hero phone CTA. Phase 0.5 moves red off hero entirely (red-allocation rule). Hero phone is now navy solid; hero WhatsApp is navy outline. Sticky bar remains the sole red surface on emergency-intent pages; top-nav CALL is the second red surface on every page. Hero retains emergency tap-target sizing (≥56px).

**DEPARTURE from original lock (Phase 0.5 iteration round 4):** hero CTA pair locked as **navy solid (phone) + navy outline (WhatsApp)** after `AskUserQuestion` session re-entry confirmation. Maintains dual-channel parity per Rapid Outreach UX §3.1.

## Motion (locked 2026-05-12 → expanded Phase 0.5 iteration round 2)

**DEPARTURE from original lock:** original aesthetic stated "Sticky bar: slide-up on first paint, ~200ms ease-out. One animation, page-level." Phase 0.5 expands to a multi-token motion system. The system stays restrained — no bounce, no overshoot, no scale-on-hover, no parallax, no scroll-triggered reveals. The motion budget is reserved for state legibility and direction-of-action affordance.

Token durations:
- `--motion-duration-nudge: 120ms` — arrow nudge on directional links
- `--motion-duration-quick: 150ms` — hover transitions, icon rotations
- `--motion-duration-fast:  200ms` — sticky-bar entry, drawer slide
- `--motion-duration-grace: 280ms` — mega-menu close-delay forgiveness

Behaviours:
- **Hover** on every interactive element. Light-background buttons darken 10% (`color-mix(in srgb, X, #000 10%)`); dark-background buttons (navy fills) lighten 10%. Emergency-accent solid uses its dedicated darker tokens (`#A02D12` / `#861F08`).
- **State-change icons** animate. Hamburger glyph morphs to a close-cross on drawer-open. Mega-menu chevron rotates 180° on open. Accordion chevrons rotate 90°.
- **Arrow nudge.** `.link-arrow::after` translates 4px in the direction the arrow faces on hover, ~120ms ease-out. Text stays still.
- **Sticky bar.** Slide-up on first paint, ~200ms ease-out. Single page-level entry.
- **Mega-menu.** Hover-open no delay; close on ~280ms grace. Touch press-to-open. Keyboard Enter/Space opens. Esc closes (and counts toward quick-exit double-tap).
- **Reduced motion.** `prefers-reduced-motion` zeros every duration token — decorative motion goes away; state-essential changes still happen but instantly. State (drawer open/close, panel hidden/shown) still flips, just without animation.

## Hero composition (Phase 0.5)

**DEPARTURE from original lock:** original aesthetic locked "typographic-anchor (no image, no video, no carousel)" hero. Phase 0.5 iteration round 1 adds one contextual hero image on the homepage only (Freshfields/Bain pattern). Other heroes (offence pages, advisory pages) remain typographic-anchor.

- **Layout:** two-column grid on desktop (text 1.15fr / image 1fr), single-column stack on tablet/mobile with image first.
- **Image slot:** 4:5 aspect on desktop, 16:9 on mobile. Background placeholder `#F4F4F5` until image provided.
- **Subject matter (locked Phase 0.5 iteration round 4):** architectural detail — chambers entrance / Marylebone street geometry. Specific subject TBD; sourced separately before Phase 1 homepage build.
- **Forbidden subjects:** stock photography of any kind, gavels, scales, Inn courtyards, courthouse exteriors, people, AI-generated faces, heraldic vocabulary.

## Quick-exit safety feature (Phase 0.5 iteration round 3 — new design-system component)

UK Refuge / Women's Aid / gov.uk safety convention. Outside the three deep-research reports' coverage; scaffolded via the `ux-designer` skill per `feedback_decision_process_protocol`.

- **Component:** floating outlined red button, fixed top-right, every page, no exclusions. 44px tall, 2px solid `#C23616` border, transparent fill, `#C23616` text at rest. Full inversion on hover (fill → `#C23616`, text → white).
- **Label:** "Quick exit"
- **Keyboard:** Esc-twice within 1000ms triggers. Single Esc closes any open mega-menu / drawer / modal.
- **Action:** `window.location.replace('https://www.google.com')`. Same tab. No confirmation, no farewell page.
- **ARIA:** `aria-label="Leave this site immediately — opens Google in this tab"`.
- **Tooltip on cursor devices only:** "Quickly leaves this site. Press Esc twice as a shortcut."
- **Z-index:** above the sticky bar. Hidden when printing.

## cal.com embed band (Phase 0.5 iteration round 2 — new design-system primitive)

- **Placement:** advisory pages only — `/consultation`, `/practice-areas/*/fees`, `/direct-access`, `/what-to-expect`. Never on emergency-intent pages.
- **Surface:** full-bleed `#232536` band; iframe wrapper centred, max-width 720px, white background, 2px radius.
- **Type inversion:** white headings and eyebrows; ~85% white body text within this band only.
- **Performance:** iframe lazy-loaded with `loading="lazy"` and `importance="low"`; never above the fold; cal.com script deferred.

## Sticky emergency bar (locked 2026-05-12 → never-hides Phase 0.5)

**DEPARTURE from research norm (Rapid Outreach §5.4):** Rapid Outreach UX research recommended hiding the sticky bar on the `/contact` route itself. Phase 0.5 iteration round 2 overrides: **the sticky bar persists across every route including `/contact`.** Reason: brand signal of always-reachability outweighs the minor redundancy on the contact page.

## Accessibility floor (Phase 0.5 iteration round 3 — WCAG 2.2 AA, locked)

- **Skip-to-content link** — visually hidden until keyboard focus, then surfaces top-left at high contrast. Skips directly to `<main>`.
- **Focus rings** — 2px solid `--color-focus` (`#0F4C81`) with 2px offset on every interactive element. White ring with negative inset on emergency-accent solid surfaces (sticky bar, top-nav CALL) so the ring is visible on red.
- **ARIA landmarks** — `<header>`, `<nav aria-label="Primary">`, `<main id="main">`, `<aside>`, `<footer>` on every page.
- **ARIA labels** — every icon-only button (hamburger, quick-exit) carries an `aria-label` describing intent.
- **ARIA live regions** — polite announcements after CTA click ("Calling 07922 247 999", "Opening WhatsApp") in a single page-level `aria-live="polite"` region.
- **Tooltips** — cursor devices only, `aria-describedby` linked, ~500ms appear delay. Touch devices show permanent labels in their place.
- **Keyboard parity** — every action triggerable by mouse or touch is triggerable by keyboard. No hover-only content. No mouse-only operations.
- **Contrast** — body 4.5:1 minimum, UI / large text 3:1 minimum.
- **`prefers-reduced-motion`** — honoured for decorative motion; state-essential changes (open/close, focus rings) remain.
- **`prefers-color-scheme`** — out of scope for v1. Site is white-ground only.

## Medium-optimised UX (Phase 0.5 iteration round 3 — system rule, locked)

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
- **Phase 0.5 additions:**
  - Emergency-accent `#C23616` outside the chrome surfaces (sticky bar, top-nav CALL, designated emergency banners, quick-exit-outlined). Forbidden in hero CTAs, body, links, dividers, icon fills, mega-menu chips, footer chrome.
  - Alternating tonal-step section bands across a page. Tonal-step is surgical — 1–2 emphasis sections per page maximum, never alternated. Cross-reference `feedback_no_alternating_banding`.
  - Hero image subjects: stock, gavels, scales, Inn courtyards, courthouse exteriors, people, AI-generated faces.

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

## Wordmark + logo (locked 2026-05-12 → SVG received Phase 0.5)

**DEPARTURE from original lock:** original aesthetic stated "No mark, no monogram, no crest. The wordmark is the entire visual identity." Phase 0.5 iteration round 3: client supplied an existing logo SVG ([src/assets/logo-white.svg](../../src/assets/logo-white.svg)) — a single asset with a 32×32 abstract mark left of the wordmark "ASTONS LAW CHAMBERS" on the same baseline. The four quarter-form shapes read as an abstract crest without using heraldic vocabulary; within research permissions.

- **Navy variant** at [src/assets/logo-navy.svg](../../src/assets/logo-navy.svg) — used on white surfaces (nav, footer, light backgrounds).
- **White variant** at [src/assets/logo-white.svg](../../src/assets/logo-white.svg) — used on `#0E1628` navy footer bands and the `#232536` cal.com band.
- **Header display:** mark + wordmark together at ~32px height; total chrome height ~40px.
- **Mobile (<480px):** mark only at 28×28; wordmark hidden in chrome to preserve real estate for the CALL CTA and quick-exit. Wordmark surfaces in the footer.
- **Favicon:** mark portion only, 32 / 16 / 180 (Apple touch) / 512 (manifest).
- The wordmark text class (`.wordmark` in `typography.css`) remains for any footer or copy contexts where the SVG is not appropriate.
