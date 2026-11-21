# class Hero extends Header

Light lead hero (white content | photo media) for conversion/content pages — same design language as HomeHero.

```
class Hero extends Header {
    classes = "hero hero--image hero--lead" (+ "hero--page" on non-home)
    layout  = content panel | media panel @ ≥1024; home 80vh floor; other pages 60vh floor

    // content (.hero__panel--content) — white; light type (text-navy-950 / text-navy-700)
    h1       = <h1 fluid-h1 font-semibold tracking-tight2 text-navy-950>
    copy?    = <p mt-6 fluid-lead text-navy-700 max-w-prose>
    ctaRow   = .btn-row.hero-cta-stack { Book btn-primary, WA square + Send a Message }
    // Trust is NOT in the left column — .home-charm-bar under hero (BSB | Google | ticker)

    // media (.hero__panel--media) — bg_main full-strength, no dark overlay

    // Sitewide message modal = HeroMessageDock (layout) via [data-open-home-message]
    // Charm ticker = getCharmSlidesForPath(pathname); CRO default if no page-relevant slides

    // Sitewide urgency — every .hero--lead (HeroUrgencyBanner / WithCharmBar inject)
    urgencyBanner = .hero-urgency-banner — leadSupportDesktop / leadSupportMobile (lib/home-hero.ts)

    // OVERRIDE — home only
    Home.classes     = hero--lead (+ data-home-hero); sticky off; mobile FABs
    Home.height      = min-height calc(80vh - 72px) @≥1024
    Home.primaryCTA  = "Book a Consultation"
    Home.mobileCTA   = Call in panel; Book via FAB

    // Non-home
    Page.classes     = hero--lead hero--page
    Page.height      = min-height calc(60vh - 72px) @≥1024
    Page.primaryCTA  = keep each page’s existing Book label (e.g. "Book a Free Consultation")
    Page.sticky      = sticky hidden (hero CTAs cover contact; no home FABs)

    // OVERRIDE — police-station only (Call + WhatsApp; no Book/Message)
    PoliceStation.primaryCTA   = btn-lg btn-emergency -> "Call Now"
    PoliceStation.secondaryCTA = WhatsApp

    // Legal/utility (ex-ArticleHeader): breadcrumb stays in white panel above H1
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
- **home**: HomeHero TSX — media | light content panel; eyebrow + brand fluid-h1 + leads; Call primary /
  Book secondary; no form. Sticky bar off; mobile FABs remain.
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
