# Go-live fixes (user-approved 2026-06-16). NO improvisation.

## #2 Footer — accurate, no breakage
- footer.html:23 label "All defence work" → "Defence work" (the site's own
  breadcrumb label for /practice-areas; link unchanged, keeps crawl depth).

## #3 Match index + home PA cards to the grey-bordered sub-card style
White style `block bg-white p-6 md:p-8 h-full hover:bg-offwhite ...` →
`block bg-offwhite border border-grey-300 rounded p-6 md:p-8 h-full hover:bg-white ...`
in:
- lib/render-practice-area.ts: cardHtml (L27) + policeStationCardHtml (L179)
- content/sections/home.html: hardcoded #homeDefenceGrid cards
Grid container gapless `gap-px bg-grey-300 border border-grey-300 rounded overflow-hidden`
→ `gap-4` (separated bordered cards) in:
- content/sections/practice-areas.html (#practiceAreaIndexGrid)
- content/sections/home.html (#homeDefenceGrid)
(Also resolves the trailing empty-cell flag.)

## #1 Ratings link — apply per user decision (resolving link first)
https://share.google/hHVYSzCDEpmhQ6lFr

## #4 Blue-box copy — confirmed fine, no action.

## Verify
- stop dev → npm run build → restart dev. type-check + lint. Screenshot index + home.
