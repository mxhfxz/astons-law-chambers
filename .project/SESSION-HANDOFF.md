# Session Handoff — 2026-05-21 (Branch 3 — T1.5 legal-aid callout)

Read this FIRST, after `MEMORY.md` and `.project/_START_HERE.md`. **Supersedes the previous 2026-05-21 Branch-2 handoff** (still in git history at `108b694`).

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

**Production HEAD:** `main` at `1a3b3fc` — live on `astonslaw.com` via Vercel auto-deploy. Build clean (28/28 static pages), type-check clean. Live verification at 22:28 BST 2026-05-21 via two curl probes of `https://astonslaw.com/fees`:

- "That call is where suitability is decided" — present in HTML body (line 240 of the rendered doc) + once more in the Next.js RSC hydration payload. Normal single visible render.
- "Summarised at the top of this page" — pointer paragraph at the bottom-of-page collapsed section, same render pattern.

Git is main-only — `fix/cro-tier1-copy-2026-05-21` was fast-forwarded into main and deleted.

## 2. What this session shipped

| Commit | Scope |
|---|---|
| `1a3b3fc` | **Branch 3 — T1.5/F26 legal-aid callout on `/fees`.** Single-file change in `content/sections/fees.html` (+17 / -4). |

What the commit does:

- **Callout above the fee table.** Insert a `bg-offwhite` blockquote between the page intro and the column grid in `content/sections/fees.html` (immediately above the `<h2>Indicative fee ranges</h2>` H2 on desktop; immediately above the table on mobile where the aside collapses). Two-line max, sized to `max-w-prose`.
- **Wording mirrors live `/legal-aid`.** Ghulam approved using the existing `/legal-aid` blockquote sentence verbatim rather than F26's literal text — keeps the visitor's read consistent across the two pages. Exact body: *"Astons Law Chambers is not a legal aid contract holder. Where legal aid applies, the case is referred to a partner solicitor firm at no cost. The first call is free either way. That call is where suitability is decided."*
- **Bottom-of-page section collapsed to a pointer per the DoD.** Old paragraph + `/legal-aid` link replaced with: *"Summarised at the top of this page. The detailed explainer is on the legal aid page."* The `<h2>` keeps a new `id="legal-aid"` so any inbound deep link (e.g. `/fees#legal-aid`) still lands somewhere semantic.
- **Visual reuse of established pattern.** Same `border-l-2 border-navy-950 bg-offwhite pl-5 pr-4 py-4 max-w-prose` classes as the `/legal-aid` and `/authorised-to-conduct-litigation` blockquotes. See §10 caveat about the silently-missing left border — it's a site-wide pre-existing issue, not introduced here.

## 3. Open files and the canonical doc

**The canonical doc remains** `.project/cro-deep-audit-2026-05-21/safety-aware-implementation-plan.md`.

- Branch 1 (T4.1, anti-tracker baseline) ✅ shipped `f1f433d`.
- Branch 2 (T1.1/T1.2/T1.3/T1.4/T1.6) ✅ shipped `285245c`.
- Branch 3 (T1.5) ✅ shipped `1a3b3fc` (this session).
- Branches 4–5 remain.

The **ten locked safety exclusions** ([project_safety_baseline_2026_05_21.md](.claude/projects/-Users-mahfuzpholby-Documents-Agency-Work-astons-law-chambers/memory/project_safety_baseline_2026_05_21.md)) continue to apply. T1.5 is copy-only, BSB-safe, zero person exposure.

## 4. The cadence

User wants one branch per session, with a hard session boundary (`/clear`) between branches to avoid context drift. **Always** end each session with a detailed handoff (this file) + an updated pickup prompt (§7 below).

Order in `safety-aware-implementation-plan.md`:

- **Branch 1 — `safety-baseline-2026-05-21`** ✅ shipped as `f1f433d`.
- **Branch 2 — `cro-tier1-content-schema-2026-05-21`** ✅ shipped as `285245c`.
- **Branch 3 — `cro-tier1-copy-2026-05-21`** ✅ shipped as `1a3b3fc` (this session).
- **Branch 4 — `cro-tier2-person-sameas-listicles-2026-05-21`** — **NEXT.** T2.1 (Person `sameAs` → BSB direct profile URL only) + T2.2 (three list-form content adds). Needs Ghulam list-content review.
- **Branch 5 — `cro-tier3-decisions-2026-05-21`** — T3.1 (24/7 wording site-wide), T3.2 (CookieYes layout), T3.3 (call-attribution), T3.4 (loss-frame line), T3.5 (Google-Extended decision — likely no-op). Five client decisions; ship when each is in.

