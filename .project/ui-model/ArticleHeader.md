# class ArticleHeader extends Header

Light header for legal/utility pages (no hero image).

```
class ArticleHeader extends Header {
    classes    = "bg-white", wrapper "max-w-wide mx-auto px-6 pt-14 pb-10 md:pt-20 md:pb-12"
    breadcrumb = <p text-base font-medium text-grey-600 tracking-tightish>
    h1         = <h1 text-4xl md:text-6xl font-semibold tracking-tight2 leading-[1.05]>
    tldr?      = <blockquote border-l-2 border-navy-950 bg-offwhite>   // AEO direct-answer, optional
}
```

- **instances:** complaints, privacy-policy, terms-of-engagement, timescales — plus the 404 page
  (`not-found`, same light header pattern). Legal/utility tier ONLY.
- ArticleHeader pages KEEP their breadcrumb + eyebrow — the hero eyebrow/breadcrumb removal applied to
  [Hero](Hero.md) instances only.
- The Body below an ArticleHeader stays `pb`-only (NO top padding): the header's
  `pt-14 md:pt-20` already supplies top spacing; adding body `pt` double-gaps.
- Conversion/content pages do NOT use this — they use [Hero](Hero.md). (authorised-to-conduct-
  litigation and legal-aid were migrated off ArticleHeader → Hero on 2026-06-15; their TL;DR
  blockquote moved into the Body top.)
