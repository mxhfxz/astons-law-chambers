# Invariants & open items

## Invariants (must hold across every instance)
1. **Conversion paths only**: phone (tel:) → WhatsApp (wa.me) → cal.com. No forms/email.
   Preserve every `data-track` / `data-track-location`.
2. **Surface ↔ button**: dark → `btn-inverse`/`btn-on-dark`; light → `btn-primary`/`btn-secondary`.
   Never mix. Phone-only exception: in a hero Book+Call pair the fills swap so Call is primary
   (see [Hero.md](Hero.md)).
3. **Banding is surgical**: dark Hero + one dark FinalStrip per page. No alternating bands.
4. **Hero composition**: `h1` + OPTIONAL short copy line + CTA row + BSB link, distributed
   (h1 at top / copy 1rem below / CTA pinned to the bottom, 3rem padding, ≥1024px). No eyebrow,
   no breadcrumb. Long TL;DR / summary copy goes in the BODY, not the hero. (This supersedes the
   earlier "no lead paragraph in the hero" rule — the hero now carries a short copy line by user
   design, 2026-06-16. Memory `feedback_hero_no_paragraph_clutter` is aligned with this.)
5. **Section headings = `text-3xl md:text-4xl`** everywhere (30px mobile / 36px ≥768px), with NO
   kicker eyebrow `<p>` above them (all body-heading eyebrows removed 2026-06-16). The desktop
   step-up was added 2026-07-03; the sanitised Insights CMS body (`.insight-body h2`) is scaled in
   raw rem to match it exactly, because that body is class-free and Tailwind cannot reach it.
6. **No button icons** except the mobile charm/sticky bar and the desktop FAB. The last two
   in-page exceptions — the phone + WhatsApp icons on the get-in-touch banner buttons — were
   removed 2026-07-13. Site-wide icon-button count in content/, lib/ and app/ is now ZERO.
7. **Precompiled Tailwind only**: no JIT. New utility values must already exist in
   `preview-tailwind.css`; otherwise add a scoped rule in `preview-styles.css`
   (e.g. `.pa-aside`, `.cta-actions`, the hero distribution + mobile-flip rules).
8. **Copy is read-only** unless the user supplies exact text. Relocating existing copy is allowed;
   editing the string is not.
9. **No practitioner portrait. Minimise "Ghulam" in body copy.** Entity-first ("Astons Law Chambers").

## Open items (need user direction)
- **police-station** hero keeps an extra caption ("Call for 24/7 police station representation now") —
  an off-spec hero element + an operational claim 🚩; left in place (copy is read-only).
- **Band height**: the 500px floor is accepted; the two long guide H1s grow past it at 1024–1200px.
  Shorten those H1s for a truly fixed band, or keep the floor (copy — user's call).
- **Phase B** (not started): per-area hero copy lines for pa-detail / sub-service pages, adapted from
  each card summary — drafts need user approval (copy rule).
- **Nav "View all defence work" / "All defence work"** link text still says "defence work" although the
  nav label is now "Services" — rename pending user confirmation. (Header chrome, not modelled here.)
