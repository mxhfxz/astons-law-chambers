# Airtight design — Insights frontend

**Date:** 2026-05-22
**Companion to:** `spec.md`, `plan.md`, `findings.md`
**Mandate (user, 2026-05-22):** "The frontend must be super simple, so they can't break the
website. The blog pages need to be designed and developed in an airtight manner."

Synthesised from: frontend-design, frontend-dev-guidelines, nextjs-best-practices,
frontend-security-coder, wcag-audit-patterns, web-performance-optimization, schema-markup,
seo-audit, legal-advisor, mobile-design, vercel-deployment, avoid-ai-writing.

---

## 0. The foundation that makes this airtight

The article pages are **static Server Components, generated at build time, with zero
client-side data fetching and zero added client JS**. Markdown → HTML happens in the build,
never in the browser. There is therefore **no runtime code path that client content can
crash** — a bad article can, at worst, fail to render *itself* at build; it cannot take down
a live page or the rest of the site. Every hardening rule below builds on this.

(Note: frontend-dev-guidelines' Suspense/`useSuspenseQuery`/lazy patterns are deliberately
NOT used — they belong to interactive SPAs. A static page with no fetch is the stronger
posture here. Its transferable rules — strict TS, explicit return types, no `any` — do apply
to `lib/insights.ts` and `lib/render-insight.ts`.)

---

## 1. Threat model — "how could the client break the site?"

| # | Client action | Risk | Mitigation (section) |
|---|---|---|---|
| T1 | Pastes raw HTML with `<script>`/`<iframe>`/`onclick` | XSS, tracker injection (breaks the anti-tracker safety baseline) | §2 allowlist sanitiser |
| T2 | Writes a second `# H1` in the body | Breaks heading hierarchy → SEO + a11y failure | §3 H1 demotion |
| T3 | Uploads a 5 MB or portrait or SVG image | LCP/CLS regression; portrait rule violation; SVG script vector | §4 image pipeline |
| T4 | Leaves required fields blank | Broken/empty page | §5 graceful fallbacks + validation |
| T5 | Types a bad/duplicate URL slug | Route collision, 404, broken link | §6 slug safety |
| T6 | Saves a malformed/unparseable markdown file | Build failure → whole site fails to deploy | §7 fail-safe build |
| T7 | Saves content that auto-publishes unreviewed | Unreviewed content live on a regulated site | §8 governance gate |
| T8 | Uses arbitrary Tailwind/utility classes | Silent layout break (the documented content-scan trap) | §9 prose CSS, no utilities |

---

## 2. Allowlist sanitiser (the core control) — T1

Markdown body is rendered through `unified`: `remark-parse → remark-gfm → remark-rehype
(allowDangerousHtml: false) → rehype-sanitize(SCHEMA) → rehype-stringify`.

`SCHEMA` is an explicit allowlist (deny by default):

- **Allowed elements:** `p h2 h3 h4 ul ol li blockquote strong em a code pre hr img br`.
- **`a`:** `href` only, protocols restricted to `http https mailto tel`; external links get
  `rel="noopener noreferrer"`; no `target` injection, no `on*`.
- **`img`:** `src` (must resolve under the `/insights/` media output path), `alt`; width/height
  injected by the build (§4). Any other attribute stripped.
- **Stripped entirely:** `script style iframe object embed form input svg link meta`, all
  `on*` handlers, `class`, `id`, `style`, `data-*`.

Result: even if the client pastes a tracking pixel or a `<script>`, **only allowlisted,
attribute-scrubbed elements survive into the build output**. This is also the safety-baseline
guarantee — no third-party script can enter the site through content. (frontend-security-coder:
allowlist > denylist; auto-escape; never trust user HTML.)

---

## 3. Heading normalisation — the client never thinks about semantics — T2

**Authoring model (user, 2026-05-22):** the client pastes/writes rich text in the Pages CMS
WYSIWYG editor and **never reasons about H1/H2/semantics**. The build owns all structure.

The page `<h1>` is always the frontmatter `title`, rendered by the route, never by the body.
The renderer then **normalises the entire body heading tree** so the output is always valid,
regardless of what the client did:

1. **Strip/demote any H1 in the body** — there is exactly one H1 (the title), always.
2. **Re-flow the remaining heading levels into a clean, gap-free hierarchy starting at H2.**
   Walk the body headings in order; map the shallowest level the client used to `h2` and each
   deeper level to the next step down, repairing skips. Examples:
   - Client pastes a doc whose top heading is H1 and subheads are H2 → becomes H2 / H3.
   - Client's content starts at H3 with H4 subheads → becomes H2 / H3 (no orphan jump).
   - Client skips H2→H4 → repaired to H2→H3.
