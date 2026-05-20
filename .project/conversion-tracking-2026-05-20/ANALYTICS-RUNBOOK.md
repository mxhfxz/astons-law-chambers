# GA4 Setup Runbook — Astons Law Chambers conversion funnel

**Property:** GA4 `G-8TDVMH13D7` (already wired in `app/layout.tsx`)
**Time required:** ~15 minutes
**Prerequisite:** Editor or Admin access to the GA4 property.

Work through this in order. Each section is independent — if you stop and
come back, finish whichever sections still show ☐.

---

## 1. Confirm events are landing (5 min, do first)

This proves the code change is working before you touch any settings.

1. Open GA4 → Admin (gear icon) → **DebugView**.
2. In a new tab open `https://astonslaw.com/?_dbg=1` (any URL on the site).
3. On that tab, install the **Google Analytics Debugger** Chrome extension and toggle it ON, then reload. (Or just click around — events still arrive in DebugView, only slower.)
4. Click **Call now** in the homepage hero.
5. Within ~10 seconds you should see in DebugView:
   - `call_click` event
   - Parameters include: `cta_type=call`, `placement=hero`, `page_type=home`, `page_path=/`, `outbound_url=tel:+447922247999`
6. Repeat once for **WhatsApp** (`whatsapp_click`), once for **Book a call** (`book_click`), once for a **guide card** on the homepage (`guide_click`), and once for a **PDF download** on a guide page (`download_click`).

Tick the boxes:

- ☐ `call_click` fires with `cta_type=call`, `placement`, `page_type`
- ☐ `whatsapp_click` fires with `cta_type=whatsapp`
- ☐ `book_click` fires with `cta_type=book`
- ☐ `guide_click` fires with `cta_type=guide`
- ☐ `download_click` fires with `cta_type=download`
- ☐ `page_view` carries `page_type`

If anything is missing → tell me which one + paste the DebugView payload screenshot.

---

## 2. Mark Key Events (conversions) (3 min)

Key Events = what GA4 calls conversions. Mark these so they show up in
Conversion reports and Explorations.

GA4 → Admin → **Events** (under Data display).

Mark each of these as a Key Event by flipping the toggle in the right column:

- ☐ `call_click`
- ☐ `whatsapp_click`
- ☐ `book_click`
- ☐ `booking_completed`  ← fires when someone completes a booking in the cal.com embed (the *closure* of the booking funnel; book_click is *intent*)

Optional secondary conversions (lower priority — engagement, not the KPI):

- ☐ `guide_click`  (homepage card → guide page)
- ☐ `download_click`  (PDF download)

If you don't see one of these in the events list yet, it means no one has
fired it since the change went live — fire it yourself once (section 1) and
it'll appear within a minute.

---

## 3. Register Custom Dimensions (3 min)

This is what unlocks slicing the funnel by `placement` / `page_type` /
`cta_type` instead of only by URL.

GA4 → Admin → **Custom definitions** → **Custom dimensions** → **Create**.

Create one row for each:

| Dimension name | Scope | Event parameter | Description |
|---|---|---|---|
| `cta_type` | Event | `cta_type` | call / whatsapp / book / guide / download |
| `placement` | Event | `placement` | Where on the page the CTA was clicked (hero, aside, footer, sticky_pill, …) |
| `page_type` | Event | `page_type` | home / police_station / practice_area_detail / guide_article / fees / about / … |
| `outbound_url` | Event | `outbound_url` | Off-platform destination (only set for `tel:` / `wa.me/` / cal.com) |

Save each. Note: it takes **24 hours** before custom dimensions appear as
columns in standard reports. They are usable *immediately* in Explorations
(section 5), so don't wait.

---

## 4. Enhanced Measurement (1 min)

GA4 → Admin → **Data streams** → click `astonslaw.com` → **Enhanced measurement** (gear icon).

Make sure all of these are ON:

- ☐ Page views (default)
- ☐ Scrolls (90 % scroll depth — useful engagement signal)
- ☐ Outbound clicks
- ☐ Site search
- ☐ Video engagement (won't fire — no video — but cheap to leave on)
- ☐ File downloads (this catches our `/resources/*.pdf` automatically, complements `download_click`)

---

## 5. Build the funnel exploration (5 min)

GA4 → **Explore** → blank → **Funnel exploration**.

Configure:

- **Step 1 — Land:** event = `page_view`. Optionally filter by `page_type` to slice by entry page.
- **Step 2 — Engage** (optional): event = `scroll` (this is the 90 % scroll event from Enhanced Measurement).
- **Step 3 — Intent:** event matches any of `call_click`, `whatsapp_click`, `book_click`.
- **Step 4 — Closure:** event = `booking_completed`. (Calls and WhatsApp can't be tracked post-click — they happen off-platform.)

Add **breakdown dimensions** (left panel → Variables):

- `cta_type` — see which channel converts most
- `placement` — see which button positioning works
- `page_type` — see which page types feed the most conversions

Save the exploration as **"Conversion Funnel v1"**.

This is the report you'll come back to weekly to spot what's working.

---

## 6. (Optional, when ready) CookieYes Consent Mode

This is unrelated to the funnel, but it's a known open item from
`SESSION-HANDOFF.md` §5. Until it's done, GA4 stores nothing for visitors
who haven't accepted cookies, even though Consent Mode v2 is wired in code.

1. Log in to your CookieYes dashboard.
2. **Site Settings → Cookie Banner → Advanced**.
3. Toggle **"Google Consent Mode"** ON.
4. Save.

Side note: while you're in CookieYes, fix the "URL has changed" error
flagged in `.project/guides-resource-pages-2026-05-19/findings.md`
(Organizations & Sites → update the registered URL to
`https://astonslaw.com`).

---

## 7. What to watch in the first 2–4 weeks

Data is sparse to start. Don't optimise on noise. Sensible cadence:

- **Week 1:** verify events keep firing and DebugView is clean. Don't draw
  conclusions yet.
- **Week 2:** check the funnel exploration. Total clicks per `cta_type`,
  per `placement`, per `page_type`. Look for outliers.
- **Week 3–4:** the highest-volume placements and page-types are the ones
  worth A/B testing. Tell me which 2–3 you want to test and we'll set up
  variants.

Quality of leads (which calls turned into instructions) is **not** in GA4
— that lives in the practice's case-management process. If you want to
attribute case value back to the original click, we can layer that on
later (offline conversion import).

---

## 8. Things that don't need doing

For your peace of mind — these are already correct, no action needed:

- GA4 tag installation in code ✓
- Consent Mode v2 default-denied in code ✓
- `page_view` on first load + on route change ✓
- `data-track` attributes on every call/WhatsApp/book/guide/download button ✓
- Fallback tracking for `tel:` / `wa.me/` / cal.com links without
  `data-track` ✓ (defensive — if anyone forgets the attribute it still
  counts)

If you hit anything weird, screenshot the DebugView entry and send it over —
the payload shows exactly what fired, which is faster than describing it.
