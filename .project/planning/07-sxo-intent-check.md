# SXO Intent Check — Astons Law Chambers

**Written:** 2026-05-13 (Session B, Step 2e)
**Skill used:** seo-sxo
**Input files:** .project/planning/03-site-architecture.md, .project/research-01/synthesis.md, .project/research-01/findings-criminal-law-sites.md, .project/research-01/findings-barrister-sites.md

---

## Method Note

This document applies the SXO framework to the planned page architecture from `03-site-architecture.md`. Since no live site exists, SERP analysis is based on the research files (which directly observed UK legal SERP patterns for competitive barrister and criminal law sites) and documented knowledge of UK legal search intent. Live SERP analysis must be run post-launch for each priority page.

**Limitation:** Without live SERP data, intent consensus percentages cannot be precise. Where a live SERP check is essential before a build decision is made, this is flagged explicitly.

---

## 1. Overarching Intent Finding (From Research)

**Source: synthesis.md §4**

> "The defendant does not search for 'criminal defence barrister' — they search for 'arrested for assault what happens' or 'drink driving caught what do I do.'"

This is the central SXO insight for this site. It creates a split:

| Query type | Example | Intent | Page type SERP expects |
|-----------|---------|--------|----------------------|
| Branded/category | "criminal defence barrister London" | Navigational / transactional | Service pages (firm websites) |
| Situation-based | "arrested for assault what happens" | Informational (panic phase) | Informational guides, mixed |
| Offence-specific decision | "drink driving caught should I get lawyer" | Commercial investigation | Mix of service and informational |
| Direct transactional | "hire criminal defence barrister" | Transactional | Service pages |

**Implication for the 7-zone structure:** The planned page type (service page with situation-awareness elements) is a hybrid that can serve both informational and transactional intent. However, the headline and Zone 1 content must mirror the situation-based search phrase to match informational intent SERPs, not just the category term. This is already partially addressed in synthesis.md §3: "headline mirrors search phrase, not legal category."

---

## 2. Per-Practice-Area Intent Analysis

### 2.1 Criminal Defence

**High-priority queries:**
- "criminal defence barrister" — Transactional; SERP expects service pages
- "arrested by police what happens" — Informational; SERP expects guides
- "police interview under caution" — Informational; SERP likely shows guides + some service pages
- "criminal defence direct access" — Transactional/navigational

**Planned page type:** Service page (7-zone)

**Verdict: ALIGNED with transactional queries. PARTIAL MISMATCH with informational queries.**

The 7-zone structure Zone 2 ("Situation acknowledgement") and Zone 3 ("What to do right now") contain the informational content that informational-intent SERPs reward. If these zones are written in the language of situation-based queries ("arrested" / "police station" / "interview under caution"), the page can compete for mixed-intent SERPs.

**SXO recommendation:** Zone 2 and Zone 3 must use language that mirrors informational search phrases. The page should not lead with "Criminal Defence Barrister" as the only H1. Consider an H1 that mirrors a common situation phrase, e.g., "Facing Criminal Proceedings? Direct Representation Without a Solicitor."

**No conflict with 03-site-architecture.md.** One page for Criminal Defence is correct. The offence-type anchor section model works here — criminal defence queries are primarily situation-based, not offence-specific-deep.

---

### 2.2 Motoring Law ← CONFLICT FLAGGED

**High-priority queries:**
- "drink driving solicitor" — Transactional; SERP shows solicitor/barrister service pages
- "drink driving caught what happens UK" — Informational; SERP shows informational guides
- "totting up disqualification help" — Transactional/informational mix; SERP shows specialist pages
- "drug driving penalty UK" — Informational; likely shows GOV.UK + specialist legal pages
- "mobile phone while driving solicitor" — Transactional; service pages
- "dangerous driving charge UK" — Informational/commercial; guides + service pages

**Planned page type:** One motoring page with offence-type anchor sections (Decision 3 from 01-synthesis-gaps.md)

**Verdict: PARTIAL MISMATCH for offence-specific queries. ALIGNED for category queries.**

