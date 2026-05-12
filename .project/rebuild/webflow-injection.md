# Webflow Custom-Code Injection Guide

Place the following blocks in **Project Settings → Custom Code** in the Webflow Designer for the rebuild. Update the version pin after each release; never use `@main` in production.

**Current pin: `@v1.2.0`** (Phase 0.5 visual layering bundle).

---

## 1. Head Code (inside `<head>`)

```html
<!-- Astons Law Chambers — design system head injection (v1.2.0) -->

<!-- Suppress webflow.js interactions (we replace them with MAST + custom CSS) -->
<!-- MUST come before Webflow's own script. Reclaims 200–400ms INP budget. -->
<script>window.WebflowEnabled = false;</script>

<!-- Plex Sans — distinct <link> rather than @import for parser speed -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap">

<!-- Design system bundle (tokens + typography + components) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/mxhfxz/astons-law-chambers@v1.2.0/dist/bundle.min.css">

<!-- Security headers documented in .project/rebuild/security-headers.md  -->
<!-- (configure these in Webflow hosting panel, not here)                 -->
```

### Notes on the `webflow.js` kill switch

- The line `<script>window.WebflowEnabled = false;</script>` is the documented community pattern for telling Webflow's runtime not to initialise its interactions library. It must execute **before** Webflow's own injected script, which is why it lives at the top of the head.
- If a residual Webflow interaction is needed somewhere (animation, scroll-trigger), remove the kill switch on that specific page only and audit the INP cost.

---

## 2. Footer Code (just before `</body>`)

```html
<!-- Astons Law Chambers — site JS (v1.2.0) -->
<script src="https://cdn.jsdelivr.net/gh/mxhfxz/astons-law-chambers@v1.2.0/dist/site.min.js" defer></script>
```

The `defer` attribute is critical — it ensures the script runs after parsing without blocking. The script runs on `DOMContentLoaded`, mutates `wa.me` links, ensures `tel:` hrefs, wires the mega-menu / drawer / quick-exit handlers, attaches polite live-region announcements, and triggers the sticky-bar slide-up.

---

## 3. Per-page chrome markup

Every page receives these blocks. Order matters: skip-link first (focus order), then quick-exit (fixed position, no flow), then nav, then `<main>`, then footer, then sticky-bar.

### 3.1 Skip-to-content link (every page, very first element in `<body>`)

```html
<a class="skip-link" href="#main">Skip to content</a>
```

### 3.2 Quick-exit safety button (every page, no exclusions)

```html
<button class="quick-exit" data-quick-exit
        aria-label="Leave this site immediately — opens Google in this tab"
        title="Quickly leaves this site. Press Esc twice as a shortcut.">
  Quick exit
</button>
```

### 3.3 Site nav with logo, mega-menu, CALL button, hamburger (every page)

