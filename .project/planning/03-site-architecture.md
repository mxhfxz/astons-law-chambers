# Site Architecture — Astons Law Chambers

**Written:** 2026-05-13 (Session B, Step 2a)
**Skill used:** site-architecture
**Input files:** .project/research-01/synthesis.md, .project/planning/01-synthesis-gaps.md, .project/planning/02-bsb-compliance-map.md

---

## Locked Decisions Applied

Decisions from `01-synthesis-gaps.md §4` applied throughout:

| Decision | Resolution Applied |
|----------|--------------------|
| Practice area IA — hub page or dropdown | Hub page (`/practice-areas/`) + header nav item. No dropdown. One tap to hub, one tap to area. |
| Sub-pages for motoring offence types | Anchor sections on main motoring page (MVP). Sub-page promotion is Phase 2. |
| Fees & Legal Aid page scope | Fee content on `/fees/`; complaints content on `/complaints/` (separate page). |
| Content production phasing | All 10 practice areas present at launch; P0/P1/P2 priority sequence documented in §6. |

---

## 1. Page Hierarchy (Full URL Structure)

```
Homepage (/)
├── Practice Areas Hub (/practice-areas/)
│   ├── Criminal Defence (/practice-areas/criminal-defence/)
│   ├── Motoring Law (/practice-areas/motoring-law/)
│   │   └── [Anchor sections: #drink-driving, #drug-driving, #totting-up, #mobile-phone, #dangerous-driving]
│   ├── Regulatory Law (/practice-areas/regulatory-law/)
│   ├── Proceeds of Crime (/practice-areas/proceeds-of-crime/)
│   ├── Extradition (/practice-areas/extradition/)
│   ├── Immigration (/practice-areas/immigration/)
│   ├── Inquests (/practice-areas/inquests/)
│   ├── Family Law (/practice-areas/family-law/)
│   ├── Civil Litigation (/practice-areas/civil-litigation/)
│   └── Licensing (/practice-areas/licensing/)
├── Fees & Legal Aid (/fees/)                     [BSB P0 — required at launch]
├── Direct Access (/direct-access/)               [BSB P0 — required at launch]
└── Utility Pages
    ├── Complaints (/complaints/)                 [BSB P0 — required at launch]
    └── Privacy Policy (/privacy-policy/)         [UK GDPR P0 — required at launch]
```

---

## 2. Complete URL Map

| Page | URL | Level | Nav Location | BSB Required | Launch Priority |
|------|-----|-------|-------------|--------------|----------------|
| Homepage | `/` | L0 | Logo (always) | Partial (footer) | P0 |
| Practice Areas Hub | `/practice-areas/` | L1 | Primary nav | No | P0 |
| Criminal Defence | `/practice-areas/criminal-defence/` | L2 | Hub page | No | P0 |
| Motoring Law | `/practice-areas/motoring-law/` | L2 | Hub page | Yes — extended fee disclosure | P0 |
| Immigration | `/practice-areas/immigration/` | L2 | Hub page | Yes — extended fee disclosure | P0 |
| Family Law | `/practice-areas/family-law/` | L2 | Hub page | No | P1 |
| Proceeds of Crime | `/practice-areas/proceeds-of-crime/` | L2 | Hub page | No | P1 |
| Licensing | `/practice-areas/licensing/` | L2 | Hub page | Yes — extended fee disclosure | P1 |
| Regulatory Law | `/practice-areas/regulatory-law/` | L2 | Hub page | No | P2 |
| Extradition | `/practice-areas/extradition/` | L2 | Hub page | No | P2 |
| Inquests | `/practice-areas/inquests/` | L2 | Hub page | No | P2 |
| Civil Litigation | `/practice-areas/civil-litigation/` | L2 | Hub page | No | P2 |
| Fees & Legal Aid | `/fees/` | L1 | Primary nav | Yes | P0 |
| Direct Access | `/direct-access/` | L1 | Primary nav | Yes | P0 |
| Complaints | `/complaints/` | L1 | Footer only | Yes | P0 |
| Privacy Policy | `/privacy-policy/` | L1 | Footer only | Yes (GDPR) | P0 |

---

## 3. Navigation Specification

### 3.1 Primary Header Navigation

5 items plus a CTA. Order reflects crisis-state user priority.

| Position | Label | URL | Notes |
|----------|-------|-----|-------|
| 1 | Practice Areas | `/practice-areas/` | Links to hub page; no dropdown |
| 2 | Fees & Legal Aid | `/fees/` | Primary decision-gate for cost-anxious users; BSB required |
| 3 | Direct Access | `/direct-access/` | Removes the "do I need a solicitor" barrier |
| CTA | Call 07922 247 999 | `tel:+447922247999` | Rightmost; tap-to-call; primary conversion mechanism |

**Notes:**
- Logo (left) links to `/` — does not count against the 4-item nav limit.
- 4 items in primary nav preserves one slot for a future page (e.g., a Voluntary Interview Under Caution page) without exceeding the 5-item ceiling.
- Mobile: hamburger menu contains all 3 text items; CTA button persists alongside the hamburger icon in the header bar.
- No tagline, no search, no social links in the header.

