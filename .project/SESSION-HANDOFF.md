# Session Handoff — 2026-05-22 (Branch 4 — T2.1 Person sameAs + T2.2 three list-form adds)

Read this FIRST, after `MEMORY.md` and `.project/_START_HERE.md`. **Supersedes the 2026-05-21 Branch-3 handoff** (still in git history at `fa4d6d4`).

---

## ⚠️ APEX RULE — SKILLS FIRST, NEVER CLAUDE DEFAULTS

Non-negotiable. Every task — answering, exploring, frontend/CSS, copy, git, deploys, debugging, verification — routes through the relevant installed **skill FIRST**, before any action including clarifying questions. Enforced by a `UserPromptSubmit` hook.

Routing:
- Debugging → `systematic-debugging`
- Verifying → `verification-before-completion`
- Frontend → `frontend-design` + `frontend-dev-guidelines`
- Accessibility → `fixing-accessibility` / `a11y-audit` / `wcag-audit-patterns`
- Git / deploys → git skills + `vercel-deployment`, worktree work → `using-git-worktrees`
- Config / settings.json / hooks → `update-config`
- Planning → `project-mgmt`
- SEO / schema → `seo-audit` (+ `seo-technical`, `schema-markup`, `seo-meta-optimizer`, `seo-geo`)
- Copy → `copywriting` + `avoid-ai-writing`
- BSB / regulatory → `legal-advisor`

Standing rules: **nothing reaches `main` without build + type-check + a real-browser check**; documents are input for evaluation, not build specs; barrister voice only.

---

## 1. Production state

**Production HEAD:** `main` is live on `astonslaw.com` via Vercel auto-deploy. Branch 4 shipped as `d242efa` (this handoff commit sits on top of it). The latest Vercel production deployment (`dpl_8vDxA73ecBX38imieGzH2QhSWZCN`, commit `d242efa`) is `state: READY`, `target: production`.

Live verification 2026-05-22 against `https://astonslaw.com`:
- **T2.1** — homepage JSON-LD parsed clean (1 `@graph` block, types `LegalService`, `LocalBusiness`, `Person`, `WebSite`). `Person.sameAs = ["https://www.barstandardsboard.org.uk/barristers-register/0A9C84A0E6BE3846C117FA4B4290EAD2.html"]` — BSB Register URL only, matching the locked safety-baseline Person allowlist. The BSB URL itself resolves `HTTP 200`.
- **T2.2** — `/fees` carries "What to bring to a first conference"; `/direct-access` carries the "Instructing directly, or through a solicitor" comparison; `/practice-areas/[slug]` carries the "What is …" definition + situation as the page lead.

Pre-ship verification (in isolated worktree, on the rebased branch): build 28/28 static pages, type-check 0, contrast audit 0 failures / 397 elements, em-dash check on the added copy clean (only code comments + auto-replaced template placeholders carry em dashes), real-browser screenshots of all three changed page types.

**On the Google Rich Results Test (deferred gate from the prior handoff):** done as a live structured-data validation — the deployed JSON-LD is syntactically valid and the `Person.sameAs` is correct. Note for whoever wants the literal Google tool: `Person` is **not** a rich-result-eligible type, so `search.google.com/test/rich-results` will report "no rich results detected" for the Person node (expected, not a failure); it will show eligibility for the page's other types. `sameAs` feeds the Knowledge Graph, not rich results. The right manual tool for Person syntax is `validator.schema.org`. That manual check, if wanted, is the only outstanding verification item and is non-blocking.

## 2. What this session shipped

| Commit | Scope |
|---|---|
| `24752e3` | **T2.1 — Person `sameAs` → BSB direct profile URL only.** `app/layout.tsx` `#principal.sameAs` gets exactly one entry (the 32-char-hash BSB profile URL). Hash-stability comment added inline. |
| `d242efa` | **T2.2 — three list-form AEO adds.** (a) `/direct-access` 5-row "Instructing directly, or through a solicitor" comparison; (b) `/fees` 7-item "What to bring to a first conference" checklist (the PA-detail "Before you call" aside left in place, added not replaced); (c) each PA detail page gets a required `definition` field rendered as the "What is …" lead above the situation paragraph. Files: `content/sections/direct-access.html`, `content/sections/fees.html`, `content/sections/pa-detail.html`, `lib/practice-areas.ts`, `lib/render-practice-area.ts`. |

Ghulam's legal-accuracy sign-off on the literal wording was obtained in the prior session ("ship now"). The `[PENDING GHULAM SIGN-OFF]` tag still in the `d242efa` commit message is a stale leftover — sign-off is complete; the tag was not worth a history rewrite of approved, tested commits.

### How it shipped (git mechanics — read before the next ship)

