# UI consistency audit — 2026-11-17

Scope: site-wide Card / Button / Aside / linked-tile recipes vs [STYLEGUIDE.md](STYLEGUIDE.md).  
Method: grep class strings; no drive-by rewrites beyond Card chrome fill mismatches listed under **Fixed**.

## Verdict

Buttons and most Cards already share one recipe. Drift was small: a few linked tiles used `bg-white` instead of `bg-offwhite`, and one callout omitted the fill. Chrome (header mega, Cal facade) uses intentional non-Card shells — leave alone until unlocked.

## Fixed this pass (surgical class strings only)

| Location | Was | Now |
|---|---|---|
| `lib/render-guide.ts` guide hub tiles | `bg-white … hover:bg-offwhite` | Card `asLink` fill: `bg-offwhite … hover:bg-white` |
| `app/insights/page.tsx` insight hub tiles | same | same |
| `lib/render-practice-area.ts` `contextCalloutHtml` | `border … rounded p-6 md:p-8` (no fill) | `bg-offwhite border …` |

## Aligned (no change needed)

| Pattern | Where | Notes |
|---|---|---|
| Card chrome / comfortable / asLink | home defence grid, PA cards, get-in-touch, ContactAside shells, most guides | Matches [Card.md](Card.md) |
| Light buttons on light asides | fees, legal-aid, about, ContactAside | `btn-primary` / `btn-secondary` |
| Dark / emergency aside CTAs | PA navy/red boxes, police-station, guide asides | `btn-inverse` / `btn-on-dark` / `btn-inverse-emergency` — correct surface rule |
| FinalStrip | shared dark strip | `btn-inverse` + `btn-on-dark` |
| Hero Book+Call | Hero dark band | documented; mobile fill-swap in CSS |

## Documented exceptions (do not “unify” without unlock)

| Piece | Why it differs |
|---|---|
| Header mega CTA + eligibility tile (`rounded-md`, navy panel) | Chrome, not Body Card |
| Home Cal booking facade (`ring-1` + shadow) | Interactive widget shell, not Card |
| Home situation nested guide rows (`bg-white … p-4` inside Card) | Nested link row inside Card; not a second Card skin for page grids |
| HomeHero mobile form CSS remaps | Documented in [Hero.md](Hero.md) — layout hooks only |
| Sticky bar / desktop FAB / header WA icon | Documented chrome exceptions in STYLEGUIDE |

## Open (flag only — needs user unlock to change)

**Canonical cleanup list:** `/styleguide#cleanup-backlog` + `cleanupBacklog` in `lib/styleguide-spec.ts`.

**Cohesion pass 2026-11-17 resolved:** ArticleHeader=`fluid-h1`; title hybrids→feature `tracking-tight2`; Cal title→channel `text-2xl`; card grids `gap-6`; Body pad/margins ladder; light-surface `btn-md`; header mobile `btn-sm`. Still open on backlog: nested rows, Cal/mega shells, police caption, insight-body, legacy placeholders, orphan hooks, docs pointers, Phase B copy.

## Rule reminder

Tandem change only ([Invariants.md](Invariants.md) §11). Feature PRs do not absorb cleanup.

**ONE STYLE target:** `/styleguide` + `lib/styleguide-spec.ts`. Existing drift stays until a cleanup pass is unlocked — migrate only to listed targets.