Tier 4.2 quarterly sweep is calendar, not branch.

## 5. Standing client 🚩 needed before Branches 4–5

1. **List-form content adds (Branch 4).** Drafts go to Ghulam for legal-accuracy review:
   - `/direct-access`: 5-item comparison "When to instruct a barrister directly vs through a solicitor".
   - `/fees` or `/practice-areas/criminal-defence`: 5–7 item "What to bring to a first conference" list.
   - Each PA detail page: a single-paragraph "What is [practice area]" definition above the situation paragraph.
2. **F29 24/7 wording (Branch 5).** Recommended scope-narrowed lock: *"Available 24/7 for police station support. Other calls answered during working hours; voicemail and WhatsApp returned within business hours."*
3. **CookieYes layout (Branch 5).** Recommended (a) bar at bottom.
4. **Call-attribution (Branch 5).** (a) 10-sec post-call sheet + Measurement Protocol upload, or (b) status quo. Bandwidth decision.
5. **Loss-frame homepage line (Branch 5).** *"Most criminal cases are decided by what happens in the first call and the first hearing — not the trial."* — needs verification of the literal wording.
6. **Google-Extended in `robots.ts` (Branch 5).** Recommended: keep blocked (safety wins over small AEO upside).

## 6. Standing client 🚩 from earlier sessions (recorded but not blocking)

- **cal.com "Future bookings limit" dashboard setting** — confirm narrow (≤30 days, the default) per the locked safety baseline. Dashboard check, not code.
- **BSB profile URL stability** — 32-char content hash; quarterly re-check is in the safety baseline T4.2 calendar. Branch 4's T2.1 will pin this URL into Person `sameAs`.

## 7. Pickup prompt for the next session (Branch 4)

Use this verbatim to start the next session. It's self-contained and lets a fresh context window pick up the exact next move.

```
Astons Law Chambers — Branch 4 of the safety-aware implementation plan.

Production is live on main at 1a3b3fc after Branch 3 (T1.5 legal-aid
callout above the /fees fee table). This session ships Branch 4 of
.project/cro-deep-audit-2026-05-21/safety-aware-implementation-plan.md:
T2.1 (Person sameAs → BSB direct profile URL only) + T2.2 (three
list-form content adds across /direct-access, /fees or
/practice-areas/criminal-defence, and each PA detail page).

Standing rules apply: HARD RULE — skills first, no Claude defaults;
APEX rule — Penpot existing pages off-limits; no broken sites to main
(build + type-check + real-browser pass before any push);
practitioner-safety threat model + ten locked safety exclusions per
.claude/projects/.../memory/project_safety_baseline_2026_05_21.md.

Read first, in order:
 1. MEMORY.md (auto-loaded; respect every feedback rule, especially
    project_safety_baseline_2026_05_21.md — section "Locked safety
    exclusions" matters for what NOT to add to Person sameAs)
 2. .project/SESSION-HANDOFF.md (this file; §1, §2, §3 set context,
    §5 lists the Ghulam list-content review 🚩, §10 has the open
    site-wide CSS caveat about border-l-2)
 3. .project/cro-deep-audit-2026-05-21/safety-aware-implementation-
    plan.md — T2.1 and T2.2 sections
 4. .project/cro-deep-audit-2026-05-21/findings.md — for the audit
    context behind the three list-form adds

Work to ship this session in branch
fix/cro-tier2-person-sameas-listicles-2026-05-21 (single branch,
then merge to main, then push):

 1. T2.1 — Person `#principal.sameAs` array in app/layout.tsx gets
    exactly one entry: the direct BSB profile URL
    https://www.barstandardsboard.org.uk/barristers-register/
    0A9C84A0E6BE3846C117FA4B4290EAD2.html
    No other social/personal-profile URLs. The hash-stability comment
    pattern is already established on /about and
    /authorised-to-conduct-litigation — copy it onto the schema add.
 2. T2.2 — three list-form content blocks:
    a) /direct-access — 5-item comparison "When to instruct a
       barrister directly vs through a solicitor".
    b) /fees OR /practice-areas/criminal-defence — 5–7 item
       "What to bring to a first conference" list. (Promotes the
       existing "Before you call" aside into list form; don't replace
       the aside, ADD the list on one page.)
    c) Each PA detail page (lib/render-practice-area.ts or per-PA
       content fragment) — a single-paragraph "What is [practice
       area]" definition above the situation paragraph.

