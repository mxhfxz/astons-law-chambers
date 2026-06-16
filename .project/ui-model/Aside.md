# class Aside

Sticky right-column card. One visual language; content differs by subclass.

```
class Aside {
    sticky    = .pa-aside   // @≥1024px: position:sticky; top:8.5rem (navbar 7.5rem + 1rem gap)
                            // <1024px: static, drops BELOW main content
    selfAlign = self-start
    card      = "bg-offwhite border border-grey-300 rounded p-6"   // light card (CANONICAL)
    eyebrow   = <p text-xs font-semibold tracking-[0.12em] uppercase text-grey-600>
    button.primary   = btn btn-md btn-primary  w-full   // navy
    button.secondary = btn btn-md btn-secondary w-full  // outline
}

class ContactAside extends Aside {
    // Call (primary) + WhatsApp (secondary) + Book a call (secondary)   // text-only, no icons
    // instances: about, fees, direct-access, legal-aid, authorised-to-conduct-litigation, not-found
}

class PracticeAside extends Aside {
    // RedBox(bg-emergency-500 "If you are at a station now", conditional) + RelatedAreas + Guides(conditional)
    // instances: pa-detail (PA + sub), police-station
    // built by lib/render-practice-area.ts; red box/guides omitted on appeals, inquests, totting-up
}
```

## CSS (app/preview-styles.css)
`.pa-aside` is desktop-sticky-only with `top: 8.5rem` (header is 7.5rem: banner 48px + navbar
72px; +1rem gap so it never touches the navbar). Mobile = static.

## Note
The dark navy contact box that used to live on info pages was migrated to this light card
(2026-06-10). Header eyebrow/lead colours (`text-navy-100/80`) must NOT be blanket-swapped —
they're shared with the dark Hero/FinalStrip; scope any change to aside-only strings.
