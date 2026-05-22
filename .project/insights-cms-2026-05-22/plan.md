# Plan — Insights via Pages CMS

**Date:** 2026-05-22
**Status:** Draft for approval. Do not start coding until the user approves.
**Read first:** `spec.md`, `findings.md`, **`airtight-design.md`** (threat model + the 12
hardening controls — every phase below references it). Mirrors the existing `/guides` pipeline.

Branch for the build work: `feat/insights-cms-2026-05-22` (developer branch, separate from
the editorial `content-staging` branch created in Phase E).

Skills routing for each phase: `frontend-design` + `frontend-dev-guidelines` (prose layer,
routes), `nextjs-best-practices` (static generation), `schema-markup` + `seo-audit`
(JSON-LD, sitemap), `legal-advisor` (BSB review gate), `vercel-deployment` (preview branch),
`verification-before-completion` (every "passes" claim).

---

## Phase A — Foundations

**A1. Add build-time dependencies.** Markdown → sanitized HTML chain + image hardening (all
run at build, ship no client JS — airtight-design §0, §12):
- `gray-matter` (frontmatter parse)
- `unified`, `remark-parse`, `remark-gfm`, `remark-rehype`, `rehype-sanitize`,
  `rehype-stringify`
- `image-size` (intrinsic dimensions → CLS prevention), `sharp` (build-time recompression)
Then re-run `npm audit`; record outcome in `.project/security-notes.md` (NFR + DoD).

**A2. Create the content directory.** `content/insights/` with a `.gitkeep` and a single
seed markdown file (used end-to-end in Phase F).

**A3. Hand-author the `.prose` CSS layer (airtight-design §9).** New `styles/prose.css`
(imported by `styles/globals.css`), element selectors scoped under `.prose` for `h2 h3 h4 p
ul ol li blockquote a strong em code pre img hr`, all keyed to design tokens
(`var(--color-navy-700)` body, navy-950 headings). Meets WCAG-AA (NFR4); measure ~68ch; links
underlined + `:focus-visible` ring. No Tailwind utilities, no raw hex (NFR3). The body HTML
carries no classes at all (sanitiser strips them), so the content-scan trap cannot apply.
- *Verify:* the layer renders independent of Tailwind's content scan (the documented trap).

**Gate A:** `npm run build` + `type-check` clean with deps added; prose layer present.

---

## Phase B — Data layer

**B1. `lib/insights.ts` (airtight-design §5, §6, §7).** Define an `Insight` interface (strict
TS, explicit return types, no `any`). Read `content/insights/*.md` at build (`fs.readdirSync`),
parse with `gray-matter`, **validate** (required fields; ISO date; slug `^[a-z0-9-]+$` +
unique), **filter out `draft: true`** (FR3), sort by `datePublished` desc. **Fail-safe:** an
entry that fails validation or parse is **excluded + logged, never thrown** — one bad article
cannot break the production build (T6). Apply graceful fallbacks (metaTitle→title,
description→body excerpt, dateModified→datePublished). Export `insights` + `getInsight(slug)`.

**B2. `lib/render-insight.ts` (airtight-design §2, §3, §4).** Markdown body → HTML via
`remark-parse → remark-gfm → remark-rehype(allowDangerousHtml:false) → rehype-sanitize(SCHEMA)
→ rehype-stringify`. SCHEMA = explicit allowlist (§2): no `h1`/`script`/`style`/`iframe`/`on*`/
`class`; `a` protocols restricted + `rel=noopener noreferrer`; `img` `src`+`alt` only.
**Heading-normalisation rehype pass** (airtight-design §3) runs before sanitise: strip body H1,
re-flow remaining headings into a gap-free H2→H4 outline regardless of what the client pasted —
the client never reasons about semantics. **Inject `width`/
`height`/`loading`/`decoding`** on every `<img>` from `image-size` (T3, CLS). Wrap in
`<div class="prose">`. Emit Article + BreadcrumbList JSON-LD: `author → ${BASE}/#principal`,
`publisher → ${BASE}/#organization`, `image` only when a hero exists, `inLanguage: en-GB`.
Add `renderInsightsIndex()` for hub cards. Mirrors `lib/render-guide.ts`.

