# Schema Markup Plan — Astons Law Chambers

**Written:** 2026-05-13 (Session B, Step 2c)
**Skill used:** seo-schema
**Input files:** .project/planning/03-site-architecture.md, .project/planning/04-seo-technical.md

---

## Conflicts with Prior Output

### FAQPage Schema — Restricted Since August 2023

The session brief specified "LegalService + FAQPage" for practice area pages. This is not implementable.

**Google restricted `FAQPage` rich results in August 2023.** `FAQPage` schema now generates rich results only for government websites and health authority sites. For all other sites (including legal practices), `FAQPage` markup is ignored for rich results — Google will not display the FAQ rich result expansion in SERPs.

**Resolution:** Do not implement `FAQPage` schema on any practice area page. The FAQ content (Zone 6 of the 7-zone structure) is still included as HTML content — it simply does not carry structured data markup. This has no negative SEO effect; it only means the FAQ accordion will not appear as expanded search result snippets (which it would not have received anyway).

The schema types in this plan replace the FAQPage recommendation:
- Practice area pages use `Service` schema, not `LegalService + FAQPage`.
- The firm entity schema uses `LegalService` at the site-wide level.

---

## Schema Implementation Approach

All structured data is implemented as `<script type="application/ld+json">` blocks in server-rendered HTML (Next.js server components). Per December 2025 Google guidance, structured data injected via client-side JavaScript faces delayed processing. See `04-seo-technical.md §7`.

No JSON-LD is written in this document. This is a plan only — field lists, required vs. optional, and 🚩 blocked fields. Implementation occurs during the build phase.

---

## 1. Site-Wide Entity Schema (WebSite + LegalService)

Placed in the root layout (`app/layout.tsx`) so it appears on every page.

### 1.1 WebSite

**Purpose:** Establishes the site entity; enables sitelinks search box in Google (low priority for this site, but correct to include).

| Field | Value | Status |
|-------|-------|--------|
| `@type` | `WebSite` | Required |
| `@context` | `https://schema.org` | Required |
| `name` | `Astons Law Chambers` | Confirmed |
| `url` | `https://astonslaw.com/` | Confirmed |
| `description` | One-sentence site description | Write at build time |
| `publisher` | `@id` reference to LegalService entity | Links to §1.2 |

### 1.2 LegalService (Firm Entity)

**Purpose:** Identifies the firm as a legal services practice. `LegalService` is a Schema.org subtype of `ProfessionalService > LocalBusiness`. This is the correct type for a direct-access barrister.

| Field | Value | Status |
|-------|-------|--------|
| `@type` | `LegalService` | Required |
| `@id` | `https://astonslaw.com/#firm` | Internal reference anchor |
| `name` | `Astons Law Chambers` | Confirmed |
| `url` | `https://astonslaw.com/` | Confirmed |
| `telephone` | `+447922247999` | Confirmed |
| `logo` | `https://astonslaw.com/logo-navy.svg` (or PNG equivalent) | Confirmed — asset exists |
| `image` | Logo only — NO practitioner portrait | Per project brief: no portrait |
| `address` | PostalAddress block — see §1.3 | 🚩 Address not confirmed |
| `areaServed` | `"England and Wales"` | Reasonable assumption for UK Bar; confirm with client |
| `priceRange` | Omit or use `"££"` placeholder | 🚩 Fee ranges not confirmed (🚩7) |
| `openingHours` | Omit | 🚩 Hours not confirmed (🚩1) |
| `description` | Brief description of practice | Write at build time |
| `knowsAbout` | Array of practice area names | Derived from 10 confirmed practice areas |
| `founder` | `Person` entity — see §1.4 | If client confirms direct access training status (🚩9) |
| `regulatoryStatus` | `"Regulated by the Bar Standards Board"` | BSB required; include in schema |
| `member` | Reference to Person entity | See §1.4 |
| `sameAs` | Any verified external profiles | 🚩 No external profiles confirmed; do not fabricate |

### 1.3 PostalAddress Block

🚩 The practice address is not confirmed in verified facts. This entire block is blocked until client confirms the practice address. If no fixed chambers address exists (some direct access barristers operate without a registered chambers address), PostalAddress should be omitted rather than fabricated.

| Field | Status |
|-------|--------|
| `streetAddress` | 🚩 Not confirmed |
| `addressLocality` | 🚩 Not confirmed |
| `addressRegion` | 🚩 Not confirmed |
| `postalCode` | 🚩 Not confirmed |
| `addressCountry` | `"GB"` — can safely include once address is confirmed |

### 1.4 Person Entity (Barrister)

