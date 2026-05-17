# Session Handoff — 2026-05-17 (Next.js cutover session)

Read this FIRST after `MEMORY.md` and `.project/_START_HERE.md`. It supersedes
every earlier handoff (now in git history).

## 2026-05-17 — Next.js App Router site is LIVE on astonslaw.com

The hash-routed static prototype has been replaced. `astonslaw.com` now serves
a real Next.js 14 App Router build — every section is a crawlable URL with its
own server `metadata` (title / description / canonical). The SEO step-down
noted in the old "Accepted risks" is resolved.

- **Production = `main` @ `e94eceb`.** Vercel deploy `dpl_5uiUaVa14g97jycZ9MVpzAekcCVF`,
  READY, aliased to astonslaw.com / www.
- **14 real routes:** `/`, `/practice-areas`, `/practice-areas/[slug]` ×7,
  `/police-station-representation`, `/fees`, `/direct-access`, `/about`,
  `/contact`, `/complaints`, + `not-found`. All verified 200 live with correct
  titles; unknown slugs 404; legacy-URL redirects 308; `/sitemap.xml`,
  `/robots.txt`, `/og-image.png` all 200.
- **How it's built:** section markup is the approved prototype's HTML injected
  verbatim (`content/sections/*.html`, `content/chrome/*.html`) so the design
  is byte-faithful. Practice-area pages render server-side from
  `lib/practice-areas.ts` via `lib/render-practice-area.ts`. Chrome
  interactivity (mega/mobile menu, police banner, GSAP, GA, cal.com) is in
  `components/site/SiteBehaviour.tsx` (client). CSS = the prototype's built
  Tailwind + style block (`app/preview-tailwind.css` + `app/preview-styles.css`).
- **`vercel.json`** now `framework: nextjs` (the project's dashboard preset is
  still `null` — vercel.json overrides it; do NOT remove `framework` again or
  routes 404).
- **`preview/`** (old static prototype) is now dead code — still in the repo,
  no longer deployed. Safe to delete in a cleanup pass.
- Build warnings (non-blocking): raw hex in `app/layout.tsx` viewport
  themeColor (unavoidable — meta value), and `no-page-custom-font` for the
  IBM Plex `<link>` (kept deliberately — the verbatim CSS hardcodes the family
  name; switching to next/font would break the match).
- **BSB / compliance content** is still unverified — client deferred ~1 week.
  Unchanged by this session; carried forward.

---

# Session Handoff — 2026-05-17 (launch-prep session)

(Superseded — kept for history.)

## Where things are

- **Active branch: `alc-staging`.** Clean tree except `CLAUDE.md` (see Open items).
- **`main` = `b5b8812`** — the production branch. Everything below is merged into it.
- Build target is still `preview/index.html` (the static single-file prototype).
- Branches now: `main`, `alc-staging`, `phase-2-design-system`. The old
  `roadmap-preview-improvements` fork was deleted (local + remote) — it was
  identical to `alc-staging`, no work lost.

## Vercel / deployment structure (important — caused confusion this session)

- Project: **`alc-staging`** — `projectId prj_Fj4Y2t9b0CBflI0Bxo96vvBHZlC5`,
  `teamId team_h56XkPoiUvCygqdsx1PhjjAM`. Linked in `.vercel/project.json`.
- The project's **production deployment tracks the `main` branch.**
  `alc-staging.vercel.app` therefore serves `main`, NOT the `alc-staging` branch.
- The `alc-staging` *branch* deploys to a separate preview URL
  (`alc-staging-git-alc-staging-…vercel.app`).
- **To get any fix onto `alc-staging.vercel.app`, it must reach `main`.**
  Workflow used: commit to `alc-staging` branch → merge into `main` → push.
- `vercel.json`: `framework: null`, `outputDirectory: preview` — static deploy
  of `preview/`, no Next.js build runs.
- Latest production deploy `dpl_p9vXvRHK281zMH81LsfnoXjjWDmJ` = `b5b8812`,
  state READY.

## What this session did

1. **Hero image** swapped to the client's City of London skyline at dusk
   (`preview/hero_image.webp`, 720×656, 74KB). Old Magistrates' Court JPG removed.
   The darkening/overlay treatment was offered then dropped at client request —
   the dusk tones already sit cleanly in the dark hero.
2. **Hero column blowout fix** (`af0130c`). The image column was `minmax(0,40vw)`
   — a viewport unit — so on wide monitors (2560px) it took 1024px and crushed
   the headline column to ~232px (one word per line). Changed to container-
   relative `1.3fr 1fr`. `tailwind.built.css` rebuilt for the new arbitrary class.
3. **Mobile header overflow fix** (`aeb2e4d`). `.btn { display:inline-flex }`
   (inline `<style>`, loads after `tailwind.built.css`) was beating the `.hidden`
   utility, so desktop-only header buttons rendered on mobile → 467px header →
   whole page overflowed/clipped. Added `.btn.hidden` / `.btn.sm:inline-flex` /
   `.btn.md:inline-flex` rules (specificity 0,2,0), scoped to `.btn`. Root cause
   was last session's perf pass (`65e7157`, CDN→`<link>` swap flipped the cascade)
   — not this session's hero work. Verified 390/700/1280px.
