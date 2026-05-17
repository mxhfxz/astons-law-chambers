# Tailwind + CSS Custom Properties Scaffold Spec — Astons Law Chambers

**Written:** 2026-05-13 (Session C, Step 4d)
**Skill used:** tailwind-design-system
**Input files:** .project/planning/09-design-system-spec.md

---

## Governing Rule

No raw colour hex, px, or rem values in JSX or `.css` files outside `styles/tokens.css`. All design decisions trace to a named token. Tailwind utility classes reference CSS custom properties via `var()` in `tailwind.config.ts`.

---

## 1. File Structure

```
styles/
  tokens.css          ← single source of truth for all design tokens
app/
  globals.css         ← imports tokens.css; applies base/reset styles
tailwind.config.ts    ← extends theme using var() references
```

No other CSS files. No module CSS. All component styling via Tailwind utility classes that reference the token system.

---

## 2. `styles/tokens.css` Structure

Three sections inside a single `:root` block. Order: primitive → semantic → component.

```css
/* ============================================================
   PRIMITIVE LAYER — raw values, no meaning
   Naming: --color-{name}-{shade}, --space-{n}, --text-{size}
   These tokens are rarely referenced in components directly.
   ============================================================ */
:root {

  /* --- Primitive: Colour --- */
  --color-navy-950: #0B1423;
  --color-navy-900: #152035;
  --color-navy-800: #1E2E47;
  --color-navy-700: #263A5A;
  --color-navy-100: #E8EDF5;
  --color-white: #FFFFFF;
  --color-off-white: #F8F9FB;
  --color-amber-500: #D97706;
  --color-amber-400: #F59E0B;
  --color-whatsapp: #25D366;
  --color-whatsapp-dark: #1EBE57;
  --color-grey-600: #4B5563;
  --color-grey-300: #D1D5DB;
  --color-grey-100: #F3F4F6;

  /* --- Primitive: Spacing --- */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;

  /* --- Primitive: Typography --- */
  --font-sans: 'Inter Variable', system-ui, sans-serif;
  --font-serif: 'Playfair Display', Georgia, serif;
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
  --text-display: 3.75rem;

  /* --- Primitive: Motion --- */
  --duration-fast: 150ms;
  --duration-base: 300ms;
  --duration-slow: 600ms;
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);


  /* ============================================================
     SEMANTIC LAYER — meaning mapped to primitive
     Naming: --color-{role}, --spacing-{role}, --font-{role}
     Components reference this layer, not the primitive layer.
     ============================================================ */

  /* --- Semantic: Colour --- */
  --color-text-primary: var(--color-navy-950);
  --color-text-secondary: var(--color-grey-600);
  --color-text-inverse: var(--color-white);
  --color-text-muted: var(--color-grey-300);
  --color-bg-base: var(--color-white);
  --color-bg-subtle: var(--color-off-white);
  --color-bg-dark: var(--color-navy-900);
  --color-bg-footer: var(--color-navy-800);
  --color-border-default: var(--color-grey-300);
  --color-border-strong: var(--color-navy-700);
  --color-cta-phone: var(--color-amber-500);
  --color-cta-phone-hover: var(--color-amber-400);
  --color-cta-whatsapp: var(--color-whatsapp);
  --color-cta-whatsapp-hover: var(--color-whatsapp-dark);
  --color-link: var(--color-navy-800);
  --color-link-hover: var(--color-navy-700);

  /* --- Semantic: Spacing --- */
  --spacing-section-y-mobile: var(--space-16);
  --spacing-section-y-desktop: var(--space-20);
  --spacing-container-x: var(--space-6);
  --spacing-stack-base: var(--space-4);
  --spacing-stack-loose: var(--space-8);

  /* --- Semantic: Layout --- */
  --container-max-mobile: 100%;
  --container-max-tablet: 720px;
  --container-max-desktop: 1200px;
  --container-max-wide: 1360px;


  /* ============================================================
     COMPONENT LAYER — element-scoped tokens
     Naming: --{component}-{property}
     Must reference semantic layer, not primitives.
     ============================================================ */

  /* --- Component: Navigation --- */
  --nav-height-mobile: 64px;
  --nav-height-desktop: 72px;
  --nav-bg: var(--color-bg-base);
  --nav-border: var(--color-border-default);

  /* --- Component: StickyBar --- */
  --sticky-bar-height: 56px;
  --sticky-bar-bg: var(--color-bg-footer);
  --sticky-bar-border: var(--color-border-strong);

  /* --- Component: Button (Phone CTA) --- */
  --btn-phone-bg: var(--color-cta-phone);
  --btn-phone-bg-hover: var(--color-cta-phone-hover);
  --btn-phone-text: var(--color-text-primary);

  /* --- Component: Button (WhatsApp CTA) --- */
  --btn-whatsapp-bg: var(--color-cta-whatsapp);
  --btn-whatsapp-bg-hover: var(--color-cta-whatsapp-hover);
  --btn-whatsapp-text: var(--color-text-inverse);

  /* --- Component: Card --- */
  --card-padding: var(--space-6);
  --card-border: var(--color-border-default);
  --card-radius: 0.5rem;

  /* --- Component: Section (Dark Emphasis) --- */
  --section-dark-bg: var(--color-bg-dark);
  --section-dark-text: var(--color-text-inverse);

  /* --- Component: Footer --- */
  --footer-bg: var(--color-bg-footer);
  --footer-text: var(--color-text-inverse);
  --footer-link: var(--color-navy-100);

  /* --- Component: Prose (body copy container) --- */
  --prose-max-width: 70ch;
  --prose-text: var(--color-text-primary);
  --prose-text-secondary: var(--color-text-secondary);
  --prose-line-height: 1.7;

}
```

