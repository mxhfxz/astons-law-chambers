# Session Handoff — 2026-05-24 (Growth Sprint — Week 1 complete, ready to merge)

Read MEMORY.md first, then this file.

**ACTIVE SPRINT:** `.project/growth-sprint-2026-05-23/`
**Full plan:** `.project/growth-sprint-2026-05-23/plan.md`
**Progress log:** `.project/growth-sprint-2026-05-23/progress.md`

---

## APEX RULE — SKILLS FIRST, NO CLAUDE DEFAULTS

Every task routes through the relevant skill FIRST. No exceptions.

Frontend / layout: `frontend-design` → `frontend-dev-guidelines` → implement
CRO / copy: `cro-2026` → `page-cro` → implement
Git / deploy: git skills + `vercel-deployment`
Verification: `verification-before-completion` ← use after every merge
Planning: `project-mgmt`

---

## WHAT TO DO FIRST — NO READING REQUIRED

```
git fetch origin
git checkout growth-t1
npm run build && npm run type-check
```

If both pass: merge `growth-t1` → `main`. Verify live on astonslaw.com.
Then clean up StickyPill dead code (see §3 below), then move to Week 2.

---

## 1. Production state

**`main`** → `d468b4e` (live on astonslaw.com)

### What is LIVE on main

- Mobile: full-bleed 3-button sticky bar (call text + WA icon + book icon, `env(safe-area-inset-bottom)`)
- Desktop: two 48×48 navy circle FABs bottom-right (WA + book)
- Hero: dual-CTA (red call button + "Book a Free Consultation")
- Insights blog at `/insights` (PR #2 merged)
- `StickyPill` export + `content/chrome/sticky-pill.html` still present — dead code, clean up after growth-t1 merge

---

## 2. Pending branch — merge this first

### `growth-t1` → `9998f90`

**Vercel preview:** `https://alc-staging-git-growth-t1-dsgnly.vercel.app`

All Week 1 tasks are complete on this branch:

| Task | What changed |
|------|-------------|
| W1.3 GA4 events | Already wired — `call_click`, `whatsapp_click`, `book_click` confirmed in `SiteBehaviour.tsx` |
| W1.4 lawyer→barrister | 9 instances across `lib/practice-areas.ts`, `app/layout.tsx` (meta + JSON-LD), `app/police-station-representation/page.tsx`, `content/sections/practice-areas.html`, `content/sections/about.html`, `content/sections/police-station.html` |
| W1.5 robots.ts | Explicit allow: `ClaudeBot`, `PerplexityBot`, `OAI-SearchBot`; `llms.txt` already existed and comprehensive |
| W1.6 sitemap.ts | `weekly` for `/` + `/insights`; `yearly` for complaints/terms/privacy-policy |
| Homepage copy | Eyebrow: "Astons Law Chambers · Criminal defence" (dropped "barrister, London"); h2: "Offences covered"; h2: "How Direct Access works" |

**Pre-merge gate:**
- `npm run build` + `npm run type-check` (both passed earlier this session — verify clean again)
- Vercel preview: mobile bar renders, barrister copy on homepage + PA pages, `/robots.txt` shows ClaudeBot allow

---

## 3. Cleanup task (after growth-t1 merge)

**StickyPill dead code** — left over from cta-bar merge:
- `components/site/chrome.tsx`: remove `StickyPill` export (line ~27)
- `content/chrome/sticky-pill.html`: delete file

Do this on `main` directly (tiny cleanup, no branch needed) or fold into first Week 2 branch.

---

## 4. Week 2 plan (next after merge)

**Needs client input — start these conversations NOW if not already started:**

| Ask Ghulam | Why |
|-----------|-----|
| "What can you honestly say about how quickly you reply to WhatsApp?" | WhatsApp trust signal — highest-leverage conversion item |
| "Tell me in your own words: when someone calls you from a police station at 2am, what's the first thing you do?" | Police station page first-person voice — cannot be generated |
| "Which type of direct access client do you get most often?" | Direct access hub lead angle |

Week 2 tasks (full detail in `plan.md`):
- W2.1: Police station page reframe — permission page, not discovery page
- W2.2: WhatsApp trust signal sentence (adjacent to WA CTA)
- W2.3: Direct access hub page (`/direct-access` expansion)
- W2.4: FAQPage schema — evaluate April 2026 Google update before implementing
- W2.5: `definition` field as above-fold answer block on PA pages

---

## 5. Key strategic context

### Three visitor types
| Type | Situation | What they need |
|------|-----------|----------------|
| In crisis | Arrested, custody, court date imminent | Trust velocity — fast enough to call |
| Researching | Voluntary interview, motoring, exploring | Authority — understands my situation |
| Validating | Referred, checking site is legit | Professionalism — looks like a real practice |

### Police station page — reframed
Not a discovery page. A **permission page**. Someone shows it to their partner at midnight to justify calling a barrister instead of the duty solicitor. Must answer: "Why Astons Law Chambers instead of the duty solicitor?"

### FAQPage schema — verify before implementing
April 2026 Google update deprioritised FAQ schema for ranking. Before any schema work: confirm whether it still feeds AI Overviews. Sources: Search Engine Land, Google Search Central, John Mueller posts post-April 2026.

### Click events are the Week 3 replan trigger
No strategy decision after Week 3 without `whatsapp_click` / `call_click` / `book_click` data from GA4. Without it, everything is guessing.

---

## 6. Standing gotchas

- **Pages CMS commits directly to `origin/main`** — always `git fetch` + reconcile before push
- **Precompiled CSS trap** — `app/preview-tailwind.css` is static. Grep before adding Tailwind classes. New CSS goes in `preview-styles.css`
- **`bg-footer` = `#232536`** (dark heroes). NOT `bg-navy-950` (`#0E1628`)
- **Hero markup is duplicated per fragment** — check all heroes when touching one
- **GA4 debug mode** — add `?gtm_debug=true` to verify events in DebugView; test on iOS + Android
- **Curly-quote trap** — Edit tool can introduce curly delimiters (`'`/`'`) in TS strings. If build fails with syntax error on a line you just edited, check byte encoding with Python

---

## 7. Git state

- **`main`** → `d468b4e` (live — CTA bar + insights live)
- **`growth-t1`** → `9998f90` (Week 1 complete — NOT merged to main yet)
- `cta-bar` → deleted
- Insights PR #2 → merged
