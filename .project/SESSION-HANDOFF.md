# Session Handoff — 2026-05-17 (Next.js cutover + audit-holes session)

Read this FIRST, after `MEMORY.md` and `.project/_START_HERE.md`. It supersedes
every earlier handoff (they remain in git history).

---

## ⚠️ START OF NEXT SESSION — DO THIS FIRST

The user ran an **audit and found "a bunch of holes."** That list was NOT
captured before this session was cleared. **Before doing any work, ask the
user for the audit findings / the list of holes.** Do not start fixing or
building anything until you have that list — it is the next work queue.

Also: the **skills-first rule is now hook-enforced** (see §6). Every task
routes through the relevant installed skill first — no Claude defaults.

---

## 1. Current state — the site is LIVE and is now real Next.js

`astonslaw.com` serves a **Next.js 14 App Router site** (verified live, HTTP
200). The old hash-routed static prototype (`astonslaw.com/#/fees`) is gone.
Every section is now a real crawlable URL with its own server `metadata`.

- **Production = `main`.** Latest production Vercel deploy was `e94eceb`'s
  merge; `main` HEAD after the handoff commits is the current production.
- **`astonslaw.com` (apex) is the primary domain**, serves 200 directly.
  `www.astonslaw.com` → 307 → apex. The code's canonical / `og:url` / sitemap
  all declare the apex `https://astonslaw.com`, so code and serving host agree.
  (Optional polish only: the www→apex redirect is 307; 308 would be a cleaner
  permanent SEO signal — change via Vercel → Domains → Edit on the www row.)

## 2. What this session did

1. **Social/app icons** (commit `8e1149d`): `og-image.png` (1200×630 branded
   card, white logo), `apple-touch-icon.png`, `icon-192/512.png`, `favicon.ico`,
   `site.webmanifest`. Replaced the SVG OG placeholder (SVG OG images don't
   render on social/WhatsApp). All verified live 200.
2. **Full Next.js App Router port** (commit `b9e4567`) — see §3 for how it's
   built. Replaced the hash router with 14 real routes.
3. **`vercel.json` framework fix** (commit `2927f82`): the Vercel project's
   dashboard framework preset is `null` (legacy static config). The first port
   deploy 404'd every route because `vercel.json` had no `framework`. Fixed by
   setting `"framework": "nextjs"`. **Do NOT remove that key** — routes 404
   without it.
4. **Production cutover** — merged to `main`, verified all routes live on
   astonslaw.com (200s, per-page titles, 404s, redirects, sitemap, robots).
5. **Mega menu debug** (systematic-debugging): suspected broken, proven NOT
   broken — it was a Playwright test artifact (`click` hovers-then-clicks =
   open-then-close). Mega menu, police banner, footer year, GSAP reveals all
   confirmed working. No fix made; nothing was wrong.
6. **Skills-first rule hook-enforced** (see §6).

## 3. How the ported site is built (IMPORTANT — read before editing)

The design is the approved prototype, kept byte-faithful. The port is
**structural**, not a rewrite:

- **Section markup** = the prototype's HTML, extracted verbatim into
  `content/sections/*.html` and `content/chrome/*.html`. Pages inject it via
  `dangerouslySetInnerHTML`. `lib/content.ts` reads these files at build time.
- **Route pages** — `app/<route>/page.tsx` — thin: each exports `metadata`
  (title/description/canonical) and injects its section HTML. Routes:
  `/`, `/practice-areas`, `/practice-areas/[slug]` ×7,
  `/police-station-representation`, `/fees`, `/direct-access`, `/about`,
  `/contact`, `/complaints`, `app/not-found.tsx`.
- **Practice areas** — data in `lib/practice-areas.ts` (the 7 areas + the
  `slugRedirects` map). `lib/render-practice-area.ts` fills the
  `content/sections/pa-detail.html` template's `data-bind` slots by string
  replacement, and builds the index grid + per-area FAQ/Breadcrumb JSON-LD.
  `[slug]/page.tsx` uses `generateStaticParams` + `dynamicParams = false` so
  unknown slugs 404.
- **Chrome** — `components/site/chrome.tsx` (server, injects header / footer /
  police banner / sticky pill / quick-exit / icon sprite verbatim).
- **Interactivity** — `components/site/SiteBehaviour.tsx` (`'use client'`):
  mega menu, mobile menu, police-banner scroll, GSAP reveals, GA click
  tracking + page_view on route change, cal.com facade, quick exit, footer
  year. This is the prototype's foot-of-body script minus the hash router.
