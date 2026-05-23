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