```html
<nav class="site-nav" aria-label="Primary">
  <div class="site-nav__inner">
    <a href="/" class="site-nav__brand" aria-label="Astons Law Chambers — home">
      <img src="https://cdn.jsdelivr.net/gh/mxhfxz/astons-law-chambers@v1.2.0/src/assets/logo-navy.svg"
           alt="Astons Law Chambers" class="brand-logo">
    </a>

    <ul class="site-nav__menu">
      <li class="nav-item has-mega">
        <button class="has-mega__trigger" aria-expanded="false" aria-controls="mega-practice" aria-haspopup="true">
          Practice areas
          <svg class="has-mega__chevron" viewBox="0 0 12 12" aria-hidden="true">
            <path d="M2 4 L6 8 L10 4" stroke="currentColor" stroke-width="1.5"
                  fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </li>
      <li><a href="/direct-access">Direct Access</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>

    <a href="tel:+447922247999" class="btn cc-nav-call site-nav__cta" data-phone-link>
      CALL 07922 247 999
    </a>

    <button class="hamburger" data-drawer-toggle aria-expanded="false"
            aria-controls="primary-drawer" aria-label="Open menu">
      <span class="hamburger__bars"><span></span></span>
    </button>
  </div>

  <div id="mega-practice" class="mega-menu" hidden>
    <div class="mega-menu__inner">
      <div class="mega-menu__panel">
        <div class="mega-menu__col">
          <h3 class="mega-menu__col-title">Person offences</h3>
          <ul class="mega-menu__list">
            <li><a class="mega-menu__link" href="/practice-areas/violent-offences">Violent Offences</a></li>
            <li><a class="mega-menu__link" href="/practice-areas/sexual-offences">Sexual Offences</a></li>
            <li><a class="mega-menu__link" href="/practice-areas/drug-offences">Drug Offences</a></li>
            <li><a class="mega-menu__link" href="/practice-areas/youth-crime">Youth Crime</a></li>
            <li><a class="mega-menu__link" href="/practice-areas/theft-robbery">Theft &amp; Robbery</a></li>
          </ul>
        </div>
        <div class="mega-menu__col">
          <h3 class="mega-menu__col-title">Financial offences</h3>
          <ul class="mega-menu__list">
            <li><a class="mega-menu__link" href="/practice-areas/fraud-financial-crime">Fraud &amp; Financial Crime</a></li>
            <li><a class="mega-menu__link" href="/practice-areas/money-laundering-poca">Money Laundering &amp; POCA</a></li>
          </ul>
        </div>
        <div class="mega-menu__col">
          <h3 class="mega-menu__col-title">Procedural &amp; other</h3>
          <ul class="mega-menu__list">
            <li><a class="mega-menu__link" href="/practice-areas/driving-offences">Driving Offences</a></li>
            <li><a class="mega-menu__link" href="/practice-areas/appeals">Appeals</a></li>
            <li><a class="mega-menu__link" href="/practice-areas/inquests">Inquests</a></li>
          </ul>
        </div>
      </div>
      <div class="mega-menu__foot">
        <a class="link-arrow" href="/practice-areas">Full practice list</a>
        <a href="tel:+447922247999" data-phone-link>07922 247 999</a>
        <a href="#" data-whatsapp-context="homepage">WhatsApp</a>
      </div>
    </div>
  </div>
</nav>

<aside id="primary-drawer" class="drawer" data-drawer hidden>
  <a href="tel:+447922247999" class="btn cc-nav-call drawer__call" data-phone-link>CALL 07922 247 999</a>
  <ul class="drawer__list">
    <li>
      <button data-drawer-accordion aria-expanded="false" aria-controls="drawer-practice">Practice areas</button>
      <ul id="drawer-practice" class="drawer__accordion-list" hidden>
        <li><a href="/practice-areas/violent-offences">Violent Offences</a></li>
        <li><a href="/practice-areas/sexual-offences">Sexual Offences</a></li>
        <li><a href="/practice-areas/drug-offences">Drug Offences</a></li>
        <li><a href="/practice-areas/youth-crime">Youth Crime</a></li>
        <li><a href="/practice-areas/theft-robbery">Theft &amp; Robbery</a></li>
        <li><a href="/practice-areas/fraud-financial-crime">Fraud &amp; Financial Crime</a></li>
        <li><a href="/practice-areas/money-laundering-poca">Money Laundering &amp; POCA</a></li>
        <li><a href="/practice-areas/driving-offences">Driving Offences</a></li>
        <li><a href="/practice-areas/appeals">Appeals</a></li>
        <li><a href="/practice-areas/inquests">Inquests</a></li>
      </ul>
    </li>
    <li><a href="/direct-access">Direct Access</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</aside>
```

### 3.4 `<main>` opens here

```html
<main id="main">
  <!-- page content -->
</main>
```

### 3.5 Sticky emergency bar — emergency-intent pages only

Inject this block in the page-level Custom Code (Page Settings → Custom Code → Before `</body>`) on every emergency-intent page (homepage + all ten practice-area pages). Advisory pages (fees, Direct Access explainer, `/consultation`) and `/contact` get the sticky bar too — iteration 2 override: never hides.

