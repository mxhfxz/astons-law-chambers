# Plan: SEO CTR Fix — Recommendation 1
# Title Tag Visual Disruptors

**Phase:** Implement
**Branch:** `seo/ctr-titles-2026-05-23`

---

## Title changes (before → after)

### Homepage (app/layout.tsx, metadata.title.default)
BEFORE: `Astons Law Chambers — Criminal Defence Barrister, London`
AFTER:  `Criminal Defence Barrister [Direct Access] — London | Astons Law Chambers`

Note: keyword-first. Brand moved to end. Direct Access bracket near front.
Rendered length: ~74 chars (Google desktop shows ~60-70; keyword + bracket show before truncation).

### Practice area pages (lib/practice-areas.ts, metaTitle field)
Template appends ` — Astons Law Chambers`. Values below are the %s portion.

| slug | BEFORE | AFTER |
|------|--------|-------|
| criminal-defence | `Criminal Defence Barrister, London` | `Criminal Defence Barrister [Direct Access], London` |
| violent-crimes | `Violent Crime Barrister, London` | `Violent Crime Barrister [Direct Access], London` |
| youth-crimes | `Youth Crime Barrister, London` | `Youth Crime Barrister [Direct Access], London` |
| driving-offences | `Driving Offence Barrister, London` | `Driving Offence Barrister [Direct Access], London` |
| drug-offences | `Drug Offence Barrister, London` | `Drug Offence Barrister [Direct Access], London` |
| appeals | `Criminal Appeals Barrister, London` | `Criminal Appeals Barrister [Direct Access], London` |
| inquests | `Inquest Barrister, London` | `Inquest Barrister [Direct Access], London` |

### Static pages (app/*/page.tsx, metadata.title)

| page | BEFORE | AFTER |
|------|--------|-------|
| police-station-representation | `Police Station Representation` | `Police Station Representation [24/7], London` |
| fees | `Barrister Fees & Legal Aid` | `Criminal Defence Fees [Written Quote Upfront]` |
| direct-access | `Direct Access to a Barrister` | `Direct Access to a Barrister [No Solicitor Needed]` |
| legal-aid | `Criminal Legal Aid in London` | `Criminal Legal Aid in London [Referral at No Cost]` |
| practice-areas | `Criminal Defence Services` | `Criminal Defence Services [Direct Access], London` |

---

## Implementation steps

1. `git fetch origin` — reconcile before branching (Pages CMS may have pushed to main)
2. `git checkout -b seo/ctr-titles-2026-05-23` from current main
3. Edit `app/layout.tsx` — update `metadata.title.default`
4. Edit `lib/practice-areas.ts` — update `metaTitle` on all 7 areas
5. Edit `app/police-station-representation/page.tsx`
6. Edit `app/fees/page.tsx`
7. Edit `app/direct-access/page.tsx`
8. Edit `app/legal-aid/page.tsx`
9. Edit `app/practice-areas/page.tsx`
10. `npm run build` — verify 28/28 static pages, 0 errors
11. `npm run type-check` — verify 0 errors
12. Commit with message that documents what changed and why
13. Push branch → Vercel preview
14. Real-browser check on preview URL: spot-check homepage + 2 PA pages
15. Merge to main after verification
16. Update SESSION-HANDOFF.md

---

## Measurement baseline (fill before merge)

Record current GSC numbers here so the 6-8 week post-deploy delta is calculable.
Get from GSC dashboard → Search Results → filter last 28 days.

| Metric | Value | Date |
|--------|-------|------|
| Total clicks | — | 2026-05-23 |
| Total impressions | — | 2026-05-23 |
| Overall CTR | — | 2026-05-23 |
| CTR for "criminal defence barrister" | — | 2026-05-23 |
| CTR for "barrister london" | — | 2026-05-23 |
| CTR for "police station barrister" | — | 2026-05-23 |

---

## Revert

`git revert <commit-hash>` or `git restore app/layout.tsx lib/practice-areas.ts app/*/page.tsx`
No data loss. Titles are strings only.

---

## Next recommendation (after this ships)

Recommendation 2: Update `llms.txt` when PR #2 (insights CMS) merges.
Spec will live in `.project/seo-ctr-fix-2/`.
