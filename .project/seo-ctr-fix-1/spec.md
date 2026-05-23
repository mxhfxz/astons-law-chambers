# Spec: SEO CTR Fix — Recommendation 1 of 8
# Title Tag Visual Disruptors

**Date:** 2026-05-23
**Branch:** `seo/ctr-titles-2026-05-23`
**Status:** In progress

---

## Problem

Google Search Console shows views (impressions) up after recent CRO and schema branches,
but CTR is down. Cause is unclear ("both / not sure") — could be same queries converting
worse, or new lower-intent queries dragging the average. Either way, title tag CTR
engineering is the highest-leverage, most reversible fix available.

Per the 2026 SEO framework: visual disruptor brackets (`[Direct Access]`, `[24/7]`) increase
CTR by +38% vs identical listings without them. Commercial/transactional queries — which is
most of what this site targets — have only a 4% AI Overview trigger rate, so traditional
SERP listing quality dominates.

## Goal

Add bracket-format visual disruptors to every commercial-intent page title. Measure
CTR on commercial queries in GSC 6–8 weeks after deploy.

## Success metric

CTR on commercial queries (not filtered by impressions average) improves vs the
pre-deploy baseline. Record the baseline in findings.md before merging.

## Scope

Pages getting bracket disruptors (commercial intent, high-value):
- Homepage
- All 7 practice area pages (lib/practice-areas.ts → metaTitle field)
- Police station representation page
- Fees page
- Direct access page
- Legal aid page
- Practice areas index page

Pages NOT changed (non-commercial, low CTR-leverage):
- About, Contact, Complaints, Timescales, Terms, Privacy Policy
- Authorised to Conduct Litigation (has bespoke title structure with `|`)
- Guides, Insights pages (different intent, separate optimisation pass)

## Bracket choices — rationale

| Bracket | Pages | Why |
|---------|-------|-----|
| `[Direct Access]` | All PA pages, direct-access, practice-areas index | Factual (BSB-authorised), differentiates from solicitor firm listings, answers "can I hire a barrister without a solicitor?" |
| `[24/7]` | Police station only | Verified: police station attendance IS 24/7. High urgency signal for emergency search intent. |
| `[Written Quote Upfront]` | Fees | Verified: written client-care letter before any work begins. Trust signal for cost-anxiety queries. |
| `[Referral at No Cost]` | Legal aid | Verified: referral to partner firm at no cost. Addresses the "can I get legal aid?" intent. |

## Constraints

- No bracket on pages where the claim is not 100% verified
- All bracket text must be BSB-compliant and accurate
- Titles stay keyword-first (primary keyword before brand name)
- Keep within ~65 chars for the `%s` portion (template appends ` — Astons Law Chambers`)
- Homepage default title has no template — must be crafted as a complete title

## Files to change

1. `app/layout.tsx` — `metadata.title.default` (homepage)
2. `lib/practice-areas.ts` — `metaTitle` field on each of 7 practice areas
3. `app/police-station-representation/page.tsx` — `metadata.title`
4. `app/fees/page.tsx` — `metadata.title`
5. `app/direct-access/page.tsx` — `metadata.title`
6. `app/legal-aid/page.tsx` — `metadata.title`
7. `app/practice-areas/page.tsx` — `metadata.title`

## What this is NOT

- Not a description change (descriptions are already keyword-first; separate pass if needed)
- Not a content change
- Not a schema change
- Not a redirect change
