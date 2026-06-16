# class FinalStrip

Dark closing CTA strip at the bottom of content pages.

```
class FinalStrip {
    classes   = "relative overflow-hidden bg-navy-950 text-white" + .final-strip-mark svg
    inner     = "relative max-w-wide mx-auto px-6 py-16 md:py-24" > centered max-w-2xl
    h2        = <h2 text-3xl md:text-5xl font-semibold tracking-tight2 leading-tight> "Speak to someone today"
    body      = "Available 24/7 for police station representation. Call or WhatsApp any time."
    buttons   = Call now (btn-xl btn-inverse) / Message on WhatsApp (btn-lg btn-on-dark) / Book a call (btn-lg btn-on-dark)
    dataTrack = "{page}_final_strip"
}
```

- Present on all content pages, including both insights pages (hub + article).
- Omitted on contact (dedicated contact page) and the legal text pages (complaints/privacy/terms).
- The eyebrow `<p>` ("Contact") was removed 2026-06-16; the `h2` keeps its `mt-2` (harmless).
- Copy is the standard strip copy — reuse verbatim; only `data-track-location` changes per page.
- This is the page's second (and last) dark band — see [Invariants](Invariants.md) banding rule.
