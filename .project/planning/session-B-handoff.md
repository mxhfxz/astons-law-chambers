# Session B Handoff — Astons Law Chambers Planning Phase

**Written:** 2026-05-13 (Planning Phase, Session B)
**Status:** Complete — all steps executed

---

## Files Written This Session

| File | Step | Contents |
|------|------|----------|
| `.project/planning/03-site-architecture.md` | Step 2a | Full URL structure, navigation spec (5 items + CTA), 301 redirect map (with live-site crawl caveat), hub-and-spoke internal linking, content production priority (P0/P1/P2), Phase 2 URL reservations |
| `.project/planning/04-seo-technical.md` | Step 2b | SSG rendering model, robots.txt rules (AI crawler blocking), canonical strategy (trailing slash decision), security headers, vercel.json redirect format, XML sitemap plan (16 URLs), IndexNow plan, pre-launch checklist |
| `.project/planning/05-seo-schema-plan.md` | Step 2c | Schema plan per page type — site-wide LegalService + Person entities, Service schema per practice area, BreadcrumbList, WebPage; **FAQPage conflict resolved** (restricted since Aug 2023 — do not implement); all 🚩 blocked schema fields documented |
| `.project/planning/06-seo-local-plan.md` | Step 2d | GBP optimisation plan, NAP consistency (including old phone number cleanup — 07767 must be removed), citation priority (BSB Register, Bar Council, Bing Places, Yelp), local schema fields, AI search signals (Bing Places as top priority), all address-dependent items flagged 🚩 |
| `.project/planning/07-sxo-intent-check.md` | Step 2e | Per-practice-area intent analysis; **one HIGH conflict flagged** (Motoring Law anchor sections underperform for offence-specific queries); all 10 areas assessed against research-documented SERP patterns; consolidated conflict table |
| `.project/planning/08-content-strategy.md` | Step 3a | Content plan for all 16 pages — primary intent, audience state, zone-by-zone required sections, conversion trigger locations, BSB compliance notes, 🚩 dependencies per section; content production sprint sequence |

---

## Steps Complete

- **Step 2a** — Site architecture (skill: site-architecture) ✓
- **Step 2b** — Technical SEO plan (skill: seo-technical) ✓
- **Step 2c** — Schema plan (skill: seo-schema) ✓
- **Step 2d** — Local SEO plan (skill: seo-local) ✓
- **Step 2e** — SXO intent check (skill: seo-sxo) ✓
- **Step 3a** — Content architecture (skill: content-strategy) ✓

---

## Unresolved Conflicts and Gaps the Next Session Must Know

**1. FAQPage schema is restricted — already resolved, but must not be reversed.**
The session brief specified `LegalService + FAQPage` for practice area pages. FAQPage was restricted to government/healthcare-only in August 2023. The conflict is documented and resolved in `05-seo-schema-plan.md §0`. Do not reintroduce FAQPage schema on any page. The FAQ content is published as HTML; no structured data is applied to it.

**2. Motoring Law anchor sections vs. offence-specific sub-pages — HIGH SEO conflict.**
The Decision 3 resolution (anchor sections at MVP) is pragmatically correct for the build phase. However, `07-sxo-intent-check.md §2.2` confirms that offence-specific sub-pages are required to capture offence-specific search volume. Phase 2 promotion of motoring sub-pages to standalone URLs (`/practice-areas/motoring-law/drink-driving/`, etc.) must be treated as a firm SEO roadmap commitment, not an optional future decision. The six reserved URLs are listed in `03-site-architecture.md §7`.

**3. All 10 flagged items (🚩1–10) remain unresolved.**
No new flagged items were added this session. All 10 from Session A still apply. The full dependency map for the 10 items against specific sections is now documented in `08-content-strategy.md §11`. Client confirmation session is the prerequisite for any copy production to begin.

**4. Practice address not confirmed — blocks local SEO, schema, and privacy policy.**
No practice address has been confirmed. This blocks: GBP setup, all citation submissions requiring an address, `PostalAddress` in schema, the privacy policy contact section, and the on-page service area statement. If confirmed as an SAB (no fixed address), GBP and citations must be configured accordingly. See `06-seo-local-plan.md §1.2`.

**5. Old phone number cleanup (07767 268 607) is a pre-launch task.**
The live astonslaw.com site lists 07767 268 607, confirmed as incorrect. All GBP listings and citations referencing this number must be updated to 07922 247 999 before or at launch. This is a client-side action requiring access to the live site's GBP profile and any directory listings. Flagged in `06-seo-local-plan.md §7`.

**6. Live site crawl is required before redirect map is finalised.**
`03-site-architecture.md §4` provides a probable redirect map. The source URLs are inferred — the live site must be crawled (Screaming Frog or equivalent) before `vercel.json` redirects are finalised. This is a pre-launch action, not a pre-build blocker.

**7. Workflow evaluation still awaiting user approval.**
From Session A: `.project/workflow-eval/findings.md` is complete and awaiting explicit user approval. Nothing has been scaffolded. See `_START_HERE.md` for the full list of what remains to be built.
