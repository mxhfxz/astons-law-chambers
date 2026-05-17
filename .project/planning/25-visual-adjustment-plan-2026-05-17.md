# Visual Adjustment Implementation Plan

**Goal:** Make the new build read as dark, image-led, and substantial — the
qualities the client prefers about the live site — without regressing any
conversion, speed, or accessibility metric.

**Architecture:** Four visual changes to `preview/index.html`, applied one at
a time, each gated by a measurable check before it is allowed to stay.
Conversion structure (CTAs, copy, page flow) is not touched. Where a change
could threaten a metric, the plan names the threat and the mitigation.

**Tech stack:** Static HTML + Tailwind (CDN) + CSS custom properties. No build
step. Verified with `scripts/contrast_audit.py` and Lighthouse.

---

## The hard constraint

The client's instruction: **no conversion, bounce, speed, or accessibility
metric may drop, even 1%.**

Honest framing first, because it shapes the whole plan:

Conversion itself (call clicks, WhatsApp clicks, booking clicks) **cannot be
measured on the staging site** — it has no traffic. So "0% drop" cannot be
*proven* before launch. What this plan does instead:

1. **Protects conversion structurally.** CTAs, copy, page order, and the
   conversion flow are not changed by any task. A change that does not touch
   the conversion machinery cannot reduce conversion. This is verified by a
   diff review and a CTA checklist, not by guesswork.
2. **Holds or improves every metric we *can* measure pre-launch** — page
   speed, layout stability, contrast, and CTA visual prominence. Each task
   has a gate; if the gate fails, the change does not ship.
3. **Defines a post-launch watch** — GA `call_click` rate is monitored after
   the visual change reaches production, with a defined rollback trigger.

If a gate fails, the task is reworked or dropped. Nothing ships on hope.

---

## Functional improvements being protected (do NOT change)

Every one of these stays exactly as it is. They are the reason the new build
out-performs the live site.

- Call as the single primary hero CTA. No second competing CTA in the hero.
- The hero lead paragraph (reader-state-first wording).
- The police-station emergency strip.
- The "Before you call" callout.
- The four framework FAQs and all practice-area content.
- The /contact page.
- All conversion links: `tel:`, `wa.me`, cal.com URLs — unchanged.
- Page order and section sequence.
- Entity-first voice; no fabricated facts; no practitioner portrait.
- No credibility/stats banner (client decision 2026-05-17 — confirmed out).

---

## Baseline — capture before any change

### Task 0: Record the starting numbers

**Files:** none changed. Output saved to `.project/planning/25-baseline.md`.

**Step 1:** Confirm staging is current.
Run: `curl -sI https://alc-staging.vercel.app | head -1`
Expected: `HTTP/2 200`

**Step 2:** Capture the contrast baseline.
Run: `python3 scripts/contrast_audit.py`
Expected: `Failures: 0`. Record the element count.

**Step 3:** Capture the speed baseline with Lighthouse.
Run: `npx lighthouse https://alc-staging.vercel.app --only-categories=performance,accessibility --output=json --output-path=/tmp/lh-baseline.json --chrome-flags="--headless"`
Record: Performance score, LCP, CLS, TBT, Accessibility score.

**Step 4:** Capture the Call-button contrast ratio.
The hero Call button today is `btn-xl btn-primary` (navy fill `#16223C`,
white text) on a white background. Record its fill-against-page contrast and
its label contrast. This is the number the dark-hero change must match or beat.

**Step 5:** Write all numbers into `.project/planning/25-baseline.md` and
commit.
```bash
git add .project/planning/25-baseline.md
git commit -m "Visual adjustment: capture pre-change baseline"
```

**Gate to proceed:** baseline file exists with real numbers in it.

---

## Task 1: Dark hero — background, text, and CTA

The hero's right panel is already dark (navy gradient). This task flips the
left half too, so the whole hero is one dark band.

**Files:**
- Modify: `preview/index.html` — hero wrapper and left column (≈L709-741)
- Modify: `preview/index.html` — hero CSS if needed (≈L436-470)

**Step 1: Flip the hero background**
Change the hero's outer `<div class="bg-white">` to the dark navy used by
existing dark sections (`bg-navy-950`).

**Step 2: Flip the text colours**
- Eyebrow: `text-grey-600` → `text-navy-100/80` (the established dark-surface
  eyebrow token).
- H1: `text-navy-950` → `text-white`.
- Lead paragraph: `text-navy-700` → `text-navy-100/90`.
- Regulator line: `text-grey-600` → `text-navy-100/70`.

