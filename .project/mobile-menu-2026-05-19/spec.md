# Mobile menu upgrade — 2026-05-19

Phase: implement
Branch: fix/mobile-menu-2026-05-19

## Scope (user request)

1. Hamburger morphs into an X when the menu opens (CSS microinteraction).
2. Open menu fills the whole screen (full white panel below the navbar).
3. Page scroll behind the open menu is locked.

## Approach

- **Morph:** replace the `#i-burger` SVG with three `.burger-bar` spans.
  Pure CSS, driven off `#mobileMenuToggle[aria-expanded="true"]` (the JS
  already toggles that attribute). `prefers-reduced-motion` guard.
- **Full-screen:** `#mobileMenu` becomes `position: fixed; inset: 64px 0 0 0`
  (below the 64px mobile navbar). The morphed X in the navbar stays visible
  to close it.
- **Scroll lock:** JS toggles `body.menu-open`; CSS `overflow: hidden`
  (scoped to <768px so a mobile→desktop resize can't strand the lock).
- **Z-index:** the floating call pill / quick-exit are `z-40`; the header is
  `z-30`. `body.menu-open #siteHeader { z-index: 50 }` lifts the open menu
  above them so the white panel truly covers the screen.

## Correctness carried with it

- Route change clears `menu-open` + resets the toggle (else scroll stays
  locked / burger stays an X after navigating).
- `aria-controls="mobileMenu"` on the toggle; `aria-label` swaps
  Open/Close; Escape closes the menu.

## Files

- content/chrome/header.html — burger markup, aria-controls
- app/preview-styles.css — burger morph, full-screen panel, scroll lock, z
- components/site/SiteBehaviour.tsx — body class toggle, route cleanup, Esc

## Flag

The full-screen panel covers the "Quick exit" safety button while open.
Per the explicit "entire screen" instruction. Raise with the user if the
quick-exit should stay reachable from inside the open menu.
