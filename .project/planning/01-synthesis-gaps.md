# Synthesis Gaps & Strategic Decisions

**Written:** 2026-05-13 (Session A, Step 1a)
**Source:** Brainstorming synthesis of all four research files:
  - `.project/research-01/findings-criminal-law-sites.md`
  - `.project/research-01/findings-barrister-sites.md`
  - `.project/research-01/findings-conversion-ux.md`
  - `.project/research-01/synthesis.md`
**No conflicts with prior planning files.** (First synthesis document in `.project/planning/`.)

---

## 1. Conflicts Between the Three Research Tracks

These are areas where the three reports give different signals or where the synthesis does not fully resolve a tension. Each is a decision point, not an error.

---

### Conflict 1: Testimonials threshold vs. adoption recommendation

**Finding A (findings-criminal-law-sites.md §7.5):**
"Specific, outcome-oriented social proof" is listed as a pattern to adopt. Testimonials referencing specific charge types and outcomes are recommended.

**Finding B (findings-conversion-ux.md §5):**
"69% of consumers require at least 20 reviews before trusting an average rating. If reviews are not yet available, do not use star-rating graphics."

**Synthesis resolution (synthesis.md §7):**
"Large testimonials walls or review-count widgets — unless Astons has verified 20+ reviews, these are credibility-negative."

**Remaining tension:**
The synthesis resolves this correctly, but the resolution blocks one of the most common conversion patterns on criminal defence sites. A single specific testimonial (no star rating, no count) with a case type and outcome is not the same as a testimonials wall — it is the "specific outcome-oriented social proof" the criminal law findings recommend. The synthesis does not distinguish these two patterns.

**Decision required before copy:**
Does Astons have any verified client testimonials? If yes: one per practice area, no star rating, no count, no wall is acceptable. If no: omit testimonials entirely.

---

### Conflict 2: Availability copy — "adopt" vs. "flag"

**Finding A (findings-criminal-law-sites.md §7.2):**
"24/7 Availability Stated Prominently" is listed as a pattern to adopt, described as "disproportionately reassuring."

**Finding B and C (synthesis.md §3, findings-conversion-ux.md §3):**
Availability signal is listed as an above-fold requirement but flagged with 🚩 pending client confirmation.

**Remaining tension:**
The criminal law findings treat 24/7 availability as a "pattern to adopt" before confirming whether Astons actually provides it. This framing could lead a future build session to include it without the client confirmation flag.

**Decision required before copy:**
The 🚩 flag from synthesis.md and conversion-ux.md takes precedence. The criminal law findings describe the competitive pattern, not a pre-approved element for Astons. Do not write availability claims until client confirms. 🚩

---

### Conflict 3: SEO content depth vs. crisis UX page length

**Finding A (synthesis.md §4):**
Motoring Law sub-pages by offence type (drink-driving, drug-driving, totting-up, etc.) recommended for both SEO and user clarity.

**Finding B (findings-conversion-ux.md §7):**
"Body copy target: 800–1,200 words. Avoid 3,000-word encyclopaedic pages."

**Remaining tension:**
If each of the 10 practice areas has 4–6 offence-type sub-pages and each sub-page targets 800–1,200 words, the total content scope is 40–60 pages and 50,000+ words. This is a significant content production commitment not currently reflected in any plan. The alternative — single practice area pages with offence types as anchor sections rather than separate URLs — reduces content scope but may harm SEO reach.

**Decision required before IA:**
Lock one of these two approaches for motoring (and by extension criminal defence) before building the URL structure:
- **Option A:** Standalone sub-pages per offence type (higher SEO value, higher content production effort).
- **Option B:** Single practice area page with offence-type sections and anchor links (lower effort, lower SEO ceiling).

This is the highest-impact IA decision not yet made.

---

### Conflict 4: WhatsApp green (#25D366) vs. unknown brand palette

**Finding (synthesis.md §3, findings-conversion-ux.md §4):**
"WhatsApp button colour: #25D366 or brand-adjacent. The green is a recognition trigger; do not neutralise it."

**Gap:**
The only confirmed brand assets are `logo-navy.svg` and `logo-white.svg`. The full brand palette is unknown. Whether #25D366 is "brand-adjacent" cannot be determined until the Penpot design system is built. The instruction "do not neutralise it" may conflict with brand consistency decisions made later.

**Decision required before design system:**
Treat #25D366 as the default WhatsApp button colour unless the design system produces a documented reason to adjust it. The button must remain visually distinct from the primary navy palette to function as a recognition trigger.

---

## 2. Gaps the Research Did Not Cover

These are items the research is silent on. Each becomes a plan task.