### 3.2 Mobile Sticky Bottom Bar

A separate conversion component, not part of the header nav. Always visible on mobile. Two buttons only.

| Button | Label | Action |
|--------|-------|--------|
| Primary (left) | Call now | `tel:+447922247999` |
| Secondary (right) | WhatsApp | `https://wa.me/447922247999` (🚩 pre-fill `?text=` parameter — confirm with client before shipping) |

Spec: 56px minimum height. Hide on scroll down, show on scroll up to prevent content obstruction. Sufficient `padding-bottom` on page content to prevent overlap. WhatsApp button uses #25D366 or brand-adjacent green — do not neutralise the recognition trigger.

### 3.3 Footer Navigation

Four columns. Footer is on every page and carries the BSB regulatory statement.

| Column | Links |
|--------|-------|
| Practice Areas | Criminal Defence, Motoring Law, Immigration, Family Law, All Practice Areas |
| Information | Fees & Legal Aid, Direct Access, Complaints |
| Legal | Privacy Policy |
| Regulatory | "Regulated by the Bar Standards Board" (exact words required by BSB) + link to BSB Barristers' Register |

Contact details (07922 247 999, WhatsApp) appear in the footer but are secondary to the sticky bar on mobile and the above-fold on desktop.

### 3.4 Breadcrumbs

Breadcrumbs on L2 pages only (practice area pages).

Format: `Home > Practice Areas > [Practice Area Name]`

Example: `Home > Practice Areas > Motoring Law`

Not required on L1 pages (Fees, Direct Access, Complaints, Privacy Policy) — these are direct entries from the primary nav and have no parent L1 page in the hierarchy.

Implement using BreadcrumbList structured data. See `05-seo-schema-plan.md`.

---

## 4. 301 Redirect Map

### 4.1 Methodology Note

A complete redirect map requires a crawl of the live astonslaw.com site. The table below documents the new URL structure and the most probable source URLs based on standard barrister site patterns observed in the research.

**Pre-launch action required:** Crawl astonslaw.com (Screaming Frog, Sitebulb, or equivalent) before deploying. Every URL with inbound links or GSC impressions must have a 301 redirect. Export the crawl; cross-reference against the table below; fill in any gaps.

### 4.2 Probable Redirect Map (verify against live site crawl)

| Probable Source URL (astonslaw.com) | New URL | Notes |
|-------------------------------------|---------|-------|
| `/` | `/` | No redirect — root stays root |
| `/about/` or `/about-us/` | `/direct-access/` | Barrister credential/background content moves here |
| `/criminal-defence/` or `/criminal-defence-barrister/` | `/practice-areas/criminal-defence/` | Most likely formats on live site |
| `/motoring-law/` or `/motoring-offences/` | `/practice-areas/motoring-law/` | |
| `/regulatory-law/` or `/regulatory/` | `/practice-areas/regulatory-law/` | |
| `/proceeds-of-crime/` or `/poca/` | `/practice-areas/proceeds-of-crime/` | |
| `/extradition/` | `/practice-areas/extradition/` | |
| `/immigration/` or `/immigration-law/` | `/practice-areas/immigration/` | |
| `/inquests/` or `/coroner-inquests/` | `/practice-areas/inquests/` | |
| `/family-law/` or `/family/` | `/practice-areas/family-law/` | |
| `/civil-litigation/` or `/civil/` | `/practice-areas/civil-litigation/` | |
| `/licensing/` or `/licensing-law/` | `/practice-areas/licensing/` | |
| `/fees/` or `/our-fees/` or `/pricing/` | `/fees/` | If live slug is already `/fees/`, no redirect needed |
| `/contact/` or `/contact-us/` | `/` | No contact page in new IA; redirect to homepage |
| `/blog/` or `/news/` or `/articles/` | `/` | If a blog exists on live site, redirect to homepage |
| Any unknown `/practice-areas/[old-slug]/` | `/practice-areas/[new-slug]/` | Match by slug; verify exact format in crawl |

All redirects implemented in `vercel.json` as permanent 301s. See `04-seo-technical.md` for implementation format.

---

## 5. Internal Linking Logic

### 5.1 Hub-and-Spoke Structure

```
Homepage (/)
├── → /practice-areas/         (primary nav + homepage practice zone cards)
├── → /fees/                   (primary nav + Zone 5/6 of every practice area page)
├── → /direct-access/          (primary nav + Zone 2 inline on practice area pages)
└── → All 10 practice areas    (homepage practice zone card grid — one click to any area)

Practice Areas Hub (/practice-areas/)
└── → Each of 10 practice area pages (card grid — one click)

Each Practice Area Page
├── → /fees/              (Zone 5 trust signals, Zone 6 FAQs on cost questions)
├── → /direct-access/     (Zone 2 situation acknowledgement — "no solicitor needed")
└── → 2–3 related areas   (inline contextual links — see §5.2)
```

### 5.2 Cross-Practice Area Internal Links

Each practice area page links to 2–3 related areas inline in body copy, not merely in the footer.

