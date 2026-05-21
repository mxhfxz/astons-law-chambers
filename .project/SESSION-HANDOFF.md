# Session Handoff — 2026-05-21 (CRO follow-up + safety baseline)

Read this FIRST, after `MEMORY.md` and `.project/_START_HERE.md`. **Supersedes the 2026-05-19 handoff** (still in git history).

---

## ⚠️ APEX RULE — SKILLS FIRST, NEVER CLAUDE DEFAULTS

Non-negotiable. Every task — answering, exploring, frontend/CSS, copy, git, deploys, debugging, verification — routes through the relevant installed **skill FIRST**, before any action including clarifying questions. Enforced by a `UserPromptSubmit` hook.

Routing:
- Debugging → `systematic-debugging`
- Verifying → `verification-before-completion`
- Frontend → `frontend-design` + `frontend-dev-guidelines`
- Accessibility → `fixing-accessibility` / `a11y-audit` / `wcag-audit-patterns`
- Git / deploys → git skills + `vercel-deployment`
- Config / settings.json / hooks → `update-config`
- Planning → `project-mgmt`
- SEO → `seo-audit` (+ `seo-technical`, `schema-markup`, `seo-meta-optimizer`, `seo-geo`)
- Copy → `copywriting` + `avoid-ai-writing`
- BSB / regulatory → `legal-advisor`

Standing rules: **nothing reaches `main` without build + type-check + a real-browser check**; documents are input for evaluation, not build specs; barrister voice only.

---

## 1. Production state

**Production HEAD:** `main` at `f1f433d` — live on `astonslaw.com` via Vercel auto-deploy. Build clean (28/28 static pages), type-check clean, deploy verified at 20:17 UTC 2026-05-21.

Git is main-only — no other branches.

## 2. What 2026-05-21 shipped (in order)

| Commit | Scope |
|---|---|
| `f2eda17` | **Two new pages.** `/authorised-to-conduct-litigation` (~830 words, full schema graph) and `/legal-aid` (~1030 words). |
| `863f7ff` | **Locked hero mobile-fold spec.** Eyebrow + H1 "24/7 Emergency criminal defence barrister" + sub w/ inline "available" link + full-width number CTA + 3 trust links (BSB, 4.9 Google, Authorised to conduct litigation). Compressed 5 above-fold CTAs → 3, ~50 words → ~24. |
| `0daa8c6` | **JTBD-led police banner copy + relabel/relocate quick-exit.** |
| `4783082` | **Internal-link audit pass 2 — orphan rescue + cluster rebalance.** First wave. |
| `ac358bb` | docs(cro-audit): CRO 2026 overlay + hero preview screenshots. |
| `a9d6c2f` | **F32 fix.** Dropped the duplicate seven-row timescales table from `/direct-access`; replaced with a one-line signpost to `/timescales`. |
| `53684bd` | **Internal-link audit pass 3.** `/contact` orphan rescue: body inbound links from `/about` Geography section and `/fees` "what sets the fee" section. Arrest guide → `/practice-areas/driving-offences` and `/practice-areas/youth-crimes` body cross-links after the four-outcome custody-clock block. |
| `1fafb69` | **BSB direct profile URL swap on the two pages that need it.** `/authorised-to-conduct-litigation` "Verify the authorisation" section and `/about` Regulation list now point to https://www.barstandardsboard.org.uk/barristers-register/0A9C84A0E6BE3846C117FA4B4290EAD2.html . Hero, `/terms-of-engagement`, and `/complaints` continue to use the generic register-search URL. |
| `f1f433d` | **T4.1 anti-tracker baseline sweep — branch 1 of the safety-aware implementation plan.** Stripped `/Author "Ghulam Humayun, Astons Law Chambers"` from both arrest-guide PDFs in `public/resources/`; replaced with entity-only "Astons Law Chambers"; cleared `/Subject`, `/Keywords`, `/Creator`, `/CreationDate`, `/ModDate`. Wrote `.project/cro-deep-audit-2026-05-21/safety-aware-implementation-plan.md`. Rest of the sweep (images, source tree, schema, third-party scripts, robots.ts) verified clean and recorded. |

## 3. The new canonical doc: safety-aware-implementation-plan.md

**File:** `.project/cro-deep-audit-2026-05-21/safety-aware-implementation-plan.md`

The original audit prioritised conversion lift. This plan re-weights against an explicit **practitioner-safety threat model**. The threat: some defendants and associates are hostile; the site should not help them find Ghulam outside of Astons.

The plan structures the remaining audit items into **five branches that ship in order, one branch per session**, with detailed safety analysis on each. Branch 1 just shipped (T4.1). Branches 2–5 remain.

The plan also names **ten locked safety exclusions** that no audit finding can override without explicit Ghulam sign-off. They're recorded in [project_safety_baseline_2026_05_21.md](.claude/projects/-Users-mahfuzpholby-Documents-Agency-Work-astons-law-chambers/memory/project_safety_baseline_2026_05_21.md) memory.