| # | Gap | Impact | Blocks |
|---|-----|--------|--------|
| G1 | Typography system — no font stack, scale, or hierarchy defined | High | Every component with text |
| G2 | Full colour palette — only navy confirmed; no semantic tokens, no backgrounds, no accent colours | High | Design system / tokens.css |
| G3 | Cal.com URL — third conversion channel mentioned but URL not confirmed | Medium | Any CTA that includes scheduling |
| G4 | Cal.com positioning — research does not specify where scheduling sits in the CTA hierarchy relative to phone and WhatsApp | Low | CTA component design |
| G5 | Practice area navigation structure — hub page vs. dropdown not resolved | High | Nav component, URL structure, homepage |
| G6 | Homepage headline — no example, no character limit, no tone example confirmed | Medium | Hero component copy |
| G7 | Direct Access page structure — required by BSB but no zone structure defined | Medium | `/direct-access/` page build |
| G8 | Fees & Legal Aid page zone structure — content requirements known (BSB, conversion UX §9), page structure not defined | Medium | `/fees/` page build |
| G9 | SEO technical baseline — meta titles/descriptions, structured data (schema), robots.txt, sitemap.xml not covered | Medium | Pre-launch |
| G10 | 301 redirect map — URL migration from live astonslaw.com not planned | High | Pre-launch; blocks going live |
| G11 | Accessibility compliance level — WCAG AA minimum confirmed, but formal compliance target and testing protocol not defined | Low | Design system, accessibility audit |
| G12 | Cookie and GDPR compliance — PECR, privacy policy, analytics choices not covered | Medium | Pre-launch |
| G13 | Error pages (404, 500) — not covered in any research track | Low | Build completeness |
| G14 | Sub-pages for motoring offence types — whether standalone URLs or anchor sections (see Conflict 3) | High | IA decision (blocks URL structure) |
| G15 | Voluntary interview under caution page — identified as a market gap in criminal law research; no page specification | Low | Content strategy (post-MVP) |

---

## 3. The 6 Flagged Client Items (🚩)

These appear in all research tracks and synthesis. None may be resolved without explicit client confirmation in session.

| # | Item | Affects |
|---|------|---------|
| 🚩1 | 24/7 availability | Homepage above-fold, sticky bar, all practice area Zone 1s |
| 🚩2 | Police station duty advice — is this actively offered? | Homepage positioning, criminal defence Zone 1–3, sticky bar copy |
| 🚩3 | Legal aid per practice area — which of the 10 qualify? | Zone 1–2 of all applicable pages, Fees & Legal Aid page |
| 🚩4 | WhatsApp pre-fill text — exact `?text=` wording | Every WhatsApp wa.me deep link on the site |
| 🚩5 | Response time commitment | Any copy referencing how quickly Astons responds |
| 🚩6 | Free initial consultation | Any copy referencing consultation terms |

**Unblocking protocol:** Raise all six items in a client call before any practice area page copy is drafted. Items 🚩3 and 🚩4 block the most components: legal aid affects every practice area page; WhatsApp pre-fill is in the sticky bar, above-fold, and all inline CTAs.

---

## 4. Top 5 Strategic Decisions That Must Be Locked Before Any Component Is Built

These decisions affect every component on the site. Building before they are locked will require rework.

---

### Decision 1: Homepage above-fold architecture

**What must be decided:**
The exact elements, their hierarchy, and their visual weight in the mobile above-fold zone (375px wide, ~667px tall, no scroll). The research is clear on the required elements (see synthesis.md §3). The decision is: in what order and proportion?

**Research-supported answer:**
1. Practice name + positioning statement (entity-first, no marketing speak)
2. Phone number as tap-to-call, visually dominant
3. WhatsApp button, visually distinct
4. Legal aid signal, single line (🚩 wording TBC)
5. 🚩 Availability signal only if confirmed

**Why this must be locked first:**
Every other above-fold component depends on the spatial allocation. If the phone number is not the dominant element, the sticky bar design changes. If availability is omitted, the copy brief changes.

**Status:** Pending client confirmation of 🚩 items 1 and 3 (availability, legal aid).

---

### Decision 2: Practice area IA — hub page or dropdown

**What must be decided:**
Are the 10 practice areas accessed via:
- A `/practice-areas/` hub page with a card grid
- A navigation dropdown from the main nav
- Both (hub page + dropdown)

**Research-supported guidance:**
The synthesis describes the homepage as a "routing hub" — this implies the hub page is the mechanism. But the CLAUDE.md route spec is `/practice-areas/[slug]/`, which implies a hub page exists. The gap: is there also a dropdown in the header nav?

