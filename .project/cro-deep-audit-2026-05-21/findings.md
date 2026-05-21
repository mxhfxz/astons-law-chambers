# Findings — Deep CRO Audit, Astons Law Chambers (2026-05-21)

Source: live `astonslaw.com` + codebase + 3 Playwright screenshots in this
folder (mobile home, desktop home, mobile criminal-defence).

Tags used:
**Impact**: H = directly affects whether the visitor calls; M = affects
calling at the margin; L = polish.
**Effort**: H = >1 day of build + verify; M = a few hours; L = <1 hour.
**Risk**: 🚩 = touches a BSB / verified-fact constraint, route to user.
**Skill cite**: which loaded skill the finding draws from.

---

## 0. Executive summary — the five things that matter most

| # | Finding | Page | Impact | Effort |
|---|---------|------|--------|--------|
| **F1** | Consent modal eats the entire above-the-fold on every page until dismissed | global | **H** | M |
| **F2** | Hero H1 buries the action verb behind a long compound phrase; on mobile + desktop the *first* visible word the visitor reads after dismissing consent is "Speak", not "Call" | homepage | **H** | L |
| **F3** | Two competing "police station" red signals stack in the top viewport (sticky banner + emergency-coloured eyebrow on the police card); attention splits, neither dominates | homepage | M | M |
| **F4** | Sticky pill exists on mobile but doesn't show until ~600px of scroll; the highest-stakes audience (in custody) lands and sees *no* visible call action until they scroll past consent + hero | global | **H** | L |
| **F5** | The fees page leads with an indicative-range table and treats "legal aid" as an afterthought paragraph; defendant-in-crisis fees research is typically "can I afford this *right now*" — the page answers "what could it cost over the life of the case" | fees | M | M |

The audit below catalogues everything else but everything else is downstream
of these five.

---

## 1. Global chrome