**Purpose:** Identifies Ghulam Humayun as the practitioner associated with the firm.

| Field | Value | Status |
|-------|-------|--------|
| `@type` | `Person` | Required |
| `@id` | `https://astonslaw.com/#barrister` | Internal reference anchor |
| `name` | `Ghulam Humayun` | Confirmed |
| `jobTitle` | `Barrister` | Confirmed |
| `worksFor` | Reference to `#firm` LegalService entity | Derived |
| `image` | **Omit** | No practitioner portrait — project brief non-negotiable |
| `alumniOf` | Inn of Court | 🚩 Not confirmed — do not assert |
| `hasCredential` | BSB number, call date | 🚩 Not confirmed — do not assert |
| `knowsAbout` | Array of practice area names | Can be derived from confirmed list |
| `url` | `/direct-access/` | Relative URL — use absolute: `https://astonslaw.com/direct-access/` |
| `sameAs` | BSB Register URL | 🚩 BSB number not confirmed — cannot construct URL |

---

## 2. Homepage Schema

**URL:** `/`

Additional schema beyond the site-wide LegalService entity:

### 2.1 WebPage

| Field | Value | Status |
|-------|-------|--------|
| `@type` | `WebPage` | Required |
| `name` | Homepage meta title | Write at build time |
| `url` | `https://astonslaw.com/` | Confirmed |
| `description` | Homepage meta description | Write at build time |
| `breadcrumb` | Omit — homepage is the root | N/A |
| `isPartOf` | Reference to WebSite entity | Links to §1.1 |
| `about` | Reference to LegalService entity | Links to §1.2 |

**Note:** Do not add `LocalBusiness` as a second type on the homepage — the `LegalService` entity in the site-wide layout already carries this. Duplicate entity declarations on every page are unnecessary.

---

## 3. Practice Area Pages Schema

**URL pattern:** `/practice-areas/[slug]/`

Each practice area page carries two schema blocks: `Service` and `BreadcrumbList`.

### 3.1 Service

`Service` is the correct Schema.org type for an individual legal service offered by the firm. Do not use `LegalService` at the individual page level — that type describes the firm entity, not an individual service.

| Field | Value | Status |
|-------|-------|--------|
| `@type` | `Service` | Required |
| `name` | Practice area name (e.g., `"Criminal Defence"`) | Confirmed — from `lib/practice-areas.ts` |
| `description` | 1–2 sentence service description | Write at build time |
| `provider` | Reference to `#firm` LegalService entity | Links to §1.2 |
| `url` | Absolute URL of this practice area page | Derived from slug |
| `areaServed` | `"England and Wales"` | Confirm with client |
| `serviceType` | Practice area name or broader legal category | Derived |
| `termsOfService` | `/fees/` URL | Links to Fees page |
| `offers` | `Offer` sub-block for fee info — see §3.2 | 🚩 Blocked for most areas |

### 3.2 Service > Offer (Fee Information)

For Motoring, Immigration, and Licensing only (BSB extended disclosure required). Blocked by unconfirmed fee data for all 10 areas.

| Field | Value | Status |
|-------|-------|--------|
| `@type` | `Offer` | Required |
| `priceCurrency` | `"GBP"` | Confirmed |
| `price` | Indicative fee amount | 🚩 Not confirmed (🚩7) — omit until confirmed |
| `priceSpecification` | Price range or structured pricing | 🚩 Not confirmed (🚩7) |
| `eligibleRegion` | `"England and Wales"` | Confirm with client |

**Note on FAQPage for practice area pages:** As stated in the Conflicts section above, `FAQPage` is restricted. The Zone 6 FAQ content is published as standard HTML — structured data is not added to it. No workaround is valid or necessary.

### 3.3 BreadcrumbList

Present on all L2 practice area pages.

| Breadcrumb position | Name | URL |
|--------------------|------|-----|
| 1 | `Home` | `https://astonslaw.com/` |
| 2 | `Practice Areas` | `https://astonslaw.com/practice-areas/` |
| 3 | `[Practice Area Name]` | `https://astonslaw.com/practice-areas/[slug]/` |

**Fields per ListItem:**
- `@type`: `ListItem`
- `position`: integer (1, 2, 3)
- `name`: display label
- `item`: absolute URL (must be absolute, not relative)

---

## 4. Practice Areas Hub Page Schema

**URL:** `/practice-areas/`

| Schema | Fields |
|--------|--------|
| `WebPage` | `name`, `url`, `description`, `isPartOf` (WebSite ref), `about` (LegalService ref) |
| `BreadcrumbList` | Position 1: Home → `/`; Position 2: Practice Areas → `/practice-areas/` |

