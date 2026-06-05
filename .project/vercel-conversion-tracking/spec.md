# Spec — Vercel Analytics conversion event tracking

**Created:** 2026-06-05
**Branch:** `sub-pages`
**Status:** in progress

## What & why

The site already emits GA4 events for every conversion click. The user finds
Google's reporting "very poor" and wants the same conversions visible in
**Vercel Analytics** as custom events, with **funnel attribution** — i.e. for
each conversion they want to see which path through the site the visitor
followed before contacting.

This is the data layer for later conversion-rate optimisation, so it must be
**self-explanatory**: clear event names, clear property names, and a written
plan the user can read without Claude re-deciphering it.

## Conversion elements in scope

Every interaction that can lead to contact. These already carry `data-track`
attributes and conversion `href`s in `content/**`:

| Element | Detection | Existing GA4 event |
|---------|-----------|--------------------|
| Phone / Call buttons | `href^="tel:"` or `data-track="call_click"` | `call_click` |
| WhatsApp buttons | `href^="https://wa.me/"` or `data-track="whatsapp_click"` | `whatsapp_click` |
| Book-a-call (cal.com) buttons | `href*="cal.com/astonslaw"` or `data-track="book_click"` | `book_click` |
| Completed cal.com booking | cal.com `bookingSuccessful` event | `booking_completed` |
| Guide links | `data-track="guide_click"` | `guide_click` |
| Guide PDF downloads | `data-track="download_click"` | `download_click` |
| Quick-exit (safety) | `data-track="quick_exit"` | `quick_exit` |

Counts in content as of 2026-06-05: 50 `tel:`, 23 `wa.me`, 29 `cal.com`,
plus `data-track` markers on each.

## Requirements

1. Mirror every GA4 conversion event into a Vercel Analytics **custom event**
   with the **same event name** (one taxonomy, not two).
2. Attach **funnel attribution** properties to every conversion event:
   which topic funnel the visitor followed, their entry page, the page-type
   journey, and how many pages they saw before converting.
3. **Do not touch any `content/**` HTML.** Reuse the existing delegated click
   listener so no conversion markup changes — zero risk to layout/links.
4. **Do not remove or change GA4.** Add Vercel alongside it (non-breaking).
5. **Do not change any copy** (HARD RULE — copy is read-only).
6. Ship verified: `build` + `type-check` + `lint` clean before `main`.
7. Document the event + property schema in a human-readable plan.

## Out of scope

- Removing GA4 (can be a later decision once Vercel data is trusted).
- Non-conversion UI events (mega-menu, mobile-menu) — not contact-leading.
- Server-side / Measurement-Protocol forwarding.

## Constraints / caveats

- 🚩 Vercel **custom events** and property filtering are richest on the Pro
  plan. On Hobby they are captured but with tighter data-point limits and
  shorter retention. Confirm the `alc-staging` / production project plan.
- Vercel custom-event property values must be `string | number | boolean`.
- Keep property cardinality bounded so the dashboard stays readable
  (`funnel` = named topic slugs; `journey` = page-type sequence, capped).
