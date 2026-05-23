# Session Handoff — 2026-05-23 (post-CRO merge)

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

**`main`** → `4e4385a` (live on astonslaw.com — deployed via Vercel auto-deploy after PR #4 merge)

All CRO work from the previous session is now LIVE:
- Homepage H1: "24/7 Support for arrests, police station interviews, and court summons"
- Sub: "Call before the interview begins. Astons Law Chambers attends police stations across London and the UK at any hour."
- Hero button: red (btn-emergency), no phone icon
- Mobile sticky pill: full-width red call button + 3-dot menu (WhatsApp + Book a call)
- Desktop sticky pill: original white/green pill unchanged
- 13 page titles: visual disruptor brackets

---

## 2. What was done this session

### PR #4 merged — 5 commits:
- `b894264` — title visual disruptors (13 pages)
- `5a61128` — GSC baseline recorded
- `beca865` — CRO: homepage hero rewrite (H1 + sub + red button) — FIRST attempt, not exact
- `07470dd` — CRO: restore proven H1 + remove phone icon (EXACT user copy)
- `24b9735` — CRO: mobile sticky pill 3-dot menu

### The client had zero calls
The pivot from SEO intent cleanup to CRO was driven by the client reporting zero calls. The old
Webflow site's situation-naming H1 converted better. This session restored that pattern.

---

## 3. Tasks for next session

### TASK 1 (deferred SEO sweep): lawyer→barrister

Wait until client confirms calls are coming in from the CRO changes. Then do this sweep.

**`lib/practice-areas.ts`:**
- Line 40: `metaDescription` criminal-defence — "Criminal defence lawyer" → "Criminal defence barrister"
- Line 46: `situation` criminal-defence — "acts as a criminal defence lawyer" → "acts as a criminal defence barrister"
- Line 79: `metaDescription` violent-crimes — remove "from the police station through to Crown Court trial" (dilutes intent)
- Line 85: `situation` violent-crimes — "acts as a criminal defence lawyer" → "acts as a criminal defence barrister"
- Line 128: `situation` youth-crimes — "acts as a criminal defence lawyer" → "acts as a criminal defence barrister"
- Line 202: `situation` drug-offences — "acts as a criminal defence lawyer" → "acts as a criminal defence barrister"

**`content/sections/practice-areas.html` line 6:**
"criminal defence lawyer practice" → "criminal defence barrister practice"

**`content/sections/about.html` line 6:**
"acting as a criminal defence lawyer at every stage" → "acting as a criminal defence barrister at every stage"

**`content/sections/police-station.html`:**
- Line 48: "A criminal defence lawyer attends the station" → "A criminal defence barrister attends"
- Line 62: "A solicitor is not required for police station representation" → remove this line or reframe (it competes in the solicitor SERP)

**`app/police-station-representation/page.tsx`:**
- title: "Police Station Representation [24/7], London" → "Criminal Representation After Arrest [Direct Access], London"
- description: starts with "Criminal defence lawyer" → "Criminal defence barrister"

---

### TASK 2 (after SEO sweep): Direct access cluster

Build a direct-access content cluster as the fastest near-term ranking path (entity footprint
needs to reach 3+ independent sources — currently at 2).

- Spec file: `.project/seo-intent-fix/spec.md` (not yet created)

---

### TASK 3 (after SEO sweep): llms.txt update

Add Insights blog to llms.txt so AI crawlers can discover it.

---

## 4. Standing gotchas

- **Pages CMS writes to `origin/main` directly.** Always `git fetch` + check before push.
- **Precompiled CSS trap.** Only classes already in `preview-tailwind.css` work. Grep before adding.
- **`avail-dot` is in `preview-styles.css`** — not Tailwind. Safe to use, always works.
- **CRO priority over SEO** — client is not getting calls. Confirm calls improving before SEO sweep.

---

## 5. Session start skills (invoke in this order)

1. `cro-2026` — if client reports call volume changes
2. `seo-2026` + `avoid-ai-writing` — for the lawyer→barrister sweep
3. `verification-before-completion` — gate all completions

---

## 6. Git state

- **`main`** → `4e4385a` (live, post PR #4 merge)
- No active feature branches
