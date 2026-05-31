# Sub-page Content Plan

**Phase:** Content research → findings  
**Status:** In progress — findings.md has all 12 pages  
**Next phase:** Implementation (create routes + wire TypeScript data)

---

## Decisions locked this session

- **URL structure:** Nested — `/practice-areas/[parentSlug]/[subSlug]`
- **Template:** Reuse existing `pa-detail.html` for all 10 sub-pages
- **Data split:** 10 sub-pages → new `lib/sub-practice-areas.ts`; 2 new top-level PAs → append to existing `lib/practice-areas.ts`

---

## Data architecture (for implementation session)

Sub-pages extend `PracticeArea` with one extra field:

```ts
export interface SubPracticeArea extends PracticeArea {
  parentSlug: string
}
```

Routing: `app/practice-areas/[category]/[slug]/page.tsx` — reads from `subPracticeAreas`, matches on `parentSlug === category && slug === slug`.

New top-level PAs (fraud, sexual-offences): added to `practiceAreas` array in `lib/practice-areas.ts`. Routes already handled by existing `app/practice-areas/[slug]/page.tsx`.

---

## Page list

### Sub-pages (nested URL, new lib file)

| # | Title | Parent | Slug |
|---|-------|--------|------|
| 1 | Drink Driving | driving-offences | drink-driving |
| 2 | Drug Driving | driving-offences | drug-driving |
| 3 | Totting Up | driving-offences | totting-up |
| 4 | GBH Defence | violent-crimes | gbh |
| 5 | Knife Crime | violent-crimes | knife-crime |
| 6 | Possession with Intent | drug-offences | possession-with-intent |
| 7 | Drug Supply | drug-offences | drug-supply |
| 8 | County Lines | drug-offences | county-lines |
| 9 | Domestic Abuse | violent-crimes | domestic-abuse |
| 10 | Robbery | violent-crimes | robbery |

### New top-level PAs (flat URL, append to practice-areas.ts)

| # | Title | Slug |
|---|-------|------|
| 11 | Fraud & Financial Crime | fraud |
| 12 | Sexual Offences | sexual-offences |

---

## Content rules applied throughout

- Definitions: 40–60 words, answer-first, entity-free, AEO-citable
- No statutory section numbers
- No specific sentencing figures — Sentencing Council guideline referenced by existence only
- 🚩 Operational claims flagged in findings.md where they appear
- Page titles use "Criminal Defence" variants — "barrister" never appears in frontend copy
- FAQs: questions phrased as real defendant searches, answers declarative
- Each page ends with a phone CTA (via the template's final contact strip)

---

## Implementation checklist (next session)

- [ ] Create `lib/sub-practice-areas.ts` with `SubPracticeArea` interface + 10 objects from findings.md
- [ ] Append fraud and sexual-offences to `lib/practice-areas.ts`
- [ ] Create `app/practice-areas/[category]/[slug]/page.tsx` — renders sub-pages
- [ ] Add breadcrumb (Home → Defence work → [Parent PA] → [Sub-page title])
- [ ] Add sub-page links to parent PA pages (`related` or a new `subPages` array)
- [ ] Schema: BreadcrumbList + Service + FAQPage per sub-page (follow schema/ pattern)
- [ ] Sitemap: add all 12 new URLs
- [ ] Build + type-check before pushing to staging

---

## Schema notes (for implementation)

Sub-pages each get:
- BreadcrumbList (3 levels: Home → Defence work → [Parent PA] → [Page title])
- Service (nested under parent LegalService)
- FAQPage (GEO signal, not rich results)
- Do NOT repeat global LegalService/Person/WebSite — those live in layout.tsx
