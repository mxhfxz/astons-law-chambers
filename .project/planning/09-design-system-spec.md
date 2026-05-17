# Design System Specification — Astons Law Chambers

**Written:** 2026-05-13 (Session C, Step 4a)
**Skill used:** web-design-guidelines
**Input files:** .project/research-01/synthesis.md, .project/planning/08-content-strategy.md

---

## 1. Token Hierarchy

Three layers. No raw values anywhere in code. Every style decision traces to a token.

```
Primitive  →  Semantic  →  Component
(raw value)   (meaning)    (element-scoped)
```

**Primitive layer** names a value without intent: `--color-navy-950`, `--space-4`, `--text-base`.
**Semantic layer** maps a primitive to a purpose: `--color-text-primary`, `--color-bg-dark`.
**Component layer** scopes a semantic token to a specific UI element: `--sticky-bar-height`, `--card-padding`.

Rules:
- Component tokens must reference semantic tokens, not primitives directly.
- No raw hex, px, or rem values in JSX or any `.css` file outside `styles/tokens.css`.
- No inline styles in JSX. All values via Tailwind utility classes or CSS custom property references.

---

## 2. Colour Palette

### Constraints from Research

- Dark/authoritative. Not SaaS-blue (no sky, indigo, or brand-blue ranges that signal tech products).
- WhatsApp green (`#25D366`) is a brand recognition trigger — do not substitute, neutralise, or adjust opacity.
- Dark emphasis sections: 1–2 maximum per page. No alternating banding.
- No photography or illustration colours imported from hero images — there are none.

### Primitive Colour Tokens

| Token | Hex | Notes |
|-------|-----|-------|
| `--color-navy-950` | `#0B1423` | Near-black navy — primary text, highest contrast |
| `--color-navy-900` | `#152035` | Dark emphasis section backgrounds |
| `--color-navy-800` | `#1E2E47` | Footer background, secondary dark surfaces |
| `--color-navy-700` | `#263A5A` | Dark card surfaces, strong borders |
| `--color-navy-100` | `#E8EDF5` | Light navy tint — section dividers |
| `--color-white` | `#FFFFFF` | Base page background |
| `--color-off-white` | `#F8F9FB` | Subtle background (surgical use — not alternating) |
| `--color-amber-500` | `#D97706` | Phone CTA button background |
| `--color-amber-400` | `#F59E0B` | Phone CTA hover state |
| `--color-whatsapp` | `#25D366` | WhatsApp button — exact value, no substitution |
| `--color-whatsapp-dark` | `#1EBE57` | WhatsApp button hover |
| `--color-grey-600` | `#4B5563` | Secondary text, captions |
| `--color-grey-300` | `#D1D5DB` | Borders, dividers on light backgrounds |
| `--color-grey-100` | `#F3F4F6` | Table rows, subtle element backgrounds |

### Semantic Colour Tokens

| Token | Primitive | Purpose |
|-------|-----------|---------|
| `--color-text-primary` | `navy-950` | Default body text |
| `--color-text-secondary` | `grey-600` | Supporting text, captions, breadcrumbs |
| `--color-text-inverse` | `white` | Text on dark backgrounds |
| `--color-text-muted` | `grey-300` | Placeholder, disabled, legal-small on light bg |
| `--color-bg-base` | `white` | Default page background |
| `--color-bg-subtle` | `off-white` | Alternate section (not alternating — surgical only) |
| `--color-bg-dark` | `navy-900` | Dark emphasis section background |
| `--color-bg-footer` | `navy-800` | Footer background |
| `--color-border-default` | `grey-300` | Standard border |
| `--color-border-strong` | `navy-700` | Emphasis border, active states |
| `--color-cta-phone` | `amber-500` | Phone CTA background |
| `--color-cta-phone-hover` | `amber-400` | Phone CTA hover |
| `--color-cta-whatsapp` | `whatsapp` | WhatsApp CTA background |
| `--color-cta-whatsapp-hover` | `whatsapp-dark` | WhatsApp CTA hover |
| `--color-link` | `navy-800` | Default link colour |
| `--color-link-hover` | `navy-700` | Link hover |

### Rationale

