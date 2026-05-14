# Astons Law Chambers — Build Plan

**Written:** 2026-05-13 (Session C, Step 5a)
**Skill used:** writing-plans
**Input files:** .project/planning/00 through 16, .project/research-01/synthesis.md, CLAUDE.md

---

## Decisions Locked (Session C — 2026-05-13)

| Decision | Resolution |
|----------|-----------|
| FLAG-D1/B3: Penpot MCP | Configured via `.mcp.json` (gitignored, token stored locally). Requires Claude Code restart to activate. User owns the Penpot file; has 10 years product design experience. Claude proposes designs with research evidence; user refines. |
| FLAG-B1: Phase 0 timeline/fallback | Pragmatic approach adopted. Extract confirmed facts from live astonslaw.com where possible. Only block on items that are genuinely unresolvable without the client (BSB-required fee ranges 🚩7/🚩8). Ship-first mindset; niche blockers do not delay the critical path. |
| FLAG-D3: Zone 3 vs Zone 5 dark conflict | Resolved: Zone 5 (TrustSignals) is always dark. Zone 3 (ActionSteps) is always light. Section component default is `variant="base"` unless explicitly overridden. |
| FLAG-E2: GSAP hydration mismatch | Resolved: Server renders all animated elements at final visible state. GSAP only triggers on scroll — never sets initial hidden state. Build rule documented in `13-nextjs-scaffold-spec.md`. |
| FLAG-D4: Hamburger overlay design | Resolved: Add as a named frame/component in the Penpot Navigation page. design-reader runs on it before Header component build. It is part of Phase 3, not an afterthought. |
| FLAG-B3: Penpot file ownership | User owns and manages the Penpot file. Claude proposes design rationale with evidence from research files; user has final say on all visual decisions. |

---

## Open Decisions — Must Be Resolved Before Phase 1 Begins

These are not deferred preferences. They are blockers. Nothing in Phase 1 or later can proceed without answers to all of them.

### Client Confirmations Required (all 10 🚩 items)

| # | Item | Blocks |
|---|------|--------|
| 🚩1 | 24/7 availability — is this genuinely offered? | Zone 1 copy on all practice area pages; above-fold availability signal |
| 🚩2 | Police station duty advice — actively offered? | Homepage copy; criminal defence Zone 1–2 |
| 🚩3 | Legal aid — which of the 10 practice areas qualify? | All practice area pages Zone 1/5; Fees page; legal aid signals in HeroZone |
| 🚩4 | WhatsApp pre-fill text — exact `?text=` wording | All WhatsApp button hrefs; `lib/contact.ts`; StickyBar |
| 🚩5 | Response time commitment — what is realistic? | Any page mentioning response speed |
| 🚩6 | Free initial consultation — offered? | All practice area Zone 6 FAQs; Fees page |
| 🚩7 | Fee ranges: Motoring, Immigration, Licensing | Fees page; those three practice area pages Zone 6 (BSB legally required) |
| 🚩8 | VAT status | Fees page; all fee ranges across three practice areas (BSB legally required) |
| 🚩9 | Direct access training completion | `/direct-access/` page; any "direct access barrister" claim |
| 🚩10 | Internal complaints response timeframe | `/complaints/` page (BSB legally required) |

**And four additional pre-build confirmations:**

| Item | Blocks |
|------|--------|
| Cal.com booking URL | `lib/contact.ts`; all RepeatCTA and Zone 7 booking buttons |
| Practice address (or confirmed SAB status) | `/privacy-policy/`; GBP setup; schema PostalAddress |
| Production domain confirmed | `vercel.json`; `NEXT_PUBLIC_SITE_URL`; canonical URLs |
| Workflow evaluation approval | Entire Phase 1 start |

### Strategic Decisions (already have recommendations — need explicit sign-off)

