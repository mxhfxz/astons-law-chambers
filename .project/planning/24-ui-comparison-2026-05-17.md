# UI comparison — new build vs www.astonslaw.com

Written 2026-05-17.

## Why this exists

The client said he prefers how the current live site (`www.astonslaw.com`)
looks. The new build works better — stronger conversion structure, accurate
copy, cleaner accessibility — but it looks less appealing to him. This
document compares the two on visual design only, identifies what is driving
his preference, and lays out how to close the gap without losing the
functional and marketing improvements.

Scope is the two sites only. No outside references.

## Method

Full-page desktop screenshots of both home pages, captured headless at
1440px wide. Mobile screenshots were attempted but the browser tool
rendered them at desktop width — a tooling limitation, not a site fault.
The new build's responsive behaviour is already verified separately. The
desktop comparison is enough to characterise the difference, because the
difference is about overall visual character, not breakpoint behaviour.

---

## The core difference, in one paragraph

The live site is **dark, photographic, dense, and punchy**. It opens on a
near-black hero with a large dusk photograph of the London skyline and a
big bold white headline. It uses dark cards, dark sections, photography in
several places, and a row of large stat numbers. It reads like a
marketing-agency build.

The new build is **light, typographic, restrained, and airy**. It opens on
a white hero with a navy headline and a small geometric panel — no
photograph. It keeps dark sections surgical (two of them), uses generous
whitespace, and carries no photography at all. It reads like an editorial
or professional-services site.

The client is responding to the first character. Most of that response
traces to three things, in order of weight: the **dark atmospheric hero**,
the **use of photography**, and the **overall visual weight** (more dark,
more density).

---

## Difference table

| Element | Live site (astonslaw.com) | New build (alc-staging) |
|---|---|---|
| Hero background | Near-black, large dusk photo of London skyline | White, no photo |
| Hero right side | The photograph fills it | Small geometric / gradient watermark panel |
| Hero headline | Large, very bold, white | Large, semibold, navy |
| Hero mood | Cinematic, urgent, atmospheric | Calm, measured, editorial |
| Section below hero | Dark "Don't Face The Law Alone" — 3 dark cards | Red police-custody emergency strip |
| Credibility stats | Big row: 100+ / 100% / 24/7 / 10+ yrs | None |
| Photography | Several sections carry photos (cityscape, dark atmospheric) | Zero photographs anywhere |
| Tonal rhythm | Predominantly dark across the page | Mostly white / off-white; 2 dark sections |
| Visual density | Dense — many elements, tight packing | Airy — generous whitespace |
| Type treatment | Bold, punchy, marketing register | Editorial, measured |
| Accent colour | Red/orange highlight | Red (reserved for emergency) |
| Overall genre read | Marketing-agency site | Barrister's chambers / editorial |

---

## What is driving the client's preference, ranked

1. **The dark, atmospheric hero.** First thing on the page. Dark reads as
   substantial and serious to most viewers; a white editorial hero can
   read as "unfinished" to someone not trained in design. This is the
   single biggest lever.
2. **Photography.** The live site has real images. The new build has none.
   Absence of imagery is probably the second-biggest reason it feels
   "less designed" to him.
3. **Visual weight.** The live site is dark and dense throughout. The new
   build is light and airy. Airy is a deliberate choice; to an untrained
   eye it can read as empty.
4. **Bold type.** The live hero headline is heavier and more dramatic.
5. **The stat numbers.** 100+ / 100% / 10+ yrs give a quick hit of
   credibility. The new build has nothing equivalent.

---

## What the new build does better — and must keep

These are the functional and marketing improvements. None of them should
be sacrificed to make the site look more like the live one:

- **One hero call-to-action — Call.** The live site splits attention
  (Message us button competes). The new build keeps Call as the single
  primary action. Calls are the KPI.
- **Reader-state-first hero copy.** "Whatever stage the case is at..."
  speaks to the defendant's situation. The live headline is firm-described.
- **The police-custody emergency strip** and the **"Before you call"**
  callout — both are conversion mechanisms the live site lacks.
