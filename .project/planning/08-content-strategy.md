# Content Architecture Plan — Astons Law Chambers

**Written:** 2026-05-13 (Session B, Step 3a)
**Skill used:** content-strategy
**Input files:** .project/research-01/synthesis.md, .project/planning/03-site-architecture.md, .project/planning/07-sxo-intent-check.md, .project/planning/02-bsb-compliance-map.md

---

## Notes on Scope

This document plans **structure only** — no body copy is written here. Every section listed is a structural requirement, not a copy draft. Copy production begins only after the 10 flagged client items are confirmed.

The 7-zone structure for practice area pages is defined in `synthesis.md §3` and referenced throughout.

---

## Content Principles (Non-Negotiable)

All copy written against this plan must conform to these rules. They are not repeated per page — they apply universally.

| Rule | Source |
|------|--------|
| Entity-first. "Astons Law Chambers" not "Ghulam" in body copy | Project brief |
| No marketing speak. No rhetorical questions, triadic structures, value-prop framing | Memory: feedback_no_marketing_speak |
| Natural barrister voice. No AI-style prose (anaphora, em-dash maximalism, aphoristic closes) | Memory: feedback_natural_voice |
| No statutory section numbers or case citations without 2026-verified confirmation | Memory: feedback_legal_specificity |
| No fabricated client facts (BSB number, Inn, year of call, cases, partners) | Memory: feedback_no_fabricated_facts |
| Tonal banding is surgical: 1–2 dark emphasis sections per page maximum | Memory: feedback_no_alternating_banding |
| No contact forms, email capture, or lead magnets anywhere | Project brief |
| Conversion is phone + WhatsApp + cal.com only | Project brief |
| No practitioner portrait anywhere | Project brief |
| 🚩 items are structural placeholders — never resolved unilaterally | Project brief |

---

## Audience States

Three audience states apply across the site. Each page's primary audience state determines its tone, urgency level, and CTA placement.

| State | Description | Copy register |
|-------|-------------|---------------|
| **Crisis** | Person is facing immediate legal jeopardy — arrest, charge, police station call, court tomorrow | Direct, calm, urgent. Minimal friction. Phone CTA visible without action. |
| **Researching** | Person has a legal issue but time to consider options — pending charge, tribunal, upcoming hearing | Informative, reassuring, processual. Fee transparency matters here. |
| **Referral** | Professional (solicitor, GP, employer) looking on behalf of a client, or family member looking for the person | Credibility-first. Clear credentials. Explicit statement of how to refer. |

---

## 1. Homepage (`/`)

**Primary intent:** Route users to the correct practice area page within one tap; provide immediate conversion mechanism for the user who has already decided to call.

**Primary audience state:** Crisis (but must also serve Researching and Referral)

**Word count target:** 400–600 words (routing hubs should not compete with practice area pages for word count)

### Required Sections

| # | Section | Content | Conversion trigger | 🚩 |
|---|---------|---------|-------------------|-----|
| 1 | Above-fold | Practice name, single positioning statement (entity-first), phone number (tap-to-call, visually dominant), WhatsApp button, legal aid signal (one line) | Phone and WhatsApp in Zone 1 — 0 clicks | 🚩1 availability signal only if confirmed; 🚩3 legal aid line wording |
| 2 | Practice Areas | Card grid — 10 practice areas with title and one-sentence description; each links to `/practice-areas/[slug]/` | Each card is a conversion path | None |
| 3 | Direct access explainer | 2–3 sentences: "You can instruct Astons Law Chambers directly. No solicitor required." + link to `/direct-access/` | Link to Direct Access page | 🚩9 — cannot state "direct access barrister" without confirmed training status |
| 4 | Trust signals | 2–4 items only: BSB regulatory statement, confirmed credentials (when confirmed), legal aid signal | Inline — in Trust section | 🚩9 credentials; 🚩3 legal aid |
| 5 | Footer (site-wide) | BSB regulation text (exact: "Regulated by the Bar Standards Board") + BSB Register link + nav links | Sticky bar (separate component) | BSB required |