| Decision | Recommendation | Blocks |
|----------|---------------|--------|
| Practice area nav | Hub page + no dropdown (already in IA) | Already locked; confirm before build |
| Motoring offence sub-pages | Anchor sections at MVP; standalone sub-pages Phase 2 | Motoring page structure |
| Complaints vs. Fees scope | Separate `/complaints/` page | Both pages' component structure |
| Content production phasing | P0/P1/P2 sequence from `03-site-architecture.md §6` | Phase 5 sequencing |

---

## Phase 0 — Approval Gate

**Goal:** Secure all pre-build approvals before a single line of code is written.

**Deliverables:**
- User approves `.project/workflow-eval/findings.md` (subagent architecture, build workflow)
- Client confirmation session: answers to all 10 🚩 items above
- Explicit sign-off on all four strategic decisions
- Cal.com URL confirmed and recorded in session notes
- Production domain confirmed
- 10 confirmed answers written into `lib/contact.ts` stub and planning notes before Phase 1

**Dependencies:** None — this is the first gate.

**Definition of done:**
- `workflow-eval/findings.md` has explicit "approved" from user
- All 10 🚩 items have confirmed answers (or explicit "not offered" for items like 24/7 availability)
- `_START_HERE.md` updated with Phase 0 completion note
- Any items confirmed as "not offered" documented so they never reappear in copy

**Subagent review:** None — this phase is user/client decisions only.

---

## Phase 1 — Project Scaffold

**Goal:** Create the project structure, config files, and data stubs so every subsequent phase has a clean foundation to build on.

**Deliverables:**

1. `package.json` — Next.js 14+, TypeScript, Tailwind CSS, GSAP, ESLint
2. `tsconfig.json` — strict mode, path aliases (see `13-nextjs-scaffold-spec.md §5`)
3. `.eslintrc.json` — token enforcement rules (see `13-nextjs-scaffold-spec.md §9`)
4. `next.config.ts` — base config (see `13-nextjs-scaffold-spec.md §7`)
5. `tailwind.config.ts` — theme extension with CSS var references (see `12-tailwind-token-spec.md §3`)
6. `styles/tokens.css` — primitive layer only (semantic and component layers follow in Phase 2)
7. `styles/globals.css` — imports tokens.css; base reset
8. `app/layout.tsx` — root layout: font loading (`next/font`), HTML structure, imports Header/Footer/StickyBar placeholders
9. `lib/practice-areas.ts` — 10 practice area stubs (slug, title, priority; zone content is Phase 3 after client confirmation)
10. `lib/contact.ts` — phone, WhatsApp, cal.com URL (🚩 values populated after Phase 0)
11. `lib/site.ts` — site name, meta defaults, BSB fields (BSB number still 🚩 until confirmed)
12. `hooks/useReducedMotion.ts` — required before any GSAP usage
13. `hooks/useStickyBarVisibility.ts` — scroll-direction logic for StickyBar
14. `.claude/agents/` — design-reader, code-reviewer, component-builder subagent definitions
15. `vercel.json` — security headers and 301 redirects (see `14-vercel-config-plan.md §3–4`)
16. `public/robots.txt` — per `04-seo-technical.md`
17. `CLAUDE.md` — already exists; verify it is current
18. `_START_HERE.md` — update to reflect Phase 1 complete

**Directory structure created:** as specified in `13-nextjs-scaffold-spec.md §1`.

**Dependencies:**
- Phase 0 complete (especially: cal.com URL, WhatsApp pre-fill, confirmed contact details for `lib/contact.ts`)
- Workflow evaluation approved

**Definition of done:**
- `npm run build` succeeds with no errors
- `npm run lint` passes
- `npm run type-check` passes (TypeScript strict, no errors)
- All 10 practice area slugs resolve in `generateStaticParams`
- No hardcoded hex values outside `tokens.css`
- `.claude/agents/` contains all three subagent definition files

**Subagent review:** code-reviewer runs on `lib/` files and config files after scaffold is complete.

---

## Phase 2 — Design System (Penpot) + Token Implementation

