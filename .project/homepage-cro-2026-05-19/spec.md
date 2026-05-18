# Homepage CRO restructure — 2026-05-19

Phase: plan (copy awaiting approval)
Branch: TBD — fix/homepage-cro-2026-05-19

## Why

The homepage stacks two loud red blocks in one viewport (fixed banner +
red police-station band), which pulls attention off the hero and breaks
the no-alternating-banding rule. The police-station path also has no
self-selection entry for the crisis audience. Three changes, analysed
through page-cro / copywriting / frontend-design.

## Scope (user-confirmed 2026-05-19)

1. **Pin the 24/7 banner.** Make navbar + police banner one sticky unit
   (two rows) instead of a separate `fixed` element. Mega menu drops
   below both. Structural fix — no copy.

2. **Replace the red police band with a grey card.** Calm grey container
   (like "Before you call"), RED emergency CTA + accent kept — calm
   container, urgent action. Sits directly below the hero. Carries a
   vetted free instruction, not just "call us".

3. **Add a 3-card "situation" section** below the police card. Self-
   selection by situation: arrested / police interview / charged-or-
   summons. Practice-grid card visuals (white, hairline border). Each
   card: free instruction + link to the relevant page + the relevant
   ungated PDF resource.

## Decisions confirmed

- Police card: grey card + red CTA.
- "Before you call" card: folded into the 3-card section (removes a
  third stacked card block + the conceptual repetition).
- Value payload: each card carries a free instruction AND links the two
  arrest PDFs (ungated — within the no-email-funnel rule).

## Constraints

- Copy: no marketing speak, no rhetorical questions, entity-first,
  natural barrister voice. Project rules override the copywriting skill.
- Legal-instruction lines need Ghulam's sign-off. Reuse only vetted
  wording (the custody-sergeant line is already live in the Criminal
  Defence FAQ). Flag anything new with 🚩. No fabricated legal advice.
- Tailwind classes must already exist in app/preview-tailwind.css
  (precompiled — see project_preview_tailwind_precompiled memory).
- Verify with build + type-check + real-browser screenshots before main.

## PDFs to publish (pending client OK to make public)

- "What to do in the first 24 hours after being arrested in the UK.pdf"
  -> public/resources/first-24-hours-after-arrest.pdf
- "Do I need a lawyer at a voluntary police interview under caution.pdf"
  -> public/resources/voluntary-police-interview-under-caution.pdf
