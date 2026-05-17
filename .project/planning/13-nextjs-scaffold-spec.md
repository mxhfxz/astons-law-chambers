# Next.js Project Scaffold Specification — Astons Law Chambers

**Written:** 2026-05-13 (Session C, Step 4e)
**Skill used:** nextjs-best-practices
**Input files:** CLAUDE.md (project root), .project/planning/12-tailwind-token-spec.md

---

## Constraints

- Next.js 14+ App Router, TypeScript strict.
- All pages are statically generated (SSG). No server components with dynamic data. No API routes.
- No CMS. All data in `lib/` TypeScript files.
- GSAP is a client-side library — requires specific handling in App Router.
- Deploy to Vercel from repo root.

---

## 1. Directory Structure

```
astons-law-chambers/               ← repo root (Vercel deploys from here)
├── app/                           ← Next.js App Router
│   ├── layout.tsx                 ← Root layout: fonts, metadata, Header, Footer, StickyBar
│   ├── page.tsx                   ← Homepage (/)
│   ├── practice-areas/
│   │   ├── page.tsx               ← Practice Areas Hub (/practice-areas/)
│   │   └── [slug]/
│   │       └── page.tsx           ← Individual practice area pages
│   ├── fees/
│   │   └── page.tsx               ← Fees & Legal Aid (/fees/)
│   ├── direct-access/
│   │   └── page.tsx               ← Direct Access (/direct-access/)
│   ├── complaints/
│   │   └── page.tsx               ← Complaints (/complaints/)
│   └── privacy-policy/
│       └── page.tsx               ← Privacy Policy (/privacy-policy/)
│
├── components/
│   ├── ui/                        ← Primitive components
│   │   ├── Button.tsx
│   │   ├── Link.tsx
│   │   ├── Badge.tsx
│   │   └── Icon.tsx
│   ├── layout/                    ← Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── StickyBar.tsx
│   │   ├── Container.tsx
│   │   └── Section.tsx
│   └── sections/                  ← Page section components
│       ├── HeroZone.tsx
│       ├── SituationAck.tsx
│       ├── ActionSteps.tsx
│       ├── ProcessSteps.tsx
│       ├── TrustSignals.tsx
│       ├── FAQList.tsx
│       ├── RepeatCTA.tsx
│       ├── PracticeZone.tsx
│       ├── PracticeCard.tsx
│       ├── BreadcrumbBar.tsx
│       └── DirectAccessBanner.tsx
│
├── hooks/
│   ├── useReducedMotion.ts        ← Required before any GSAP usage
│   └── useStickyBarVisibility.ts  ← Scroll-direction show/hide logic
│
├── lib/
│   ├── practice-areas.ts          ← Array of 10 practice area objects
│   ├── contact.ts                 ← Phone, WhatsApp, cal.com URL
│   └── site.ts                    ← Site name, meta defaults, BSB-required fields
│
├── styles/
│   ├── tokens.css                 ← CSS custom properties (3-layer system)
│   └── globals.css                ← Imports tokens.css; base/reset styles
│
├── public/
│   ├── logo-navy.svg              ← Client asset (from 00_Design System/)
│   ├── logo-white.svg             ← Client asset (from 00_Design System/)
│   └── robots.txt                 ← See 04-seo-technical.md
│
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── .eslintrc.json
├── package.json
├── vercel.json                    ← Redirects, headers, cache (see 14-vercel-config-plan.md)
├── CLAUDE.md                      ← Project contract
└── .project/                      ← Planning files (not deployed)
```

---

## 2. File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| React components | PascalCase | `HeroZone.tsx`, `StickyBar.tsx` |
| Hooks | camelCase, `use` prefix | `useReducedMotion.ts` |
| Lib data files | camelCase | `practice-areas.ts` |
| Route files | Next.js convention | `page.tsx`, `layout.tsx` |
| CSS files | kebab-case | `tokens.css`, `globals.css` |
| Config files | Tooling convention | `next.config.ts`, `tailwind.config.ts` |

---

## 3. Static Rendering Strategy

Every page is statically generated at build time. No server-side rendering at request time. No dynamic data fetching.

### `app/page.tsx` (Homepage)
Default export, no `generateStaticParams` required. Static by default.

### `app/practice-areas/[slug]/page.tsx`
Requires `generateStaticParams`:

```typescript
// Structure only — not implementation
export async function generateStaticParams() {
  return practiceAreas.map((area) => ({ slug: area.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const area = getPracticeAreaBySlug(params.slug)
  return {
    title: `${area.title} | Astons Law Chambers`,
    description: area.metaDescription,
  }
}
```

All other pages (`/fees/`, `/direct-access/`, `/complaints/`, `/privacy-policy/`) are static by default — no `generateStaticParams` needed.

### No API Routes

There are no `route.ts` files in this project. No server actions. No form submissions. No contact endpoints. Conversion is via `tel:` and `wa.me` links only.

---

## 4. `lib/` Content File Structure

### `lib/practice-areas.ts`