**Goal:** Establish the complete visual language in Penpot and implement the full token set in code.

**User-side deliverable (Claude cannot do this):**
- User creates Astons Law Chambers Penpot file
- Pages: Homepage, Navigation, Footer, then one page per practice area
- All layers named `section/element` (e.g., `hero/headline`, `nav/cta`)
- All values reference tokens — no raw hex anywhere in the Penpot file
- Token hierarchy set up in Penpot matching `09-design-system-spec.md`

**Code deliverable (Claude):**
- `styles/tokens.css` — complete semantic and component layers added (Phase 1 had primitive layer only)
- `tailwind.config.ts` — all semantic extensions confirmed and tested
- `styles/globals.css` — base typography, body reset, `has-sticky-bar` class

**Design Penpot pages required before Phase 3:**
- Navigation (Header spec)
- Footer spec
- Mobile StickyBar spec
- Homepage above-fold zone (for HeroZone reference)

**Dependencies:**
- Phase 1 complete
- User has Penpot account and MCP key set up
- At least the Navigation and Footer pages in Penpot before Phase 3 can begin

**Definition of done:**
- Penpot file exists with Navigation and Footer pages (minimum for Phase 3)
- All Penpot layer names follow `section/element` convention — design-reader confirms no raw hex
- `tokens.css` contains all three layers: primitive, semantic, component
- `npm run build` and `npm run type-check` still pass with full token set

**Subagent review:** design-reader runs on Penpot file; reports any raw hex before Phase 3 starts.

---

## Phase 3 — Core Layout Components

**Goal:** Build the components that appear on every page. These must be production-quality before any page is built.

**Components (build in order):**

1. `components/ui/Button.tsx` — phone, whatsapp, text variants
2. `components/ui/Link.tsx` — internal, external, tel, whatsapp variants
3. `components/ui/Badge.tsx` — legal-aid, bsb-regulated, info variants
4. `components/ui/Icon.tsx` — phone, whatsapp, arrow-right, chevron-down, check, external-link
5. `components/layout/Container.tsx`
6. `components/layout/Section.tsx` — base, subtle, dark variants
7. `components/layout/Header.tsx`
8. `components/layout/Footer.tsx`
9. `components/layout/StickyBar.tsx`

**One component per task.** Each goes through design-reader → component-builder → code-reviewer before the next begins.

**Dependencies:**
- Phase 2 complete (tokens, Penpot Navigation + Footer pages ready)
- `lib/contact.ts` and `lib/site.ts` populated (Phase 0 + Phase 1)

**Definition of done:**
- All 9 components pass code-reviewer with no flags
- No hardcoded colours, no inline styles in any component
- StickyBar shows on mobile, hidden on desktop (≥1280px)
- Phone CTA in Header links to `contact.phoneTel`
- WhatsApp in StickyBar links to `contact.whatsapp` (🚩 pre-fill added once confirmed)
- Footer contains BSB regulatory statement from `site.bsb.regulatoryStatement`
- `npm run build`, `npm run lint`, `npm run type-check` all pass

**Subagent review:** code-reviewer on each component. Final pass on all 9 together before Phase 4.

---

## Phase 4 — Homepage

**Goal:** Build the homepage as a functional routing hub. Crisis-state users can reach any practice area in one tap; pre-crisis users can navigate to Fees or Direct Access.

**Components to build (continue from Phase 3 style):**

10. `components/sections/PracticeCard.tsx`
11. `components/sections/PracticeZone.tsx`
12. `components/sections/DirectAccessBanner.tsx` (inline variant for homepage)
13. `components/sections/HeroZone.tsx` (homepage variant — no practice-specific headline)
14. `app/page.tsx` — homepage

**Homepage page structure:**
```
<Header />
<HeroZone variant="homepage" />     ← above-fold statement, phone + WhatsApp CTAs
<PracticeZone />                     ← card grid, all 10 practice areas
<DirectAccessBanner variant="block" />
[BSB regulatory line — 1 sentence]
<Footer />
<StickyBar />
```