**BSB compliance notes:**
- "Regulated by the Bar Standards Board" must appear on the homepage — footer placement acceptable
- BSB Barristers' Register link required in footer
- No fee information required on the homepage (see Fees page)

**No-go content:**
- No hero image, hero photograph, or above-fold illustration
- No social media links in above-fold or header
- No blog teasers or news items
- No testimonial wall (unless 20+ verified reviews confirmed — currently unknown)
- No awards or "as seen in" banners

---

## 2. Practice Areas Hub (`/practice-areas/`)

**Primary intent:** Navigational index — route users to the right practice area page in one tap.

**Primary audience state:** Researching (user is exploring options, not yet in crisis)

**Word count target:** 150–300 words (this page is a navigational aid, not a content page)

### Required Sections

| # | Section | Content | 🚩 |
|---|---------|---------|-----|
| 1 | Brief introduction | 1–2 sentences: what Astons Law Chambers handles; link to `/direct-access/` | None |
| 2 | Practice area cards | 10 cards in grid layout, each with: practice area title, 1-sentence description, link to practice area page | None |
| 3 | Fees signal | One-line link to `/fees/` — "Fee information and legal aid" | 🚩3 if any legal aid signal is included here |

**No individual practice area content on this page.** The hub is a routing mechanism only.

---

## 3. Practice Area Pages — P0 (Full Zone 1–7 at Launch)

All three P0 practice area pages follow the 7-zone structure defined in `synthesis.md §3`. Zone requirements and 🚩 items are documented once in §3a (template) and specific notes per area follow.

### 3a. 7-Zone Template (Applies to All 10 Practice Areas)

| Zone | Section | Content specification | Word count | Conversion trigger | 🚩 |
|------|---------|----------------------|------------|-------------------|-----|
| 1 | Above-fold confirmation | H1 mirrors search phrase, not legal category (per SXO check §1). Phone tap-to-call, visually dominant. WhatsApp button. Legal aid signal (single line). | 50–100 words | Phone + WhatsApp — 0 clicks | 🚩1 availability; 🚩3 legal aid line |
| 2 | Situation acknowledgement | 4–6 sentences describing the lived situation — no jargon, no legal definitions. Written for the person at the moment of crisis. | 100–150 words | None — this zone builds trust; conversion follows | None (area-specific) |
| 3 | What to do right now | Numbered list of 4–6 actions. Highest-converting content block in criminal defence (research confirmed). No condescension, no generic "contact a lawyer" — specific to the situation. | 100–200 words | Inline CTA after final action: phone + WhatsApp | None (area-specific) |
| 4 | How the process works | 3–5 bullet points. Process transparency removes the most common calling objection ("I don't know what will happen next"). Plain English. | 100–150 words | None | None (area-specific) |
| 5 | Trust signals | 2–4 items only. "Regulated by the Bar Standards Board" + legal aid signal if applicable + credentials when confirmed. No star ratings, no review count, no awards unless verified. | 50–100 words | Inline CTA: phone + WhatsApp | 🚩3 legal aid eligibility; 🚩9 credentials; 🚩6 free consultation if applicable |
| 6 | FAQs | 3–5 questions written as users ask them. Covers cost, legal aid eligibility, what happens next, direct access eligibility. **Note: FAQPage schema is restricted and must NOT be applied — see `05-seo-schema-plan.md §0`.** | 150–250 words | None — FAQs close objections; CTA follows | 🚩3 legal aid; 🚩7 fee ranges (Motoring, Immigration, Licensing); 🚩8 VAT (same three); 🚩6 free consultation |
| 7 | Repeat CTA | Phone, WhatsApp, cal.com. No form. 1–2 sentences of context before the buttons. | 50–75 words | Phone + WhatsApp + cal.com (if URL confirmed) | 🚩4 WhatsApp pre-fill text; cal.com URL not confirmed |

**Internal links required on every practice area page:**
- → `/fees/` (from Zone 5 trust signals and Zone 6 FAQs)
- → `/direct-access/` (from Zone 2 — direct access explainer)
- → 2–3 related practice areas (inline in body — see `03-site-architecture.md §5.2`)