**The conflict:**

For category-level queries ("motoring law barrister", "motoring offence solicitor"), one service page is correct — this is transactional intent.

For offence-specific queries ("drink driving caught what happens", "totting up disqualification appeal"), Google surfaces either:
(a) GOV.UK informational pages, or
(b) Specialist legal pages dedicated to that specific offence

A single "Motoring Law" page with anchor sections competes weakly for offence-specific queries because:
- The URL `/practice-areas/motoring-law/` does not match offence-specific search intent
- Anchor sections on a long page are less indexable than separate URLs for distinct search phrases
- Offence-specific queries have **distinct** user intent (drink-driving is not the same user state as mobile phone offence)

**Conflict with 03-site-architecture.md Decision 3:**

`03-site-architecture.md` resolved Decision 3 as "anchor sections at MVP." This is pragmatically correct for the build phase. However, this SXO analysis confirms the research finding that offence-specific sub-pages have higher SEO ceiling than anchor sections.

**Flagged to 03-site-architecture.md:** The Phase 2 promotion of motoring sub-pages to standalone URLs is not optional from an SEO standpoint — it is the plan for capturing offence-specific search volume. This should be flagged as a known SEO limitation of the MVP approach, not an open decision.

**SXO recommendation for MVP:**
- Publish the single `/practice-areas/motoring-law/` page with anchor sections at MVP as planned
- Include strong, situation-based H2 headings for each offence type (these become internal anchor targets and improve relevance for offence-specific queries even without separate URLs)
- Title tag: "Motoring Law Barrister — Drink Driving, Drug Driving, Totting Up | Astons Law Chambers" (enumerate offence types in the title)
- Treat the anchor section H2s as mini-page-topics: each should use the exact phrase the user searches, not the legal category name

---

### 2.3 Immigration

**High-priority queries:**
- "immigration barrister" — Transactional; service pages
- "visa refusal appeal UK" — Informational/transactional; guides + service pages
- "deportation order help UK" — Crisis/transactional; service pages
- "immigration direct access barrister" — Transactional/navigational; service pages
- "immigration appeal without solicitor" — Informational/transactional; guides + service

**Planned page type:** Service page (7-zone)

**Verdict: ALIGNED.** Immigration barrister queries are predominantly transactional or commercial investigation. The 7-zone structure serves both well. Zone 2 (situation acknowledgement) should address the "visa refusal appeal" and "deportation" situations explicitly. Zone 6 FAQs should address "do I need a solicitor for immigration appeal" — the most common knowledge gap.

**No conflict with 03-site-architecture.md.**

---

### 2.4 Family Law

**High-priority queries:**
- "family law barrister" — Transactional; service pages
- "divorce without solicitor UK" — Informational; mix of GOV.UK and guides
- "direct access barrister family law" — Transactional/navigational
- "child custody hearing UK" — Informational; mix of guides and service pages

**Planned page type:** Service page (7-zone)

**Verdict: ALIGNED for transactional queries. NOTE on informational queries.**

"Divorce without solicitor UK" and similar queries show GOV.UK in position 1-3 almost universally. Competing for these queries is not realistic for a barrister practice site. Focus the Family Law page on transactional/commercial investigation queries where service pages compete.

**SXO recommendation:** Family Law Zone 1 should not target "divorce without solicitor" as an H1 phrase — it would attract informational intent users who are not ready to hire. Target H1: something like "Family Law Proceedings — Direct Access Representation" — which serves transactional intent while addressing the direct access knowledge gap.

---

### 2.5 Proceeds of Crime

**High-priority queries:**
- "proceeds of crime barrister" — Transactional; niche service pages
- "POCA order challenge" — Informational/transactional; specialist pages
- "asset freezing order solicitor" — Transactional; service pages
- "confiscation order hearing help" — Transactional; service pages

**Planned page type:** Service page (7-zone)

**Verdict: ALIGNED.** This is a highly specialised, predominantly transactional SERP. Users searching POCA terms are usually in a specific legal situation and seeking representation, not general information. The 7-zone structure is appropriate. Zone 2 should explicitly describe the confiscation order hearing scenario — users in this situation have very specific needs.

