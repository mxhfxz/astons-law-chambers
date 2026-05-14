# Session Handoff — 2026-05-14 (rev. 2)

This file is the bridge between sessions. Read this FIRST after `MEMORY.md` and `.project/_START_HERE.md`.

The previous handoff (rev. 1) is preserved in git history if needed; this version
supersedes it and captures everything done in the most recent session.

---

## Build state — at a glance

The site lives in two preview files. The Next.js production build has not started.

| File | Purpose |
|---|---|
| `preview/index.html` | Full static preview, hash-routed SPA, ~2280 lines |
| `preview/devices.html` | Three-up device viewer (1440×900 / 834×1100 / 390×844) |

**Dev server:** `python3 -m http.server 4173 --directory preview` — confirm with `curl -sI http://localhost:4173/index.html` before assuming it's running.
- 3-up devices: http://localhost:4173/devices.html
- single-viewport: http://localhost:4173/index.html

---

## Routes (hash-routed)

### Real routes
- `/` — homepage (hero → police strip → defence grid → how instruction works → fees signpost → booking module → final contact strip)
- `/practice-areas` — defence-work index (JS-rendered from `PRACTICE_AREAS`)
- `/practice-areas/<slug>` — detail template (7 slugs)
- `/police-station-representation` — standalone landing
- `/fees` — indicative ranges
- `/direct-access` — explainer
- `/about` — chambers bio
- `/legal-aid` — linked in nav, **route not yet built**
- `/contact` — linked in nav, **route not yet built**
- `/complaints` — BSB-mandatory page
- **`/404` — added this session** — themed Not Found page
- **`/500` — added this session** — Next.js production-error placeholder

### Redirects (in `SLUG_REDIRECTS` constant, line ~2060)
Soft client-side equivalents of HTTP 301s. Map values are absolute paths so renames and removals share one path:
| Slug | Target | Why |
|---|---|---|
| `motoring-law` | `/practice-areas/driving-offences` | renamed |
| `immigration`, `family-law`, `family`, `civil-litigation`, `civil`, `proceeds-of-crime`, `extradition`, `licensing`, `regulatory-law`, `regulatory` | `/practice-areas` | removed in criminal-only scope shift |

### Router fallback (`showRoute()` ~line 2080)
- Unknown hash → renders `/404` **in place** (URL stays as-typed, mirrors Next.js `notFound()`)
- Bad practice-area slug → also renders `/404` in place (instead of binding "not found" into the detail template)
- `STATIC_ROUTES` set declares which hashes are known

### Next.js production mapping (documented in code comments)
- `/404` route → `app/not-found.tsx`
- `/500` route → `app/error.tsx` (with `reset()` prop on the Try Again button)
- `SLUG_REDIRECTS` → `next.config.js` `redirects()` with `permanent: true` (emits HTTP 308)

---

## Practice areas (criminal-only)

1. Criminal Defence
2. Violent Crimes
3. Youth Crimes
4. Driving Offences (renamed from Motoring Law)
5. Drug Offences
6. Appeals
7. Inquests

Plus the standalone `/police-station-representation`.

**Card data shape:** PRACTICE_AREAS entries now include a `cardSummary` field (short one-liner) in addition to `situation` (longer hero paragraph) and the original action/process/faqs/context/policeStation fields. The homepage grid and the index page grid both render from the same shared template `practiceAreaCardHtml(a, headingTag)`, plus a synthetic `policeStationCardHtml()` for the homepage only. Single source of truth.

---

## Design system — current state (locked tokens)

### Tailwind colour tokens (from the `<script>` block in `<head>`)
- **navy:** 950 #0E1628 · 900 #16223C · 800 #1F2E50 · **700 #283A64** (body prose) · 100 #E8EDF5
- **neutrals:** offwhite #F8F9FB · footer #232536 (recently added; not navy-800)
- **emergency:** 500 #C23616 · 600 #A12B10
- **whatsapp:** DEFAULT #075E54 (canonical WhatsApp deep teal, AA-compliant with white at ~7.5:1) · dark #054B43
- **grey:** 900 #111827 · 600 #4B5563 · 300 #D1D5DB · 100 #F3F4F6