🚩 Ghulam must sign off on the literal wording of each list-form
block before merge (legal-accuracy review). Surface drafts; do not
ship until he confirms. If he isn't reachable this session, do the
prep (component changes ready on the feature branch, build +
type-check + screenshots verified) but DO NOT merge to main —
wait for sign-off.

For the work itself:
 - Skills-first: copywriting + avoid-ai-writing for the list copy;
   legal-advisor for BSB-compliance sanity-check on the comparison
   list claims; schema-markup for T2.1; verification-before-
   completion for every "passes" claim.
 - Build + type-check + real-browser check before commit.
 - Real-browser screenshots at 375×667 mobile + 1440 desktop on
   every page touched (/direct-access, the list-form host page, one
   PA detail page).
 - Verify the new Person sameAs in Rich Results Test before push.

After everything is verified AND Ghulam has signed off:
 - One commit per logical change (T2.1 separate from T2.2 is fine,
   or bundle if scope stays tight).
 - Push main.
 - Poll astonslaw.com until the changes are live.
 - Update SESSION-HANDOFF.md (supersede this file) with the next
   pickup prompt for Branch 5.

If Ghulam has not signed off:
 - Save the work locally on the feature branch; do NOT merge to main.
 - Update SESSION-HANDOFF.md describing the blocked state and what
   drafts were proposed.

Open client items already known to be NOT this branch's scope:
 · Five client-decision items (Branch 5)
 · Site-wide CSS caveat from §10 of this handoff — separate fix-up,
   not blocking Branch 4
