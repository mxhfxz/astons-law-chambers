# Findings: SEO CTR Fix — Recommendation 1

## GSC baseline — recorded 2026-05-23, last 28 days

| Metric | Value |
|--------|-------|
| Total clicks | 83 |
| Total impressions | 27,200 |
| Average CTR | 0.3% |
| Average position | 18.1 |

### Top queries by clicks (pre-merge)

| Query | Clicks | Impressions | CTR |
|-------|--------|-------------|-----|
| astons law | 14 | 29 | 48.3% |
| ghulam humayun | 2 | 22 | 9.1% |
| criminal defence solicitor | 1 | 557 | 0.18% |
| criminal defence lawyers | 1 | 262 | 0.38% |
| legal aid solicitors near me | 1 | 85 | 1.18% |
| legal aid criminal solicitors | 1 | 72 | 1.39% |
| crime solicitors london | 1 | 37 | 2.7% |
| police misconduct lawyers | 1 | 30 | 3.3% |
| criminal law firms in london | 1 | 29 | 3.4% |
| criminal legal aid solicitors london | 1 | 15 | 6.7% |

Total query count: 1,000

### CRITICAL FINDING — query intent mismatch

The top impression queries are ALL solicitor/lawyer terms, not barrister terms.
"Criminal defence solicitor" alone has 557 impressions (2% of all impressions)
with 1 click = 0.18% CTR. This is a structural CTR floor — no title change
fixes the intent mismatch between "solicitor" searchers and a barrister listing.

Average position 18.1 = page 2 for most queries. Page-2 CTR is 0.5–1% even
for exact-intent matches. The 0.3% overall CTR is logical given this position.

**What the title tag change does and does not fix:**
- DOES: signals "barrister, not solicitor" via [Direct Access] / [No Solicitor Needed]
  → reduces wasted impressions from solicitor-intent users who scroll past
  → may improve click quality (barrister-intent users who do see it, click)
- DOES NOT: fix page-2 average position (the deeper authority problem)
- DOES NOT: fix solicitor-intent queries appearing in our impression pool

**Branded query performance is excellent:**
- "astons law" 14/29 = 48% CTR ✅ (brand recognition strong)
- "ghulam humayun" 2/22 = 9% CTR ✅

### Strategic implication for the SEO roadmap

The low CTR is a symptom of two separate problems:
1. **Solicitor-intent query pollution** — site appears for ~solicitor~ queries at low positions
   → Recommendations 1 (title brackets) helps signal this is a barrister listing
   → Recommendations 3-5 (GEO content, guides, practitioner voice) help rank for
      *barrister* queries where we want to appear
2. **Page 2 average position** — authority is not high enough for page 1 on most queries
   → Content cluster depth (recommendations 3, 5) is the primary lever here
   → Schema / GEO signals (recommendations 6-7) support this over time

The 0.3% CTR will not materially improve until the site ranks on page 1 for
barrister-intent queries. Title tags are necessary but not sufficient.

**Note on data split:** The user confirmed the last ~4 days of the 28-day window
are with the new Next.js site (schema, CRO, redirects). Prior data is the old
Webflow site. The impression spike from ~12 May is the new site being indexed
more broadly. Clicks have not followed — consistent with a page-2 position problem.

## Key decisions recorded

- `[Direct Access]` chosen over `[Public Access]` — "Direct Access" is the user-facing BSB term;
  "Public Access" is the official BSB term used in their documentation. Either is accurate.
  Direct Access is the more common search phrase, so it's preferable for CTR.

- Police station gets `[24/7]` not `[Direct Access]` — the 24/7 availability is the key
  differentiator for emergency/custody search queries, which is the intent for that page.

- `[Written Quote Upfront]` on Fees — verified fact (client-care letter before any work begins).
  Addresses cost-anxiety intent; differentiates from sites with opaque pricing.

- `[Referral at No Cost]` on Legal Aid — verified fact (partner firm referral at no cost).
  Addresses the "can I get legal aid?" intent directly.

- `[No Solicitor Needed]` on Direct Access — factual (BSB Public Access scheme means no
  solicitor required). Directly answers the most common search intent for that page.

- `About`, `Contact`, `Complaints`, `Timescales`, `Terms`, `Privacy Policy` not changed —
  these are non-commercial pages with no CTR-engineering benefit from brackets.

## Post-deploy measurement (fill 6-8 weeks after deploy)

Date to check: ~2026-07-18

| Metric | Baseline | 6-8 wk post | Delta |
|--------|----------|-------------|-------|
| Overall CTR | — | — | — |
| CTR: criminal defence barrister | — | — | — |
| CTR: police station barrister | — | — | — |
| CTR: barrister london | — | — | — |
