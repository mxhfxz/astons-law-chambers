# Session Handoff — 2026-05-17 (Next.js cutover + audit-holes session)

Read this FIRST, after `MEMORY.md` and `.project/_START_HERE.md`. It supersedes
every earlier handoff (they remain in git history).

---

## ⚠️ START OF NEXT SESSION — DO THIS FIRST

This is a **continuing audit sweep**. Two sweeps have run on 2026-05-17:
sweep #1 (§0) fixed two production bugs + an analytics gap; sweep #2 (§0b)
fixed three dead BSB/LeO compliance links + a global preload. All verified
live. **Next session = sweep #3:** continue auditing the live site for
regressions/holes, same method (load `astonslaw.com` in Playwright, gather
evidence, root-cause, fix, verify, deploy). Ask the user if they have
specific new items; otherwise widen the sweep to pages not yet deep-checked
(see §0b "not yet swept" + §5).

**New HARD RULE this session:** nothing reaches `main` until verified working
(build + type-check + real-browser check). `main` is live production for a
regulated barrister's practice. Recorded in
`memory/feedback_no_broken_sites_to_main.md`. Do not regress this.

Also: the **skills-first rule is hook-enforced** (see §6). Every task routes
through the relevant installed skill first — no Claude defaults.

---

## 0. Audit sweep #1 — 2026-05-17 (COMPLETE, all fixes live on `main`)

User reported: GA "not picking anything up", navbar "scrolls away on scroll".
Asked for a full no-stone-unturned audit. Findings + outcomes:

1. **Navbar not sticky — REAL BUG, FIXED & LIVE.** Chrome is injected via a
   React wrapper `<div>` (`chrome.tsx` `Raw`). That div boxed the
   `position: sticky` header into a 73px containing block, so it un-stuck
   immediately. Fix: `.chrome-mount { display: contents }` on the wrapper
   (`app/preview-styles.css` + `chrome.tsx`). Commit `19f862e`. Verified on
   production: header pins through full scroll, desktop + interior pages.

2. **GA4 double-counted page views — REAL BUG, FIXED & LIVE.** `gtag config`
   has `send_page_view: true` AND `SiteBehaviour` fired a manual `page_view`
   on mount → 2 per load (every load, since navigation is full-reload). Fix:
   `firstRoute` ref guard in `SiteBehaviour.tsx` — config owns the load
   page_view, manual one only fires on client-side route changes. Commit
   `1c82d98`. Verified: exactly 1 page_view per load.

3. **GA "nothing in realtime" — NOT a code fault.** Proven: the live site
   fires a valid GA4 `page_view` collect hit to `tid=G-8TDVMH13D7`. Cause was
   the user's own browser — **Vivaldi's built-in tracker blocker** was eating
   the hits. GA works. No code change.

4. **One WhatsApp link mistagged — FIXED & LIVE.** The booking-panel "Use
   WhatsApp" link (`content/sections/home.html` ~L296) had no
   `data-track-location` → its `whatsapp_click` logged `location: unspecified`.
   Fixed to `data-track="whatsapp_click" data-track-location="booking_urgency"`.
   Commit `dd176da`. Verified live: all 15 homepage call/WhatsApp links now
   carry a location; 0 unspecified. (A second candidate at home.html L331 was
   investigated and correctly left alone — it lives inside `<noscript>`, which
   JS-based GA tracking can never reach.)

**Production HEAD after sweep #1:** `main` at the `e89492d` merge. All four
items above are verified live on `astonslaw.com`.

**Open / handed to the user (account-side, not code):**
- **GA4 Admin → Events:** mark `call_click`, `whatsapp_click`, `book_click`
  as **Key events** or they never surface as the conversion KPI. User action.
- Call tracking measures the tap, not the connected call — fine as an intent
  proxy; a paid call-tracking number would close it. User's decision.