```html
<div class="sticky-emergency-bar" role="region" aria-label="Emergency contact">
  <a href="tel:+447922247999" class="sticky-emergency-bar__link" data-phone-link>
    Call 07922 247 999
  </a>
  <div class="sticky-emergency-bar__divider" aria-hidden="true"></div>
  <a href="#" class="sticky-emergency-bar__link" data-whatsapp-context="homepage">
    WhatsApp →
  </a>
</div>
```

Replace `data-whatsapp-context="homepage"` per page:

| Page | Context value |
|---|---|
| Homepage | `homepage` |
| Drug Offences | `drug` |
| Sexual Offences | `sexual` |
| Violent Offences | `violent` |
| Fraud & Financial Crime | `fraud` |
| Driving Offences | `driving` |
| Theft & Robbery | `theft` |
| Money Laundering & POCA | `money-laundering` |
| Youth Crime | `youth` |
| Appeals | `appeal` |
| Inquests | `inquest` |
| Crown Court hearing landing | `crown-court` |
| Magistrates' Court landing | `magistrates` |
| Arrested explainer | `arrested` |
| Police station explainer | `police-station` |
| Consultation page | `consultation` |
| Fees page | `fees` |

The site.js mapping is in [src/site.js](../../src/site.js) — add new contexts there if a new page warrants its own prefilled message.

### 3.6 cal.com booking band — advisory pages only

Drop this block at the page-end on advisory pages (`/consultation`, `/practice-areas/*/fees`, `/direct-access`, `/what-to-expect`). Never on emergency-intent pages.

```html
<section class="section cc-booking">
  <div class="container cc-default">
    <span class="eyebrow">Consultation</span>
    <h2>Book a 30-minute consultation.</h2>
    <p>For non-emergency matters: pick a slot. The consultation is paid; clerks confirm fees in advance.</p>
    <div class="cal-embed" role="region" aria-label="Calendar booking">
      <!-- cal.com embed snippet goes here. Lazy-loaded, deferred. -->
    </div>
  </div>
</section>
```

---

## 4. Contact page note

Phase 0.5 override: the sticky bar **no longer hides** on `/contact`. The redundant phone+WhatsApp on the page itself is acceptable because the sticky bar's presence is the brand signal of always-reachability. The `cc-on-contact` body class is retired.

---

## 5. Webflow Variables to set in the Designer

Mirror the token values from [src/tokens.css](../../src/tokens.css) into Webflow's Variable collections so Mast components can reference them in the visual builder.

### Colour collection

| Variable | Value | Role |
|---|---|---|
| brand-primary | `#0E1628` | Dominant brand + body text |
| emergency-accent | `#C23616` | Chrome-only red (sticky bar, top-nav CALL, designated emergency banners) |
| interactive-accent | `#0F4C81` | Carbon blue 60 — text-link state + focus ring |
| booking-frame | `#232536` | cal.com embed band (advisory pages only) |
| surface | `#FFFFFF` | Default surface |
| surface-secondary | `#F4F4F5` | Surgical tonal-step (1–2 per page) |
| grey-200 | `#E4E4E7` | Divider, card border |
| grey-500 | `#71717A` | Disabled, placeholder |
| grey-600 | `#52525B` | Caption / fine print |

### Typography collection

| Variable | Value |
|---|---|
| font-family-sans | `IBM Plex Sans, sans-serif` |
| font-size-eyebrow | `0.75rem` |
| font-size-caption | `clamp(0.8125rem, 0.78rem + 0.15vw, 0.875rem)` |
| font-size-small | `clamp(0.875rem, 0.85rem + 0.15vw, 0.9375rem)` |
| font-size-body | `clamp(1rem, 0.95rem + 0.25vw, 1.125rem)` |
| font-size-body-lg | `clamp(1.125rem, 1.05rem + 0.3vw, 1.25rem)` |
| font-size-h3 | `clamp(1.25rem, 1rem + 0.75vw, 1.5rem)` |
| font-size-h2 | `clamp(1.5rem, 1.1rem + 1.5vw, 2.25rem)` |
| font-size-h1 | `clamp(2rem, 1.25rem + 3.5vw, 3.25rem)` |
| font-size-hero | `clamp(2.25rem, 1.25rem + 4vw, 4rem)` |

