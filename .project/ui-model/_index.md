# UI Object Model — index

The site's design language as an OOP class model, one class per file. Every page is an
**instance**; contextual differences are **overrides**, never new structure. Build/edit by
inheriting from a class and overriding only documented hooks. **Do not invent new shapes.**

Source of truth for values: `content/sections/*.html`, `app/insights/*.tsx`, `app/preview-styles.css`,
`app/preview-tailwind.css` (precompiled — no JIT; only classes already in the bundle are usable,
otherwise add a scoped rule in `preview-styles.css`).

Last reviewed: 2026-06-16.

## Classes
- [Page.md](Page.md) — abstract base (header + body + optional final strip)
- [Hero.md](Hero.md) — dark two-column hero (conversion/content pages)
- [ArticleHeader.md](ArticleHeader.md) — light header (legal/utility pages)
- [Body.md](Body.md) — two-column body container (main + aside)
- [Aside.md](Aside.md) — sticky right card; subclasses ContactAside / PracticeAside
- [FinalStrip.md](FinalStrip.md) — dark closing CTA strip
- [Button.md](Button.md) — button colour enum
- [Invariants.md](Invariants.md) — rules that hold across all instances + open items

## Page → class assignment (instances)
| Page | Header | Aside | FinalStrip |
|------|--------|-------|-----------|
| home | Hero | — | ✓ |
| about, fees, direct-access | Hero | ContactAside | ✓ |
| contact | Hero | (channel cards) | ✗ |
| practice-areas, guides-index | Hero | — | ✓ |
| guide-first-24-hours, guide-voluntary-interview | Hero | — | ✓ |
| pa-detail (PA + sub) | Hero | PracticeAside | ✓ |
| insights (hub) | Hero | — | ✓ | (app/insights/page.tsx — TSX, not content/sections)
| insights (article) | Hero | ContactAside-style | ✓ | (app/insights/[slug]/page.tsx — TSX) |
| police-station | Hero (CTA = Call, red) | PracticeAside | ✓ |
| authorised-to-conduct-litigation, legal-aid | Hero | ContactAside | ✓ |
| complaints, privacy-policy, terms-of-engagement, timescales | ArticleHeader | — | (timescales ✓) |

Hero left-column content is **distributed** at ≥1024px (h1 at top, optional copy line 1rem below,
CTA pinned to the bottom) — see [Hero.md](Hero.md).
