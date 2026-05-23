# Findings: SEO CTR Fix — Recommendation 1

## GSC baseline (record before merge — see plan.md)

Fill the table in plan.md from GSC before pushing to main.
URL: https://search.google.com/search-console → Search Results → Last 28 days.

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
