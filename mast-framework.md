---
trigger: always_on
---

# Mast Framework (v2.4)

This project is built in Webflow using the Mast framework by No-Code Supply Co.
Docs: https://www.nocodesupply.co/mast/docs

Structural and workflow preferences are defined in `personal-preferences.md`.

## 80/20 Rule

Mast handles approximately 80% of any site using its default classes and components. The remaining 20% is intentional custom code. Do not extend or modify Mast's defaults — work within them.

## Class Types

- **Base classes** — no prefix. Examples: `section`, `container`, `row`, `col`, `form`, `input`, `btn`
- **Utility classes** — prefix `u-`. Examples: `u-bg-primary`, `u-mb-sm`, `u-text-center`
- **Custom classes** — no prefix. Examples: `blog-card`, `footer-social_link`
- **Combo classes** — prefix `cc-`. Applied to base or custom classes only. Examples: `nav-link cc-cta`, `section cc-footer`

## Naming Rules

- Lowercase only
- `-` between words within a single concept: `u-bg-primary`
- `_` between context levels within a component: `nav-dropdown_content`

## Breakpoint Infixes

| Infix | Breakpoint |
|---|---|
| `-lg-` | Desktop (≥992px) |
| `-md-` | Tablet (≤991px) |
| `-sm-` | Mobile landscape (≤767px) |
| `-xs-` | Mobile portrait (≤478px) |

Example: `col-lg-8`, `u-md-d-none`

## Size Postfixes

`-sm` `-md` `-lg` `-xl`

Example: `paragraph-xl`, `u-mb-sm`

## Class Logic Flow

1. Before creating any layout, check whether a Mast `row` and `col-lg-x` structure can achieve it.
2. Only create a custom flex div if the Mast grid cannot achieve the layout.
3. If more than 4 utility classes are needed on one element, suggest a custom class instead of stacking utilities.

## Variables

Variables in Webflow are named in Title Case with spaces. Collections:

- **Theme** — background, text, border, accent colours across modes
- **Typography** — font families, heading sizes, paragraph sizes, eyebrow
- **Components** — section padding, card border radius, button and input styling
- **Layout** — grid gap values, container widths
- **Color** — brand colour swatches
