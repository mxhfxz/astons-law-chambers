# Core Web Vitals Performance Plan — Astons Law Chambers

**Written:** 2026-05-13 (Session C, Step 4g)
**Skill used:** web-performance-optimization
**Input files:** .project/research-01/synthesis.md, .project/planning/13-nextjs-scaffold-spec.md

---

## Targets

| Metric | Target | Source |
|--------|--------|--------|
| LCP | <2.5s (mobile 4G) | Research benchmark — 53% abandon at >3s |
| INP | <200ms | Good threshold (formerly FID) |
| CLS | <0.1 | Good threshold |
| Lighthouse mobile performance | 90+ | Research target |

All targets measured on mobile 4G (Lighthouse default: 150 Kbps throttle, 4× CPU slowdown). Desktop performance is secondary — the 84% mobile call stat makes mobile the audit target.

---

## 1. LCP — Largest Contentful Paint

LCP is determined by the largest visible element in the initial viewport. On this site, the LCP element will be the h1 heading in Zone 1 (there are no hero images).

### Strategy: Text-First Above-Fold Layout

The site has no large images above the fold. LCP element is text (h1), which is:
- Rendered as HTML server-side (no client-side hydration delay)
- Styled via CSS custom properties (no render-blocking style calculation)
- Font loaded via `next/font` (no network request at render time)

Expected LCP: <1.5s on mobile 4G for the h1 element.

### Font Loading — No Flash, No Layout Shift

```typescript
// app/layout.tsx (from 13-nextjs-scaffold-spec.md)
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  // next/font preloads the woff2 file via <link rel="preload">
  // CSS is inlined in <style> — no blocking network request
})
```

`next/font` inlines the `@font-face` CSS in the `<head>` and adds a `<link rel="preload">` for the woff2 file. No external font stylesheet request. No FOIT. Font swap happens before first render in most cases.

**`size-adjust` compensation:** `next/font/google` automatically applies `size-adjust` on the fallback font to minimise layout shift during the swap period. This is handled by the framework — no manual configuration required.

### Image Policy

All images use `next/image` with explicit `width` and `height` props. No `fill` without a defined container dimension.

```typescript
// Correct
<Image src="/logo-navy.svg" width={120} height={40} alt="Astons Law Chambers" priority />

// Incorrect — will cause CLS
<Image src="/logo.jpg" fill alt="..." />
```

Images above the fold (logo in header): use `priority` prop — this adds a `<link rel="preload">` to the `<head>`.

Images below the fold: default lazy loading (no `priority` prop needed).

Logo SVGs: inline them as React components for the header to eliminate the network request entirely. The `public/` SVG files are available.

---

## 2. INP — Interaction to Next Paint

INP measures responsiveness to user interactions. This site has minimal JavaScript — no forms, no complex state, no client-side routing overhead beyond what Next.js handles by default.

### Minimise Main Thread Blocking

| Action | Implementation |
|--------|----------------|
| GSAP loaded asynchronously | Dynamic `import()` inside `useEffect` — GSAP never blocks first paint |
| No third-party scripts in critical render path | No analytics, chat widgets, or tracking scripts inline in `<head>` |
| `StickyBar` scroll event listener | Passive event listener: `{ passive: true }` on scroll handler |
| No heavy component hydration above fold | Header and Zone 1 can be server components; only GSAP-using sections are `'use client'` |

### Scroll Handler Pattern

```typescript
// hooks/useStickyBarVisibility.ts (structure only)
useEffect(() => {
  let lastScrollY = window.scrollY

  const handleScroll = () => {
    const currentScrollY = window.scrollY
    setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100)
    lastScrollY = currentScrollY
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```

`{ passive: true }` prevents the browser from waiting for `preventDefault()` calls on scroll, allowing it to scroll without blocking the main thread.

### No Unnecessary Re-renders

- `StickyBar` is a single component with one state toggle. No cascading re-renders.
- `Header` has no stateful props that change during scrolling (except hamburger open/close).
- GSAP mutations happen directly on DOM nodes via `gsap.to()` — React does not re-render during animations.

---

## 3. CLS — Cumulative Layout Shift

CLS is the sum of unexpected layout shifts. The main risks on this site are:

### Risk 1: Font Swap Layout Shift

**Mitigation:** `next/font` with `size-adjust` on fallback font. This is automatic when using `next/font/google`. Verify by running Lighthouse after first build and checking CLS score. If CLS > 0.05 due to fonts, add explicit `font-display: optional` to reduce swap-period shift (trade: slower font availability for zero shift).

### Risk 2: `next/image` Without Explicit Dimensions

**Mitigation:** Every `<Image>` component must have explicit `width` and `height` props (or a defined container with `fill` + `position: relative`). The browser reserves space before the image loads.

Policy: if the dimensions of an image are not known at build time, do not use it. This site has a small, controlled set of images — dimensions are all knowable at development time.

### Risk 3: StickyBar Appearing and Causing Document Reflow

**Mitigation:** The StickyBar uses `position: fixed` — it is removed from document flow entirely. It does not cause CLS.

