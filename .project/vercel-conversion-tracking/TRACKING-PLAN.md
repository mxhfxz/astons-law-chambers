# Vercel Analytics — Conversion Tracking Plan (read this first)

This is the reference for the custom conversion events on astonslaw.com. It is
written so you can open the Vercel **Analytics → Events** tab and understand
every number without anyone re-explaining the setup.

**Where to see it:** Vercel project → **Analytics → Events**. Each event name
below appears as a row with a count; click it to filter/break down by the
properties listed.

> ⚠️ **Plan note:** Custom events + property filtering are richest on the
> **Pro** plan. On Hobby they are still captured but with tighter data-point
> limits and shorter retention. If events look truncated, check the project's
> Vercel plan.

> 🛈 In local `npm run dev`, events are **logged to the browser console**
> instead of being sent — that's how you confirm they fire before deploying.

---

## The events (one per conversion action)

Every event below fires the moment the visitor clicks the element. The event
names are identical to the existing GA4 names, so there is **one taxonomy**,
not two.

| Event name | Fires when the visitor… | Counts as |
|------------|--------------------------|-----------|
| `call_click` | taps a phone / "Call" button (`tel:` link) | **Primary KPI** |
| `whatsapp_click` | taps a WhatsApp button | **Primary KPI** |
| `book_click` | taps a "Book a call" (cal.com) button | Booking intent |
| `booking_completed` | actually completes a cal.com booking | **Closed booking** |
| `guide_click` | opens a guide from a guide link | Soft / nurture |
| `download_click` | downloads a guide PDF | Soft / nurture |
| `quick_exit` | hits the safety quick-exit | Safety (not a conversion) |

The phone number, WhatsApp and cal.com links are detected automatically, so
**every** call/WhatsApp/book button across all pages is covered — 50 phone, 23
WhatsApp and 29 cal.com links at the time of writing, plus any added later
(they inherit the same `data-track` / `href` markers).

---

## The properties (the same set on every event)

Click an event in the dashboard and break it down by any of these:

| Property | What it tells you | Example values |
|----------|-------------------|----------------|
| `cta_type` | the action, grouped | `call`, `whatsapp`, `book`, `guide`, `download` |
| `placement` | **where on the page** the button was | `hero`, `sticky_bar`, `footer`, `route_aside`, `home_final_strip`, `practice_area_mid_cta` … |
| `page_type` | **what kind of page** they converted on | `home`, `practice_area_detail`, `police_station`, `fees`, `guide_article` … |
| `page_path` | the exact URL path | `/practice-areas/driving-offences/drink-driving` |
| `funnel` | **which topic funnel they followed** (see below) | `driving-offences`, `violent-crimes`, `police_station`, `fees`, `home` |
| `entry_page` | the page_type they **landed on** first | `home`, `guide_article`, `practice_area_detail` |
| `journey` | the **path of page-types** they took, in order | `home > practice_area_detail > fees` |
| `steps` | how many pages they saw before converting | `1`, `2`, `5` |

### How "which funnel did they follow?" works — the part you asked for

As a visitor moves through the site, their page-type journey is stored in the
browser for the session. When they finally convert, that journey is attached to
the event:

- **`funnel`** = the first practice-area **topic** they engaged (e.g. someone
  who read the Drink-Driving page then called gets `funnel = driving-offences`).
  If they never hit a practice-area page, it falls back to the landing
  page-type (e.g. `home`, `police_station`).
- **`entry_page`** = where the session started.
- **`journey`** = the ordered breadcrumb, e.g. `home > practice_area_detail > fees`.
- **`steps`** = how many pages it took.

So to answer "which funnels actually produce calls?", open `call_click` and
break down by **`funnel`**. To see the typical path to a booking, open
`booking_completed` and look at **`journey`** and **`steps`**.

---

## Example questions you can now answer

| Question | How |
|----------|-----|
| Which topic drives the most calls? | `call_click` → break down by `funnel` |
| Do the sticky bar or the hero convert better? | any event → break down by `placement` |
| What's the typical path to a booking? | `booking_completed` → look at `journey` / `steps` |
| Which pages convert best? | any event → break down by `page_type` |
| Are guides assisting calls, or dead-ending? | compare `guide_click` funnels vs `call_click` funnels |
| Do longer journeys convert worse? | break any event down by `steps` |

---

## Where the code lives (for future you)

| File | Role |
|------|------|
| `components/site/SiteBehaviour.tsx` | One delegated click listener detects every conversion element and emits both the GA4 event and the Vercel `vaTrack(...)` event. The cal.com success callback emits `booking_completed`. |
| `lib/analytics.ts` | `getPageType()` (page → page_type), `getCtaType()` (event → cta_type), `getFunnel()` (path → funnel topic). |
| `lib/journey.ts` | Records the session journey in `sessionStorage` (`alc_journey`) and returns `{ entry, funnel, journey, steps }` for each conversion. |
| `content/**` | Conversion buttons carry `data-track="…"` and `data-track-location="…"` markers. **These define `placement`.** To add a new tracked button, copy those two attributes onto it — no code change needed. |

### Adding a new tracked button later
Put `data-track-location="your_placement_name"` on the button (and, if it isn't
a `tel:` / `wa.me` / `cal.com` link, `data-track="call_click"` etc.). It is then
tracked automatically in both GA4 and Vercel.

---

## Design choices (so nothing is a mystery)

- **GA4 was kept.** Vercel runs **alongside** it, not instead of it, so nothing
  that already worked was put at risk. GA4 can be retired later once the Vercel
  data is trusted — that's a separate decision.
- **No HTML/content was changed.** The events reuse the existing `data-track`
  markers, so no buttons, links, or copy moved.
- **Property values are kept low-cardinality and readable** (named funnel slugs,
  a capped page-type journey) so the dashboard stays legible rather than
  exploding into thousands of unique strings.