---

### 3b. Criminal Defence (`/practice-areas/criminal-defence/`)

**Primary audience state:** Crisis (arrest, charge, police station)

**SXO note (from 07-sxo-intent-check.md §2.1):** H1 must mirror situation-based search phrases, not the legal category label. Zone 2–3 must use language from informational queries ("arrested," "police station," "interview under caution").

| Zone | Specific content requirements |
|------|------------------------------|
| 1 | H1: mirror a common search phrase (e.g., "Arrested or facing criminal charges?" — confirm exact wording with client). Phone as dominant element. |
| 2 | Describe the experience of arrest, charge, or being invited for a voluntary interview under caution. Three different entry points for the user: police station, post-charge, pending trial. |
| 3 | Actions split by entry point: if arrested now / if charged / if invited for voluntary interview. Note: 🚩2 — if police station duty advice is confirmed, this zone becomes the primary conversion zone for that KPI. |
| 4 | Court process: Magistrates vs Crown; what happens at first hearing; what direct access representation looks like in practice. |
| 5 | BSB regulatory statement + legal aid signal (🚩3). Inline link to `/practice-areas/proceeds-of-crime/` and `/practice-areas/regulatory-law/` per cross-link plan. |
| 6 | FAQs: "Do I need a solicitor to hire a barrister?", "Will I qualify for legal aid?" (🚩3), "What happens at a police station?" (🚩2), "How quickly can you help?" (🚩5), "Do you offer a free initial consultation?" (🚩6) |
| 7 | Standard repeat CTA |

**Special section (if 🚩2 confirmed — police station duty advice is offered):**
Add a brief section between Zone 3 and Zone 4: "Police Station Representation — available 24/7 🚩1." This becomes the primary converting element for crisis-state users being detained. Do not write this until 🚩2 and 🚩1 are confirmed.

---

### 3c. Motoring Law (`/practice-areas/motoring-law/`)

**Primary audience state:** Crisis/Researching (licence at risk, recent incident)

**SXO note (from 07-sxo-intent-check.md §2.2 — CONFLICT FLAGGED):** Offence-type anchor sections must use H2 headings that mirror specific search phrases. Title tag must enumerate offence types. Phase 2 sub-page promotion is a firm SEO roadmap commitment.

**BSB note:** Extended fee disclosure required. Zone 6 FAQs and the Fees page must both contain indicative fee ranges and VAT status for motoring offences (🚩7, 🚩8).

| Zone | Specific content requirements |
|------|------------------------------|
| 1 | H1: mirror situation phrase (e.g., "Caught Drink Driving or Facing a Motoring Charge?" — confirm). Phone dominant. |
| 2 | The situation: licence at risk, potential disqualification, the life and livelihood impact of losing a licence. Address the "I just want this to go away" psychological state. |
| 3 | What to do: do not accept any penalty without legal advice, what to do before a court date, what documents to gather. |
| 4 | Offence types as anchor sections (H2 level). Each must be a brief explanation of what happens for that offence, process, and what representation involves. Required anchor sections: `#drink-driving`, `#drug-driving`, `#totting-up`, `#mobile-phone`, `#dangerous-driving`. |
| 5 | Trust signals. Inline links to criminal defence (serious motoring offences overlap). |
| 6 | FAQs: "Can I keep my licence?", "Will I go to prison for dangerous driving?", "How much does a motoring barrister cost?" (🚩7 — leave blank or placeholder), "Do I qualify for legal aid for motoring offences?" (🚩3), VAT information (🚩8) |
| 7 | Standard repeat CTA |

**Title tag:** "Motoring Law Barrister — Drink Driving, Drug Driving, Totting Up | Astons Law Chambers" (enumerate offence types per SXO recommendation)

---

### 3d. Immigration (`/practice-areas/immigration/`)

**Primary audience state:** Crisis/Researching (visa refused, deportation notice received, status uncertain)

**BSB note:** Extended fee disclosure required. Zone 6 FAQs and Fees page must contain indicative fee ranges and VAT status for immigration appeals (🚩7, 🚩8).

