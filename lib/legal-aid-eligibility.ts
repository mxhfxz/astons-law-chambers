// Legal Aid Eligibility Indicator — data + logic.
//
// APEX COMPLIANCE NOTES (read before editing):
//  - This is an INDICATOR, never a "calculator". It produces NO verdict. Every
//    outcome routes the visitor to the conversion trio. See
//    .project/legal-aid-indicator/plan.md (Understanding Lock 2026-06-16).
//  - ALL visible strings below are DRAFT copy pending client (Ghulam) approval.
//    They are here so the tool can be seen in localhost; nothing ships until the
//    wording is signed off. Copy HARD RULE still applies.
//  - The income £ bands are 🚩 PLACEHOLDERS. The real criminal legal aid means
//    test uses weighted *disposable* income and is updated annually — these
//    round figures MUST be verified against live GOV.UK before launch. The tool
//    never states a band "qualifies"; the band only feeds the soft signal.
//  - The practitioner's name is deliberately absent from every string here.
//  - 100% client-side: answers are never transmitted, stored, or sent to cal.com.

export type QuestionId = 'stage' | 'passport' | 'income' | 'household'

export interface AnswerOption {
  /** Stable value used by the logic — never shown. */
  readonly value: string
  /** Visible label (DRAFT copy). */
  readonly label: string
  /** Optional helper line under the label (DRAFT copy). */
  readonly hint?: string
}

export interface Question {
  readonly id: QuestionId
  /** Visible question text (DRAFT copy). */
  readonly legend: string
  /** Short supporting line under the legend (DRAFT copy). */
  readonly help?: string
  readonly options: readonly AnswerOption[]
}

/** The four questions, ordered for conversion psychology: open low-threat
 *  (case stage), early yes/no win (passport), the sensitive money question once
 *  the visitor is invested (income), then a question that can lift a higher
 *  income answer LAST so the flow ends on hope, not on money. */
export const QUESTIONS: readonly Question[] = [
  {
    id: 'stage',
    legend: 'Where is the case right now?',
    help: 'Different stages are funded in different ways.',
    options: [
      { value: 'police', label: 'At the police station', hint: 'Arrested, held, or asked in for questioning' },
      { value: 'magistrates', label: "Magistrates' Court", hint: 'Most cases start and finish here' },
      { value: 'crown', label: 'Crown Court', hint: 'More serious cases, heard before a judge and jury' },
      { value: 'unsure', label: "I'm not sure yet" },
    ],
  },
  {
    id: 'passport',
    legend: 'Do any of these apply to you?',
    help: 'Certain benefits, or being under 18, can pass the money side of the test automatically.',
    options: [
      { value: 'yes', label: 'Yes', hint: 'I receive Universal Credit, Income Support, income-based JSA/ESA, or I am under 18' },
      { value: 'no', label: 'No', hint: 'None of those apply' },
      { value: 'unsure', label: "I'm not sure" },
    ],
  },
  {
    id: 'income',
    // 🚩 £ figures are PLACEHOLDERS — verify against live GOV.UK before launch.
    legend: 'Roughly what does your household earn before tax, each year?',
    help: 'A rough band is fine. The real test looks at weighted disposable income, so this is only a guide.',
    options: [
      { value: 'low', label: 'Under £12,500' },
      { value: 'lower-mid', label: '£12,500 – £22,500' },
      { value: 'upper-mid', label: '£22,500 – £37,500' },
      { value: 'high', label: 'Over £37,500' },
      { value: 'unsure', label: "I'd rather not say / not sure" },
    ],
  },
  {
    id: 'household',
    legend: 'Do you support others, or carry significant housing costs?',
    help: 'Children or a partner who rely on your income, and rent or mortgage costs, are weighed in your favour.',
    options: [
      { value: 'both', label: 'Yes — dependants and housing costs' },
      { value: 'one', label: 'Yes — one of those' },
      { value: 'neither', label: 'Neither' },
    ],
  },
]

export type Answers = Partial<Record<QuestionId, string>>

export type Outcome = 'likely' | 'unlikely' | 'insufficient'

export interface ResultContent {
  readonly outcome: Outcome
  /** Visible result heading (DRAFT copy). */
  readonly heading: string
  /** Body paragraphs (DRAFT copy). */
  readonly body: readonly string[]
  /** The line above the CTAs (DRAFT copy). */
  readonly ctaLead: string
}

/** DRAFT result copy. Three endpoints, each ending in the conversion trio.
 *  None is a verdict — the framing makes the call the honest next step. */
export const RESULTS: Record<Outcome, ResultContent> = {
  likely: {
    outcome: 'likely',
    heading: 'Legal aid may well apply to a case like yours',
    body: [
      'Based on what you have entered, your circumstances look like the kind that criminal legal aid is designed for. This is a general indicator, not a decision — only the Legal Aid Agency can confirm eligibility once a proper application is made.',
      'The next step is getting it confirmed and set in motion, and the sooner that happens, the sooner representation can begin.',
    ],
    ctaLead: 'Speak to the chambers now to get it confirmed and moving.',
  },
  unlikely: {
    outcome: 'unlikely',
    heading: 'Income on its own rarely settles it',
    body: [
      'On income alone this looks less clear-cut — but income is only part of the test. Housing costs, dependants, and the way the means test weighs disposable income can all change the picture, so this is not a "no".',
      'It is worth checking properly before you rule it out. And if legal aid is not available in the end, there are other ways forward worth talking through.',
    ],
    ctaLead: 'A short call can check the full picture and explain the options either way.',
  },
  insufficient: {
    outcome: 'insufficient',
    heading: 'This part is better answered by a person',
    body: [
      'Your answers include a few factors that an online check cannot weigh properly — the real test depends on detail that only a short conversation can pin down.',
      'A quick call will give you a straight answer for your own circumstances, without guessing.',
    ],
    ctaLead: 'A two-minute call will give you a clear answer for your situation.',
  },
}

/** Pure, testable soft-signal engine. Returns one of three outcomes; NEVER a
 *  yes/no verdict. Deliberately conservative — genuine borderline cases fall to
 *  'insufficient' (which routes to a human) rather than being pushed either way.
 *
 *  Returns null while the questionnaire is incomplete. */
export function computeSignal(answers: Answers): Outcome | null {
  const { stage, passport, income, household } = answers
  if (!stage || !passport || !income || !household) return null

  // Police station advice is free for everyone, unconditionally — the clearest
  // "worth a call" path. (Stated as fact elsewhere on the site.)
  if (stage === 'police') return 'likely'

  // Passported means test — benefits or under 18.
  if (passport === 'yes') return 'likely'

  // If the visitor was unsure on the two decisive drivers and withheld income,
  // there is genuinely nothing to signal on — send them to a person.
  if (passport === 'unsure' && income === 'unsure') return 'insufficient'

  let score = 0
  // Crown Court: interests-of-justice generally taken as met; means decides
  // contribution rather than qualification — a mild lean toward "worth a call".
  if (stage === 'crown') score += 1

  switch (income) {
    case 'low':
      score += 2
      break
    case 'lower-mid':
      score += 1
      break
    case 'upper-mid':
      score += 0
      break
    case 'high':
      score -= 2
      break
    case 'unsure':
      // No income given — lean toward "needs a person" unless other signals are strong.
      score -= 1
      break
  }

  if (household === 'both') score += 2
  else if (household === 'one') score += 1

  if (score >= 2) return 'likely'
  if (score <= -1) return 'unlikely'
  return 'insufficient'
}
