# Plan — service-page layout: match police-station "below the hero"

**Phase:** implement
**Branch:** `sub-pages` (already current; new work continues here)
**Spec:** `spec.md` · **Findings:** `findings.md`

## Approach

One shared template drives all ~20 practice-area pages, so this is a **single
template + renderer refactor**, verified across representative pages — not page-by-page
content work. Mirror `police-station.html`'s below-hero structure (2-column main + sticky
aside + one final dark strip) inside `pa-detail.html`, populated by `render-practice-area.ts`
from existing data only. No copy authored or changed.

The safety spine of the whole task: **capture every rendered page's text BEFORE any edit,
diff AFTER, require the diff to be empty.** That is what proves "no information changed."

## Skill routing (per project hard rule — invoke before each phase's work)

- Layout / template / CSS work → `frontend-design`, `frontend-dev-guidelines`
- After each component/template change → `code-reviewer` subagent
- Before claiming done → `verification-before-completion`
- Branch/preview/merge → git skills + `vercel-deployment`

---

### Phase 0: Baseline & safety net
- [ ] 0.1: Confirm clean working tree on `sub-pages`; note the IndexNow workflow edit from
      the prior task is unrelated and should not be bundled into this branch's commits.
  - Files: (none) · Depends: none
- [ ] 0.2: Render the site locally (`npm run build` or dev) and snapshot the **visible text**
      of every PA + sub-page to `.project/service-page-layout/text-before/` (one file per
      route; strip tags, keep text nodes + button labels + alt). This is the copy-diff
      baseline.
  - Files: text-before/*.txt · Depends: 0.1
- [ ] 0.3: Inventory every utility class used in `police-station.html` and confirm each is
      already present in the precompiled bundle (`app/preview-tailwind.css`). Record the
      allowed class set in findings.md. No class outside this set may be introduced.
  - Files: findings.md · Depends: none

### Phase 1: Template restructure — `content/sections/pa-detail.html`
Invoke `frontend-design` + `frontend-dev-guidelines` first.
- [ ] 1.1: Keep the hero block exactly as-is (finalised 2026-05-31). All changes are below
      the hero.
  - Files: content/sections/pa-detail.html · Depends: 0.2
- [ ] 1.2: Replace the stacked full-width sections with the police-station shell: one
      `max-w-wide mx-auto px-6 py-16 md:py-20` wrapper containing
      `grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16`.
  - Files: pa-detail.html · Depends: 1.1
- [ ] 1.3: **Main column** (`lg:col-span-2 space-y-12`): move S1 (definition+situation),
      S4 (process), S5 (defence), the optional context callout, the Direct-Access mini, and
      S7 FAQ into it — each as a `<section>`/bordered card mirroring police-station markup.
      Preserve every `data-bind` placeholder and text string verbatim.
  - Files: pa-detail.html · Depends: 1.2
- [ ] 1.4: **Aside** (`lg:sticky lg:top-28 self-start space-y-6`): build from existing
      strings only — (a) conversion card reusing an existing on-page heading +
      Call/WhatsApp/Book buttons with their current labels and `data-track` attrs;
      (b) "Related areas" list bound to `related[]`; (c) "Guides" list = the same two guide
      links police-station uses. Add a NEW `data-bind="aside-related"` hook for the renderer.
  - Files: pa-detail.html · Depends: 1.2
- [ ] 1.5: Move the sub-offence grid placeholder (`data-bind="subpages"`) to render
      full-width **below** the 2-col body (parents only — already conditional).
  - Files: pa-detail.html · Depends: 1.2
- [ ] 1.6: Keep exactly ONE dark contact strip as the final section (relocated S6), matching
      police-station's final strip position. Remove the mid-page dark band so banding =
      hero + final only. CTA labels/links preserved.
  - Files: pa-detail.html · Depends: 1.2

### Phase 2: Renderer — `lib/render-practice-area.ts`
Invoke `frontend-dev-guidelines` first.
- [ ] 2.1: Update `buildDetailHtml()` for the new `data-bind` hooks (e.g. `aside-related`).
      The existing `related[]` rendering moves into the aside list; reuse the same
      link markup. No copy literals added in code.
  - Files: lib/render-practice-area.ts · Depends: 1.4
- [ ] 2.2: Graceful collapse: when `related[]` is empty AND no other aside content exists,
      emit no aside and let the main column fall back to a constrained single column
      (`max-w-3xl`) so there is no empty right rail. Verify the grid degrades cleanly.
  - Files: lib/render-practice-area.ts · Depends: 2.1
- [ ] 2.3: Confirm sub-page path (`parentInfo` branch) and the inquests audience/title
      variants still fill correctly through the new template.
  - Files: lib/render-practice-area.ts · Depends: 2.1

### Phase 3: Verification (no broken sites to main)
Invoke `verification-before-completion`.
- [ ] 3.1: Re-snapshot visible text to `text-after/`; `diff -r text-before text-after` MUST
      be empty. Any non-empty diff = copy violation → revert that change. [GATE]
  - Files: text-after/*.txt · Depends: 2.3
- [ ] 3.2: `npm run build` && `npm run type-check` pass.
  - Depends: 2.3
- [ ] 3.3: Grep the built output / template to confirm no police-station-specific microcopy
      leaked onto service pages, and no new Tailwind class outside the 0.3 allow-set.
  - Depends: 3.2
- [ ] 3.4: Push `sub-pages`; on the Vercel `alc-staging` preview, real-browser check
      desktop + mobile across: driving-offences (parent w/ sub-grid), drink-driving (sub),
      a context-less page, inquests. Right rail filled; mobile stacks; CTAs work.
  - Depends: 3.2
- [ ] 3.5: Run `code-reviewer` subagent on `pa-detail.html` + `render-practice-area.ts`.
  - Depends: 3.2

### Phase 4: Close
- [ ] 4.1: Update `.project/SESSION-HANDOFF.md` with what changed + verification evidence.
- [ ] 4.2: Commit (layout-only message). Do NOT push to `main` or open PR unless the user
      asks — `sub-pages` is the working branch.

## Validation criteria (definition of done)
1. text-before vs text-after diff is empty (proves zero copy change).
2. build + type-check green; no new Tailwind classes.
3. Vercel preview: 2-col filled layout on all 4 representative pages, desktop + mobile.
4. No police-station-specific strings on service pages.
5. code-reviewer clean.

## Risks
- **Copy drift via "tidying".** Mitigation: the 3.1 text diff gate; copy is read-only.
- **Empty aside re-creating emptiness** on thin pages. Mitigation: 2.2 collapse.
- **A class not in the precompiled bundle silently does nothing.** Mitigation: 0.3
  allow-set + 3.3 grep; reuse police-station classes verbatim.
- **Bundling the unrelated IndexNow edit.** Mitigation: 0.1 — keep commits separate.
