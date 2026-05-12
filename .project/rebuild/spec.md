# Specification: Astons Law Chambers website rebuild

**Issue**: rebuild (no GitHub issue — internal agency project)
**Status**: approved
**Started**: 2026-05-12

## Overview

Rebuild www.astonslaw.com from scratch in Webflow (MAST template) with the goal of materially increasing inbound calls and WhatsApp messages from defendants in active criminal-legal crisis. The current site works on a "job to be done" model but is structurally a chambers-register brochure; the rebuild repositions it as a triage-focused, GOV.UK-register search target that competes in the solicitor SERP ("charged with X", "arrested for X", "lawyer for X") rather than the chambers SERP ("barrister London").

Three deep-research projects on 2026-05-12 converge on a single shape: phone + WhatsApp emergency triage, ten offence-led pillar pages at 1,800–2,500 words, entity-first credibility without a portrait, an austere visual system (single sans-serif, 3–5 hue palette, white ground, 8px card grid), and zero SaaS-marketing patterns.

The build uses MAST as the Webflow framework, an extended Claude Design + IBM Carbon-derived design system, code injection via GitHub + jsDelivr, and is constructed by Claude Code driving Webflow MCP.

## Requirements

### Must Have

- [ ] Sticky bottom-bar with `tel:` + `wa.me/` on every emergency-intent page (homepage, all offence pages), 56–64px tall, native HTML links, zero JS interception
- [ ] Two-tier CTA routing: phone+WhatsApp on emergency pages; cal.com on advisory pages only; email demoted to footer regulatory contact
- [ ] Ten practice-area pillar pages at `/practice-areas/[area]` — Drug, Sexual, Violent, Fraud & Financial Crime, Driving, Theft & Robbery, Money Laundering & POCA, Youth Crime, Appeals, Inquests
- [ ] 301 redirects from `/criminal-defence/[area]` → `/practice-areas/[area]` for the six existing pages
- [ ] Each pillar follows the H2 spine: offence definition → penalty framing (Sentencing Council link, no specific year tariffs) → defences → procedural route → what a Direct Access barrister adds → fees → FAQ
- [ ] Pillar word count 1,800–2,500 words
- [ ] Restrained authorship line at foot of each pillar: "Reviewed by Ghulam Humayun, barrister, regulated by the Bar Standards Board" (no portrait, no bio block)
- [ ] Homepage rewritten in user-state hero ("Arrested in the last 24 hours. Police bail expires this week. Crown Court hearing this month.")
- [ ] Strip from current site: "10+ years legal experience", "100+ Cases Represented", "approved by the Bar Standards Board", second phone number 07767 268 607, email/form on contact page above the fold
- [ ] Replace "approved by the BSB" with "Regulated by the Bar Standards Board"
- [ ] Fix broken `/compliance/complaints` URL (301 to `/compliance/complaints-policy`)
- [ ] Complaints page adds: Barristers' Register link + Legal Ombudsman decision-data link (BSB Transparency Rules)
- [ ] Schema: `LegalService` + `Person` + `Service` per practice area, with `sameAs` chains (BSB register page, Bar Council, Direct Access Portal, LinkedIn); `BreadcrumbList` on pillars; `FAQPage` retained as AI-retrieval scaffolding
- [ ] Wikidata entity for the chambers and for Ghulam, using only verified facts
- [ ] INP-safe build: `webflow.js` suppressed (`<script>WebflowEnabled=false</script>`) once MAST replaces Webflow interactions; all CTAs are pure HTML; non-critical scripts deferred
- [ ] Security headers: HSTS w/ preload, CSP (script-src includes cdn.jsdelivr.net), `nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, locked `Permissions-Policy`
- [ ] Mobile-first design: tap targets ≥48×48px, emergency CTAs 56–64px, content above the fold readable on a 390×844 viewport
- [ ] Design system: single sans (IBM Plex Sans), 5 weights, near-white background, near-black body, 4 cool greys, one brand accent, 8px spacing tokens (4, 8, 12, 16, 24, 32, 48, 64, 96)
- [ ] All decisions departing from the live site are flagged with reasoning (per [[feedback_callout_departures]])
- [ ] Safe-exit / "Quick exit" feature on every page — floating outlined red button top-right, Esc-twice-within-1s keyboard shortcut, `window.location.replace` to google.com, full ARIA labelling, suppressed on print. UK Refuge / Women's Aid / gov.uk safety convention. See [visual-layering-plan.md](visual-layering-plan.md) iteration round 3.
- [ ] WCAG 2.2 AA compliance across the design system — skip-to-content link, 2px focus rings with 2px offset on every interactive element, ARIA landmarks, ARIA labels on all icon-only buttons, ARIA live regions for action confirmations, keyboard parity for every action, `prefers-reduced-motion` honoured for decorative motion only
- [ ] Medium-optimised UX — every component specified for every viewport class × input modality (cursor vs touch); hover states suppressed on touch; tooltips replaced by permanent labels on touch; tap targets enforced
- [ ] Responsive type via `clamp()` formulas — hero, H1, H2, H3, body, caption — all six tokens carry `clamp()` for desktop/tablet/mobile sizing without media queries
- [ ] Container system — narrow (720px) / default (960px) / wide (1200px) with `clamp(20px, 5vw, 96px)` horizontal gutter; no edge-to-edge layouts

### Should Have

- [ ] Supporting articles (600–1,000 words, narrow-intent) under priority pillars (Drug, Fraud, Driving, POCA first)
- [ ] Two SERP-gap pages: "Direct Access vs duty solicitor at the police station" and "Crown Court appeal from Magistrates vs CACD appeal"
- [ ] Police Station Representation folded into Drug, Violent, and Youth Crime pages as a service stage (retire as a top-level practice area)
- [ ] IndexNow integration if free Webflow integration becomes available (feeds Bing → ChatGPT Search freshness)
- [ ] Per-page micro-trust: practice-area-specific credibility cue on each pillar
- [ ] "What happens next" closing section on every pillar (peak-end moment)
- [ ] Confirmation copy that sets expectations after every contact action

### Won't Have

- Lead magnets, email captures, exit-intent popups, nurture sequences (per [[feedback_no_email_funnel]])
- Practitioner portrait anywhere (per [[feedback_no_portrait_minimal_name]])
- SaaS-marketing register, rhetorical questions, "right barrister for you" framing (per [[feedback_no_marketing_speak]])
- Specific BSB number, Inn, year of call, named cases (per [[feedback_no_fabricated_facts]])
- Specific statutory section numbers or sentencing-figure tariffs (per [[feedback_legal_specificity]])
- Hero carousels, animated counters, stock photography, fake testimonials, countdown timers, fake-scarcity badges, AI-chatbot-styled-as-human
- Second phone number 07767 268 607 (confirmed not real)
- Email or contact form on the conversion path (email → footer regulatory contact only)
- A/B tests of reject-list patterns even for short-term lift
- Self-hosted `Review` / `AggregateRating` schema (no longer triggers SERP stars; no SEO value)
- llms.txt as a strategic investment (parked as theatre; ship a minimal one for optionality only)

## Acceptance Criteria

- [ ] Mobile homepage renders 5 mandatory hero elements (identity / scope / primary CTA / phone + WhatsApp / regulator line) within a single 390×844 viewport
- [ ] Every pillar page passes a live mobile QA: tap targets correct, `tel:` and `wa.me/` resolve natively, no JavaScript interception
- [ ] CrUX/PageSpeed real-user data shows INP < 200ms p75 on emergency-intent pages
- [ ] BSB Transparency Rules audit checklist (homepage regulator line, services description, pricing, timescales, complaints w/ Ombudsman details, Barristers' Register link, Public Access guidance link) all green
- [ ] Each pillar passes a "definition-first opening" check: first 60–80 words self-contain the topic
- [ ] Each pillar carries the H2 spine, 1,800–2,500 words, external links to Sentencing Council + gov.uk court + BSB/Bar Council Public Access pages
- [ ] No fabricated facts present; every claim traceable to [[verified_facts]]
- [ ] No live-site → rebuild departures undocumented in the per-page callout file
- [ ] WCAG 2.2 AA automated audit (axe-core) returns zero violations on each shipped page; manual keyboard-navigation walkthrough passes for nav / mega-menu / sticky-bar / quick-exit
- [ ] Safe-exit feature reachable on every shipped page via mouse, touch, and the Esc-twice keyboard shortcut; clicking it replaces history and navigates to google.com

## User Stories

- As a defendant who has just been arrested, I want to reach Ghulam by phone or WhatsApp in one tap, so I get advice before the interview.
- As the mother of an arrested defendant typing on a mobile at 11pm, I want to understand within five seconds what this practice covers and that it is real, regulated, and reachable now.
- As a defendant facing a Crown Court hearing in 72 hours, I want a page that explains the procedural route and what a Direct Access barrister adds, with the contact path always visible.
- As a researcher comparing several practitioners, I want fees and credentials surfaced honestly so I can shortlist without making a call.
- As a bereaved family member looking for an inquest barrister, I want the Inquests cluster to be distinct from the criminal-defence cluster, with its own framing and language.

## Edge Cases

| Case | Handling |
|------|----------|
| Visitor lands on `/criminal-defence/[area]` from an old backlink or bookmark | 301 redirect to `/practice-areas/[area]`; preserve organic authority |
| Visitor on the homepage at 3am, no clerks answering | Hero copy and sticky CTA must say what actually happens when they call ("the clerks answer outside office hours" — only if Ghulam can commit to this; otherwise softer wording) |
| Defendant in custody-suite environment cannot speak aloud | WhatsApp is equal-weight to phone in sticky bar; pre-filled message orients Ghulam, not the user |
| `webflow.js` suppression breaks a residual Webflow interaction | Audit MAST coverage of interactions before suppression; ship a kill-switch toggle |
| AI Overview cites a competitor due to authorship-signal gap | Verify authorship line on every pillar and `sameAs` chains in schema |
| URL migration regresses ranked pages | Verify each 301 in Search Console; monitor for impression loss in the first 4 weeks |
| Cal.com embed times out and blocks LCP | Defer cal.com embed; lazy-load below the fold; never above-fold on emergency pages |
| User asks for a testimonials block in v2 | Refuse self-hosted `Review` schema; link to Google Business Profile reviews instead |
| Client provides a real verified case | Add as one-line case-name reference (Hansard / BAILII link) without outcome claims; flag in `verified_facts.md` |
| WhatsApp prefilled message renders truncated on a small screen | Keep prefill under 80 chars; test on the smallest target viewport (320px) |
