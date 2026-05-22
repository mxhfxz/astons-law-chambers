# Spec — Client-authored Insights (Pages CMS frontend)

**Date:** 2026-05-22
**Status:** Awaiting user approval to proceed to implementation
**Companion docs:** `findings.md` (research + decisions), `plan.md` (steps),
`airtight-design.md` (threat model + 12 hardening controls)

## Locked refinements (2026-05-22)

- **Nav = both.** Insights links in the header and the footer (and the mobile menu).
- **Images = optional + client-controlled.** Every layout renders cleanly with zero images;
  uploaded images are untrusted and hardened at build (dimensions injected, recompressed, SVG
  blocked, no portraits). See `airtight-design.md` §4.
- **Airtight mandate.** The client cannot break the site, the build, or the layout by any
  input. Worst case for a bad article: it doesn't render — never that the site breaks.

---

## Goal

Give the client (Ghulam Humayun) a no-code way to write and publish rich long-form
articles to astonslaw.com, using the Pages CMS GitHub App already connected to the repo,
without a developer in the loop for routine posts — and without anything reaching the live
regulated site unreviewed.

## Why

The site is static with content in repo files. The client currently cannot add content
without a developer hand-authoring HTML fragments (the `/guides` pattern). Pages CMS lets
the client write markdown in a UI; the static site rebuilds from the committed files.

## In scope

1. A Pages CMS `.pages.yml` config defining an **Insights** collection (markdown +
   frontmatter) and a media folder for images.
2. A build-time data layer that reads the Insights markdown files, parses frontmatter,
   filters drafts, and exposes a typed list + per-slug lookup.
3. A render layer converting the markdown body to **sanitized** HTML inside a hand-authored
   `.prose` CSS layer keyed to design tokens; plus Article + BreadcrumbList JSON-LD.
4. Routes: `/insights` (index) and `/insights/[slug]` (article), statically generated,
   `dynamicParams = false`.
5. A publishing governance flow: CMS commits to `content-staging`, Vercel preview, review,
   merge to main.
6. Sitemap + one seed article + verification (build, type-check, real-browser).

## Out of scope (explicit)

- Contact forms, email capture, comments, newsletter — forbidden by project rules.
- Third-party analytics/marketing scripts in content.
- MDX / embedded React components in articles.
- Tags/categories/pagination — defer until article volume justifies (note in plan as a
  future extension, not built now).
- Migrating the two existing `/guides` to the CMS — `/guides` stays as-is; Insights is
  additive.

## Requirements

### Functional

- FR1 — Client can create, edit, and save an article in the Pages CMS UI: headline, URL
  slug, SEO title, SEO description, summary, author, date published, date modified, optional
  hero image, draft flag, and a rich-text body.
- FR2 — Saving commits a markdown file to `content/insights/` on `content-staging`, not main.
- FR3 — `draft: true` articles never render in a production build, even if merged.
- FR4 — `/insights` lists published articles (newest first) with summary cards.
- FR5 — `/insights/[slug]` renders the article body, byline ("Ghulam Humayun"), and dates.
- FR6 — Unknown slugs resolve to the existing 404 (`dynamicParams = false`).

### Non-functional / guardrails

- NFR1 — Markdown rendering is **build-time only**; zero added client-side JS.
- NFR2 — Rendered body HTML is **sanitized** (no `<script>`, `<iframe>`, event handlers, or
  arbitrary embeds) — protects the anti-tracker safety baseline.
- NFR3 — Body styling uses a hand-authored `.prose` layer referencing existing tokens. No
  Tailwind utilities relied on inside content. No raw hex.
- NFR4 — Body text meets WCAG-AA contrast (navy-700 on white/offwhite).
- NFR5 — No portrait/headshot images permitted (field-label warning + review-gate check).
- NFR6 — Article JSON-LD: `author → #principal`, `publisher → #organization`, valid in Rich
  Results Test before any merge to main.
- NFR7 — Nothing merges to main without build + type-check + real-browser check passing, and
  a BSB/voice review of the article copy.

## Definition of done

- `.pages.yml` validated in the Pages CMS UI; the client can open the Insights collection
  and create a post against `content-staging`.
- A seed article renders correctly at `/insights/<slug>` on the Vercel preview for
  `content-staging` (mobile 375×667 + desktop 1440 screenshots).
- `/insights` index lists it; draft articles are absent from the build.
- `npm run build`, `npm run type-check`, `npm run lint` all clean; `sitemap.ts` includes the
  index and the article; JSON-LD passes Rich Results Test.
- `npm audit` re-evaluated for the new dependencies and logged in `security-notes.md`.
- The governance flow is documented for the client (one short page: how to write, save,
  preview, and request publish).
