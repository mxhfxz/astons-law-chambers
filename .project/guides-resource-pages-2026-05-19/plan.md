# Plan — Guides / resource pages

**Spec:** `./spec.md`  ·  **Phase:** implement  ·  **Branch:** `guides-resource-pages-2026-05-19`

## Approach

Mirror the established practice-area architecture. Each guide is a
hand-written HTML fragment (like `police-station.html`) — the articles have
varied structure (callouts, comparison, FAQ) that no fixed template fits.
A small `lib/guides.ts` holds routing/metadata/FAQ data; `lib/render-guide.ts`
injects the FAQ block and emits JSON-LD; `app/guides/[slug]/page.tsx` is the
dynamic route with `generateStaticParams`. This keeps the visible FAQ and the
FAQPage schema from one source (same `data-bind` pattern as
`render-practice-area.ts`).

Class safety: build only from classes proven in `police-station.html` +
`home.html`. The PDF 1 comparison renders as a bordered `divide-y` list
(fees-`<dl>` pattern), never a `<table>`.

## Steps

### Phase 1: assets + data
- [ ] 1.1: `mv` both PDFs → `public/resources/` with kebab-case names.
- [ ] 1.2: `lib/guides.ts` — `Guide` type + `guides[]` (slug, title,
  metaTitle, metaDescription, section, datePublished, dateModified,
  description, pdf, faqs[]) + `getGuide()`.
  - Files: `lib/guides.ts`
- [ ] 1.3: `lib/render-guide.ts` — `renderGuide()` (FAQ inject) +
  `guideJsonLd()` (Article + FAQPage + BreadcrumbList).
  - Files: `lib/render-guide.ts` ; Depends: 1.2

### Phase 2: page content
- [ ] 2.1: `content/sections/guide-first-24-hours.html` — hero + body +
  aside + `data-bind="faqs"` + PDF download + byline.
- [ ] 2.2: `content/sections/guide-voluntary-interview.html` — same shape;
  comparison rendered as bordered `divide-y` list.
- [ ] 2.3: `content/sections/guides-index.html` — hub: hero + 2-card grid.
- [ ] 2.4: `app/guides/[slug]/page.tsx` — `generateStaticParams`,
  `generateMetadata`, JSON-LD + body. `dynamicParams = false`.
- [ ] 2.5: `app/guides/page.tsx` — hub route + metadata + BreadcrumbList.
  - Depends: 1.2, 1.3, 2.1–2.3

### Phase 3: wiring
- [ ] 3.1: `content/sections/home.html` — uncomment + repoint RESOURCE
  SLOT in situation cards 1 (→ first-24-hours) and 2 (→ voluntary-interview).
- [ ] 3.2: `content/chrome/footer.html` — add Guides link to Practice column.
- [ ] 3.3: `content/sections/police-station.html` — add both guides to the
  "Related areas" aside box.
- [ ] 3.4: `app/sitemap.ts` — add `/guides` + 2 article routes (article
  `<lastmod>` tracks the fragment file; priority 0.7 hub / 0.7 articles).

### Phase 4: verify
- [ ] 4.1: `rm -rf .next` then `npm run build` — expect 25 static pages.
- [ ] 4.2: `npm run type-check` + `npm run lint` — clean.
- [ ] 4.3: Real-browser check (Playwright) — `/guides`, both articles,
  homepage cards; mobile + desktop screenshots; console clean.
- [ ] 4.4: Validate JSON-LD shape; confirm PDFs download.

## Validation criteria

- 3 new routes resolve, render, browser-verified mobile + desktop.
- build / type-check / lint clean; 25/25 pages.
- Homepage cards link to article pages; PDFs download from `/resources/`.
- Stop before merge to `main` — gate the merge with the user.

## Session log

- 2026-05-19: spec + plan written. URL + card decisions confirmed by user.
- 2026-05-19: implemented all 4 phases. PDFs moved to `public/resources/`;
  `lib/guides.ts` + `lib/render-guide.ts` created; 3 HTML fragments written;
  `app/guides/page.tsx` + `app/guides/[slug]/page.tsx` created; home cards,
  footer, police-station aside, sitemap wired.
- 2026-05-19: verified — `build` clean (26/26 static pages, was 23),
  `type-check` clean, `lint` clean (only the pre-existing layout.tsx hex
  warning). Browser check via Playwright at desktop width: `/guides`, both
  article pages, homepage cards all render correctly, no console errors, no
  unstyled elements (precompiled-CSS trap cleared). JSON-LD confirmed
  Article + FAQPage + BreadcrumbList; sitemap has all 3 routes; PDFs serve
  200. Mobile <768px not driven by the Playwright MCP (tool renders ≥768px)
  — layout reuses the proven responsive patterns from police-station.html
  + home.html.
- Pending: user gate before merge to `main`.
