# Plan — conversion-funnel click tracking

**Spec:** `./spec.md` · **Branch:** `analytics-funnel-tracking-2026-05-20`
**Phase:** implement

## Approach

Minimal-surface change. Keep the existing delegated click handler in
`components/site/SiteBehaviour.tsx`; extract the page-type / cta-type
mappings into `lib/analytics.ts` (small, pure, testable); enrich the GA4
event params in the handler; add a `booking_completed` listener inside the
existing cal.com mount flow. No content-fragment edits — the
`data-track-*` attribute taxonomy already covers placement.

## Steps

### Phase 1: helpers
- [ ] 1.1 `lib/analytics.ts` — exports `getPageType(pathname)` and
  `getCtaType(eventName)`; pure functions, no side effects.

### Phase 2: tracker enrichment
- [ ] 2.1 `components/site/SiteBehaviour.tsx` — import helpers; widen the
  GA4 params on `onClickCapture` (add `cta_type`, `placement`, `page_type`,
  `outbound_url`). Keep `location` + `page_path` for back-compat.
- [ ] 2.2 `components/site/SiteBehaviour.tsx` — add `page_type` to the
  client-side `page_view` event.
- [ ] 2.3 `components/site/SiteBehaviour.tsx` — inside `onLoad` (cal mount),
  register `cal.ns.callback('on', { action: 'bookingSuccessful', callback })`
  which fires `booking_completed` with the enriched params.

### Phase 3: runbook
- [ ] 3.1 `.project/conversion-tracking-2026-05-20/ANALYTICS-RUNBOOK.md` —
  the GA4 dashboard checklist (mark Key Events, custom dimensions,
  Enhanced Measurement, funnel exploration).

### Phase 4: verify
- [ ] 4.1 `rm -rf .next && npm run build` — clean.
- [ ] 4.2 `npm run type-check` + `npm run lint` — clean.
- [ ] 4.3 Browser: serve prod build, click a Call CTA, intercept the GA4
  `collect?` request — confirm new params present. Click an outbound link
  → confirm `outbound_url`. Console clean.
- [ ] 4.4 Test `page_view` carries `page_type` (route change).

### Phase 5: ship
- [ ] 5.1 Commit on branch.
- [ ] 5.2 Verify merged main builds clean.
- [ ] 5.3 Push main → Vercel production → verify the new event params land
  in the live HTML/network on `astonslaw.com`.
- [ ] 5.4 Clean up branch (handoff §8 — main-only).

## Session log

- 2026-05-20: spec + plan written. Decisions: count-only, runbook for the
  client.
