# Spec — Service-page layout: replicate police-station UI (LITERAL)

**Created:** 2026-06-09 · **Revised:** 2026-06-09 (user gave exact spec)
**Branch:** `sub-pages` · **Phase:** plan → (await confirmation) → implement

## Prime directive

Replicate the police-station page's UI **style** on all practice-area pages (top-level + sub).
Do **NOT** change copy. Do **NOT** change ordering. Do **NOTHING** that is not written below.
Where a rule needs a per-page judgment, it is listed under "Pending confirmation" — do not
implement those until the user confirms the mapping.

Scope = the shared template `content/sections/pa-detail.html` + `lib/render-practice-area.ts`
(applies to all ~20 PA + sub-pages). Hero is unchanged.

## Layout

Below the hero, switch to the police-station two-column structure:
- **Left = main content, normal flow (static).** Holds the existing sections in their
  CURRENT order (unchanged): S1 "What is X", context callout (if present), sub-offence grid
  (parents only), the Get-in-touch banner (was S3), process, defence, FAQ, direct-access.
- **Right = aside, sticky (scrolls with the page).** `position: sticky`. Add **1rem** gap
  above the pinned aside so it never touches the navbar when scrolling on desktop
  (sticky top = navbar height + 1rem). Applies to ALL pages.
- **Mobile / narrow:** the entire right aside drops BELOW the main content (vertical stack).
- The dark "blue" contact banner is full-width, placed BELOW the FAQ section (see "Dark
  banner").

## Right aside — three blocks (police-station UI, reused verbatim)

1. **Red box** (`bg-emergency-500` call card, police-station copy unchanged:
   "IF YOU ARE AT A STATION NOW" / "Call before the interview starts." / "Call now").
   - Show ONLY on pages where someone would realistically be calling from a police station
     for support. Otherwise the red box is omitted from that page. (Per-page set: see
     Pending confirmation.)
2. **Related areas** list. Ordering rule:
   `Parent → sibling (if exists) → sibling (if exists) …`
   - For a SUB-page: first link = its parent practice area, then its sibling sub-pages under
     the same parent.
   - For a TOP-LEVEL PA page: rule undefined by user → see Pending confirmation.
3. **Guides** list.
   - Show ONLY if a guide is relevant to this service/sub. If none is relevant, code the
     section conditionally but DO NOT render it until a relevant guide exists. (Per-page
     relevance map: see Pending confirmation.)

## Get-in-touch banner (replaces S3 "Book a consultation", same position in main column)

Grey banner styled like the police-station "Instructing directly" block
(`bg-offwhite border border-grey-300 rounded p-6 md:p-8`).
- **No eyebrow.**
- Heading (styled like the bold callout header / "Instructing directly" h2 —
  `text-xl font-semibold tracking-tightish text-navy-950`): **"Get in touch"**
- Subcopy: **"Book a consultation or call for legal support today"**
- Buttons (exact labels, user-authored):
  - **"Book a consultation"** — Astons navy filled (primary), → cal.com
  - **"Call now"** — secondary outline, → tel:+447922247999 — **hidden on desktop**
  - **"Send a message"** — secondary outline, → WhatsApp
- Desktop: buttons horizontal. Mobile: buttons vertical, full-bleed to the edges of the grey
  box with **0.5rem** padding from the box edges, and 0.5rem below the last button.
- Preserve/add `data-track` + `data-track-location` on each button (analytics, not copy).

## Dark "blue" contact banner (was S6, mid-page)

- Move to BELOW the FAQ section (full-width, like police-station's final strip). Copy
  unchanged. Removing it from mid-page also fixes the broken flow.

## FAQ

- Remove the chevron-down arrow from each FAQ item (`#i-chevron-down`). The items are not
  collapsible; the arrow is not needed. Q&A copy unchanged, order unchanged.

## Hard constraints

- **No copy changes** except the three exact strings the user authored for the Get-in-touch
  banner ("Get in touch", "Book a consultation or call for legal support today", and the
  button labels "Book a consultation"/"Call now"/"Send a message"). Everything else is
  byte-for-byte unchanged — verify with a pre/post text diff.
- **No ordering changes** to existing sections.
- **Precompiled Tailwind only** (no JIT) — reuse classes already in police-station.html /
  pa-detail.html. The one new dimension is the 0.5rem mobile button padding and the 1rem
  sticky offset; implement with classes already in the bundle or via the existing
  `preview-styles.css` (no Tailwind JIT).
- Conversion paths: phone → WhatsApp → cal.com only; keep all `data-track` attrs.
- Banding stays surgical (hero dark + one final dark banner).
- Graceful collapse: a page with no red box / no guides / empty related must not leave an
  empty aside cell — aside renders only the blocks it has; if the aside is entirely empty,
  main falls back to single column.

## Resolved (user, 2026-06-09) + IMPLEMENTED

1. **Red box + Guides** — shown on all PA/sub-pages EXCEPT `appeals`, `inquests`,
   `totting-up`. Both guides on each included page. (renderer: `NO_STATION_SCENARIO`.)
2. **Related-areas** — sub-page: parent → siblings; top-level w/ children: its children;
   top-level w/o children: existing `related[]` fallback. (renderer: `relatedItemsHtml`.)
3. **Dark banner** — full-width at the very bottom, police-station style.

## Verification (2026-06-09) — all pass

- build + type-check green. Only 3 files changed: `pa-detail.html`, `render-practice-area.ts`,
  `preview-styles.css`. Data/copy files untouched.
- Template text diff vs HEAD: only the authored Get-in-touch strings + the relocated dark
  banner (identical strings). No other copy moved.
- Prerendered HTML: aside blocks conditional & correct per page type; FAQ has no chevron;
  red box/guides absent on the 3 exception pages.
- Browser (dev): desktop sticky aside pins at 8.5rem with a measured **16px (1rem) gap**
  below the navbar; mobile aside is `static` and drops below main; Get-in-touch buttons
  horizontal on desktop (Call hidden), vertical + edge-to-edge (~0.5rem) on mobile (Call
  shown).

## NOT yet done
- Not committed (working tree on `sub-pages`). Not pushed. No Vercel preview run.
- `code-reviewer` subagent not yet run.

## Acceptance criteria

- [ ] All PA + sub-pages: two-column, sticky right aside (1rem below navbar), static left.
- [ ] Aside blocks appear only where their rules say; collapse cleanly otherwise.
- [ ] Get-in-touch grey banner matches the spec (buttons, desktop/mobile, hidden Call on
      desktop, 0.5rem mobile edges).
- [ ] Dark banner below FAQ; no mid-page dark band.
- [ ] FAQ has no chevrons.
- [ ] Pre/post text diff empty except the authored banner strings.
- [ ] build + type-check pass; no new Tailwind utility classes.
- [ ] Vercel preview real-browser check (desktop + mobile): parent w/ sub-grid,
      a sub-page, a page with no red box (e.g. inquests/appeals/totting-up), inquests.
- [ ] code-reviewer clean.
