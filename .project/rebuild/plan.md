# Plan: Astons Law Chambers website rebuild

**Issue**: rebuild
**Phase**: plan
**Started**: 2026-05-12

## Goal

Rebuild www.astonslaw.com to materially increase inbound calls and WhatsApp messages from defendants in active crisis, by competing in the "charged with X" solicitor SERP rather than the "barrister London" chambers SERP, with ten offence-led pillar pages, entity-first credibility without a portrait, and an austere visual system. Built on MAST in Webflow, code via GitHub + jsDelivr, constructed by Claude Code driving Webflow MCP.

## Approach

Four phases. Phase 0 is design-system foundation. Phases 1–3 mirror the Astons strategy report's recommended sequencing (foundation/conversion/compliance → ten pillars → content depth + AI search), layered onto the chosen toolchain.

**Toolchain**:
- **Claude Design** — generates token specs + component variants before Webflow work
- **IBM Carbon (reference)** — source for 8px grid, neutral palette, Plex Sans, component patterns; borrow tokens, do not import React code
- **MAST template** — Webflow shell; provides responsive primitives we extend
- **Webflow MCP** — page construction, CMS schemas, style application (one action per call, no thinking mid-operation per [[feedback_webflow_mcp_pacing]])
- **GitHub + jsDelivr** — hosts design-system CSS, sticky-bar JS, WhatsApp-prefill logic, schema injection, `webflow.js` suppression. Pinned versions (`@v1.0.0`), never `@latest` in prod
- **Claude Code** — development driver

**Confirmed decisions (2026-05-12)**:
- URL migration: `/criminal-defence/[area]` → `/practice-areas/[area]` with 301s
- Phone: only 07922 247 999. Second number 07767 dropped entirely
- Authorship: named line at page foot, no portrait, no bio block
- Workflow: project-mgmt spec-driven

## Implementation Steps

### Phase 0: Design system foundation (week 0)

- [ ] 0.1: Generate token spec (typography, colour, spacing, radius, motion) via Claude Design
- [ ] 0.2: Codify tokens in `design-system/tokens.css` in the repo
- [x] 0.3: Lock typography — IBM Plex Sans 400/500/600/700/800, true italic, tabular figures, full Latin Extended. Body 16–18px, leading 1.5–1.7, measure 66ch. Single family, no companion serif/mono.
- [x] 0.4: Lock colour — `brand-primary` #0E1628, `emergency-accent` #C23616, pure white surface, cool Carbon-aligned grey scale (100/200/500/600). WCAG floor 4.5:1, target 7:1 on body. Two saturated colours separated by function.
- [ ] 0.5: Lock spacing: 4, 8, 12, 16, 24, 32, 48, 64, 96 px tokens
- [ ] 0.6: Define component primitives: section-band, card, hero (typographic-anchor default), nav (wide-pattern for chambers, not lean-five), disclosure-row, trust-signal-row, sticky-emergency-bar, FAQ-accordion, breadcrumb
- [ ] 0.7: Document forbidden patterns in `design-system/forbidden.md`
- [ ] 0.8: Push initial design-system bundle to GitHub; verify jsDelivr resolves the pinned version
- [ ] 0.9: Confirm MAST + tokens compose cleanly in a Webflow staging site before any production work

### Phase 1: Foundation, conversion, compliance (weeks 1–3)

- [ ] 1.1: Sticky bottom-bar component — phone + WhatsApp, 56–64px, native HTML links, zero JS click interception; ship to every emergency-intent page
- [ ] 1.2: WhatsApp prefill logic — per-page-context messages, all under 80 chars; wired into the sticky bar and hero CTAs
- [ ] 1.3: Two-tier CTA routing — phone+WhatsApp on emergency pages; cal.com on `/consultation`, fees, Direct Access, "what to expect" pages only
- [ ] 1.4: Rewrite homepage in GOV.UK register — user-state hero, drop "10+ years experience", drop "100+ Cases Represented", swap "approved by the BSB" → "Regulated by the Bar Standards Board"
- [ ] 1.5: Rewrite `/contact` — remove email + contact form from above-fold; remove second phone number; keep only 07922 + WhatsApp + cal.com link
- [ ] 1.6: Rewrite `/direct-access` (or equivalent) — "speed not cost" framing, honest scope of what Direct Access barristers can and cannot do
- [ ] 1.7: Fix `/compliance/complaints` → 301 to `/compliance/complaints-policy`
- [ ] 1.8: Add Barristers' Register link + Legal Ombudsman decision-data link to complaints page
- [ ] 1.9: Implement schema: `LegalService` + `Person` with `sameAs` chains; inject via jsDelivr-hosted JSON-LD script
- [ ] 1.10: Submit Wikidata entries for the chambers entity and for Ghulam (verified facts only)
- [ ] 1.11: Suppress `webflow.js` once MAST replaces all interactions; verify via DevTools coverage tab
- [ ] 1.12: Configure security headers via Webflow hosting panel (HSTS preload, CSP, nosniff, Referrer-Policy, Permissions-Policy)
- [ ] 1.13: Live mobile QA — tap targets, `tel:` resolution, `wa.me/` resolution, INP measurement on a real device
- [ ] 1.14: Baseline CrUX + PageSpeed snapshot for INP/LCP/CLS to compare against post-rebuild