**Recommended decision (assumption):**
Hub page + header nav item linking to the hub. No dropdown — a 10-item dropdown on mobile is unusable for crisis-state users. One navigation tap to the hub, one tap from the hub to the practice area.

**Lock before:** Nav component, homepage component, `/practice-areas/` page.

---

### Decision 3: Sub-pages for motoring offence types — standalone or anchored

**What must be decided:**
Whether each motoring offence type (drink-driving, drug-driving, totting-up, mobile phone use, dangerous driving) gets its own URL (`/practice-areas/motoring-law/drink-driving/`) or is a section with an anchor link on the main motoring page.

**Implications:**
- Standalone sub-pages: 5 additional URLs, 5 additional pages to design and populate, higher SEO value, more complex nav, more BSB fee disclosure needed per page.
- Anchor sections: 1 URL, simpler IA, BSB fee disclosure can live once on the motoring page, lower SEO ceiling.

**Recommended decision (assumption):**
Phase 1: anchor sections on the main motoring page. Phase 2: promote to standalone sub-pages once content is validated. This is the minimum viable approach.

**Lock before:** URL structure, motoring law page spec.

---

### Decision 4: Fees & Legal Aid page scope

**What must be decided:**
Does the "Fees & Legal Aid" primary nav page also carry the BSB complaints procedure and regulatory identity, or are complaints on a separate `/complaints/` page?

**Research guidance (synthesis.md §6):**
The synthesis lists these BSB requirements: "Regulated by the Bar Standards Board" on homepage, complaints procedure with LeO signposting, link to LeO decision data and BSB Register, link to Public Access Guidance.

**Recommended decision (assumption):**
- `Fees & Legal Aid` page: fee ranges, VAT, legal aid per area (🚩 when confirmed), means test, police station advice signal.
- `Complaints` page (or footer section): complaints procedure, LeO time limits and link, BSB Register link.
- `Direct Access` page: Public Access Guidance link, direct access explanation, litigation limitation disclosure.
- BSB regulation statement: on homepage footer and site-wide footer.

**Lock before:** IA finalisation, route structure.

---

### Decision 5: Content production phasing

**What must be decided:**
Which of the 10 practice areas get full Zone 1–7 pages at launch, and which get a minimal placeholder?

**Why this is a strategic decision:**
The seven-zone structure requires 800–1,200 words per practice area page. Creating 10 × 1,200 words of BSB-compliant, non-fabricated, natural-voice copy requires confirmed client facts (especially 🚩3 — legal aid per area). The build plan must decide: are all 10 areas at MVP parity, or is there a priority sequence?

**Research-supported priority sequence (assumption):**
1. Criminal Defence — highest search volume, highest conversion priority
2. Motoring Law — BSB fee disclosure required; large self-referral volume
3. Immigration — BSB fee disclosure required
4. Family Law, Proceeds of Crime, Licensing — medium priority
5. Regulatory Law, Extradition, Inquests, Civil Litigation — lower volume; can be minimal at launch

**Lock before:** Content brief, copy production workflow.

---

## 5. Items the Research Explicitly Does Not Support for Astons

These are confirmed exclusions. They appear in synthesis.md §7 and are recorded here for clarity:

- Contact forms as a conversion mechanism
- Email capture or lead magnets
- Testimonial walls or review-count widgets (unless 20+ verified reviews confirmed)
- Large hero photography
- Blog/news as above-fold content
- Social media links in header or above fold
- Exit-intent modals or pop-ups
- Alternating tonal banding (white/grey/white/grey default)
- Practitioner portrait
- Marketing speak, rhetorical questions, triadic structures

---

## 6. Summary: What Blocks What

| Blocker | What it blocks |
|---------|---------------|
| Client confirmation: legal aid per area (🚩3) | Zone 1–2 of all 10 practice area pages; Fees page |
| Client confirmation: WhatsApp pre-fill text (🚩4) | Every wa.me deep link on the site; sticky bar copy |
| Client confirmation: availability (🚩1) | Homepage above-fold; practice area Zone 1s |
| Client confirmation: police station duty (🚩2) | Criminal defence Zone 1–3; homepage positioning |
| IRL response time confirmed (🚩5) | Any copy mentioning response speed |
| Free consultation confirmed (🚩6) | Any copy mentioning consultation terms |
| Typography system defined | Every text-bearing component |
| Full colour palette defined | Design system / tokens.css |
| Cal.com URL confirmed | All scheduling CTAs |
| Sub-pages vs. anchor sections locked (Conflict 3) | URL structure, motoring page spec |
| Fees & Legal Aid page scope locked (Decision 4) | IA, route structure |
| Practice area nav structure locked (Decision 2) | Nav component, homepage |