All four target tokens are already in use on the site's existing dark
sections and are already AA-verified there.

**Step 3: Switch the Call button to the dark-surface variant**
The current `btn-primary` (navy fill) is invisible on navy. Change the hero
Call button to `btn-inverse` (white fill, navy ink) — the locked button rule
names this as the correct variant on dark surfaces. A white button on dark
navy has *higher* contrast and visual pop than navy-on-white, so CTA
prominence improves rather than holds.
- `class="btn btn-xl btn-primary btn-full"` → `class="btn btn-xl btn-inverse btn-full"`
- Keep `btn-xl` (size unchanged), keep the phone icon, keep `data-track`,
  keep the `tel:` href. Nothing about the click target changes.

**Step 4: Bolder hero headline**
Increase the H1 weight one step (`font-semibold` → `font-bold`) and bump the
fluid size token up one step if the scale allows. Type only — no layout move.

**Step 5: Verify contrast**
Run: `python3 scripts/contrast_audit.py`
Expected: `Failures: 0`. If any hero element fails, adjust the token before
proceeding — do not ship a failing state.

**Step 6: Verify CTA prominence**
Confirm the Call button's contrast against the dark hero is **greater than or
equal to** the Task 0 baseline number. White-on-navy will exceed it; record
the new number.

**Step 7: Visual check**
Screenshot the hero at 1440px and 390px. Confirm: headline readable, button
obvious, no copy changed, no second CTA appeared.

**Step 8: Commit**
```bash
git add preview/index.html
git commit -m "Visual: dark hero — navy background, inverse Call button, bolder H1"
```

**Gate to proceed:** contrast 0 failures; Call-button contrast >= baseline;
no copy or CTA structural change in the diff.

---

## Task 2: Image inside the right hero panel

Replaces the geometric watermark + wordmark composition with a real
photograph, contained inside the existing right-side panel (not a full-bleed
background — keeps the left side text-led and fast).

**Blocked until:** the client supplies or approves a specific image. Not a
portrait of the practitioner (hard rule). Sourcing options can be prepared in
parallel; this task does not start without the chosen asset.

**Files:**
- Add: `preview/<hero-image>.avif` (and a `.webp` / `.jpg` fallback)
- Modify: `preview/index.html` — right panel markup (≈L743-762)
- Modify: `preview/index.html` — `<head>` preload (≈L18-24)

**Step 1: Prepare the asset**
Export the chosen image at the panel's real rendered size (roughly 2x for
retina — about 1100px wide is enough). Encode as AVIF with a WebP fallback.
**Target: under 150KB.** Oversized hero images are the single biggest threat
to LCP and therefore to bounce — this budget is not optional.

**Step 2: Replace the panel content**
Swap the watermark `<svg>` + wordmark block for an `<img>`:
- Explicit `width` and `height` attributes matching the export — this
  reserves space and keeps Cumulative Layout Shift at zero.
- `loading="eager"` and `fetchpriority="high"` — it is above the fold; it
  must not be lazy-loaded.
- A meaningful `alt` (the image is decorative-adjacent; short factual alt).
- Keep the panel's `rounded-md` and aspect ratio.

**Step 3: Preload the image**
Add `<link rel="preload" as="image" href="/<hero-image>.avif" type="image/avif">`
to `<head>` so it starts downloading immediately.

**Step 4: Verify speed**
Run Lighthouse again against staging after deploy (Task 4 deploys it).
Expected: **LCP no worse than the Task 0 baseline; CLS still ~0; Performance
score not lower.** If LCP regressed, the image is too heavy — recompress or
reconsider. This is a hard gate.

**Step 5: Verify contrast**
Run: `python3 scripts/contrast_audit.py` → `Failures: 0`. The wordmark text
that sat over the panel is being removed, so this should be neutral or better.

**Step 6: Commit**
```bash
git add preview/<hero-image>.avif preview/<hero-image>.webp preview/index.html
git commit -m "Visual: real photograph in hero right panel (optimised, preloaded)"
```

**Gate to proceed:** LCP <= baseline; CLS ~0; contrast 0 failures.

---

## Task 3: One additional dark accent section

Per the client's Q3 decision — dark hero + accent sections + footer, content
stays light. The build today has two dark sections. This adds one more so the
page reads with the weight the client wants, without going "mostly dark"
(which would hurt readability on the long content and raise bounce).

**Files:**
- Modify: `preview/index.html` — the "How to instruct Astons Law Chambers
  directly" section (≈L838 area)