3. **Cap depth at H4** — anything deeper collapses to H4 (a barrister article needs no more).

So whatever the editor or a Word/Google-Docs paste produces, the rendered page has exactly one
H1 and a contiguous, correctly-nested H2→H4 outline. The client cannot create a broken outline
because they are not the source of the outline — the normaliser is. (seo-audit: one H1, logical
hierarchy. wcag-audit-patterns: 1.3.1 heading structure, no skipped levels.)

This runs as a rehype pass *before* `rehype-sanitize`, on the HTML tree, so it applies equally
to editor-generated and pasted content.

---

## 4. Image pipeline — client-uploaded, optional, untrusted — T3

Images are **optional and entirely client-controlled** (user, 2026-05-22). Every layout must
render cleanly with zero images. When images exist, the build makes them safe:

- **Upload restriction (Pages CMS media field):** extensions limited to `jpg jpeg png webp`.
  **SVG excluded** — it can carry scripts. No portraits/headshots (field-label warning +
  review-gate check; the no-portrait rule is absolute).
- **Stored** in `public/insights/`, served from `/insights/...`.
- **Build-time dimension injection:** the renderer reads each referenced image's intrinsic
  size (`image-size`, pure-JS, no native deps) and writes explicit `width`/`height` +
  `loading="lazy"` + `decoding="async"` onto every `<img>`. This **prevents CLS regardless of
  what the client uploads** — we never rely on the author knowing dimensions. (web-performance:
  always specify dimensions; reserve space. seo-audit: CLS < 0.1.)
- **No `next/image`, no `sharp` (decided 2026-05-22).** Images render as raw `<img>` (the
  established site pattern — see `content/sections/home.html`). Reason: the locked
  `security-notes.md` rationale dismisses several Next advisories *because* the Image
  Optimization API is "not in the critical path." Introducing `next/image` would activate that
  API and change the security posture. Raw `<img>` + `image-size` keeps the posture intact and
  avoids a native build dependency. Hero image: `loading="eager"`; inline images: `loading="lazy"`.
- **Size guard instead of recompression:** the build warns above a byte-size cap; on the
  `content-staging` preview an oversized image surfaces loudly so the reviewer compresses
  before merge (the review gate is the backstop). Auto-recompression (`sharp`) can be added
  later if article/image volume justifies the native dependency.
- **Alt text:** markdown `![alt](src)` carries it; sanitiser keeps `alt`. If missing, render
  `alt=""` (valid, treated as decorative) and flag on the review checklist. (wcag 1.1.1.)
- **Size warning:** build logs a warning above a size threshold so the reviewer can act before
  merge.

---

## 5. Graceful absence + frontmatter validation — T4

Every optional field has a defined fallback so a sparse article still yields a complete,
valid page:

- `metaTitle` → falls back to `title`
- `metaDescription` / `description` → falls back to first ~155 chars of the sanitised body text
- `dateModified` → falls back to `datePublished`
- `heroImage` absent → layout renders without it (no empty box, no broken `<img>`)

`lib/insights.ts` validates each entry at build: required fields present (`title`,
`datePublished`, `body`), `datePublished` is valid ISO-8601, `slug` matches the pattern (§6).

---

## 6. Slug safety — T5

- CMS filename template `{fields.slug}.md`; the `slug` field carries a pattern `^[a-z0-9-]+$`.
- Build validates pattern + **uniqueness** across the collection.
- Route uses `generateStaticParams` from the parsed files with `dynamicParams = false`, so
  only known-good slugs ever resolve; anything else is the existing 404. No route can be
  conjured by a typo. (Mirrors the locked `/guides` route behaviour.)

---

## 7. Fail-safe build — one bad article can't break the site — T6

Tension resolved deliberately:

- **On the `content-staging` preview** (where review happens): validation problems are
  surfaced **loudly** — a visible notice on the article and a build log entry — so the
  reviewer sees exactly what's wrong before merge.
- **On the production build:** an article that fails validation or fails to parse is
  **excluded and logged**, never thrown. A single malformed file therefore cannot fail the
  `astonslaw.com` deploy. Combined with the review gate, malformed content is caught on
  staging and simply doesn't render; the live site is never at risk.

This is the airtight build contract: **the worst case for a bad article is that the article
itself doesn't appear — never that the site breaks.**

---

## 8. Governance gate — T7

Per `findings.md` D2 and the locked "nothing reaches main unreviewed" rule:

- Pages CMS commits to **`content-staging`**, never `main`.
- Each save → Vercel preview URL (vercel.app previews are auto-`noindex`, so draft content is
  not indexed — verified expectation, re-checked at build).