No `CollectionPage` or `ItemList` schema is recommended. The hub page is a navigational index; `WebPage` is sufficient.

---

## 5. Fees & Legal Aid Page Schema

**URL:** `/fees/`

### 5.1 WebPage

| Field | Value | Status |
|-------|-------|--------|
| `@type` | `WebPage` | Required |
| `name` | "Fees & Legal Aid — Astons Law Chambers" or similar | Write at build time |
| `url` | `https://astonslaw.com/fees/` | Confirmed |
| `about` | Reference to `#firm` LegalService entity | Links to §1.2 |
| `isPartOf` | Reference to WebSite entity | Links to §1.1 |

### 5.2 Service > Offer Blocks (Extended Disclosure)

The Fees page carries the firm-level fee information for Motoring, Immigration, and Licensing. Once client confirms fee ranges, add `Offer` blocks under each relevant `Service` entity:

| Service | `Offer` fields | Status |
|---------|---------------|--------|
| Motoring Law | `price`, `priceCurrency`, `priceSpecification`, `description` | 🚩 Blocked (🚩7) |
| Immigration | `price`, `priceCurrency`, `priceSpecification`, `description` | 🚩 Blocked (🚩7) |
| Licensing | `price`, `priceCurrency`, `priceSpecification`, `description` | 🚩 Blocked (🚩7) |
| VAT | `priceSpecification.valueAddedTaxIncluded` (boolean) | 🚩 Blocked (🚩8) |

---

## 6. Direct Access Page Schema

**URL:** `/direct-access/`

| Schema | Fields | Notes |
|--------|--------|-------|
| `WebPage` | `name`, `url`, `description`, `about` (Person ref to barrister entity) | This page is the most appropriate place to reference the Person entity |
| No additional schema | — | Do not use `ProfilePage` — that type is for social profiles, not professional practice pages |

---

## 7. Complaints Page Schema

**URL:** `/complaints/`

| Schema | Fields |
|--------|--------|
| `WebPage` | `name`, `url`, `description`, `about` (LegalService ref) |

No additional schema. `ContactPage` is not appropriate here — this is a complaints and regulatory page, not a contact page. No rich result types apply.

---

## 8. Privacy Policy Page Schema

**URL:** `/privacy-policy/`

No structured data required or recommended beyond the site-wide entities. Google does not have a rich result type for privacy policy pages.

---

## 9. Summary Table

| Page / URL | Schema Types | Rich Result Potential | 🚩 Blocked Fields |
|-----------|-------------|----------------------|-------------------|
| All pages (site-wide) | `WebSite`, `LegalService`, `Person` | Knowledge panel (firm entity) | Address (🚩), BSB number (🚩9), `sameAs` (🚩) |
| Homepage `/` | `WebPage` | None additional | — |
| Practice Areas Hub `/practice-areas/` | `WebPage`, `BreadcrumbList` | Breadcrumb rich results | — |
| Each practice area page | `Service`, `BreadcrumbList` | Breadcrumb rich results | `Offer` pricing (🚩7) for Motoring/Immigration/Licensing |
| Fees `/fees/` | `WebPage`, `Offer` (3 areas) | None (no rich result type for fee pages) | All `Offer` fields (🚩7, 🚩8) |
| Direct Access `/direct-access/` | `WebPage` (references Person entity) | None additional | Person credentials (🚩9) |
| Complaints `/complaints/` | `WebPage` | None | — |
| Privacy Policy `/privacy-policy/` | None (site-wide entities only) | None | — |

---

## 10. Schema Fields Blocked by 🚩 Flagged Items

| Schema field | Blocked by | Resolution required |
|-------------|-----------|---------------------|
| `PostalAddress` (entire block) | Practice address not confirmed | Client must confirm |
| `openingHours` | 🚩1 — availability not confirmed | Client must confirm |
| `priceRange` on LegalService | 🚩7 — fee ranges not confirmed | Client must confirm for 3 areas |
| `Service > Offer > price` | 🚩7 | Client must confirm |
| `priceSpecification.valueAddedTaxIncluded` | 🚩8 — VAT status not confirmed | Client must confirm |
| `Person > alumniOf` | Inn of Court not confirmed | Client must confirm |
| `Person > hasCredential` | BSB number and call date not confirmed | Client must confirm |
| `Person > sameAs` | BSB Register URL requires BSB number | Follows from credential confirmation |

**Do not add placeholder values to any of these fields.** Omit the field entirely until confirmed. Incorrect structured data that is published and crawled creates a trust signal inconsistency.
