# class FinalStrip

Dark closing CTA strip at the bottom of content pages.

```
class FinalStrip {
    classes   = "relative overflow-hidden bg-navy-950 text-white" + .final-strip-mark svg
    inner     = "relative max-w-wide mx-auto px-6 py-16 md:py-24" > centered max-w-2xl
    h2        = <h2 mt-2 text-3xl md:text-4xl font-semibold tracking-tight2> "Speak to someone today"
    body      = "Available 24/7 for police station representation. Call or WhatsApp any time."
    buttons   = Call now (btn-xl btn-inverse) / Message on WhatsApp (btn-lg btn-on-dark) / Book a call (btn-lg btn-on-dark)
    dataTrack = "{page}_final_strip"
}
```

- Present on all content pages, including both insights pages (hub + article).
- Omitted on contact (dedicated contact page) and the legal text pages (complaints/privacy/terms).
- The eyebrow `<p>` ("Contact") was removed 2026-06-16; the `h2` keeps its `mt-2` (harmless).
- **Heading scale, 2026-07-03 alignment pass:** the `h2` was `text-3xl md:text-5xl leading-tight`
  (48px desktop). It is now `text-3xl md:text-4xl` (36px) — the SAME size as a
  [Body](Body.md) `sectionHeading`, and `leading-tight` was dropped with it. The strip headline no
  longer outranks a section heading; the site runs one heading scale. All 16 instances
  (14 in `content/sections/`, 2 in the Insights TSX) are identical. Do not reintroduce `md:text-5xl`.
- Copy is the standard strip copy — reuse verbatim; only `data-track-location` changes per page.
- This is the page's second (and last) dark band — see [Invariants](Invariants.md) banding rule.
