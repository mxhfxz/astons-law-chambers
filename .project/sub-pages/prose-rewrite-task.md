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

**Not started. Blocked on Gemini research.**
- Gemini Deep Research prompt is written: `.project/sub-pages/gemini-research-prompt.md`.
- Next action (user): run that prompt in Gemini, paste the dossier back.
- Save the returned dossier to `.project/sub-pages/gemini-research-output.md` before writing begins.

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

Per-page fields today: `definition`, `situation` (prose, rendered), `actions: string[]` (→ `<ul>`), `process: string[]` (→ `<ol>`), `faqs[]`, `context{eyebrow,title,body}`, `cardSummary`, meta. Definition + situation + context already render as prose; **actions and process are the bullet/number lists that must become prose.**

## The core change: bullets → prose

Decide at start of next session (design decision):
- **Option A** — repurpose `actions`/`process` to prose: change the type from `string[]` to a prose `string` (or a small set of paragraph strings), update the template (`<ul data-bind="actions">` → prose block, `<ol data-bind="process">` → prose block) and `render-practice-area.ts` accordingly.
- **Option B** — add new prose fields (e.g. `actionsProse`, `processProse`) and retire the list fields in the template.

Option A is cleaner (no dead fields). Either way it is a **template + data-model change** affecting all 19 pages — plan it and get sign-off before editing (EnterPlanMode).

## Non-negotiable rules for the writing

- **BSB compliance.** No outcome guarantees. Accurate barrister/solicitor + court distinctions. Indicative fee + VAT transparency applies to motoring (driving) work.
- **No fabricated facts.** No statutory section numbers, case citations, or sentencing figures unless the Gemini dossier sourced them to a current official source AND the user confirms. Hold every `⚠ VERIFY` item OUT of the copy until the user signs off.
- **Voice.** No marketing speak, no rhetorical questions, no rule-of-three, no hollow intensifiers, no em-dash maximalism. Entity-first ("Astons Law Chambers" as subject); minimise "Ghulam". Run the draft through `avoid-ai-writing` and do the second-pass audit.
- **Flag operational claims with 🚩** before writing (availability, "first call free", response times, police-station hours).
- **WCAG AA** body text (`text-navy-700`). No raw hex, no inline styles, tokens only.
- This rewrite IS sanctioned new copy (user-directed). Normal copy-read-only rule does not block it — but the prose must trace to the research + verified facts, not invention.

## Workflow (next session)

1. Read this doc + `gemini-research-prompt.md` + the pasted `gemini-research-output.md`.
2. Resolve the bullets→prose data-model decision (Option A/B) via EnterPlanMode; get sign-off.
3. Rewrite one page (or one small batch) at a time: parent areas first, then sub-pages. Per page: definition, the stakes (situation), how a case runs, the substance of the defence (was `actions`), process as prose, FAQs.
4. `avoid-ai-writing` pass + voice check on each page before moving on.
5. Build + type-check + grep built HTML (no stray `>—<`, prose renders) per page.
6. Push branch, user reviews on `alc-staging-git-sub-pages` preview.

## Open decisions to confirm with user

- **Scope:** include `police-station-representation` and the two guides in the research/rewrite, or keep to these 19? (Asked end of 2026-06-06 session — unanswered.)
- **Bullets→prose data model:** Option A vs B above.
- **`⚠ VERIFY` handling:** confirmed — hold flagged items out of copy until user verifies.

## Do NOT

- Do NOT merge `sub-pages` → `main`. User gates merge on their own review; pages are not launch-ready until rewritten.
- Do NOT ship any unverified legal specific (section number / citation / sentencing figure).
- Do NOT reintroduce bullet/number lists for the page body.
- Do NOT source Astons/Ghulam facts from the web — `verified_facts` only.

## Current code state (for cold start)

All structural work is done and pushed on `sub-pages` (grid, schema, sitemap, situation/process/context restored, About page Background+Credentials, robots.txt, testimonials omitted). The ONLY remaining work before merge is this prose rewrite. Latest preview: `alc-staging-git-sub-pages-dsgnly.vercel.app`.