| Zone | Specific content requirements |
|------|------------------------------|
| 1 | H1: mirror situation phrase (visa refusal, deportation, status uncertainty). Phone dominant. |
| 2 | The situation: uncertainty about status, family separation fears, the urgency of appeal deadlines. |
| 3 | What to do: do not ignore the decision, act immediately on appeal deadline, what documents to gather. |
| 4 | Process: types of immigration matters (appeals, bail, removal, status issues), what a barrister does at tribunal. |
| 5 | Trust signals. Inline links to `/practice-areas/family-law/` (per cross-link plan — immigration/family intersection). |
| 6 | FAQs: "Can I appeal a visa refusal?", "Do I need a solicitor for an immigration appeal?" (direct access explainer), "How much does an immigration barrister cost?" (🚩7), VAT (🚩8), "Do I qualify for legal aid for immigration matters?" (🚩3) |
| 7 | Standard repeat CTA |

---

## 4. Practice Area Pages — P1 (Zone 1–5 Minimum at Launch)

P1 pages ship with Zones 1–5. Zone 6 (FAQs) and Zone 7 (Repeat CTA) can be added in the first content update cycle. P1 pages still require phone + WhatsApp CTAs in Zone 1 and Zone 7 (even if Zone 7 is brief).

### 4a. Family Law (`/practice-areas/family-law/`)

**Primary audience state:** Researching/Crisis (often emotionally charged — divorce, custody, separation)

| Zone | Specific content requirements |
|------|------------------------------|
| 1 | H1: mirror situation phrase. Note from SXO check: do not target "divorce without solicitor" — informational intent dominated by GOV.UK. Target: "Family Court Proceedings — Direct Access Representation." |
| 2 | The situation: the personal and financial stakes of family proceedings, the complexity of navigating family court without legal support. |
| 3 | What to do: what a direct access family barrister does and does not do, what to prepare for a family hearing. |
| 4 | Process: types of family matters (financial remedy, child arrangements, domestic abuse), what representation involves. |
| 5 | Trust signals. Inline link to `/practice-areas/immigration/` (per cross-link plan). |
| 6–7 | Deferred to content update cycle. P1 launch: brief placeholder CTA only. |

---

### 4b. Proceeds of Crime (`/practice-areas/proceeds-of-crime/`)

**Primary audience state:** Crisis/Researching (POCA order received or anticipated)

| Zone | Specific content requirements |
|------|------------------------------|
| 1 | H1: mirror situation (POCA order, asset freezing, confiscation hearing). Phone dominant. |
| 2 | The situation: receipt of a POCA order, the panic of potential asset loss, the urgency of the confiscation hearing timeline. |
| 3 | What to do: immediate steps when a POCA order is received or threatened. |
| 4 | Process: types of POCA proceedings, the confiscation hearing, available defences. |
| 5 | Trust signals. Inline links to `/practice-areas/criminal-defence/` and `/practice-areas/regulatory-law/`. |
| 6–7 | Deferred. Brief placeholder CTA at launch. |

---

### 4c. Licensing (`/practice-areas/licensing/`)

**Primary audience state:** Crisis/Researching (licence review, revocation, application refused)

**BSB note:** Extended fee disclosure required (🚩7, 🚩8). Even at P1 launch, Zone 5 should flag that fee information is available at `/fees/`.

| Zone | Specific content requirements |
|------|------------------------------|
| 1 | H1: mirror situation (licence revoked, under review, application refused). Phone dominant. |
| 2 | The situation: business at risk, the hearing timeline, the personal and commercial consequences. |
| 3 | What to do: immediate steps when a licence review or revocation notice is received. |
| 4 | Process: licensing committee hearings, types of licences covered (premises, personal, activity), what representation involves. |
| 5 | Trust signals. Inline link to `/practice-areas/regulatory-law/` and `/fees/` (fee disclosure required). |
| 6–7 | Deferred. Brief placeholder CTA at launch. Note: Zone 6 must include fee information once 🚩7 and 🚩8 are confirmed — BSB legally required. |

---

## 5. Practice Area Pages — P2 (Zone 1–2 Placeholder at Launch)