**B3. Image build step (airtight-design §4).** Recompress/downscale uploaded images via
`sharp` (max width, re-encode) so a multi-MB upload can't wreck LCP; warn above a size
threshold. Hero `eager`/`fetchpriority=high`, inline `lazy`.

**Gate B:** sanitiser proof — a sample body containing `<script>`, an `onclick`, an `<iframe>`,
a `# H1`, and a `class="..."` renders with all of them stripped/demoted; a missing-field and a
malformed file are both excluded without failing the build; build + type-check clean.

---

## Phase C — Routes

**C1. `app/insights/page.tsx`** — index. `generateMetadata`, BreadcrumbList JSON-LD,
renders the cards from `renderInsightsIndex()`. Mirrors `app/guides/page.tsx`.

**C2. `app/insights/[slug]/page.tsx`** — detail. `generateStaticParams` from `insights`,
`dynamicParams = false` (FR6), `generateMetadata` from frontmatter, Article JSON-LD +
sanitized body + visible byline "Ghulam Humayun" (D4) + dates. Mirrors
`app/guides/[slug]/page.tsx`.

**Gate C:** `/insights` and `/insights/<seed-slug>` build as static pages; unknown slug 404s.

---

## Phase D — Pages CMS config

**D1. `.pages.yml` at repo root.** Confirm exact key spellings against
`pagescms.org/docs/configuration/content/` and `/media/` first (findings §1 caveat), then:
- `media`: `input: public/insights`, `output: /insights`, extensions `jpg jpeg png webp`
  only — **SVG excluded** (script vector; airtight-design §4).
- `content` collection `insights`: `type: collection`, `path: content/insights`,
  `filename: '{fields.slug}.md'`, `format: yaml-frontmatter`, a `view` (columns: title,
  datePublished, draft; sort by datePublished), and `fields`:
  title (string, required), slug (string, required, slug pattern), metaTitle (string),
  metaDescription (text), description (text, required), author (select, default "Ghulam
  Humayun"), datePublished (date, required), dateModified (date), heroImage (image, label
  warns "no portraits/headshots" — NFR5), draft (boolean, default true — FR3), body
  (**rich-text, `format: markdown`, WYSIWYG**, inline `media` → `public/insights`, extensions
  `jpg jpeg png webp`, `rename: safe`). The client uses the visual editor / pastes from a doc;
  markdown-on-disk is the clean artifact our build normalises (airtight-design §3).

**Gate D:** open the repo in app.pagescms.org; the Insights collection loads and a test post
form renders with all fields.

---

## Phase E — Governance / review gate

**E1. Create `content-staging` branch** from main; push so Vercel produces its preview URL
(`alc-staging-git-content-staging-…vercel.app` per the staging-previews memory).
**E2. Point Pages CMS at `content-staging`** (branch selector in the UI; keep `.pages.yml`
on that branch). The client only ever edits `content-staging` (FR2).
**E3. Write the client one-page guide** (`.project/insights-cms-2026-05-22/client-guide.md`
or a repo doc): how to write, save, view the preview, and request publish; the no-portrait
and BSB-compliance reminders.
**E4. Define the publish ritual:** developer/Ghulam reviews the preview for BSB compliance +
voice (`legal-advisor` + `avoid-ai-writing`), confirms build/type-check, then merges
`content-staging` → main (NFR7). Drafts stay flagged until reviewed.

**Gate E:** a test article saved in the CMS appears on the `content-staging` preview, and
does NOT appear on production until merged.

---

## Phase F — Integration & verification