### Layout collection

| Variable | Value |
|---|---|
| container-narrow | `720px` |
| container-default | `960px` |
| container-wide | `1200px` |
| gutter | `clamp(20px, 5vw, 96px)` |
| nav-height | `72px` |
| nav-height-mobile | `56px` |

### Component collection

| Variable | Value |
|---|---|
| section-padding-compact | `clamp(2rem, 1.5rem + 2vw, 3rem) 0` |
| section-padding-default | `clamp(3rem, 2rem + 4vw, 5rem) 0` |
| section-padding-generous | `clamp(4rem, 2.5rem + 6vw, 7rem) 0` |
| card-border-radius | `2px` |
| button-radius-emergency | `2px` |
| button-radius-advisory | `4px` |
| emergency-bar-height | `64px` |
| emergency-bar-height-mobile | `56px` |
| touch-target-min | `48px` |
| touch-target-emergency | `56px` |
| quick-exit-size | `44px` |

### Motion collection

| Variable | Value |
|---|---|
| motion-duration-nudge | `120ms` |
| motion-duration-quick | `150ms` |
| motion-duration-fast | `200ms` |
| motion-duration-grace | `280ms` |
| motion-ease | `cubic-bezier(0.2, 0, 0, 1)` |
| hover-darken | `10%` |
| hover-lighten | `10%` |

### Theme aliases

| Variable | Value |
|---|---|
| text-primary | `var(--color-brand-primary)` |
| background-primary | `var(--color-surface)` |
| border-default | `var(--color-grey-200)` |
| focus-color | `var(--color-interactive-accent)` |
| link-color | `var(--color-interactive-accent)` |

---

## 6. Local smoke test before going to Webflow

Open `dist/preview.html` in a browser:

```bash
open dist/preview.html
```

Verify visually across all three breakpoints (desktop 1280 / tablet 768 / mobile 390):
- [ ] Plex Sans renders (not falling back to system sans)
- [ ] `#0E1628` body and headings, pure white background
- [ ] `#C23616` sticky bar + top-nav CALL button — and nowhere else in chrome
- [ ] Hero CTAs render as navy solid (phone) + navy outline (WhatsApp)
- [ ] Mega-menu opens on hover at desktop, hides at ≤991px, surfaces in hamburger drawer
- [ ] Quick-exit button visible top-right; Esc-twice within 1s replaces URL to google.com
- [ ] Sticky bar slides up from bottom on first paint (toggle reduced-motion in DevTools to confirm graceful fallback)
- [ ] Tapping the Call button on a phone fires the native dialer
- [ ] Tapping the WhatsApp button opens wa.me with the prefilled message
- [ ] Focus ring (Carbon blue 60) visible on every interactive element via Tab
- [ ] No console errors

---

## 7. Versioning

After every change to `src/`:

```bash
npm run build
```

Then bump `package.json` version, commit, push, tag:

```bash
git add src/ dist/ package.json
git commit -m "..."
git tag v1.x.x
git push origin main --follow-tags
```

jsDelivr resolves the new tag within ~60 seconds. Update the Webflow head and footer references to the new version pin before publishing.

---

## 8. Open items

- Self-host Plex Sans woff2 files in `dist/fonts/` if CrUX/PageSpeed reports show LCP regression from Google Fonts CDN
- Add schema injection (`LegalService` + `Person` + `Service`) — separate file `dist/schema.json` and a small loader in `site.js`. Deferred to Phase 1 step 1.9.
- IndexNow integration — deferred to Phase 3
- Provide architectural-detail hero image asset (homepage only) — subject TBD, sourced separately before Phase 1 homepage build
- cal.com embed code — replace placeholder in `.cal-embed` wrapper with the actual cal.com inline embed snippet for the booked routine
