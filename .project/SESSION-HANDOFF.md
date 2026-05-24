# Session Handoff — 2026-05-24 (Week 1 done, Week 2 ready)

Read MEMORY.md first, then this file.

**ACTIVE SPRINT:** `.project/growth-sprint-2026-05-23/`
**Full plan:** `.project/growth-sprint-2026-05-23/plan.md`
**Progress log:** `.project/growth-sprint-2026-05-23/progress.md`

---

## APEX RULE — SKILLS FIRST, NO CLAUDE DEFAULTS

Every task routes through the relevant skill FIRST. No exceptions.

Frontend / layout: `frontend-design` → `frontend-dev-guidelines` → implement
CRO / copy: `cro-2026` → `page-cro` → implement
Git / deploy: git skills + `vercel-deployment`
Verification: `verification-before-completion` ← use after every merge
Planning: `project-mgmt`

---

## WHAT TO DO FIRST

```
git fetch origin
git checkout main
npm run build && npm run type-check
```

Both should pass clean. Then move to Week 2.

---

## 1. Production state

**`main`** → `53824fe` (live on astonslaw.com)

### What is LIVE on main (as of this session)

| What | Commit |
|------|--------|
| Mobile 3-button CTA bar + desktop FABs + hero dual-CTA | `d468b4e` |
| Insights blog at `/insights` | merged previously |
| W1.4–W1.6: lawyer→barrister sweep, AI crawlers in robots.ts, sitemap frequencies | `af71bcf` (growth-t1 merge) |
| StickyPill dead code removed (chrome.tsx + sticky-pill.html deleted) | `a325cc4` |
| "police station attendance" → "police station support" sweep (7 files) | `53824fe` |

---

## 2. Three standing corrections locked this session

These were course-corrections from the user. Memory files are updated. Do not re-introduce the prior framings.

### 2a. Phone is the primary KPI — not WhatsApp

**Memory:** `feedback_phone_is_primary_kpi.md`

WhatsApp availability is contextual (Ghulam may be in court, time-of-day dependent). Phone is the single channel with a clear personal-answer commitment at any hour.

- CTA order: phone → WhatsApp → cal.com
- Week 2 measurement baseline = phone click events are the primary signal
- Do not frame WhatsApp as equal to or the primary channel in any copy
- Any "trust signal" copy about responsiveness must reference phone, not WhatsApp

### 2b. Direct access is not a conversion lead — do not push it

**Memory:** `feedback_direct_access_secondary.md`

The direct access page exists for validation (referred visitors checking the site is legit). It does not drive calls. It was being over-weighted in planning.

- W2.3 (direct access hub expansion) is removed from Week 2 priorities
- `/direct-access` page: keep as-is unless the user explicitly re-raises it
- Any direct access content must support the call CTA, not displace it

### 2c. "Police station support" not "police station attendance"

**Memory:** `project_police_station_attendance_2026.md`

"Support" is less promise-oriented than "attendance". Swept across all 7 live content files and `lib/practice-areas.ts`. Memory updated.

Research also confirmed: in-person attendance is the PACE Code C statutory default. Video call exists only under the contested COVID-era JIIP protocol — exceptional, not routine, not to be presented as a feature.

---

## 3. Week 1 — COMPLETE

All tasks done and live on `main`:

| Task | Status |
|------|--------|
| W1.1 Merge `cta-bar` | ✅ live |
| W1.2 Merge insights PR #2 | ✅ live (merged prior session) |
| W1.3 GA4 click events (`call_click`, `whatsapp_click`, `book_click`) | ✅ already wired in SiteBehaviour.tsx |
| W1.4 `lawyer → barrister` sweep — 9 instances | ✅ live |
| W1.5 robots.ts AI crawlers + llms.txt | ✅ live |
| W1.6 sitemap.ts changeFrequency | ✅ live |
| StickyPill dead code cleanup | ✅ live |
| `attendance → support` sweep | ✅ live |

**Measurement clock starts now.** Week 3 replan decision requires 3 weeks of `phone_click` / `whatsapp_click` / `book_click` data from GA4. No strategy changes after Week 3 without reviewing that data.

---

## 4. Week 2 — NEXT (corrected priorities)