---

## 3. `tailwind.config.ts` Extension Pattern

Tailwind theme is extended (not replaced) to add tokens. The `var()` references in the config mean that any change to `tokens.css` automatically propagates to all Tailwind utility classes.

```typescript
// tailwind.config.ts (structure only — not implementation)
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Semantic colour references only — no raw hex in this file
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-inverse': 'var(--color-text-inverse)',
        'bg-base': 'var(--color-bg-base)',
        'bg-subtle': 'var(--color-bg-subtle)',
        'bg-dark': 'var(--color-bg-dark)',
        'bg-footer': 'var(--color-bg-footer)',
        'border-default': 'var(--color-border-default)',
        'border-strong': 'var(--color-border-strong)',
        'cta-phone': 'var(--color-cta-phone)',
        'cta-whatsapp': 'var(--color-cta-whatsapp)',
        'link': 'var(--color-link)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        serif: ['var(--font-serif)'],
      },
      fontSize: {
        'legal-small': ['var(--text-xs)', { lineHeight: '1.5' }],
        'caption': ['var(--text-sm)', { lineHeight: '1.5' }],
        'base': ['var(--text-base)', { lineHeight: '1.7' }],
        'lead': ['var(--text-lg)', { lineHeight: '1.7' }],
        'sub': ['var(--text-xl)', { lineHeight: '1.4', fontWeight: '600' }],
        'h3': ['var(--text-2xl)', { lineHeight: '1.3', fontWeight: '600' }],
        'h2': ['var(--text-3xl)', { lineHeight: '1.25', fontWeight: '700' }],
        'h1-mobile': ['var(--text-4xl)', { lineHeight: '1.15', fontWeight: '700' }],
        'h1-desktop': ['var(--text-5xl)', { lineHeight: '1.1', fontWeight: '700' }],
        'display': ['var(--text-display)', { lineHeight: '1.05', fontWeight: '700' }],
      },
      spacing: {
        'section-y': 'var(--spacing-section-y-mobile)',
        'container-x': 'var(--spacing-container-x)',
        'sticky-bar': 'var(--sticky-bar-height)',
        'nav': 'var(--nav-height-mobile)',
      },
      maxWidth: {
        'prose': 'var(--prose-max-width)',
        'container': 'var(--container-max-desktop)',
      },
      transitionDuration: {
        'fast': 'var(--duration-fast)',
        'base': 'var(--duration-base)',
        'slow': 'var(--duration-slow)',
      },
    },
  },
  plugins: [],
}

export default config
```

---

## 4. Tokens Required Before Any Component Is Built

The following tokens must be defined in `tokens.css` before any component file is created. This is the minimum viable token set for Phase 2:

**Colour (semantic layer minimum):**
- `--color-text-primary`
- `--color-text-inverse`
- `--color-bg-base`
- `--color-bg-dark`
- `--color-bg-footer`
- `--color-cta-phone`
- `--color-cta-whatsapp`
- `--color-border-default`

**Layout:**
- `--nav-height-mobile`
- `--sticky-bar-height`

**Typography:**
- `--font-sans`
- `--font-serif`
- `--text-base` through `--text-4xl` minimum

**Motion:**
- `--duration-base`
- `--ease-default`

Complete primitive and component layers follow — but above is the minimum needed before the first component render.

---

## 5. Convention Enforcement

| Rule | Enforcement method |
|------|--------------------|
| No raw hex in JSX | ESLint rule: `no-restricted-syntax` matching hex pattern in className strings |
| No inline styles | ESLint rule: `react/forbid-component-props` for `style` prop (exceptions for GSAP-managed transforms only) |
| No raw values in tokens.css component layer | Code review: component tokens must reference semantic vars, not primitives |
| Font loading | `next/font/google` only — no `@import` in CSS, no Google Fonts `<link>` in `<head>` |

The ESLint rules are defined in the scaffold phase (Phase 1). See `13-nextjs-scaffold-spec.md`.

---

## 6. Dark Mode

Dark mode is not in scope for this build. The site uses a light base with 1–2 surgical dark emphasis sections — this is a design decision, not a theme toggle. Do not add `dark:` variants in Tailwind classes. If dark mode is requested in future, the semantic colour layer makes it implementable with a `[data-theme="dark"]` CSS override block in `tokens.css` without touching any component.