- **Review checklist before merge** (scaffold; substantive BSB conduct call is Ghulam's):
  BSB compliance, barrister voice (copywriting + avoid-ai-writing), no portrait images, all
  images have alt text, heading order, JSON-LD passes Rich Results Test, build + type-check +
  real-browser screenshots clean.
- `draft: true` is a second control — drafts never render in a production build even if merged.

---

## 9. Styling — prose CSS, never utilities — T8

Hand-authored `.prose` layer (`styles/prose.css`, imported by `globals.css`), element
selectors keyed to existing design tokens. **No Tailwind utilities are relied on inside
content** — this removes the documented silent-class-failure trap entirely, because the body
HTML carries no classes at all (the sanitiser strips them). Body text `var(--color-navy-700)`
on white meets WCAG-AA. Measure capped (~68ch) for readability. Links underlined (not
colour-only), visible `:focus-visible` ring. (frontend-design: refined, restrained,
token-driven — this is an editorial reading surface, not a maximalist showcase. The
distinctive type/voice comes from the article writing, not decoration.)

---

## 10. Accessibility & mobile (WCAG 2.2 AA) — cross-cutting

- Semantic `<article>`, `<time datetime>`, real `<h1>`, ordered headings (§3).
- Card links + nav: tap target ≥ 44px; keyboard-focusable; visible focus.
- `lang="en-GB"` (already site-wide). No colour-only meaning.
- Mobile-first single column at 375px, images `max-width:100%; height:auto`, no horizontal
  scroll. (mobile-design web-transferable rules only.)
- Nav: **both** header and footer (user, 2026-05-22) — plus the existing mobile menu. Touches
  `content/chrome/header.html`, `content/chrome/footer.html`, and the mobile-menu markup,
  within the established static-fragment pattern.

---

## 11. SEO / schema — cross-cutting

- `Article` JSON-LD: `headline`, `datePublished`, `dateModified`, `author → #principal`
  (Ghulam — consistent with the named byline, D4), `publisher → #organization`, and `image`
  **only when a hero exists** (omitted cleanly otherwise). `BreadcrumbList`: Home › Insights ›
  article. Validate in Rich Results Test before any merge.
- Self-referencing canonical per article; `/insights` index + each article added to
  `app/sitemap.ts`.
- `generateMetadata` per route: title (≤60), description (~155), canonical, Open Graph.
- Internal linking: nav (both) + an "More insights" link set, so articles aren't orphaned.

---

## 12. Dependencies this adds (all build-time, zero client JS)

`gray-matter`, `unified`, `remark-parse`, `remark-gfm`, `remark-rehype`, `rehype-raw`,
`rehype-sanitize`, `rehype-stringify`, `unist-util-visit`, `image-size`. **No `sharp`, no
`next/image`** (§4). Installed 2026-05-22; `npm audit` re-eval logged in `security-notes.md` —
**zero new advisories**, the article route stays a zero-JS static page (build confirmed First
Load JS unchanged at 87.4 kB).

## 13. Namespace + isolation facts (verified 2026-05-22)

- **`/blog`, `/news`, `/articles` already 301-redirect to `/`** in `next.config.mjs`. `/insights`
  is the only clear namespace — confirms D1. (Using `/news` later would require removing that
  redirect first.)
- **Active stylesheet is `app/preview-styles.css`, NOT `styles/globals.css`.** Discovered
  during the browser check: nothing imports `styles/globals.css` or `styles/tokens.css` —
  they are vestigial scaffold files. `app/layout.tsx` imports `preview-tailwind.css`
  (precompiled) + `preview-styles.css` (hand-authored, with its own `:root` tokens). Tailwind
  preflight resets headings to `inherit`, so without explicit rules an `<h2>` renders as body
  text. The `.insight-body` rules therefore live in `app/preview-styles.css` and reference
  only the tokens defined there (navy ramp, emergency, whatsapp, offwhite) plus literal values
  matching the file's convention. (Also note: Tailwind JIT does NOT run in this build — no
  imported file carries `@tailwind` directives — so utility classes in JSX must already exist
  in the precompiled bundle. The insights routes reuse the guides markup's classes, which are.)
- **Article body styling is a dedicated `.insight-body` class**, NOT the shared `.prose`
  container (used by practice-area + compliance pages). This guarantees client-authored styling
  cannot leak into or regress existing pages. `styles/prose.css`, token-driven, imported by
  `globals.css`. The blockquote left-border is hand-authored CSS, so it renders reliably (unlike
  the documented Tailwind-utility missing-border bug).
