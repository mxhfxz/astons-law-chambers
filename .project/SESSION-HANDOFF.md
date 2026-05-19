# Session Handoff — 2026-05-19 (SEO keyword + perf + audit session)

Read this FIRST, after `MEMORY.md` and `.project/_START_HERE.md`. It supersedes
every earlier handoff (they remain in git history).

---

## ⚠️ APEX RULE — SKILLS FIRST, NEVER CLAUDE DEFAULTS

**Non-negotiable.** Every task — answering, exploring, frontend/CSS, copy, git,
deploys, debugging, verification — routes through the relevant installed
**skill FIRST**, before any action including clarifying questions. Enforced by
a `UserPromptSubmit` hook. Routing: debugging → `systematic-debugging`;
verifying → `verification-before-completion`; frontend → `frontend-design` +
`frontend-dev-guidelines`; git/deploys → git skills + `vercel-deployment`;
planning → `project-mgmt`; SEO → `seo-audit` (+ `seo-technical`,
`schema-markup`, `seo-meta-optimizer`, `seo-geo`); copy → `copywriting` +
`avoid-ai-writing`.

Standing rules: **nothing reaches `main` without build + type-check + a real
browser check**; documents are input for evaluation, not build specs; barrister
voice only (no marketing speak / AI-isms / em-dash maximalism, entity-first).

---

## 1. Production state

**Production HEAD:** `main` at `9506e98` — live on `astonslaw.com` via Vercel
auto-deploy. Build verified clean (23/23 static pages), type-check clean,
desktop + mobile browser-checked, no console errors from site code.

Live performance after this session (Lighthouse 13, real astonslaw.com):
**mobile 98–100, desktop 99–100.**

Git is **main-only** — all feature branches were merged and deleted (local +
remote). Repo is clean.

## 2. What this session shipped (all live on `main`)

| Commit | Scope |
|--------|-------|
| `cf18816` | **SEO keyword reintegration + self-hosted fonts.** Reintroduced "criminal defence lawyer" (analytics tied ~1800% organic lift to the phrase; a prior rewrite had replaced every instance with "barrister"). Added to body copy + meta descriptions on home, criminal-defence, the practice-areas hub, about, police-station, violent/youth/drug PAs. **Title tags stayed barrister-led** (user decision). "Solicitor" only ever in referral context (fees + direct-access name a "criminal defence solicitor" partner firm). Also: self-hosted IBM Plex Sans (woff2 in `public/fonts/`, `@font-face` in `app/preview-styles.css`), removed the Google Fonts `<link>`. |
| `8db5189` | **Mobile performance fix.** Deferred third-party scripts off the critical render path: CookieYes `beforeInteractive`→`afterInteractive` (the inline consent DEFAULT stays `beforeInteractive` — that enforces compliance); cal.com `cal-init` `afterInteractive`→`lazyOnload`. GA left at `afterInteractive` to keep early conversion-click tracking. Live result: mobile ~78 → **98–100**, desktop unchanged ~100. |
| `9506e98` | docs: mobile-perf findings + keyword/perf specs. |

Specs/findings written this session:
- `.project/keyword-reintegration-2026-05-19/` (spec + findings)
- `.project/mobile-perf-2026-05-19/` (spec + findings — includes the full
  debugging record)
- `.project/seo-audit-2026-05-19/findings.md` (the deep SEO audit — see §4)

## 3. Debugging note — the "desktop dropped to 70" report

The user reported desktop PageSpeed fell 100→70 after the font change.
Investigated via `systematic-debugging` + repeated Lighthouse runs: **desktop
is 99–100, stable — no regression.** The "70" was a single noisy PageSpeed
run. The font change is performance-neutral and was kept (it also removes
Google as a third party — a GDPR positive). Full record in
`.project/mobile-perf-2026-05-19/findings.md`.

**Measurement lesson (important for next session):** localhost is too fast to
expose third-party render gating (everything scores ~96), and raw
`*.vercel.app` deployment URLs are cold/uncached (everything scores ~71).
**Only the warm production custom domain `astonslaw.com` gives a
representative PageSpeed/Lighthouse number.** Measure there, post-deploy.

## 4. PENDING — SEO audit fixes (not yet implemented)

`.project/seo-audit-2026-05-19/findings.md` is a full audit. The site is
technically sound (CWV, HTTPS, canonicals, redirects, sitemap, schema all
good). Open code fixes, all low-risk, ready to do as one branch:

- **Title tags** — `/fees`, `/contact`, `/timescales`, `/about`,
  `/practice-areas` are too short; rewrite to use the 50–60 char budget with
  keywords + location (suggested rewrites are in the findings doc).
- **`public/llms.txt`** — missing; add it for AI-crawler guidance.
- **BreadcrumbList schema** — only on practice-area pages; add to the other
  deep pages (fees, about, direct-access, police-station, complaints,
  timescales) — they have visual breadcrumbs but no JSON-LD.