**F1.** Add `/insights` index + each published article to `app/sitemap.ts`.
**F2.** Add the Insights link to **both** header and footer (user, 2026-05-22), plus the
existing mobile menu — touches `content/chrome/header.html`, `content/chrome/footer.html`, and
the mobile-menu markup (airtight-design §10). Verify tap targets ≥44px and keyboard focus.
**F3.** Seed one real sample article (or a placeholder pending the client's first real post)
to exercise the full path.
**F4. Verify (verification-before-completion):**
- `npm run build`, `type-check`, `lint` clean; `rm -rf .next` first since content changed.
- Real-browser screenshots at 375×667 + 1440 of `/insights` and the article (set viewport in
  `playwright_navigate`, not the screenshot args — per the handoff gotcha).
- Article + BreadcrumbList JSON-LD pass the Rich Results Test.
- Confirm draft articles are absent from the build output.

**Gate F (ship):** all of F4 green on the `content-staging` preview; only then merge to main
and poll astonslaw.com until live. Update `SESSION-HANDOFF.md` with the new state.

---

## Risks & mitigations

| Risk | Mitigation |
|---|---|
| Exact `.pages.yml` syntax differs from assumed | Verify against live docs in D1 before writing; approach is syntax-independent |
| Client pastes a tracker/script into body | `rehype-sanitize` strips it at build (NFR2); review gate is the backstop |
| Arbitrary classes silently fail (Tailwind trap) | Constrained markdown + hand-authored `.prose` removes the dependency entirely |
| Portrait image uploaded | Field-label warning + mandatory review-gate check before merge |
| New deps introduce CVEs | `npm audit` re-eval in A1, logged in security-notes.md |
| Auto-publish to a regulated live site | `content-staging` branch + merge gate (Phase E) — nothing reaches main unreviewed |

## Future extensions (not built now)

Tags/categories, an index with pagination, RSS, and migrating `/guides` into the CMS — defer
until article volume justifies them. Recorded so they are not silently dropped.

## Session log

- 2026-05-22 — Spec + plan + findings written. Four decisions locked (findings §3). Awaiting
  user approval before Phase A. No code written yet.
- 2026-05-22 — **BUILT (Phases A–F) on branch `feat/insights-cms-2026-05-22`, uncommitted.**
  Verification evidence: `type-check` exit 0; `lint` clean (only the pre-existing
  `app/layout.tsx:41` themeColor hex warning remains); `build` exit 0, 30 static pages,
  First Load JS unchanged at 87.4 kB (zero client JS added). Routing: `/insights` 200,
  article 200, unknown slug 404 (`dynamicParams=false`). Sitemap includes the index + article.
  **Sanitiser/normaliser proven airtight** against an adversarial fixture: `<script>` content,
  `<iframe>`, `onclick`/`onerror`, `class`/`id`/`style`, and a non-allowlisted `<div>` all
  stripped; body `# H1` → `<h2>`; skipped `####` → `<h3>`; external link got
  `rel="noopener noreferrer"`; internal link preserved; a missing referenced image did NOT
  break the build (fail-safe). Real-browser screenshots verified at desktop 1440 + mobile 375
  for the article and the index (see PNGs in this folder). Article + BreadcrumbList JSON-LD
  parsed valid (`author→#principal`, `publisher→#organization`). Caught + fixed one real bug:
  `.insight-body` CSS was initially placed in the unloaded `styles/globals.css`; moved to the
  active `app/preview-styles.css` (see airtight-design §13). Files: `lib/insights.ts`,
  `lib/render-insight.ts`, `app/insights/page.tsx`, `app/insights/[slug]/page.tsx`,
  `.pages.yml`, `content/insights/first-hearing-magistrates-court.md` (seed), nav edits in
  `content/chrome/header.html` + `footer.html`, `app/sitemap.ts`, `app/preview-styles.css`,
  `package.json`, `security-notes.md`. NOT committed, NOT merged — awaiting user.
  Remaining manual/ops steps: validate `.pages.yml` loads in app.pagescms.org; create
  `content-staging` from main post-merge and point Pages CMS at it; run Google Rich Results
  Test on the live/preview URL.
- 2026-05-22 — Two refinements from user: nav = **both** header + footer; images **optional +
  client-controlled** (layouts must render with zero images). Mandate: "airtight." Invoked the
  full skill set (frontend-design, frontend-dev-guidelines, nextjs-best-practices,
  frontend-security-coder, wcag-audit-patterns, web-performance-optimization, schema-markup,
  seo-audit, legal-advisor, mobile-design, vercel-deployment, avoid-ai-writing) and wrote
  `airtight-design.md` (threat model T1–T8 + 12 hardening controls). Plan B/D/F updated to
  reference it. Still awaiting approval before Phase A.
