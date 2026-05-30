# Session Handoff — 2026-05-30 (Schema audit + fixes)

## Production state

**`main`** is live on astonslaw.com. **Nothing from the last two sessions has been pushed to Vercel.** All work below is local-only, uncommitted.

---

## What happened this session (2026-05-30)

### 1. Discovered all schema work is uncommitted

The entire `schema/` directory (18 JSON-LD files, created last session) is untracked — never committed, never pushed to Vercel. Additionally, `app/layout.tsx` has 294 lines of uncommitted changes, plus 10 `content/sections/*.html` files and 4 `app/*.tsx` page files modified but not committed.

### 2. Fixed www → non-www across all schema files

All 18 schema JSON files used `https://www.astonslaw.com` in `@id`, `url`, and page URL fields. The canonical URL is `https://astonslaw.com` (non-www confirmed in `lib/site.ts` and `metadataBase` in `app/layout.tsx`). `www.` was replaced with non-www in 120 instances across all 18 files.

### 3. Full schema audit against verified facts

Conducted a thorough cross-reference of all schema files against `verified_facts.md`, `project_cro_decisions_2026_05_21.md`, and the live site.

**Issues found and resolved this session:**
- SRA accreditations removed from `schema/authorised-to-conduct-litigation.json` Person description. Was: "...with Criminal Litigation and Higher Courts Advocacy (Criminal) accreditations from the Solicitors Regulation Authority." Removed — not in verified facts.

**User confirmed this session:**
- Bar number 69956 on Person in `authorised-to-conduct-litigation.json` is accurate — kept.
- LinkedIn `https://www.linkedin.com/company/astons-law-chambers/` in all `sameAs` arrays is accurate — kept.
- Legal aid via partner firms framing in `legal-aid.json` is correct — kept.

**Issues NOT yet fixed (carry forward):**
- Logo in all schema files points to Webflow CDN: `https://cdn.prod.website-files.com/69323f197e64fbf8120dd856/69b7f5e57c3c0e3ce301db6d_logo.avif`. Risk: external CDN, could break if Webflow account changes. Should be migrated to an `astonslaw.com`-hosted asset before push. Needs client/user decision on logo file location.
- Article `dateModified: "2026-05-01"` in both guide schemas (`guides/first-24-hours-after-arrest.json`, `guides/voluntary-interview.json`) is stale. Should be updated to reflect actual publish/review date.
- `FAQPage` type on 11 files: won't generate rich results (restricted Aug 2023 to gov/healthcare only). This is acceptable — provides AI citation signals, no harm. No action needed unless user disagrees.

---

## Architecture of the schema/ directory

The `schema/` directory contains **standalone JSON-LD reference files** — one per page. These are NOT yet wired into the Next.js app. They were generated as a deliverable for review/audit before integration.

**How integration works (per the previous handoff):**
- Global schema (LegalService, Person, WebSite) lives in `app/layout.tsx` — applies to every page.
- Page-specific schema goes in each `app/[page]/page.tsx` as a `<script type="application/ld+json">` tag.
- Practice area pages use a shared function in `lib/render-practice-area.ts` → `practiceAreaJsonLd(area)`.
- Guide pages use `lib/render-guide.ts` → `guideJsonLd()` / `guidesHubJsonLd()`.

The `schema/` JSON files are the source-of-truth for what each page's schema should look like. Integration = copy the relevant objects from these files into the correct page files.

**Key rule from previous session:** LegalService is already in `app/layout.tsx` — do NOT repeat it in page files. Only add page-specific objects (BreadcrumbList, Service, FAQPage, Article, etc.).

---

## Full uncommitted file inventory

```
M  app/about/page.tsx                        — schema additions (Person + Service + BreadcrumbList)
M  app/contact/page.tsx                      — schema additions (ContactPage + BreadcrumbList)
M  app/fees/page.tsx                         — schema in progress (see previous handoff)
M  app/layout.tsx                            — global LegalService schema heavily expanded (+294 lines)
M  content/chrome/sticky-bar.html            — content update
M  content/sections/about.html              — content update
M  content/sections/direct-access.html      — content update
M  content/sections/fees.html               — content update
M  content/sections/guide-first-24-hours.html      — content update
M  content/sections/guide-voluntary-interview.html  — content update
M  content/sections/guides-index.html       — content update
M  content/sections/home.html               — content update
M  content/sections/pa-detail.html          — content update
M  content/sections/police-station.html     — content update
M  content/sections/practice-areas.html     — content update
?? .claude/settings.json                    — Claude Code config (do NOT commit)
?? schema/                                  — 18 JSON-LD files (all new, all audited)
```

---

## Before pushing — checklist

1. **Resolve logo CDN issue** — decide where the logo lives (`/public/logo.avif`?) and update all 18 schema files.
2. **Update article `dateModified`** in the two guide schemas.
3. **Run build + type-check** — `npm run build && npm run type-check`.
4. **Real-browser check** on staging before `main`.
5. Do NOT commit `.claude/settings.json`.