| Practice Area | Links to | Rationale |
|-------------|---------|-----------|
| Criminal Defence | Proceeds of Crime, Regulatory Law, Extradition | POCA follows criminal conviction; regulatory investigations accompany charges; extradition is criminal |
| Proceeds of Crime | Criminal Defence, Regulatory Law | Almost always arise alongside criminal proceedings |
| Motoring Law | Criminal Defence | Dangerous driving, death by careless driving are criminal matters |
| Extradition | Criminal Defence | Extradition is a criminal law matter |
| Regulatory Law | Criminal Defence, Licensing | Regulatory investigations can lead to criminal charges; licensing matters carry regulatory implications |
| Immigration | Family Law | Family reunion, domestic abuse, immigration status frequently intersect |
| Family Law | Immigration | Reciprocal relationship — family matters often have immigration dimension |
| Licensing | Regulatory Law | Licensing reviews can carry regulatory and compliance implications |
| Inquests | Criminal Defence, Regulatory Law | Inquest findings can lead to criminal charges or regulatory proceedings |
| Civil Litigation | Proceeds of Crime | Asset freezing orders, enforcement, and recovery intersect |

### 5.3 Maximum Clicks to CTA

| User position | Path to conversion | Clicks |
|--------------|-------------------|--------|
| Any page on the site | Sticky bottom bar (always visible) | 0 |
| Homepage | Phone in above-fold | 0 |
| Any practice area page | Phone + WhatsApp in Zone 1 | 0 |
| Fees or Direct Access | Sticky bar + phone in page header | 0 |
| Footer | Tap phone number in footer | 0 |

The 2-click maximum stated in synthesis.md §3 is met. In practice, every page achieves 0 clicks to a call or WhatsApp initiation via the sticky bar.

### 5.4 No Orphan Pages

Every page has at least one inbound internal link:

| Page | Inbound link source |
|------|---------------------|
| `/complaints/` | Footer on every page |
| `/privacy-policy/` | Footer on every page |
| `/direct-access/` | Primary nav (every page) + inline on all practice area pages (Zone 2) |
| `/fees/` | Primary nav (every page) + inline on all practice area pages (Zone 5/6) |
| `/practice-areas/` | Primary nav (every page) + homepage cards |
| Each practice area | `/practice-areas/` hub + homepage practice zone |

---

## 6. Content Production Priority

Applied from `01-synthesis-gaps.md §4, Decision 5`.

| Priority | Practice Area | URL | Launch state | Rationale |
|----------|-------------|-----|--------------|-----------|
| P0 | Criminal Defence | `/practice-areas/criminal-defence/` | Full Zone 1–7 | Highest search volume; primary conversion KPI |
| P0 | Motoring Law | `/practice-areas/motoring-law/` | Full Zone 1–7 | BSB fee disclosure required; high self-referral volume |
| P0 | Immigration | `/practice-areas/immigration/` | Full Zone 1–7 | BSB fee disclosure required |
| P1 | Family Law | `/practice-areas/family-law/` | Zone 1–5 minimum | Medium volume; broad audience |
| P1 | Proceeds of Crime | `/practice-areas/proceeds-of-crime/` | Zone 1–5 minimum | Closely tied to Criminal Defence |
| P1 | Licensing | `/practice-areas/licensing/` | Zone 1–5 minimum | BSB fee disclosure required |
| P2 | Regulatory Law | `/practice-areas/regulatory-law/` | Zone 1–2 placeholder | Lower volume; grows over time |
| P2 | Extradition | `/practice-areas/extradition/` | Zone 1–2 placeholder | Highly specialised; low volume |
| P2 | Inquests | `/practice-areas/inquests/` | Zone 1–2 placeholder | Lower volume |
| P2 | Civil Litigation | `/practice-areas/civil-litigation/` | Zone 1–2 placeholder | Lowest volume for this audience profile |

P2 placeholder pages still require: a structural above-fold, phone + WhatsApp CTAs, and the sticky bar — they are not empty pages.

---

## 7. Post-MVP URL Reservations

These pages are not in the current IA but have been identified as candidates for Phase 2. Reserve these slugs — do not use them for other content.

| Reserved URL | Rationale |
|-------------|-----------|
| `/voluntary-interview-under-caution/` | Identified in research as an underserved content gap with low competition and high need |
| `/practice-areas/motoring-law/drink-driving/` | If motoring sub-pages are promoted from anchor sections to standalone URLs in Phase 2 |
| `/practice-areas/motoring-law/drug-driving/` | Same |
| `/practice-areas/motoring-law/totting-up/` | Same |
| `/practice-areas/motoring-law/mobile-phone-use/` | Same |
| `/practice-areas/motoring-law/dangerous-driving/` | Same |

---

## 8. Open Items Passed to Later Planning Steps

| Item | Dependency | Resolve in |
|------|-----------|-----------|
| Cal.com URL not confirmed (🚩) | Blocks any CTA that includes scheduling | Client confirmation session |
| Live site crawl | Required to finalise 301 redirect map | Before go-live; implement results in vercel.json |
| Practice areas hub page card grid design | Component requires specification | 08-content-strategy.md + Penpot |
| Voluntary Interview Under Caution page spec | Post-MVP content gap | Post-launch planning |