**Reviewed and deliberately NOT changed:**
- Navigation is full-page reloads (all links are raw `<a>` in injected HTML,
  not `next/link`). Not broken; converting to client-side routing is overkill
  for the calls/WhatsApp KPI. Left as-is by decision.
- Two lint warnings (raw hex `themeColor`, fonts via `<link>`) — deliberate,
  see §3.

**Not yet swept (candidates for the next sweep):** interior route bodies
(`/fees`, `/about`, `/contact`, `/direct-access`, `/complaints`,
`/police-station-representation`) were confirmed HTTP 200 and console-clean
but not individually behaviour-tested; mobile-viewport interaction;
cal.com booking facade click-through; the BSB/compliance content (§5).

---

## 0b. Audit sweep #2 — 2026-05-17 (COMPLETE, all fixes live on `main`)

Widened the sweep to the six routes §0 left "not yet swept". Behaviour-tested
each live in Playwright: titles / h1 / canonical / meta correct, every
`tel:`/`wa.me` link carries `data-track` + `data-track-location` (sweep #1's
tagging holds), no broken images, no empty links, no forms, console clean.
Two findings, both fixed and verified live. Production HEAD: `main` at the
`8d89caa` merge.

1. **Three dead BSB / Legal Ombudsman links — REAL DEFECT, FIXED & LIVE.**
   The BSB and LeO restructured their sites; URLs carried from the old site
   now 404 (confirmed `curl`, browser UA — sibling pages 200, so genuine link
   rot). Replacements verified live (200, title-matched), link text unchanged:
   - LeO decision data → `…/information-centre/data-centre/ombudsman-decision-data/`
   - BSB report a concern → `…/for-the-public/reporting-concerns.html`
   - BSB public access guidance → `…/resources/public-access-guidance-for-lay-clients.html`
   Live instances were on `/complaints` (×2) and `/direct-access` (×1). The
   same two stale URLs in the **unused** `lib/site.ts` stub were also
   corrected (dead code — not rendered anywhere). Commit in `8d89caa`.

2. **`hero_image.webp` preloaded on every route — FIXED & LIVE.** The
   `<link rel="preload" as="image">` lived in the root `layout.tsx`, so every
   non-home route fetched an unused image + logged a "preloaded but not used"
   console warning. Moved the preload into `app/page.tsx` — homepage LCP
   benefit kept, waste removed everywhere else. Verified: homepage still
   preloads + loads the hero; non-home routes no longer carry it.

**Corrected from the sweep-#2 mid-report:** the BSB/LeO links in
`content/chrome/footer.html` (lines 33–36) are inside an HTML `<!-- -->`
comment — hidden 2026-05-14 pending verified client-specific URLs. They are
NOT live, so there was no "sitewide footer dead link". The footer block is a
separate launch task: its comment asks for verified URLs before restoring —
sweep #2's verified replacements above can fill that when the user decides to
restore it.

**Not yet swept (candidates for sweep #3):** the 7 `/practice-areas/[slug]`
detail pages + `/practice-areas` index were not individually behaviour-tested;
mobile-viewport interaction; cal.com booking facade click-through; the
BSB/compliance copy itself (§5, client-deferred).

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

1. **Audit sweep #3** — continue from §0b. Ask the user for any new specific
   items; otherwise behaviour-test the pages listed under §0b "not yet swept"
   (the 7 practice-area detail pages + index, mobile viewport, cal.com
   facade). Method: Playwright against `astonslaw.com`, evidence-first,
   root-cause, fix, verify, deploy. Do not put anything on `main` unverified.
2. BSB / compliance content verification — when the client provides it.
3. Optional: www→apex redirect 307 → 308; delete the dead code in §5.

Note: Playwright MCP needed a browser-build symlink to run this session —
`npx playwright install chromium` installed builds 1208+, but the MCP pins
build 1200. Worked around by symlinking `chromium-1200` /
`chromium_headless_shell-1200` → the 1208 dirs in
`~/Library/Caches/ms-playwright/`. If Playwright fails to launch next sweep,
re-create those symlinks.
