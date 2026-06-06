# Session Handoff — 2026-05-31 (PA hero redesign + kicker fix)

## Next session starting point

Branch: `sub-pages` — pushed, Vercel preview building.

### What to check first
1. Open the Vercel preview for `sub-pages` branch (alc-staging project).
2. Verify on a PA detail page (e.g. `/practice-areas/violent-crimes`):
   - Eyebrow reads: **CRIMINAL DEFENCE BARRISTER • VIOLENT CRIMES** (uppercase from CSS)
   - H1 is the page title only — no paragraphs below it in the hero
   - Desktop: red "Book a Free Consultation" button visible + white "Call" button
   - Mobile: only the white "Call" button visible
   - BSB link below the buttons: "Regulated by the Bar Standards Board"
3. Verify a sub-page (e.g. `/practice-areas/driving-offences/drink-driving`) — breadcrumb should be 4 levels.

### What was changed this session

**`content/sections/pa-detail.html`** — hero section only:
- Removed `definition` and `situation` paragraphs from the hero (user: "they hurt conversion")
- Kicker eyebrow: hardcoded prefix `"Criminal Defence Barrister • "` + `<span data-bind="kicker">` (user explicitly overrode the no-barrister-in-frontend rule for this element only)
- Breadcrumb-to-kicker gap: `mt-6` → `mt-8` (2rem as annotated in screenshot)
- Book button: wrapped in `<div class="hidden md:flex">` to fix a `.btn.hidden` CSS specificity clash that was making it invisible on desktop; text changed to "Book a Free Consultation"; keeps `btn-emergency` (red)

**`lib/practice-areas.ts`** — kicker values updated for all 9 top-level PAs:

| Slug | Old | New |
|------|-----|-----|
| criminal-defence | 'Criminal' | 'Criminal Defence' |
| violent-crimes | 'Criminal' | 'Violent Crimes' |
| youth-crimes | 'Criminal' | 'Youth Crimes' |
| driving-offences | 'Criminal' | 'Driving Offences' |
| drug-offences | 'Criminal' | 'Drug Offences' |
| appeals | 'Post-trial' | 'Appeals' |
| inquests | 'Coroner's Court' | 'Inquests' |
| fraud | 'Financial Crime' | 'Fraud' |
| sexual-offences | 'Criminal' | 'Sexual Offences' |

Sub-pages in `lib/sub-practice-areas.ts` already had correct kicker values ('Driving Offences', 'Violent Crimes', 'Drug Offences') — no changes needed there.

### Known issue fixed this session
`.btn.hidden { display: none; }` in `preview-styles.css` has specificity 0,2,0 which beats `.md:flex` (0,1,0) even inside a media query. The old `hidden md:flex` on the button itself was silently hidden on all breakpoints. Fix: wrapper `<div class="hidden md:flex">` — the div has no `.btn` class so the specificity rule doesn't apply.

### Remaining work (from previous handoff — not done this session)
The sub-page implementation checklist is unchanged. Still to do:
- Schema: BreadcrumbList + Service + FAQPage per sub-page
- Sitemap update
- Wire sub-page links from parent PA pages
- Sexual offences page: client voice review before going live

### Skills to invoke next session
```
verification-before-completion   check preview before claiming done
project-mgmt                     read sub-pages/plan.md for remaining work
```

---

# Session Handoff — 2026-05-31 (Sub-page content research COMPLETE)

## Next session starting point — SUB-PAGE IMPLEMENTATION

**Content research is done.** All 12 pages are written and audited in `.project/sub-pages/findings.md`.
Architecture and decisions are in `.project/sub-pages/plan.md`.

### What to do next session

1. Read `.project/sub-pages/plan.md` (decisions + implementation checklist).
2. Create `lib/sub-practice-areas.ts` — new file with `SubPracticeArea` interface extending `PracticeArea` with `parentSlug`, plus the 10 sub-page objects from findings.md.
3. Append `fraud` and `sexual-offences` objects from findings.md to `lib/practice-areas.ts`.
4. Create `app/practice-areas/[category]/[slug]/page.tsx` — renders sub-pages using `pa-detail.html` template.
5. Add breadcrumb logic (Home → Defence work → [Parent PA title] → [Sub-page title]).
6. Wire sub-page links from parent PA pages.
7. Schema: BreadcrumbList + Service + FAQPage per sub-page (follow existing `schema/` pattern).
8. Update sitemap.
9. Build + type-check → staging branch → Vercel preview.

### Open decisions before going live
- **Sexual offences page**: review voice against client before shipping. See voice note in findings.md.
- **Fraud `related` links**: `drug-offences` is a loose adjacency — review after the page is live.
- **`metaDescription` for drug-supply**: use the 135-char version noted in findings.md (not the 162-char one).

