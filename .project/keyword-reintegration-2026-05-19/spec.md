# Spec — "Criminal Defence Lawyer" keyword reintegration

**Date:** 2026-05-19
**Phase:** specify → plan
**Skills:** seo-keyword-strategist, marketing-psychology, copywriting, avoid-ai-writing,
legal-advisor (BSB framing), project-mgmt

## Why

Analytics show ~1800% organic growth during the period the phrase
**"Criminal Defence Lawyer"** appeared on the site. A later rewrite replaced
"lawyer" with "barrister" everywhere. The exact phrase now appears **zero**
times across `content/`, `app/`, and `lib/` (verified by grep 2026-05-19).
The growth driver was removed.

## Goal

Reintroduce "criminal defence lawyer" and BSB-safe variations across the site
in natural copy, without keyword stuffing and without breaching Bar Standards
Board rules on how a barrister may describe themselves.

## BSB constraint (the hard line)

- **"Lawyer" — safe to attribute to the practice.** A barrister is a lawyer.
  Calling Astons Law Chambers / Ghulam Humayun a "criminal defence lawyer" is
  accurate and not misleading (BSB Handbook rC19). Allowed in titles, H1s,
  body copy, meta descriptions, schema.
- **"Solicitor" — never attributed to the practice.** A barrister is not a
  solicitor; claiming the title misleads. "Criminal defence solicitor" may
  appear ONLY in referral / instruction context — e.g. "Astons Law Chambers
  can refer the case to a criminal defence solicitor at a partner firm".
- **"Attorney" — not used.** US term; reads as non-native in a UK barrister
  site. Excluded.

## Requirements

### Must have
- "Criminal defence lawyer" (or plural) present on: homepage, `/practice-areas`
  hub, `/practice-areas/criminal-defence`, `/about`, `/police-station-representation`.
- Keyword density per page kept 0.5–1.5%. No stuffing.
- Every "solicitor" usage stays in referral/instruction context only.
- All new/changed copy passes the barrister-voice rules (no marketing speak,
  no AI-isms, entity-first, short declarative sentences).
- Any Tailwind class touched in `content/*.html` already exists in
  `app/preview-tailwind.css` (precompiled-CSS trap).

### Should have
- Title tags and meta descriptions updated to carry the phrase (highest-value
  SEO real estate) — pending the title-strategy decision (see findings.md).
- Light-touch one mention on the remaining practice-area pages.

### Won't have
- No new pages. No URL changes. No H1 rewrites that lose barrister precision.
- No change to the locked barrister-first positioning in body identity copy.

## Acceptance criteria
- `grep -ri "criminal defence lawyer" content app lib` returns matches on every
  Must-have page.
- `grep -ri "solicitor" content app lib` — every hit is referral/instruction context.
- Build + type-check clean; homepage and `/practice-areas/criminal-defence`
  browser-checked desktop + mobile.
- avoid-ai-writing second-pass audit clean on all changed copy.