**Original plan.md had W2.3 (direct access hub) as a Week 2 item. It is removed per 2c above. Phone trust signal (#2b) replaces WhatsApp trust signal framing.**

### W2.1 Police station page reframe
- Brief: **permission page**, not discovery page
- Audience: person showing it to their partner at midnight to justify calling a barrister instead of the free duty solicitor
- Core question the page must answer: *"Why call Astons Law Chambers instead of the duty solicitor?"*
- **Requires Ghulam's first-person voice** — cannot be generated. Ask: *"When someone calls you from a police station at 2am, what's the first thing you do for them?"*
- Current page: `app/police-station-representation/page.tsx` + `content/sections/police-station.html`
- Do NOT claim video call attendance as a feature (JIIP is contested)
- Effort: 3 hrs copy (after client voice) + 1 hr HTML

### W2.2 Phone trust signal
- One sentence adjacent to the phone CTA on homepage + relevant content fragments
- Must reference phone specifically (not WhatsApp — see 2a)
- Ask Ghulam: *"What can you honestly say about how quickly you personally answer the phone?"*
- Verified fact already in memory: "Ghulam personally answers at any hour, including weekends. Voicemail when actively unavailable; calls returned when free." — use this framing unless client provides different wording
- Effort: 15 min once wording confirmed

### W2.4 FAQPage schema — evaluate before implementing
- April 2026 Google update deprioritised FAQ schema for ranking
- Research question: does it still feed AI Overviews? That's the only remaining justification
- Sources: Search Engine Land, Google Search Central, John Mueller posts post-April 2026
- If yes → implement at practice area level (2–3 hrs)
- If no → skip; spend time on W2.5 instead

### W2.5 `definition` field as above-fold answer block
- Data already in `lib/practice-areas.ts` as the `definition` field on every PA
- Render as visually distinct block at top of PA page, above `situation`
- "Answer-first" structure for researching visitors — also feeds AI Overviews passage indexing
- Template file: `content/sections/pa-detail.html`
- Effort: 2 hrs

### W2 branch strategy
```
main → growth-t2  (Week 2 tasks)
```
Create `growth-t2` from main at session start.

### Client input still needed before W2.1 and W2.2

| Ask Ghulam | Unblocks |
|-----------|---------|
| "When someone calls you from a police station at 2am, what's the first thing you do for them?" | W2.1 police station page |
| "What can you honestly say about how quickly you personally answer the phone?" | W2.2 phone trust signal |

---

## 5. Week 3–4 (do not start before Week 3 data review)

- W3.1: sGTM feasibility assessment (~£15–30/month Cloud Run) — needs client cost approval
- W3.2: Review `phone_click` / `whatsapp_click` / `book_click` data — **replan trigger**. Do not continue to deferred tasks without this data.

Deferred (month 2–3, do not start earlier):
- Entity footprint legal directory submissions
- GBP optimisation
- Service / BreadcrumbList schema
- Direct access spoke articles
- Full FAQ rewrite

---

## 6. Key strategic context

### Three visitor types (unchanged)
| Type | Situation | Conversion lever |
|------|-----------|-----------------|
| In crisis | Arrested, custody, court date imminent | Trust velocity — fast enough to call |
| Researching | Voluntary interview, motoring, exploring | Authority — understands my situation |
| Validating | Referred, checking site is legit | Professionalism — looks like a real practice |

Most conversions = Type 1 + Type 3. Most content built = Type 2. Week 2 corrects this.

### Police station page — permission page brief
Not a discovery page. Someone shows it to their partner at midnight to justify calling a barrister instead of the free duty solicitor. Must answer: "Why Astons Law Chambers instead of the duty solicitor?" Requires Ghulam's first-person voice.

### Phone click events are the primary signal
No strategy decision after Week 3 without `phone_click` data from GA4. WhatsApp and cal.com are secondary signals.

---

## 7. Standing gotchas

- **Pages CMS commits directly to `origin/main`** — always `git fetch` + reconcile before push
- **Precompiled CSS trap** — `app/preview-tailwind.css` is static. Grep before adding Tailwind classes. New CSS goes in `preview-styles.css`
- **`bg-footer` = `#232536`** (dark heroes). NOT `bg-navy-950` (`#0E1628`)
- **Hero markup is duplicated per fragment** — check all heroes when touching one
- **GA4 debug mode** — add `?gtm_debug=true` to verify events in DebugView; test on iOS + Android
- **Curly-quote trap** — Edit tool can introduce curly delimiters (`'`/`'`) in TS strings. If build fails with syntax error on a line just edited, check byte encoding: `python3 -c "open('lib/practice-areas.ts','rb').read()[<byte_offset>-5:<byte_offset>+5]"`
- **`preview/index.html`** — legacy prototype, not the live build. Still has old "attendance" wording in several places. Not urgent; clean up when convenient.

---

## 8. Git state

- **`main`** → `53824fe` (live — all Week 1 + copy corrections)
- All prior feature branches (`growth-t1`, `cta-bar`) deleted
- Next branch to create: `growth-t2` (Week 2)