P2 pages ship with: H1 (situation-based), one substantive paragraph (150+ words on what the area covers), phone + WhatsApp CTAs, and a BSB disclaimer note. No placeholder language like "content coming soon." Use honest framing: "For further information, contact Astons Law Chambers directly."

### 5a. Regulatory Law (`/practice-areas/regulatory-law/`)
- Zone 1 H1: mirror regulatory investigation situation
- Zone 2: what regulatory investigations involve for professionals
- Minimal Zone 3–4 deferred to content update
- Cross-links: Criminal Defence, Licensing

### 5b. Extradition (`/practice-areas/extradition/`)
- Zone 1 H1: mirror extradition / European Arrest Warrant situation
- Zone 2: the extradition hearing process in brief
- Cross-link: Criminal Defence

### 5c. Inquests (`/practice-areas/inquests/`)
- Zone 1 H1: mirror inquest situation (family member representation)
- Zone 2: the coroner's inquest process and why representation matters
- Cross-links: Criminal Defence, Regulatory Law

### 5d. Civil Litigation (`/practice-areas/civil-litigation/`)
- Zone 1 H1: mirror civil dispute situation
- Zone 2: types of civil matters — brief description. **Note:** until client confirms the specific civil litigation work handled, this section is generic.
- Cross-link: Proceeds of Crime (if freezing orders or enforcement overlap)

---

## 6. Fees & Legal Aid Page (`/fees/`)

**Primary intent:** BSB compliance + highest-converting friction-removal page on the site (cost-anxiety users; legal aid signal; SXO check flags this as a content SEO asset)

**Primary audience state:** Researching (user is assessing whether they can afford to proceed)

**Word count target:** 600–900 words

**BSB compliance:** This page is mandatory for launch. It is P0.

### Required Sections

| # | Section | Content | BSB Required | 🚩 |
|---|---------|---------|-------------|-----|
| 1 | Above-fold | Page H1 ("Fees, Legal Aid & Costs — Astons Law Chambers" or similar). Brief statement: Astons Law Chambers offers fee quotations tailored to each matter. Phone CTA visible. | No | None |
| 2 | Pricing models | The most commonly used pricing models: fixed fee, hourly rate, brief-by-brief. Exact models must be confirmed with client before this section is written. | Yes — required | Exact pricing model must be confirmed |
| 3 | Indicative fee ranges: Motoring | Indicative fee amounts for common motoring matters, VAT status, what affects the final fee, any likely additional costs. | Yes — BSB legally required | 🚩7 Motoring fee ranges; 🚩8 VAT status |
| 4 | Indicative fee ranges: Immigration | Same format as Motoring. | Yes — BSB legally required | 🚩7 Immigration fee ranges; 🚩8 VAT status |
| 5 | Indicative fee ranges: Licensing | Same format. | Yes — BSB legally required | 🚩7 Licensing fee ranges; 🚩8 VAT status |
| 6 | Legal aid overview | Plain-English explanation of: what legal aid is, the means test, the Interests of Justice test, which of the 10 practice areas qualify (🚩3), what to do if uncertain | Yes — conversion-critical | 🚩3 — which areas qualify |
| 7 | Police station advice | If confirmed (🚩2): "Police station legal advice is free and available regardless of income under the Police Station Duty Scheme." | 🚩2 — confirm before writing | 🚩2 police station duty advice |
| 8 | Service timescales | General statement: factors affecting how long matters take (court listings, complexity, case-specific variables). Generic language is acceptable here. | Yes | None |
| 9 | Fee quotation offer | "Contact Astons Law Chambers to request a fee quotation tailored to your circumstances." + phone/WhatsApp CTA. | Yes | 🚩4 WhatsApp pre-fill |

**SXO note (from 07-sxo-intent-check.md §5):** Structure the page to answer "Do I qualify for legal aid?" and "How much does a barrister cost?" as explicit questions at H2 level. These are high-intent commercial investigation queries. The page is both a BSB requirement and an SEO asset.

