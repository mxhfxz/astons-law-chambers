# Session Handoff — 2026-05-25 (full-bleed 50/50 hero split)

## Production state

**`main`** → `37c860b` (live on astonslaw.com via Vercel — unchanged this session)
**`hero-two-column`** → `90b6ad4` (pushed, Vercel preview live)

Build: clean (`npm run build` passed, 87.4 kB First Load JS, all 15+ static pages).

---

## What happened this session

### Task: true 50/50 full-bleed hero split on every page

The previous session had committed a first-pass two-column hero layout (`20232f1`) using an intermediate `lg:grid-cols-[1.3fr_1fr]` approach inside a `max-w-wide` container. The user directed a second pass: true 50/50 split, image covering the entire right half, applied to every page.

**Two-pass summary:**

| Pass | What changed | Commit |
|------|-------------|--------|
| First pass | Added two-column grid to all heroes (constrained by max-w-wide container) | `20232f1` |
| Second pass | Full-bleed CSS system + all pages migrated | `90b6ad4` |

**Second-pass files changed:**

| File | Change |
|------|--------|
| `app/preview-styles.css` | New `.hero-split` / `.hero-split-left` / `.hero-split-right` CSS system appended |
| `content/sections/home.html` | Migrated to `hero-split` with `<img>` covering right half |
| `content/sections/about.html` | Migrated to `hero-split` with `hero-right-mark` (decorative SVG) on right |
| `content/sections/contact.html` | Same |
| `content/sections/direct-access.html` | Same |
| `content/sections/fees.html` | Same |
| `content/sections/practice-areas.html` | Same |
| `content/sections/police-station.html` | Same |
| `content/sections/guides-index.html` | Same |
| `content/sections/guide-first-24-hours.html` | Same |
| `content/sections/guide-voluntary-interview.html` | Same |
| `content/sections/pa-detail.html` | Migrated; fee strip moved below the split into its own `max-w-wide` wrapper |

---

## CSS system (second pass)

In `app/preview-styles.css`, appended at the bottom:

```css
/* ── Full-bleed 50/50 hero split ── */
.hero-split {
  display: grid;
  grid-template-columns: 1fr;
}
.hero-split-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3.5rem 1.5rem 3rem;
}
.hero-split-right {
  position: relative;
  overflow: hidden;
  background-color: var(--color-navy-900);
  min-height: clamp(240px, 45vw, 480px);
}
@media (min-width: 768px) {
  .hero-split-left { padding: 5rem 3rem 4rem; }
  .hero-split-right { min-height: clamp(300px, 40vw, 540px); }
}
@media (min-width: 1024px) {
  .hero-split {
    grid-template-columns: 1fr 1fr;
    min-height: clamp(540px, 82vh, 900px);
  }
  .hero-split-left {
    padding-top: 5rem;
    padding-bottom: 5rem;
    padding-left: clamp(1.5rem, calc((100vw - 1360px) / 2 + 1.5rem), 8rem);
    padding-right: 4rem;
  }
  .hero-split-right { min-height: 0; }
}
.hero-right-mark {
  display: none;
  background: linear-gradient(150deg, var(--color-navy-900) 0%, var(--color-navy-950) 100%);
  align-items: center;
  justify-content: center;
}
.hero-right-mark > svg {
  width: 14rem;
  height: 14rem;
  opacity: 0.07;
  fill: #ffffff;
}
@media (min-width: 1024px) {
  .hero-right-mark { display: flex; }
}
```

Key architectural decision: `lg:grid-cols-2` is NOT in the precompiled Tailwind bundle (`app/preview-tailwind.css`). The CSS must live in `preview-styles.css` using semantic class names.

---

## Homepage hero structure (reference)

```html
<div class="bg-footer hero-split">
  <div class="hero-split-left">
    <div class="flex flex-col max-w-2xl">
      [eyebrow, h1, lead, CTAs, BSB link]
    </div>
  </div>
  <div class="hero-split-right">
    <img src="/hero_image.webp" alt="" width="720" height="656"
         fetchpriority="high"
         class="absolute inset-0 w-full h-full object-cover object-center" />
  </div>
</div>
```

## Secondary page hero structure (reference)

```html
<div class="bg-footer text-white hero-split">
  <div class="hero-split-left">
    [breadcrumb, eyebrow, h1, lead, buttons]
  </div>
  <div class="hero-split-right hero-right-mark" aria-hidden="true">
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 1H32V17C23.1634 17 16 9.83656 16 1Z"/>
      <path d="M31.9984 17C31.9993 17 32 17.0007 32 17.0016L32 33L16.0016 33C16.0007 33 16 32.9993 16 32.9984C16 24.1627 23.1627 17 31.9984 17Z"/>
      <path d="M16 33L9.53674e-07 33L2.35244e-06 17C8.83656 17 16 24.1634 16 33Z"/>
      <path d="M0 17L-6.99382e-07 1L16 1C16 9.83656 8.83656 17 0 17Z"/>
    </svg>
  </div>
</div>
```

## pa-detail structure (reference — fee strip below split)

```html
<article class="bg-white">
  <div class="bg-footer text-white">
    <div class="hero-split">
      <div class="hero-split-left">
        [breadcrumb, h1, definition, situation, CTAs, police banner]
      </div>
      <div class="hero-split-right hero-right-mark" aria-hidden="true">
        [SVG]
      </div>
    </div>
    <div class="max-w-wide mx-auto px-6 pb-8">
      <dl class="mt-10 grid grid-cols-2 md:grid-cols-4 ...">[fee items]</dl>
      <p class="mt-3 text-xs text-navy-100/80">Indicative only...</p>
    </div>
  </div>
  [white body]
</article>
```

---

## Branch state

| Branch | Status |
|--------|--------|
| `main` | Live production — NOT touched this session |
| `hero-two-column` | `90b6ad4` pushed, Vercel preview live |

**Preview URL:** `https://alc-staging-git-hero-two-column-dsgnly.vercel.app`

The `hero-two-column` branch has NOT been merged to `main`. User must review the preview and confirm before merge.

---

## Uncommitted change

`CLAUDE.md` shows as modified but the diff is not significant to the build — it is likely a whitespace or metadata drift. Do NOT commit it without checking the diff first (`git diff CLAUDE.md`).

---

## Open items for next session

1. **Review the preview** — open `https://alc-staging-git-hero-two-column-dsgnly.vercel.app` and check all pages at desktop + mobile.
2. **Merge `hero-two-column` → `main`** once the user confirms the preview looks right.
3. **User may want the right-half content on secondary pages to change** — currently it shows the decorative SVG mark. If the user wants images on specific pages, those will need assets added to `public/` and the HTML updated.
4. **Any other in-flight work** — check the previous handoff (2026-05-24) for items that were deferred.

---

## Previous session context (2026-05-24)

Prior production state carried forward:
- SEO fix: "barrister" removed from meta titles/descriptions (`1c3b614`)
- UI fix: H1 and lead copy restored on about, contact, direct-access, practice-areas (`b8be8f3`)
- UI alignment sprint: dark heroes + closing strips on all pages (`37c860b`)
- CookieYes removed, call tracking baseline established

Prior open items (still relevant):
- Phone click events are the primary Week 1 KPI measurement
- FAQPage schema needs re-evaluation post-April 2026 update
- Entity footprint at 2 sources (AI threshold is 3+) — direct access cluster is fastest near-term ranking path