---

### 2.6 Regulatory Law

**High-priority queries:**
- "regulatory law barrister" — Transactional; niche service pages
- "professional regulatory investigation" — Informational/transactional; specialist pages
- "SRA investigation help" or "FCA investigation" — Transactional; service pages

**Planned page type:** Service page (7-zone)

**Verdict: ALIGNED for the planned queries.** However, the user state for regulatory investigations is distinct from criminal defence: this is typically a professional facing a career-ending regulatory investigation. Zone 2 (situation acknowledgement) for this page needs to reflect the professional's situation, not a defendant in crisis. This is a content direction note for the copy brief, not an architecture conflict.

---

### 2.7 Extradition

**High-priority queries:**
- "extradition barrister UK" — Transactional; very niche service pages
- "European arrest warrant UK" — Informational/transactional; specialist pages
- "extradition lawyer" — Transactional; service pages

**Planned page type:** Service page (7-zone)

**Verdict: ALIGNED.** Extradition is extremely niche. Organic competition is low. The user searching these terms is typically a professional (solicitor or family member acting on behalf of an arrested person) rather than the defendant directly. Zone 2 should acknowledge both user types.

---

### 2.8 Inquests

**High-priority queries:**
- "inquest barrister" — Transactional; niche service pages
- "coroner inquest representation" — Transactional; service pages
- "Article 2 inquest" — Informational/transactional; specialist pages

**Planned page type:** Service page (7-zone)

**Verdict: ALIGNED.** Users searching inquest terms are family members or individuals involved in a coroner's process. They are seeking representation, not general information. Zone 2 should address the family member situation specifically — this is the primary audience.

---

### 2.9 Civil Litigation

**High-priority queries:**
- "civil litigation barrister" — Transactional; service pages
- "direct access civil litigation" — Transactional/navigational

**Planned page type:** Service page (7-zone)

**Verdict: ALIGNED but note.** Civil litigation is a broad category with very heterogeneous search intent. Without knowing the specific types of civil litigation the practice handles, Zone 1 cannot be optimised for a specific query. The content brief for this page requires the client to define the specific civil litigation matters handled.

---

### 2.10 Licensing

**High-priority queries:**
- "licensing barrister" — Transactional; service pages
- "premises licence revoked help" — Transactional; specialist pages
- "licensing application solicitor" — Transactional; service pages
- "licensing appeal UK" — Transactional/informational

**Planned page type:** Service page (7-zone)

**Verdict: ALIGNED.** Licensing queries are predominantly transactional. Business owners whose licences are threatened are motivated buyers. Zone 2 should address the licence review or revocation scenario specifically — this is the highest-crisis entry point.

---

## 3. Homepage Intent Check

**High-priority queries:**
- "criminal defence barrister" — Transactional; service pages
- "direct access barrister" — Navigational/transactional; barristers' websites + Bar Council pages
- "Astons Law Chambers" — Branded; homepage
- "barrister without solicitor" — Informational/transactional; mix of guides and barristers' sites

**Planned page type:** Routing hub (homepage)

**Verdict: ALIGNED for branded and routing hub queries. PARTIAL for non-branded.**

The homepage as a routing hub does not compete directly for high-volume informational queries — nor should it. The homepage's role is: (1) routing users to the right practice area page, (2) establishing brand credibility, (3) providing above-fold phone + WhatsApp CTAs for the user who has already decided to call.

For "direct access barrister" and "barrister without solicitor" queries, the `/direct-access/` page is the correct target, not the homepage. Internal links from homepage → `/direct-access/` reinforce this.

---

## 4. Practice Areas Hub Intent Check

**URL:** `/practice-areas/`

**High-priority queries:**
- "practice areas Astons Law Chambers" — Branded navigational
- No significant non-branded traffic expected for this URL

**Verdict: ALIGNED.** The hub page is a navigational resource, not a ranking target. Its SEO value is in the internal linking structure it provides, not in SERP traffic.

