# BSB Compliance Map — Astons Law Chambers

**Written:** 2026-05-13 (Session A, Step 1b)
**Source:** BSB Transparency Rules (in force July 2019), verified in findings-barrister-sites.md §2, synthesis.md §6
**No conflicts with prior planning files.**

> **Disclaimer:** This document is an operational planning reference, not formal legal advice. For definitive interpretation of the BSB Handbook and Transparency Rules, consult the Bar Standards Board directly or seek qualified legal counsel.

---

## Overview

All barristers with a website must comply with the BSB Transparency Rules. Astons Law Chambers handles 10 practice areas under direct access, making full compliance mandatory before launch. Three of the 10 practice areas fall under extended disclosure requirements (motoring offences, immigration, licensing). Several requirements are blocked by unconfirmed client facts (🚩).

---

## 1. Universal Requirements (All Barristers With a Website)

These apply regardless of practice area.

### 1.1 Regulatory Identity Statement

| Requirement | Mandatory text | Page | Status | Notes |
|-------------|---------------|------|--------|-------|
| "Regulated by the Bar Standards Board" displayed on homepage | Yes — exact words, not paraphrase | Homepage | ❌ Not yet present | Must be visible on the homepage; footer placement acceptable; also required on all professional emails and letterheads |
| Link to BSB Barristers' Register | Yes | Homepage footer or Fees page | ❌ Not yet present | Link: https://www.barstandardsboard.org.uk/for-the-public/search-a-barrister.html |

**Satisfied by:** A site-wide footer component containing the regulatory statement and BSB Register link. No new page required.

---

### 1.2 Pricing and Quotation Information

| Requirement | What it requires | Page | Status | Notes |
|-------------|-----------------|------|--------|-------|
| State that clients may request a fee quotation | Yes | Fees & Legal Aid | ❌ Page not yet built | Standard sentence: "Contact us for a fee quotation tailored to your circumstances." |
| State the most commonly used pricing models | Yes | Fees & Legal Aid | ❌ Page not yet built | Must state whether fixed fee, hourly rate, and/or conditional fee arrangements are offered |

**Satisfied by:** Fees & Legal Aid page — the pricing models section.

---

### 1.3 Service Information

| Requirement | What it requires | Page | Status | Notes |
|-------------|-----------------|------|--------|-------|
| State the practice areas most commonly served | Yes | Homepage + Fees & Legal Aid | ⚠️ Partially planned | The 10 practice areas are confirmed; the page is not yet built |
| Describe the most commonly provided legal services | Yes | Homepage or Fees page | ❌ Not yet present | Brief description of what a direct access barrister does and the types of matters handled |
| State factors affecting service timescales | Yes (generic) | Fees & Legal Aid | ❌ Not yet built | Can be addressed with a general statement about case complexity, court listing times, etc. |

**Satisfied by:** Fees & Legal Aid page + Homepage practice area section.

---

### 1.4 Complaints Procedure and Legal Ombudsman (LeO) Signposting

This is the most detailed universal requirement and requires its own dedicated page or section.

| Requirement | What it requires | Page | Status | Notes |
|-------------|-----------------|------|--------|-------|
| Display complaints procedure | Yes — full procedure | Dedicated Complaints section or page | ❌ Not yet present | Cannot be buried in footer text |
| State the right to complain to the LeO | Yes | Complaints section | ❌ Not yet present | |
| State how to contact the LeO | Yes | Complaints section | ❌ Not yet present | LeO contact: 0300 555 0333 / www.legalombudsman.org.uk |
| State applicable time limits for LeO complaints | Yes | Complaints section | ❌ Not yet present | Time limit: within 1 year of the act/omission, or within 1 year of the complainant reasonably knowing there was a cause for complaint; and within 6 years of the act/omission |
| Link to LeO decision data | Yes | Complaints section | ❌ Not yet present | Link: https://www.ombudsmanservices.org/legal/decisions/ (verify current URL with BSB) |
| Link to BSB Barristers' Register | Yes (repeat) | Complaints section | ❌ Not yet present | Same link as §1.1 |

**Implementation note:** The complaints procedure needs to include at least: (a) how to make a complaint to the practice directly, (b) what the practice will do in response, (c) the right to escalate to LeO if unresolved within 8 weeks, (d) LeO contact details and time limits. The exact wording of the internal complaints process requires client input.

**New flagged item:** 🚩10 — Internal complaints process wording. What are Astons' actual response time commitments for complaints? (Distinct from 🚩5, which covers general response times.) Must be confirmed before the Complaints section is written.

**Satisfied by:** One of:
- A dedicated `/complaints/` page linked from the footer
- A Complaints section on the Fees & Legal Aid page
- A Complaints section in the footer (if substantial enough to be "displayed" per BSB)

Recommendation: Separate `/complaints/` page linked from the primary footer. Keeps the Fees page focused on conversion. The complaints page is low-traffic but legally required.

---

### 1.5 Public Access Guidance Link