## 4. The cadence

User wants one branch per session, with a hard session boundary (`/clear`) between branches to avoid context drift. **Always** end each session with a detailed handoff (this file) + an updated pickup prompt (§7 below).

Order in `safety-aware-implementation-plan.md`:

- **Branch 1 — `safety-baseline-2026-05-21`** ✅ shipped this session as commit `f1f433d`.
- **Branch 2 — `cro-tier1-content-schema-2026-05-21`** — **NEXT.** `llms.txt` + BreadcrumbList on deep pages + police-station FAQPage + per-PA Service schema (provider → Org only) + cal.com next-slot default. All zero-person-exposure.
- **Branch 3 — `cro-tier1-copy-2026-05-21`** — F26 legal-aid callout above the fee table (needs Ghulam wording sign-off).
- **Branch 4 — `cro-tier2-person-sameas-listicles-2026-05-21`** — Person `sameAs` carrying only the BSB direct profile URL. Three list-form content adds (Direct-Access comparison, first-conference checklist, per-PA "What is" definitions). Needs Ghulam review of list copy.
- **Branch 5 — `cro-tier3-decisions-2026-05-21`** — F29 24/7 wording, CookieYes layout, call-attribution, loss-frame line, Google-Extended (likely no-op). Five client decisions; ship when each is in.

## 5. Standing client 🚩 needed before Branches 3–5

1. **F26 legal-aid callout wording (Branch 3).** Two-line callout — recommended literal text in `findings.md` rank 11. Confirm before ship.
2. **List-form content adds (Branch 4).** Drafts go to Ghulam for legal-accuracy review.
3. **F29 24/7 wording (Branch 5).** Recommended scope-narrowed lock: *"Available 24/7 for police station support. Other calls answered during working hours; voicemail and WhatsApp returned within business hours."*
4. **CookieYes layout (Branch 5).** Recommended (a) bar at bottom.
5. **Call-attribution (Branch 5).** (a) 10-sec post-call sheet + Measurement Protocol upload, or (b) status quo. Bandwidth decision.
6. **Loss-frame homepage line (Branch 5).** *"Most criminal cases are decided by what happens in the first call and the first hearing — not the trial."* — needs verification of the literal wording.
7. **Google-Extended in `robots.ts` (Branch 5).** Recommended: keep blocked (safety wins over small AEO upside).

## 6. Standing client 🚩 from this session (recorded but not blocking)

- **cal.com "Future bookings limit" dashboard setting** — confirm narrow (≤30 days, the default) per the locked safety baseline. Dashboard check, not code.
- **BSB profile URL stability** — 32-char content hash; quarterly re-check is in the safety baseline T4.2 calendar.

## 7. Pickup prompt for the next session (Branch 2)

Use this verbatim to start the next session. It's self-contained and lets a fresh context window pick up the exact next move.

```
Astons Law Chambers — Branch 2 of the safety-aware implementation plan.

Production is live on main at f1f433d after the T4.1 anti-tracker
sweep landed (commit f1f433d). This session ships Branch 2 of
.project/cro-deep-audit-2026-05-21/safety-aware-implementation-plan.md:
the Tier 1 content + schema additions. All zero-person-exposure; no
client decision blocks this branch.

Standing rules apply: HARD RULE — skills first, no Claude defaults;
APEX rule — Penpot existing pages off-limits; no broken sites to main
(build + type-check + real-browser pass before any push);
practitioner-safety threat model + ten locked safety exclusions per
.claude/projects/.../memory/project_safety_baseline_2026_05_21.md.

Read first, in order:
 1. MEMORY.md (auto-loaded; respect the feedback rules, especially the
    new project_safety_baseline_2026_05_21.md)
 2. .project/SESSION-HANDOFF.md (2026-05-21 — canonical session-state
    doc; sections 1, 2, 3 set the context)
 3. .project/cro-deep-audit-2026-05-21/safety-aware-implementation-
    plan.md — Tier 1 section (T1.1 through T1.6). This is the spec
    for this session.

Work to ship this session in branch
fix/cro-tier1-content-schema-2026-05-21 (single branch, then merge to
main, then push):

 1. T1.1 — public/llms.txt. Markdown AI-crawler manifest at root. Per
    the plan's safety check: content map only, no personal facts, no
    availability windows, no schedule. Spec is in the audit's
    cro-2026-overlay.md M4.2 section (the minimum viable llms.txt
    template). Adapt to current site routes.

 2. T1.2 — BreadcrumbList JSON-LD on the deep non-PA pages:
    /fees, /about, /direct-access, /police-station-representation,
    /complaints, /timescales, /legal-aid,
    /authorised-to-conduct-litigation. PA pages and guides already
    have it; this just fills the gap on deep pages.

 3. T1.3 — FAQPage JSON-LD on /police-station-representation. The
    page has a visible FAQ block (~6 questions) but no schema. Match
    visible Q-A wording exactly (Google policy).

 4. T1.4 — Per-PA Service schema in lib/render-practice-area.ts. Each
    of the 8 PA pages emits one Service graph node; provider
    references #organization, NOT #principal. Deliberate omission of
    Person-link is a safety control — keeps individual-attached
    service data off the graph.

 5. T1.6 — cal.com embed default-selected-slot config. One parameter
    in the embed snippet in app/layout.tsx (or wherever the embed
    init lives). Do NOT widen the look-ahead window — the visible
    practitioner availability pattern stays narrow.

T1.5 (legal-aid callout) is Branch 3, NOT this branch — it needs
Ghulam wording sign-off, so it ships separately.

For each item:
 - Skills-first: invoke schema-markup (or seo-audit) for T1.1–T1.4;
   frontend-design lite for T1.6; verification-before-completion for
   every claim of "passes". Don't improvise.
 - Build + type-check + real-browser check on each before commit.
 - Validate each new schema block in Google Rich Results Test (or
   document with a `curl + jq` snapshot that proves the JSON-LD is
   well-formed).
 - Match the existing schema @id graph linking pattern
   (#organization, #principal, #website) — do not create new top-
   level IDs unless needed.

After everything is verified:
 - Commit logically (one commit per coherent concern, or one bundled
   commit per the user's "commit logically" rule).
 - Push main.
 - Poll astonslaw.com until the new schema and llms.txt are live.
 - Write a detailed SESSION-HANDOFF.md update (supersede this file)
   with the next pickup prompt for Branch 3.

Open client items already known to be NOT this branch's scope:
 · F26 legal-aid callout (Branch 3)
 · Person sameAs + listicle adds (Branch 4)
 · Five client-decision items (Branch 5)
```

