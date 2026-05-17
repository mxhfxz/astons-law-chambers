# Visual Adjustment — Pre-change Baseline

Captured 2026-05-17 against https://alc-staging.vercel.app (Lighthouse,
headless, default mobile throttling).

## Numbers

| Metric | Value | Verdict |
|---|---|---|
| Contrast audit failures | 0 (371 elements) | PASS |
| Lighthouse Accessibility | 100 | PASS |
| Lighthouse Performance | 36 | **FAIL — poor** |
| Largest Contentful Paint | 16.3 s | **FAIL — target <2.5s** |
| Cumulative Layout Shift | 0.824 | **FAIL — target <0.1** |
| First Contentful Paint | 5.7 s | **FAIL — target <1.8s** |
| Speed Index | 6.0 s | poor |
| Total Blocking Time | 0 ms | PASS |

## Finding: the baseline is already performance-broken

This was meant to be a reference point for the visual changes. Instead it
surfaced a pre-existing problem: the site has failing Core Web Vitals.

### Cause — homepage payload

Largest network downloads on the homepage:

| Size | Resource | Ours? |
|---|---|---|
| 158 KB | googletagmanager gtag `G-8X2PMCMX55` | NO — injected by cal.com embed |
| 155 KB | googletagmanager `G-8TDVMH13D7` | yes — site GA |
| 155 KB | googletagmanager `G-8TDVMH13D7` (2nd) | yes — duplicated |
| 155 KB | googletagmanager gtag (cal.com) | NO — cal.com embed |
| 133 KB | cal.com app chunk | NO — cal.com embed |
| 124 KB | cdn.tailwindcss.com | yes — render-blocking |
| 121 KB | googletagmanager `GTM-WHZFMV49` | NO — cal.com embed |
| 106 KB | cal.com embed iframe | NO — cal.com embed |

The cal.com booking calendar is embedded **inline on the homepage**. Every
homepage visit therefore downloads cal.com's entire app plus cal.com's own
Google Tag Manager + GA stack — roughly 500KB+ of third-party weight before
the visitor does anything. Confirmed: `G-8X2PMCMX55` and `GTM-WHZFMV49` do
not appear in our HTML at all — they ride in with the cal.com embed.

On top of that, the Tailwind CDN (124KB) is render-blocking and compiles CSS
in the browser at runtime.

CLS 0.824 is driven by content that renders/reflows after first paint — the
cal.com iframe and the JS-injected practice-area cards and FAQs.

## Implication for the visual plan

Task 2 (hero image) adds weight to a page that already has a 16s LCP. It
must not ship until the performance problem is addressed, or it makes a bad
metric worse.

Task 1 (dark hero) and Task 3 (dark accent section) are pure CSS — they add
no weight and are safe to proceed regardless.

The performance problem is now the highest-priority item and is tracked
separately from the visual pass.