| Requirement | What it requires | Page | Status | Notes |
|-------------|-----------------|------|--------|-------|
| Link to BSB Public Access Guidance for Lay Clients | Yes | Direct Access page + any page mentioning direct access | ❌ Not yet present | Link: https://www.barstandardsboard.org.uk/for-the-public/going-to-court-without-a-barrister.html (verify with BSB) |

**Satisfied by:** Direct Access page (planned in CLAUDE.md as `/direct-access/`). Also recommended as a footer link.

---

## 2. Extended Requirements — Three Practice Areas

For these service types, the BSB Transparency Rules require specific fee information beyond the general pricing statement.

**Astons practice areas triggering extended disclosure:**
- **Motoring Offences** (explicitly named in BSB list)
- **Immigration** (immigration appeals — explicitly named)
- **Licensing** (licensing applications — explicitly named in BSB list)

> **Gap found:** The synthesis.md (§6) correctly identified Motoring and Immigration but did not flag Licensing as a third area requiring extended disclosure. This is a planning error that this document corrects. Licensing must be treated at parity with Motoring and Immigration for fee transparency.

### 2.1 Extended Disclosure Requirements (Motoring, Immigration, Licensing)

Each of the three areas requires ALL of the following on the website:

| Requirement | Motoring | Immigration | Licensing |
|-------------|---------|-------------|----------|
| Indicative fee amounts by pricing model | 🚩 Required | 🚩 Required | 🚩 Required |
| Circumstances under which fees may vary | 🚩 Required | 🚩 Required | 🚩 Required |
| VAT status stated explicitly | 🚩 Required | 🚩 Required | 🚩 Required |
| Likely additional costs with typical ranges | 🚩 Required | 🚩 Required | 🚩 Required |
| Service description for common matters | ❌ Not yet written | ❌ Not yet written | ❌ Not yet written |
| Key stages of the process | ❌ Not yet written | ❌ Not yet written | ❌ Not yet written |
| Indicative timescales | ❌ Not yet written | ❌ Not yet written | ❌ Not yet written |

**New flagged items:**
- 🚩7: Indicative fee ranges for Motoring, Immigration, and Licensing — three separate confirmations needed. These are legally required disclosures, not optional marketing.
- 🚩8: VAT status — is Astons VAT-registered? Must be confirmed before any fee information is published. If VAT-registered, all fees must state "plus VAT at the current rate." If not, state "no VAT applicable."

**Where this content lives:**
- Primary location: Fees & Legal Aid page (one section per practice area, or one consolidated table)
- Secondary location: Each individual practice area page (motoring, immigration, licensing) — the fee information is also a conversion signal and helps users qualify themselves

**Recommendation:** Do not publish fee ranges speculatively. Leave blank/placeholder until client confirms. Competing sites omit fee information and are in technical non-compliance — Astons can differentiate by being the practice that publishes honest, verified ranges.

---

## 3. Direct Access Specific Requirements

Astons operates as a direct access practice. Additional obligations apply.

| Requirement | What it requires | Page | Status |
|-------------|-----------------|------|--------|
| Link to BSB Public Access Guidance | Yes (see §1.5) | Direct Access page | ❌ Not yet present |
| Disclosure of litigation limitation | Yes — public access barristers generally cannot conduct litigation | Direct Access page + each practice area page where relevant | ❌ Not yet present |
| Direct access training status | Implicitly required — only barristers who have completed BSB-approved training may undertake public access work | About/Direct Access page | ❌ — awaiting confirmation of training status (verified fact required) |

**Note on litigation limitation:** This must be disclosed honestly. Recommended wording (to be reviewed): "As a direct access barrister, Astons Law Chambers can represent you directly in most matters without you needing to instruct a solicitor first. In cases that require litigation management — such as serving court documents or issuing proceedings — a solicitor may also need to be involved. This will be confirmed at the initial consultation." The exact wording should be confirmed by the client.

---

## 4. UK GDPR / Data Protection Compliance

Astons' conversion paths (phone, WhatsApp, cal.com) all involve the collection or processing of personal data. UK GDPR and the UK Data Protection Act 2018 apply.

### 4.1 Privacy Notice

| Requirement | What it requires | Page | Status | Notes |
|-------------|-----------------|------|--------|-------|
| Privacy notice (Privacy Policy) | Required — must explain what data is collected, why, legal basis, retention, rights | `/privacy-policy/` | ❌ Not yet present | Required before launch |
| Cookie policy | Required under PECR — explain cookies, their purpose, and consent mechanism | Footer link or Privacy Policy | ❌ Not yet present | Next.js without analytics = minimal cookie footprint; PECR consent mechanism may be minimal |

### 4.2 Third-Party Processors

| Processor | Data processed | DPA required | Notes |
|-----------|---------------|-------------|-------|
| Vercel | Server logs, IP addresses | Vercel DPA covers this | Covered by Vercel's standard DPA |
| cal.com | Name, email, booking details | Yes | cal.com is a data processor; scheduling data is personal data |
| WhatsApp/Meta | Phone numbers, messages | No direct DPA — Meta's privacy policy covers end-users | WhatsApp messages are not processed on the Astons site itself |
| Google (if analytics added) | Page view data | Yes — if added, this triggers full PECR consent requirements | Project brief explicitly excludes analytics scripts in critical render path; if Google Analytics is added later, a full consent flow is required |

