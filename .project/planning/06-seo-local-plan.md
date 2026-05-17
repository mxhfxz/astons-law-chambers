# Local SEO Signal Plan — Astons Law Chambers

**Written:** 2026-05-13 (Session B, Step 2d)
**Skill used:** seo-local
**Input files:** .project/planning/03-site-architecture.md, .project/planning/05-seo-schema-plan.md

> This is a pre-build plan, not a live site audit. No GBP, citations, or NAP can be verified yet. Actions are sequenced from what can be determined now vs. what requires client confirmation.

---

## Business Type Determination

**Likely classification: Service Area Business (SAB), possibly Hybrid.**

A direct-access barrister operating under public access typically:
- Attends court hearings across England and Wales (not bound to one location)
- May not have a fixed public chambers address (many direct access barristers operate without a dedicated client-facing office)
- May use a registered address that is not appropriate to display publicly (home address, virtual office)

**Impact on this plan:**
- Physical address may not be appropriate to publish. If no confirmed address exists, treat as SAB.
- If a chambers address is confirmed: treat as Hybrid (fixed address + service area). Update schema and on-page NAP accordingly.
- 🚩 Address status — blocked. Client must confirm: (a) whether a public-facing practice address exists, (b) whether it is appropriate to display on the website. See `05-seo-schema-plan.md §1.3`.

---

## 1. Google Business Profile (GBP)

GBP signals account for approximately 32% of local pack ranking weight (Whitespark 2026). For a barrister practice, local pack visibility drives call volume from users searching "criminal defence barrister [city]", "motoring lawyer near me", etc.

### 1.1 GBP Category

The most important local SEO factor is GBP primary category. Incorrect category is the #1 negative factor.

| Category type | Recommended value |
|--------------|------------------|
| Primary | `Criminal Justice Attorney` (closest GBP-equivalent for a criminal barrister) |
| Alternatives if above unavailable | `Legal Services`, `Lawyer`, `Barrister` |
| Additional categories (up to 4) | `Immigration Attorney`, `Traffic Ticket Attorney`, `Family Law Attorney`, `Legal Aid Attorney` |

**Note on UK GBP categories:** Google's GBP category list uses US legal terminology (`Attorney`). There is no dedicated `Barrister` category. Use the closest matching categories available in the UK GBP interface at the time of setup. Verify current UK GBP category availability before publishing.

### 1.2 GBP Address / SAB Configuration

- If confirmed chambers address: Add as full address in GBP. Display address on website (footer, Direct Access page). Align with schema `PostalAddress`.
- If no confirmed address: Configure as SAB. Set service area to England and Wales (or more specific if client operates regionally). Do not display address in GBP or on website.
- 🚩 Blocked — await client confirmation.

### 1.3 GBP Optimisation Checklist (for post-setup)

The website cannot control GBP directly, but the following signals must be consistent between the website and GBP:

| GBP field | Website source | Notes |
|-----------|----------------|-------|
| Business name | `Astons Law Chambers` | Must match exactly between GBP and website |
| Phone | `07922 247 999` | Only confirmed number; must be consistent |
| Website URL | `https://astonslaw.com/` | Link to homepage, NOT a practice area page (GBP Diversity Update — linking to non-homepage risks organic ranking suppression) |
| Services | Derived from 10 practice areas in `lib/practice-areas.ts` | Add all 10 as GBP services |
| Hours | 🚩1 — not confirmed | Leave blank if not confirmed; do not fabricate |
| Photos | Logo only | No practitioner portrait per project brief |
| Description | 750 characters max | Write at setup; entity-first, no marketing speak |
| Q&A section | **Google removed GBP Q&A in December 2025.** Recreate FAQ content on website (Zone 6 of practice area pages) | No GBP Q&A to manage |

### 1.4 GBP and AI Search

ChatGPT does not access GBP directly. It sources from Bing index, Yelp, TripAdvisor, BBB, and Reddit. Bing Places powers ChatGPT, Copilot, and Alexa.

**Action:** Claim and optimise Bing Places with the same information as GBP. This is the single most important action for AI search visibility beyond the website itself. See §3.2.

---

## 2. NAP Consistency

NAP (Name, Address, Phone) must be identical across three sources:
1. Visible on-page HTML (footer and/or relevant pages)
2. LocalBusiness JSON-LD schema
3. GBP listing
4. All external directory citations

**Confirmed values:**

| Field | Confirmed value |
|-------|----------------|
| Name | `Astons Law Chambers` |
| Address | 🚩 Not confirmed — see §1.2 |
| Phone | `07922 247 999` |
| WhatsApp | `+44 7922 247 999` / `wa.me/447922247999` |
| Website | `https://astonslaw.com/` |

