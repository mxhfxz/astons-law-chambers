# Spec — Mobile performance (PageSpeed 88 → 95+)

**Date:** 2026-05-19
**Phase:** specify → plan
**Skills:** web-performance-optimization, frontend-design, project-mgmt

## Why

PageSpeed Insights: desktop 100, **mobile 88**. Accessibility / Best Practices /
SEO all 100. The mobile gap is entirely loading speed:
- First Contentful Paint **3.0s** (red)
- Largest Contentful Paint **3.1s** (orange)
- Total Blocking Time 0ms, CLS 0.002 — both already excellent.

So the fix is the critical render path, not interactivity or layout stability.

## Root cause (from the PageSpeed report)

1. **Web font loaded from Google's CDN.** `app/layout.tsx` injects
   `<link href="fonts.googleapis.com/css2?family=IBM+Plex+Sans...">`. That
   creates a render-blocking request (750ms) and a 2-hop critical-path chain
   (`fonts.googleapis.com` CSS → `fonts.gstatic.com` woff2), max critical-path
   latency **1,049ms**. This is the dominant cause of the 3.0s FCP.
2. **Legacy JavaScript — 12 KiB.** Next/SWC ships polyfills for baseline
   features (`Array.prototype.at/flat/flatMap`, `Object.fromEntries/hasOwn`,
   `String.prototype.trimStart/trimEnd`) because no modern `browserslist` is
   set in `package.json`.
3. **Unused JavaScript — 22 KiB** in one app chunk — partly the same
   polyfill/transpile overhead, partly framework code.
4. **Hero image — 17 KiB over-weight.** `public/hero_image.webp` is 74 KB at
   720×656; recompresses to ~55 KB with no visible loss.
5. **CookieYes `close.svg` short cache TTL** — third-party CDN, no control.
6. **Forced reflow 35ms, unattributed** — below the meaningful threshold.

## Requirements

### Must have
- Eliminate the Google Fonts external request and critical-path chain by
  self-hosting IBM Plex Sans (SIL OFL 1.1 — self-hosting permitted).
- Self-host approach must NOT break the precompiled-CSS contract: the literal
  family name `IBM Plex Sans` is hard-referenced in `app/preview-tailwind.css`
  and `app/preview-styles.css`, so the self-hosted font must register under
  that exact family name.
- Set a modern `browserslist` so the polyfill chunk is dropped.
- Recompress the hero image.

### Should have
- Preload the primary font weight(s) used above the fold.

### Won't have
- No change to CookieYes / GA / cal.com loading strategy (consent + KPI).
- No chasing the 35ms forced reflow.
- No move to `next/font` (its hashed family name conflicts with the literal
  `IBM Plex Sans` references in the precompiled CSS — see findings.md).

## Acceptance criteria
- No request to `fonts.googleapis.com` / `fonts.gstatic.com` in the network log.
- `npm run build` + `type-check` clean.
- Re-run PageSpeed mobile: FCP < 1.8s, LCP < 2.5s, score ≥ 95.
- Real-browser check desktop + mobile: fonts render correctly, no FOUT flash,
  layout unchanged.