---

## 5. Fees & Legal Aid Page Intent Check

**High-priority queries:**
- "barrister fees legal aid" — Informational/commercial; mix of guides and legal aid info
- "legal aid criminal defence" — Informational; GOV.UK + guides + legal aid organisations
- "how much does a barrister cost" — Informational; guides and service pages

**Planned page type:** Compliance + conversion page

**Verdict: OPPORTUNITY.** The `/fees/` page has underexploited SEO potential.

Queries like "how much does a criminal defence barrister cost" and "criminal defence legal aid eligibility" are high-intent commercial investigation queries. Users searching these are in the decision phase — they have a legal issue and are trying to determine if they can afford help.

**SXO recommendation:** The `/fees/` page is not just a BSB compliance page — it is a high-value SEO target for cost-anxiety queries. Structure the page to answer:
1. "Do I qualify for legal aid?" — informational, high-intent
2. "How much does representation cost?" — commercial investigation, high-intent
3. "Can I afford a barrister?" — emotional barrier removal

This is already supported by synthesis.md §3: "legal aid signal is the highest conversion friction-removal mechanism." From an SXO perspective, this page should also be treated as a content SEO asset, not only a compliance page.

---

## 6. Direct Access Page Intent Check

**URL:** `/direct-access/`

**High-priority queries:**
- "direct access barrister" — Informational/navigational; Bar Council, barristers' sites
- "can I hire a barrister without a solicitor" — Informational; guides and barristers' sites
- "public access barrister UK" — Informational/navigational

**Planned page type:** Explainer/compliance page

**Verdict: ALIGNED and OPPORTUNITY.** "Can I hire a barrister without a solicitor" is a genuine informational-intent query where the `/direct-access/` page can rank. This is one of the few pages on the site that should be structured primarily for informational intent.

**SXO recommendation:** The Direct Access page should answer the specific question "Can I hire a barrister without a solicitor?" in the above-fold area, not just explain what direct access means abstractly. The H1 should mirror the user's question.

---

## 7. Consolidated Intent-Architecture Conflicts

| Conflict | Severity | Flagged to | Recommended Resolution |
|----------|----------|-----------|----------------------|
| Motoring Law: anchor sections underperform standalone URLs for offence-specific queries | HIGH | 03-site-architecture.md §6, §7 | Confirm Phase 2 sub-page promotion as a firm SEO roadmap commitment, not an optional future decision |
| Motoring Law title tag must enumerate offence types even at MVP | MEDIUM | Content brief | Title tag format: "Motoring Law Barrister — Drink Driving, Drug Driving, Totting Up" |
| Zone 1 headlines must mirror situation-based search phrases, not category labels | HIGH (affects all 10 pages) | Content strategy | Every H1 should be validated against the query the page targets before copy is written |
| Fees & Legal Aid page treated as compliance page only | MEDIUM | 08-content-strategy.md | Structure `/fees/` as a content SEO asset targeting cost-anxiety queries, not just a disclosure page |
| Direct Access page H1 must mirror the user question | MEDIUM | Content brief | H1: mirror "Can I use a barrister without a solicitor?" or equivalent |
| Criminal Defence page must address "arrested what happens" alongside service intent | MEDIUM | Content brief | Zone 2–3 must use language from informational queries; avoid legal-category framing |

---

## 8. Post-Launch SXO Validation Checklist

These checks cannot be done pre-build. Run within 90 days of launch.

- [ ] For each P0 page: run live SERP analysis for primary keyword. Confirm page type is aligned with SERP consensus.
- [ ] For Motoring Law: check SERP composition for "drink driving caught UK" and "totting up disqualification" — if standalone offence-type pages dominate, escalate Phase 2 sub-page creation.
- [ ] For Fees & Legal Aid: check GSC for "barrister fees", "legal aid criminal", "how much does a barrister cost" — if impressions are present, this page has SEO potential worth developing further.
- [ ] Check Google Search Console for any practice area page appearing for informational queries where the page has low CTR — these are intent mismatches to address in copy.
