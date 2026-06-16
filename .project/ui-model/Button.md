# enum Button

Defined in `app/preview-styles.css`. Never use a button colour outside these.

```
enum Button {
    btn-inverse           // white bg / navy text       — primary on DARK surfaces
    btn-on-dark           // transparent / white border — secondary on DARK surfaces
    btn-primary           // navy fill                  — primary on LIGHT surfaces
    btn-secondary         // outline                    — secondary on LIGHT surfaces
    btn-emergency         // red                        — police-station hero / red call box
    btn-inverse-emergency // white bg / red text        — call button inside the red box
}
```

## Surface rule (invariant)
- DARK surfaces (Hero, FinalStrip, red box): `btn-inverse` (primary) / `btn-on-dark` (secondary).
- LIGHT surfaces (Aside cards, Get-in-touch banner, body): `btn-primary` (primary) / `btn-secondary` (secondary).
- Never mix (e.g. `btn-inverse`/`btn-on-dark` are invisible on a light card).
- **Phone-only exception (<640px):** in a hero Book+Call pair the fills swap (Call solid = primary,
  Book ghost = secondary) and the order reverses so Call is on top. See [Hero.md](Hero.md).
- **Text-only:** buttons carry no inline icons except those in the mobile charm/sticky bar and the
  desktop FAB.

## Sizes
`btn-sm` / `btn-md` / `btn-lg` / `btn-xl`. Hero CTAs = `btn-lg btn-full`; aside = `btn-md w-full`;
final strip = `btn-xl`/`btn-lg`. Width: `btn-full` or `w-full` for stacked; size-to-content in rows.

## Get-in-touch banner (pa-detail body)
Grey card (`bg-offwhite border border-grey-300`), no eyebrow, "Get in touch" +
"Book a consultation or call for legal support today"; buttons navy "Book a consultation"
+ secondary "Call now" (hidden ≥md) + secondary "Send a message". Mobile: vertical, edge-to-edge
(`.cta-actions`, 0.5rem inset). Desktop: horizontal.