**No-go content:**
- No fabricated fee ranges — leave blank until client confirms
- No "from £X" claims without verified basis
- No "free initial consultation" language unless 🚩6 is confirmed

---

## 7. Direct Access Page (`/direct-access/`)

**Primary intent:** Remove the "I need a solicitor first" barrier; explain public access model; satisfy BSB requirement for Public Access Guidance link.

**Primary audience state:** Researching (user is confused about whether they can hire a barrister directly)

**Word count target:** 400–600 words

**SXO note (from 07-sxo-intent-check.md §6):** H1 should mirror the user question: "Can I use a barrister without a solicitor?" — not a legal-category label.

**BSB compliance:** This page is P0 (mandatory before launch).

### Required Sections

| # | Section | Content | BSB Required | 🚩 |
|---|---------|---------|-------------|-----|
| 1 | H1 | Mirror user question: "Can I use a barrister without a solicitor?" or equivalent | No | None |
| 2 | What direct access means | 2–3 paragraphs: what direct access allows (hire a barrister directly), what it does not allow (litigation management — the litigation limitation disclosure), when a solicitor may also be needed. Must be honest. | Yes — litigation limitation must be disclosed | 🚩9 — "direct access barrister" cannot be stated without confirmed training status |
| 3 | How to instruct Astons | Brief process: contact us, initial discussion, formal instruction. No fabricated steps. Phone + WhatsApp as the contact mechanism. | No | 🚩5 response time if mentioned; 🚩6 free consultation if mentioned |
| 4 | BSB Public Access Guidance link | "BSB Public Access Guidance for Lay Clients" — link to BSB public access guidance page. Required. | Yes | None |
| 5 | Repeat CTA | Phone + WhatsApp. | No | 🚩4 |

---

## 8. Complaints Page (`/complaints/`)

**Primary intent:** BSB compliance. This is not a conversion page. Low organic traffic expected. Required before launch.

**Primary audience state:** N/A (this page is accessed when things have gone wrong)

**Word count target:** 300–500 words. Complete and accurate is more important than concise.

### Required Sections

| # | Section | Content | BSB Required | 🚩 |
|---|---------|---------|-------------|-----|
| 1 | How to make a complaint | How to contact Astons Law Chambers with a complaint: phone number and/or postal address. Method and process. | Yes | 🚩10 — internal complaints response timeframe |
| 2 | Astons' complaints process | What happens after a complaint is received: acknowledgement, investigation, resolution timeframe. | Yes | 🚩10 — response timeframe required |
| 3 | Escalation to the Legal Ombudsman | Right to escalate to LeO if unresolved within 8 weeks. LeO contact details: 0300 555 0333, legalombudsman.org.uk. Time limits: within 1 year of the act/omission, and within 6 years. | Yes — exact wording and time limits required | Verify LeO contact details are current before launch |
| 4 | Link to LeO decision data | "Legal Ombudsman decision data" — link to LeO decisions portal (verify current URL with BSB before publishing). | Yes | None |
| 5 | Link to BSB Barristers' Register | Same link as footer. | Yes | None |

**No-go content:**
- No marketing content on this page
- No conversion CTAs — this is a regulatory disclosure page

---

## 9. Privacy Policy Page (`/privacy-policy/`)

**Primary intent:** UK GDPR / PECR compliance. Legal requirement before launch.

**Primary audience state:** N/A

**Word count target:** 400–800 words. Legally accurate is the only standard.

### Required Sections

Per `02-bsb-compliance-map.md §4`:

