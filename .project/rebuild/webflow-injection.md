# Webflow Custom-Code Injection Guide

Place the following blocks in **Project Settings → Custom Code** in the Webflow Designer for the rebuild. Update the version pin (`@v1.1.0` or similar) after each release; never use `@main` in production.

---

## 1. Head Code (inside `<head>`)

```html
<!-- Astons Law Chambers — design system head injection (v1.1.0) -->

<!-- Suppress webflow.js interactions (we replace them with MAST + custom CSS) -->
<!-- MUST come before Webflow's own script. Reclaims 200–400ms INP budget. -->
<script>window.WebflowEnabled = false;</script>

<!-- Plex Sans — distinct <link> rather than @import for parser speed -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap">

<!-- Design system bundle (tokens + typography + components) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/mxhfxz/astons-law-chambers@v1.1.0/dist/bundle.min.css">

<!-- Security headers documented in .project/rebuild/security-headers.md  -->
<!-- (configure these in Webflow hosting panel, not here)                 -->
```

### Notes on the `webflow.js` kill switch

- The line `<script>window.WebflowEnabled = false;</script>` is the documented community pattern for telling Webflow's runtime not to initialise its interactions library. It must execute **before** Webflow's own injected script, which is why it lives at the top of the head.
- If a residual Webflow interaction is needed somewhere (animation, scroll-trigger), remove the kill switch on that specific page only and audit the INP cost.

---

## 2. Footer Code (just before `</body>`)

```html
<!-- Astons Law Chambers — site JS (v1.1.0) -->
<script src="https://cdn.jsdelivr.net/gh/mxhfxz/astons-law-chambers@v1.1.0/dist/site.min.js" defer></script>
```

The `defer` attribute is critical — it ensures the script runs after parsing without blocking. The script itself runs on `DOMContentLoaded`, mutates wa.me links, ensures `tel:` hrefs, and triggers the sticky-bar slide-up.

---

## 3. Per-page sticky-emergency-bar markup

Inject this block in the page-level Custom Code (Page Settings → Custom Code → Before `</body>`) on every emergency-intent page (homepage + all ten practice-area pages). NOT on advisory pages (fees, Direct Access explainer, `/consultation`) and NOT on the contact page itself.

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

---

## 4. Contact page body class

On the contact page only, add `cc-on-contact` to `<body>` via Page Settings → Custom Code:

```html
<script>document.body.classList.add('cc-on-contact');</script>
```

This hides the sticky bar (the visitor is already on the contact surface — sticky bar would be redundant and would consume vertical space).

---

## 5. Webflow Variables to set in the Designer

Mirror the token values from [src/tokens.css](../../src/tokens.css) into Webflow's Variable collections so Mast components can use them in the visual builder. Approximate mapping:

| Webflow Variable Collection | Variable | Value |
|---|---|---|
| **Color** | brand-primary | `#0E1628` |
| **Color** | emergency-accent | `#C23616` |
| **Color** | surface | `#FFFFFF` |
| **Color** | surface-secondary | `#F4F4F5` |
| **Color** | grey-200 | `#E4E4E7` |
| **Color** | grey-500 | `#71717A` |
| **Color** | grey-600 | `#52525B` |
| **Typography** | font-family-sans | `IBM Plex Sans, sans-serif` |
| **Typography** | heading-h1-size | `clamp(2rem, 1.5rem + 2.5vw, 3rem)` |
| **Typography** | heading-h2-size | `clamp(1.75rem, 1.4rem + 1.5vw, 2.25rem)` |
| **Typography** | body-size | `1rem` |
| **Layout** | container-max-width | `1200px` |
| **Layout** | grid-gap | `1.5rem` |
| **Components** | section-padding | `4rem 0` |
| **Components** | card-border-radius | `2px` |
| **Components** | button-radius-emergency | `2px` |
| **Components** | button-radius-advisory | `4px` |
| **Theme** | text-primary | brand-primary |
| **Theme** | background-primary | surface |
| **Theme** | border-default | grey-200 |

---

## 6. Local smoke test before going to Webflow

Open `dist/preview.html` in a browser:

```bash
open dist/preview.html
```

Verify visually:
- [ ] Plex Sans renders (not falling back to system sans)
- [ ] `#0E1628` body and headings, pure white background
- [ ] `#C23616` emergency CTAs (Call button + sticky bar)
- [ ] Sticky bar slides up from bottom on first paint (toggle reduced-motion in DevTools to confirm graceful fallback)
- [ ] Tapping the Call button on a phone fires the native dialer
- [ ] Tapping the WhatsApp button opens wa.me with the prefilled message
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
git push origin main --tags
```

jsDelivr will resolve the new tag within ~60 seconds. Update the Webflow head and footer references to the new version pin before publishing.

---

## 8. Open items

- Self-host Plex Sans woff2 files in `dist/fonts/` if CrUX/PageSpeed reports show LCP regression from Google Fonts CDN
- Add schema injection (`LegalService` + `Person` + `Service`) — separate file `dist/schema.json` and a small loader in `site.js`. Deferred to Phase 1 step 1.9.
- IndexNow integration — deferred to Phase 3
