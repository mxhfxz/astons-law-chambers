# Sub-pages Track — Specific Handoff

**Session:** 2026-05-31  
**Status:** Content drafted but FAQs need a full rewrite pass — see RED FLAG below.

---

## RED FLAG — FAQs violate content direction

The FAQ answers written in `findings.md` went into outcome territory. They explain
defences, predict results, and make legal analysis on behalf of the client. Examples:

- "Self-defence is a complete defence to GBH if the force used was honestly believed
  to be necessary…" — legal opinion
- "The defence can be determinative when properly established." — outcome promise
- "The prosecution must then disprove the defence beyond reasonable doubt." — legal advice
- "Bail decisions depend on the seriousness of the allegation…" — outcome analysis
- "Whether the prosecution can sustain the case without the complainant's live evidence
  depends on what the other evidence shows." — outcome speculation
- "A special reasons argument can avoid it in limited circumstances — where the journey
  was extremely short…" — legal analysis

**The correct content direction (set 2026-05-31):**
- Say what the offence is. Brief.
- Say what Astons does. Brief.
- Point to the conversion: call.
- Nothing that reads as a prediction, a legal opinion, or an explanation of a defence.
- FAQs should name the question, not answer it in full. The answer is: call us.

**What this means for the rewrite:**
Every FAQ answer needs to be cut back. The pattern is:

> Q: I was defending myself — can I still be charged?
> A: Yes. What happened and how it is characterised are questions for the first call.
>    Call 07922 247 999.

Not:

> A: Self-defence is a complete defence if the force used was honestly believed to be
>    necessary and was reasonable in the circumstances as the defendant believed them
>    to be.

The answer describes the situation honestly without giving legal analysis. Then it
routes to the call.

---

## What is done and does not need rework

- **Definitions** — 40–60 words, neutral factual description of what the offence is.
  No outcome language. These are ready.
- **Situation paragraphs** — stakes/urgency framing, no outcome promises. Ready.
- **Actions lists** — what Astons handles. No outcome promises. Ready.
- **Process steps** — four-step format. Ready.
- **Context cards** (eyebrow/title/body) — describe the legal consequence, not the outcome.
  These are mostly ready but some need minor trimming (see notes per page below).
- **metaTitle / metaDescription / kicker / cardSummary** — ready.
- **URL structure, parentSlug, related links** — decided and ready.

---

## Context cards to review

A few context body fields have borderline outcome language:

| Page | Current body | Flag |
|------|-------------|------|
| Drink driving | "The first call covers what the disclosure is likely to show." | OK |
| Drug driving | "Whether the defence is available depends on the prescription, the dosage, and the advice given. The first call covers whether it applies." | Borderline — implies there might be a defence. Consider: "The prescription, the dosage, and the advice given are what determine the question. The first call covers the position." |
| Totting up | "Personal inconvenience alone is not enough. The first call covers whether the argument is realistic on your facts." | OK |
| GBH | "Early instruction allows the case to be framed correctly from the start." | OK |
| Knife crime | "The first call covers what the disclosure shows and whether there is something to work with." | Borderline — "whether there is something to work with" implies we assess and confirm a defence. Consider removing that clause. |
| PWITS | "Early disclosure review sets the defence strategy." | OK |
| Drug supply | "What the defendant did, what they knew, and what they gained from it are all open to argument." | Borderline — "open to argument" implies there's an argument to be made. Consider: "What the defendant did, what they knew, and what they gained from it all form part of the case." |
| County lines | "The statutory defence under the Modern Slavery Act is a serious argument when properly established. Early identification of the exploitation dimension is what makes it available." | Needs rework — implies the defence will be available if identified early. Rewrite to: "Exploitation in county lines cases is identified at the earliest stage. The first call covers the defendant's situation." |
| Domestic abuse | "Acting early keeps the options open." | OK |
| Robbery | "Early disclosure review reveals what the prosecution has." | OK |
| Fraud | "The defence starts with what those records actually show." | OK |
| Sexual offences | "Representation from the earliest stage keeps every option available." | OK |

---

## Pages that need special handling before implementation

### Sexual offences
The voice is correct — direct, consequence-focused, no promises. But the FAQ answers
still explain procedures in depth. Strip them back. The page should acknowledge the
situation plainly and route to the call. Nothing that reads as guidance.

### Fraud
Pre-charge section in FAQ is fine. The explanation of what fraud by false representation
is goes into more legal detail than needed — trim to "the allegation and what it requires
the prosecution to prove are covered in the first call."

---

## Data architecture — decided, no changes needed

- 10 sub-pages → `lib/sub-practice-areas.ts` (new file)
  - `SubPracticeArea` interface extends `PracticeArea` with `parentSlug: string`
  - URL: `/practice-areas/[parentSlug]/[slug]`
  - Route: `app/practice-areas/[category]/[slug]/page.tsx`
- 2 new top-level PAs → append to `lib/practice-areas.ts`
  - `fraud` and `sexual-offences`
  - Route: existing `app/practice-areas/[slug]/page.tsx`

---

## Implementation checklist (unchanged from plan.md)

- [ ] Rewrite all FAQ answers per content direction above (FIRST — before any code)
- [ ] Review and trim context card bodies per notes above
- [ ] Create `lib/sub-practice-areas.ts`
- [ ] Append fraud and sexual-offences to `lib/practice-areas.ts`
- [ ] Create `app/practice-areas/[category]/[slug]/page.tsx`
- [ ] Breadcrumb: Home → Defence work → [Parent PA] → [Page title]
- [ ] Wire sub-page links from parent PA pages
- [ ] Schema: BreadcrumbList + Service + FAQPage per sub-page
- [ ] Sitemap update
- [ ] Build + type-check → staging branch → Vercel preview → verify
