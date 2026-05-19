# Findings — mobile performance

## Font hosting — chosen approach

Three options considered:
- **`next/font/google`** — idiomatic, but generates a hashed family name
  (`__IBM_Plex_Sans_xxxx`). `app/preview-tailwind.css` (precompiled, not
  hand-editable) and `app/preview-styles.css` both hard-code
  `font-family: IBM Plex Sans`. The hashed name would not match → font would
  not apply without editing the precompiled CSS. Rejected.
- **`next/font/local`** — same hashed-name issue.
- **Manual `@font-face` self-host** — CHOSEN. Register the woff2 files under the
  literal family `'IBM Plex Sans'`. Both stylesheets keep working untouched.
  Lowest risk against the precompiled-CSS trap.

### Steps (as shipped)
1. Added IBM Plex Sans latin-subset woff2 for weights 400/500/600/700 to
   `public/fonts/` (4 files, ~22–24 KB each).
2. Added `@font-face` blocks to `app/preview-styles.css` (hand-written, editable)
   — `font-family: 'IBM Plex Sans'`, `font-display: swap`, weight per file.
3. `app/layout.tsx`: removed the `fonts.googleapis.com` `<link>` and the
   `fonts.googleapis.com` / `fonts.gstatic.com` preconnects.
4. Kept the googletagmanager + cdn-cookieyes preconnects.

Font `<link rel="preload">` was tried and removed: it produced a standing
"preloaded but not used" console warning for a marginal gain. The fonts are
same-origin and load in 5–8 ms once `preview-styles.css` parses; the preload
is not worth a noisy console. Verified: `document.fonts.check` true, all four
woff2 served 200 same-origin, zero requests to googleapis/gstatic.

Result: the render-blocking font CSS (750ms) and the gstatic woff2 hop
(1,049ms critical path) are removed. Font now loads same-origin, preloaded,
non-blocking. FCP should drop from 3.0s to roughly TTFB + own-CSS (~1.3–1.6s).

## Legacy / unused JavaScript — browserslist attempt FAILED, reverted

A modern `package.json` browserslist was tried. **Verification showed it is a
no-op in Next 14 App Router:** after `rm -rf .next` and a fresh build, the
flagged chunk `117-242145357512d517.js` had a byte-identical hash to the
production build PageSpeed measured, and still contained the polyfills
(`Array.prototype.at/flat`, `Object.fromEntries/hasOwn`,
`String.prototype.trimEnd`). The browserslist field was reverted.

Conclusion: those polyfills ship from Next's own framework chunk, not from
app-code transpilation governed by browserslist. Removing them would mean
ejecting / patching Next — out of proportion for ~12 KiB. With TBT already
0 ms, this item has minimal weight in the Lighthouse score. Left as-is.

## Hero image — DEFERRED

`public/hero_image.webp` — 74,390 bytes, 720×656. Target ~55 KB (~17 KiB saved).
No webp encoder on this machine: `cwebp` is not installed and macOS `sips`
reads webp but cannot encode it (it printed output paths but wrote no file).
Deferred rather than risk a quality regression on the dusk-skyline photo.
Smallest of the three wins; the font + browserslist fixes carry the score.
To finish later: install `cwebp` (`brew install webp`) then
`cwebp -q 78 public/hero_image.webp -o public/hero_image.webp`, or have the
client re-export the asset. Keep `fetchpriority="high"` + the homepage preload.

## Not actioned (with reason)
- **CookieYes `close.svg` 10h TTL** — served from `cdn-cookieyes.com`, no
  control over their cache headers. 1 KiB. Ignore.
- **Forced reflow 35ms, unattributed** — below the threshold worth chasing;
  TBT is already 0ms. Ignore unless it regresses.
- **Own render-blocking CSS (8.2 KB, 190ms)** — once the font link is gone this
  is the only blocker and it is small; Next inlines/optimises critical CSS.
  No action.

## Expected outcome (PRE-DEPLOY ESTIMATE — WRONG, see below)
Mobile score 88 → 95–99. FCP 3.0s → ~1.4s. LCP 3.1s → ~1.8s.

## POST-DEPLOY MEASUREMENT — 2026-05-19 (corrected conclusion)

Measured with Lighthouse 13 after the user reported "desktop dropped to 70".

**Desktop:** 99, 100, 100 (3 runs, live). CLS 0.001. No regression — the
user's "70" was a single noisy PageSpeed run.

**Mobile, current self-hosted build (live):** 77, 79, 77 — LCP 4.4–4.5s.
**Mobile, parent Google-Fonts build (local, identical conditions):**
90, 72, 71 — LCP 3.0–5.2s.

Conclusion: **the font change is performance-neutral on mobile.** Both builds
average ~78; the parent simply has wild run-to-run variance (71–90) because it
depends on three external origins (googleapis, gstatic, plus cookieyes/gtm/
cal). The self-hosted build is tighter (77–79) — fewer third-party variables.
The user's original "88" was a lucky parent run; sub-75 runs were always
possible on the parent too.

**The pre-deploy estimate was wrong.** Removing the Google Fonts chain did not
cut mobile FCP — FCP stayed ~3.0s before and after. The Google Fonts request
was never the dominant mobile cost; the LCP element is the hero lead paragraph
(text) and the real ceiling is the overall render path + the third-party
scripts (CookieYes, GTM/GA, cal.com) loading under mobile CPU/network throttle.

**Keep the self-hosted fonts** — neutral on speed, lower variance, and removes
two Google origins (privacy/GDPR positive for a UK legal site). It is not the
problem and reverting gains nothing.

**Real mobile lever — DONE 2026-05-19 (commit 8db5189).**
Deferred the third-party scripts off the critical render path:
- CookieYes banner script: `beforeInteractive` → `afterInteractive`. The
  inline consent DEFAULT (storage denied) stays `beforeInteractive` — that is
  what enforces compliance, independent of the banner script timing.
- cal.com `cal-init`: `afterInteractive` → `lazyOnload`. The SiteBehaviour
  facade handler retries for `window.Cal` for ~4s, so init during idle is safe.
- GA left at `afterInteractive` to keep early conversion-click tracking.

Result on live astonslaw.com (Lighthouse 13):
- **Mobile: 98 / 100 / 100** (was ~78). FCP 1.0–2.0s, LCP 1.5–2.0s, CLS 0.
- **Desktop: 100 / 99** (unchanged).

Measurement lesson: localhost and raw `*.vercel.app` deployment URLs are NOT
representative (localhost too fast to see the third-party gating; vercel.app
deployment URLs cold/uncached, ~71). Only the warm production custom domain
(astonslaw.com) gives a true number — measure there post-deploy.

Functional verification on live: build 23/23, type-check clean; CookieYes
banner renders + Accept clears it; cal.com booking calendar mounts after the
banner is dismissed; gtag + Cal both functional; no console errors.
