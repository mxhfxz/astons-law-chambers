# class Body

Two-column content container below the header.

```
class Body {
    wrapper = "max-w-wide mx-auto px-6 py-16 md:py-20"     // top+bottom padding (CANONICAL)
    grid    = "grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16"
    main    = "lg:col-span-2 space-y-12"                   // or per-section mt-12 (== 3rem, same gap)
    sectionHeading = <h2 text-3xl font-semibold tracking-tight2>   // CANONICAL size (text-3xl everywhere)
    bodyText       = text-navy-700 leading-relaxed
    bulletList     = <li pl-4 relative before:content-['—'] before:text-grey-300>
    aside?  = Aside                                        // right column
}
```

- `wrapper` uses `py-16 md:py-20` (top AND bottom). Exception: a Body under an
  [ArticleHeader](ArticleHeader.md) stays `pb`-only (header supplies top spacing).
- `sectionHeading` is `text-3xl` on every page (police-station + guides + legal pages were
  bumped up from `text-2xl`).
- `space-y-12` is effectively inert in this environment (computes ~16–20px, same on
  police-station — pre-existing quirk). Do NOT "fix" it; matching it is what keeps pages
  consistent. `mt-12` (fees) yields the same gap.
- TL;DR blockquotes (authorised, legal-aid) live as the FIRST element of `main`
  (`border-l-2 border-navy-950 bg-offwhite`), relocated from their old headers.

## Canonical spacing rhythm (styleguide — holds site-wide)
- **Hero → first content = 80px on EVERY page** (`py-16 md:py-20` top on the first body container).
  The hero is a 500px floor with its content **distributed** (h1 top / copy 1rem below / CTA pinned
  bottom, 3rem padding — see [Hero.md](Hero.md)); the band→first-content gap is this uniform 80px value.
- **Intra-section**: heading→para `mt-3`, para→para `mt-3`, para↔list `mt-4`. (guides + police were
  `mt-4` para→para — fixed to `mt-3`.)
- **Cards**: aside `p-6`; body/feature cards `p-6 md:p-8` (two deliberate sizes). Grid gutters `gap-10 lg:gap-16`.
- fees has a full-width intro (lead + VAT/legal-aid callout) then the grid; all three blocks now 80px-spaced.
