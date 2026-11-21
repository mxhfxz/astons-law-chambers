# Astons UI — Styleguide / Component Library

**Status:** FLAT LAW of this project (set 2026-11-17).  
**ONLY source of truth:** `lib/styleguide-spec.ts` + `/styleguide`. **Start every UI action there.** Unlisted · noindex · not in nav/sitemap.  
**Product site = OOP strict.** `/styleguide` docs chrome may break OOP — do not copy docs patterns into product.  
**Class notes:** this folder. **Compose only what the styleguide lists.** Missing → flag.

---

## How to build (mandatory workflow)

1. Open **`/styleguide`** + read **`lib/styleguide-spec.ts`** — only SoT. Start every UI action here.
2. Open [\_index.md](_index.md) → pick the **Page / class** assignment.
3. Open that class file. Inherit structure; override **only** documented hooks.
4. Grep `app/preview-tailwind.css` before adding any Tailwind utility. No JIT.
5. If the needed piece is **not on the styleguide** → **FLAG** and wait. Do not invent.
6. **Tandem change only.** Unlock → update `lib/styleguide-spec.ts` + styleguide page **in the same edit**.

```
IF listed in lib/styleguide-spec.ts → reuse exact tokens
ELSE → stop; “Not on /styleguide”; do not invent
NEW recipe → user unlock + update styleguide-spec + page + then code
CHANGE → tandem; never rewrite neighbours unless asked
```

---

## Library catalogue

### Page shell
| Component | File | Role |
|---|---|---|
| **Page** | [Page.md](Page.md) | Abstract: Header + Body + optional FinalStrip |
| **Hero** | [Hero.md](Hero.md) | Dark conversion header (two-column) |
| **ArticleHeader** | [ArticleHeader.md](ArticleHeader.md) | Light legal/utility header |
| **Body** | [Body.md](Body.md) | Content wrapper + section heading scale |
| **Aside** | [Aside.md](Aside.md) | Sticky right card; ContactAside / PracticeAside |
| **FinalStrip** | [FinalStrip.md](FinalStrip.md) | Dark closing CTA strip |

### Primitives
| Component | File | Role |
|---|---|---|
| **Button** | [Button.md](Button.md) | Colour enum + surface rule |
| **Card** | [Card.md](Card.md) | Canonical light grey card |

### Invariants
| Doc | Role |
|---|---|
| [Invariants.md](Invariants.md) | Cross-cutting rules (banding, icons, copy, Tailwind) |

---

## Primitive recipes (copy verbatim)

Full recipes + live samples: **`/styleguide`** · **`lib/styleguide-spec.ts`**.

### Card (light)
```
bg-offwhite border border-grey-300 rounded p-6
```
Comfortable (body/feature):
```
bg-offwhite border border-grey-300 rounded p-6 md:p-8
```
Linked tile:
```
block bg-offwhite border border-grey-300 rounded p-6 md:p-8 h-full hover:bg-white transition-colors group
```

### Card type (situation / feature)
```
h3: text-xl font-semibold tracking-tight2 text-navy-950
p:  mt-3 text-base text-navy-700 leading-relaxed
```

### Contact channel Card type (`contact.html` WA / Book; home mobile contact blocks)
```
title: text-2xl font-semibold tracking-tightish text-navy-950
body:  mt-2 text-sm text-navy-700 leading-relaxed
eyebrow? (contact page only): text-xs font-semibold tracking-[0.12em] uppercase text-grey-600
```

### Section heading (Body)
```
h2: text-3xl md:text-4xl font-semibold tracking-tight2
```

### Body wrapper
```
max-w-wide mx-auto px-6 py-16 md:py-20
```

### Buttons (surface rule)
| Surface | Primary | Secondary |
|---|---|---|
| **Dark** (Hero, FinalStrip, dark bands) | `btn-inverse` | `btn-on-dark` |
| **Light** (Card, Aside, white body) | `btn-primary` | `btn-secondary` |
| Police emergency | `btn-emergency` / `btn-inverse-emergency` | — |

Sizes: `btn-sm` / `btn-md` / `btn-lg` / `btn-xl`. Full width: `btn-full` or `w-full`.

### Chrome exceptions (allowed; not general-purpose)
| Piece | Where | Notes |
|---|---|---|
| Mobile sticky bar | `content/chrome/sticky-bar.html` | Icons allowed |
| Desktop FAB | `content/chrome/desktop-fab.html` | Icons allowed |
| Home mobile FABs | `HomeHero` `.hero-mobile-fabs` | Icons allowed; homepage sticky disabled |
| Header WA icon | `content/chrome/header.html` | Mobile header only |

Do not invent a fourth floating/sticky contact pattern.

---

## Explicitly NOT in the library (do not invent)

- New card skins (different radius, shadow, border colour, padding scale)
- New button colours / gradients / icon-in-button variants (except sticky/FAB)
- New hero layouts (extra columns, overlays, badges, stat strips)
- Location-page templates, doorway skins, GOV.UK lookalikes
- Parallel CSS that re-implements Card/Button instead of composing them
- New section-heading sizes (`md:text-5xl`, etc.)

---

## When something is missing

Tell the user in one short block:

> **Not in library:** `<needed thing>`.  
> Closest existing: `<Card|Button|Hero|…>`.  
> Need your unlock to add a new component / variant to `.project/ui-model/`.

Do not proceed with a substitute invention.

---

## Maintenance

- Every approved new component gets its own `ClassName.md` + a row in this catalogue **before** code lands.
- Update [\_index.md](_index.md) page→class table when a page’s header/aside/strip assignment changes.
- `preview-styles.css` may hold scoped layout rules for documented hooks only — never a second design system.