**Content dependency:** Zone 1 homepage headline and supporting line are new content (not from practice area pages). Requires confirmed copy — do not proceed with placeholder copy that might be mistaken for final.

**Dependencies:**
- Phase 3 complete
- Client confirmation session complete (Phase 0) — homepage copy is confirmed content, not placeholder
- Penpot Homepage page exists in design file

**Definition of done:**
- Homepage loads with no errors, LCP element is h1 text
- All 10 practice area cards navigate correctly to `/practice-areas/[slug]/`
- Phone CTA in header and above-fold both trigger `tel:+447922247999`
- WhatsApp CTA triggers `wa.me/447922247999` (with pre-fill if confirmed)
- StickyBar visible on mobile, hidden on desktop
- BSB regulatory statement present in footer
- Lighthouse mobile performance score ≥85
- code-reviewer pass on all new components

**Subagent review:** design-reader (Penpot Homepage page), component-builder (each component), code-reviewer (each component + full page).

---

## Phase 5 — Practice Area Pages (Template + All 10 Pages)

**Goal:** Build the practice area page template and populate all 10 practice areas. This is the highest-conversion page type on the site.

**Components to build:**

15. `components/sections/BreadcrumbBar.tsx`
16. `components/sections/SituationAck.tsx`
17. `components/sections/ActionSteps.tsx`
18. `components/sections/ProcessSteps.tsx`
19. `components/sections/TrustSignals.tsx`
20. `components/sections/FAQList.tsx`
21. `components/sections/RepeatCTA.tsx`
22. `app/practice-areas/[slug]/page.tsx` — practice area page template

**Pages (populate in P0 → P1 → P2 order):**

| Priority | Practice Area | Full Zones at Launch |
|----------|-------------|---------------------|
| P0 | Criminal Defence | Zones 1–7 |
| P0 | Motoring Law | Zones 1–7 (+ BSB fee disclosure) |
| P0 | Immigration | Zones 1–7 (+ BSB fee disclosure) |
| P1 | Family Law | Zones 1–5 minimum |
| P1 | Proceeds of Crime | Zones 1–5 minimum |
| P1 | Licensing | Zones 1–5 minimum (+ BSB fee disclosure) |
| P2 | Regulatory Law | Zones 1–2 placeholder |
| P2 | Extradition | Zones 1–2 placeholder |
| P2 | Inquests | Zones 1–2 placeholder |
| P2 | Civil Litigation | Zones 1–2 placeholder |

P2 placeholder pages still have functional above-fold zones with phone + WhatsApp CTAs. They are not empty pages.

**Motoring Law anchor sections:** `#drink-driving`, `#drug-driving`, `#totting-up`, `#mobile-phone`, `#dangerous-driving` implemented as `id` attributes on Section components.

**Dependencies:**
- Phase 4 complete
- All zone content for P0 + P1 practice areas confirmed by client (🚩 items resolved in Phase 0)
- Fee ranges and VAT for Motoring, Immigration, Licensing confirmed (🚩7, 🚩8)
- Penpot practice area page design exists

**Definition of done:**
- All 10 practice area pages resolve without 404 or error
- `generateStaticParams` returns all 10 slugs
- Phone + WhatsApp CTAs functional on all pages
- BreadcrumbList schema correct on all L2 pages (see `05-seo-schema-plan.md`)
- BSB fee disclosure present on Motoring, Immigration, Licensing pages (🚩 content confirmed)
- Legal aid signal accurate per practice area (🚩 confirmed in Phase 0)
- No practitioner portrait anywhere
- Lighthouse mobile ≥90 on the Criminal Defence page (primary conversion page)
- code-reviewer pass on all components and pages

**Subagent review:** design-reader for each component before build; code-reviewer after each component.

---

## Phase 6 — Compliance and Utility Pages