Navy-950 on white is 21:1 contrast ratio (WCAG AAA). White on navy-900 is 14.8:1.
Amber is used only as a button background with dark text overlay — it does not pass AA as a text link colour.
WhatsApp green is below 4.5:1 against white — use white text on the green button only, never green text on white.

---

## 3. Spacing Scale

4px base unit. All spacing tokens are multiples of 4.

### Primitive Spacing Tokens

| Token | Value | PX |
|-------|-------|-----|
| `--space-1` | `0.25rem` | 4px |
| `--space-2` | `0.5rem` | 8px |
| `--space-3` | `0.75rem` | 12px |
| `--space-4` | `1rem` | 16px |
| `--space-6` | `1.5rem` | 24px |
| `--space-8` | `2rem` | 32px |
| `--space-10` | `2.5rem` | 40px |
| `--space-12` | `3rem` | 48px |
| `--space-16` | `4rem` | 64px |
| `--space-20` | `5rem` | 80px |
| `--space-24` | `6rem` | 96px |

### Semantic Spacing Tokens

| Token | Reference | Purpose |
|-------|-----------|---------|
| `--spacing-section-y-mobile` | `space-16` | Vertical section padding on mobile (64px) |
| `--spacing-section-y-desktop` | `space-20` | Vertical section padding on desktop (80px) |
| `--spacing-container-x` | `space-6` | Horizontal container padding on mobile (24px) |
| `--spacing-stack-base` | `space-4` | Default vertical rhythm between elements (16px) |
| `--spacing-stack-loose` | `space-8` | Loose vertical rhythm between blocks (32px) |

---

## 4. Typography Scale

Target: legal readability under stress. No condensed or lightweight faces. Generous line height.

### Font Families

| Token | Value | Notes |
|-------|-------|-------|
| `--font-sans` | `'Inter Variable', system-ui, sans-serif` | Body text — loaded via `next/font/google` |
| `--font-serif` | `'Playfair Display', Georgia, serif` | Display headings only — loaded via `next/font/google` |

Both loaded with `display: 'swap'`, `subsets: ['latin']`. Playfair Display used at h1/display scale only. All body text, navigation, and UI labels use Inter.

### Type Scale Tokens

| Token | Size | Line Height | Weight | Use |
|-------|------|-------------|--------|-----|
| `--text-xs` | `0.75rem` (12px) | `1.5` | 400 | Legal-small: BSB disclaimers, regulatory footer text |
| `--text-sm` | `0.875rem` (14px) | `1.5` | 400 | Captions, breadcrumbs, footer links, nav labels |
| `--text-base` | `1rem` (16px) | `1.7` | 400 | Default body text |
| `--text-lg` | `1.125rem` (18px) | `1.7` | 400 | Lead paragraphs (Zone 2 content) |
| `--text-xl` | `1.25rem` (20px) | `1.4` | 600 | Sub-headings, FAQ questions |
| `--text-2xl` | `1.5rem` (24px) | `1.3` | 600 | h3 section sub-headings |
| `--text-3xl` | `1.875rem` (30px) | `1.25` | 700 | h2 section headings |
| `--text-4xl` | `2.25rem` (36px) | `1.15` | 700 | h1 practice area pages (mobile) |
| `--text-5xl` | `3rem` (48px) | `1.1` | 700 | h1 homepage (mobile) / h1 practice area (desktop) |
| `--text-display` | `3.75rem` (60px) | `1.05` | 700 | h1 homepage (desktop, Playfair Display) |

**Body copy line length:** 68–72 characters maximum. Enforce via `max-width: 70ch` on prose containers.

**WCAG AA type floor — applies to all breakpoints (mobile, tablet, desktop):**
- Body text: `--text-base` (16px) minimum. No responsive rule may reduce body text below 16px on any device.
- UI labels, nav, captions: `--text-sm` (14px) minimum. This is WCAG AA's threshold for "normal text" requiring 4.5:1 contrast.
- `--text-xs` (12px): permitted only for BSB-required or GDPR-required disclaimer text where the mandated content cannot be rendered at a larger size. Must have ≥ 4.5:1 contrast. Never used for interactive elements, navigation, or any text the user must act on.
- Heading scales may increase at larger breakpoints but must never decrease below `--text-3xl` (30px) for h2 or `--text-2xl` (24px) for h3 on any device.