### F1 — Consent modal blocks the entire above-the-fold on every page (CONFIRMED VIA SCREENSHOT)
**Impact: H · Effort: M · Risk: regulatory ✓ (UK PECR/UK-GDPR require consent gating, but the *implementation* is what's costing conversions)**

**Current:** Screenshots `home-mobile-fold-*.png` and `crim-defence-mobile-fold-*.png` show CookieYes rendering a centred modal that, at 375px wide, *covers the H1, lead, and primary CTA*. At desktop the same modal sits dead-centre and covers the H1 mid-word ("Speak to a barrister be[fore the] police inter[view]"). Until the visitor taps Accept All / Reject All / Customise — three options of roughly equal visual weight — there is *no rendered conversion path*. The police banner above the navbar is the only tap-to-call signal that survives.

**Why it kills conversion (page-cro: friction; BJ Fogg model: prompt without the conversion target visible; marketing-psychology: Hick's Law — 3 equally-weighted choices in a high-stress state):** the visitor's first cognitive task is "which of these consent buttons do I click" instead of "how do I get help". This is exactly the *opposite* of what a defendant-in-crisis page must do. The visitor has just typed `police interview lawyer london` into a phone at 11pm and the first thing they see is a privacy disclosure, not a phone number.

**Recommendation (a–d, choose with user — 🚩 a regulatory decision so route back to client):**
  - **(a, recommended)** Switch CookieYes from a modal to a *bottom-anchored bar* on first load (CookieYes supports this layout). Bar covers ~88px on mobile, doesn't obscure the H1, doesn't cover the in-banner phone number, doesn't replace the sticky pill.
  - **(b)** Keep the modal but render it *below* the police banner, with the police banner kept tappable above it (z-index swap). Less ideal — still visually competes with the H1 — but legally identical.
  - **(c)** Keep modal, but render the police banner + a single sticky "Call now" button on top of the modal overlay so the highest-stakes action survives a non-dismissed consent.
  - **(d)** Reduce default consent surface: pre-check only "necessary", keep advertising/analytics off until *explicit* consent — then the modal can be lighter ("we use cookies; details") with a single button + "Manage" link rather than three buttons. UK ICO guidance is met as long as non-essential is opt-in; the visual weight of the surface is up to the implementer.

**Skill cite:** page-cro (friction), marketing-psychology (Hick's Law, activation energy), avoid-ai-writing (`leverage cookies` → not present, good).

---

### F6 — Sticky pill is hidden until ~600px of mobile scroll
**Impact: H · Effort: L**

**Current:** `hooks/useStickyBarVisibility.ts` (per `_START_HERE.md` Phase 1) shows the sticky pill only after the visitor passes a scroll threshold. On the homepage at 375px the visitor must scroll *through* the consent modal, dismiss it, *then* scroll past the hero, *then* the pill appears. For the in-custody caller this is wasted attention.

**Recommendation:** show the pill from t=0 on routes where a panic-call is plausible: `/`, `/police-station-representation`, `/practice-areas/criminal-defence`, `/practice-areas/violent-crimes`, `/practice-areas/drug-offences`. Keep the scroll-threshold behaviour on cold pages (fees, about, timescales, privacy). One-line change in the hook to accept a `route` argument and route table.

**Skill cite:** page-cro (CTA placement), awareness-stage-mapper (peripheral route — show one persistent cue).

---

### F7 — Sticky header has two stacked red surfaces on hover/scroll states
**Impact: M · Effort: L**

**Current:** Sticky header is navbar (white) + police banner (red). Header is sticky, banner is in normal flow with it. On a long scroll the police banner stays pinned. That is structurally fine and per the `homepage-cro-2026-05-19` spec. But on the homepage the police *card* (grey container with red eyebrow + red CTA) sits ~300px below the pinned red banner — so once the visitor scrolls into the card, two red areas are simultaneously on screen: pinned red banner up top, red card eyebrow / red CTA below. Attention splits.

**Recommendation:** the police *card* eyebrow already uses `text-emergency-600`. Demote it to `text-grey-600` so the only red on screen is the sticky banner and the *primary* CTA button inside the card (the actual tap-target). The eyebrow becomes calm; the CTA stays red; the banner stays red; the red signal becomes a hierarchy, not a chorus.

**Skill cite:** frontend-design (surgical banding), marketing-psychology (peak-end / visual peak should match the highest-stakes action, not a section label).

---

### F8 — The header "Book a call" + "Call now" pair gives equal visual weight to a tertiary KPI
**Impact: L · Effort: L**

**Current:** Header has `btn-sm btn-secondary` "Book a call" and `btn-sm btn-primary` "Call now" side by side. Visual weight of `btn-secondary` (white with navy border) is high enough that it competes with primary.

**Recommendation (test, not assume):** in the header, demote "Book a call" to a text link (`text-base text-navy-950 underline`) and keep "Call now" as the sole header button. The Cal.com booking path is already heavily promoted on the homepage booking module and the contact page; it does not need parity in the persistent header. The visitor in crisis benefits from one obvious header action.

**Skill cite:** page-cro (CTA hierarchy — primary vs secondary).

---

### F9 — Footer phone number is not a `tel:` link visually distinguished from the rest of the footer
**Impact: L · Effort: L**

**Current:** Footer phone is wrapped in `<a href="tel:…" class="text-white hover:text-navy-100">07922 247 999</a>` — it's tappable but it doesn't *look* tappable on the dark footer (no underline, low contrast at hover). Sample any non-tech visitor and the number reads as a piece of address copy.

**Recommendation:** add `underline underline-offset-4 decoration-1` or a tiny phone icon. Tiny lift, but cumulative.

**Skill cite:** mobile-design (tap affordances).

---

## 2. Homepage

### F10 — H1 leads with "Speak to a barrister" — verb-first but the verb is wrong for the audience state
**Impact: H · Effort: L**

**Current:** "Speak to a barrister before the police interview." Verb-first, no hedging, BSB-safe, entity-first — all good. Two problems for the crisis visitor:
  1. "Speak" is a soft, deliberative verb. The visitor's nervous-system state is *action under pressure*. "Call" is more imperatively aligned with the only action on the page.
  2. The H1 assumes police-interview context. ~60% of the audience model is in that frame, but ~40% (post-charge, summons, voluntary interview already taken, family member of someone in custody) reads "before the police interview" as "this isn't for me". The H1 narrows the door.

**Recommendation — A/B candidates, pick one for staging then test:**
  - **(a)** "Call a barrister before the police interview." (verb shift only — minimal risk)
  - **(b)** "A barrister you can call now, before the police interview." (preserves entity-first frame, widens to include all stages because "now" implies immediate availability, not a stage)
  - **(c)** "Speak directly to a criminal defence barrister." (drops the police-interview specifier — wider audience but loses the strongest peak)

**Note:** the SEO session (2026-05-19) re-introduced "criminal defence lawyer" into body copy after analytics tied an ~1800% lift to the phrase. The H1 currently says "barrister" only. (c) realigns to the SEO finding without contradicting it. Decision routes to the user — flag.

**Skill cite:** page-cro (headline patterns: outcome- or action-led), marketing-psychology (loss aversion: "before the interview" is loss-framed and effective — preserve it where possible), copywriting + avoid-ai-writing.

---

### F11 — Hero lead carries the only "available 24/7" claim above the fold, but the *visual* peak is the headline, not the claim
**Impact: M · Effort: L**

**Current:** Lead says "…Astons Law Chambers acts as a criminal defence lawyer and takes instructions direct. Available 24/7 for police station support." 24/7 is the single most conversion-relevant phrase in the practice's positioning (per memory `verified_facts`), and it's the 14th word of a 32-word lead.

**Recommendation:** front-load. "Available 24/7 for police station support. Astons Law Chambers takes instructions direct — police station, first hearing, trial, appeal." Now 24/7 is read first, *and* the lead stops with a parallel-noun list that scans faster than the current relative clause.

**Skill cite:** copywriting (front-load the most conversion-relevant phrase), avoid-ai-writing (chops the "Whatever stage the case is at —" opener which is a soft hedge).

---

### F12 — Two CTAs in the hero, both `tel:`, identical destination, different sizes — second CTA is decorative
**Impact: M · Effort: L**

**Current:** Hero stack on mobile is `Call now` (btn-xl btn-inverse) + `24/7 police station support` (btn-lg btn-on-dark). Both link to `tel:+447922247999`. The second button is a label dressed as an action; it reads "press here for the same thing".

**Recommendation:** keep one. Replace the second with either:
  - A *different* action: `Message on WhatsApp` (the second KPI conversion).
  - Or a calm copy line under the primary CTA: "Calls answered 24/7 from custody." No button — just the trust frame.

The current pattern doubles tap-area but halves perceived choice. Defendant-in-crisis prefers one obvious action.

**Skill cite:** page-cro (CTA hierarchy), marketing-psychology (paradox of choice — two near-identical CTAs feel less decisive than one).

---

### F13 — Hero right column carries a London-skyline image with no functional role
**Impact: L · Effort: M**

**Current:** Hero right column (≈40% of width on desktop) is a 720×656 webp of the City skyline at dusk. It's preloaded with `fetchpriority="high"`, so it costs nothing on LCP. But it costs everything on cognitive prioritisation: the visitor's eye is pulled to a stock-architecture photo while the action lives in the text column. On mobile the image is below the H1+CTA stack, which is correct.

**Recommendation (route to client):** test **removing** the image on desktop and letting the headline + CTAs occupy the full content column. The hero panel space becomes a calm grey block carrying the regulator line + one trust signal (e.g. "Regulated by the Bar Standards Board · BMIF professional indemnity · Direct Access authorised"). For a crisis page, "calm and competent" beats "atmospheric". Image-as-trust-signal only works for product categories where ambient mood is part of the buy — luxury, hospitality, lifestyle. Criminal defence is not in that category.

**Skill cite:** page-cro (visual hierarchy — images should support, not distract), marketing-psychology (authority cues outperform mood cues in high-stress decision contexts).

🚩 *Image is a client decision — propose the test, don't ship.*

---

### F14 — Police card body line "Ask the custody sergeant not to begin the interview until representation is in place" is the most valuable sentence on the homepage, but it's buried inside paragraph text
**Impact: M · Effort: L**

**Current:** This is a vetted free instruction. It's the one piece of *take-this-action-right-now* utility on the page. Currently styled as the third sentence of a body paragraph.

**Recommendation:** promote it. Split the police card body into two layers:
  1. Lead sentence: "Police station attendance is available 24 hours. Calls from custody are answered direct."
  2. *Action line, styled prominently* (e.g. `font-semibold text-navy-950 border-l-2 border-emergency-500 pl-3 mt-3`): "Ask the custody sergeant not to begin the interview until representation is in place."

The action line becomes the *peak* of the card. It signals competence (the practice tells you what to do *before* you've paid them) and reduces the cognitive load of the call itself (the caller now has one specific thing to say to the sergeant).

**Skill cite:** marketing-psychology (reciprocity — give first), page-cro (objection handling: "what do I even say if I get through?"), peak-end rule.

---

### F15 — "What to do now" 3-card section reuses the same `bg-offwhite` card pattern as the police card directly above — visual stutter
**Impact: L · Effort: L**

**Current:** Police card and the 3 situation cards use the same `bg-offwhite border border-grey-300 rounded` shell. Four near-identical card silhouettes stack vertically on mobile.

**Recommendation:** differentiate. Either:
  - Police card stays `bg-offwhite`; situation cards drop to `bg-white border-grey-300` (less weight, since they're the secondary content).
  - Or vice versa.
  - Or use a divider line + numbered eyebrow on the 3-card section so they read as a *list of situations*, not a row of cards. Combined with F14's promotion of the police card, the visual hierarchy becomes: red banner → police card with action line → numbered list of common situations → defence work grid.

**Skill cite:** frontend-design (visual hierarchy, repetition without rhythm = stutter).

---

### F16 — "What to do now" cards have a structural inconsistency: cards 1 + 2 carry a free-guide CTA, card 3 doesn't
**Impact: M · Effort: L**

**Current:** Card 1 (arrested) → guide PDF box + police-station link. Card 2 (interview) → guide PDF box + police-station link. Card 3 (charged) → police-station link only, *no* guide. The visual rhythm breaks on the last card; the visitor scanning the row gets two strong cards and a weaker third.

**Recommendation (a or b — route to client):**
  - **(a)** Add a third guide ("What to expect at your first hearing") and link from card 3. Most defensible CRO outcome — symmetry restored, all three cards do the same job, and a first-hearing guide is high-utility content for the audience. ⚠ requires Ghulam to produce/sign-off a third guide.
  - **(b)** Remove the guide CTAs from cards 1 and 2; promote them to a separate "Free guides" section *below* the 3-card row so the row reads as pure self-selection. Lower-risk, lower-utility, doesn't expand content debt.

**Skill cite:** page-cro (scannability — rhythm), marketing-psychology (goal-gradient — completing a 3-step row of identical actions feels finished; the broken row feels unfinished).

🚩 *Recommendation (a) requires a client commitment to new content. Propose, don't ship.*

---

### F17 — Defence work grid mixes "case type" cards (Violent, Drug, Driving, Youth) with "stage of proceedings" cards (Police Station, Appeals, Inquests) and one umbrella card (Criminal Defence) — visitor can't form a mental model of the rows
**Impact: M · Effort: L**

**Current:** 8 cards on a 3-wide grid. No grouping. "Criminal Defence" is a card *and* a parent category that encompasses several other cards. "Police Station Representation" is a stage card (not a case type). The mega menu *does* group these correctly ("By case type" / "By stage of proceedings"); the homepage grid doesn't.

**Recommendation:** apply the mega-menu taxonomy to the homepage grid. Either:
  - Two sub-grids with headings: "By case type" (4 cards) / "By stage of proceedings" (3 cards + Criminal Defence umbrella absorbed into the section H2).
  - Or keep one grid but order it stage→type→stage so the visitor can see grouping by reading down the columns.

**Skill cite:** awareness-stage-mapper (visitor at solution-aware stage maps "what is wrong with me" → "what do you do about it"; the grid currently mixes those two ontologies and forces the visitor to do the mapping).

---

### F18 — Booking module sits below the practice areas grid and the dark Direct Access section — by the time the visitor reaches it they've scrolled past every other conversion path
**Impact: M · Effort: M**

**Current:** Booking module is the 6th block from the top on desktop. The Cal.com facade is the only on-page conversion that asks the visitor to *commit* to a time, which is the highest-friction action of the three KPIs. Putting it last is conventional, but for a crisis-then-deliberation audience model it should arrive *before* the visitor has decided not to call.

**Recommendation (test, not assume):** move the booking module *above* the dark Direct Access section. The visitor who reaches it has scrolled past the 3-card situation row (acute crisis: serviced), the practice-areas grid (case-type self-selection: serviced), and now the next sensible step is either "book a calmer call" or "read on about Direct Access". Currently the visitor reaches Direct Access *before* the booking option, which encourages them to keep reading rather than convert.

**Skill cite:** page-cro (CTA repetition at decision points), marketing-psychology (theory of constraints — the bottleneck is the visitor deciding to book, not deciding to read about Direct Access).

---

### F19 — Final contact strip H2 "Speak to someone today" softens the verb and the timeframe
**Impact: L · Effort: L**

**Current:** "Speak to someone today." Three problems:
  1. "Someone" — the visitor wants to speak to *the* barrister, not someone.
  2. "Today" — the practice's positioning is 24/7. "Today" undershoots it.
  3. "Speak" again — same softness as F10.

**Recommendation:** "Call Astons Law Chambers now." Or "The phone is answered. Call 07922 247 999." (Echoes the verified-facts entity-first rule and front-loads the action.)

**Skill cite:** copywriting (verb strength), avoid-ai-writing (replaces vague "someone" with the specific entity), marketing-psychology (concreteness aids recall).

---

## 3. Practice Area detail template (applies to all 8 PA pages)

### F20 — Inline fee strip at the top is great CRO; the order of its 4 cells reads "fee schedule first, lowest stakes first" — flip it
**Impact: M · Effort: L**

**Current:** `pa-detail.html` ll. 48–66 — order is Hourly · First appearance · Single day hearing · Trial brief fee. Visitor at panic stage reads top-left first; "Hourly £175–£400" is the most abstract / most-anchoring-to-an-uncertain-total of the four. "First appearance £500–£1,500" is the most decision-relevant ("can I afford the first hearing").

**Recommendation:** reorder to First appearance · Single day hearing · Hourly · Trial brief. Move hourly to position 3 — it's the rate, not a unit cost; the visitor cares about it second, after the unit costs that bound the immediate decision.

**Skill cite:** marketing-psychology (anchoring — show the most actionable price first), page-cro (objection handling: "what do I owe to get started").

---

### F21 — "Police station urgency callout" on PA detail is dark navy; on PA pages where it's hidden (PA without `policeStation` field), the page loses a re-CTA between the hero and the body
**Impact: L · Effort: L**

**Current:** `pa-detail.html` l. 26 — `data-bind="policeBanner" hidden`. Hidden by default; revealed by binding when a PA has a `policeStation` field. Inquests, Appeals, possibly others don't. Those pages then have hero CTAs → fee strip → body, with no re-CTA between fee disclosure and Q1 of body content. That's where the bookmarker drops off.

**Recommendation:** the *box* should always render with content swapped — call it "Next step" with a calm body line for non-police-station PAs ("Bring any paperwork and the next hearing date to a first call"). Same dark navy treatment, same call CTA. Now every PA page has the visual rhythm: hero → fee strip → next-step box → body.

**Skill cite:** page-cro (CTA repetition at decision points), frontend-design (preserve rhythm across template variants).

---

### F22 — PA page H1 is the practice-area name only (e.g. "Criminal Defence")
**Impact: M · Effort: L**

**Current:** All PA pages render the bare practice-area name as H1. This is fine for SEO (matches search intent) but reads as a category label, not a positioning statement. There's a "situation" paragraph below it that does the positioning work; the H1 itself is dead weight.

**Recommendation (test):** add a subhead between the kicker and the H1, *or* expand the H1 to a sentence. Two patterns:
  - Pattern A: Kicker → H1 ("Criminal Defence") → subhead ("Direct instruction. Police station through trial.") → situation paragraph. SEO still wins because H1 is unchanged.
  - Pattern B: H1 becomes "Criminal defence barrister, instructed direct." (matches the metaTitle already in `lib/practice-areas.ts` — `"Criminal Defence Barrister, London"` — so the user already has a phrasing precedent).

**Skill cite:** page-cro (headline effectiveness), copywriting (categories vs positioning).

---

### F23 — "Before you call" aside content is excellent — and currently lives only in the sticky aside, which is invisible on mobile until the visitor scrolls past the entire main column
**Impact: M · Effort: L**

**Current:** `pa-detail.html` ll. 109–122 — calm pre-call checklist. On desktop sticky-top, fine. On mobile, the aside collapses to *below the main column*, so the visitor sees it only after scrolling through Actions + Process + Direct Access mini + FAQs. By that point either they've converted or they've bounced.

**Recommendation:** on mobile, inline the "Before you call" block *between* the fee strip and the Actions list, not at the end of the page. Same content, ~150px earlier in mobile scroll. The aside on desktop stays as-is.

**Skill cite:** mobile-design (sticky asides degrade poorly on mobile — content order matters more than DOM position), page-cro (friction: reducing anxiety *before* the call lift).

---

### F24 — FAQ block is `<details>`-less; opens are decorative chevrons, content is always visible
**Impact: L · Effort: M**

**Current:** `pa-detail.html` and `police-station.html` use a `<dl>` with `<dt>` carrying a chevron icon, but no actual `<details>` element or JS open/close. Content is always visible. Visually it reads as a long Q-then-A list rather than a true accordion.

**Recommendation:** convert to native `<details>/<summary>`. Or leave open by default but remove the chevron (it's a UI lie). Either fixes the read; native `<details>` is the cheapest fix and accessible by default. Open-by-default accordions are valid CRO (visitor scans, no extra click) — but then the chevron should be removed or rotated to "open".

**Skill cite:** frontend-design (no UI lies — the chevron implies state), mobile-design (scannability).

---

## 4. Fees page

### F25 — Page H1 "Fees and legal aid" and intro paragraph are technically correct but emotionally tone-deaf
**Impact: M · Effort: L**

**Current:** "Fees and legal aid" / "The ranges below are indicative. The actual fee for your case is set out in writing, with VAT identified separately, in a client-care letter before any work is instructed."

The visitor's pre-page question is "can I afford this *right now*". The page answers "we publish ranges and quote in writing", which is true but downstream of the question.

**Recommendation:** lead with a calm framing sentence that names the visitor's actual fear before pivoting to BSB transparency.
"The first call is free. Specific fees are set in writing before any work begins, and indicative ranges are published below for transparency."
Then the table.

**Skill cite:** copywriting (acknowledge the question before answering the policy), marketing-psychology (loss aversion: "free first call" lands before the price list).

---

### F26 — Legal aid section is at the bottom of the body, after every commercial fee block, and reads as a footnote
**Impact: M · Effort: L · 🚩 BSB-relevant**

**Current:** `fees.html` ll. 37–40 — "Astons Law Chambers is not a legal aid contract holder. Where legal aid applies… can refer the case to a criminal defence solicitor at a partner firm…". This is the section a low-income or worried-about-cost visitor reads *first*. It's at the bottom.

**Recommendation:** add a calm legal-aid callout *above* the fee table, treated as factual information rather than a sales position. Two-line max:
"Legal aid: Astons Law Chambers is not a legal aid contract holder. Where legal aid applies, the case is referred to a partner solicitor firm that holds a contract. The first call is free either way."

This serves two CRO goals: (1) it removes the "I can't afford this so I'll bounce" objection at the moment the visitor would form it; (2) it preserves the conversion (the *first call* is the conversion, not the eventual fee).

**Skill cite:** page-cro (objection handling), marketing-psychology (mental accounting — visitor needs to know which "account" their case belongs in before reading prices), legal-advisor (BSB transparency rules favour up-front disclosure).

---

### F27 — "Indicative" ranges are wide enough (£175–£400 hourly, £500–£1,500 first appearance, £1,500–£3,000+ trial brief) that they don't bound the decision; CRO-wise, ranges this wide are a *deferral*, not a disclosure
**Impact: M · Effort: M · 🚩 fee-setting question, not a copy question**

**Current:** Wide ranges are BSB-compliant (the BSB transparency rule requires *publishing* a fee or fee range, not narrowing it). But from the visitor's side the variance is so large that the page doesn't help them decide whether they can afford this case vs another barrister. They have to call to find out — which *is* the conversion goal, so this is arguably the most CRO-aligned line item on the site. The cost: a visitor who *expected* a definite number leaves frustrated.

**Recommendation:** add a worked-example "what a typical [X] costs at Astons" below the table. Three or four examples, real-world frame, BSB-compliant ("typical", "indicative"):
  - "A guilty-plea first appearance in the Magistrates' Court: typically £600–£900 + VAT."
  - "Voluntary interview attendance: typically a single fixed fee around £[X]."
  - "A 3-day Crown Court trial, prepared and represented: typically £4,500–£7,000 + VAT including brief, refresher, and one conference."

This converts ranges into stories. Stories reduce variance perception (peak-end rule + availability heuristic), and the visitor leaves the page with a concrete number to compare against the alternative.

🚩 This recommendation generates copy that asserts specific fee numbers Ghulam has not signed off on. Propose only. Get numbers from the client. The audit does not invent fees.

**Skill cite:** marketing-psychology (mental accounting + availability heuristic), page-cro (objection handling), legal-advisor (BSB transparency).

---

### F28 — Aside "Discuss your fee" is the only conversion CTA on the page and uses btn-md, not btn-lg
**Impact: L · Effort: L**

**Current:** `fees.html` ll. 43–55 — `btn-md btn-inverse` "Call now" + `btn-md btn-on-dark` "WhatsApp" in the sticky aside.

**Recommendation:** btn-lg on the primary call CTA. On a page where the visitor's anxiety peak is *price*, the call CTA needs the visual weight to be the obvious next step. Sticky aside otherwise stays.

**Skill cite:** page-cro (CTA visual hierarchy).

---

## 5. Contact page

### F29 — Hero claim "Calls and WhatsApp messages outside working hours are returned when free" undermines the 24/7 positioning everywhere else
**Impact: H · Effort: L · 🚩 verified-facts conflict**

**Current:** `contact.html` l. 6: "The phone is answered personally. Available 24/7 for police station support. Calls and WhatsApp messages outside working hours are returned when free."

The third sentence directly hedges the 24/7 claim. The visitor reads the third sentence as "outside police station context, you may not get a callback for hours". The site's positioning everywhere else says 24/7 — only the contact page admits the practical truth.

Memory `verified_facts` says "No published reply-time commitment for missed calls or WhatsApp messages" — so the third sentence is *more honest* than the rest of the site. The problem is the inconsistency, not the honesty.

**Recommendation (route to client):** pick one and apply everywhere.
  - **(a, recommended)** Tighten the universal claim to "Available 24/7 for police station support. Other calls answered during working hours, voicemail and WhatsApp returned same-day."
  - **(b)** Remove the third sentence from the contact page, accept that the universal "24/7 for police station support" claim is precisely what the practice does — only police-station calls get the 24/7 commitment, other calls are best-effort. The contact-page extra sentence then becomes redundant.

Either is fine; what's not fine is having two different commitments on two different pages.

🚩 This is a copy decision the client must make. Recommend (a); flag.

**Skill cite:** legal-advisor (consistency in published service commitments), avoid-ai-writing (the soft "when free" is hedge language).

---

### F30 — Contact page has 4 conversion options listed as 4 separate `<section>` blocks (Phone, WhatsApp, Book a call, Address) — visually identical, no hierarchy
**Impact: M · Effort: L**

**Current:** All four sections use the same H2 + paragraph treatment. The address is given equal weight to the phone number.

**Recommendation:** make the phone section visually dominant (larger text on the number itself, e.g. `text-2xl md:text-3xl font-semibold`). Address drops to a smaller block, possibly visually grouped with the regulator line as an "Office" footer-on-page card.

**Skill cite:** page-cro (CTA visual hierarchy on a page whose entire purpose is conversion).

---

## 6. Direct Access page

### F31 — H1 "Direct Access" is the scheme name, not the value to the visitor
**Impact: M · Effort: L**

**Current:** "Direct Access" / "Direct Access is the scheme operated by the Bar Standards Board…"

The visitor likely arrived from "/how to hire a barrister without a solicitor" or "/can I instruct a barrister directly" — search intent is the *action*, not the scheme name.

**Recommendation:** keep H1 as "Direct Access" (SEO and clarity), but add a subhead: "Instruct a barrister directly, without going through a solicitor." (One sentence, mirrors search intent exactly.)

**Skill cite:** awareness-stage-mapper (visitor here is problem-aware shading to solution-aware: "I don't know if I can hire a barrister directly"), copywriting (lead with the visitor's verb, not the scheme name).

---

### F32 — "How long cases take" timescales table is reproduced on this page *and* the dedicated `/timescales` page
**Impact: L · Effort: L · risk: SEO duplicate content**

**Current:** Both `direct-access.html` and `timescales.html` carry near-identical tables. Direct Access is meant to be about Direct Access, not procedural timescales — the table is off-topic on this page.

**Recommendation:** on `/direct-access`, replace the table with a one-line signpost: "Procedural timescales for criminal cases are set out on the [Timescales](/timescales) page." Reclaims ~30% of the page for content closer to the visitor's actual intent.

**Skill cite:** page-cro (scannability — every off-topic block costs scroll), SEO (duplicate-content avoidance — already a 2026-05-19 audit theme).

---

## 7. Police Station Representation page

### F33 — Hero "Representation at the station, before the interview begins." is the strongest H1 on the site
**Impact: 0 · this is positive — preserve**

This is the model for F10 (homepage H1). Verb-implied, outcome-led, BSB-safe, entity-free, audience-aligned. Keep.

---

### F34 — "If someone you know is in custody" 3-step list (l. 38–43) is the most CRO-load-bearing content on the entire site
**Impact: M · Effort: L**

**Current:** The 3-step "Note station → Call → Ask station to hold interview" sequence does for the family-member visitor exactly what F14 does for the homepage police card. It's the calm, competent, give-first content that builds trust *before* the conversion.

**Recommendation:** apply this pattern as a model — wherever a PA page has a custody plausibility (Criminal Defence, Violent Crimes, Drug Offences, Youth Crimes), embed this same 3-step list inline (not just a link to this page). The cost is repetition; the benefit is the visitor doesn't have to navigate to find the *one action* they can take in the next 60 seconds.

**Skill cite:** marketing-psychology (reciprocity, give first), page-cro (objection handling at the moment of decision).

---

### F35 — Emergency-coloured aside box ("If you are at a station now") is the only `bg-emergency-500` block on the page — good
**Impact: 0 · preserve.** Single-source urgency signal on the page. Don't add a second.

---

## 8. About page

### F36 — About page is brand-correct (no portrait, no "Ghulam" front-loading, entity-first) but commercially silent
**Impact: M · Effort: M**

**Current:** Practice / Geography / Address / Regulation. No commercially-relevant content — no "what kind of cases", no "where did the practitioner train", no proof-of-experience signal.

The CLAUDE.md / memory rules forbid fabrication and minimise "Ghulam" usage. They do *not* forbid a credentialing line if the credentials are verified.

**Recommendation (route to client):**
  - Verify with Ghulam: year of call, Inn, any specialist accreditation (Higher Rights, Direct Access certification — already partial 🚩9), prosecution work breadth, notable judicial-instruction count. *Anything verifiable that is currently fabricated by the absence of facts* — the visitor reads "Astons Law Chambers acts in the Crown Court" and has no idea whether the practitioner is 6 months call or 16 years call.
  - Build a single short authority block on the About page using *only* verified content. Treat the block as the one place "Ghulam Humayun" is named in body copy — entity-first rule still holds elsewhere.

🚩 Block content must come from client, not audit. Propose, don't write.

**Skill cite:** marketing-psychology (authority bias — strongest single conversion-relevant trust signal a barrister practice has), page-cro (trust signals near CTAs), legal-advisor (BSB allows factual credentials).

---

## 9. Timescales page

### F37 — Page is BSB-compliant and content-correct; CRO finding is minor
**Impact: L · Effort: L**

**Current:** The page does its job. One CRO improvement available: the page closes with `info@astonslaw.com` (line 72) as the contact for accessibility alternatives — that's the *one* email address on the site, and it appears as the page-end signoff. Defendant-in-crisis won't email; the email contradicts the site-wide "no email funnel" rule by being the visible contact mechanism on the page closer.

**Recommendation:** keep `info@astonslaw.com` for accessibility-format requests (legitimate use), but lead the page closer with the phone number: "This information is reviewed annually. Last reviewed: December 2025. Alternative formats available on request — call 07922 247 999 or email info@astonslaw.com." Phone front, email back-stop.

**Skill cite:** project rule (`feedback_no_email_funnel.md`), page-cro (CTA hierarchy at page boundaries).

---

## 10. Practice Areas hub

### F38 — Hub is a single H1 + intro + grid. The intro paragraph is 50 words of qualification; the grid is the entire conversion path
**Impact: M · Effort: L**

**Current:** "Astons Law Chambers is a criminal defence lawyer practice based in London. The cases below are the work Astons Law Chambers takes. For matters outside criminal law, Astons Law Chambers will refer to specialist counsel where appropriate."

50 words to say "we do crime, not other things". The visitor who landed here from search already knows what they need; the intro is for the SEO crawler, not them.

**Recommendation:** halve the intro and add a 2-up *quick-paths* block above the grid:
  - "In custody now? → Call 07922 247 999 (24/7)."
  - "Voluntary interview booked? → Police Station Representation."
  Then the grid. Reduces time-to-action for the audience model and gives the search-crawler the same H1 + intro it already loves.

**Skill cite:** page-cro (conversion path on a hub page), awareness-stage-mapper (the hub is the highest-mixed-stage page; offer different first steps for different stages).

---

## 11. Cross-cutting language audit (avoid-ai-writing pass)

Scanned every section file. The site is already *unusually* clean for an
AI-assisted build. The avoid-ai-writing rule has been applied well. Surviving
tells, lowest-to-highest concern:

| Page | Phrase | Issue | Replace with |
|------|--------|-------|--------------|
| home l. 23 | "Whatever stage the case is at —" | hedging opener | drop, lead with the 24/7 claim (F11) |
| home l. 24 | "takes instructions direct" | jargon (direct = scheme name) | "instructed directly without a solicitor" or accept as positioning |
| home l. 31, 109, 119, 129 | "the practice", "Astons Law Chambers" alternation | entity-first is good, but 4 different surface forms across one page | normalise to "Astons Law Chambers" + pronoun-free voice |
| home l. 397 | "Speak to someone today" | soft verb, indefinite object, weak timeframe | F19 |
| police-station l. 14 | "are made on the same call" | passive voice on the most action-relevant sentence | "Astons Law Chambers arranges this on the call" |
| pa-detail l. 6 | "is a criminal defence lawyer practice based in London" | "based in" is a soft join | "London criminal defence practice" |
| about l. 6 | "at every stage" | filler intensifier | drop |
| about l. 16 | "in the usual way" | hedge / AI-ism | "and from instructing solicitors" |
| direct-access l. 6 | "Direct Access is the scheme operated by the Bar Standards Board" | leads with the regulator, not the value | F31 |
| direct-access l. 16 | "single piece of work" | category abstraction | "one defined task — advice, drafting, a hearing" |
| fees l. 6 | "client-care letter before any work is instructed" | passive voice on a customer-facing sentence | "client-care letter you receive before instructing" |
| fees l. 25 | "Police station attendance is a single fee" | declarative but reads as policy-prose | "Police station attendance: a single fixed fee." |
| timescales l. 14 | "impossible to predict precisely" | weak intensifier | "impossible to predict at the outset" |

None of these are *bad* lines. The accumulation matters: ten subtle hedges
add up to a "drafted by a careful committee" cadence that's commercially
under-confident. The fix is iterative — each PR can clean 2–3 lines.

**Skill cite:** avoid-ai-writing (43-entry table applied).

---

## 12. Prioritised punch list

Ordered by **(Impact × likely conversion lift) ÷ Effort**, regulatorily-risky items pushed down regardless of impact.

| Rank | Finding | Page | Impact | Effort | Risk |
|------|---------|------|--------|--------|------|
| 1 | F1 — consent modal blocks above-the-fold | global | H | M | 🚩 (client decides UI variant) |
| 2 | F6 — sticky pill always-on for crisis routes | global | H | L | — |
| 3 | F4 — visible-from-t=0 call on every crisis route (same fix as #2, just naming it) | global | H | L | — |
| 4 | F11 — front-load "Available 24/7" in hero lead | home | M | L | — |
| 5 | F14 — promote "ask custody sergeant" line to visual peak of police card | home | M | L | — |
| 6 | F19 — final contact strip H2 verb fix | home | L | L | — |
| 7 | F23 — inline "Before you call" on mobile PA pages | pa-detail | M | L | — |
| 8 | F20 — reorder fee strip cells (first appearance first) | pa-detail | M | L | — |
| 9 | F26 — legal-aid callout *above* fee table | fees | M | L | 🚩 (BSB-safe but check wording with client) |
| 10 | F29 — resolve 24/7 vs working-hours contradiction site-wide | global | H | L | 🚩 (client decides which commitment to publish) |
| 11 | F10 — H1 verb / scope test | home | H | L | 🚩 (run as test, not as ship) |
| 12 | F31 — Direct Access subhead | direct-access | M | L | — |
| 13 | F38 — quick-paths block above PA hub grid | practice-areas | M | L | — |
| 14 | F17 — taxonomic ordering of defence-work grid | home | M | L | — |
| 15 | F12 — collapse hero double-CTA to one + supporting line | home | M | L | — |
| 16 | F37 — phone-front email-back at timescales page closer | timescales | L | L | — |
| 17 | F30 — visual hierarchy on contact page | contact | M | L | — |
| 18 | F28 — btn-lg on fees aside primary | fees | L | L | — |
| 19 | F22 — PA H1 subhead | pa-detail | M | L | — |
| 20 | F21 — non-police-station PA pages get a "Next step" box | pa-detail | L | L | — |
| 21 | F8 — header "Book a call" demotion to text link | global | L | L | — |
| 22 | F15 — visual differentiation of police card vs situation cards | home | L | L | — |
| 23 | F25 — fees page intro reframe | fees | M | L | — |
| 24 | F24 — FAQ native details OR remove chevron | pa-detail | L | M | — |
| 25 | F18 — booking module repositioning above Direct Access | home | M | M | — |
| 26 | F9 — footer phone link affordance | global | L | L | — |
| 27 | F32 — drop timescales table from Direct Access | direct-access | L | L | — |
| 28 | F13 — test removing the desktop hero image | home | L | M | 🚩 (client decision, asset removal) |
| 29 | F7 — demote police-card red eyebrow | home | M | L | — |
| 30 | F16 — symmetry on the 3 situation cards (a) third guide or (b) move guides below | home | M | M | 🚩 (a) needs client content |
| 31 | F36 — verified credentials block on About | about | M | M | 🚩 (client content) |
| 32 | F27 — worked-example fees | fees | M | M | 🚩 (client fee numbers) |

`plan.md` sequences ranks 1–10 into discrete shippable tasks. Ranks 11–32
stay in this file for the user to triage on a second pass.
