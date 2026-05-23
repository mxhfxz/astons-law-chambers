# Session Handoff — 2026-05-23 (CTA bar brainstorm + staging)

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
- Mobile sticky: **the old floating pill is live** — full-width navy call button + 3-dot circle.
  The new bottom bar has NOT been merged to main yet.
- Desktop: unchanged (avail-dot call chip + WhatsApp chip in dark navy pill)
- 13 commercial page titles with visual disruptor brackets

---

## 2. Active feature branch — `cta-bar` (PENDING REVIEW)

**Branch pushed to origin, Vercel preview at:**
`https://alc-staging-git-cta-bar-dsgnly.vercel.app`

**What changed on `cta-bar`:**

| File | Change |
|------|--------|
| `preview/index.html` | `#stickyPill` replaced with `#stickyBar` |
| `app/preview-styles.css` | Old `.pill-call/.pill-dots/.pill-menu` removed; new `.sticky-bar-call/.sticky-bar-wa` + body padding added |

**Design decision (three-agent brainstorm 2026-05-23):**

Replaced the floating pill with a full-bleed branded bottom bar. Rationale:

1. `bottom: 16px` with no safe-area handling made the pill float in a broken gap above iOS Safari / Android Chrome browser chrome
2. The 3-dot expand icon directly mirrored Safari's own 3-dot share button — UX confusion
3. Three agents (CRO, Mobile UX / iOS HIG, Crisis Psychology) ran in parallel. CRO + Mobile UX both concluded: two always-visible labeled buttons, no expand mechanism, hard top border for content boundary. Psychology pushed for single dominant CTA — outvoted on zero-friction grounds for 2am crisis use

**New bar spec:**
- `position: fixed; bottom: 0; left: 0; right: 0` — full-bleed
- `padding-bottom: env(safe-area-inset-bottom)` — clears iOS home indicator + Android gesture bar
- `border-top: 2px solid var(--color-navy-900)` — hard content boundary, unmistakably not browser chrome
- Left: `.sticky-bar-call` (flex 3) — navy, phone icon + stacked "Call now" label + "07922 247 999" number + avail-dot
- Right: `.sticky-bar-wa` (flex 2) — `var(--color-whatsapp)` teal, WhatsApp icon + "WhatsApp"
- `@media (min-width: 768px) { #stickyBar { display: none; } }` — hidden on md+
- `body.has-sticky-bar` gets `padding-bottom: calc(58px + env(safe-area-inset-bottom))` on mobile, 0 on md+

**Status:** User has critiques — DO NOT MERGE until next session critique round is addressed.

---

## 3. Deferred tasks (unchanged from last handoff)

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

Sub-pages for direct-access barrister queries. Entity footprint at 2 sources; AI citation threshold is 3+. Spec file: `.project/seo-intent-fix/spec.md` (not yet created).

### TASK 4: llms.txt update for Insights blog

The Insights blog (`/insights`) is merged. `llms.txt` needs the Insights section added.

---

## 4. Files most recently touched

| File | What changed |
|------|-------------|
| `preview/index.html` | `#stickyPill` → `#stickyBar` (on branch `cta-bar`) |
| `app/preview-styles.css` | Pill CSS replaced with bar CSS (on branch `cta-bar`) |
| `content/chrome/header.html` | Police banner (on `main`) |
| `content/sections/home.html` | H1, sub, CTA (on `main`) |

---

## 5. Standing gotchas

- **`cta-bar` branch is NOT on main.** Do not merge without addressing user critiques.
- **Pages CMS writes to `origin/main` directly.** Always `git fetch` + check before push.
- **Precompiled CSS trap.** `app/preview-tailwind.css` is static. Grep before adding Tailwind classes. Custom CSS in `preview-styles.css`.
- **`--color-whatsapp` is `#075E54`** (dark teal) — NOT bright green. Use the token, not a hex.
- **`bg-footer`** is `#232536` — dark page heroes. NOT navy-950 (`#0E1628`).
- **`bg-emergency-500`** is `#C23616` — red, police banner and hero CTA.
- **`avail-dot` is in `preview-styles.css`** — not Tailwind.
- **hero markup is duplicated per fragment** — touching one hero means checking all.

---

## 6. Session start — next session

1. User will give critiques of the `cta-bar` Vercel preview
2. Invoke `frontend-design` before addressing any critique
3. Commit fixes to `cta-bar` and push to update the preview URL
4. Only merge to main once user approves the bar — use `verification-before-completion`

---

## 7. Git state

- **`main`** → `5a153dc` (live — old floating pill still active)
- **`cta-bar`** → `19693db` (pushed to origin, Vercel preview building)
- No other active branches
