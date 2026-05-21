# Plan — Top CRO Fixes (2026-05-21)

Phase: scaffolded. **No implementation yet.** Each task below has a Definition
of Done, a verification step, and a flag for whether it can be shipped without
client input.

Tasks are sequenced into 4 shippable branches. Each branch is independently
mergeable, each can be reverted alone, none requires another to ship first.

Cross-references:
- Findings live in `findings.md` (same folder).
- Existing in-flight spec `.project/homepage-cro-2026-05-19/spec.md` is *not*
  contradicted by this plan; it covers structural fixes to the police band /
  sticky banner / 3-card row that landed live as commit `8db5189` / `cf18816`
  earlier this session. Where this plan touches the same area, the change is
  additive (e.g. F14 promotes a line *inside* the police card that
  homepage-cro-2026-05-19 already built).

Standing constraints (apply to every task below — do not restate per task):
- Skills-first hard rule (CLAUDE.md).
- No code reaches `main` without build + type-check + real-browser check (memory).
- Tailwind classes must already exist in `app/preview-tailwind.css` or be added there before use (memory).
- No fabricated facts; 🚩 items route to client before any copy is written.
- Conversion = phone + WhatsApp + Cal.com only.

---

## Branch A — global chrome (sticky pill, consent, footer)

**Branch name:** `fix/cro-global-chrome-2026-05-21`
**Why this branch first:** ranks 1, 2, 3 of the punch list are global chrome.
A single deploy lifts every page.

### A.1 — Sticky pill always-on for crisis routes (F6 / punch #2–3)

**DoD:**
- `hooks/useStickyBarVisibility.ts` accepts an `alwaysVisible` argument or a `routes` allowlist.
- Routes that opt-in to t=0 visibility: `/`, `/police-station-representation`, `/practice-areas/criminal-defence`, `/practice-areas/violent-crimes`, `/practice-areas/drug-offences`, `/practice-areas/youth-crimes`.
- Scroll-threshold behaviour preserved on all other routes.

**Verify:**
- DevTools mobile 375×812 viewport on each crisis route — sticky pill visible at t=0.
- DevTools mobile 375×812 on `/fees`, `/about`, `/timescales` — sticky pill hidden until scroll past threshold.
- `npm run build` + `npm run type-check` clean.

**Effort:** ~1 hour.
**Risk:** none.

### A.2 — CookieYes layout switch from modal to bottom bar (F1 / punch #1)

**DoD:**
- CookieYes dashboard: change banner layout from "popup" to "bar" (bottom).
- Or: keep modal but enforce that police banner + sticky pill render *above* the modal overlay (z-index re-stack — modal at z-50, police banner at z-60, sticky pill at z-60).
- Above-the-fold capture at 375×812 (Playwright) shows the H1 and at least one CTA *uncovered* before consent is given.

**Verify:**
- Playwright screenshot on `/` at 375×812 in fresh-browser state (no consent cookie). H1 visible.
- Same on `/police-station-representation`, `/practice-areas/criminal-defence`.
- Lighthouse re-run on `astonslaw.com` post-deploy — mobile score still ≥95.

**Effort:** ~2 hours. CookieYes dashboard work + a code z-index pass + verification.
**Risk:** 🚩 — client decides between (a) bar-style banner, (b) modal-with-CTAs-above, (c) reduced default consent surface. **Ask before building.**

### A.3 — Footer phone-link affordance (F9 / punch #26)

**DoD:**
- Footer phone number renders with `underline underline-offset-4 decoration-1` (or a tiny phone icon — choose one, not both).
- Hover state visibly darkens.

**Verify:** visual screenshot of footer at desktop + mobile.

**Effort:** <15 min.
**Risk:** none.

### A.4 — Header "Book a call" demoted to text link on desktop (F8 / punch #21)

**DoD:**
- `content/chrome/header.html` desktop nav: `Book a call` rendered as `text-base text-navy-950 underline underline-offset-4 decoration-1` instead of `btn-sm btn-secondary`.
- Mobile menu untouched (Cal.com link inside the slide-out menu stays).
- "Call now" remains the sole header button on desktop.

**Verify:** desktop screenshot of header at 1280px — only one button visible right-aligned.

**Effort:** <30 min.
**Risk:** none — reversible in one commit.

---

## Branch B — homepage copy + hero (no structure changes)

**Branch name:** `fix/cro-home-hero-copy-2026-05-21`
**Why this branch second:** highest leverage, no infra risk, no client-content dependency *except F10 which is run as a controlled test* (see B.3).

### B.1 — Hero lead front-loads 24/7 (F11 / punch #4)

**DoD:**
- `content/sections/home.html` l. 23–25 lead replaced with:
  > "Available 24/7 for police station support. Astons Law Chambers takes instructions direct — police station, first hearing, trial, appeal."
- No other copy change in this commit.

**Verify:** mobile + desktop screenshot, manual read-through.

**Effort:** <15 min. **Risk:** none.

### B.2 — Police card "ask custody sergeant" line promoted to visual peak (F14 / punch #5)

**DoD:**
- Police card body split into (1) lead sentence and (2) a visually-distinct *action line* containing only "Ask the custody sergeant not to begin the interview until representation is in place."
- Action line styled with a left border or eyebrow treatment — exact class chosen at build, verified to exist in `preview-tailwind.css`.

**Verify:** mobile screenshot, eye-track-style scan check — the action line should be the second thing read after the H2.

**Effort:** ~45 min.
**Risk:** none.

### B.3 — Final contact strip H2 (F19 / punch #6)

