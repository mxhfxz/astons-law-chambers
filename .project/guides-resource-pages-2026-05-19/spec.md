# Spec — Guides / resource pages

**Date:** 2026-05-19
**Branch:** `guides-resource-pages-2026-05-19`
**Phase:** implement

## Overview

Publish the two client-supplied arrest/interview guides as full HTML article
pages **and** as downloadable PDFs, then wire them into the site so they pull
organic traffic and route that traffic to the call/WhatsApp KPI paths.

Source documents (client-authored, repo root, untracked):
- `What to do in the first 24 hours after being arrested in the UK.pdf`
- `Do I need a lawyer at a voluntary police interview under caution.pdf`

The user has explicitly directed these be implemented (not just evaluated).
Handoff §5 already recommended HTML articles over PDF-only for SEO/AEO.

## Decisions (user-confirmed 2026-05-19)

1. **URL structure:** `/guides/[slug]` with a `/guides` hub page.
   - `/guides/first-24-hours-after-arrest`
   - `/guides/do-i-need-a-lawyer-at-a-voluntary-police-interview`
2. **Homepage cards:** the two RESOURCE SLOTs link to the **article page**
   (which carries inline call/WhatsApp CTAs). The PDF download lives on the
   article page as a secondary action — not a card-direct file download.

## Must have

- Two article pages at `/guides/[slug]`, statically generated.
- A `/guides` hub page listing both articles.
- Both PDFs served from `public/resources/` (clean kebab-case filenames).
- Each article page: dark text-led hero (police-station.html pattern),
  full article body, inline call + WhatsApp CTAs, sticky aside with the
  emergency call card, "Download as PDF" action, byline + "Last reviewed".
- Per-page metadata: keyword-led `<title>` (50–60 chars), meta description,
  canonical.
- Per-page JSON-LD: `Article` + `FAQPage` + `BreadcrumbList`. Hub page:
  `BreadcrumbList` (+ `CollectionPage`).
- Wiring:
  - `content/sections/home.html` — uncomment + repoint the two RESOURCE
    SLOTs to the article pages.
  - `content/chrome/footer.html` — add a Guides link.
  - `content/sections/police-station.html` — add both guides to the
    "Related areas" aside.
  - `app/sitemap.ts` — add the hub + both articles.
  - Cross-links: each guide links to the other guide + to
    `/police-station-representation`.
- All classes restricted to the proven vocabulary of `police-station.html`
  + `home.html` (precompiled-CSS trap). No raw `<table>`.

## Should have

- Article copy kept faithful to the client PDFs (no rewrite). Drop the
  `[Designer: insert image]` placeholders — no images per project rules.

## Won't have

- No header mega-menu entry (mega menu = "Defence work" only; guides are
  advice content — deliberately out of scope).
- No `<table>` styling, no hero images, no new CSS classes.
- No `aggregateRating`, no email capture, no contact form.
- No edit to the source PDFs' internal copy (client may append CTA text;
  not a blocker).

## Acceptance criteria

- `/guides`, `/guides/first-24-hours-after-arrest`,
  `/guides/do-i-need-a-lawyer-at-a-voluntary-police-interview` all resolve
  and render correctly (mobile + desktop browser check).
- Both PDFs download from their `/resources/` URLs.
- Homepage situation cards 1 & 2 show the resource link → article page.
- `npm run build` (25/25 static pages), `type-check`, `lint` all clean.
- JSON-LD validates as Article + FAQPage + BreadcrumbList.
- Sitemap includes all three new routes.
- Nothing merged to `main` until verified in a real browser.
