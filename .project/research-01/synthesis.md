# Research Synthesis: Strategic Brief for Astons Law Chambers

**Synthesises:** findings-criminal-law-sites.md, findings-barrister-sites.md, findings-conversion-ux.md  
**Date:** 2026-05-13  
**Purpose:** Actionable design and content decisions derived from all three research tracks

---

## 1. Three Strongest Signals (All Three Reports Agree)

These findings are confirmed independently by every research track. They are not directional — they are the design brief.

### Signal 1: No UK criminal law site has been designed for the person in acute crisis

Every research track observed this independently:

- Criminal law sites: "No UK criminal law site has been designed with the specific cognitive and emotional state of a defendant in crisis as the primary UX brief." (findings-criminal-law-sites §8.7)
- Barrister sites: "The structural weakness common to nearly every barrister website is the absence of urgency-calibrated design." (findings-barrister-sites §5.1)
- Conversion UX: 6 of 9 distressed users could not locate familiar features on sites they used regularly. Five cognitive impairments occur simultaneously under hyperarousal. (findings-conversion-ux §1)

**What this means for Astons:** The entire market is designed for calm browsing. Nobody owns the position of a site built for the person whose son is being questioned, whose licence is about to be revoked, who just received a postal charge. Astons can take this position; no competitor has.

### Signal 2: WhatsApp is absent from every observed competitor site

- Criminal law sites: WhatsApp absent across all observed sites.
- Barrister sites: Zero of 10 observed sites offered WhatsApp. "A genuine differentiator for mobile-first defendants." (findings-barrister-sites §9, point 8)
- Conversion UX: 15–60% CTR benchmark. 66% of consumers who initiate a WhatsApp conversation with a business go on to complete a transaction. WhatsApp is the dominant messaging platform in the UK. (findings-conversion-ux §4)

**What this means for Astons:** This is a confirmed market gap, not a hypothesis. WhatsApp must be a first-class contact channel — sticky bottom bar, above-fold button, inline CTAs. The pre-filled `wa.me` deep link is the correct implementation. The pre-fill text needs client confirmation (🚩).

### Signal 3: Phone calls from mobile are where conversion happens

- 84% of all law firm phone calls come from mobile devices, despite mobile accounting for only 27% of traffic.
- Mobile converts at 21% vs desktop at 15.9%.
- 81% of users abandon contact forms before submission.
- Phone calls convert at 10–15× the rate of web leads for legal services.
- A sticky bottom bar phone+WhatsApp button generated a 10% conversion lift in A/B testing.

**What this means for Astons:** Every design decision starts from the mobile viewport. The desktop experience is secondary. A contact form should not appear on this site at any point in the user journey. The phone number is a conversion mechanism, not a footer detail.

---

## 2. Market Position Available

The research identifies a single coherent position that no competitor currently occupies:

**A site designed specifically for the defendant in crisis who needs to act now, not browse.**

This position has five structural characteristics:

1. **Urgency-first layout.** Phone and WhatsApp visible without scrolling. No competition for attention above the fold.
2. **WhatsApp as primary alternative channel.** No competitor offers it. The Astons target demographic (under 50, mobile-first) uses it as a default messaging platform.
3. **Legal aid signal at the front.** Most users self-select out believing they cannot afford help. A prominent, honest legal aid signal removes this pre-conversion dropout. Most competitor sites bury this or omit it entirely.
4. **Plain-English process clarity per offence type.** The defendant does not search for "criminal defence barrister" — they search for "arrested for assault what happens" or "drink driving caught what do I do." Pages organised by situation and offence type capture this intent.
5. **No superlatives. Measured confidence.** Most individual criminal barrister sites use extreme language ("best," "top," "leading") and then carry a BSB disclaimer that undermines the claim. A site using precise, factual copy with no self-acclaim would be structurally distinct.

---

## 3. Design Brief: What These Findings Require

### Mobile Sticky Bottom Bar
Required. Non-negotiable. Two buttons only: **Call now** (phone, primary) and **Message on WhatsApp** (secondary). Fixed to viewport bottom. 56px height minimum. Hide on scroll down / show on scroll up to avoid obscuring content. Implement in the first build iteration.