**Step 1: Pick the section**
The "How to instruct" section is the recommended target — it sits between two
light sections, so flipping it gives grouped tonal rhythm without alternating
banding. Do NOT flip the fees table, the FAQs, or practice-area detail —
long-form content reads faster and bounces less on light.

**Step 2: Flip it to dark**
Apply the same dark-section pattern the build already uses: `bg-navy-950`,
light text tokens, and if there is a CTA inside, the `btn-inverse` variant.

**Step 3: Verify contrast**
Run: `python3 scripts/contrast_audit.py` → `Failures: 0`.

**Step 4: Verify no CTA lost prominence**
If the section contains a conversion link, confirm its contrast and size are
>= baseline.

**Step 5: Commit**
```bash
git add preview/index.html
git commit -m "Visual: dark treatment on the 'how to instruct' section"
```

**Gate to proceed:** contrast 0 failures; any CTA inside still prominent.

---

## Task 4: Full regression gate + deploy

**Files:** none changed — this is verification only.

**Step 1: Contrast**
Run: `python3 scripts/contrast_audit.py` → `Failures: 0`.

**Step 2: CTA checklist** — manually confirm every conversion path is intact:
- [ ] Hero Call button: `tel:+447922247999`, present, prominent
- [ ] Sticky pill: Call + WhatsApp, present
- [ ] Police emergency strip: Call link present
- [ ] Booking module: cal.com link present
- [ ] Final CTA strip: Call / WhatsApp / Book all present
- [ ] Footer: Call + WhatsApp present
- [ ] Practice-area asides: Call / WhatsApp / Book present

**Step 3: Speed**
Deploy to staging (`vercel --scope dsgnly --yes`), then run Lighthouse on the
live staging URL. Expected: Performance, LCP, CLS, Accessibility all >=
baseline.

**Step 4: Visual review**
Screenshot home, a practice-area page, /fees, /contact at 1440px. Confirm
content sections are still light, the dark sections are intentional and
grouped, no copy changed.

**Step 5: Compare to baseline**
Fill the verification table below. Every row must pass.

**Step 6: Commit any final adjustment, then deploy**
```bash
git add -A
git commit -m "Visual adjustment pass complete — regression gate passed"
git push
vercel --scope dsgnly --yes
```

---

## Verification table (filled at Task 4)

| Metric | Baseline (Task 0) | After change | Pass? |
|---|---|---|---|
| Contrast failures | 0 | must be 0 | |
| Lighthouse Performance | record | >= baseline | |
| LCP | record | <= baseline | |
| CLS | record | <= baseline | |
| Accessibility score | record | >= baseline | |
| Hero Call-button contrast | record | >= baseline | |
| CTA checklist (7 items) | all present | all present | |
| Copy diff | n/a | zero copy changes | |

If any row fails, the failing task is reverted before deploy.

---

## Rollback

Each task is its own commit. To undo any single change:
`git revert <task-commit-sha>` then redeploy. Because the tasks are
independent (dark hero, image, accent section), one can be rolled back
without disturbing the others.

Full rollback to the pre-change state: `git revert` the range, or
`git checkout <baseline-commit> -- preview/index.html`.

---

## Post-launch monitoring (after production cutover, not staging)

The only true conversion measurement is live traffic. Once this reaches
production `astonslaw.com`:

1. Watch GA `call_click` events for 7 days against the prior 7-day rate.
2. Watch bounce rate on the home page for the same window.
3. **Rollback trigger:** if `call_click` rate drops more than 5% week-on-week
   with no other explanation, revert the visual pass and investigate. A 5%
   threshold is used because day-to-day GA noise on low call volumes can
   exceed 1%; a real regression shows as a sustained drop, not a single day.

This is the honest version of "don't let the metric drop": we cannot prove it
pre-launch, but we can detect it fast post-launch and undo it in minutes
because every task is a clean, separate commit.

---

## Sequencing summary

| Order | Task | Blocked by | Ships when |
|---|---|---|---|
| 1 | Task 0 — baseline | nothing | immediately |
| 2 | Task 1 — dark hero | Task 0 | gate passed |
| 3 | Task 3 — dark accent section | Task 1 | gate passed |
| 4 | Task 2 — hero image | client supplies image | gate passed |
| 5 | Task 4 — regression gate + deploy | Tasks 1-3 (2 if ready) | all rows pass |

Tasks 1 and 3 can ship together without the image. Task 2 joins whenever the
client provides the asset — it is not on the critical path for the dark-look
change the client asked for.