- **Accurate copy.** No unverified stats, no marketing-speak headlines
  ("Don't Face The Law Alone", "A Proactive Approach", "Legal Excellence
  Built In The Field"). Every claim on the new build is verified or flagged.
- **A real /contact page, a complaints procedure, FAQs** anchored to UK
  criminal law.
- **WCAG AA contrast**, verified by an automated audit.
- **Clean conversion structure** and page order.

The goal below is to make the new build *feel* like the live site without
giving any of this up.

---

## Alignment options

Each option says what it changes, the visual gain, what it preserves, what
it costs, and whether the client must decide.

### Option A — Dark hero treatment (highest impact, lowest cost)

**Change:** Flip the hero section from a white background to dark navy.
Keep the exact headline, the lead paragraph, the single Call CTA, and the
regulator line. White text on navy, the same way the existing dark
sections already work.

**Visual gain:** High. This is the single biggest perceived-quality lever
and it directly addresses reason #1 above.

**Preserves:** All copy. The single-CTA structure. The reader-state lead.
Everything functional.

**Cost:** Re-run the contrast audit (the build already has compliant dark
sections, so this is low-risk). A dark background alone does not need a
photograph and does not break the "no large hero image" rule.

**Client decision needed:** Yes / no on a dark hero.

### Option B — A real hero image (high impact, needs an asset + a rule call)

**Change:** Replace the geometric watermark panel with an atmospheric
photograph. **Not a portrait of the practitioner** — that is a hard rule
that does not change. Candidates: a London court building (the Royal
Courts of Justice, a Crown Court exterior), an architectural or abstract
dark image, or a textured dark composition.

**Visual gain:** High. Addresses reason #2 — the missing photography.

**Preserves:** Everything functional.

**Cost:** Needs a real image asset, either licensed or commissioned. This
**overrides a rule recorded in the project brief** — "no large hero images
above the fold." That rule was set deliberately; the client can override
it, but it should be a conscious decision, not a drift. Also: a generic
stock London skyline (which is exactly what the live site uses) makes the
site look like every other law firm. If we add a hero image it should be
specific and considered, not stock filler.

**Client decision needed:** Yes / no on a photographic hero, and if yes,
agreement on which image. This is the biggest open decision in this
document.

### Option C — More visual weight (medium impact, low cost)

**Change:** Convert one or two more sections to dark navy — for example
the "How to instruct Astons Law Chambers directly" section. Take the page
from two dark sections to three or four, grouped intentionally rather than
alternated.

**Visual gain:** Medium. Addresses reason #3 — the page reads light and
airy; more dark gives it heft.

**Preserves:** Everything.

**Cost:** This pushes against the "surgical banding, never alternating"
rule in the brief. Done as deliberate grouped dark sections — not a
white / grey / white / grey rhythm — it stays on the right side of that
rule. Contrast re-audit needed.

**Client decision needed:** A general steer on how dark he wants the page
overall.

### Option D — Bolder hero typography (low impact, trivial cost)

**Change:** Increase the hero headline size and weight a step.

**Visual gain:** Low to medium. Supports reasons #1 and #4.

**Cost:** Trivial. No functional impact.

**Client decision needed:** Minor — can be bundled with Option A.

### Option E — A credibility beat (handle with care — NOT the live site's stats)

**Change:** The live site's "100+ cases / 100% confidentiality / 10+ yrs"
row should **not** be copied — those are unverified template numbers and
"100% confidentiality" is close to marketing-speak. But a single honest,
verified credibility line (for example, years in practice, once the client
confirms the figure) could give some of the same quick-credibility hit.

**Visual gain:** Low to medium.

**Cost:** Depends entirely on the client verifying real numbers. Until he
does, this stays off.

**Client decision needed:** Whether he wants a credibility beat at all,
and if so, supplying verified figures.

### Option F — Imagery in lower sections (medium impact, needs assets)

**Change:** Add one or two atmospheric images to content sections lower
down the page — not the hero.

**Visual gain:** Medium. Reinforces reason #2.

**Cost:** Needs image assets. Lower priority than the hero.

**Client decision needed:** Bundle with Option B.

---

## Recommended sequence

If the client wants to move on this, the order that delivers the most
perceived-quality improvement for the least risk:

1. **Option A — dark hero.** Do this first. Biggest visible change, no
   asset needed, no copy change, no functional risk. It alone will shift
   the client's first impression substantially.
2. **Option D — bolder hero type.** Bundle with A. Trivial.
3. **Option C — more dark sections.** Adds weight once the hero is dark so
   the page reads as one considered system.
4. **Option B — hero image.** Only once the client has decided on the
   image. This is the item that needs a real asset and a conscious
   override of the no-hero-image rule.
5. **Option F — lower-section imagery.** After B, if more is wanted.
6. **Option E — credibility beat.** Only if and when the client supplies
   verified numbers.

Options A, C, D can all ship in one pass and would be contrast-audited
together. B, E, F each depend on the client providing something (an image
decision, verified numbers).

---

## Decisions needed from the client

1. **Dark hero — yes or no?** (Option A. Recommended yes.)
2. **Photographic hero — yes or no?** If yes, this overrides the
   no-hero-image rule in the brief, and we need to agree on the specific
   image. (Option B.)
3. **How dark overall?** A steer on whether he wants the page noticeably
   darker / denser, or just the hero. (Option C.)
4. **A credibility beat?** If yes, he needs to supply verified figures —
   no template numbers. (Option E.)

Nothing in this document has been built. It is a comparison and a menu.
The next step is the client picking from the four decisions above.

---

## One honest note

The new build was made deliberately restrained because the project brief
called for it — no marketing-speak, no large hero images, surgical dark
sections, entity-first voice. The client's preference for the live site is
legitimate, and he is entitled to override those brief decisions. Options A,
C, and D can be done while still respecting the no-marketing-speak and
accuracy rules. Option B is the one that genuinely reverses an earlier
brief decision, so it should be an explicit, recorded choice. The functional
and marketing improvements in the "must keep" section above are separate
from all of this and should survive whatever visual direction is chosen.