### Button system
- Sizes: `.btn-sm` (10/18px) · `.btn-md` (12/20px) · `.btn-lg` (14/24px) · `.btn-xl` (16/28px)
- Variants: `.btn-primary` (navy-900) · `.btn-secondary` (outline) · `.btn-inverse` (white on dark) · `.btn-inverse-emergency` (white with red ink) · `.btn-whatsapp` · `.btn-emergency` · `.btn-on-dark` (transparent + white border) · `.btn-quick-exit` (black)
- **`.btn-full` modifier reverts to `inline-flex w-auto` at ≥640px.** This bit me twice in this session. If you need a button to stay 100% of its column on all viewports, use `w-full flex` instead of `btn-full`. The police-station banner CTA and the final-strip CTAs both use this pattern now.

### Button colour rule (user-stated)
> Buttons should be Astons navy, secondary outline, or red in all normal UI patterns. Only exceptions: floating buttons (sticky pill, quick exit) and red/dark backgrounds (where `btn-inverse` or `btn-inverse-emergency` is correct).

### Eyebrow tone tokens (aligned this session)
- Light surfaces: `text-grey-600` (uppercase, tracking-[0.12em])
- Dark surfaces: `text-navy-100/80`

### Body prose colour (lifted from grey-600 → navy-700 this session)
- Any `text-grey-600 leading-relaxed` was promoted to `text-navy-700 leading-relaxed`. 50 swaps total. 11.2:1 contrast on white (AA AAA).
- `text-grey-600` stays for: eyebrows, nav links (.nav-link has its own override), fee-table VAT labels, footnotes, mega-menu sub-text (has hover-darken).

### Nav state machine (refined this session)
- `.nav-link` default: navy-950 @ **0.75 opacity** (was 0.6 — was on AA threshold at 4.77:1; now 8:1)
- Hover / focus-visible / aria-current / aria-expanded: 1.0 opacity