**Goal:** Build all BSB-required and GDPR-required pages. This phase cannot launch without these pages.

**Pages:**

1. `app/fees/page.tsx` — Fees & Legal Aid (BSB P0 — required at launch)
2. `app/direct-access/page.tsx` — Direct Access explainer (BSB P0 — required at launch)
3. `app/complaints/page.tsx` — Complaints procedure (BSB P0 — required at launch)
4. `app/privacy-policy/page.tsx` — UK GDPR privacy notice (P0 — required at launch)
5. `app/practice-areas/page.tsx` — Practice Areas Hub

**Required content per page:**

**`/fees/`:**
- Pricing models (fixed fee, hourly, brief fee — confirm which apply)
- Fee ranges for Motoring, Immigration, Licensing (🚩7)
- VAT status stated (🚩8)
- Legal aid availability per practice area (🚩3) or "contact to discuss"
- Means test and Interests of Justice test in plain language
- 🚩 Police station advice is free regardless of income — if confirmed (🚩2)
- BSB link to full fee transparency guidance

**`/direct-access/`:**
- What a barrister does
- How direct access works — no solicitor required
- What direct access cannot do (litigation limitation — honest disclosure)
- BSB Public Access Guidance link
- 🚩 Confirmation of direct access training completion (🚩9)

**`/complaints/`:**
- Internal complaints procedure
- 🚩 Internal response timeframe (🚩10)
- Legal Ombudsman details (name, phone, URL — from `lib/site.ts`)
- LeO time limits for raising a complaint
- LeO decision data link
- BSB Barristers' Register link

**`/privacy-policy/`:**
- UK GDPR privacy notice
- PECR cookies statement
- Contact details for data queries (phone/WhatsApp only — no email)
- 🚩 Practice address or SAB confirmation (if no fixed address, state as such)

**`/practice-areas/`:**
- Card grid of all 10 practice areas (reuses PracticeZone component)
- No breadcrumb (L1 page)

**Dependencies:**
- All Phase 5 section components complete (Fees, Direct Access pages use some section components)
- All 10 🚩 items confirmed (Phase 0) — these pages cannot contain placeholder copy that ships to production
- `lib/site.ts` LeO details populated

**Definition of done:**
- All 5 pages resolve without error
- `/fees/` contains indicative fee ranges with VAT status for Motoring, Immigration, Licensing
- `/complaints/` contains LeO signposting with time limits and decision data link
- `/direct-access/` contains BSB Public Access Guidance link and litigation limitation disclosure
- `/privacy-policy/` is UK GDPR compliant (not a generic template)
- BSB regulatory statement in footer on all pages
- code-reviewer pass on all pages

**Subagent review:** code-reviewer on all pages. legal-advisor skill consulted on BSB compliance pages before they are marked done.

---

## Phase 7 — SEO, Redirects, Performance Audit, Pre-Launch

**Goal:** Verify the site is ready to replace the live astonslaw.com. Nothing is left to chance.

**Deliverables:**

### 7a. Schema Markup
- Implement LegalService + Person schema on homepage (see `05-seo-schema-plan.md`)
- Service schema per practice area page
- BreadcrumbList on all L2 pages (this may already be in BreadcrumbBar from Phase 5)
- WebPage schema on `/fees/`, `/direct-access/`

### 7b. Sitemap and robots.txt
- `app/sitemap.ts` — programmatic sitemap, 16 URLs
- `public/robots.txt` — per `04-seo-technical.md §2`
- Submit sitemap to Google Search Console and Bing Webmaster Tools

### 7c. Redirect Verification
- Crawl live astonslaw.com (client-side action or agency tool)
- Cross-reference crawl output against redirect map in `14-vercel-config-plan.md §3`
- Add any missing source URLs to `vercel.json` redirects
- Test all 301 redirects in Vercel preview deployment