```typescript
// Structure only — copy is a separate phase (client-confirmed content)
export interface PracticeArea {
  slug: string
  title: string
  headline: string           // Zone 1: mirrors search phrase
  metaDescription: string    // 150–160 characters
  zones: {
    situation: string[]      // Zone 2: 4–6 paragraph strings
    actionSteps: string[]    // Zone 3: numbered action list items
    processSteps: string[]   // Zone 4: process bullet strings
    trustSignals: string[]   // Zone 5: 2–4 credential strings
    faqs: Array<{
      question: string
      answer: string
    }>                       // Zone 6: 3–5 FAQ objects
  }
  legalAidAvailable: boolean | null  // null = 🚩 pending client confirmation
  bsbFeeDisclosureRequired: boolean  // true for Motoring, Immigration, Licensing
  relatedAreas: string[]             // 2–3 slugs for cross-links
  priority: 'P0' | 'P1' | 'P2'
}

export const practiceAreas: PracticeArea[] = [
  // 10 entries — copy content is Phase 3 deliverable, after client confirmation
]

export function getPracticeAreaBySlug(slug: string): PracticeArea {
  const area = practiceAreas.find((a) => a.slug === slug)
  if (!area) throw new Error(`Practice area not found: ${slug}`)
  return area
}
```

### `lib/contact.ts`

```typescript
export const contact = {
  phone: '07922 247 999',
  phoneTel: 'tel:+447922247999',
  whatsapp: 'https://wa.me/447922247999',
  // whatsappPrefill: '' — 🚩 exact ?text= parameter pending client confirmation
  calUrl: '', // 🚩 URL pending client confirmation
} as const
```

### `lib/site.ts`

```typescript
export const site = {
  name: 'Astons Law Chambers',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://astonslaw.com',
  description: '', // Meta default — to be confirmed with client
  bsb: {
    regulatoryStatement: 'Regulated by the Bar Standards Board',
    registerUrl: 'https://www.barstandardsboard.org.uk/search-barrister.html',
    publicAccessGuidanceUrl: 'https://www.barcouncil.org.uk/i-am-a-member-of-the-public/going-to-court/public-access.html',
    // bsbNumber: '' — 🚩 not confirmed; do not fabricate
  },
  legalOmbudsman: {
    url: 'https://www.legalombudsman.org.uk',
    phone: '0300 555 0333',
  },
} as const
```

---

## 5. TypeScript Strict Configuration

```json
// tsconfig.json — strict mode requirements
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "paths": {
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/hooks/*": ["./hooks/*"],
      "@/styles/*": ["./styles/*"]
    }
  }
}
```

Import alias `@/` is used throughout. No relative `../../` imports in components.

---

## 6. GSAP + ScrollTrigger Integration with App Router

GSAP is a browser-only library. In Next.js App Router, all components are server components by default. GSAP usage requires specific handling.

### Pattern: Dynamic Import in Client Component

```typescript
// Example structure for a section component using GSAP
'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function SectionWithAnimation() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !ref.current) return

    // Dynamic import — GSAP is not bundled until component mounts
    const initAnimation = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.from(ref.current, {
        opacity: 0,
        y: 24,
        duration: 0.6,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
        },
      })
    }

    initAnimation()
  }, [prefersReducedMotion])

  return <div ref={ref}>...</div>
}
```

### `useReducedMotion` Hook

```typescript
// hooks/useReducedMotion.ts
'use client'

import { useEffect, useState } from 'react'

export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return prefersReduced
}
```

### Rules

- Sections using GSAP must be marked `'use client'`.
- Layout components (Header, Footer, StickyBar) do not use GSAP — they use CSS transitions only (no `'use client'` required unless they need scroll event listeners).
- `StickyBar` uses `useStickyBarVisibility` hook (scroll direction) — requires `'use client'`.
- All other server components remain server components.

---

## 7. `next.config.ts` Settings

```typescript
// next.config.ts — structure only
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // No output: 'export' — Vercel deploys Next.js natively
  // Static pages are generated at build; no config change needed

  images: {
    formats: ['image/avif', 'image/webp'],
    // No external domains — all images are local assets
    unoptimized: false,
  },

  // Strict mode in development
  reactStrictMode: true,
}

export default nextConfig
```

No `output: 'export'` — Vercel handles Next.js App Router natively. Static pages are pre-rendered at build time without needing the export flag.

---

## 8. `app/layout.tsx` — Root Layout Structure

```typescript
// Structure only
import { Inter } from 'next/font/google'
import { Playfair_Display } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { StickyBar } from '@/components/layout/StickyBar'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['700'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyBar />
      </body>
    </html>
  )
}
```

Font variables are injected at `:root` level via `next/font`. This prevents any flash of unstyled text and eliminates layout shift from font loading. See file 15 for full CLS protocol.

---

## 9. ESLint Configuration

```json
// .eslintrc.json — key rules for token enforcement
{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": {
    "react/forbid-component-props": [
      "warn",
      { "forbid": [{ "propName": "style", "message": "Use Tailwind classes or CSS custom properties. Inline styles allowed only for GSAP-managed transform values." }] }
    ],
    "no-restricted-syntax": [
      "warn",
      {
        "selector": "Literal[value=/^#[0-9a-fA-F]{3,6}/]",
        "message": "Raw hex values are not permitted. Use a CSS custom property token."
      }
    ]
  }
}
```

---

## 10. Open Items

- 🚩 `lib/contact.ts`: `calUrl` and `whatsappPrefill` values pending client confirmation.
- 🚩 `lib/site.ts`: `bsbNumber` not confirmed — field must remain empty until confirmed.
- `lib/practice-areas.ts`: All `zones.*` content is Phase 3 deliverable after client confirmation session.
- Font choice (Inter + Playfair Display) is provisional — subject to override by Penpot design file.