---

## Schema files completed and audited

| File | Types | Status |
|------|-------|--------|
| `schema/about.json` | LegalService, Person, BreadcrumbList, WebSite | ✅ audited |
| `schema/authorised-to-conduct-litigation.json` | LegalService, Person, FAQPage, BreadcrumbList, WebSite | ✅ audited, SRA removed |
| `schema/contact.json` | LegalService, ContactPage, WebSite | ✅ audited |
| `schema/direct-access.json` | LegalService, BreadcrumbList, WebSite | ✅ audited |
| `schema/fees.json` | LegalService, FAQPage, BreadcrumbList, WebSite | ✅ audited |
| `schema/guides.json` | LegalService, ItemList, BreadcrumbList, WebSite | ✅ audited |
| `schema/guides/first-24-hours-after-arrest.json` | Article, BreadcrumbList, WebSite | ✅ audited |
| `schema/guides/voluntary-interview.json` | Article, BreadcrumbList, WebSite | ✅ audited |
| `schema/legal-aid.json` | LegalService, FAQPage, BreadcrumbList, WebSite | ✅ audited |
| `schema/police-station-representation.json` | LegalService, FAQPage, BreadcrumbList, WebSite | ✅ audited |
| `schema/practice-areas.json` | LegalService, BreadcrumbList, WebSite | ✅ audited |
| `schema/practice-areas/appeals.json` | LegalService, FAQPage, BreadcrumbList, WebSite | ✅ audited |
| `schema/practice-areas/criminal-defence.json` | LegalService, FAQPage, BreadcrumbList, WebSite | ✅ audited |
| `schema/practice-areas/driving-offences.json` | LegalService, FAQPage, BreadcrumbList, WebSite | ✅ audited |
| `schema/practice-areas/drug-offences.json` | LegalService, FAQPage, BreadcrumbList, WebSite | ✅ audited |
| `schema/practice-areas/inquests.json` | LegalService, FAQPage, BreadcrumbList, WebSite | ✅ audited |
| `schema/practice-areas/violent-crimes.json` | LegalService, FAQPage, BreadcrumbList, WebSite | ✅ audited |
| `schema/practice-areas/youth-crimes.json` | LegalService, FAQPage, BreadcrumbList, WebSite | ✅ audited |

---

## Verified facts updated this session

- **Bar number 69956** — confirmed accurate by user 2026-05-30.
- **LinkedIn `https://www.linkedin.com/company/astons-law-chambers/`** — confirmed accurate by user 2026-05-30.
- **BSB Register URL `https://www.barstandardsboard.org.uk/barristers-register/0A9C84A0E6BE3846C117FA4B4290EAD2.html`** — verified 2026-05-21 against BSB Register. Confirmed facts from register: Date of Call March 2018, Inner Temple, Practising, Full Rights of Audience, Public Access Yes, Conduct of Litigation Yes.

---

## Next session starting point

1. Read this file.
2. Decision needed: where to host the logo asset so schema `image` fields point to `astonslaw.com` rather than Webflow CDN.
3. Once logo decision made and article dates updated: run build + type-check, then commit everything (except `.claude/settings.json`) as a single schema commit to a branch.
4. Push branch → get Vercel preview → verify in Google Rich Results Test.
5. If clean, merge to `main`.

---

## Previous session notes (2026-05-27)

### Construction rules for schema (user's prompt — apply to every page)

1. JSON array `[...]`, multiple `@context` objects, no `@graph`.
2. LegalService on every page — already in `layout.tsx`, do not repeat.
3. hasOfferCatalog depth: nest sub-catalogs for multi-stage services. Add `review` on Offer nodes (role-descriptor author). `termsOfService` on Legal Aid Offer. `areaServed` on geographic Offers.
4. Person on every page — in `layout.tsx`. Expanded on About with `knowsAbout`. `sameAs`: BSB Register URL only.
5. WebSite on every page — in `layout.tsx`. No `@id` on WebSite.
6. Page-specific: Practice area → top-level Service with nested OfferCatalog. FAQ → FAQPage (entity signal, no rich results). About → expanded Person with knowsAbout. Fees → Offer with priceSpecification. Article/Guide → Article with datePublished etc.
7. Never: dual-type LegalService+LocalBusiness, @graph, flattened service strings, "Verified Client" author, invented facts.

### Role-neutral language rule (set 2026-05-27)

Schema `description` fields only:
- ✅ "criminal defence lawyers" / "criminal defence law" / "criminal legal defence"
- ❌ "barrister" / "solicitor" in description fields
- `jobTitle: "Barrister"` on Person = fine (entity data)

### Skills to invoke at session start

```
seo-schema                  primary for schema work
project-mgmt                read this file, organise work
verification-before-completion  before claiming any page done
```
