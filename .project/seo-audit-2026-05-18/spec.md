# SEO Audit Fix — 2026-05-18

Phase: implement
Branch: fix/seo-audit-2026-05-18

## Why

A full crawl-level SEO audit of the live site (19 routes) surfaced 12 findings.
This session fixes the code-fixable ones. Deploy gate: branch → verify → main.

## In scope (fixing tonight)

| # | Finding | Severity |
|---|---------|----------|
| 1 | `og:url` hardcoded to homepage on every page | High |
| 2 | `/practice-areas` H1 "Defence work" — no keyword, mismatches title | High |
| 3 | Hub page weak inlinks — header "Defence work" is a JS button, not a link | High |
| 4 | `/direct-access` linked only from footer | High |
| 5 | `<html lang="en">` should be `en-GB` | Medium |
| 6 | Sitemap `lastmod` = build timestamp on every URL | Medium |
| 7 | Hero `<img>` missing width/height; misleading next/image comment | Medium |
| 8 | LocalBusiness schema missing `geo` + `image` | Medium |
| 9 | Homepage `<noscript>` ships false "JS required" text | Low |

## Decisions (user-confirmed 2026-05-18)

- #3: "Defence work" becomes a real `<a href="/practice-areas">` that also opens
  the mega menu; add "View all defence work" link inside the mega + mobile menus.
- #8: Add `geo` + `image` only. NOT `openingHours` — only the police-station
  callout is 24/7, the chamber is not; avoid an inaccurate availability claim.
- Deploy: merge to `main` tonight after the full verification gate passes.

## Out of scope (deferred, by decision)

- #10 FAQ rich-results — advisory only, schema already valid.
- #11 Sitemap `priority` ordering — cosmetic, Google ignores it.
- #12 Brand-first homepage title — A/B judgment call, not a defect.
- #8 `openingHours` — needs an accurate availability statement first.

## Validation criteria

- `npm run type-check` clean
- `rm -rf .next && npm run build` clean
- Rendered HTML: `og:url` is per-page; `lang="en-GB"`; hub H1 carries keyword;
  hero `<img>` has width/height; schema has geo + image.
- Real-browser check of `/`, `/practice-areas`, one detail page.
- Rich Results Test passes on the enriched schema.