**NAP on-page placement:**
- Phone number: in the sticky bottom bar, above-fold, and footer on every page (tap-to-call `tel:+447922247999`)
- WhatsApp: sticky bottom bar and above-fold (no need to list WhatsApp as NAP in citations)
- Address: if confirmed, include in footer. If SAB, include service area text instead (e.g., "Serving clients across England and Wales")

**Legacy NAP issue — 07767 268 607:**
The live astonslaw.com site lists 07767 268 607. This number has been confirmed as incorrect (see `_START_HERE.md` verified facts). Before launch: remove all instances of 07767 268 607 from the live site's GBP profile, citations, and directories. Replace with 07922 247 999. Any citation referencing the old number will create NAP inconsistency and is a negative local signal.

---

## 3. Citation Plan

### 3.1 UK Legal Directory Citations (Tier 1 for this vertical)

These directories are the highest-value citation sources for a UK barrister. Google and AI systems use them as authoritative verification signals.

| Directory | URL | Priority | Notes |
|-----------|-----|----------|-------|
| BSB Barristers' Register | barstandardsboard.org.uk | P0 — must link from site | Regulatory listing — non-negotiable; linked from footer per 03-site-architecture |
| Bar Council — Find a Barrister | barcouncil.org.uk | P0 | Official directory; high trust signal |
| Legal 500 | legal500.com | P1 | Leading UK legal directory; editorial listing |
| Chambers and Partners | chambers.com | P1 | Leading UK legal directory; editorial listing |
| Justis.com / LexisNexis | — | P2 | Specialised UK legal databases |
| FindLaw UK equivalent | — | P2 | General legal directory |

**Note:** Legal 500 and Chambers and Partners listings are editorial (require submission and research process). These cannot be obtained immediately. Note for client: initiate submission once site is live and evidence of quality of practice is assembled.

### 3.2 General Local Citation Targets

| Directory | Notes |
|-----------|-------|
| Bing Places | **Top priority** — powers ChatGPT, Copilot, Alexa. Claim with identical NAP to GBP. |
| Apple Business Connect | UK usage doubled to 27% (BrightLocal 2026). Claim and match GBP. |
| Yell.com | UK business directory; high trust |
| Thomson Local | UK-specific |
| Scoot.co.uk | UK local business directory |
| Yelp UK | ChatGPT sources from Yelp; UK legal listings present |
| 192.com | UK people/business finder |

### 3.3 Citations Requiring Address Confirmation

🚩 All citations that require a physical address (Google, Bing, Apple, Yell, etc.) are blocked until the practice address is confirmed or the SAB configuration is confirmed. SAB citations omit address but include service area; this is supported by most major directories.

### 3.4 Data Aggregators

For downstream citation distribution (UK-relevant):
- Data Axle (former Acxiom) — feeds many secondary directories
- Foursquare — feeds multiple map/directory services

Submit once NAP is finalised. Correct the old phone number (07767) in all existing aggregator records if the practice is currently listed.

---

## 4. Local On-Page SEO Signals

### 4.1 Title Tag and H1 Local Intent

For a direct access barrister serving England and Wales, "near me" and city-specific queries are secondary to practice-type searches. Users in crisis search "criminal defence barrister" rather than "criminal defence barrister London."

However, local signals in titles and headings still matter for local pack inclusion. Recommended approach:

| Page | Title tag local signal | H1 local signal |
|------|----------------------|-----------------|
| Homepage | Include `England & Wales` or location if known | "Astons Law Chambers — [Practice Description]" |
| Criminal Defence | No city required — national query intent | Reflect the situation, not geography |
| Motoring Law | No city required | Reflect the situation |
| Immigration | No city required | Reflect the situation |

**Rationale:** For criminal defence barristers, national search terms significantly outperform city-specific terms in volume. Including geographic qualifiers in titles may narrow indexation unnecessarily. If the client's practice is concentrated in a particular region, add a location qualifier to the highest-priority pages once confirmed.

### 4.2 Service Area Signal (On-Page)

If confirmed as SAB: include a brief statement of service area on the homepage and Direct Access page. Recommended placement: Zone 2 (situation acknowledgement) or footer.

Example wording (🚩 geographic scope must be confirmed with client): "Astons Law Chambers accepts direct access instructions from clients across England and Wales." 

Do not write this into any file until geographic coverage is confirmed.

### 4.3 Click-to-Call Implementation

All phone number instances must use `href="tel:+447922247999"`. Plain text phone numbers are not tappable on mobile and lose the click-to-call conversion path. This applies to:
- Sticky bottom bar
- Above-fold phone number
- Footer
- Any inline CTA

WhatsApp links must use `href="https://wa.me/447922247999"` (with confirmed `?text=` pre-fill when available — 🚩4).

### 4.4 Embedded Map

For a brick-and-mortar confirmed address: embed a Google Maps embed pointing to the confirmed location. Lazy-load the embed to avoid CLS and LCP impact.

