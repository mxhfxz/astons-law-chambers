# Component Inventory and Build Order — Astons Law Chambers

**Written:** 2026-05-13 (Session C, Step 4h)
**Skill used:** frontend-design
**Input files:** .project/planning/09-design-system-spec.md, .project/planning/10-mobile-layout-spec.md, .project/planning/13-nextjs-scaffold-spec.md

---

## Governing Rule

One component per task. Never bundle multiple components in a single context window. Each component is built after design-reader reads the Penpot spec, component-builder builds it, and code-reviewer checks the output.

---

## 1. Build Order

Components must be built in this sequence. No component can be built before its dependency exists.

```
Phase 1 (Scaffold)
  └── tokens.css + tailwind.config.ts

Phase 2 (Design System + Tokens)
  └── Penpot file + token implementation
  └── globals.css

Phase 3 (Primitives — no other component dependencies)
  1. Button
  2. Link
  3. Badge
  4. Icon

Phase 4 (Layout — depends on Primitives)
  5. Container
  6. Section
  7. Header  (depends on Button, Link, Icon)
  8. Footer  (depends on Link, Badge)
  9. StickyBar  (depends on Button, Link)

Phase 5 (Sections — depends on Layout + Primitives)
  10. BreadcrumbBar  (depends on Link)
  11. HeroZone  (depends on Button, Link, Badge)
  12. SituationAck  (no component dependencies — pure prose)
  13. ActionSteps  (no component dependencies — prose + list)
  14. ProcessSteps  (no component dependencies — prose + list)
  15. TrustSignals  (depends on Badge)
  16. FAQList  (no component dependencies)
  17. RepeatCTA  (depends on Button, Link)
  18. DirectAccessBanner  (depends on Link)
  19. PracticeCard  (depends on Link, Badge)
  20. PracticeZone  (depends on PracticeCard)

Phase 6 (Pages)
  21. Homepage (/)
  22. PracticeAreasHub (/practice-areas/)
  23. PracticeAreaPage (/practice-areas/[slug]/)
  24. FeesPage (/fees/)
  25. DirectAccessPage (/direct-access/)
  26. ComplaintsPage (/complaints/)
  27. PrivacyPolicyPage (/privacy-policy/)
```

---

## 2. Primitive Components

### Button

**File:** `components/ui/Button.tsx`
**Variants:** `phone` (primary), `whatsapp` (secondary), `text` (tertiary/link-style)
**Shared across:** all pages via sticky bar, hero zones, repeat CTAs

```typescript
interface ButtonProps {
  variant: 'phone' | 'whatsapp' | 'text'
  href: string              // Always a link — this site has no form submit buttons
  label: string
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  className?: string
}
```

**Notes:**
- All buttons are `<a>` elements internally (navigation only — no form actions).
- `phone` variant: amber-500 background, navy-950 text, `tel:` href.
- `whatsapp` variant: #25D366 background, white text, `wa.me` href.
- `text` variant: no background, navy-800 text, underline on hover.
- Touch target: 44×44px minimum enforced via padding.

---

### Link

**File:** `components/ui/Link.tsx`
**Variants:** `internal`, `external`, `tel`, `whatsapp`
**Shared across:** navigation, footer, breadcrumbs, inline body copy

```typescript
interface LinkProps {
  href: string
  children: React.ReactNode
  variant?: 'internal' | 'external' | 'tel' | 'whatsapp'
  className?: string
}
```

**Notes:**
- `internal`: Next.js `<Link>` component.
- `external`: HTML `<a>` with `target="_blank" rel="noopener noreferrer"`.
- `tel`: `href="tel:+447922247999"`.
- `whatsapp`: `href="https://wa.me/447922247999"` (🚩 pre-fill pending).
- Styles from token system — no raw colour values.

---

### Badge

**File:** `components/ui/Badge.tsx`
**Variants:** `legal-aid`, `bsb-regulated`, `info`
**Shared across:** HeroZone, TrustSignals, Footer

```typescript
interface BadgeProps {
  variant: 'legal-aid' | 'bsb-regulated' | 'info'
  label: string
  className?: string
}
```

**Notes:**
- `legal-aid`: green tint — signals availability. Copy is 🚩 pending client confirmation.
- `bsb-regulated`: navy tint — BSB regulatory signal.
- `info`: neutral grey — general information tags.
- Small, inline. Not a large banner. Supports trust signal without overwhelming the layout.

---

### Icon

**File:** `components/ui/Icon.tsx`
**Variants:** `phone`, `whatsapp`, `arrow-right`, `chevron-down`, `check`, `external-link`
**Shared across:** buttons, nav, sections

```typescript
interface IconProps {
  name: 'phone' | 'whatsapp' | 'arrow-right' | 'chevron-down' | 'check' | 'external-link'
  size?: 16 | 20 | 24
  className?: string
  'aria-hidden'?: boolean
}
```