- Branch 4 was held unshipped on `fix/cro-tier2-person-sameas-listicles-2026-05-21` while the insights CMS work (Thread B, §3) sat as uncommitted WIP in the main working dir.
- Shipped via an **isolated git worktree** (`/tmp/alc-cro-tier2-ship`, entered with `EnterWorktree`) so the insights WIP in the main working dir was never touched.
- The 2 commits were **rebased onto `origin/main`** (which had advanced to `90342dd` "Create .pages.yml (via Pages CMS)") — clean, no conflicts (no file overlap). Then pushed `HEAD:main` as a fast-forward. Local `main` reconciled to `origin/main`.
- The `fix/cro-tier2-…` branch was deleted after the ship (its commits are in `main`).

**⚠️ NEW STANDING GOTCHA — Pages CMS writes to `origin/main` directly.** A Pages CMS is connected to this repo and commits straight to `origin/main` (`.pages.yml` was the first such commit). `main` therefore moves outside your local pushes. **Always `git fetch` and reconcile/rebase onto `origin/main` immediately before any push.** This session's rebase onto `90342dd` is the proof case.

## 3. Thread B — insights CMS (IN PROGRESS, NOT shipped)

A parallel feature, the **insights CMS**, is in progress on branch `feat/insights-cms-2026-05-22` (main working dir). As of this handoff it is **uncommitted WIP**, deliberately left untouched by the Branch-4 ship:

- Modified: `package.json`, `package-lock.json` (deps), `styles/globals.css`, `.project/security-notes.md`, `.gitignore`.
- Untracked: `styles/prose.css`, `lib/insights.ts`, `lib/render-insight.ts`, `app/insights/`, `content/insights/`, `.project/insights-cms-2026-05-22/`, `.project/preview/`, `.project/research/`.

The `feat/insights-cms-2026-05-22` branch tip is still at the old `fa4d6d4`; it has **not** picked up `90342dd` (.pages.yml) or Branch 4 (`d242efa`). When that thread resumes it should rebase/merge `origin/main` to get current. This thread was not authored or inspected in the Branch-4 session — pick up intent/scope from the user.

## 4. The cadence

User wants one branch per session, with a hard session boundary (`/clear`) between branches to avoid context drift. **Always** end each session with a detailed handoff (this file) + an updated pickup prompt (§7 below).

Order in `.project/cro-deep-audit-2026-05-21/safety-aware-implementation-plan.md` (the canonical doc):

- **Branch 1 — `safety-baseline-2026-05-21`** ✅ shipped `f1f433d`.
- **Branch 2 — `cro-tier1-content-schema-2026-05-21`** ✅ shipped `285245c`.
- **Branch 3 — `cro-tier1-copy-2026-05-21`** ✅ shipped `1a3b3fc`.
- **Branch 4 — `cro-tier2-person-sameas-listicles-2026-05-21`** ✅ shipped `24752e3` + `d242efa` (this session).
- **Branch 5 — `cro-tier3-decisions-2026-05-21`** — **NEXT.** T3.1 (24/7 wording site-wide), T3.2 (CookieYes layout), T3.3 (call-attribution), T3.4 (loss-frame line), T3.5 (Google-Extended decision — likely no-op). Five client decisions; ship each item only once its decision is in.

Tier 4.2 quarterly safety re-sweep is calendar, not branch (next due per the safety baseline schedule).

The insights CMS (Thread B, §3) is a separate workstream that interleaves with this branch cadence.

## 5. Client decisions needed before Branch 5

Branch 5 ships item-by-item; each item is gated on its own client decision.

1. **F29 24/7 wording (T3.1).** Recommended scope-narrowed lock: *"Available 24/7 for police station support. Other calls answered during working hours; voicemail and WhatsApp returned within business hours."* Applies site-wide (the sticky bar + every hero/banner that currently says "Available 24/7 for police station support").
2. **CookieYes layout (T3.2).** Recommended (a) bar at bottom.
3. **Call-attribution (T3.3).** (a) 10-sec post-call sheet + Measurement Protocol upload, or (b) status quo. Bandwidth decision.
4. **Loss-frame homepage line (T3.4).** *"Most criminal cases are decided by what happens in the first call and the first hearing — not the trial."* — needs verification of the literal wording (🚩 imported-claim rule: confirm with Ghulam before it goes in copy).
5. **Google-Extended in `robots.ts` (T3.5).** Recommended: keep blocked (safety wins over small AEO upside) — likely a no-op confirmation.

## 6. Standing client items from earlier sessions (recorded, not blocking)