- **Per-practice-area `Service` schema** — PA pages have FAQPage + Breadcrumb
  but nothing describing the practice area as a service.
- **Person `sameAs`** — the Ghulam Humayun Person node has no entity links.
- **police-station FAQPage schema** — its visible FAQ block has no schema.

**Two decisions needed from the user before some of the above:**
- Homepage `<title>` is brand-first; keyword-first usually wins more clicks.
- `aggregateRating` (review stars in SERP) — 🚩 needs the client's verified
  Trustpilot review count; project rule requires 20+ verified. Do not add
  without that number.

## 5. PENDING — client actions (not code)

1. **Two arrest PDF guides** — await Ghulam's go-ahead. On approval: move the
   2 PDFs from repo root into `public/resources/`, uncomment the RESOURCE SLOT
   `<a>` in cards 1 + 2 of `content/sections/home.html`. Ghulam should append
   the phone number + "first call is free" to each PDF. **Better still
   (SEO/AEO):** publish them as HTML articles with Article schema + dates, not
   only PDFs — far more citable.
2. **Instructional copy sign-off** — the police card + 3 situation cards carry
   legal-adjacent guidance; needs Ghulam's confirmation.
3. **Privacy-policy blanks** — data controller name, ICO number, retention
   periods, DPO.
4. **CookieYes dashboard** — enable "Google Consent Mode" toggle.
5. **SEO off-site (the real ranking ceiling):** backlink profile is
   near-empty; brand mentions (Reddit/YouTube/Wikipedia/LinkedIn) matter ~3×
   more than backlinks for AI-search visibility; confirm Google Search Console
   + Bing Webmaster Tools verified with sitemap submitted; confirm a Google
   Business Profile exists and is optimised.

## 6. Open / no action by decision

- **Hero image recompression** (~17–36 KiB) — deferred: no webp encoder on the
  dev machine (`cwebp` absent, macOS `sips` can't encode webp). `brew install
  webp` then one `cwebp` command finishes it, or the client re-exports.

## 7. Architecture notes & gotchas — READ BEFORE TOUCHING CODE

- **The precompiled-CSS trap.** `app/preview-tailwind.css` is a precompiled
  static stylesheet; `tailwind.config.ts` scans only `app/` + `components/`,
  never `content/*.html`. A Tailwind class used in a `content/*.html` fragment
  that is not already in `preview-tailwind.css` has no rule and silently
  breaks layout (build still passes). Grep `preview-tailwind.css` for a class
  before using it in a content fragment. `app/preview-styles.css` is the
  separate hand-written, editable CSS.
- `rm -rf .next` before any verifying build when only `content/*.html` changed.
- Verify rendered layout with screenshots, not DOM-only checks.
- The site renders from static HTML fragments in `content/sections/*.html` and
  `content/chrome/*.html`, injected via `lib/content.ts`. That is the source
  of truth for copy.
- Practice-area detail pages + the hub grid render from `lib/practice-areas.ts`
  via `lib/render-practice-area.ts` (server-side, build time).
- Fonts: IBM Plex Sans is self-hosted — `@font-face` in `preview-styles.css`,
  woff2 in `public/fonts/`. No Google Fonts. No font `<link rel=preload>` (it
  caused a console warning; fonts are same-origin and fast without it).
- Third-party scripts in `app/layout.tsx`: consent-mode-default
  `beforeInteractive` (compliance), CookieYes `afterInteractive`, GA
  `afterInteractive`, cal.com `lazyOnload`. Do not move CookieYes back to
  `beforeInteractive` — that was the mobile-perf regression cause.
- `lib/site.ts` / `lib/contact.ts` are orphaned stubs — only `site.url` is used
  (by `app/robots.ts`). Not a source of truth.

## 8. Git state

- **`main` `9506e98`** is production, clean, main-only (no other branches).
- Untracked, pre-existing, deliberately left alone: a modified `.gitignore`,
  `.mcp.json.disabled`, a settings backup, the 2 arrest PDFs in the repo root,
  `.project/preview/`, `.project/research/`. Decide with the user — do not
  blanket `git add -A`.
- Process: branch → build + type-check + browser-verify → merge → verify live
  on astonslaw.com.

## 9. What to do next

Session start: read `MEMORY.md`, `.project/_START_HERE.md`, then this file.
Confirm the apex rule (§0) and the precompiled-CSS trap + measurement lesson
(§3, §7). Then **ask the user what the next task is** — do not pick one.

Most likely next thread: implement the §4 SEO audit code fixes (one branch:
title tags, `llms.txt`, breadcrumb schema, Service schema, Person `sameAs`,
police-station FAQ) once the user confirms the two decisions.
