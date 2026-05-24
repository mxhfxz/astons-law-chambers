# Progress Log — Growth Sprint

---

## 2026-05-23 — Session 1

**Outcome:** Two council debates run. Plan 1 (consensus) and Plan 2 (adversarial) complete.
Plan 2 supersedes Plan 1's task ordering.

**Status:** Planning complete. No code shipped yet.

**Branches:**
- `cta-bar` — built, reviewed, pending merge to main ← SHIP THIS FIRST
- insights PR #2 — built, pending merge to main ← SHIP THIS SECOND
- `growth-t1` — not yet created

**Open blockers:**
- Client input needed on WhatsApp response wording (highest-leverage conversion item)
- Client input needed on police station page first-person voice
- FAQPage schema validity post-April 2026 update — external research needed

---

## Tasks Remaining (in order)

### Week 1 (no client dependencies)
- [x] W1.1 Merge `cta-bar` → main — done 2026-05-24
- [x] W1.2 Merge insights PR #2 → main — already merged
- [x] W1.3 GA4 click events — already wired in SiteBehaviour.tsx (call_click, whatsapp_click, book_click)
- [x] W1.4 lawyer→barrister copy sweep — 9 instances fixed, curly-quote bug also fixed
- [x] W1.5 robots.ts AI crawlers + llms.txt — ClaudeBot/PerplexityBot/OAI-SearchBot added; llms.txt was already comprehensive
- [x] W1.6 sitemap.ts changeFrequency — weekly for / + /insights; yearly for BSB static pages
- [ ] **growth-t1 → main merge** — branch pushed, Vercel preview live, NOT merged yet ← DO THIS FIRST
- [ ] StickyPill dead code cleanup (chrome.tsx + sticky-pill.html) — after merge

### Week 2 (needs client input — start conversations immediately)
- [ ] W2.1 Police station page reframe (permission page brief)
- [ ] W2.2 WhatsApp trust signal (one sentence, client-approved wording)
- [ ] W2.3 Direct access hub page
- [ ] W2.4 FAQPage schema — evaluate April 2026 update first
- [ ] W2.5 definition field as above-fold answer block on PA pages

### Week 3–4
- [ ] W3.1 sGTM feasibility assessment
- [ ] W3.2 Review Week 1 click event data — replan trigger

---

## 2026-05-24 — Session 2

**Outcome:** All Week 1 tasks complete on `growth-t1` branch. Not yet merged to main.

**Shipped on `main` this session:**
- `cta-bar` merged → mobile 3-button bar + desktop FABs + hero dual-CTA live

**On `growth-t1` (pending merge):**
- W1.3–W1.6 all done
- Homepage copy: eyebrow trimmed, "Offences covered", "How Direct Access works"
- Vercel preview: `https://alc-staging-git-growth-t1-dsgnly.vercel.app`

**Gotcha discovered:** Edit tool introduced curly-quote string delimiters in practice-areas.ts, breaking build. Fixed with Python byte-level replacement. Added to standing gotchas in handoff.

---

## 2026-05-24 — Session 3

**Outcome:** Week 1 fully shipped to main. Three standing corrections locked. Week 2 ready.

**Shipped to `main` this session (in order):**
1. `growth-t1` merged → `main` (`af71bcf`) — Week 1 complete
2. StickyPill dead code removed — `chrome.tsx` export + `sticky-pill.html` deleted (`a325cc4`)
3. "police station attendance" → "police station support" — 7 files swept (`53824fe`)

**main is now at:** `53824fe`

**Three standing corrections locked (memory files created):**
1. Phone = primary KPI. WhatsApp is contextual/secondary. (`feedback_phone_is_primary_kpi.md`)
2. Direct access is not a conversion lead. Not a Week 2 priority. (`feedback_direct_access_secondary.md`)
3. "Police station support" preferred term. Research confirmed in-person is PACE Code C default; video call (JIIP) is contested/exceptional. (`project_police_station_attendance_2026.md`)

**Week 2 corrected task list:**
- W2.1 Police station page reframe (needs Ghulam first-person voice)
- W2.2 Phone trust signal (not WhatsApp)
- W2.4 FAQPage schema — evaluate post-April 2026 update first
- W2.5 `definition` field as above-fold answer block

**W2.3 (direct access hub) removed from Week 2** per user correction.

**Next session:** create `growth-t2` from main, start Week 2 tasks (after client input on W2.1 + W2.2).