## 8. Architecture notes & gotchas — READ BEFORE TOUCHING CODE

(Carried forward from the 2026-05-19 handoff — still load-bearing.)

- **The precompiled-CSS trap.** `app/preview-tailwind.css` is a precompiled static stylesheet; `tailwind.config.ts` scans only `app/` + `components/`, never `content/*.html`. A Tailwind class used in a `content/*.html` fragment that is not already in `preview-tailwind.css` has no rule and silently breaks layout (build still passes). Grep `preview-tailwind.css` for a class before using it in a content fragment.
- `rm -rf .next` before any verifying build when only `content/*.html` changed.
- Verify rendered layout with screenshots, not DOM-only checks.
- Static HTML fragments in `content/sections/*.html` + `content/chrome/*.html` injected via `lib/content.ts`. Source of truth for copy.
- PA detail pages + hub grid render from `lib/practice-areas.ts` via `lib/render-practice-area.ts` (server-side, build time). **This is the file to edit for T1.4 per-PA Service schema.**
- Fonts: IBM Plex Sans self-hosted (`@font-face` in `preview-styles.css`, woff2 in `public/fonts/`). No Google Fonts. No `<link rel=preload>` for fonts.
- Third-party scripts in `app/layout.tsx`: `consent-mode-default` beforeInteractive (compliance), CookieYes afterInteractive, GA afterInteractive, cal.com lazyOnload. Do not move CookieYes back to beforeInteractive — that was the mobile-perf regression cause.
- Only the production custom domain `astonslaw.com` gives a representative PageSpeed/Lighthouse number. `localhost` is too fast; raw `*.vercel.app` is cold/uncached.

## 9. Git + working tree state

- **`main` `f1f433d`** is production, clean, main-only.
- Untracked, pre-existing, deliberately left alone: `.gitignore` modification (background macOS noise), `.mcp.json.disabled`, settings backup, three locked-hero PNGs in `.project/cro-deep-audit-2026-05-21/`, `.project/preview/`, `.project/research/`, `.claude/scheduled_tasks.lock`. Decide with the user — do not blanket `git add -A`.

## 10. Verified anchors for next session

- BSB direct profile URL (T1.4 / T2.1 reference): `https://www.barstandardsboard.org.uk/barristers-register/0A9C84A0E6BE3846C117FA4B4290EAD2.html` — 32-char content hash, quarterly re-check.
- Practitioner verified facts: name, jobTitle "Barrister", Date of Call Mar 2018, Inner Temple, full rights of audience, public access, conduct of litigation, Crime + Other practice areas, no disciplinary findings. All BSB-published.
- Locked address: 85 Great Portland Street, First Floor, London W1W 7LT (serviced chambers, not residence).
- Phone: 07922 247 999 (also `tel:+447922247999`).
- WhatsApp: `https://wa.me/447922247999` with `?text=I need legal support for...` (URL-encode in consumers).
- cal.com: `https://cal.com/astonslaw/callback?overlayCalendar=true`.
- Org `sameAs`: Google profile (`https://share.google/UUmxWclpCyvczjSSS`), LinkedIn company page (`https://www.linkedin.com/company/astons-law-chambers/`), Trustpilot review URL (`https://uk.trustpilot.com/review/astonslaw.com`). Person `sameAs` currently empty.
