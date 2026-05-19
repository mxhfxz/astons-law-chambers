# Findings — keyword reintegration

## Current state (grep, 2026-05-19)

- "criminal defence lawyer" — 0 occurrences anywhere.
- "barrister" — dominant identity term: 17× in `lib/practice-areas.ts`, 7× in
  `home.html`, present in every title tag.
- "lawyer" — 3 incidental uses (PDF guide label, one FAQ, one FAQ in practice-areas.ts).
- "solicitor" — 14 uses, all already in correct referral/instruction context.

So the site is clean on the "solicitor" rule; the gap is purely the missing
"lawyer" phrase.

## Title-tag strategy — DECISION NEEDED

Title tags are the single highest-impact SEO surface. Two routes:

- **Option A — lead titles with "lawyer".** e.g. homepage
  `Criminal Defence Lawyer in London`, criminal-defence page
  `Criminal Defence Lawyer in London`. Strongest recovery of the 1800% term.
  Body/H1 stay barrister-led, so professional identity is still precise.
  Touches the locked memory `project_barrister_positioning.md` (barrister-first)
  — the user's instruction overrides it; memory to be updated to "titles target
  search demand, body establishes barrister identity".
- **Option B — keep titles barrister-led; add "lawyer" to descriptions/body only.**
  Protects the positioning memory verbatim. Recovers the semantic signal but
  not the exact-phrase title match.

Recommendation was Option A. **DECISION (user, 2026-05-19): Option B.** Title
tags and `metaTitle` stay barrister-led, unchanged. "Criminal defence lawyer"
goes into meta descriptions and body copy only. The locked positioning memory
`project_barrister_positioning.md` is preserved as-is — no update needed.

## Per-page change map (BSB-safe)

### Homepage — `app/layout.tsx` + `content/sections/home.html`
- `<title>` default: `Astons Law Chambers — Criminal Defence Barrister, London`
  → Option A: `Criminal Defence Lawyer in London — Astons Law Chambers`.
- meta description: add the phrase — "Criminal defence lawyer and barrister in
  London, instructed direct without a solicitor. Police station, Magistrates'
  and Crown Court representation. Call 07922 247 999."
- Hero lead para (home.html:24): "...Astons Law Chambers acts in criminal
  defence and takes instructions direct." → "...Astons Law Chambers acts as a
  criminal defence lawyer at every stage and takes instructions direct."
- H1 ("Speak to a barrister before the police interview.") — unchanged;
  barrister precision kept in the H1.
- JSON-LD `LegalService.description` — add "criminal defence lawyer" alongside
  "barrister".

### `/practice-areas/criminal-defence` — `lib/practice-areas.ts` (criminal-defence entry)
- `metaTitle`: `Criminal Defence Barrister, London` → `Criminal Defence Lawyer in London`.
- `metaDescription`: → "Criminal defence lawyer in London, instructed direct.
  Police station, Magistrates' and Crown Court representation, from
  investigation through trial."
- `situation`: open with "Astons Law Chambers acts as a criminal defence lawyer
  at every stage — from arrest to verdict." (rest unchanged).

### `/practice-areas` hub — `app/practice-areas/page.tsx` + `practice-areas.html`
- route `title`: `Criminal Defence Services` → `Criminal Defence Lawyer — Services`.
- lead para (practice-areas.html:6): "Astons Law Chambers is a criminal defence
  practice." → "Astons Law Chambers is a criminal defence lawyer practice based
  in London."

### `/about` — `content/sections/about.html`
- Lead (about.html:6): "...is a London barrister practice acting in criminal
  defence at every stage" → "...is a London criminal defence lawyer practice.
  Ghulam Humayun is a barrister acting at every stage —" (keeps both terms;
  barrister identity explicit).

### `/police-station-representation` — route already says "Criminal defence
  barrister representation". Add one body mention: police-station.html intro or
  "What attendance covers" — "A criminal defence lawyer attends the station,
  before the interview begins." (natural, and the page FAQ already uses "lawyer").

### `/fees` — `content/sections/fees.html` (line 39, legal-aid section)
- "Where legal aid applies to a case, representation is arranged through partner
  solicitor firms." → "Where legal aid applies, Astons Law Chambers can refer
  the case to a **criminal defence solicitor** at a partner firm that holds a
  legal aid contract." — the user's exact BSB-safe pattern.

### `/direct-access` — `content/sections/direct-access.html` (line 23, "When a
  solicitor is needed")
- "...are normally handled through a solicitor. Astons Law Chambers works with
  established solicitor firms..." → "...works with established **criminal
  defence solicitor** firms and will refer where this is the right approach."

### Remaining practice areas (`lib/practice-areas.ts`) — light touch, one mention each
- violent-crimes, youth-crimes, drug-offences, appeals: one "criminal defence
  lawyer" in the `situation` paragraph where it reads naturally.
- driving-offences: `situation` can carry "driving offence lawyer" (its own
  long-tail) rather than forcing "criminal defence".
- inquests: leave — "criminal defence lawyer" would be inaccurate for inquest work.

## Density check
Each page receives the phrase 1–3× in places a human would write it (intro
sentence, meta, title). No heading-stuffing, no repeated phrase in adjacent
sentences. Estimated density well under 1.5% on every page.

## Voice / avoid-ai-writing
All insertions are short declarative sentences, entity-first ("Astons Law
Chambers"), no triads, no em-dash maximalism, no rhetorical questions. Final
copy gets an avoid-ai-writing second pass before commit.
