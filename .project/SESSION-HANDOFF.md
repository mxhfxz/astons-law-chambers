# Session Handoff — 2026-05-23 (CTA bar: wired into Next.js + three-button layout)

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

**Branch pushed to origin at `b776f27`. Vercel preview:**
`https://alc-staging-git-cta-bar-dsgnly.vercel.app`

**Root cause fixed this session:**

The previous `cta-bar` commits only changed `preview/index.html` (a dev artifact Vercel
does not serve) and `app/preview-styles.css`. The Next.js layout was still rendering
`<StickyPill />` from `content/chrome/sticky-pill.html` (old pill with email link).

Three files added/updated to wire the bar into the actual Next.js build:

| File | Change |
|------|--------|
| `content/chrome/sticky-bar.html` | New chrome fragment — the actual bar HTML |
| `components/site/chrome.tsx` | Added `StickyBar` export reading `sticky-bar` |
| `app/layout.tsx` | Replaced `<StickyPill />` with `<StickyBar />` |

**Bar design (as of `b776f27`):**

Three-button full-bleed bottom bar, all navy:

```
┌──────────────────────────┬──────────┬──────────┐
│  📞  Call now            │          │          │
│      07922 247 999  ●    │  WA icon │ Cal icon │
└──────────────────────────┴──────────┴──────────┘
         flex: 3              flex: 1    flex: 1
         (navy + text)        (navy)     (navy)
                           ↑ divider  ↑ no border
```

- Call button: phone icon + stacked "Call now" label + number + avail-dot. Primary action.
- WhatsApp: icon only, same navy, `border-right` divider on its right edge
- Book: calendar icon (`i-calendar` from sprite), icon only, navy, no right border
- `border-top: 2px solid var(--color-navy-900)` — hard top border vs browser chrome
- `padding-bottom: env(safe-area-inset-bottom)` — iOS/Android safe area
- Hidden md+ (`@media (min-width: 768px) { display: none }`)
- `sr-only` spans on icon-only buttons for accessibility

**Status:** Vercel preview rebuilding. User needs to check it before merging to main.

**Do NOT merge until user has reviewed the Vercel preview and approved.**

---

## 3. Desktop sticky pill (unchanged — still on main)

The desktop floating pill (avail-dot call chip + WhatsApp chip in dark navy pill) is
unchanged and not part of the `cta-bar` branch. It lives in
`content/chrome/sticky-pill.html` and `components/site/chrome.tsx` (`StickyPill` export).
`StickyPill` is still exported from chrome.tsx but no longer used in layout.tsx on
`cta-bar`. Once cta-bar merges, `StickyPill` + `sticky-pill.html` can be cleaned up.

---

## 4. Deferred tasks (unchanged from previous handoff)

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
- **`avail-dot` is in `preview-styles.css`** — not Tailwind.
- **Hero markup is duplicated per fragment** — touching one hero means checking all.

---

## 6. Session start — next session

1. Check Vercel preview: `https://alc-staging-git-cta-bar-dsgnly.vercel.app`
2. User reviews the three-button bar on mobile
3. If approved → merge `cta-bar` to `main` using `verification-before-completion`
4. After merge → run Task 1 (lawyer→barrister sweep) on a new branch

---

## 7. Git state

- **`main`** → `5a153dc` (live — old floating pill still active)
- **`cta-bar`** → `b776f27` (pushed, Vercel rebuilding)
- No other active branches
