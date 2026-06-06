# Plan — Vercel Analytics conversion event tracking

**Branch:** `sub-pages` · **Created:** 2026-06-05

## Approach (one taxonomy, reuse the existing listener)

`components/site/SiteBehaviour.tsx` already runs ONE delegated `click` listener
(capture phase) that detects every conversion element and computes
`name`, `cta_type`, `placement`, `page_type`, `page_path` for GA4. We emit a
Vercel custom event from the **same point**, so:

- no `content/**` HTML changes,
- no new listeners,
- GA4 and Vercel stay in lockstep on names + placements.

We add **session funnel attribution** by recording the page-type journey in
`sessionStorage` on each route change, and reading it when a conversion fires.

## Steps

1. **`lib/analytics.ts`** — add pure `getFunnel(pathname)`:
   - `/practice-areas/<cat>[/<sub>]` → `<cat>` (e.g. `driving-offences`)
   - everything else → `getPageType(pathname)`
   Named, low-cardinality funnels. No side effects.

2. **`lib/journey.ts`** (new) — client-only session recorder, `sessionStorage`
   key `alc_journey`. Guards `typeof window`. Exposes:
   - `recordPageView(pathname)` — append page-type (consecutive-deduped,
     capped to 8); set sticky `funnel` to the first practice-area topic seen.
   - `getJourneyAttribution()` → `{ entry, funnel, journey, steps }`.

3. **`components/site/SiteBehaviour.tsx`**:
   - import `track as vaTrack` from `@vercel/analytics` (avoids the local GA
     `track` name clash), plus the two journey helpers.
   - call `recordPageView(pathname)` at the top of the per-route effect (also
     records the landing page on first mount).
   - in `onClickCapture`, after the existing GA `track(...)`, emit
     `vaTrack(name, { cta_type, placement, page_type, page_path, funnel,
     entry_page, journey, steps })`.
   - in the cal.com `bookingSuccessful` callback, emit `vaTrack('booking_completed', …)`
     with the same attribution.

4. **`.project/vercel-conversion-tracking/TRACKING-PLAN.md`** — human-readable
   event + property reference + "how to read it in the Vercel dashboard".

5. **Verify** — `npm run lint && npm run type-check && npm run build`.
   Then real-browser check on the Vercel preview (events appear in the
   Analytics → Events tab; in dev they log to console).

## Why this is non-breaking

- Additive only. The GA path is untouched; we add one extra function call.
- `vaTrack` no-ops safely if Analytics isn't mounted; in dev it console-logs.
- `sessionStorage` access is `try/caught` and `window`-guarded.
- No `content/**`, no copy, no layout, no links changed.

## Session log
- 2026-06-05: spec + plan written. Implementation starting.
- 2026-06-05: implemented. `getFunnel()` added to lib/analytics.ts; new
  lib/journey.ts session recorder; SiteBehaviour.tsx now dual-emits GA4 +
  Vercel `vaTrack` for all conversion clicks + `booking_completed`, with
  `recordPageView` on each route. TRACKING-PLAN.md written (the readable doc).
  Verified: `lint` clean (only pre-existing layout.tsx hex warning),
  `type-check` clean, `build` exit 0 (all routes prerendered). Funnel logic
  proved against 6 simulated visitor journeys — all correct (sticky first-topic
  funnel, fallback, dedupe, direct). Uncommitted on `sub-pages`.
- OPEN: confirm Vercel project plan tier (custom events richest on Pro);
  verify events on the `sub-pages` Vercel preview (Analytics → Events).