- **cal.com "Future bookings limit" dashboard setting** — confirm narrow (≤30 days, the default) per the locked safety baseline. Dashboard check, not code.
- **BSB profile URL stability** — now pinned into `Person.sameAs` (T2.1) AND on `/about` + `/authorised-to-conduct-litigation`. 32-char content hash; a BSB re-index could rotate it. Quarterly re-check is in the T4.2 calendar. If the URL 404s, grep for `0A9C84A0E6BE3846C117FA4B4290EAD2` across `app/` + `content/` and replace all occurrences with the register-search URL.

## 7. Pickup prompt for the next session (Branch 5)

Use this verbatim to start the next session. It is self-contained.

```
Astons Law Chambers — Branch 5 of the safety-aware implementation plan
(CRO Tier-3 client decisions). NOTE: there is also a parallel
insights-CMS thread in progress (feat/insights-cms-2026-05-22, uncommitted
WIP) — confirm with the user which to advance before acting.

Production is live on main after Branch 4 (T2.1 Person sameAs → BSB URL
only + T2.2 three list-form adds), shipped 2026-05-22 at d242efa, deploy
verified READY. This session ships Branch 5 of
.project/cro-deep-audit-2026-05-21/safety-aware-implementation-plan.md:
T3.1 (24/7 wording site-wide), T3.2 (CookieYes layout), T3.3
(call-attribution), T3.4 (loss-frame homepage line), T3.5 (Google-Extended
in robots.ts — likely no-op). Each item ships only once its client decision
is in (see §5 of SESSION-HANDOFF.md).

Standing rules apply: HARD RULE — skills first, no Claude defaults; APEX —
Penpot existing pages off-limits; no broken sites to main (build +
type-check + real-browser pass before any push); practitioner-safety
threat model + ten locked safety exclusions per
.claude/projects/.../memory/project_safety_baseline_2026_05_21.md.

⚠️ GIT — Pages CMS writes to origin/main directly (.pages.yml). main moves
outside local pushes. ALWAYS git fetch + rebase onto origin/main
immediately before any push. Verify with git fetch + git status first.

Read first, in order:
 1. MEMORY.md (auto-loaded; respect every feedback rule, especially
    project_safety_baseline_2026_05_21.md)
 2. .project/SESSION-HANDOFF.md (this file; §1 production state, §3
    insights-CMS thread state, §5 the five Branch-5 client decisions,
    §10 the open site-wide border-l-2 CSS caveat)
 3. .project/cro-deep-audit-2026-05-21/safety-aware-implementation-
    plan.md — T3.1–T3.5 sections
 4. .project/cro-deep-audit-2026-05-21/findings.md — audit context

Before building each T3 item, confirm its client decision is in (§5).
Skills-first: copywriting + avoid-ai-writing for T3.1/T3.4 copy;
legal-advisor for any operational-claim wording (24/7, loss-frame line —
imported-claim rule, confirm literal wording with Ghulam); update-config
for robots.ts / settings; verification-before-completion for every
"passes" claim.

Build + type-check + real-browser screenshots (375×667 mobile + 1440
desktop) on every page touched, before commit.

To ship: one commit per logical T3 item (or bundle tightly-scoped ones),
git fetch + rebase onto origin/main, push main, poll astonslaw.com until
live, then supersede SESSION-HANDOFF.md with the next pickup prompt.

Not this branch's scope:
 · The §10 site-wide CSS fix-up (border-l-2 / border-navy-950) — separate,
   non-blocking. Recommended fix is Option 4 (see §10).
 · The insights CMS thread (§3) unless the user chooses to advance it.
```

## 8. Architecture notes & gotchas — READ BEFORE TOUCHING CODE

(Carried forward; the Pages-CMS gotcha in §2 is new this session.)

- **Pages CMS writes to `origin/main` directly** — see §2. Fetch + reconcile before every push.
- **`cal.com` config has TWO load-bearing locations.** The `ui` callback in `app/layout.tsx` sets the *namespace default*. The `inline` mount in `components/site/SiteBehaviour.tsx` carries an explicit `config: { layout, ... }` that **overrides the `ui` default**. Change one, change the other.
- **The precompiled-CSS trap.** `app/preview-tailwind.css` is a precompiled static stylesheet; `tailwind.config.ts` scans only `app/` + `components/`, never `content/*.html`. A Tailwind class used in a `content/*.html` fragment that is not already in the compiled bundle has no rule and silently breaks layout (build still passes). Grep the live `_next/static/css/*.css` bundle, not just `preview-tailwind.css`. See §10 for the live instance of this.
- `rm -rf .next` before any verifying build when only `content/*.html` changed.
- Verify rendered layout with real-browser screenshots, not DOM-only checks. Playwright's `playwright_screenshot` `width`/`height` are the screenshot canvas, not the viewport — set viewport in `playwright_navigate`.
- Static HTML fragments in `content/sections/*.html` + `content/chrome/*.html` injected via `lib/content.ts`. Source of truth for copy.
- PA detail pages + hub grid render from `lib/practice-areas.ts` via `lib/render-practice-area.ts`. `PracticeArea.definition` and `.situation` are **required `string` fields** (T2.2) — all 7 PAs (criminal-defence, violent-crimes, youth-crimes, driving-offences, drug-offences, appeals, inquests) carry them; the `data-bind="definition">—<` / `data-bind="situation">—<` placeholders in `pa-detail.html` are auto-replaced at render and never show a bare em-dash. `practiceAreaJsonLd` emits FAQPage + BreadcrumbList + Service.
- Fonts: IBM Plex Sans self-hosted. No Google Fonts. No `<link rel=preload>` for fonts.
- Third-party scripts in `app/layout.tsx`: `consent-mode-default` beforeInteractive (7 GCM categories denied), CookieYes afterInteractive, GA afterInteractive, cal.com lazyOnload. Do not move CookieYes back to beforeInteractive.
- Only the production custom domain `astonslaw.com` gives a representative PageSpeed/Lighthouse number.