```

## 8. Architecture notes & gotchas — READ BEFORE TOUCHING CODE

(Carried forward from prior handoffs + one new caveat from this session — see §10.)

- **`cal.com` config has TWO load-bearing locations.** The `ui` callback in `app/layout.tsx` sets the *namespace default*. The `inline` mount in `components/site/SiteBehaviour.tsx` carries an explicit `config: { layout, ... }` that runs when the visitor clicks the homepage booking facade — this **overrides the `ui` default**. If you change one, change the other.
- **The precompiled-CSS trap.** `app/preview-tailwind.css` is a precompiled static stylesheet; `tailwind.config.ts` scans only `app/` + `components/`, never `content/*.html`. A Tailwind class used in a `content/*.html` fragment that is not already in `preview-tailwind.css` (or compiled into the live bundle via `app/`/`components/` usage) has no rule and silently breaks layout (build still passes). Grep the live `_next/static/css/*.css` bundle, not just `preview-tailwind.css`, for the full picture.
- `rm -rf .next` before any verifying build when only `content/*.html` changed.
- Verify rendered layout with real-browser screenshots, not DOM-only checks. Playwright's `playwright_screenshot` `width`/`height` are for the screenshot canvas, not the viewport — set viewport in `playwright_navigate`.
- Static HTML fragments in `content/sections/*.html` + `content/chrome/*.html` injected via `lib/content.ts`. Source of truth for copy.
- PA detail pages + hub grid render from `lib/practice-areas.ts` via `lib/render-practice-area.ts`. `practiceAreaJsonLd` emits FAQPage + BreadcrumbList + Service.
- Fonts: IBM Plex Sans self-hosted. No Google Fonts. No `<link rel=preload>` for fonts.
- Third-party scripts in `app/layout.tsx`: `consent-mode-default` beforeInteractive (7 GCM categories denied), CookieYes afterInteractive, GA afterInteractive, cal.com lazyOnload. Do not move CookieYes back to beforeInteractive.
- Only the production custom domain `astonslaw.com` gives a representative PageSpeed/Lighthouse number.

## 9. Git + working tree state

- **`main` `1a3b3fc`** is production, clean, main-only.
- Untracked, pre-existing, deliberately left alone: `.gitignore` modification (background macOS noise, adds `.gstack/`), `.mcp.json.disabled`, settings backup, three locked-hero PNGs in `.project/cro-deep-audit-2026-05-21/`, `.project/preview/`, `.project/research/`, `.claude/scheduled_tasks.lock`, `.claude/settings.local.json.bak.2026-05-14-cleanup`.
- **New untracked from this session** (verification artefacts, deliberately not committed): `.project/cro-deep-audit-2026-05-21/fees-mobile-375x667-callout-and-table-2026-05-21T21-26-50-412Z.png`, `fees-desktop-1440-callout-and-table-2026-05-21T21-26-58-664Z.png`, `fees-desktop-1440-callout-and-table-v2-2026-05-21T21-27-28-957Z.png`. Decide with the user whether to add to `.gitignore` (alongside other audit screenshots) or leave as-is.

## 10. New caveat from this session — site-wide silent missing border

The blockquote pattern used by `/legal-aid`, `/authorised-to-conduct-litigation`, and now the new `/fees` callout uses Tailwind classes `border-l-2` and `border-navy-950`. **Neither class is present in the live `_next/static/css/*.css` bundle** (verified via `curl https://astonslaw.com/_next/static/css/f0a06f79cdaf20a6.css | grep`). Result: the left navy bar that's *visually intended* on all three blockquote callouts is silently invisible in production. The `bg-offwhite` background is rendered (so the panel still reads as a callout), but the border that gives it visual emphasis is missing.

Why: `tailwind.config.ts` scans only `app/**/*.{ts,tsx}` and `components/**/*.{ts,tsx}`. Both classes only appear in `content/*.html` fragments, so Tailwind JIT never generates the rules. They're also absent from the precompiled `app/preview-tailwind.css`.

This is **pre-existing**, not introduced by Branch 3 — the new `/fees` callout simply inherits the same fate. Visual parity with `/legal-aid` is intact.

Fix options (any future session, not blocking Branch 4):
1. Add `border-l-2` and `border-navy-950` to a Tailwind safelist in `tailwind.config.ts`.
2. Add a sentinel reference in any `app/` or `components/` file (e.g. a comment `// safelist: border-l-2 border-navy-950`).
3. Switch the three blockquote callouts to a class that *is* in the live bundle (e.g. `border-grey-300` plus a heavier `border-l-4`, after verifying both exist).
4. Add the rule directly to `styles/globals.css` or `app/preview-styles.css` as a one-line `.border-l-2 { border-left-width: 2px } .border-navy-950 { border-left-color: var(--color-navy-950) }` pair.

Recommend Option 4 — explicit, surgical, doesn't widen Tailwind's content scan. Option 1 if a sweep adds more `content/*.html`-only classes.

## 11. Verified anchors for next session

- **`/fees` callout sentence:** *"That call is where suitability is decided"* (single visible render + once in RSC hydration payload).
- **`/fees` pointer sentence:** *"Summarised at the top of this page"*.
- **`/fees` deep anchor (new):** `id="legal-aid"` on the bottom-of-page `<h2>`.
- llms.txt URL: `https://astonslaw.com/llms.txt`.
- BSB direct profile URL (Branch 4 T2.1 target): `https://www.barstandardsboard.org.uk/barristers-register/0A9C84A0E6BE3846C117FA4B4290EAD2.html` — 32-char content hash, quarterly re-check.
- Practitioner verified facts: name, jobTitle "Barrister", Date of Call Mar 2018, Inner Temple, full rights of audience, public access, conduct of litigation, Crime + Other practice areas, no disciplinary findings. All BSB-published.
- Locked address: 85 Great Portland Street, First Floor, London W1W 7LT.
- Phone: 07922 247 999 (also `tel:+447922247999`).
- WhatsApp: `https://wa.me/447922247999` with `?text=I need legal support for...`.
- cal.com: `https://cal.com/astonslaw/callback?overlayCalendar=true`, layout `column_view`.
- Org `sameAs`: Google profile, LinkedIn company page, Trustpilot review URL. Person `sameAs` still empty until Branch 4 T2.1.
- Per-PA Service node @ids: `https://astonslaw.com/practice-areas/<slug>#service`. `provider → #organization` only.