### 7d. Core Web Vitals Audit
- Run Lighthouse mobile audit on homepage, Criminal Defence page, Motoring Law page
- All targets: LCP <2.5s, INP <200ms, CLS <0.1, Performance ≥90
- Fix any regressions before go-live

### 7e. IndexNow
- Register IndexNow API key with Bing
- Submit all 16 URLs on launch day

### 7f. Pre-Launch Checklist

**Content:**
- [ ] All 🚩 items confirmed and reflected in live copy
- [ ] No placeholder text anywhere on the site
- [ ] No fabricated facts (BSB number, cases, named partners)
- [ ] BSB regulatory statement in footer on all pages
- [ ] Complaints procedure, LeO details, time limits on `/complaints/`
- [ ] Fee ranges with VAT on Motoring, Immigration, Licensing pages
- [ ] BSB Public Access Guidance link on `/direct-access/`
- [ ] Legal Ombudsman decision data link on `/complaints/`
- [ ] BSB Barristers' Register link in footer

**Technical:**
- [ ] `npm run build` — no errors, no warnings
- [ ] `npm run type-check` — zero TypeScript errors
- [ ] `npm run lint` — zero ESLint errors
- [ ] All 10 practice area pages load correctly
- [ ] All 301 redirects tested
- [ ] Lighthouse mobile: all three audit pages score ≥90
- [ ] No hardcoded hex values in any component
- [ ] No inline styles (except GSAP-managed transforms)
- [ ] No contact forms anywhere on the site
- [ ] No practitioner portrait anywhere on the site
- [ ] StickyBar visible on mobile, hidden on desktop
- [ ] All tel: links dial 07922 247 999
- [ ] All WhatsApp links use wa.me/447922247999 (with pre-fill if confirmed)
- [ ] Cal.com booking link functional (🚩 URL confirmed)
- [ ] SSL active on production domain
- [ ] www → apex redirect functional
- [ ] `robots.txt` correct (no staging-blocking rules carried into production)
- [ ] Sitemap submitted to GSC and Bing

**Client actions (cannot be done by Claude):**
- [ ] Old phone number (07767 268 607) updated in GBP and all directory listings
- [ ] GBP profile updated with correct phone, hours (🚩 if 24/7 confirmed), address or SAB status
- [ ] Bing Places listing updated
- [ ] DNS transferred or pointed to Vercel
- [ ] cal.com booking page URL confirmed and functional

**Dependencies:**
- All phases 1–6 complete and passing their definitions of done
- Live site crawl complete (redirect map finalised)
- Client has completed GBP and citation updates

**Definition of done:**
- Pre-launch checklist above: all items checked
- No open 🚩 items remaining in any published copy
- Site deployed to production domain
- Go-live signed off by user

---

## Summary: Phase Dependencies

```
Phase 0 (Approvals)
  ↓
Phase 1 (Scaffold)
  ↓
Phase 2 (Design System — parallel user/Penpot + code/tokens)
  ↓
Phase 3 (Layout Components)
  ↓
Phase 4 (Homepage)
  ↓
Phase 5 (Practice Area Pages)
  ↓
Phase 6 (Compliance Pages)
  ↓
Phase 7 (Pre-Launch Audit)
  ↓
Go-live
```

No phase starts before the previous phase's definition of done is met.

---

## Non-Negotiables (Active Throughout All Phases)

These apply in every phase, every component, every line of copy:

- No practitioner portrait anywhere, ever.
- No email capture, contact forms, or lead magnets.
- Conversion: phone + WhatsApp + cal.com only.
- No fabricated facts. No BSB number, Inn, year of call, cases, named partners unless confirmed.
- No marketing speak, triadic prose, rhetorical questions, or self-qualifying claims.
- Tonal banding is surgical: 1–2 dark sections per page. Never alternating.
- No raw hex values outside `tokens.css`.
- Every GSAP animation guarded by `prefers-reduced-motion`.
- design-reader → component-builder → code-reviewer on every component.
- One component per task.
