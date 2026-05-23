# Session Handoff — 2026-05-23 (CTA bar finalised + hero dual-CTA)

Read MEMORY.md first, then this file.

---

## APEX RULE — SKILLS FIRST, NO CLAUDE DEFAULTS

Every task routes through the relevant skill FIRST. No exceptions.

Frontend / layout: `frontend-design` → `frontend-dev-guidelines` → implement
CRO / copy: `cro-2026` → `page-cro` → implement
Git / deploy: git skills + `vercel-deployment`
Brainstorm: `brainstorming` → `multi-agent-brainstorming` for high-impact decisions
Verification: `verification-before-completion`

---

## 1. Production state

**`main`** → `5a153dc` (live on astonslaw.com)

### What is LIVE on main

- Red police station banner above the white navbar
- Homepage H1: `24/7 Support for arrests, police station interviews, and court summons`
- Hero sub + red `btn-emergency` CTA: "Call 07922 247 999"
- Mobile sticky: **the old floating pill is still live on main** — the new bar has NOT been merged yet
- Desktop: avail-dot call chip + WhatsApp chip in dark navy pill (unchanged)
- 13 commercial page titles with visual disruptor brackets

---

## 2. Active feature branch — `cta-bar` (PENDING USER REVIEW)

**Branch at `ec15b7f`. Vercel preview:**
`https://alc-staging-git-cta-bar-dsgnly.vercel.app`

**Do NOT merge until user has reviewed the Vercel preview and approved.**

### Changes on `cta-bar` vs `main`

| File | Change |
|------|--------|
| `content/chrome/sticky-bar.html` | Mobile bar: avail-dot (green pulse) removed |
| `content/chrome/desktop-fab.html` | NEW — two 48×48 navy circle FABs (WA + book) |
| `components/site/chrome.tsx` | Added `DesktopFab` export |
| `app/layout.tsx` | `<StickyPill />` replaced with `<StickyBar />` + `<DesktopFab />` |
| `app/preview-styles.css` | Mobile bar CSS + desktop FAB CSS |
| `content/sections/home.html` | Hero CTA row: "Book a Free Consultation" added |

### Mobile bar (current design)

Three-button full-bleed bottom bar, all navy, **no avail-dot**:

```
┌──────────────────────────┬──────────┬──────────┐
│  📞  Call now            │          │          │
│      07922 247 999       │  WA icon │ Cal icon │
└──────────────────────────┴──────────┴──────────┘
```

- `border-top: 2px solid var(--color-navy-900)`
- `padding-bottom: env(safe-area-inset-bottom)`
- Hidden md+ (`@media (min-width: 768px) { display: none }`)

### Desktop FABs (NEW — replaces old floating pill)

Two 48×48 navy circle FABs, fixed bottom-right 0.5rem:

```
      [ WA icon  ]   ← WhatsApp
      [ Cal icon ]   ← Book
```

- `var(--color-navy-900)` fill, white icons (20px SVG)
- box-shadow, hover/active/focus-visible states, reduced-motion guard
- Visible md+ only (`#desktopFab { display: none }` → `@media (min-width: 768px) { display: flex }`)
- Defined in `content/chrome/desktop-fab.html` + `app/preview-styles.css`

### Hero CTA (NEW)

On desktop (640px+): red "Call 07922 247 999" + white outline "Book a Free Consultation" side-by-side.
On mobile: only the red call button (book CTA hidden via `hidden sm:inline-flex`).

```html
<div class="mt-8 md:mt-10 btn-row">
  <a ... class="btn btn-xl btn-emergency btn-full">Call 07922 247 999</a>
  <a ... class="btn btn-xl btn-on-dark hidden sm:inline-flex">Book a Free Consultation</a>
</div>
```

---

## 3. Desktop sticky pill (dead code on `cta-bar`)

`StickyPill` export + `content/chrome/sticky-pill.html` still exist but are no longer
used in `layout.tsx` on the `cta-bar` branch. Clean up after merge.

---

## 4. Deferred tasks (unchanged)

### TASK 1: SEO lawyer→barrister sweep

**`lib/practice-areas.ts`:**
- Line 40: `metaDescription` criminal-defence → "Criminal defence lawyer" → "Criminal defence barrister"
- Line 46: `situation` criminal-defence → "acts as a criminal defence lawyer" → "acts as a criminal defence barrister"
- Line 79: `metaDescription` violent-crimes → remove "from the police station through to Crown Court trial"
- Line 85: `situation` violent-crimes → "acts as a criminal defence lawyer" → "acts as a criminal defence barrister"
- Line 128: `situation` youth-crimes → "acts as a criminal defence lawyer" → "acts as a criminal defence barrister"
- Line 202: `situation` drug-offences → "acts as a criminal defence lawyer" → "acts as a criminal defence barrister"

**`content/sections/practice-areas.html` line 6:**
"criminal defence lawyer practice" → "criminal defence barrister practice"

**`content/sections/about.html` line 6:**
"acting as a criminal defence lawyer at every stage" → "acting as a criminal defence barrister at every stage"

**`content/sections/police-station.html`:**
- Line 48: "A criminal defence lawyer attends the station" → "A criminal defence barrister attends"
- Line 62: Remove or reframe "A solicitor is not required..." (competes in wrong SERP)

**`app/police-station-representation/page.tsx`:**
- title: → "Criminal Representation After Arrest [Direct Access], London"
- description: → "Criminal defence barrister representation"

### TASK 2: Police station page reframe (after Task 1)

SERP is 100% solicitor firms. Needs reframe to "direct access barrister after arrest" framing.

### TASK 3: Direct access content cluster

Sub-pages for direct-access barrister queries. Entity footprint at 2 sources; AI citation threshold is 3+.

### TASK 4: llms.txt update for Insights blog

`/insights` is merged. `llms.txt` needs the Insights section added.

---

## 5. Standing gotchas

- **`cta-bar` branch is NOT on main.** Do not merge without user reviewing the preview.
- **`StickyPill` is now dead code** on `cta-bar` — `layout.tsx` uses `StickyBar`. Clean up after merge.
- **Pages CMS writes to `origin/main` directly.** Always `git fetch` + check before push.
- **Precompiled CSS trap.** `app/preview-tailwind.css` is static. Grep before adding Tailwind classes. Custom CSS in `preview-styles.css`.
- **`--color-whatsapp` is `#075E54`** (dark teal) — NOT bright green. Use the token.
- **`bg-footer`** is `#232536` — dark page heroes. NOT navy-950 (`#0E1628`).
- **`avail-dot` is in `preview-styles.css`** — not Tailwind. Still defined but no longer used on any live element.
- **Hero markup is duplicated per fragment** — touching one hero means checking all.
- **`btn-on-dark hidden sm:inline-flex`** — the `.btn.hidden` + `.btn.sm\:inline-flex` override rules in `preview-styles.css` handle this pattern. Do not use plain Tailwind `hidden`/`sm:block` outside of `.btn` context without verifying precompiled bundle.

---

## 6. Session start — next session

1. Check Vercel preview: `https://alc-staging-git-cta-bar-dsgnly.vercel.app`
   - Mobile: bar without dot, red call button only in hero
   - Desktop: two navy circle FABs bottom-right, dual-CTA in hero
2. If approved → merge `cta-bar` to `main` using `verification-before-completion`
3. After merge → clean up `StickyPill` + `sticky-pill.html`
4. After merge → run Task 1 (lawyer→barrister sweep) on a new branch

---

## 7. Git state

- **`main`** → `5a153dc` (live — old floating pill still active)
- **`cta-bar`** → `ec15b7f` (pushed, Vercel rebuilding)
- No other active branches
