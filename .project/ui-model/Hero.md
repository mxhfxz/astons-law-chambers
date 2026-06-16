# class Hero extends Header

Dark, two-column hero for conversion/content pages.

```
class Hero extends Header {
    classes = "bg-footer text-white hero-split"           // same on every page (incl. home)
    layout  = two-column (left: content, right: image)     // grid 1fr 1fr @ ≥1024px

    // left column (.hero-split-left), top → bottom:
    h1       = <h1 fluid-h1 font-semibold tracking-tight2>       // first element, uniform clamp, never overflows
    copy?    = <p mt-6 fluid-lead text-navy-100/90 max-w-prose>  // OPTIONAL short context line
    ctaRow   = .btn-row { primaryCTA, secondaryCTA }
    bsbLink  = <p mt-4 text-xs> "Regulated by the Bar Standards Board"   // on EVERY hero

    // right column (.hero-split-right)
    image = <img src="/hero_image.webp" alt="" width=720 height=656 fetchpriority="high"
                 class="absolute inset-0 w-full h-full object-cover object-center">

    primaryCTA   = btn btn-lg btn-inverse btn-full -> "Book a Free Consultation" (cal.com)   // white, NO icon
    secondaryCTA = btn btn-lg btn-on-dark btn-full -> "Call 07922 247 999" (tel)             // ghost, NO icon

    // OVERRIDE — police-station only (leads with Call; no Book in hero)
    PoliceStation.primaryCTA   = btn-lg btn-emergency -> "Call Now" (red, NO icon)
    PoliceStation.secondaryCTA = btn-lg btn-on-dark   -> "WhatsApp"
}
```

## Content distribution (user spec 2026-06-16) — ≥1024px, the two-column band only
`.hero-split-left` is a flex column, `justify-content: flex-start`, `padding: 3rem` (all sides):
- **h1** sits 3rem from the top (`.hero-split-left > h1 { margin-top: 0 }`).
- **copy** sits 1rem below the h1 (`.hero-split-left .fluid-lead { margin-top: 1rem }`).
- **CTA block** is pinned 3rem from the bottom (`.hero-split-left .btn-row { margin-top: auto }`).

Band height is a floor: `.hero-split { min-height: 500px }`. Long guide H1s grow past it at 1024–1200px;
nothing overflows. Mobile/tablet (<1024px): single column, content-height, normal stacked spacing — the
distribution is NOT applied (auto margins would collapse with no free height).

## Mobile CTA emphasis (user spec 2026-06-16) — phone only (<640px)
On phones, **Call is the primary action**. For heroes whose `.btn-row` holds a Book (`.btn-inverse`) +
Call (`.btn-on-dark`) pair, a `:has()`-guarded rule reverses the stack (Call on top) and swaps the fills
(Call solid white = primary, Book ghost = secondary). Desktop is unchanged (Book primary-left, Call
ghost-right). **police-station is auto-excluded** — its hero pair is Call (`.btn-emergency`) + WhatsApp
(`.btn-on-dark`), with no `.btn-inverse`, and Call is already its prominent first CTA.

## No button icons (2026-06-16)
Hero CTAs are text-only. Inline channel icons were removed from every contact button site-wide; icons
remain ONLY in the mobile charm/sticky bar and the desktop FAB.

## Per-page notes
- **home**: h1 "Criminal Defence Barrister"; has a copy line; standard structure (the former `max-w-2xl`
  wrapper and the `.hero-split-tall` height variant were both removed).
- **insights hub** (TSX): h1 "Legal Insights"; NO copy line (h1 + CTA + BSB only).
- **insights article** (TSX): h1 = article title; copy = article description.
- **pa-detail / sub**: h1 is data-bound; NO copy line.

## CSS (app/preview-styles.css)
- `.hero-split` @≥1024px: `grid-template-columns: 1fr 1fr; min-height: 500px`.
- `.hero-split-left` base: flex column, `justify-content: center`, padding `3.5rem 1.5rem 3rem`
  (mobile) / `5rem 3rem 4rem` (≥768px).
- `.hero-split-left` @≥1024px: `justify-content: flex-start; padding: 3rem` + the distribution child rules.
- Mobile CTA flip lives in a `@media (max-width: 639px)` block (the `:has()` rules above).

## Renderer note (pa-detail)
`render-practice-area.ts` still calls `setVal('kicker')`, but the kicker markup (the old hero eyebrow)
is gone, so it's a harmless no-op — remove once confirmed.