| # | Section | Content | 🚩 |
|---|---------|---------|-----|
| 1 | What data is collected | Phone call metadata (via Vercel server logs), WhatsApp message initiation (user-initiated), cal.com booking data (name, email, time). No email capture, no form submissions, no analytics cookies (per project brief). | None |
| 2 | Why data is collected | Legitimate interest (legal services provision). Contract performance (cal.com bookings). | None |
| 3 | Data retention | How long call/booking data is retained. Must be confirmed with client. | Confirm with client |
| 4 | User rights | Right to access, erasure, portability, objection (UK GDPR). | None |
| 5 | Third-party processors | Vercel (server logs), cal.com (booking data), WhatsApp/Meta (end-to-end encrypted messaging — not processed on Astons' servers). | cal.com DPA should be reviewed by client |
| 6 | Cookie statement | "This website uses only essential session cookies required for site function. No tracking or marketing cookies are used." — accurate for a Next.js site with no analytics. | None |
| 7 | Contact for data matters | Phone and/or postal address for data subject requests. | Practice address (🚩) |

**Important:** The privacy policy is a legal document. The structure above is a planning template. The client or a qualified legal professional must review the actual privacy policy copy before it is published.

---

## 10. Content Pillars Summary

For long-term content growth (post-MVP), the site's content naturally clusters into three pillars. These are not part of the MVP build — they are a roadmap signal for Phase 2.

| Pillar | URLs | Core audience state | SEO priority |
|--------|------|---------------------|-------------|
| Criminal Justice | `/criminal-defence/`, `/proceeds-of-crime/`, `/extradition/` | Crisis | Highest |
| Road Traffic | `/motoring-law/` + (Phase 2) sub-pages | Crisis/Researching | High |
| Immigration & Family | `/immigration/`, `/family-law/` | Crisis/Researching | High |
| Professional & Regulatory | `/regulatory-law/`, `/licensing/`, `/inquests/` | Researching | Medium |
| Civil | `/civil-litigation/` | Researching | Lower |

---

## 11. Dependency Map — What Blocks What

This table consolidates all 🚩 items against the sections they block across the entire content plan.

| 🚩 Item | Blocks these sections |
|--------|----------------------|
| 🚩1 — Availability | Homepage above-fold; Criminal Defence Zone 3 police station section; all Zone 1 availability signals |
| 🚩2 — Police station duty | Criminal Defence Zone 3 police station section; Fees page Section 7 |
| 🚩3 — Legal aid per area | All 10 Zone 1 legal aid signals; Zone 5 trust signals; Zone 6 FAQs on cost; Fees page Section 6 |
| 🚩4 — WhatsApp pre-fill text | Every wa.me link on the site (sticky bar, Zone 1, Zone 7, all CTAs) |
| 🚩5 — Response time | Any copy mentioning response speed (Zone 6 FAQs, Direct Access page Section 3) |
| 🚩6 — Free consultation | Zone 6 FAQ on consultation; Direct Access page Section 3; any copy referencing terms |
| 🚩7 — Fee ranges (Motoring, Immigration, Licensing) | Motoring Zone 6; Immigration Zone 6; Licensing Zone 5–6; Fees page Sections 3–5; schema Offer fields |
| 🚩8 — VAT status | All fee disclosures (same three areas); Fees page Sections 3–5 |
| 🚩9 — Direct access training | Direct Access page Section 2; Homepage Zone 3; any copy asserting "direct access barrister" |
| 🚩10 — Complaints response timeframe | Complaints page Sections 1–2 |
| Practice address | Privacy Policy Section 7; Direct Access page Section 5 (if address used as contact); Local schema; GBP |
| Cal.com URL | Zone 7 of all practice area pages; Homepage above-fold scheduling CTA |

---

## 12. Content Production Priority

This consolidates the sequencing from `03-site-architecture.md §6` into a copy production order.

| Sprint | Pages | Dependency before copy begins |
|--------|-------|-------------------------------|
| Sprint 1 (P0 structural) | Homepage, Practice Areas Hub | None — structural only |
| Sprint 2 (P0 content) | Criminal Defence, Motoring Law, Immigration | 🚩3, 🚩4 minimum; 🚩7+🚩8 for Motoring and Immigration |
| Sprint 3 (BSB compliance) | Fees & Legal Aid, Direct Access, Complaints, Privacy Policy | 🚩3, 🚩7, 🚩8, 🚩10 minimum |
| Sprint 4 (P1 content) | Family Law, Proceeds of Crime, Licensing | 🚩3 minimum; 🚩7+🚩8 for Licensing |
| Sprint 5 (P2 placeholders) | Regulatory Law, Extradition, Inquests, Civil Litigation | None beyond Zone 1–2 |