## 9. Git + working tree state

- **`main`** is production (this handoff commit, on top of Branch 4 `d242efa`), pushed to `origin/main`, deploy READY.
- **`feat/insights-cms-2026-05-22`** (main working dir) holds the Thread B insights-CMS uncommitted WIP at base `fa4d6d4` — see §3. Untouched by the Branch-4 ship.
- `fix/cro-tier2-person-sameas-listicles-2026-05-21` was deleted after the ship (commits are in `main`).
- The `/tmp/alc-cro-tier2-ship` worktree was removed at session end.
- Untracked, pre-existing, deliberately left alone: settings backup (`.claude/settings.local.json.bak.2026-05-14-cleanup`), `.mcp.json.disabled`, locked-hero / audit PNGs in `.project/cro-deep-audit-2026-05-21/`. Decide with the user whether to add the audit screenshots to `.gitignore`.

## 10. Open caveat (carried forward) — site-wide silent missing border

The blockquote pattern on `/legal-aid`, `/authorised-to-conduct-litigation`, and the `/fees` callout uses Tailwind classes `border-l-2` and `border-navy-950`. **Neither is present in the live `_next/static/css/*.css` bundle**, because `tailwind.config.ts` scans only `app/**` + `components/**`, and both classes appear only in `content/*.html`. Result: the intended left navy bar is silently invisible in production (the `bg-offwhite` panel still renders, so it still reads as a callout). Pre-existing, not introduced by any recent branch.

Fix options (any future session, not blocking):
1. Add `border-l-2` + `border-navy-950` to a Tailwind safelist in `tailwind.config.ts`.
2. Add a sentinel reference in any `app/` or `components/` file (e.g. `// safelist: border-l-2 border-navy-950`).
3. Switch the callouts to classes that are in the live bundle.
4. **Recommended** — add the rule directly to `styles/globals.css`: a one-line `.border-l-2 { border-left-width: 2px } .border-navy-950 { border-left-color: var(--color-navy-950) }` pair. Explicit, surgical, doesn't widen Tailwind's content scan.

## 11. Verified anchors for next session

- **`/fees` (T2.2):** "What to bring to a first conference" (7-item checklist). Earlier anchors still hold: "That call is where suitability is decided", "Summarised at the top of this page", `id="legal-aid"` on the bottom `<h2>`.
- **`/direct-access` (T2.2):** "Instructing directly, or through a solicitor" comparison (5 rows, inline-label so it reads identically mobile + desktop).
- **`/practice-areas/[slug]` (T2.2):** "What is [practice area]" definition is the page lead (e.g. criminal-defence: "Criminal defence is the representation of someone accused of a crime…").
- llms.txt URL: `https://astonslaw.com/llms.txt`.
- **Person `sameAs` (T2.1, now LIVE):** `https://www.barstandardsboard.org.uk/barristers-register/0A9C84A0E6BE3846C117FA4B4290EAD2.html` — single entry, BSB Register only. 32-char content hash, quarterly re-check (see §6). Also on `/about` + `/authorised-to-conduct-litigation`.
- Practitioner verified facts: name "Ghulam Humayun", jobTitle "Barrister", Date of Call Mar 2018, Inner Temple, full rights of audience, public access, conduct of litigation, Crime + Other practice areas, no disciplinary findings. All BSB-published.
- Locked address: 85 Great Portland Street, First Floor, London W1W 7LT.
- Phone: 07922 247 999 (also `tel:+447922247999`).
- WhatsApp: `https://wa.me/447922247999` with `?text=I need legal support for...`.
- cal.com: `https://cal.com/astonslaw/callback?overlayCalendar=true`, layout `column_view`.
- Org `sameAs`: Google profile, LinkedIn company page, Trustpilot review URL.