### 4.3 Lawful Basis for Contact Data

- Phone calls: Legitimate interest (providing legal services)
- WhatsApp messages: Contract performance / legitimate interest
- cal.com bookings: Contract performance
- No email capture: Correctly excluded per project brief

---

## 5. Compliance Page Architecture

This section maps all compliance requirements to the proposed URL structure.

| URL | Content | Priority | New page? |
|-----|---------|---------|----------|
| `/` (homepage footer) | "Regulated by the Bar Standards Board" + BSB Register link + footer nav links to Fees, Complaints, Privacy, Direct Access | P0 — required at launch | No — footer component |
| `/fees/` | Pricing models, fee quotation offer, legal aid overview, extended disclosure for Motoring + Immigration + Licensing, VAT status, timescales | P0 — required at launch | Yes |
| `/complaints/` | Internal complaints procedure, LeO right + contact + time limits, LeO decision data link, BSB Register link | P0 — required at launch | Yes |
| `/direct-access/` | What direct access means, no-solicitor explanation, litigation limitation disclosure, BSB Public Access Guidance link | P0 — required at launch | Yes — in CLAUDE.md IA |
| `/privacy-policy/` | UK GDPR privacy notice, PECR cookie statement, third-party processors list | P0 — required at launch | Yes |
| `/practice-areas/motoring-law/` | Extended fee disclosure for motoring offences, key stages, timescales | P0 — legally required | Yes — planned |
| `/practice-areas/immigration/` | Extended fee disclosure for immigration appeals, key stages, timescales | P0 — legally required | Yes — planned |
| `/practice-areas/licensing/` | Extended fee disclosure for licensing applications, key stages, timescales | P0 — legally required | Yes — planned |

---

## 6. Compliance Checklist for Launch

### Must be complete before go-live:

- [ ] "Regulated by the Bar Standards Board" in homepage footer
- [ ] BSB Barristers' Register link in footer
- [ ] Fees & Legal Aid page live with pricing models + quotation offer
- [ ] Indicative fee ranges for Motoring (🚩7), Immigration (🚩7), Licensing (🚩7) — requires client confirmation
- [ ] VAT status confirmed and stated (🚩8)
- [ ] Complaints procedure page live with LeO details and time limits
- [ ] LeO decision data link in complaints page
- [ ] Direct Access page live with litigation limitation disclosure
- [ ] BSB Public Access Guidance link on Direct Access page
- [ ] Privacy Policy page live (UK GDPR compliant)
- [ ] Cookie statement in footer (minimal — no analytics scripts in critical path)
- [ ] All practice area pages: no fabricated statutory section numbers or case citations
- [ ] All email signatures include "Regulated by the Bar Standards Board" (reminder to client — out of scope for website build)

### Blocked until client confirms:

- [ ] Fee ranges for Motoring, Immigration, Licensing (🚩7)
- [ ] VAT status (🚩8)
- [ ] Internal complaints response timeframes (🚩10)
- [ ] Direct access training status (verified fact required — cannot be asserted without confirmation)
- [ ] Police station duty advice offered? (🚩2) — affects service description for Criminal Defence
- [ ] Legal aid per practice area (🚩3) — affects Fees page legal aid section
- [ ] Availability / out-of-hours coverage (🚩1) — affects service description statements

---

## 7. New Flagged Items Raised by This Analysis

These were not in the original six flagged items from synthesis.md. They are genuine blockers for BSB compliance.

| # | Item | Why it matters |
|---|------|---------------|
| 🚩7 | Indicative fee ranges: Motoring, Immigration, Licensing | Legally required by BSB Transparency Rules; three separate confirmations needed |
| 🚩8 | VAT status (registered or not) | Must appear on all fee disclosures; cannot be omitted |
| 🚩9 | Direct access training completion status | Cannot state "direct access barrister" without confirmed training status |
| 🚩10 | Internal complaints response timeframe | Required to complete the complaints procedure section |

---

## 8. Compliance Requirements Not Required for This Site

These BSB or related requirements do not apply or are explicitly excluded:

| Requirement | Why excluded |
|-------------|-------------|
| Licensed Access requirements | Astons operates under public access, not licensed access |
| Conditional fee agreements (CFAs) / damages-based agreements | Not applicable unless Astons offers these — not confirmed |
| Immigration Advisor registration (OISC) | Not applicable — Astons is regulated by BSB, not OISC |
| Cookie consent banner with opt-in | Not required unless analytics or marketing cookies are added; project brief excludes these |
| Accessibility statement | Legally required under PSBAR if Astons were a public body; not currently required for a private barrister's site — but a good practice inclusion |

---

## Sources

All requirements verified against:
- BSB Transparency Rules: https://www.barstandardsboard.org.uk/for-barristers/compliance-with-your-obligations/transparency-rules.html
- BSB Transparency Standards Guidance (PDF): findings-barrister-sites.md source #4
- LeO contact and time limits: standard UK legal ombudsman requirements
- UK GDPR / Data Protection Act 2018: ICO guidance