**Legal-small:** BSB and GDPR-required disclaimers may use `--text-xs` (12px). Supporting text should use `--text-sm` minimum — do not downscale non-mandatory text to legal-small.

---

## 5. Motion System

### Rule

Every GSAP animation must be guarded by `prefers-reduced-motion`. No exceptions.

### Guard Hook (required in build phase)

```typescript
// hooks/useReducedMotion.ts
export function useReducedMotion(): boolean {
  return typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false
}
```

Usage pattern in any component using GSAP:

```typescript
const prefersReducedMotion = useReducedMotion()

useEffect(() => {
  if (prefersReducedMotion) return
  // gsap.from(...)
}, [prefersReducedMotion])
```

### Motion Tokens

| Token | Value | Use |
|-------|-------|-----|
| `--duration-fast` | `150ms` | Hover/focus micro-interactions |
| `--duration-base` | `300ms` | Standard transitions |
| `--duration-slow` | `600ms` | Scroll-triggered section reveals |
| `--ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | Default (Tailwind ease-in-out equivalent) |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Element entrance |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Element exit |

### Permitted Scroll Animation Patterns

| Pattern | GSAP Config | Use |
|---------|-------------|-----|
| Fade-up reveal | `from: { opacity: 0, y: 24 }` | Section entry, zone headings |
| Fade-in | `from: { opacity: 0 }` | Text block, inline reveal |
| Stagger children | Add `stagger: 0.08` | Card grid, list items |

No parallax. No rotation. No scale transforms. No elaborate sequencing. Animation is functional, not decorative — the user in crisis is not a cinema audience.

### CLS Prevention

All animated elements must have explicit dimensions before GSAP initialises. `ScrollTrigger.refresh()` called after document `load` event and after fonts load. See file 15 for the full CLS protocol.

---

## 6. Rejected Design Patterns

| Pattern | Reason |
|---------|--------|
| Alternating tonal banding | Research signal. 1–2 dark emphasis sections per page; never alternating. |
| Large hero images above fold | Increases LCP; occupies conversion real estate; no portrait permitted. |
| Testimonials wall or review widget | Credibility-negative without 20+ verified reviews — not confirmed. |
| Contact forms | 81% abandonment; contradicts conversion-only rule. |
| SaaS-blue palette | Signals tech product, not legal authority. |
| Social media links in header | Removes users from the conversion path. |
| Portrait photography | Excluded by project brief — no exceptions, ever. |
| Marketing superlatives | BSB compliance conflict: "best/top/leading" require substantiation. |
| Triadic heading structure | AI writing pattern; explicitly rejected in project brief. |
| Decorative gradient overlays | Increases visual noise for a crisis-state user. |
| Email capture or lead magnets | Excluded by project brief. |
| Sticky notification bars above header | Adds layout shift risk; not a conversion mechanism. |

---

## 7. Accessibility Baseline

- WCAG 2.1 AA minimum for all text/background combinations on all device types (mobile, tablet, desktop).
- Navy-950 on white: 21:1 (AAA).
- White on navy-900: 14.8:1 (AAA).
- White text on whatsapp-green: 4.6:1 (AA — acceptable for button labels).
- White text on amber-500: 3.1:1 — **use only for button labels, not standalone text links**.
- Focus states: 2px outline, 2px offset, colour `--color-border-strong`.
- All interactive elements: 44×44px minimum touch target (WCAG 2.5.5).
- StickyBar buttons: 56px height — satisfies touch target.
- Skip-to-content link required in Header (visually hidden, visible on focus).
- **Type scale floor:** See §4 Typography Scale. 16px body / 14px UI labels on all devices. No responsive rule may reduce text below these thresholds. This applies identically at 375px (mobile), 768px (tablet), and 1280px+ (desktop).

---

## 8. Open Items

None blocking design system definition. The following require client confirmation before they can be expressed in design tokens or copy:

- 🚩 Legal aid signal wording (zone 1 copy) — affects badge/tag component copy only, not token structure.
- 🚩 WhatsApp pre-fill text — affects `href` value only, not component design.
- 🚩 Cal.com URL — affects booking CTA link only.
