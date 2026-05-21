# Deep CRO Audit — Astons Law Chambers (2026-05-21)

Phase: audit (analysis only — no code, no branch)
Output: `findings.md` (prioritised audit) + `plan.md` (sequenced top fixes)
Inputs: live `astonslaw.com` + `content/*.html` + `lib/practice-areas.ts` + 3 Playwright screenshots in this folder

## Why this audit exists

The site is technically sound (mobile/desktop Lighthouse 98–100, BSB-compliant
chrome, three verified conversion channels). The user's read is that **design,
layout and language are not optimised for conversion**. This audit tests that
read against actual rendered behaviour and codebase copy, anchored to the
correct audience model.

## What this audit is NOT

**Not a SaaS or B2C CRO playbook.** The default page-CRO frame (free trials,
demos, ROI, "join 10,000+ teams", waitlists, urgency timers, exit-intent
pop-ups, lead magnets, email capture, A/B exposure ratios) is structurally
wrong here, in part **regulatorily prohibited** by the BSB:

- No outcome promises ("win your case", "best barrister", "guaranteed").
- No undue inducements ("first month free if you sign today").
- No comparative claims against named competitors.
- No misleading testimonials, no fabricated review counts.
- No email funnel — conversion is phone + WhatsApp + Cal.com only.
- No portrait of the practitioner anywhere, ever (memory rule).
- Entity-first voice ("Astons Law Chambers acts…", not "I'll fight for you").

Anything in this audit that contradicts the above is wrong by definition and
must be discarded before it reaches `findings.md` or `plan.md`.

## Audience model (the only one this audit uses)

**Primary persona — Defendant in active crisis.** Almost always one of:

1. Arrested, in custody now, or a family member calling on their behalf.
2. Voluntary interview under caution scheduled in the next 72 hours.
3. Charged or summons received, first hearing in the diary.

**State at first visit:** acute stress, fear of criminal record / liberty /
employment / immigration consequences, often after midnight, almost always
mobile, often searching from inside a police station or directly after release
under investigation. May be tipsy, distressed, or in a state where the
"average reading age 9" rule is too generous.

**Awareness ladder position** (per `awareness-stage-mapper`): mostly
**solution-aware** (knows they need a lawyer) shading to **product-aware**
(comparing barrister vs solicitor vs duty solicitor). A meaningful minority
arrives **problem-aware-only** ("am I in trouble?" — google `voluntary
interview under caution`). Unaware traffic is rare and not the design target.

**Implication for CRO:** the central persuasion route (long arguments, proof
points, comparison tables) is wrong. The audience already has high motivation
but **low cognitive capacity in the moment of the visit**. The page must
function as a *peripheral route* (Quick et al., 2018; ELM): one clear action,
one phone number, one calm-and-competent voice signal, zero friction. The
deep-content sections exist for the colder reader (family member at home, or
returning visitor) who is now ready to read.

## Scope

Pages audited:

- Homepage (`/`)
- Fees (`/fees`)
- Contact (`/contact`)
- Direct Access (`/direct-access`)
- Police Station Representation (`/police-station-representation`)
- Practice Areas hub (`/practice-areas`)
- About (`/about`)
- Timescales (`/timescales`)
- Practice Area detail template (`pa-detail.html`) — applies to all 8 PA pages
- Global chrome: sticky header + police banner, sticky pill, footer, mega menu

Out of scope: complaints, terms-of-engagement, privacy-policy, the two guide
pages (they exist as PDFs+HTML and are not conversion targets).

## Skills used (audit grounding)

- `page-cro` (primary frame — adapted away from SaaS defaults)
- `awareness-stage-mapper` (defendant-in-crisis = solution-aware / product-aware peripheral route)
- `marketing-psychology` (ELM peripheral cues; loss aversion under regulatory limits; status-quo bias of *not* calling; goal-gradient on the "what to do now" cards)
- `avoid-ai-writing` (43-entry replacement table applied page-by-page)
- `legal-advisor` (BSB / SRA / consumer-rights guardrails)
- `verification-before-completion` (gate before declaring the audit done)
- Standing project rules: `frontend-design`, `frontend-dev-guidelines`,
  `copywriting`, `mobile-design` (referenced where layout/copy findings touch
  their territory).

## Constraints

- **No code changes in this phase.** Findings + plan only.
- **No new claims about the practice.** Anything that would change a verified
  fact is flagged with 🚩 and routed back to the user, not written into copy.
- **No alternating tonal banding.** Dark sections are surgical, max 1–2 per
  page (memory rule). Recommendations must not break this.
- **Conversion paths stay phone + WhatsApp + Cal.com only.** No form, no
  email, no lead magnets.
- **Tailwind class rule:** any class proposed in `findings.md` /`plan.md`
  must already exist in `app/preview-tailwind.css` or be added there before
  use (precompiled-CSS trap, memory rule).

## What "good" looks like at the end

`findings.md` reads like a senior-CRO walkthrough that a barrister could hand
to a regulator without redaction. Each finding has: page → current state →
why it depresses conversion → which skill / model cites it → recommendation →
effort/impact tag → BSB-safety flag where relevant. `plan.md` sequences the
highest-impact, lowest-regulatory-risk fixes into discrete, atomically-
shippable tasks that respect the existing `homepage-cro-2026-05-19` spec
rather than duplicating it.