However, the StickyBar overlaps the bottom of the page content unless `padding-bottom` is applied to the page body. The StickyBar component must inject a bottom spacer class.

```typescript
// StickyBar.tsx (structure only)
// On mobile, adds padding-bottom to <body> equal to sticky-bar-height
// Uses CSS class rather than inline style

// In globals.css:
// .has-sticky-bar { padding-bottom: var(--sticky-bar-height); }
// StickyBar component adds/removes this class on <body>
```

### Risk 4: GSAP ScrollTrigger Layout Shift

**Mitigation:** GSAP changes `opacity` and `transform` only — these do not affect layout. However, `ScrollTrigger.refresh()` is triggered by layout recalculations. To prevent this:

```typescript
// After GSAP init, refresh ScrollTrigger once after all fonts and images load
window.addEventListener('load', () => {
  ScrollTrigger.refresh()
})
```

Do not call `ScrollTrigger.refresh()` repeatedly — once on load is sufficient.

### Risk 5: Dynamic Imports Causing Hydration Shift

**Mitigation:** All animated sections render their static HTML output server-side (from the server component). The `'use client'` boundary only adds the animation layer — it does not change the DOM structure. GSAP animates from a pre-rendered state, not into one.

### CLS Checklist (to run at end of each component build)

- [ ] All `<Image>` components have explicit `width` and `height`
- [ ] StickyBar spacer class applied on mobile viewports
- [ ] No `position: absolute/relative` containers without defined dimensions
- [ ] No `auto` height on elements that load content asynchronously
- [ ] Lighthouse CLS score < 0.1 on mobile audit

---

## 4. No Third-Party Scripts in Critical Render Path

This is a strict policy for this site.

| Type | Permitted? | Notes |
|------|-----------|-------|
| Google Analytics / GA4 | No — in critical path | If analytics are required, add as deferred `<script>` in a non-critical position, loaded after `DOMContentLoaded`. Discuss with client before adding any analytics. |
| Live chat widget | No | Not in the conversion strategy. Phone + WhatsApp only. |
| Marketing pixels (Facebook, etc.) | No | Not in scope; contradicts the no-email-funnel rule. |
| Google Tag Manager | No | Adds a layer of uncontrolled script injection risk. |
| next/font (Google Fonts) | Yes — inlined at build time | Not a runtime script; handled by `next/font`. |

If any script is added in future, it must be loaded with `strategy="afterInteractive"` or `strategy="lazyOnload"` using Next.js `<Script>` component. Never add a `<script>` tag directly to `<head>` in `app/layout.tsx`.

---

## 5. Sticky Bottom Bar — CLS Prevention Detail

The sticky bar interacts with performance in two ways:

**Visual overlap:** Fixed-position bar covers the last 56px of page content. `padding-bottom: var(--sticky-bar-height)` on the `<main>` element on mobile viewports.

**Scroll-triggered visibility toggle:** Show/hide transition uses CSS `transform: translateY(100%)` (not `display: none` → `display: flex`). This avoids layout recalculation entirely.

```css
/* tokens.css / globals.css */
.sticky-bar {
  transform: translateY(0);
  transition: transform var(--duration-base) var(--ease-default);
}

.sticky-bar.hidden {
  transform: translateY(100%);
}
```

`transform` and `opacity` changes do not trigger layout reflow — they are compositor-only operations. This is the correct approach for a fixed-position element that toggles visibility.

---

## 6. Lighthouse Mobile Audit Workflow

Run at the end of each phase:

```bash
# Using Lighthouse CLI (npx)
npx lighthouse https://[preview-url] \
  --emulated-form-factor=mobile \
  --throttling-method=devtools \
  --output=json \
  --output-path=./lighthouse-report.json \
  --only-categories=performance

# Or via Chrome DevTools: Lighthouse tab → Mobile → Performance
```

Target scores per phase:

| Phase | Expected Lighthouse Score | Notes |
|-------|--------------------------|-------|
| Phase 3 (layout components) | Not meaningful yet | No content |
| Phase 4 (homepage) | ≥85 | First real measurement |
| Phase 5 (practice area pages) | ≥90 | Full content loaded |
| Phase 7 (pre-launch) | ≥90, all CWV in green | Hard requirement before go-live |

---

## 7. Build Size Budget

Next.js builds report JavaScript bundle sizes. Maintain awareness:

| Bundle type | Target | Notes |
|-------------|--------|-------|
| First Load JS (shared) | <90kB | Tailwind CSS (purged) + Next.js runtime |
| Per-page JS | <50kB | Per practice area page — mostly static |
| GSAP bundle | ~30kB (tree-shaken) | Import only `gsap` core + `ScrollTrigger`; not the full GSAP suite |

GSAP tree-shaking: import only what is used.
```typescript
// Correct — tree-shakeable
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Incorrect — imports entire GSAP suite
import gsap from 'gsap'
```

---

## 8. Open Items

No open items block performance implementation. All performance decisions are stack-level, not content-dependent.

Note: If the client requires Google Analytics or similar, that decision must be made before Phase 6 (SEO/performance audit phase) so it can be factored into the CSP headers in `vercel.json` and the Lighthouse benchmark.
