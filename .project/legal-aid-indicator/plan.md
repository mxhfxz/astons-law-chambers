# Legal Aid Indicator — Design Doc (brainstorming, IN PROGRESS)

**Status:** Brainstorming. Understanding Lock CONFIRMED by user 2026-06-16.
NOT yet at design-approaches stage. NO code written. NO copy written.
**Skill in use:** `brainstorming` (no implementation permitted until design is locked + documented).

---

## What this is

A lead-gen tool for astonslaw.com: an interactive criminal **legal aid *indicator***.
Deliberately NOT called a "calculator" — BSB rules bar promising a claimable
outcome, and a wrong promise is licence-terminating exposure. It never produces a
yes/no verdict. It nudges a hesitant visitor ("do I even qualify?") into a call.

## Why

Convert affordability hesitation into a conversion (call / WhatsApp / cal.com)
without asserting eligibility. Both result paths push to contact; neither promises.

## Who

Defendants / families self-assessing affordability before they phone.

---

## CONFIRMED DECISIONS (Understanding Lock — user said "All looks good" 2026-06-16)

1. **Eligible-path ending = the existing conversion trio.** cal.com booking acts as
   the structured "form" (captures name + reason field). **NO custom contact form,
   NO email capture.** This was the user's choice when told a real form would override
   the no-forms HARD rule + add GDPR/storage burden. → stays inside the locked trio.
2. **Placement = standalone page + entry points.** New route, plus a "Check
   eligibility" entry button on the legal-aid page (and likely home/fees later).
3. **Logic model = soft signal, 2 outcomes.** Generic bracket inputs → simple
   weighting → ONE of two soft messages, BOTH routing to contact:
   - (a) "you may well be eligible — worth a call"
   - (b) "you might not qualify on income alone, but it's complex — still worth a call"
   Never a verdict. Lowest promise-risk option (rejected: 3 outcomes; "always it depends").
4. **Inputs = all four** (the real criminal legal aid eligibility drivers):
   - **Case stage** — police station / Magistrates' / Crown / not sure.
     (Police station = free for everyone; Crown Court interests-of-justice generally taken as met.)
   - **Benefits / under-18** — UC, Income Support, income-based JSA/ESA, or under 18
     "passport" the means test (auto-pass).
   - **Income band** — rough household brackets, NO exact figures.
   - **Dependants / housing** — children/partner at home + significant housing costs
     (pull many working defendants into eligibility).

## ASSUMPTIONS (confirmed as defaults in the Lock — correct if wrong)

- **100% client-side.** Answers never transmitted or stored. Nothing leaves the
  browser → no GDPR surface.
- **No analytics on answers/results.** Only the existing conversion-click tracking
  (`data-track` on the CTAs) fires, same as every page. Recording self-reported
  finances/charges would breach the safety baseline.
- **No cal.com prefill** from answers (privacy-clean; can revisit later).
- **All visible strings are NEW copy.** Copy HARD RULE applies → user supplies exact
  text OR explicitly unlocks drafting for approval. Nothing ships with Claude wording.
- The page **keeps + reinforces** the existing "GOV.UK is the only reliable source"
  link, so the indicator never positions itself as authoritative.
- Accessibility: keyboard-operable, screen-reader-sound, any motion guarded by
  `prefers-reduced-motion`.

## ARCHITECTURE PRINCIPLE (derived from how this codebase works)

- Pages inject static HTML fragments (`content/sections/*.html`) via
  `dangerouslySetInnerHTML` (see `lib/content.ts` → `readSection`). Copy lives there.
- **Tailwind JIT does NOT run** — any class used must already exist in the
  precompiled `app/preview-tailwind.css` bundle. Verify class availability at build.
- Content fragments are currently inert (no scripts anywhere in `content/`).
- → **Split: all COPY in a static HTML fragment (user-authored, read-only); a
  separate JS module holds ONLY logic** (read inputs, compute soft signal, toggle
  which pre-rendered result block is visible). Zero copy in the JS.
- Result blocks: both rendered in the fragment, hidden by default (`hidden` class),
  JS reveals one. New route added under `app/` mirroring the existing page pattern
  (RSC injecting the fragment + JSON-LD).

## OPEN QUESTIONS (resolve next session before design approaches)

1. **Route slug** — `/legal-aid-check` proposed. User said "all looks good" → treat as
   tentatively ACCEPTED unless they object. Confirm.
2. **Copy ownership** — STILL OPEN. Does the user hand over exact text for every
   string (questions, answer labels, both result messages, CTA labels, meta title/desc),
   or explicitly unlock Claude to draft a first pass for approval? Cannot proceed to
   build without this.
3. Interactivity mechanism — `"use client"` React component vs inline `next/script`
   module. Recommend deciding at design-approaches stage; both keep copy in the fragment.

## DECISION LOG

| Decision | Chosen | Alternatives rejected | Why |
|---|---|---|---|
| Eligible CTA | cal.com as the "form" | Real contact form; trio-only | Stays in locked trio, no GDPR/storage, no HARD-rule override needed |
| Placement | Standalone page + entry points | Section in legal-aid page; standalone only | Own SEO target + max reach |
| Logic | Soft signal, 2 outcomes | 3 outcomes; always "it depends" | Lowest promise-risk that still reacts to inputs |
| Inputs | All four | Subsets | These are the actual means-test + stage drivers |

## NEXT STEP

Resume `brainstorming` at **step 5 (Explore Design Approaches)** — propose 2–3
build approaches for the interactive mechanism + page structure, then incremental
design, then hand to implementation only after the design is accepted and this doc
is finalised. Resolve the two open questions first (esp. copy ownership).