**Notes:**
- SVG inline icons. No icon font (eliminates render-blocking dependency).
- All icons are `aria-hidden="true"` when decorative (adjacent to text label).
- Icons are optional at MVP — do not block component build waiting for icon set.

---

## 3. Layout Components

### Container

**File:** `components/layout/Container.tsx`
**Purpose:** Max-width wrapper with responsive horizontal padding
**Shared across:** all page sections

```typescript
interface ContainerProps {
  children: React.ReactNode
  className?: string
}
```

Renders a `<div>` with `max-width` from container tokens, horizontal padding from `--spacing-container-x`, centred with `margin: 0 auto`.

---

### Section

**File:** `components/layout/Section.tsx`
**Purpose:** Vertical-padding wrapper with optional dark background
**Shared across:** all page sections

```typescript
interface SectionProps {
  children: React.ReactNode
  variant?: 'base' | 'subtle' | 'dark'
  id?: string                    // for anchor links (e.g., #drink-driving on motoring page)
  className?: string
}
```

`variant: 'dark'` applies `--section-dark-bg` and `--section-dark-text`. Usage is capped at 1–2 per page per the tonal banding rule.

---

### Header

**File:** `components/layout/Header.tsx`
**Depends on:** Button, Link, Icon
**Shared across:** all pages via RootLayout

```typescript
interface HeaderProps {
  // No props — content from lib/contact.ts and lib/site.ts
}
```

**Behaviour:**
- `position: sticky; top: 0; z-index: 40`.
- Mobile: logo + phone CTA button + hamburger icon.
- Desktop: logo + nav items (Practice Areas, Fees & Legal Aid, Direct Access) + phone CTA button.
- Hamburger opens full-screen overlay nav (controlled by local state — requires `'use client'`).
- Phone CTA is always visible on all viewports.

---

### Footer

**File:** `components/layout/Footer.tsx`
**Depends on:** Link, Badge
**Shared across:** all pages via RootLayout

```typescript
interface FooterProps {
  // No props — content from lib/contact.ts, lib/site.ts, lib/practice-areas.ts
}
```

**Content:**
- 4-column grid (stacked on mobile): Practice Areas, Information, Legal, Regulatory.
- BSB regulatory statement: exact text from `lib/site.ts`.
- BSB Register link, LeO link.
- Phone and WhatsApp contact details.

---

### StickyBar

**File:** `components/layout/StickyBar.tsx`
**Depends on:** Button
**Shared across:** all pages via RootLayout (mobile only)

```typescript
interface StickyBarProps {
  // No props — contact values from lib/contact.ts
}
```

**Behaviour:**
- Renders `null` on viewports ≥1280px (check via `useMediaQuery` or CSS-only approach).
- Scroll-direction show/hide via `useStickyBarVisibility` hook.
- `position: fixed; bottom: 0; z-index: 50`.
- Injects `padding-bottom: var(--sticky-bar-height)` on `<body>` via a class.
- 🚩 WhatsApp `?text=` pre-fill not included until client confirms wording.

---

## 4. Section Components

### HeroZone

**File:** `components/sections/HeroZone.tsx`
**Depends on:** Button, Link, Badge
**Used on:** all 10 practice area pages, homepage (variant)

```typescript
interface HeroZoneProps {
  headline: string           // Zone 1 h1 — mirrors search phrase
  supporting: string         // 1-sentence supporting line
  legalAidAvailable: boolean | null   // null renders nothing (🚩 pending)
  // CTAs use lib/contact.ts values — not passed as props
}
```

---

### SituationAck

**File:** `components/sections/SituationAck.tsx`
**Depends on:** none (pure prose)
**Used on:** all 10 practice area pages (Zone 2)

```typescript
interface SituationAckProps {
  paragraphs: string[]       // 4–6 strings; rendered as <p> elements
  directAccessInline?: boolean   // renders DirectAccessBanner inline if true
}
```

---

### ActionSteps

**File:** `components/sections/ActionSteps.tsx`
**Depends on:** none
**Used on:** all 10 practice area pages (Zone 3)

```typescript
interface ActionStepsProps {
  steps: string[]            // numbered action list items
  heading?: string           // optional section heading
}
```

---

### ProcessSteps

**File:** `components/sections/ProcessSteps.tsx`
**Depends on:** none
**Used on:** all 10 practice area pages (Zone 4)

```typescript
interface ProcessStepsProps {
  steps: string[]            // 3–5 process bullet strings
  heading?: string
}
```

---

### TrustSignals

**File:** `components/sections/TrustSignals.tsx`
**Depends on:** Badge
**Used on:** all 10 practice area pages (Zone 5 — dark section)

```typescript
interface TrustSignalsProps {
  signals: string[]          // 2–4 credential/experience strings
  legalAidAvailable: boolean | null
  inlineCta?: boolean        // renders phone + WhatsApp CTA within the section
}
```

---

### FAQList

