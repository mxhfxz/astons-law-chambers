# Session Handoff — 2026-05-23 (CRO sprint complete)

Read MEMORY.md first, then this file.

---

## APEX RULE — SKILLS FIRST, NO CLAUDE DEFAULTS

Every task routes through the relevant skill FIRST. No exceptions.

SEO / content: `seo-2026` → `avoid-ai-writing` → implement
CRO / copy / conversion: `cro-2026` → `page-cro` → implement
Frontend / layout: `project-mgmt` → `frontend-design` → `frontend-dev-guidelines`
Git / deploy: git skills + `vercel-deployment`
Verification: `verification-before-completion`

---

## 1. Production state

**`main`** → `4196451` (live on astonslaw.com — all commits below are deployed)

All the following are LIVE:

### Homepage hero
- H1: `24/7 Support for arrests, police station interviews, and court summons`
- Sub: `Call before the interview begins. Astons Law Chambers attends police stations across London and the UK at any hour.`
- CTA: red `btn-emergency` button, no phone icon, reads "Call 07922 247 999"

### Site header
- Red police station banner is the **first row** of the sticky header (above the white navbar)
- Order: red banner → white navbar with logo + nav
- The mega menu and mobile menu are unchanged

### Mobile sticky pill (below `sm:`)
- Full-width navy (`bg-navy-950`) call button, white semibold text, "Call 07922 247 999 now", floating shadow
- White circle 3-dot button (44×44px), `#f9f9f9` border outline, subtle ring shadow
- 3-dot opens an upward `<details>` dropdown with:
  1. Book an appointment → cal.com
  2. Message on WhatsApp → wa.me
  3. Send an email → `info@astonslaw.com`

### Desktop sticky pill (sm: and up)
- Unchanged: white call button with avail-dot + green WhatsApp button in dark navy container

### 13 page titles
- Visual disruptor brackets added to all commercial pages (commit `b894264`)

---

## 2. Commits this session (all on main)

```
4196451  cro(pill): navy call button + white circle dots with f9f9f9 outline
039d7e5  feat: police banner above navbar + pill 'now' + circle dots
317a75a  cro(pill): white floating call btn + grey 3-dot upward dropdown
24b9735  cro(pill): mobile full-width call button + 3-dot menu
07470dd  cro(hero): restore proven H1 + strip 'first call free' + remove phone icon
beca865  cro: rewrite homepage hero for call conversion
5a61128  docs(seo): record GSC baseline + critical finding on query intent mismatch
b894264  seo(ctr): add visual disruptor brackets to all commercial page titles
```

---

## 3. Deferred tasks — do AFTER client confirms call volume improving

### TASK 1: SEO lawyer→barrister sweep

**Rationale:** The site currently appears in solicitor SERPs, not barrister SERPs, because "lawyer" is the entity signal in key copy. This is the highest-leverage SEO task after CRO stabilises.

**`lib/practice-areas.ts`:**
- Line 40: `metaDescription` criminal-defence → "Criminal defence lawyer" → "Criminal defence barrister"
- Line 46: `situation` criminal-defence → "acts as a criminal defence lawyer" → "acts as a criminal defence barrister"
- Line 79: `metaDescription` violent-crimes → remove "from the police station through to Crown Court trial" (dilutes intent)
- Line 85: `situation` violent-crimes → "acts as a criminal defence lawyer" → "acts as a criminal defence barrister"
- Line 128: `situation` youth-crimes → "acts as a criminal defence lawyer" → "acts as a criminal defence barrister"
- Line 202: `situation` drug-offences → "acts as a criminal defence lawyer" → "acts as a criminal defence barrister"

**`content/sections/practice-areas.html` line 6:**
"criminal defence lawyer practice" → "criminal defence barrister practice"

**`content/sections/about.html` line 6:**
"acting as a criminal defence lawyer at every stage" → "acting as a criminal defence barrister at every stage"

**`content/sections/police-station.html`:**
- Line 48: "A criminal defence lawyer attends the station" → "A criminal defence barrister attends"
- Line 62: "A solicitor is not required for police station representation" → remove or reframe (competes in solicitor SERP)

**`app/police-station-representation/page.tsx`:**
- title: "Police Station Representation [24/7], London" → "Criminal Representation After Arrest [Direct Access], London"
- description: "Criminal defence lawyer representation" → "Criminal defence barrister representation"

---

### TASK 2: Police station page reframe (after Task 1)

The police station SERP is 100% solicitor firms. The page is structurally unwinnable for barrister search terms without a full reframe to "direct access barrister after arrest" framing.

---

### TASK 3: Direct access content cluster

Build sub-pages targeting the direct-access barrister queries — the fastest near-term ranking path. Entity footprint currently at 2 sources; AI citation threshold is 3+.

Spec file: `.project/seo-intent-fix/spec.md` (not yet created — do this as first step)

---

### TASK 4: llms.txt update for Insights blog

The Insights blog (`/insights`) launched in the previous session (PR #2, merged). The `llms.txt` file at the domain root needs updating to include the Insights section so AI crawlers discover it.

---

## 4. Files most recently touched (verify before editing)

| File | What changed |
|------|-------------|
| `content/chrome/sticky-pill.html` | Complete mobile pill redesign; desktop unchanged |
| `content/chrome/header.html` | Police banner moved to top (first child of `<header>`) |
| `content/sections/home.html` | H1, sub, removed phone icon from CTA |
| `app/preview-styles.css` | `.pill-call`, `.pill-dots`, `.pill-menu`, `.pill-menu-item`, WebKit marker fix |

---

## 5. Standing gotchas

- **Pages CMS writes to `origin/main` directly.** Always `git fetch` + check before push.
- **Precompiled CSS trap.** `app/preview-tailwind.css` is static. Only classes already in it work. Grep before adding any new Tailwind class. Custom CSS goes in `preview-styles.css`.
- **`avail-dot` is in `preview-styles.css`** — not Tailwind. Safe to use.
- **`<details>` summary marker** — `list-none` handles Firefox; `.list-none::-webkit-details-marker { display: none }` rule is now in `preview-styles.css`.
- **`bg-navy-950`** is `#0E1628` — the dark brand navy, used in pill call button and logo.
- **`bg-emergency-500`** is `#C23616` — the red used in the police banner and hero CTA.
- **`bg-footer`** is `#232536` — used for dark page heroes. NOT the same as navy-950.
- **CRO priority over SEO** — confirm call volume improving before starting SEO sweep.

---

## 6. Session start skills (invoke in this order)

1. `cro-2026` — if client reports on call volume
2. `seo-2026` + `avoid-ai-writing` — when starting the lawyer→barrister sweep
3. `frontend-design` + `frontend-dev-guidelines` — for any UI work
4. `verification-before-completion` — gate all completions

---

## 7. Git state

- **`main`** → `4196451` (live, all CRO changes deployed)
- No active feature branches
- Next branch to create: `seo/intent-fix-2026-05-23` for the lawyer→barrister sweep
