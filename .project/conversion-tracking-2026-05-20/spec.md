# Spec — conversion-funnel click tracking

**Date:** 2026-05-20
**Branch:** `analytics-funnel-tracking-2026-05-20`
**Skills routed:** analytics-tracking → frontend-dev-guidelines → verification-before-completion → finishing-a-development-branch → vercel-deployment

## Overview

Make the existing click-tracking on `astonslaw.com` production-grade for
conversion-funnel analysis, so we can answer "which placement on which page
type converts best" — not just total click counts. Set up so we can optimise
as data collects (no schema breaks needed when adding new placements / new
page types).

## Decisions (user-confirmed 2026-05-20)

1. **Monetisation:** skip. Count events only. No `value` / `currency` in
   payload — keeps reporting simple.
2. **GA4 dashboard work:** client handles. I write a runbook (see
   `ANALYTICS-RUNBOOK.md`).

## Current state (audit before changes)

- GA4 `G-8TDVMH13D7` loaded in `app/layout.tsx` with `send_page_view: true`.
- Google Consent Mode v2 wired — denied by default, updated on CookieYes
  consent.
- A delegated click handler in `components/site/SiteBehaviour.tsx` already
  fires `gtag('event', name, params)` for every `<a>`/`<button>` with a
  `data-track` attribute, plus a fallback that auto-detects `tel:` /
  `wa.me/` / `cal.com/astonslaw` links.
- 30+ button placements carry `data-track` + `data-track-location` with a
  consistent taxonomy. Event names already in use: `call_click`,
  `whatsapp_click`, `book_click`, `download_click`, `guide_click`,
  `quick_exit`, `mobile_menu_toggle`.
- Existing payload per click: `event_category: 'engagement'`,
  `event_label: location`, `location`, `page_path`.

## Gaps this work closes

1. **Param enrichment.** Add `cta_type`, `placement`, `page_type`,
   `outbound_url` so GA4 reports can slice the funnel by page type and
   placement, not just URL paths.
2. **`booking_completed`.** Today we track `book_click` (intent). Wire the
   cal.com embed `Cal('on', { action: 'bookingSuccessful' })` callback to
   fire a `booking_completed` event so the booking funnel actually closes.
3. **`page_type` on page_view.** So organic page-type segmentation is
   available from day one.
4. **GA4 dashboard config** (runbook): mark Key Events, register custom
   dimensions, enable Enhanced Measurement, build the funnel exploration.

## Event taxonomy (post-change)

| Event | Meaning | Properties |
|-------|---------|------------|
| `call_click` | Tap-to-call clicked | `cta_type=call`, `placement`, `page_type`, `page_path`, `outbound_url` |
| `whatsapp_click` | WhatsApp link clicked | `cta_type=whatsapp`, `placement`, `page_type`, `page_path`, `outbound_url` |
| `book_click` | "Book a call" / cal.com link clicked (intent) | `cta_type=book`, `placement`, `page_type`, `page_path`, `outbound_url` |
| `booking_completed` | cal.com embed reports a successful booking | `cta_type=book`, `placement`, `page_type`, `page_path` |
| `guide_click` | Homepage situation-card guide link clicked | `cta_type=guide`, `placement`, `page_type`, `page_path` |
| `download_click` | PDF guide downloaded | `cta_type=download`, `placement`, `page_type`, `page_path` |
| `quick_exit` | "Quick exit" used | `placement`, `page_type` |
| `mobile_menu_toggle` | Hamburger opened/closed | (kept as-is) |
| `page_view` | Route change | adds `page_type` |

Existing `event_category` + `event_label` kept for back-compat — harmless,
GA4 ignores them, but UA-style ad-hoc reports keep working if anyone built
them.

## Page-type taxonomy

| Pathname | `page_type` |
|----------|-------------|
| `/` | `home` |
| `/police-station-representation` | `police_station` |
| `/practice-areas` | `practice_areas_hub` |
| `/practice-areas/*` | `practice_area_detail` |
| `/guides` | `guides_hub` |
| `/guides/*` | `guide_article` |
| `/fees` | `fees` |
| `/about` | `about` |
| `/contact` | `contact` |
| `/direct-access` | `direct_access` |
| `/complaints` `/timescales` `/privacy-policy` `/terms-of-engagement` | matching slug |
| anything else | `other` |

## Placement taxonomy

Already established via `data-track-location` attributes in the fragments —
30 distinct values. No change needed to the attribute taxonomy; the helper
just forwards the value into the `placement` property of the GA event.

## Must have

- Code changes restricted to `components/site/SiteBehaviour.tsx` +
  new `lib/analytics.ts` (helpers). No edits to any content fragment.
- New events flow through the EXISTING delegated handler — every existing
  data-track attribute keeps working unchanged.
- `booking_completed` fires from the cal.com inline embed.
- A `ANALYTICS-RUNBOOK.md` in this folder for the GA4 dashboard work.
- Build + type-check clean; browser test confirms gtag fires with the new
  params.

## Won't have

- No new tracking library, no GTM migration — stay on direct gtag.
- No `value` / `currency` in payload.
- No PII in event params.
- No edits to button markup — the existing `data-track-*` attributes are the
  source of truth.

## Acceptance criteria

- Network panel on a CTA click shows a `collect?...` request to GA4 with
  `en=call_click` (or equivalent) AND params for `cta_type`, `placement`,
  `page_type`, `page_path` (+ `outbound_url` for outbound CTAs).
- `booking_completed` fires when a cal.com booking succeeds in the inline
  embed.
- `page_view` carries `page_type`.
- Runbook exists and can be executed in ~15 min by the client.
- No regression in existing events (no double-firing, no missing fires).
