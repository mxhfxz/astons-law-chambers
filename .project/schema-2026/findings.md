# Schema 2026 — site-wide consolidation pass

Goal: apply the SAME treatment proven on `layout.tsx` to the rest of the site.
Rules only — no creative control. Allowed change sources: (a) 2026 @id
consolidation (researched + user-approved), (b) a locked user rule correcting a
factual/safety error. Nothing else.

## Audit result (all schema-bearing files)

### Already correct — NO change (reference #organization/#principal/#website via @id)
- `lib/render-practice-area.ts` (PA + sub-PA), `lib/render-guide.ts`,
  `lib/render-insight.ts`
- `app/practice-areas/[slug]/page.tsx`, `.../[subslug]/page.tsx`,
  `app/guides/[slug]/page.tsx`, `app/insights/[slug]/page.tsx`
- `app/authorised-to-conduct-litigation/page.tsx`, `app/legal-aid/page.tsx`,
  `app/police-station-representation/page.tsx`
- Breadcrumb-only pages: `complaints`, `direct-access`, `timescales`
- `insights` + `guides` index pages: no JSON-LD (leave as-is; adding any would
  be creative — not doing it)

### Needs the consolidation fix (inline duplicate LegalService → #organization)
1. `app/about/page.tsx`
   - Person node: add `@id: #principal`; `worksFor` inline → `{ @id: #organization }`
   - serviceJsonLd: 5× `provider` inline → `{ @id: #organization }`
2. `app/fees/page.tsx`
   - serviceJsonLd: `provider` inline LegalService → `{ @id: #organization }`
3. `app/contact/page.tsx`
   - `mainEntity` inline LegalService → `{ @id: #organization }`
   - This also removes the office-hours "General enquiries" ContactPoint
     (opens 09:00) — same safety-baseline removal applied to layout.tsx.
     Emergency 24/7 ContactPoint already lives on #organization.

## Confirmed clean (no fabrication / no marketing / correct legal-aid framing)
- No aggregateRating/review nodes outside layout.
- legal-aid + police-station FAQ already use partner-firm referral framing.
- about Person fields within the safety allowlist.

## NOT touched (copy / not a schema-rule break)
- meta descriptions, FAQ wording, priceRange, phone-number format variants.
