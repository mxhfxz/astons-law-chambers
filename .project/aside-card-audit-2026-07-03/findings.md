# Aside / side-card audit — 2026-07-03

Full sweep of every side-column card across the site (content/sections/*.html,
lib/render-practice-area.ts, app/insights/[slug]/page.tsx, home sidebar).
Canonical reference: `.project/ui-model/Aside.md`.

## Every card surface, catalogued

### ContactAside (light `bg-offwhite border border-grey-300 rounded p-6`)
| Page (file:line) | Eyebrow | Body para colour | Buttons | Verdict |
|---|---|---|---|---|
| legal-aid-eligibility.html:90 | ✓ | `text-navy-700` ✓ | Call, WhatsApp | READABLE |
| about.html:104 | ✓ | (no para) | Call, WhatsApp, **Book** | 3 buttons, no para |
| direct-access.html:124 | ✓ | `text-navy-100/90` ✗ | Call, WhatsApp | **UNREADABLE** |
| authorised-to-conduct-litigation.html:198 | ✓ | `text-navy-100/90` ✗ | Call, WhatsApp | **UNREADABLE** |
| legal-aid.html:222 | ✓ | `text-navy-100/90` ✗ | Call, WhatsApp | **UNREADABLE** |
| fees.html:112 | ✓ | `text-navy-100/90` ✗ | Call, WhatsApp | **UNREADABLE** |
| not-found.html:45 | ✓ | `text-navy-100/90` ✗ | Call*, WhatsApp | **UNREADABLE** |
| insights/[slug] (fallback) | ✓ | (headline `text-lg`, no para) | Call | different shape |

\* not-found Call button carries a stray `flex` class the others don't have.

### Severity CTA boxes (dark/red, in the sticky aside)
| Source | Surface | Top text | Structure |
|---|---|---|---|
| render-practice-area asideCtaBoxHtml (navy, NO_STATION) | `bg-navy-950` | `text-lg` headline, **no eyebrow** | headline + Call + Book |
| render-practice-area asideCtaBoxHtml (red, custody) | `bg-emergency-500` | `text-lg` headline, **no eyebrow** | headline + Call |
| guide-first-24-hours.html:166 (red) | `bg-emergency-500` | **eyebrow** + `text-lg` headline | eyebrow + headline + Call |
| police-station.html:86 (red) | `bg-emergency-500` | **eyebrow** + `text-lg` headline | eyebrow + headline + Call |
| insights/[slug] (emphasis, red) | `bg-emergency-500` | eyebrow(optional) + `text-lg` headline | eyebrow + headline + Call |
| home.html:268 urgency (navy) | `bg-navy-950` **p-5** | eyebrow + `text-sm` para | eyebrow + para + Call |

### Related / Guides cards (light) — CONSISTENT everywhere
`bg-offwhite border border-grey-300 rounded p-6`, `text-xs uppercase text-grey-600`
eyebrow, `text-sm` link list. No action.

### Contact channel cards (contact.html) — separate component
3-col full-width grid, `p-6 md:p-8`, one dark + two light. Intentionally larger
than the sticky aside; self-consistent. No action.

## Findings

### A. READABILITY BUG (objective — must fix)
Five ContactAside cards render body copy in `text-navy-100/90` — a light-on-light
colour meant for DARK hero/final-strip surfaces — on the light off-white card, so
the paragraph is near-invisible (screenshot 1). The canonical readable colour is
`text-navy-700`, already used on legal-aid-eligibility and the contact cards.
Fix = class swap only; the text STRING is untouched (copy rule respected).
- direct-access.html:126, authorised…:200, legal-aid.html:224, fees.html:114, not-found.html:47

### B. SIZING / STRUCTURE DRIFT ("random UI")
1. **ContactAside top-of-card hierarchy differs from CTA boxes**: ContactAside leads
   with a small `text-xs` uppercase eyebrow + paragraph; the severity boxes lead with
   a large `text-lg` headline. Side by side this reads as two unrelated card systems.
2. **Emergency/navy box eyebrow is inconsistent**: the render-practice-area boxes have
   NO eyebrow; guide/police-station/insights boxes DO. (Normalising touches copy.)
3. **ContactAside button count**: about = 3 (Call/WhatsApp/Book); the other 6 = 2
   (Call/WhatsApp, no Book).
4. **Stray `flex` on not-found Call button** (`.btn` is already inline-flex-centered,
   so it's cosmetic markup drift, not a real size change).
5. **home urgency box uses `p-5`**; every other card is `p-6`.

## RESOLUTION (applied 2026-07-03, branch legal-aid-eligibility)
User decisions: (1) keep two card families; (2) contact buttons = mobile all 3, desktop
Book + WhatsApp + phone number as TEXT (can't tap-to-call on a laptop).

Done + verified (type-check exit 0, build exit 0, browser 1280 + 390):
- **A. Readability**: `text-navy-100/90` → `text-navy-700` on all 5 broken paras. 0 remain.
- **Canonical ContactAside** applied to all 7 (about, direct-access, authorised, legal-aid,
  legal-aid-eligibility, fees, not-found): mobile = Call+WhatsApp+Book; desktop = phone-text
  (`.aside-phone-desktop`) + WhatsApp + Book, Call is `md:hidden`.
- **Cascade bug caught in verification**: bare `md:hidden` on a `.btn` loses to
  `.btn{display:inline-flex}` (same tie as the documented `.btn.hidden`). Fixed with a scoped
  `@media(min-width:768px){.btn.md\:hidden{display:none}}` in preview-styles.css.
- **about Book button**: off-site href → cal.com popup embed attrs (regression fixed).
- **Stray `flex`** removed from not-found Call button.
- **PA aside red-box Call icon** removed (Invariant 6; matches guide/police red boxes).
- **home urgency box** `p-5` → `p-6`.
- `Aside.md` model updated to the new canonical.

## Not changed / out of scope (documented, NOT silently left)
- Severity COLOUR variation (red custody / navy default) is intended, per user.
- All visible text strings are read-only (only colour classes + the user-directed phone
  number text were touched).
- **Navy CTA box (appeals/inquests/totting-up)** keeps `flex` on its Call/Book buttons —
  cosmetic no-op (`.btn` is already inline-flex; `w-full` fills either way). Left to avoid
  churn; note for a future tidy pass.
- **Get-in-touch BODY banner** (main column, not a side card) keeps phone/WhatsApp icons on
  its mobile buttons — technically an Invariant 6 edge case, but out of the side-card scope
  of this audit. Flagged for your call.
- **Insights article aside** (TSX) is headline-led (severity family), single Call CTA — left
  as-is per "keep two families".
