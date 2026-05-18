# Plan — SEO Audit Fix 2026-05-18

Phase: implement
Branch: fix/seo-audit-2026-05-18

## Approach

One branch, commits grouped by concern. Static-content fixes edit
`content/*.html` fragments; metadata fixes edit `app/`. Rebuild with
`rm -rf .next` (content edits don't invalidate the prerender cache —
known gotcha). Verify, then merge to main.

## Steps

### Phase 1: Metadata + config fixes
- [ ] 1.1: Remove `url` from layout `openGraph`; add `geo` + `image` to JSON-LD
  - Files: app/layout.tsx
- [ ] 1.2: `lang="en"` → `lang="en-GB"`
  - Files: app/layout.tsx
- [ ] 1.3: Sitemap `lastModified` → content fragment file mtimes
  - Files: app/sitemap.ts

### Phase 2: Content fragment fixes
- [ ] 2.1: Hub H1 "Defence work" → keyword H1
  - Files: content/sections/practice-areas.html
- [ ] 2.2: Header "Defence work" → link to /practice-areas + hub link in mega/mobile menu
  - Files: content/chrome/header.html  (verify JS in components/site/SiteBehaviour.tsx still binds)
- [ ] 2.3: Homepage Direct Access section → add /direct-access link
  - Files: content/sections/home.html
- [ ] 2.4: Hero <img> width/height + fix misleading comment
  - Files: content/sections/home.html
- [ ] 2.5: Rewrite false <noscript> text
  - Files: content/sections/home.html

### Phase 3: Verify + ship
- [ ] 3.1: type-check + rm -rf .next && build
- [ ] 3.2: Inspect rendered HTML for every fix
- [ ] 3.3: Real-browser check
- [ ] 3.4: Merge to main, deploy, confirm live

## Session context

Audit findings + severity in spec.md. User confirmed all 3 decisions.
