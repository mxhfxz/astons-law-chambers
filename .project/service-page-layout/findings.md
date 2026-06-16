# Findings — service-page layout

## Architecture (verified 2026-06-09)

- Routes:
  - `app/practice-areas/[slug]/page.tsx` → top-level PA detail
  - `app/practice-areas/[slug]/[subslug]/page.tsx` → sub-practice-area (the "new" pages)
  - Both call into `lib/render-practice-area.ts` → `buildDetailHtml()`.
- `buildDetailHtml(area, parentInfo?)` reads `content/sections/pa-detail.html` and fills
  `data-bind` placeholders. `parentInfo` only adds a 4th breadcrumb level for sub-pages.
  **=> One template drives ~20 pages.** Changing it once changes them all.
- Sub-page data: `lib/sub-practice-areas.ts`, ~10 entries (driving: drink-driving,
  drug-driving, totting-up; violent: gbh, knife-crime, domestic-abuse, robbery; drug:
  possession-with-intent, drug-supply, county-lines). `SubPracticeArea extends PracticeArea`.
- Per-page fields available for the aside/body: `title`, `kicker`, `definition`,
  `situation`, optional `context {eyebrow,title,body}`, `process`/`processProse`,
  `actions`/`actionsProse`, `faqs[]`, `related[]`. No per-page `guides` field → guide
  links in the aside are the same fixed pair police-station uses (shared chrome).

## Key implication

This is **one template-refactor task, not N page tasks.** "Each page becomes like
police-station" is achieved by rewriting the shared template + renderer. Per-page work is
limited to (a) data-variance handling and (b) verification across representative pages.

## pa-detail.html section inventory (current → destination)

| Cur | Section | Current placement | Destination in new layout |
|-----|---------|-------------------|---------------------------|
| Hero | dark split | full-width | unchanged |
| S1 | "What is X" definition+situation | full-width section | main column |
| S1a | context callout (optional) | full-width | main column (bordered card, police-style) |
| S1b | sub-offence grid (parents only) | full-width | stays full-width, BELOW the 2-col body |
| S3 | "Book a consultation" buttons | full-width | folds into aside conversion card |
| S4 | "How a case proceeds" | offwhite band | main column |
| S5 | "The defence" | full-width | main column |
| S6 | dark CTA strip | mid-page dark band | becomes the single final contact strip |
| S7 | FAQ `<dl>` | full-width | main column (bottom) |
| S9 | Direct Access paragraph | full-width bordered top | main column bordered mini callout |

Aside (new, right rail, sticky): conversion card (reuses existing CTA labels + an existing
on-page heading) → "Related areas" (from `related[]`) → "Guides" (fixed pair).

## Constraints recall (from memory)

- `project_preview_tailwind_precompiled` — no JIT; only pre-existing classes. Mirror
  police-station's class set exactly → zero new classes.
- `project_active_stylesheet_2026_05_22` — `app/preview-tailwind.css` + `preview-styles.css`
  are the live CSS. `styles/tokens.css` is vestigial.
- `feedback_no_copy_changes_without_instruction` — layout only; string diff must be empty.
- `feedback_no_alternating_banding` — 2 dark bands total after reflow.
- `feedback_phone_is_primary_kpi` — CTA order phone → WhatsApp → cal.com; preserve
  `data-track` attrs.
- `feedback_no_broken_sites_to_main` — build + type-check + Vercel preview browser check
  before main.

## Open question deferred to implementation

- S3 ("Book a consultation") currently duplicates CTAs already in the hero and the dark
  strip. Folding it into the aside card removes the duplication. If the user wants S3 kept
  as a standalone body section too, that is a one-line add — confirm during review, not a
  blocker.