WhatsApp button colour: #25D366 or brand-adjacent. The green is a recognition trigger; do not neutralise it.

### Above the Fold (Mobile, No Scroll)
Must contain, in this priority order:
1. Specific practice statement — not a tagline, a statement of what the practice handles
2. Phone number as tap-to-call, visually dominant
3. WhatsApp button
4. Legal aid signal (single line — 🚩 wording needs client confirmation)
5. 🚩 Availability signal if client confirms coverage

Must not contain: portrait, hero photography, awards wall, social links, contact form, blog teasers, verbose navigation, regulatory disclaimers.

### Information Architecture
- Homepage = routing hub. One click to any practice area page.
- Navigation: five to six items maximum. Fees & Legal Aid as a standalone nav item — it is a decision-gate for a significant portion of the audience and should not be buried in practice area sub-pages.
- Maximum two clicks from any page to a phone call or WhatsApp initiation.
- No contact form anywhere on the site.

### Practice Area Pages
Seven-zone structure on every one of the 10 practice areas:

1. **Above-fold confirmation** — headline mirrors search phrase, not legal category. Phone + WhatsApp CTAs visible without scroll.
2. **Situation acknowledgement** — 4–6 sentences describing the lived situation. No jargon.
3. **What to do right now** — numbered list. Highest-converting content block in criminal defence.
4. **How the process works** — 3–5 bullets. Process transparency removes the most common calling objection.
5. **Trust signals** — credentials, legal aid signal, verified experience. 2–4 items. Not a wall.
6. **FAQs** — 3–5 questions as users ask them. Covers cost, legal aid eligibility, what happens next.
7. **Repeat CTA** — phone, WhatsApp, cal.com. No form.

Body copy target: 800–1,200 words. Inline CTAs between zones (users are ready at different points).

### Fees & Legal Aid Page
A standalone page in primary navigation. This is both a BSB compliance requirement and the highest-conversion friction-removal mechanism. Must cover:
- Which practice areas are available on legal aid (🚩 confirm with client per practice area)
- The means test in plain language
- The Interests of Justice test in plain language
- That police station advice is free regardless of income (if confirmed)
- For motoring offences and immigration: indicative fee ranges with VAT status stated — this is a BSB legal requirement, not optional

### Page Speed (Next.js + Vercel)
- LCP: under 2.5 seconds on 4G mobile (Lighthouse mobile audit)
- INP: under 200ms
- CLS: under 0.1
- Target Lighthouse mobile performance: 90+
- No large hero images. Text-first above-fold layout minimises LCP.
- Use `next/image` for all images with explicit dimensions.
- No third-party scripts in the critical render path.

---

## 4. Content Priorities

### Direct Access / No Solicitor Needed
Most users do not understand the direct access model. They assume they need a solicitor first. A brief explanation — on the homepage and on each practice area page — removes this barrier. This is also required by BSB (link to Public Access Guidance). The limitation (public access barristers generally cannot conduct litigation) must be disclosed honestly.

### Voluntary Interview Under Caution
No UK site covers this adequately. It is a growing form of first police contact. Defendants at this stage have no automatic duty solicitor right and significant uncertainty. A page covering this stage addresses a genuine unmet need and has low competition for organic search.

### The Solicitor/Barrister Distinction
Almost no UK criminal law site explains this distinction to a lay client. A brief explainer (what a barrister does, how direct access works, when you might also need a solicitor) reduces the most common knowledge gap causing users to self-select out.

### Practice Area Sub-Pages
Motoring Law: drink-driving, drug-driving, totting-up, mobile phone use, dangerous driving each have distinct procedures and distinct search intent. Sub-pages per offence type are required for both SEO and user clarity.

Criminal Defence: arrest, charge, bail, Crown Court, Magistrates' Court — situation-based sub-sections rather than a single page.

---

## 5. Flagged Decisions (Client Must Confirm Before Copy Goes Live)