### Skills to invoke
```
project-mgmt                read plan.md, organise work
verification-before-completion  before claiming any page done
```

---

## What happened this session (2026-05-31)

### Sub-page content research — all 12 pages completed and audited

**URL structure decided:** Nested — `/practice-areas/[parentSlug]/[subSlug]`

**Files created:**
- `.project/sub-pages/plan.md` — architecture decisions + implementation checklist
- `.project/sub-pages/findings.md` — TypeScript-ready content objects for all 12 pages

**Pages researched:**

| # | Page | URL |
|---|------|-----|
| 1 | Drink Driving | /practice-areas/driving-offences/drink-driving |
| 2 | Drug Driving | /practice-areas/driving-offences/drug-driving |
| 3 | Totting Up | /practice-areas/driving-offences/totting-up |
| 4 | GBH Defence | /practice-areas/violent-crimes/gbh |
| 5 | Knife Crime | /practice-areas/violent-crimes/knife-crime |
| 6 | Possession with Intent | /practice-areas/drug-offences/possession-with-intent |
| 7 | Drug Supply | /practice-areas/drug-offences/drug-supply |
| 8 | County Lines | /practice-areas/drug-offences/county-lines |
| 9 | Domestic Abuse | /practice-areas/violent-crimes/domestic-abuse |
| 10 | Robbery | /practice-areas/violent-crimes/robbery |
| 11 | Fraud (new top-level PA) | /practice-areas/fraud |
| 12 | Sexual Offences (new top-level PA) | /practice-areas/sexual-offences |

**Content rules applied:**
- No statutory section numbers
- No specific sentencing figures — Sentencing Council guidelines referenced by existence only
- 🚩 Operational claims flagged in findings.md
- Definitions: 40–60 words, answer-first, AEO-citable
- Page titles and metaTitles: "Criminal Defence" variants, never "barrister" in frontend copy
- FAQs: real defendant search questions with declarative answers
- Audited against `avoid-ai-writing` skill — 8 AI-isms removed (hollow intensifiers, aphoristic close, vague "shapes what follows")
- Checked against `seo-2026` and `modern-service-business-cro` principles

---

## Previous session notes (ongoing) — SUB-PAGE CONTENT BRIEF (original)

**Task:** Research and define content for specific-offence sub-pages. One page per offence.

**What the research produces per page:**
- The right wording for the definition (40-60 words, answer-first, AEO-citeable)
- The right wording for the situation paragraph (stakes/urgency — why someone calls)
- The `actions` bullet list (what Astons handles within this specific offence)
- The `faqs` (3-5 questions real defendants search, with declarative answers)
- The `contextTitle` / `contextEyebrow` for the sidebar card (the specific legal consequence)
- Confirmed page title / H1 / meta title using "Criminal Defence" variants — never "barrister"

**Hard rules for the research:**
- This is NOT a legal wiki. Content exists to get someone to call. Do not educate for its own sake.
- No statutory section numbers unless verified for 2026 England & Wales
- No sentencing figures unless they can be sourced (Sentencing Council guidelines)
- Flag 🚩 any operational claim before writing it (availability, "first call free", etc.)
- Every page ends with a call CTA — this is the whole point

**Page list to research (priority order):**
1. Drink driving (Driving Offences)
2. Drug driving (Driving Offences)
3. Totting up / licence disqualification (Driving Offences)
4. GBH / serious assault (Violent Crimes)
5. Knife crime (Violent Crimes)
6. Possession with intent to supply (Drug Offences)
7. Drug supply / dealing (Drug Offences)
8. County lines (Drug Offences)
9. Domestic abuse / coercive control (Violent Crimes)
10. Robbery (Violent Crimes)
11. Fraud / financial crime (new top-level PA)
12. Sexual offences (new top-level PA — special treatment, see note)

**Template decision:** All sub-pages reuse the existing `pa-detail.html` template. No new template needed.

**URL structure:** Not yet decided. Flat (`/practice-areas/drink-driving`) vs nested (`/practice-areas/driving-offences/drink-driving`). Resolve at start of build session.

**Special treatment pages:**
- Sexual offences: content voice differs significantly — accused of serious offence, anonymity implications
- Inquests sub-pages: audience is bereaved family, not defendant — likely needs its own template variant
- Appeals sub-pages: post-conviction visitor — different urgency framing

**Skills to invoke at session start:**
```
seo-2026                    for keyword/intent validation per page
modern-service-business-cro for conversion framing
project-mgmt                read this file, organise work
```

---

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