- **CSS** — `app/preview-tailwind.css` (the prototype's prebuilt Tailwind) +
  `app/preview-styles.css` (its `<style>` block). Imported in `app/layout.tsx`
  in that order. The Next scaffold's own Tailwind is not used for the ported
  markup — this guarantees visual fidelity.
- **layout.tsx** — head metadata, GA + cal.com + GSAP via `next/script`,
  static JSON-LD graph, fonts via `<link>`.
- **next.config.mjs** — `trailingSlash: false`, legacy-URL + removed-slug
  redirects (308).

Build: `npm run build` → 20 static pages, 87.4 kB First Load JS, clean.
Two non-blocking warnings, both deliberate: raw hex in `layout.tsx` viewport
`themeColor` (a meta value, can't be a token); `no-page-custom-font` for the
IBM Plex `<link>` (kept — the verbatim CSS hardcodes the family name).

## 4. Git / branches / Vercel

- Branches: `main` (production), `alc-staging` (working — push here, merge to
  `main` to deploy), `phase-2-design-system` (stale, ignore).
- Workflow: commit to `alc-staging` → merge into `main` → push → Vercel
  auto-deploys `main` to astonslaw.com. `alc-staging` branch deploys to a
  protected preview (`alc-staging-git-alc-staging-dsgnly.vercel.app`, 401s
  without auth — use the Vercel MCP `get_access_to_vercel_url` to verify it).
- Vercel project `alc-staging`: `projectId prj_Fj4Y2t9b0CBflI0Bxo96vvBHZlC5`,
  `teamId team_h56XkPoiUvCygqdsx1PhjjAM`. `.vercel/project.json` is NOT in this
  checkout (gitignored / absent). The Vercel MCP tools work for deploy
  inspection.

## 5. Known gaps / not-yet-verified (separate from the user's audit)

- **BSB / compliance content is unverified** — client deferred ~1 week. The
  copy on `/complaints`, `/fees`, fee strips, regulatory lines was carried
  from the old site. Going live on a regulated barrister's site with
  unverified regulatory content is a real compliance exposure. Client's call.
- **Hero headline** ("Speak to a barrister before the police interview.") and
  the booking copy are unreviewed drafts.
- **Interactivity coverage:** mega menu verified live; police banner / footer
  year / GSAP confirmed via DOM state. Mobile burger menu, cal.com booking
  facade, GA event firing, quick-exit — ported and build-clean, NOT yet
  click-tested on the live domain.
- **Routes eyeballed:** home (desktop+mobile), practice-area detail, mega
  menu. The other route bodies are verbatim prototype HTML so should be
  faithful, but each was not individually screenshotted.
- `[slug]` rendering uses string-replacement on the template HTML — works, but
  is fragile if `content/sections/pa-detail.html` markup changes.
- **Dead code in repo** (safe to delete in a cleanup pass): `preview/` (old
  static site, no longer deployed), `components/layout/*`, `hooks/*`,
  `styles/*` (superseded scaffold stubs, not imported).

## 6. Skills-first rule — now hook-enforced

The HARD RULE (every task routes through the relevant installed skill, no
Claude defaults) is enforced by a **`UserPromptSubmit` hook** in
`.claude/settings.local.json` — it runs a command that reads
`.claude/skills-first-rule.md` and re-injects it into context on EVERY prompt.
Confirmed firing. The rule text is committed at `.claude/skills-first-rule.md`.
`settings.local.json` is gitignored (personal). If the hook is ever removed,
that is a regression — restore it. Recorded in
`memory/feedback_no_claude_defaults_use_skills.md`.

## 7. How to build / run locally

```bash
npm run build      # production build — 20 static pages, must be clean
npm run start -- -p 8820   # serve the production build
npm run dev        # dev server
npm run lint / type-check
```
Vercel build verification: use the Vercel MCP — `list_deployments`,
`get_deployment`, `get_deployment_build_logs`, and `get_access_to_vercel_url`
(preview URLs are deployment-protected, 401 without an auth share token).

## 8. Key files

- `app/` — routes + `layout.tsx` + `sitemap.ts` + `robots.ts`
- `components/site/chrome.tsx`, `components/site/SiteBehaviour.tsx`
- `lib/practice-areas.ts`, `lib/content.ts`, `lib/render-practice-area.ts`
- `content/sections/*.html`, `content/chrome/*.html` — verbatim design markup
- `app/preview-tailwind.css`, `app/preview-styles.css`
- `next.config.mjs` (redirects), `vercel.json` (`framework: nextjs` + headers)
- `.claude/skills-first-rule.md` (+ the hook in `.claude/settings.local.json`)

---

## What to do next (in order)

1. **Get the audit holes from the user** (see top of file). That is the queue.
2. Address them, routing each through the relevant skill.
3. BSB / compliance content verification — when the client provides it.
4. Optional: www→apex redirect 307 → 308; delete the dead code in §5.
