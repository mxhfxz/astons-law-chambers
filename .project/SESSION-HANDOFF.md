# Session Handoff — 2026-05-17 (fork: roadmap-preview-improvements)

This file is the bridge between sessions. Read this FIRST after `MEMORY.md` and
`.project/_START_HERE.md`. It supersedes the 2026-05-14 handoff (in git history).

## Where things are

- **Active branch: `roadmap-preview-improvements`** — a fork, **7 commits ahead**
  of `phase-2-design-system`. All work this session is committed; tree is clean.
- Build target is `preview/index.html` (the static single-file prototype).

## What this session did

Resumed `.project/planning/25-visual-adjustment-plan-2026-05-17.md`. Tasks 0/1/3
(baseline, dark hero, dark accent section) were already committed on
`phase-2-design-system`. Then, on the new fork:

1. **Hero right panel** — abstract gradient/logo replaced with an image slot.
2. **cal.com facade** — the booking embed no longer loads inline on the homepage;
   it loads only when the visitor clicks "Book a call". Removes ~500KB + cal.com's
   GTM/GA from the homepage critical render path.
3. **Phase 1 performance pass**:
   - Tailwind CDN (124KB, render-blocking) → built 21KB stylesheet
     (`preview/tailwind.built.css`, config `preview/tailwind.preview.config.js`).
   - CLS fixes: homepage practice-area grid pre-rendered into static HTML; home
     route marked `is-active` in static HTML; hero image absolutely positioned.
   - Hero image optimised.
4. **Contrast auditor fix** — removed a stale `step-card=white` entry in
   `scripts/contrast_audit.py`.
5. **Hero headline** — iterated to strip AI/SaaS-style copy. Final = option C.
6. **Hero image** — client supplied a court photo (see Decisions).

## Decisions locked this session

- **Hero headline = "Speak to a barrister before the police interview."**
  (Option C — directive, names the crisis, plain barrister voice. NOT yet
  client-reviewed copy.)
- **Hero image = City of London Magistrates' Court** photo. Client confirmed
  royalty-free from Adobe Stock (licensing OK). Source 2618×3665 webp (~975KB);
  resized to 750×1050 JPG (~138KB) at `preview/hero_image.jpg`. No local webp
  encoder; the Next.js build would re-encode webp/avif automatically.
- **BSB content + Ghulam facts: client chose to defer** ("can come in the next
  week"). Flagged as a risk; it is the client's call.

## Measured results (Lighthouse, mobile, local servers, identical conditions)

| | OLD (pre-fork) | NEW (fork) |
|---|---|---|
| Performance | 39–64, unstable | 77–78, stable |
| CLS | 0–0.824, unstable | 0, stable |
| LCP | 6.1–12.4s | ~5.3s |
| Page weight | ~2.5MB | ~559KB |

Clear, stable improvement. LCP still ~5.3s (fails <2.5s target — remaining cost is
render-blocking Google Fonts; properly fixed by self-hosted fonts in the Next.js build).

## Fork commits (newest first)

```
310acbb Hero image: client-supplied City of London Magistrates' Court photo
1564938 Hero headline: option C — 'Speak to a barrister before the police interview.'
a678e28 Reword hero headline + booking facade copy to remove AI-isms
752b0e6 Phase 2: crisis-naming hero headline
350a8b1 Phase 1 fix: eliminate route-reveal and hero-image CLS
65e7157 Phase 1: performance + stability pass
4333429 Hero image panel + cal.com facade (deferred-load) + booking balance tweak
```

## Open items / next-session TODO

1. **Merge decision** — merge `roadmap-preview-improvements` into
   `phase-2-design-system`? Not yet merged.
2. **Deploy** — client wants the new site on the live URL. Next action is a deploy.
   Recommended: staging (`alc-staging.vercel.app`) first. A production deploy
   replaces the working live astonslaw.com — confirm explicitly before running it.
3. **Pre-launch verification (before production):**
   - **cal.com**: the link `cal.com/astonslaw/callback` must be a real, working
     cal.com account/event.
   - **GA**: the GA4 tag `G-8TDVMH13D7` hard-coded in `<head>` must be the client's
     real Google Analytics property, or the call/WhatsApp KPI tracking goes nowhere.
   - **Fees table** figures (£175–£400 etc.) — confirm accurate (also a BSB
     price-transparency item).
4. **Hero image tonal clash** — the court photo is bright/saturated against the dark
   hero. A subtle dark/desaturation overlay was offered; client has not decided.
   Optional polish.
5. **BSB + Ghulam** — client deferred ~1 week. The BSB compliance *content* already
   exists in the build (Bar Standards Board ×12, complaints route, Legal Ombudsman,
   Public Access, VAT). It needs *verification*, not creation.

## Risks flagged (client has been told; their call)

- `preview/index.html` is a **static prototype**, not the planned Next.js production
  build. Launching it = hash-routed URLs (`#/fees`), one shared title/description for
  all "pages", one static JSON-LD block. Weaker SEO than the planned build.
- Going live without verified BSB content / fees on a *regulated* barrister's site
  carries compliance exposure. Client accepted this to get the site up.
- Hero headline + booking facade copy are unreviewed drafts.

## How to run / review locally

```bash
python3 -m http.server 8810 --directory preview --bind 127.0.0.1   # fork
# old version for comparison:
git show phase-2-design-system:preview/index.html > /tmp/old/index.html
python3 -m http.server 8811 --directory /tmp/old --bind 127.0.0.1
```
Contrast audit: `python3 scripts/contrast_audit.py` (expect `Failures: 0`).

## Key files

- `preview/index.html` — the build
- `preview/tailwind.built.css` + `tailwind.preview.config.js` + `tailwind.input.css`
- `preview/hero_image.jpg` — hero image (court photo)
- `scripts/contrast_audit.py` — WCAG AA auditor
- `.project/planning/24` / `25-*` — UI comparison, visual-adjustment plan, baseline

## Hero height (asked this session)

~782px on desktop (1440×900) — ~87% of viewport. Taller on mobile (columns stack):
roughly 950–1100px.