**File:** `components/sections/FAQList.tsx`
**Depends on:** none
**Used on:** all 10 practice area pages (Zone 6)

```typescript
interface FAQQuestion {
  question: string
  answer: string
}

interface FAQListProps {
  questions: FAQQuestion[]   // 3–5 items
  heading?: string
}
```

Static render at MVP (no accordion JS). Accordion is a Phase 2 enhancement.

---

### RepeatCTA

**File:** `components/sections/RepeatCTA.tsx`
**Depends on:** Button, Link
**Used on:** all 10 practice area pages (Zone 7), Fees page, Direct Access page

```typescript
interface RepeatCTAProps {
  showBooking?: boolean      // renders cal.com link (🚩 URL pending)
  heading?: string
}
```

---

### DirectAccessBanner

**File:** `components/sections/DirectAccessBanner.tsx`
**Depends on:** Link
**Used on:** practice area pages (Zone 2 inline), homepage

```typescript
interface DirectAccessBannerProps {
  variant: 'inline' | 'block'
  // inline: short sentence with link to /direct-access/
  // block: 2–3 sentence explanation + link
}
```

---

### PracticeCard

**File:** `components/sections/PracticeCard.tsx`
**Depends on:** Link, Badge
**Used on:** Practice Areas Hub, homepage PracticeZone

```typescript
interface PracticeCardProps {
  title: string
  slug: string
  summary: string            // 1–2 sentence description
  bsbRequired?: boolean      // shows BSB fee disclosure badge
  priority: 'P0' | 'P1' | 'P2'
}
```

---

### PracticeZone

**File:** `components/sections/PracticeZone.tsx`
**Depends on:** PracticeCard
**Used on:** Homepage, Practice Areas Hub page

```typescript
interface PracticeZoneProps {
  heading?: string
  showAll?: boolean          // hub page shows all 10; homepage shows P0 first (can show all)
}
```

Grid layout: 1 column on mobile, 2 on tablet, 4–5 on desktop.

---

### BreadcrumbBar

**File:** `components/sections/BreadcrumbBar.tsx`
**Depends on:** Link
**Used on:** all 10 practice area pages (L2 pages only)

```typescript
interface BreadcrumbItem {
  label: string
  href?: string   // omit for current page (last item)
}

interface BreadcrumbBarProps {
  items: BreadcrumbItem[]
}
```

Renders BreadcrumbList structured data as `<script type="application/ld+json">`. See `05-seo-schema-plan.md`.

---

## 5. Subagent Mapping

Each component passes through three subagents in sequence:

| Subagent | Role | Input | Output |
|---------|------|-------|--------|
| `design-reader` (read-only) | Reads Penpot layer tree; extracts token assignments; flags raw hex | Penpot page for this component | Design spec: exact dimensions, spacing, token references |
| `component-builder` (write) | Builds the component from design-reader output | Design spec + prior planning files | `components/[layer]/ComponentName.tsx` |
| `code-reviewer` (read-only) | Checks output against design spec; verifies no hardcoded colours, no inline styles, correct conversion links | Component file | Pass / flag list |

design-reader runs before component-builder. code-reviewer runs after. This is non-negotiable per CLAUDE.md.

---

## 6. Components Shared vs. Page-Specific

### Shared (all or most pages)
Header, Footer, StickyBar, Container, Section, BreadcrumbBar (L2 only), DirectAccessBanner, RepeatCTA

### Practice Area Pages Only
HeroZone, SituationAck, ActionSteps, ProcessSteps, TrustSignals, FAQList

### Homepage Only
PracticeZone (with `showAll: false` or `true` variant)

### Practice Areas Hub Only
PracticeZone (full 10-card grid), BreadcrumbBar (none — L1 page, no breadcrumb needed)

### Utility Pages (Fees, Direct Access, Complaints, Privacy Policy)
HeroZone (variant), RepeatCTA, prose sections (these pages have less rigid zone structure — they are content-specific layouts)

---

## 7. Components Not Required

| Not required | Reason |
|-------------|--------|
| ContactForm | No forms on this site |
| EmailCapture | No email funnel |
| ChatWidget | Not a conversion mechanism for this site |
| TestimonialsWall | No verified review count; excluded by project brief |
| BlogCard / NewsCard | Not above the fold; no blog at MVP |
| SocialLinks (header) | Not in conversion path; excluded by project brief |
| CookieBanner | Assess after reviewing analytics decision — if no cookies, no banner needed |

---

## 8. Open Items

- Penpot design file must exist before design-reader can run. User must set up Penpot file first (Phase 2 is user-side).
- Icon set: SVG icons to be designed in Penpot or sourced from a consistent icon library. Decision deferred to design phase.
- Accordion for FAQList: static at MVP; interactive accordion is Phase 2 enhancement.
- 🚩 DirectAccessBanner and RepeatCTA: `showBooking` prop depends on `calUrl` from `lib/contact.ts` — blocked until client confirms cal.com URL.
