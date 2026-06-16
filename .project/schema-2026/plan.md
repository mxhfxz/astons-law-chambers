# Plan — schema-2026 site-wide consolidation

User-approved scope (2026-06-16). NO creative control. Only the edits below.

## Approved edits (exact)
1. about/page.tsx — Person: +`@id:#principal`, worksFor→#organization;
   serviceJsonLd: 5× provider inline→#organization
2. fees/page.tsx — provider inline LegalService→#organization
3. contact/page.tsx — mainEntity inline LegalService→`{@id:#organization}`
   (drops office-hours ContactPoint; emergency lives on #organization)

## Not in scope (do NOT touch)
- Any copy / meta description / FAQ wording / priceRange
- Generator pages + authorised/legal-aid/police-station (already correct)
- index pages (no JSON-LD — do not add)

## Verify
- npm run type-check + npm run build must both pass before done.

## Progress
- [x] about — Person @id:#principal + worksFor→#org; 5× provider→#org
- [x] fees — provider→#org
- [x] contact — mainEntity→{@id:#org}; office-hours ContactPoint dropped
- [x] type-check + build both pass
- [x] swept: 0 inline LegalService outside layout; 0 office-hours blocks
DONE 2026-06-16.
