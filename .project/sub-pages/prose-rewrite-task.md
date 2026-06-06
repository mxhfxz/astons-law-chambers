# Task — Prose rewrite of all PA & sub-pages (research-driven)

**Standalone task doc. Not a session handoff.** Scope: rewrite every practice-area
and sub-page from thin bullet content into properly written prose, grounded in
fresh legal research. Created 2026-06-06. Branch: `sub-pages`.

---

## Why this exists

The PA/sub-pages currently read as AI-generated: terse bullet lists, thin detail.
User verdict (2026-06-06): *"horribly written… screams AI from a mile away… no more
bullet points."* The fix is real research → properly written prose.

## Status

**Drafted and pushed to `sub-pages` for preview review (2026-06-06). Not merged.**
- Dossier received and saved: `.project/sub-pages/gemini-research-output.md` (extracted from the client's PDF).
- All 19 PA/sub pages + `police-station-representation` rewritten. See "Session 2026-06-06" at the foot of this doc for the locked copy rules — read those before touching any of this copy again.
- Original (now historical): Gemini Deep Research prompt at `.project/sub-pages/gemini-research-prompt.md`.

## Inputs for the rewrite

1. **Legal substance** → the Gemini dossier (law, procedure, consequences, FAQs, sources). England & Wales, 2026, BSB-compliant.
2. **Practice facts** → `verified_facts` memory ONLY (Astons / Ghulam details — never from the web).
3. **Voice** → `avoid-ai-writing` skill + project voice memories (`feedback_natural_voice`, `feedback_no_marketing_speak`, `feedback_no_portrait_minimal_name`).

## Pages in scope (9 parents + 10 sub-pages = 19)

| Level | Slug | Data location |
|-------|------|---------------|
| Parent | criminal-defence, violent-crimes, youth-crimes, driving-offences, drug-offences, appeals, inquests, fraud, sexual-offences | `lib/practice-areas.ts` |
| Sub (driving) | drink-driving, drug-driving, totting-up | `lib/sub-practice-areas.ts` |
| Sub (violent) | gbh, knife-crime, domestic-abuse, robbery | `lib/sub-practice-areas.ts` |
| Sub (drug) | possession-with-intent, drug-supply, county-lines | `lib/sub-practice-areas.ts` |

Special tone notes: **inquests** = bereaved family, not a defendant. **sexual-offences** = accused of a serious offence, anonymity/safeguarding. **youth-crimes** = under-18, reporting restrictions.

## Where content lives (files to edit)

- `lib/practice-areas.ts` — parent PA objects (incl. fraud, sexual-offences).
- `lib/sub-practice-areas.ts` — the 10 sub-page objects (`SubPracticeArea extends PracticeArea`).
- `content/sections/pa-detail.html` — shared template for all 19 pages.
- `lib/render-practice-area.ts` — server-side fill (`buildDetailHtml`, the `setVal`/replace logic).

Per-page fields: `definition`, `situation` (prose), `processHeading`/`processProse[]` (S4) and `actionsHeading`/`actionsProse[]` (S5) — the prose that replaced the old `actions`/`process` bullet lists — `faqs[]`, `context{eyebrow,title,body}`, `cardSummary`, meta. (Decided: **Option B** — new prose fields; see the Session 2026-06-06 section. The legacy `actions`/`process` arrays remain only as a render fallback and are now dead data.)

## Rules for the writing

The **authoritative copy rules are in the "Session 2026-06-06 → Copy rules" section** at the foot of this doc (lead-gen, no claims/promises about the service, no taglines in body, conceptual-only legal substance, name never in a hero). The rules below are the orthogonal constraints that still stand:

- **BSB compliance.** No outcome guarantees. Accurate barrister/solicitor + court distinctions.
- **No fabricated facts.** Conceptual only — no statutory section numbers, case citations, or figures. Every `⚠ VERIFY` / `[FLAG]` item stays out of copy until the user signs off.
- **WCAG AA** body text (`text-navy-700`). No raw hex, no inline styles, tokens only.
- This rewrite IS sanctioned new copy (user-directed). The prose must trace to the research + verified facts, not invention.

## Do NOT

- Do NOT merge `sub-pages` → `main`. The user gates merge on their own preview review.
- Do NOT ship any unverified legal specific (section number / citation / sentencing figure).
- Do NOT reintroduce bullet/number lists for the page body.
- Do NOT source Astons/Ghulam facts from the web — `verified_facts` only.

## Current code state (for cold start)

The prose rewrite is drafted and pushed on `sub-pages`; structural work was already done (grid, schema, sitemap, About page Background+Credentials, robots.txt, testimonials omitted). The remaining gate before merge is the **user's preview review** of the rewritten copy. Latest preview: `alc-staging-git-sub-pages-dsgnly.vercel.app`.

---

## Session 2026-06-06 — decisions locked & work done

**Read this whole section before editing any of this copy again. The user corrected the copy register hard, three times. Do not improvise.**

### Decisions taken (all confirmed by the user in-session)

1. **Scope:** the 19 PA/sub pages **+ `police-station-representation`**. The two guides are out of scope — do NOT touch them.
2. **Data model: Option B.** New optional fields on `PracticeArea`: `processHeading`, `processProse: string[]`, `actionsHeading`, `actionsProse: string[]`. Template `pa-detail.html` S4/S5 render these as `<p>` paragraphs; legacy `actions`/`process` arrays kept only as a render fallback (now unused on every page). Render logic in `lib/render-practice-area.ts`.
3. **Legal specifics: conceptual only.** No statutes named, no section numbers, no figures (limits, thresholds, ban lengths, sentence maxima, time limits). Every `⚠ VERIFY` / `[FLAG]` item held out of copy. The dossier's sourced specifics were NOT used, by user choice.

### Copy rules (the hard ones — see memory `feedback_pa_copy_lead_gen_no_claims`)

- **Lead-gen, not an essay.** Every sentence is either legal information the defendant needs, or it earns its place. No hedging, no philosophy, no self-undermining asides (the user killed the line *"No barrister can promise a result, and you should be wary of any who does…"*).
- **No promises or claims about the client or the service — BSB disbarment risk.** Do NOT write what the defence "will do for you", outcomes, superiority, or unverified availability. Body prose describes the law/process in the **third person**. Astons is not the subject of body sentences.
- **`provides police station support at any hour`** — the only approved availability wording. NEVER "attends".
- **No taglines in body.** Conversion is handled by the page's existing CTA buttons (hero call/WhatsApp/book, booking block, contact strip), not by lines in the prose. The previously-invented `The first call is free — call 07922 247 999` per-page taglines were all removed.
- **Style reference:** `25bedfordrow.com` (tight, authority-led) and `jdspicer.co.uk` (consequence-then-contact) — emulate the structure, NOT their marketing-speak / rhetorical questions / outcome claims.
- Standard voice rules still apply: no rhetorical questions, no rule-of-three, no hollow intensifiers, no em-dash maximalism (`avoid-ai-writing`).

### Site-wide copy changes made this session (beyond the 20 pages)

- **Parent PA lead line** (S1 body, below the fold, all 6 parents that had the old "acts as a criminal defence lawyer and barrister" opener — criminal-defence, violent-crimes, youth-crimes, driving-offences, drug-offences, appeals): set to the user's exact wording —
  *"Astons Law Chambers serves as the entity acting as criminal defence support provided by Barrister Ghulam Humayun."*
- **CTA microcopy site-wide:** `The first call is free` → **`For immediate support, call 07922 247 999 now`** across home, fees, contact, legal-aid, direct-access, guides, the two guide pages, insights index + post, the insight markdown, 404, and the police-station hero (13 files). Variants with trailing clauses / a preceding number were adapted.
- **Name placement rule (memory `feedback_no_portrait_minimal_name`, updated):** "Ghulam Humayun" must **never appear in a hero / above the fold** (racial-profiling concern). In the page body it is fine. Portrait still banned everywhere.

### Open / not done

- Pages are drafted but **awaiting the user's preview review**. Not merged.
- Legacy `actions`/`process` arrays are now dead data on every entry — a future cleanup could delete them and make the fields non-optional once the rewrite is signed off.
- Meta descriptions retain the `Call 07922 247 999` CTA (restored after a cleanup script clipped them).