### 24-hour police-station phrasing (canonicalised)
- **Eyebrow form** (short tag on dark surfaces): `Police station — 24/7`
- **Sentence form** (body copy): `Available 24/7 for police station support`
- Exception: police-station-detail-page hero eyebrow stays `24-hour police station attendance` (it's the only sentence-case eyebrow site-wide because that page IS the topic).

### Delight details added this session
- **Hero panel** — Astons logo mark watermarked bottom-right, low-opacity wordmark `Astons Law Chambers / Barristers · London` top-left. Same gradient + grid base. Placeholder yellow tag removed.
- **Step 01/02/03** — large outline ghost numerals (`-webkit-text-stroke: 1px rgba(14,22,40,0.10)`, ~7.5rem) anchored top-right of each step card.
- **Practice-area card hover** — `Learn more →` arrow slides 4px on hover via `group-hover:translate-x-1` (with motion-reduce guard).
- **Final contact strip** — Astons mark watermark bottom-right (echoes hero panel composition).
- **Sticky pill `.avail-dot`** — bright `#25D366` hardcoded with matching pulse rgba `(37, 211, 102)`. Does NOT track the (darker) WhatsApp button token, by design.
- **FAQ chevron** — decorative `text-grey-300` chevron-down per question on practice-area + police-station pages (aria-hidden, suggests disclosure rhythm without compromising always-open SEO).

### Final contact strip
- Headline: `Speak to someone today` (no period accent)
- 3-button stack, all `md:w-[300px]` so they're uniform width on desktop
- Call CTA is `btn-xl` (the KPI); Message on WhatsApp and Book are `btn-lg`
- All three are `w-full flex` (not `btn-full`)

---

## Accessibility — WCAG AA across the board (state: clean)

**Auditor lives at `scripts/contrast_audit.py`.** Run it any time:
```bash
python3 scripts/contrast_audit.py
```
Expected output: `Checked ~335 text elements. Failures: 0`.

What it does:
- Parses the HTML tree with BeautifulSoup
- For each text-bearing element, walks ancestors to determine the effective bg colour (compositing every `bg-*` layer including opacity)
- Resolves text colour from the nearest `text-*` class or inherited body colour, applying opacity
- Includes a registry of CSS-defined classes (`.nav-link`, `.btn-*`, `.hero-image-panel`, `.alert-emergency`) so CSS-only overrides are visible
- Filters HTML comments, `aria-hidden`, `role=presentation`, watermarks, `<script>` content
- Compares against 4.5:1 for normal text / 3:1 for large text (≥18px or ≥14px bold)

If a future change fails the audit, the report shows the exact line, the foreground/background colours computed, the ratio, and the threshold.

**Dependency:** `pip3 install --user --break-system-packages beautifulsoup4`

---

## Things deliberately NOT done (do not redo without asking)

- Email funnel or mailto anywhere (memory rule). Exception: `/complaints` page mailto is BSB-regulatory and stays.
- Exit-intent / popup CRO patterns
- Trust signals strip (removed earlier; replaced by booking module)
- Mobile quick exit (removed earlier; desktop only)
- Practitioner portrait (memory rule)
- Card kickers on practice-area cards (decided this session — site is criminal-only, kicker added no info). Exception: the police-station card keeps a `24 hours` kicker as the genuine operational differentiator. The Criminal Defence detail page kicker also stays — user said it's a single occurrence and not an issue.
- Loading skills the user hasn't asked for

---

## Open / next-up items

### Blocking launch
- `/legal-aid` route — linked in nav, NOT BUILT
- `/contact` route — linked in nav, NOT BUILT
- `/complaints` response timeframe still placeholder-tagged (the page is regulatory — do not touch other elements without explicit instruction)
- Footer regulatory column links are in place (BSB / LeO / Public Access Guidance)
- Driving Offences VAT-priced per-area fee — BSB indicative-fee requirement. Indicative ranges on `/fees` cover this in aggregate; per-area specificity light.

### Content
- Practice-area `actions` / `process` / `faqs` are written but no per-area client sign-off
- Hero image is the typographic watermark composition (logo mark + wordmark). No real photographic asset yet. Composition is intentional and holds without an asset.

### Production migration (Next.js)
- All hash routes (`#/`) become real paths
- FAQ blocks currently JS-injected — Server-render in production for SEO
- Per-route metadata (title, description, OG)
- Cal embed uses `@calcom/embed-react` (snippet preserved in a comment in the preview)
- Sitemap.xml + llms.txt at launch
- `app/not-found.tsx` from `/404` content
- `app/error.tsx` from `/500` content
- `next.config.js` `redirects()` from `SLUG_REDIRECTS` (with `permanent: true`)

### P2 (post-launch programmatic SEO)
- Sub-offence templates: `/practice-areas/driving-offences/<offence>`
- Stage templates: `/practice-areas/criminal-defence/<stage>`
- Court-specific landings: `/courts/<court-slug>`

---

## File-touched-this-session map (line numbers approximate)

| Thing | File | Line |
|---|---|---|
| Tailwind tokens (incl. footer + whatsapp) | `preview/index.html` | ~100-130 |
| CSS custom properties | `preview/index.html` | ~133-145 |
| `.nav-link` opacity 0.75 (was 0.6) | `preview/index.html` | ~185 |
| `.btn-full` definition (note: reverts to auto ≥640px) | `preview/index.html` | ~273 |
| `.avail-dot` and pulse keyframe (bright #25D366) | `preview/index.html` | ~354-365 |
| Hero panel CSS (logo mark + wordmark) | `preview/index.html` | ~436-470 |
| Step-numeral CSS | `preview/index.html` | ~390-405 |
| Final-strip mark CSS | `preview/index.html` | ~410-420 |
| Police banner top (with arrow, no pulse dot) | `preview/index.html` | ~515-540 |
| Hero panel markup (mark + wordmark inside) | `preview/index.html` | ~750-765 |
| Step cards (large ghost numerals) | `preview/index.html` | ~816-833 |
| Booking page "Need help now?" (dark navy) | `preview/index.html` | ~900-915 |
| Final contact strip (`Speak to someone today` + KPI stack) | `preview/index.html` | ~955-990 |
| Practice-area detail template (incl. police banner) | `preview/index.html` | ~1040-1145 |
| `/404` route | `preview/index.html` | ~1530-1590 |
| `/500` route | `preview/index.html` | ~1595-1640 |
| Footer (`bg-footer` = #232536) | `preview/index.html` | ~1536 |
| Sticky pill (bright avail-dot) | `preview/index.html` | ~1595-1620 |
| `PRACTICE_AREAS` data (with `cardSummary` + `policeStation`) | `preview/index.html` | ~1700-1900 |
| `practiceAreaCardHtml` + `policeStationCardHtml` shared templates | `preview/index.html` | ~1856-1900 |
| `STATIC_ROUTES` + `SLUG_REDIRECTS` + `showRoute()` | `preview/index.html` | ~2045-2130 |

---

## Critical gotchas

### Files get externally edited mid-session
The user has the preview file open in an editor that periodically syncs to disk, overwriting agent edits. **Always read the file back after each edit to confirm the change persisted.** If a change "succeeded" per the script output but doesn't appear in the file, re-apply it. (This bit me twice in this session — I claimed work was done that hadn't actually persisted.)

### Apex rule (read this FIRST always)
The Penpot file is reference only, never a design source. Do not extract layouts, sections, or visual decisions from any existing page in the Penpot file. The brief, decisions, and direction come ONLY from in-session instructions, `.project/` planning files, memory entries, and the three deep-research reports.

### Voice rules (memory)
- No marketing speak, rhetorical questions, magic threes, em-dash maximalism
- Defendant-aware second person where appropriate
- No statutory section numbers or sentencing tables unless verified for 2026
- No fabricated facts (BSB number, Inn, year of call, named partners, cases)
- Entity-first ("Astons Law Chambers"), Ghulam's name minimised
- Flag operational claims with 🚩 BEFORE writing into a file (hours, response times, "first call free")

### Conversion paths (locked)
- Phone: 07922 247 999
- WhatsApp: `wa.me/447922247999`
- Booking: cal.com/astonslaw/callback
- **No email capture, no mailto, no contact forms, no lead magnets.** (Complaints page mailto is BSB-only, do not extend the pattern.)

---

## What "go" means in a new session

Read in this order:
1. `MEMORY.md` (apex rules, feedback, project context)
2. `.project/_START_HERE.md` (older session context)
3. **This file** (current state)
4. The user's next message

Then check the dev server: `curl -sI http://localhost:4173/index.html`. If down, restart: `python3 -m http.server 4173 --directory preview &`.

Then run `python3 scripts/contrast_audit.py` once to confirm the AA-zero-failures state hasn't drifted since this handoff was written.

Do not re-derive things this document already states. Do not load skills the user hasn't asked for. Execute.

---

## Open task — copy audit continuation (added 2026-05-14)

A full copy audit was run against `preview/index.html` using the
marketing-psychology, copywriting-psychologist, and gstack skills. The audit
output is in `.project/planning/19-copy-audit-2026-05-14.md` as a P1–P10
prioritised menu. Nothing has been applied to the preview yet — the user picks
P-items to ship.

**To resume:** read MEMORY.md, this file, then `19-copy-audit-2026-05-14.md`,
then wait for the user to name a P-item.

**Recommended first ship:** P1 (home hero rotation + WhatsApp CTA) bundled with
P4 (replicate the "Before you call" callout on the home page and police-station
landing page). Both lift conversion density on the home page without touching
anything regulatory.

**Constraints to carry forward:**

- The off-limits list in §"Off-limits copy" of the audit file is the locked
  set. Do not edit those.
- The "what is already working" list in §"What is already working" is the
  preserve set. Any P-item edit must not weaken those mechanisms.
- `preview/index.html` is edited externally between agent operations. Re-read
  after every edit per `memory/feedback_file_externally_edited.md`.
- Re-run `python3 scripts/contrast_audit.py` after each block of edits.
- Update the audit file with SHIPPED / IN PROGRESS / DEFERRED status per
  P-item as work lands.

**MCP state (set 2026-05-14):** Penpot, Figma, and Webflow MCP connections
disabled (causing stream errors). Penpot config preserved at
`.mcp.json.disabled`; rename back to `.mcp.json` to re-enable. Figma removed
from `~/.claude.json` (backup at `~/.claude.json.bak.2026-05-14`,
`codebase-memory-mcp` retained). Webflow is claude.ai-managed — disable in
claude.ai web Settings → Connectors if it shows up again. A Claude Code
restart is required for the disconnect to take effect on the in-flight
session.
