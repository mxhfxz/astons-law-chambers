# Findings — Pages CMS for client-authored Insights articles

**Date:** 2026-05-22
**Phase:** Specify / research (project-mgmt)
**Author:** Claude Code session

---

## 1. How Pages CMS works (verified 2026-05-22)

Pages CMS (pagescms.org) is an **open-source, git-based** content editor. There is no
database and no runtime CMS. The editorial flow:

1. A `.pages.yml` config file at the repo root declares content collections, fields, and
   media folders.
2. The client signs in at `app.pagescms.org` with GitHub, with the Pages CMS GitHub App
   installed on the repo (the user did this — "connected Pages CMS to the git repo").
3. The client edits in a web UI. On **Save**, Pages CMS writes a **commit** to the GitHub
   repo — a markdown file with YAML frontmatter plus a markdown body.
4. The static site rebuilds from those files at build time.

Key consequence: **Pages CMS produces flat files in git.** Nothing about it is server-side
or dynamic. This is why it reconciles with the project's "static, data in files" model
(see §4).

### Config surface that matters here

- `.pages.yml` is read **per repository and per branch** — this is the mechanism that lets
  us point editors at a non-production branch (the review gate, §3).
- A **collection** content type is declared with: `name`, `type: collection`, `path`
  (folder), `filename` (template, e.g. `{fields.slug}.md` or
  `{year}-{month}-{day}-{primary}.md`), `format: yaml-frontmatter`, a `view` block (list
  columns + sort), and a `fields` array.
- Field types available: `string`, `text`, `number`, `boolean`, `date`, `uuid`, `object`,
  `block`, `image`, `file`, `select`, `reference`, `code`, **`rich-text`** (the markdown
  body editor).
- `media` is declared with `input` (where uploaded files are stored in the repo, e.g.
  `public/insights`) and `output` (the URL path written into content, e.g. `/insights`).

> Exact YAML key spellings for `filename` templates, the `format` value, and any
> branch-locking setting must be confirmed against the live docs during implementation
> (`/docs/configuration/content/`, `/docs/configuration/media/`). The approach below does
> not depend on the exact spelling — only on capabilities confirmed above.

Sources:
- https://pagescms.org/docs/configuration/
- https://pagescms.org/docs/configuration/content/
- https://pagescms.org/docs/

---

## 2. Current codebase architecture (what we build into)

The site is **live on astonslaw.com** (Next.js 14 App Router, statically generated, 28
pages). It is NOT in a planning phase.

### The existing "guides" pattern (closest analog to a blog)

Articles already exist as **hand-authored HTML**, not markdown:

| Layer | File | Role |
|---|---|---|
| Metadata + routing + FAQ data | `lib/guides.ts` | TS array of `Guide` objects |
| Body markup | `content/sections/guide-*.html` | Hand-written HTML fragment |
| Render + JSON-LD | `lib/render-guide.ts` | Injects FAQ, emits Article/FAQPage/Breadcrumb |
| Route | `app/guides/[slug]/page.tsx` | `generateStaticParams` from the TS array; `dynamicParams = false`; `dangerouslySetInnerHTML` |

A barrister cannot hand-author HTML fragments. The Insights pipeline replaces the
hand-maintained TS array + HTML fragment with **markdown files the CMS writes**, read at
build time. The route/JSON-LD shape mirrors guides exactly.

### Constraints carried from prior sessions (load-bearing)

- **Tailwind scans only `app/**` and `components/**`, never `content/*.html`.** Arbitrary
  utility classes used only in content silently produce no CSS (the documented
  `border-l-2` / `border-navy-950` invisible-border bug). **Therefore CMS-authored content
  must not depend on Tailwind utilities** — it needs a real, hand-authored `.prose` CSS
  layer keyed to the existing design tokens. This is the single most important technical
  constraint and it dictates the rendering choice in §3.
- `app/preview-tailwind.css` is a precompiled static stylesheet — do not rely on it picking
  up new classes.
- WCAG-AA is required: body prose uses `text-navy-700`, not grey. The `.prose` layer must
  meet AA against its background.
- No raw hex anywhere — the `.prose` layer references tokens (`var(--color-navy-700)` etc.).
- Anti-tracker safety baseline: no third-party scripts/pixels may enter the site. Markdown
  rendering **must sanitize** so a pasted `<script>`/`<iframe>` cannot inject a tracker.
- No portrait/headshot images, ever — applies to CMS image uploads too (review-gate check +
  field-label warning).
- Fonts self-hosted (IBM Plex Sans); no Google Fonts; performance budget is tight, so the
  markdown pipeline runs **at build time only**, shipping zero extra client JS.

---

## 3. Decisions locked this session (2026-05-22)

| # | Decision | Choice | Rationale |
|---|---|---|---|
| D1 | URL / IA namespace | **`/insights`** (separate from `/guides`) | Practice-appropriate, evergreen tone; keeps structured guides distinct from editorial articles. "/news" rejected — implies a freshness cadence a sole practitioner won't sustain. One-token change if the client prefers another word. |
| D2 | Publish governance | **Draft branch + review gate** | Pages CMS points at a non-production branch (`content-staging`). Client Save → Vercel preview → BSB/voice review → merge to main. Honours the "nothing reaches main unreviewed" hard rule. Nothing auto-publishes to a regulated live site. |
| D3 | Rendering pipeline | **Constrained markdown → sanitized HTML inside a hand-authored `.prose` CSS layer** | Safe for a non-technical author; sidesteps the Tailwind-scan trap (no arbitrary classes); sanitisation blocks tracker/script injection. MDX-with-components rejected — lets a non-dev break build/layout and re-opens the silent-class trap. |
| D4 | Author byline | **"Ghulam Humayun" (visible)** | User-directed. Adds E-E-A-T authorship. Schema `author` already points to `#principal`, so it is consistent. **DEPARTURE** — see §5. |

---

## 4. Reconciliation with locked project rules

**CLAUDE.md: "No CMS of any kind / no server-side dynamic content."** That rule targets
runtime CMSs with databases (Sanity is named). Pages CMS is git-based: it commits flat
markdown to the repo and the site stays statically generated. No database, no runtime
fetch, no server-side rendering of CMS data. The static-files-in-repo model is preserved —
the only change is *who writes the files* (the client via a UI, instead of a developer in
TS). Recorded as a callout departure, directed by the user.

---

## 5. Departures from locked rules (callout per feedback_callout_departures)

1. **Pages CMS vs "no CMS."** Reconciled as git-based/static (§4). Directed by user.
2. **Named "Ghulam Humayun" byline vs entity-first / minimise-name rule.** Directed by user
   (D4). Note this also touches the **practitioner-safety baseline** — a visible recurring
   byline is a larger name surface than the current entity-first copy. His name is already
   public (BSB register, authorship line), so this is an exposure *increase in degree*, not
   a new disclosure. Flagged for the safety re-sweep log, not blocking.

---

## 6. Open items needing a user decision (carried into the plan)

- **Nav placement.** Header nav, footer, or both? Lean: footer link first (lower-commitment),
  promote to header if cadence justifies it. — user decision.
- **Hero/inline images.** Whether articles use images at all. If yes, `next/image` vs plain
  lazy `<img>` with explicit dimensions (perf budget). Confirm the no-portrait constraint is
  understood by the client. — user decision + implementation detail.
- **Final namespace word** (`/insights` assumed). — confirmable.
- **Dependencies added** (`gray-matter`, `unified`/`remark`/`rehype` chain) trigger an
  `npm audit` re-evaluation per `.project/security-notes.md`. — implementation gate.
