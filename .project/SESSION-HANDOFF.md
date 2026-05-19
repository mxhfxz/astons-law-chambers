# Session Handoff — 2026-05-19 (SEO audit + homepage CRO restructure — COMPLETE, live)

Read this FIRST, after `MEMORY.md` and `.project/_START_HERE.md`. It supersedes
every earlier handoff (they remain in git history).

---

## ⚠️ APEX RULE — SKILLS FIRST, NEVER CLAUDE DEFAULTS

**Non-negotiable. This overrides every default behaviour.**

Every task on this project — answering, exploring, frontend/CSS, copy, git,
deploys, accessibility, debugging, verification — routes through the relevant
installed **skill FIRST**, before any action including clarifying questions.
Claude default behaviour is **never** to be used here.

- It is enforced by a `UserPromptSubmit` hook that re-injects the rule on every
  prompt, and written in `CLAUDE.md` and `memory/feedback_no_claude_defaults_use_skills.md`.
- Red-flag thoughts that mean STOP and pick the skill: "I'll just do this
  directly", "this is simple enough", "I'll skip the skill this once", "I
  already know how to do this".
- Routing: debugging → `systematic-debugging`; verifying/claiming done →
  `verification-before-completion`; frontend → `frontend-design` +
  `frontend-dev-guidelines`; clean code → `clean-code`; accessibility →
  `fixing-accessibility`/`a11y-audit`/`wcag-audit-patterns`; git/deploys → git
  skills + `vercel-deployment`; planning → `project-mgmt`; SEO → `seo-audit`;
  CRO → `page-cro`; copy → `copywriting` + `avoid-ai-writing`; schema →
  `schema-markup`. No single fit → invoke one to scaffold the decision and
  route it back to the user. Improvising defaults has repeatedly produced work
  the user then had to catch and correct.

Other standing rules (do not regress):
- **No broken sites to `main`** — nothing reaches `main` without build +
  type-check + a real-browser check. `main` is live production.
- **Documents are input for evaluation, not implementation specs** — never
  build from a pasted doc unless the user explicitly says to.
- **No Claude-default copy** — barrister voice only (see §6).

---

## 1. Production state

**Production HEAD:** `main` at `b7e5f12` (2026-05-19). Live on `astonslaw.com`
via Vercel auto-deploy. Build verified clean (23/23 static pages), type-check
clean, browser-checked desktop + mobile, no console errors.

The whole session's work is **complete, merged, and live**. Nothing is
half-finished in code. The only open items are client-side (see §3).

## 2. What this session shipped

Worked across two days (2026-05-18 → 2026-05-19). Eight units of work, each
verified and merged to `main`:

| Commit | Scope |
|--------|-------|
| `6fb9976` | **SEO audit fix** — 9 findings: `og:url` no longer hardcoded to homepage; `/practice-areas` H1 keyword; "Defence work" header item is now a real link to the hub + hub links in mega/mobile menus; `/direct-access` linked from the homepage; `lang="en-GB"`; sitemap `lastmod` tracks file mtimes; hero `<img>` width/height; `geo`+`image` in JSON-LD; false `<noscript>` removed |
| `bcb2bfb` | **Mega menu repair + banner pin** — fixed a regression (3 Tailwind classes that don't exist in the precompiled CSS — see §5); police banner moved off `position:fixed` |
| `4aad5af` | Hero background `bg-navy-950` → `bg-footer` (#232536) — softer step into the red |
| `a05b1ab` | **Homepage CRO restructure** — police banner pinned into the sticky header as a 2nd row; red emergency band replaced with a grey police-station card (red CTA); new "What to do now" 3-card situation section; old "Before you call" card folded in |
| `9eceefb` | Hero CTA widened (384px, `max-w-sm`); header `border-b` removed (stray line under the red banner); police card made full-width, 2-column |
| `6c9519c` | "24/7 police station support" moved out of the hero CTA into a ghost button below it |
| `0335722` | **Mobile menu** — hamburger morphs to an X (CSS, `prefers-reduced-motion` guarded); open menu fills the screen; page scroll locks behind it |
| `b7e5f12` | Hero "24/7" ghost button now initiates a call (`tel:`); `description` added to the LegalService JSON-LD |

## 3. PENDING — client actions (NOT code)

1. **Two PDF guides — Ghulam's green light to publish.** The situation section
   (`content/sections/home.html`) has commented-out RESOURCE SLOTs in card 1
   (Arrested) and card 2 (Police interview). When cleared:
   - move the two PDFs from repo root into `public/resources/`
     (`first-24-hours-after-arrest.pdf`,
     `voluntary-police-interview-under-caution.pdf`)
   - uncomment the resource `<a>` in each card.
   - **Tell Ghulam:** each PDF should end with the phone number and "the first
     call is free" so the guide itself converts, not just informs.
2. **Instructional copy sign-off.** The police card + 3 situation cards carry
   legal-adjacent guidance ("right to stay silent", "voluntary interview is
   under caution", etc.). It is conservative and reuses vetted site wording,
   but a regulated barrister's site should have Ghulam confirm it.
3. **Carried from the prior handoff (still open):** privacy-policy firm-specific
   blanks (data controller name, ICO number, retention periods, DPO); the
   CookieYes dashboard "Google Consent Mode" toggle.

## 4. Open / non-code (no action by decision)

- Backlink profile is near-empty — biggest cause of weak rankings. Free options
  only. Client owns.
- The two arrest PDFs sit untracked in the repo root with the other untracked
  files (see §7).

## 5. Architecture notes & gotchas — READ BEFORE TOUCHING CSS

- **The precompiled-CSS trap (caused a live breakage this session).**
  `app/preview-tailwind.css` is a **precompiled static stylesheet**.
  `tailwind.config.ts` only scans `app/` and `components/` — **never**
  `content/*.html`. A Tailwind class added to a `content/*.html` fragment that
  is not already present in `preview-tailwind.css` has **no rule** and silently
  breaks layout (the build still passes). **Always grep
  `app/preview-tailwind.css` for a class before using it in a content
  fragment.** `app/preview-styles.css` is the separate hand-written CSS and is
  editable. Full detail: `memory/project_preview_tailwind_precompiled.md`.
- **Verify rendered layout with screenshots, not just DOM checks.** A headless
  DOM/behaviour check passed while the mega menu was visibly broken. Always
  screenshot.
- **`playwright_navigate` does not resize an existing viewport.** To truly
  switch desktop↔mobile, close the browser and reopen at the new width.
- **Content-file edits don't bust the Next build cache.** `rm -rf .next`
  before any verifying build when only `content/*.html` changed.
- The site renders from static HTML fragments in `content/sections/*.html` and
  `content/chrome/*.html`, injected via `lib/content.ts`. That is the source of
  truth for copy and links.
- The police banner is now the 2nd row of the sticky `<header>` (in
  `content/chrome/header.html`), not a separate component. `police-banner.html`
  and the `PoliceBanner` export were deleted.
- `lib/site.ts` / `lib/contact.ts` are orphaned stubs — only `site.url` is used
  (by `app/robots.ts`). Not a source of truth.
- Two homepage practice grids stay in sync: the homepage grid is hardcoded in
  `content/sections/home.html`; the `/practice-areas` hub grid is generated by
  `renderPracticeAreaIndex()` in `lib/render-practice-area.ts`.

## 6. Copy rules (barrister voice — not SaaS)

Project memory overrides the generic `copywriting` skill. No marketing speak,
no rhetorical questions, no triadic/aphoristic flourishes, **no em-dash
maximalism**, entity-first ("Astons Law Chambers", minimise "Ghulam"). Short
declarative sentences. When writing copy, also invoke `avoid-ai-writing`. Reuse
wording already vetted on the live site rather than inventing claims; flag any
new operational/legal claim with 🚩 and never fabricate it.

## 7. Git state

- **`main` `b7e5f12`** is production and is clean.
- Working tree has pre-existing **untracked** files that are NOT part of any
  shipped work and were deliberately left alone: the 2 arrest PDFs, the
  `.project/preview/` and `.project/research/` dirs, `.mcp.json.disabled`, a
  settings backup, and a modified `.gitignore`. Decide what to do with these
  with the user — do not blanket `git add -A`.
- Session feature branches, all merged to `main`, safe to delete:
  `fix/seo-audit-2026-05-18`, `fix/homepage-cro-2026-05-19`,
  `fix/mobile-menu-2026-05-19`, `fix/hero-call-schema-2026-05-19`
  (and the older `fix/audit-sweep-2026-05-17`).
- Process note: a couple of small changes this session were committed straight
  to `main` (already on `main` from a prior merge) rather than branch→merge.
  Verified before push, so production stayed clean — but follow branch→verify→
  merge as the norm.

## 8. Spec files written this session

- `.project/seo-audit-2026-05-18/spec.md`
- `.project/homepage-cro-2026-05-19/spec.md`
- `.project/mobile-menu-2026-05-19/spec.md`

## 9. What to do next

Session start: read `MEMORY.md`, `.project/_START_HERE.md`, then this file.
Confirm the apex rule (§0) and the precompiled-CSS trap (§5). Then **ask the
user what the next task is** — do not pick one and start.

Likely next threads: chasing the client actions in §3 (PDFs, copy sign-off,
privacy policy); cleaning up the untracked files in §7; or new work the user
brings.