4. **Production robots.txt + sitemap** (`30a839c`). `robots.txt` was the staging
   `Disallow: /` — shipping that to astonslaw.com would deindex the site.
   Now allow-all + sitemap reference. Added `preview/sitemap.xml` (homepage only;
   hash routes are not separate crawlable URLs).
5. Merges to `main`: `d5bd37c`, `b5b8812`.

## Pre-launch audit (done this session, current build)

- All 15 hash routes render real content, no blanks, no accidental 404s.
- Conversion links correct everywhere: `tel:+447922247999`,
  `wa.me/447922247999`, `cal.com/astonslaw/callback?overlayCalendar=true`.
- No placeholder copy visible (the 2 `[PLACEHOLDER]` strings are in comments).
- WCAG AA contrast: 0 failures (`scripts/contrast_audit.py`).
- One benign console 404: browser auto-request for `/favicon.ico`
  (modern browsers use the SVG favicon). `apple-touch-icon.png` also absent.
  Neither blocks launch.

## Confirmed this session

- GA4 property `G-8TDVMH13D7` — real client property (hard-coded in `<head>`).
- cal.com `cal.com/astonslaw/callback` — real working event.
- Both recorded in `memory/verified_facts.md`. Do not re-flag.

## Launch status

Code-side is **done and verified**. Remaining steps are the client's, in Vercel
+ DNS — NOT doable by Claude:

1. Record the current `astonslaw.com` DNS records (the only rollback path).
2. Vercel → project `alc-staging` → Settings → Domains → add `astonslaw.com`
   + `www.astonslaw.com`.
3. DNS provider: `A @ → 76.76.21.21`, `CNAME www → cname.vercel-dns.com`, TTL 300.
4. HTTPS auto. Smoke-test on a real phone (tap-to-call, WhatsApp, booking).

When astonslaw.com resolves, next session should run a verification pass on the
live domain.

## Accepted risks (client informed — their call)

- Launching the **static prototype**, not the planned Next.js build: hash-routed
  URLs (`astonslaw.com/#/fees`), one shared title/description, one static JSON-LD.
  Replacing a ranking site with this is an SEO step down.
- **BSB / compliance content is unverified** — client deferred ~1 week. Going
  live on a regulated barrister's site with unverified regulatory content is a
  real compliance exposure. The 🚩 comments in `preview/index.html` (lines ~1477,
  1568, 1692) mark compliance copy pulled from the live site that needs Ghulam's
  verification.
- Hero headline ("Speak to a barrister before the police interview.") and the
  booking copy are unreviewed drafts.

## Open items / next-session TODO

1. **Verify the live domain** once DNS is cut over.
2. **BSB content verification** — client deferred ~1 week. Content exists in the
   build; it needs checking, not creating.
3. **Extra service pages** — client has a couple more to add; agreed as
   post-launch. They slot into the prototype's route renderer.
4. **`CLAUDE.md` is committed** as of this handoff (the hard-rule edit — see New
   rules below).
5. **Next.js rebuild** — the proper production build (`plan.md` Phases 3–7).
   Scaffold already exists (Phases 1–2 done). The rebuild is now a *port* of the
   finished prototype into the App Router scaffold (real routes + per-page
   metadata = the SEO fix), not a redesign. `plan.md` Phase 2 still assumes a
   Penpot design source — that is stale; the prototype superseded it. Realistic
   scope: a multi-session milestone. Swapping the Next.js build in later is just
   a code + `vercel.json` change + redeploy — no second DNS change. Before
   starting: confirm the prototype is the approved spec, confirm the final
   practice-area list (prototype links ~7; `plan.md` says 10), get the BSB
   content.

## New rules set this session (now permanent)

- **HARD RULE — no Claude defaults, always use the installed skill.** Set by the
  user 2026-05-17 after repeated incidents. Every task routes through the
  relevant installed skill first, before any action. Recorded in
  `memory/feedback_no_claude_defaults_use_skills.md`, the `MEMORY.md` header, and
  a dedicated section near the top of `CLAUDE.md`.
- **Vercel Toolbar a11y false-positive** — the Toolbar's accessibility audit
  reports false `aria-hidden-focus` / `landmark-one-main` violations (its overlay
  hides the page, then audits it). Verified clean with axe-core. Recorded in
  `memory/project_vercel_toolbar_a11y_false_positive.md`. Audit with Lighthouse /
  axe DevTools instead; do not edit markup to chase those.

## How to run / review locally

```bash
python3 -m http.server 8810 --directory preview --bind 127.0.0.1
```
Contrast audit: `python3 scripts/contrast_audit.py` (expect `Failures: 0`).
Note: browsers cache `tailwind.built.css` aggressively — hard-refresh or use a
fresh port after CSS changes.

## Key files

- `preview/index.html` — the build
- `preview/tailwind.built.css` + `tailwind.preview.config.js` + `tailwind.input.css`
  — if a Tailwind class changes in index.html, the built CSS MUST be rebuilt:
  `node_modules/.bin/tailwindcss -c preview/tailwind.preview.config.js -i preview/tailwind.input.css -o preview/tailwind.built.css --minify`
- `preview/robots.txt` (production) + `preview/sitemap.xml`
- `preview/hero_image.webp` — hero image
- `scripts/contrast_audit.py` — WCAG AA auditor
- `.project/plan.md` — the 8-phase build plan (Phases 3–7 = the Next.js rebuild)
