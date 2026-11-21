# class Card

Canonical light surface card. Reused everywhere a grey panel is needed.

```
class Card {
    // CANONICAL — copy this string; do not invent a parallel card
    chrome = "bg-offwhite border border-grey-300 rounded p-6"
    // Body / feature / situation / defence-grid cards may step padding up on desktop:
    chromeComfortable = "bg-offwhite border border-grey-300 rounded p-6 md:p-8"

    title = <h3 text-xl font-semibold tracking-tight2 text-navy-950>
    body  = <p mt-3 text-base text-navy-700 leading-relaxed>   // feature: mt-3 always; channel body uses mt-2
    link? = underline text-navy-950   // optional trailing link / "Learn more →"

    // Interactive grid tile (defence / practice-area cards)
    asLink = "block {chromeComfortable} h-full hover:bg-white transition-colors group"

    // Contact channel cards (contact.html WhatsApp / Book) — NOT the situation-card title scale
    channelEyebrow? = <p text-xs font-semibold tracking-[0.12em] uppercase text-grey-600>
    channelTitle    = <h3|p mt-2? text-2xl font-semibold tracking-tightish text-navy-950>
    channelBody     = <p mt-2 text-sm text-navy-700 leading-relaxed>
}
```

## Instances (do not invent new shapes)
| Instance | Where | Notes |
|---|---|---|
| ContactAside / PracticeAside shell | Aside | `chrome` only (`p-6`) |
| Contact channel cards (WA / Book) | `contact.html` | `chromeComfortable` + channelTitle/Body (eyebrow when present) |
| Home mobile “Ways to get in touch” | `HomeHero.tsx` | same channel recipe; section label = Body.sectionHeading |
| “What to do now” situation cards | `home.html` | `chromeComfortable` + `title`/`body` (text-xl / text-base) |
| Defence / PA / sub grid tiles | `home.html`, `lib/render-practice-area.ts` | `asLink` |
| Guides hub / Insights hub tiles | `lib/render-guide.ts`, `app/insights/page.tsx` | `asLink` |
| PA context callout | `lib/render-practice-area.ts` | `chromeComfortable` |
| Get-in-touch banner | PA body | `chrome` / `chromeComfortable` |

Nested link rows inside a Card (e.g. home situation `bg-white … p-4`) are **not** a second Card recipe — see [AUDIT.md](AUDIT.md).

## Related
- Surface ↔ button: light card → [Button](Button.md) `btn-primary` / `btn-secondary`
- Never put `btn-inverse` / `btn-on-dark` on a Card (invisible / wrong)
- Dark “cards” (e.g. contact Phone channel `bg-navy-950`) are **not** this class — they are dark surfaces