For SAB: do not embed a map. A map pin with no fixed address is misleading and does not help the user.

---

## 5. Local Schema Fields (from 05-seo-schema-plan.md)

The `LegalService` schema in `05-seo-schema-plan.md §1.2` covers the entity-level schema. Additional local fields required for strong local signal:

| Field | Recommended value | Status |
|-------|------------------|--------|
| `geo` (GeoCoordinates) | Latitude/longitude with 5+ decimal places | 🚩 Requires confirmed address |
| `areaServed` | `"England and Wales"` or specific regions | Confirm geographic scope with client |
| `hasMap` | Google Maps URL for the business | 🚩 Requires GBP to be set up first |
| `openingHoursSpecification` | Structured hours block | 🚩1 — hours not confirmed |
| `telephone` | `"+447922247999"` | Confirmed — include in schema |
| `priceRange` | `"££"` placeholder or omit | 🚩7 — exact ranges not confirmed |

**SAB-specific schema:** If confirmed SAB, omit `address.streetAddress` from schema. Include `areaServed` with named regions instead. See `05-seo-schema-plan.md §1.3`.

---

## 6. AI Search Visibility (Local Context)

AI Overviews appear on up to 68% of local searches (Whitespark Q2 2025). ChatGPT converts at 15.9% vs Google organic at 1.76% (Seer Interactive). For a crisis-state user who might ask ChatGPT "find me a criminal defence barrister" rather than searching Google, AI visibility matters.

**Actions specific to local AI visibility:**

| Action | Priority | Notes |
|--------|----------|-------|
| Claim and optimise Bing Places | P0 | Powers ChatGPT; highest-priority off-site action |
| Claim Yelp UK listing | P1 | ChatGPT sources from Yelp |
| Pursue BBB membership (if applicable in UK) | P2 | UK BBB presence; Google uses for business verification |
| Target "Best barrister in [area]" roundup appearances | P1 — post-launch | #1 AI visibility citation factor (Whitespark 2026) |

**Full AI search visibility analysis** (llms.txt, passage-level citability, brand mentions) is outside the scope of this local plan. Run the `seo-geo` skill post-launch for a complete AI visibility audit.

---

## 7. Old Phone Number Cleanup

The live site astonslaw.com has 07767 268 607 as the primary phone number. This is confirmed as incorrect. Before or at launch:

1. Update all GBP listings to remove 07767 268 607 and replace with 07922 247 999
2. Search for citations of 07767 268 607 across UK directories and request corrections
3. Check the live site's structured data (if any) for the old number
4. Once the new site launches, the correct number in schema and on-page will establish the new NAP record

NAP inconsistency between the old phone number (still referenced in directories pointing to the old site) and the new number on the rebuilt site may cause temporary local ranking fluctuations. This is a pre-launch cleanup task, not a post-launch one.

---

## 8. Prioritised Actions

### Pre-launch (required before go-live)
- [ ] Client confirms: practice address or SAB status (blocks schema, GBP, citations)
- [ ] Client confirms: geographic service area (blocks on-page service area statement)
- [ ] Remove 07767 268 607 from existing GBP and major directory listings; replace with 07922 247 999
- [ ] Implement correct NAP (phone only until address confirmed) in footer HTML and schema

### At launch
- [ ] Claim and verify Google Business Profile (if not already claimed)
- [ ] Claim and optimise Bing Places (same content as GBP)
- [ ] Claim Apple Business Connect
- [ ] Submit to BSB Barristers' Register and Bar Council Find a Barrister directory (if not already listed)

### Post-launch (within 30 days)
- [ ] Submit to Yell.com, Thomson Local, Scoot.co.uk, Yelp UK
- [ ] Submit to data aggregators (Data Axle, Foursquare)
- [ ] Initiate Legal 500 and Chambers & Partners submission process
- [ ] Run seo-geo skill for full AI visibility audit
- [ ] Set up GBP posts cadence (does not directly affect pack ranking per WebFX, but triggers Post Justifications in SERPs and maintains profile freshness)

---

## 9. Blocked Items Summary

| Item | Blocked by | Resolution |
|------|-----------|-----------|
| Practice address in NAP, schema, GBP | 🚩 Address not confirmed | Client confirmation session |
| SAB vs. brick-and-mortar classification | 🚩 Address not confirmed | Same |
| Service area statement on-page | 🚩 Geographic scope not confirmed | Same |
| `openingHoursSpecification` in schema | 🚩1 availability not confirmed | Same |
| GBP hours | 🚩1 | Same |
| `geo` (GeoCoordinates) in schema | 🚩 Requires confirmed address | Follows address confirmation |
| Old phone number cleanup (07767) | Client action required | Before launch |
| GBP map embed | 🚩 Requires GBP setup + address | After address confirmed |
