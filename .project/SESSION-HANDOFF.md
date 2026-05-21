# Session Handoff — 2026-05-21 (Branch 2 — Tier 1 content + schema)

Read this FIRST, after `MEMORY.md` and `.project/_START_HERE.md`. **Supersedes the previous 2026-05-21 handoff** (the one that ended with the Branch 2 pickup prompt; still in git history).

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
- SEO / schema → `seo-audit` (+ `seo-technical`, `schema-markup`, `seo-meta-optimizer`, `seo-geo`)
- Copy → `copywriting` + `avoid-ai-writing`
- BSB / regulatory → `legal-advisor`

Standing rules: **nothing reaches `main` without build + type-check + a real-browser check**; documents are input for evaluation, not build specs; barrister voice only.

---

## 1. Production state

**Production HEAD:** `main` at `285245c` — live on `astonslaw.com` via Vercel auto-deploy. Build clean (28/28 static pages), type-check clean, deploy verified live at 21:55+ UTC 2026-05-21 via curl probes of `/llms.txt`, deep-page BreadcrumbList JSON-LD, police-station FAQPage JSON-LD, per-PA Service node, and cal.com layout.

Git is main-only — no other branches (the `fix/cro-tier1-content-schema-2026-05-21` branch was rebased, merged, and deleted).

## 2. What this session shipped (in order)

| Commit | Scope |
|---|---|
| `f15b9ed` | **Interim, from another session.** GCM Consent Mode default now writes all 7 categories denied (was 4). Picked up via rebase before pushing. |
| `285245c` | **Branch 2 — Tier 1 content + schema additions.** Five tasks bundled (rationale: all zero-person-exposure, none required client decision, all part of the same Tier 1 batch in the safety-aware plan). |

The Branch 2 commit covers:

- **T1.1 — `public/llms.txt`.** 50-line markdown manifest at root for AI crawlers. Practice/service/regulatory pages with one-line descriptions. "Guidance for AI assistants" section names the practice, the regulator (BSB), the only confirmed phone route, the BSB Register URL, the legal-aid posture, and the locked availability claim — plus an explicit instruction not to substitute a different practitioner/chambers name. Sitemap linked. No availability claim beyond the public "24/7 for police station support" wording.
- **T1.2 — `BreadcrumbList` JSON-LD on the 5 deep non-PA pages that were missing it.** `/about`, `/direct-access`, `/complaints`, `/timescales`, `/police-station-representation`. Visible-label parity in each case. `/fees`, `/legal-aid`, `/authorised-to-conduct-litigation` already carried it.
- **T1.3 — `FAQPage` JSON-LD on `/police-station-representation`.** 5 Q&A pairs, character-for-character match with the visible "Common questions" block in `content/sections/police-station.html` (Google's 2025 FAQPage policy disallows paraphrasing). Source: lines 70-91 of the police-station fragment.
- **T1.4 — Per-PA `Service` schema in `lib/render-practice-area.ts`.** Each of the 7 PAs emits one `Service` graph node. **Safety control: `provider` deliberately references `#organization`, never `#principal`** — keeps individual-attached service data off the graph. Service nodes contain `name`, `description` (from `area.cardSummary`), `serviceType` (per-slug switch), `provider`, `areaServed: [London, England, Wales]`, and `audience.audienceType` (defendants for the 6 criminal PAs; families/interested persons for inquests). No `serviceOutput.employee`, no `provider.employee`, no Person link of any kind.
- **T1.6 — cal.com `column_view` layout.** Two load-bearing locations updated: the global default in `Cal.ns.callback('ui', ...)` in `app/layout.tsx`, and the inline-mount `config` in `components/site/SiteBehaviour.tsx` that runs when the user clicks the homepage booking facade. Documentation reference in `content/sections/home.html` updated to match. Column view lists slots in chronological order with the next available at the top — visitor's choice becomes "accept or pick another", not "scan a month grid". Look-ahead window unchanged (cal.com dashboard `Future bookings limit`, locked narrow per the safety baseline).

**T1.5 (legal-aid callout) deliberately deferred to Branch 3** — needs Ghulam wording sign-off, ships separately.

## 3. Open files and the canonical doc

**The canonical doc remains** `.project/cro-deep-audit-2026-05-21/safety-aware-implementation-plan.md`. Branch 1 (T4.1, anti-tracker baseline) ✅ shipped this Tuesday as `f1f433d`. Branch 2 (T1.1/T1.2/T1.3/T1.4/T1.6) ✅ just shipped as `285245c`. Branches 3–5 remain.

The **ten locked safety exclusions** ([project_safety_baseline_2026_05_21.md](.claude/projects/-Users-mahfuzpholby-Documents-Agency-Work-astons-law-chambers/memory/project_safety_baseline_2026_05_21.md)) continue to apply and were respected in every T1.x add this session (notably: Service nodes do not link `#principal`; llms.txt does not surface availability windows beyond the public 24/7 police-station claim).

## 4. The cadence

User wants one branch per session, with a hard session boundary (`/clear`) between branches to avoid context drift. **Always** end each session with a detailed handoff (this file) + an updated pickup prompt (§7 below).

Order in `safety-aware-implementation-plan.md`:

- **Branch 1 — `safety-baseline-2026-05-21`** ✅ shipped as `f1f433d`.
- **Branch 2 — `cro-tier1-content-schema-2026-05-21`** ✅ shipped as `285245c` (this session).
- **Branch 3 — `cro-tier1-copy-2026-05-21`** — **NEXT.** F26 legal-aid callout above the fee table. Needs Ghulam wording sign-off before ship.
- **Branch 4 — `cro-tier2-person-sameas-listicles-2026-05-21`** — T2.1 (Person `sameAs` → BSB direct profile URL only) + T2.2 (three list-form content adds). Needs Ghulam list-content review.
- **Branch 5 — `cro-tier3-decisions-2026-05-21`** — T3.1 (24/7 wording site-wide), T3.2 (CookieYes layout), T3.3 (call-attribution), T3.4 (loss-frame line), T3.5 (Google-Extended decision — likely no-op). Five client decisions; ship when each is in.

Tier 4.2 quarterly sweep is calendar, not branch.

## 5. Standing client 🚩 needed before Branches 3–5

1. **F26 legal-aid callout wording (Branch 3).** Two-line callout above the fee table. Recommended literal text in `findings.md` rank 11. Confirm before ship.
2. **List-form content adds (Branch 4).** Drafts go to Ghulam for legal-accuracy review.
3. **F29 24/7 wording (Branch 5).** Recommended scope-narrowed lock: *"Available 24/7 for police station support. Other calls answered during working hours; voicemail and WhatsApp returned within business hours."*
4. **CookieYes layout (Branch 5).** Recommended (a) bar at bottom.
5. **Call-attribution (Branch 5).** (a) 10-sec post-call sheet + Measurement Protocol upload, or (b) status quo. Bandwidth decision.
6. **Loss-frame homepage line (Branch 5).** *"Most criminal cases are decided by what happens in the first call and the first hearing — not the trial."* — needs verification of the literal wording.
7. **Google-Extended in `robots.ts` (Branch 5).** Recommended: keep blocked (safety wins over small AEO upside).

## 6. Standing client 🚩 from earlier sessions (recorded but not blocking)

- **cal.com "Future bookings limit" dashboard setting** — confirm narrow (≤30 days, the default) per the locked safety baseline. Dashboard check, not code. **Still standing** — T1.6's `column_view` switch is a presentation-layer change and does not alter the future-bookings window.
- **BSB profile URL stability** — 32-char content hash; quarterly re-check is in the safety baseline T4.2 calendar.

## 7. Pickup prompt for the next session (Branch 3)

Use this verbatim to start the next session. It's self-contained and lets a fresh context window pick up the exact next move.

```
Astons Law Chambers — Branch 3 of the safety-aware implementation plan.

Production is live on main at 285245c after Branch 2 (Tier 1 content +
schema additions: llms.txt, BreadcrumbList on 5 deep pages, FAQPage on
/police-station-representation, per-PA Service schema with the
provider→Org safety control, cal.com column_view). This session ships
Branch 3 of .project/cro-deep-audit-2026-05-21/safety-aware-
implementation-plan.md: the T1.5 legal-aid callout above the /fees
fee table.

Standing rules apply: HARD RULE — skills first, no Claude defaults;
APEX rule — Penpot existing pages off-limits; no broken sites to main
(build + type-check + real-browser pass before any push);
practitioner-safety threat model + ten locked safety exclusions per
.claude/projects/.../memory/project_safety_baseline_2026_05_21.md.

Read first, in order:
 1. MEMORY.md (auto-loaded; respect every feedback rule, especially
    project_safety_baseline_2026_05_21.md)
 2. .project/SESSION-HANDOFF.md (this file; sections 1, 2, 3 set
    context, §5 lists the F26 wording 🚩)
 3. .project/cro-deep-audit-2026-05-21/safety-aware-implementation-
    plan.md — T1.5 section
 4. .project/cro-deep-audit-2026-05-21/findings.md — F26 (the audit
    finding the callout closes) and rank 11 (where the recommended
    literal wording lives)

Work to ship this session in branch
fix/cro-tier1-copy-2026-05-21 (single branch, then merge to main,
then push):

 1. T1.5 — F26 legal-aid callout above the /fees fee table. Two-line
    callout; link from the callout to the existing legal-aid section
    further down /fees (don't duplicate). Existing /fees legal-aid
    section can become a one-line "see above" pointer per the plan's
    DoD.

🚩 Ghulam must sign off on the literal wording before merge. Surface
the recommended text from findings.md rank 11; do not ship until he
confirms. If he isn't reachable this session, do the prep (the
component change ready as a stash or untracked file) but DO NOT
merge to main — wait for sign-off.

For the work itself:
 - Skills-first: copywriting + avoid-ai-writing for the callout text
   review; frontend-design lite for the placement; verification-
   before-completion for every "passes" claim. legal-advisor for the
   final BSB-compliance sanity-check.
 - Build + type-check + real-browser check before commit.
 - Real-browser screenshot at 375×667 mobile + 1440 desktop to
   confirm the callout sits above the fee table without breaking
   the existing fee strip layout.

After everything is verified AND Ghulam has signed off:
 - Commit logically.
 - Push main.
 - Poll astonslaw.com until the callout is live.
 - Update SESSION-HANDOFF.md (supersede this file) with the next
   pickup prompt for Branch 4.

If Ghulam has not signed off:
 - Save the work locally (don't commit, or commit on a feature branch
   that does NOT get merged to main).
 - Update SESSION-HANDOFF.md describing the blocked state and what
   wording was proposed.

Open client items already known to be NOT this branch's scope:
 · Person sameAs + listicle adds (Branch 4)
 · Five client-decision items (Branch 5)
```

## 8. Architecture notes & gotchas — READ BEFORE TOUCHING CODE

(Carried forward + new from this session.)

- **NEW (this session) — `cal.com` config has TWO load-bearing locations.** The `ui` callback in `app/layout.tsx` sets the *namespace default*. The `inline` mount in `components/site/SiteBehaviour.tsx` carries an explicit `config: { layout, ... }` that runs when the visitor clicks the homepage booking facade — this **overrides the `ui` default**. If you change one, change the other. Documentation reference in `content/sections/home.html` (inside an HTML comment block) is a third place to keep in sync for clarity, but it has no runtime effect.
- **The precompiled-CSS trap.** `app/preview-tailwind.css` is a precompiled static stylesheet; `tailwind.config.ts` scans only `app/` + `components/`, never `content/*.html`. A Tailwind class used in a `content/*.html` fragment that is not already in `preview-tailwind.css` has no rule and silently breaks layout (build still passes). Grep `preview-tailwind.css` for a class before using it in a content fragment.
- `rm -rf .next` before any verifying build when only `content/*.html` changed. The dev server (`next dev`) does *not* hot-reload `app/layout.tsx` reliably — verify with `npm run build && npm run start` against the production build, not against `dev`.
- Verify rendered layout with screenshots, not DOM-only checks.
- Static HTML fragments in `content/sections/*.html` + `content/chrome/*.html` injected via `lib/content.ts`. Source of truth for copy.
- PA detail pages + hub grid render from `lib/practice-areas.ts` via `lib/render-practice-area.ts` (server-side, build time). **`practiceAreaJsonLd` now emits FAQPage + BreadcrumbList + Service.** Edit this file if you want to add or change per-PA schema; `area.cardSummary` becomes the Service description.
- Fonts: IBM Plex Sans self-hosted (`@font-face` in `preview-styles.css`, woff2 in `public/fonts/`). No Google Fonts. No `<link rel=preload>` for fonts.
- Third-party scripts in `app/layout.tsx`: `consent-mode-default` beforeInteractive (compliance, now 7 GCM categories denied), CookieYes afterInteractive, GA afterInteractive, cal.com lazyOnload. Do not move CookieYes back to beforeInteractive — that was the mobile-perf regression cause.
- Only the production custom domain `astonslaw.com` gives a representative PageSpeed/Lighthouse number. `localhost` is too fast; raw `*.vercel.app` is cold/uncached.

## 9. Git + working tree state

- **`main` `285245c`** is production, clean, main-only.
- Untracked, pre-existing, deliberately left alone (carry-forward from the previous handoff): `.gitignore` modification (background macOS noise, adds `.gstack/`), `.mcp.json.disabled`, settings backup, three locked-hero PNGs in `.project/cro-deep-audit-2026-05-21/`, `.project/preview/`, `.project/research/`, `.claude/scheduled_tasks.lock`, `.claude/settings.local.json.bak.2026-05-14-cleanup`. Decide with the user — do not blanket `git add -A`.

## 10. Verified anchors for next session

- **llms.txt URL:** `https://astonslaw.com/llms.txt` (new this session; HTTP 200, 3254 bytes).
- BSB direct profile URL (still T2.1 reference for Branch 4): `https://www.barstandardsboard.org.uk/barristers-register/0A9C84A0E6BE3846C117FA4B4290EAD2.html` — 32-char content hash, quarterly re-check.
- Practitioner verified facts: name, jobTitle "Barrister", Date of Call Mar 2018, Inner Temple, full rights of audience, public access, conduct of litigation, Crime + Other practice areas, no disciplinary findings. All BSB-published.
- Locked address: 85 Great Portland Street, First Floor, London W1W 7LT (serviced chambers, not residence).
- Phone: 07922 247 999 (also `tel:+447922247999`).
- WhatsApp: `https://wa.me/447922247999` with `?text=I need legal support for...` (URL-encode in consumers).
- cal.com: `https://cal.com/astonslaw/callback?overlayCalendar=true` — embed layout now `column_view`.
- Org `sameAs`: Google profile (`https://share.google/UUmxWclpCyvczjSSS`), LinkedIn company page (`https://www.linkedin.com/company/astons-law-chambers/`), Trustpilot review URL (`https://uk.trustpilot.com/review/astonslaw.com`). Person `sameAs` currently empty (Branch 4 adds the BSB URL).
- Per-PA Service node @ids: `https://astonslaw.com/practice-areas/<slug>#service`. provider → `#organization` only. Do not add `#principal` references to Service nodes.
