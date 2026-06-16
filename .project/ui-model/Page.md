# class Page (abstract)

Base class every page inherits from.

```
abstract class Page {
    Header      header       // Hero | ArticleHeader
    Body        body
    FinalStrip? finalStrip   // optional closing CTA
}
```

- `header` — [Hero](Hero.md) for conversion/content pages; [ArticleHeader](ArticleHeader.md)
  for legal/utility pages.
- `body` — [Body](Body.md) (two-column main + aside).
- `finalStrip` — [FinalStrip](FinalStrip.md); present on all content pages. Omitted on
  contact (it IS the contact page) and the legal text pages (complaints/privacy/terms).

Pages render from `content/sections/<name>.html` (static fragments injected via
`dangerouslySetInnerHTML`). PA + sub pages render from `pa-detail.html` via
`lib/render-practice-area.ts`.