These are all marked 🚩 in the individual research reports. None of these points should appear as statements in live copy until confirmed:

| # | Decision | Why It Matters |
|---|----------|----------------|
| 1 | 24/7 availability | If claimed and false, it destroys trust at the highest-stakes moment. Do not use unless genuinely provided. |
| 2 | Police station duty advice | Is this a service Astons actively provides? If yes, this becomes the primary conversion copy for the police station call KPI. |
| 3 | Legal aid — which practice areas | Must confirm per-area before the Fees & Legal Aid page or any Zone 1 legal aid signals can go live. |
| 4 | WhatsApp pre-fill text | Exact wording for `?text=` parameter. Must reflect the service and match Astons' response capability. |
| 5 | Response time commitment | "We aim to respond within X hours" is a conversion signal — but only if it is true. |
| 6 | Free initial consultation | Mentioned as a pattern by several competitors. Confirm whether Astons offers this before any copy references it. |

---

## 6. BSB Compliance: What Is Required on the Site

These are not optional. All barrister websites must have:

- "Regulated by the Bar Standards Board" displayed on homepage
- Complaints procedure with Legal Ombudsman signposting and time limits
- Link to LeO decision data and BSB Barristers' Register
- Link to Public Access Guidance for Lay Clients (since Astons handles direct access)
- Most common pricing models stated
- For **Motoring Offences** and **Immigration**: indicative fee ranges, VAT status, likely additional costs, service timescales (legally required under BSB Transparency Rules)

A Fees & Legal Aid page in the primary navigation satisfies most of these requirements structurally.

---

## 7. What the Research Does Not Support for Astons

The following patterns appear in one or more research sources but are incompatible with the project brief or the verified facts:

- **Contact forms as a conversion mechanism.** Not supported. 81% abandonment rate; contradicts the no-email-funnel rule; phone and WhatsApp are the correct mechanisms.
- **Email capture or lead magnets.** Explicitly excluded from this project. Conversion is phone + WhatsApp + cal.com only.
- **Large testimonials walls or review count widgets.** Unless Astons has verified 20+ reviews (69% of consumers require this for trust), these are credibility-negative. Use specific case-type testimonials only if they exist and are verified.
- **Hero photography.** Increases LCP, occupies above-fold space without conversion value, and the practitioner portrait is excluded per project brief.
- **Blog/news as above-fold content.** Not a conversion mechanism for the crisis-state user. Can appear in navigation for SEO value but should not be prominently positioned.
- **Social media links in header or above fold.** Pulls users off-site and has no conversion pathway for criminal defence.

---

## 8. Summary Table: Research Signal → Design Decision

| Finding | Source | Design Decision |
|---------|--------|-----------------|
| No UK site designed for crisis-state users | All three | Urgency-first layout; single primary CTA above fold |
| WhatsApp absent from all competitor sites | All three | WhatsApp as first-class contact channel; sticky bar + above fold |
| 84% of calls come from mobile | Conversion UX | Mobile-first design; sticky bottom bar; thumb-zone CTAs |
| 81% contact form abandonment | Conversion UX | No contact form anywhere on the site |
| Legal aid signal is a conversion gate | Criminal law, Barrister, Conversion UX | Legal aid signal in Zone 1–2 of all applicable pages; standalone Fees & Legal Aid page |
| BSB requires fees for motoring + immigration | Barrister sites | Fees page mandatory; indicative ranges published |
| 53% abandonment if load >3s | Conversion UX | LCP <2.5s target; text-first above fold; Next.js image optimisation |
| Org-chart IA fails crisis users | Conversion UX | Hub-and-spoke; situation-based navigation; max 2 clicks to CTA |
| Superlative copy creates BSB friction | Barrister sites | Measured, factual copy; no self-acclaim |
| Voluntary interview under caution — content gap | Criminal law | Dedicated page; low-competition search opportunity |
| No solicitor/barrister distinction explained | Criminal law, Barrister | Brief explainer on homepage and direct access page |
| 44% of consumers took the first option found | Criminal law | First impression is usually the only impression; no second-chance copy |