**DoD:**
- `content/sections/home.html` l. 398 H2: "Speak to someone today." → "Call Astons Law Chambers." (or, if client prefers, "The phone is answered. Call 07922 247 999." — let client pick)
- Sub-line body unchanged.

**Verify:** screenshot at section.

**Effort:** <15 min.
**Risk:** 🚩 wording choice — propose two options to client, commit after pick.

### B.4 — Hero H1 verb / scope test (F10 / punch #11)

**DoD:**
- Pick ONE of:
  - (a) `Call a barrister before the police interview.` (verb shift, minimal change)
  - (b) `A barrister you can call now, before the police interview.`
  - (c) `Speak directly to a criminal defence barrister.`
- Ship to a Vercel preview branch first (not `main`).
- Run for at least 7 days against control before promoting.

**Verify:** GA conversion events `call_click` (hero location) compared to the 7 days prior to the change. Sample-size caveat applies — call out before merging.

**Effort:** ~30 min build, 7 days monitoring.
**Risk:** 🚩 — client decides which variant; client must accept that this is a test, not a finished decision.

---

## Branch C — practice-area detail template

**Branch name:** `fix/cro-pa-detail-template-2026-05-21`
**Why third:** template change cascades across 8 PA pages with one diff. Highest reach for the effort.

### C.1 — Reorder fee strip cells (F20 / punch #8)

**DoD:**
- `content/sections/pa-detail.html` ll. 48–66: cells reordered to First appearance · Single day hearing · Hourly · Trial brief.

**Verify:** screenshot of fee strip on any PA page.

**Effort:** <15 min. **Risk:** none.

### C.2 — Inline "Before you call" on mobile PA pages (F23 / punch #7)

**DoD:**
- The `Before you call` block currently rendered only in the sticky aside also renders *inline* on mobile, positioned between the fee strip and the "What Astons Law Chambers does" Actions list.
- Desktop unchanged (block still in sticky aside).
- Hide-show controlled by Tailwind responsive prefix; no JS.

**Verify:** mobile screenshot on `/practice-areas/criminal-defence` — Before-you-call block appears at ~50% scroll, not at end-of-page.

**Effort:** ~1 hour.
**Risk:** none. Same content, just duplicated for mobile placement; SEO unaffected because content is identical.

---

## Branch D — fees + contact page resolutions (BSB-touched)

**Branch name:** `fix/cro-fees-contact-2026-05-21`
**Why last:** every task in this branch needs at least one client decision. Don't merge until decisions are back.

### D.1 — Legal aid callout above fee table (F26 / punch #9) 🚩

**DoD:**
- Two-line callout above the fee table, calm tone, fact-only:
  > "Legal aid: Astons Law Chambers is not a legal aid contract holder. Where legal aid applies, the case is referred to a partner solicitor firm that holds a contract. The first call is free either way."
- Existing legal-aid section at the bottom of the page is removed *or* abbreviated to a one-line "see above" pointer.

**Verify:** screenshot, BSB transparency rules cross-check (legal aid status remains disclosed).

**Effort:** ~30 min build + client sign-off.
**Risk:** 🚩 — client confirms exact wording before merge.

### D.2 — Resolve 24/7 vs working-hours contradiction site-wide (F29 / punch #10) 🚩

**DoD:**
- Pick one universal commitment:
  - (a) "Available 24/7 for police station support. Other calls answered during working hours; voicemail and WhatsApp returned same-day."
  - (b) "Available 24/7 for police station support" — and remove the working-hours hedge from the contact page.
- Apply the chosen wording to: homepage hero lead, contact page hero, final contact strip, all PA hero leads, police-station hero.

**Verify:** grep the section files for old wording; build + type-check; live screenshot pass.

**Effort:** ~2 hours.
**Risk:** 🚩🚩 — client must commit to one operational reality.

---

## What this plan deliberately does NOT include

- Worked-example fees (F27) — depends on client-supplied numbers, BSB-safe but commercially specific.
- Verified credentials block on About (F36) — depends on client-supplied facts.
- Symmetry on 3 situation cards via a third guide (F16a) — depends on client producing the guide; (16b) ships without dependency but loses utility.
- Hero image removal test (F13) — depends on client decision about positioning.
- Demoting police-card eyebrow red (F7) — relatively low impact; defer to a second sweep.

All of those stay in `findings.md` for client triage.

---

## Decisions required before merging anything

1. **F1 — CookieYes layout.** (a) bar, (b) modal with policy on z-index, (c) reduce consent surface. *Recommended:* (a). Client decision.
2. **F19 — final contact strip H2.** "Call Astons Law Chambers." vs "The phone is answered. Call 07922 247 999." *Recommended:* second option. Client picks.
3. **F10 — H1 test variant.** Pick one of (a)/(b)/(c). Accept this is a 7-day test not a final decision. *Recommended:* (a).
4. **F29 — 24/7 vs working-hours.** (a) tighten universal claim, (b) remove contact-page hedge. *Recommended:* (a). Client picks.
5. **F26 — legal aid callout wording.** Confirm the literal two-line text before commit.

Without 1 and 4, Branch A and Branch D cannot ship. Branches B (excluding B.4) and C can ship without client decisions; they're the no-regret first move.

---

## Suggested order of conversation with client

Once this audit is read:
1. Walk through punch-list ranks 1–10 (10 minutes).
2. Get decisions 1–5 above (10 minutes).
3. Greenlight Branches B and C to start immediately; Branches A and D start when decisions are in.

Estimated total build effort once decisions are in: ~6–8 hours across all four branches, plus a 7-day measurement window on B.4.