### Phase 2: Ten practice-area pillars (weeks 4–9)

- [ ] 2.1: Write `/practice-areas/drug-offences` to H2 spine, 1,800–2,500 words
- [ ] 2.2: Write `/practice-areas/sexual-offences` (new page — does not exist on live site)
- [ ] 2.3: Write `/practice-areas/violent-offences`
- [ ] 2.4: Write `/practice-areas/fraud-financial-crime` (new)
- [ ] 2.5: Write `/practice-areas/driving-offences`
- [ ] 2.6: Write `/practice-areas/theft-robbery` (new)
- [ ] 2.7: Write `/practice-areas/money-laundering-poca` (new)
- [ ] 2.8: Write `/practice-areas/youth-crime`
- [ ] 2.9: Write `/practice-areas/appeals` — disambiguate Crown Court appeals from Magistrates vs CACD
- [ ] 2.10: Write `/practice-areas/inquests` — isolated cluster, bereaved-family register
- [ ] 2.11: Retire Police Station Representation as a practice area; fold into Drug, Violent, Youth Crime as a service stage
- [ ] 2.12: Add restrained authorship line at foot of every pillar
- [ ] 2.13: Add `Service` schema per pillar + `FAQPage` JSON-LD scaffolding + `BreadcrumbList`
- [ ] 2.14: Wire 301 redirects for the six existing pages from `/criminal-defence/[area]` to `/practice-areas/[area]`
- [ ] 2.15: Verify each 301 chain in Search Console; monitor impressions for 4 weeks
- [ ] 2.16: Cross-link practice areas in body text (Drug ↔ POCA; any conviction context ↔ Appeals) and in footer

### Phase 3: Content depth + AI search (months 3–6)

- [ ] 3.1: Write SERP-gap page: "Direct Access vs duty solicitor at the police station"
- [ ] 3.2: Write SERP-gap page: "Crown Court appeal from Magistrates vs CACD appeal"
- [ ] 3.3: Supporting articles under Drug pillar (priority — Agent 2 content-gap analysis)
- [ ] 3.4: Supporting articles under Fraud, Driving, POCA
- [ ] 3.5: Audit external linking — every pillar links to Sentencing Council + gov.uk + BSB/Bar Council
- [ ] 3.6: Enable IndexNow if free Webflow integration is available
- [ ] 3.7: Quarterly re-check of AI Overview citation patterns and FAQ-schema status (recent retirement)
- [ ] 3.8: Quarterly re-check of CrUX INP data; tune if regressions appear
- [ ] 3.9: Track which contact channel was used per enquiry (call vs WhatsApp vs cal.com) — the KPI is channel-correct enquiries, not total

## Current Step

Phase 0 — design system foundation. **Unblocked 2026-05-12.** Colours, type, wordmark, and aesthetic direction all locked (see [aesthetic.md](aesthetic.md)). Next action: token generation (0.1–0.2) and design-system bundle push to GitHub/jsDelivr (0.8).

## Blockers

- None at design-system layer.
- Open at copy layer: Ghulam's literal-truth commitments on availability / response time before any hero copy ships (per [[feedback_flag_imported_truth_claims]]).

## Validation

- [ ] Acceptance criteria in [spec.md](spec.md) all green
- [ ] Each phase ends with a working, shippable site state (no half-finished phases)
- [ ] Departures from live site flagged per-page in callout file
- [ ] Real-user mobile QA before sign-off on Phase 1
- [ ] BSB Transparency Rules checklist signed off before Phase 1 close
- [ ] CrUX/PageSpeed shows INP < 200ms p75 before Phase 1 close
- [ ] No fabricated facts present — every claim traceable to [[verified_facts]]
