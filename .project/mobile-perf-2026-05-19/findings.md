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

## Expected outcome
Mobile score 88 → 95–99. FCP 3.0s → ~1.4s. LCP 3.1s → ~1.8s.
Desktop stays 100.
