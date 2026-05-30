// Practice-area content, ported verbatim from the approved prototype
// (preview/index.html PRACTICE_AREAS, 2026-05-17). Criminal-only practice.
// Copy is treated as drafted-from-prototype; client BSB verification pending.

export interface PracticeAreaFaq {
  q: string
  a: string
}

export interface PracticeArea {
  slug: string
  title: string
  /** SEO <title> (the layout template appends " — Astons Law Chambers"). */
  metaTitle: string
  /** SEO meta description, 140–160 chars. */
  metaDescription: string
  kicker: string
  cardSummary: string
  /** Neutral, entity-free "What is [practice area]" definition. Rendered as
   *  the lead paragraph above `situation`. AEO add (T2.2c, 2026-05-21):
   *  LLMs cite clean category definitions. Required so every PA page carries
   *  one. BSB-safe — no statutory section numbers, sentencing figures, or
   *  case citations (feedback_legal_specificity). 🚩 Ghulam sign-off pending. */
  definition: string
  situation: string
  actions: string[]
  process: string[]
  faqs: PracticeAreaFaq[]
  context?: { eyebrow: string; title: string; body: string }
  policeStation?: { title: string }
  related: string[]
}

export const practiceAreas: PracticeArea[] = [
  {
    slug: 'criminal-defence',
    title: 'Criminal Defence',
    metaTitle: "Criminal Defence Lawyer | London & UK | 24/7 Support",
    metaDescription:
      "Criminal defence for serious charges in London. Violence, drugs, fraud and more. 24/7 police station support. Legal aid can be discussed. Call 07922 247 999.",
    kicker: 'Criminal',
    cardSummary: 'Representation from investigation through trial. Magistrates’ and Crown Court.',
    definition:
      'Criminal defence is the representation of someone accused of a crime. It starts at the police station and runs through the Magistrates’ Court and, for serious cases, the Crown Court, to trial and any appeal that follows.',
    situation:
      'Astons Law Chambers acts as a criminal defence lawyer and barrister at every stage, from arrest to verdict. Police station support, Magistrates’ Court hearings, Crown Court trial and sentence, and post-conviction work.',
    actions: [
      'Police station representation, at any hour.',
      'Bail applications and contested bail hearings.',
      'Plea advice, disclosure review, and trial preparation.',
      'Trial advocacy and sentencing mitigation.',
    ],
    process: [
      'A short call to understand the allegation, the stage you are at, and any next date in the diary.',
      'A written client-care letter setting out scope, fee, and what happens next — before any work begins.',
      'Preparation: conferences with the client, disclosure review, and case strategy.',
      'Representation at every hearing through to verdict and, where needed, beyond.',
    ],
    faqs: [
      { q: 'Can I instruct a barrister directly?', a: 'Yes. Astons Law Chambers is authorised under the Bar Standards Board Public Access scheme to take instructions directly from members of the public. A solicitor is not required.' },
      { q: 'What if I am at a police station now?', a: 'Call 07922 247 999. Attendance is arranged from the same call. Ask the custody sergeant not to begin the interview until representation is in place.' },
      { q: 'Is legal aid available?', a: 'Astons Law Chambers is not a legal aid contract holder. Where legal aid applies to a case, it is arranged through a partner solicitor firm.' },
      { q: 'Will I have a criminal record?', a: 'A conviction creates a record on the Police National Computer. A caution does too. Out-of-court disposals — community resolution, fixed penalty, conditional caution — appear on enhanced DBS checks for the periods set by the Rehabilitation of Offenders Act. Whether a matter results in a conviction, caution, out-of-court disposal, or no further action depends on the offence and how the police and CPS exercise their discretion at each stage.' },
      { q: 'Will I have to go to court?', a: 'Some matters are dealt with out of court — community resolution, fixed penalty notice, conditional caution — without any court appearance. Where the matter is charged, the first hearing is in the Magistrates’ Court. Summary offences stay there. Indictable-only offences go to the Crown Court. Either-way offences are allocated to one or the other depending on seriousness.' },
    ],
    context: {
      eyebrow: 'Custody — 24/7',
      title: 'Speak to the barrister before the interview begins.',
      body: 'Police station support is available at any hour. Calls from custody are answered direct.',
    },
    policeStation: { title: 'If you or a family member is at a police station, call before the interview.' },
    related: ['violent-crimes', 'drug-offences', 'appeals'],
  },
  {
    slug: 'violent-crimes',
    title: 'Violent Crimes',
    metaTitle: "Assault, GBH & Violence | Criminal Defence | London & UK",
    metaDescription:
      "Criminal defence for assault, ABH, GBH, affray and robbery in London. Police station to Crown Court. Legal aid can be discussed. Call 07922 247 999.",
    kicker: 'Criminal',
    cardSummary: 'Assault, ABH, GBH, affray, robbery. Police station through appeal.',
    definition:
      'Violent crime covers allegations involving violence or the threat of it: assault, actual and grievous bodily harm, affray, and robbery. The less serious are heard in the Magistrates’ Court. The most serious go to the Crown Court.',
    situation:
      'Astons Law Chambers acts as a criminal defence lawyer and barrister in allegations of violence — from common assault through to the most serious offences against the person. Magistrates’ Court and Crown Court representation.',
    actions: [
      'Assault, ABH and GBH allegations.',
      'Affray and public order matters.',
      'Robbery and aggravated offences.',
      'Self-defence, identification and CCTV challenges.',
    ],
    process: [
      'A short call to identify the allegation, the evidence the police are relying on, and any bail conditions in place.',
      'A written client-care letter setting out scope and fee.',
      'Conference, disclosure review, and a clear view on plea, trial, and witness strategy.',
      'Representation at every hearing through to verdict.',
    ],
    faqs: [
      { q: 'I have been arrested but not charged — should I call now?', a: 'Yes. The strongest moment to act is before charge. Decisions taken at the police station shape the rest of the case.' },
      { q: 'Will I get bail?', a: 'Bail turns on the allegation, prior history, and the conditions that can realistically be offered. The first call covers what is and isn’t likely.' },
      { q: 'The complainant is a family member — does that change things?', a: 'Yes. Domestic-related allegations attract specific procedures around protective measures, disclosure, and witness handling. These are addressed at the first conference.' },
      { q: 'Will I go to prison?', a: 'Assault sentencing follows the Sentencing Council guideline for the specific charge. The guideline works on two factors: the harm caused to the victim (level of injury, whether the attack was sustained or repeated, whether the victim was particularly vulnerable) and the culpability (whether a weapon was used, whether the attack was targeted, whether the defendant played a leading role in a group). The combination produces a starting point. Previous convictions, plea timing, and personal mitigation move the sentence within the range. Whether the court crosses the custody threshold — and whether any custodial sentence is suspended — turns on the totality of those factors.' },
      { q: 'I was acting in self-defence — does that matter?', a: 'Yes. Self-defence is a complete defence to most assault charges in England and Wales. It applies where the force used was honestly believed to be necessary and was reasonable in the circumstances as the person believed them to be. The law gives some latitude for the pressure of the moment — the person isn’t expected to have got the level of force exactly right. Whether self-defence runs in a given case turns on the evidence, witness accounts, forensic findings, and the defendant’s own account.' },
    ],
    context: {
      eyebrow: 'Charge to trial',
      title: 'Early decisions shape the case.',
      body: 'Identification, self-defence, and witness account are best framed in the first weeks after charge. Earlier is better.',
    },
    policeStation: { title: 'In custody for assault, ABH or GBH — speak to the barrister before the interview.' },
    // Sibling rebalance 2026-05-21: swap drug-offences + appeals (over-linked)
    // for youth-crimes + inquests (under-linked). Editorial adjacencies:
    // youth ↔ violent (assault by under-18s); inquests ↔ violent (death from
    // violence). Revert: `git restore lib/practice-areas.ts`.
    related: ['criminal-defence', 'youth-crimes', 'inquests'],
  },
  {
    slug: 'youth-crimes',
    title: 'Youth Crimes',
    metaTitle: "Youth Crimes Defence | Under-18 Legal Aid | London & UK",
    metaDescription:
      "Criminal defence for clients under 18 in London. Youth Court and Crown Court representation. Legal aid can be discussed. Call 07922 247 999.",
    kicker: 'Criminal',
    cardSummary: 'Defence for clients under 18. Youth Court procedure and welfare considerations.',
    definition:
      'Youth crime is a criminal allegation against someone under 18. Most cases are heard in the Youth Court, which has its own procedure and considers the young person’s welfare. The most serious go to the Crown Court.',
    situation:
      'Astons Law Chambers acts as a criminal defence lawyer and barrister for clients under 18 in the Youth Court and, where allocated, the Crown Court. Conducted with the specific procedures and welfare considerations the youth jurisdiction requires.',
    actions: [
      'Youth Court trials and sentencing.',
      'Crown Court representation where the case is allocated up.',
      'Referral orders, youth rehabilitation orders, and detention training orders.',
      'Liaison with the youth offending team where appropriate.',
    ],
    process: [
      'A short call, typically with a parent or guardian on the line alongside the young person.',
      'A written client-care letter setting out scope and fee.',
      'Pre-court conference in a setting suited to the client, with the parent present where helpful.',
      'Representation at every hearing in the Youth Court or, where allocated, the Crown Court.',
    ],
    faqs: [
      { q: 'My child has been arrested — what do I do first?', a: 'Call 07922 247 999. Police station support can be arranged from the same call. The young person is entitled to a parent or guardian present at interview.' },
      { q: 'Will the case stay in the Youth Court?', a: 'Most youth matters remain in the Youth Court. Some are sent to the Crown Court depending on the allegation and the client’s age. The first call covers which is likely.' },
      { q: 'Can a parent instruct on the young person’s behalf?', a: 'A parent or guardian is involved throughout, but the young person remains the client. The first conference is taken with both on the line.' },
    ],
    context: {
      eyebrow: 'Youth Court',
      title: 'A different court, a different procedure.',
      body: 'The Youth Court runs on its own timetable. Early instruction creates room to prepare to it, not against it.',
    },
    policeStation: { title: 'If a young person is at a police station, a parent should be on the same call.' },
    related: ['criminal-defence', 'violent-crimes', 'drug-offences'],
  },
  {
    slug: 'driving-offences',
    title: 'Driving Offences',
    metaTitle: "Motoring & Driving Offences | Legal Defence | London & UK",
    metaDescription:
      "Criminal defence for drink driving, drug driving and totting-up in London. Exceptional hardship arguments. Written quote on the same call. Call 07922 247 999.",
    kicker: 'Criminal',
    cardSummary: 'Drink/drug driving, totting-up, exceptional hardship. Licence-loss work.',
    definition:
      'Driving offences range from fixed-penalty matters to charges tried in the Crown Court. They include drink and drug driving, speeding, careless and dangerous driving, and losing a licence through totting-up. Many carry penalty points or a disqualification.',
    situation:
      'Astons Law Chambers acts as a criminal defence lawyer and barrister for driving offences — fixed-penalty matters through to Crown Court trial. Drink and drug driving, totting-up, exceptional-hardship arguments, and disqualification work.',
    actions: [
      'Drink and drug driving defence.',
      'Speeding, careless, and dangerous driving cases.',
      'Totting-up disqualification and exceptional-hardship arguments.',
      'Special-reasons arguments and licence reinstatement.',
    ],
    process: [
      'A short call to identify the offence, the court, and the date set for the hearing.',
      'A written client-care letter setting out scope and fee.',
      'Evidence review, instruction of experts where needed (calibration, procedure, medical).',
      'Representation at the Magistrates’ Court or, where the case is sent up, the Crown Court.',
    ],
    faqs: [
      { q: 'Can I avoid a ban under totting-up?', a: 'An exceptional-hardship argument is available in some cases. It is not automatic. The first call covers whether the argument is realistic on your facts.' },
      { q: 'I’m over the limit — is there any defence?', a: 'There can be, depending on procedure at the roadside and at the station. The disclosure is reviewed before any plea is advised.' },
      { q: 'Will I lose my job if I lose my licence?', a: 'For many clients the answer drives the case. Hardship arguments are built around exactly this kind of personal consequence.' },
    ],
    context: {
      eyebrow: 'Hearing date set',
      title: 'A written fee on the same call.',
      body: 'After a short conversation, you receive a client-care letter setting out scope and fee before any work begins.',
    },
    policeStation: { title: 'Held for drink driving or failure to provide — call before the interview.' },
    related: ['criminal-defence', 'drug-offences', 'appeals'],
  },
  {
    slug: 'drug-offences',
    title: 'Drug Offences',
    metaTitle: "Drugs & Supply Offences | Criminal Defence | London & UK",
    metaDescription:
      "Criminal defence for drug possession, supply and importation charges in London. Forensic and disclosure challenges. Legal aid can be discussed. Call 07922 247 999.",
    kicker: 'Criminal',
    cardSummary: 'Possession, supply, importation. Forensic and disclosure challenges.',
    definition:
      'Drug offences cover the possession, supply, production, and importation of controlled drugs. Simple possession is usually dealt with in the Magistrates’ Court. Supply, conspiracy, and importation are tried in the Crown Court.',
    situation:
      'Astons Law Chambers acts as a criminal defence lawyer and barrister in drug allegations — possession through to supply, importation, and production. Magistrates’ Court and Crown Court representation.',
    actions: [
      'Possession allegations, including with intent to supply.',
      'Supply, conspiracy, and importation cases.',
      'Cultivation and production matters.',
      'Forensic challenges — purity, weight, attribution.',
    ],
    process: [
      'A short call to identify the allegation, the evidence the police are relying on, and any next date.',
      'A written client-care letter setting out scope and fee.',
      'Disclosure review, expert input where the forensics warrant it, and trial strategy.',
      'Representation at the Magistrates’ Court or, more often, the Crown Court.',
    ],
    faqs: [
      { q: 'Will my case go to the Crown Court?', a: 'Simple possession often stays in the Magistrates’ Court. Supply, importation, and conspiracy allegations are tried at the Crown Court.' },
      { q: 'Can the forensic evidence be challenged?', a: 'Often, yes. Purity, weight, and attribution to the defendant are all open to challenge. The route depends on the disclosure and what an independent expert says.' },
      { q: 'I’ve been told to expect a long sentence — is that right?', a: 'It is too early to know. Sentence depends on the role accepted, the weight, and personal mitigation. The first call covers a realistic view, not a worst-case one.' },
    ],
    context: {
      eyebrow: 'Disclosure',
      title: 'The schedules drive the defence.',
      body: 'Drug cases turn on what is in the disclosure schedules and what is missing from them. Early review sets the strategy.',
    },
    policeStation: { title: 'In custody for possession or supply — call before the interview begins.' },
    // Sibling rebalance 2026-05-21: swap appeals (over-linked) for
    // driving-offences (under-linked). Adjacency: drug-driving cases bridge.
    related: ['criminal-defence', 'driving-offences', 'violent-crimes'],
  },
  {
    slug: 'appeals',
    title: 'Appeals',
    metaTitle: "Criminal Appeals & Conviction Review | London & UK",
    metaDescription:
      "Appealing a criminal conviction or sentence in London. Advice on prospects, grounds of appeal and Court of Appeal representation. Call 07922 247 999.",
    kicker: 'Post-trial',
    cardSummary: 'Conviction and sentence appeals. Prospects, grounds, hearing.',
    definition:
      'A criminal appeal challenges a conviction or a sentence after the case has been decided. Appeals from the Magistrates’ Court go to the Crown Court, and appeals from the Crown Court go to the Court of Appeal. The time to appeal is short and starts on the day of the decision.',
    situation:
      'Astons Law Chambers acts as a criminal defence lawyer and barrister for criminal appeals — against conviction and sentence in the Crown Court and the Court of Appeal. Advice on prospects, drafting of grounds, and representation at the appeal hearing.',
    actions: [
      'Advice on prospects of appealing conviction or sentence.',
      'Drafting of grounds of appeal.',
      'Crown Court appeals from the Magistrates’ Court.',
      'Representation in the Court of Appeal (Criminal Division).',
    ],
    process: [
      'A short call to confirm what was decided, on what date, and how much time is left to appeal.',
      'A written client-care letter setting out scope and fee.',
      'Review of the transcript, summing-up, and trial papers — these are ordered early.',
      'Drafting of grounds and representation at the appeal hearing.',
    ],
    faqs: [
      { q: 'How long do I have to appeal?', a: 'Time limits are short and start running on the day of the decision. Call before the time runs — grounds can be drafted in time even if the papers are not yet available.' },
      { q: 'Can I appeal just the sentence?', a: 'Yes. Sentence-only appeals are common. Grounds depend on the principles applied and the facts. The first call covers whether they are realistic.' },
      { q: 'My trial lawyer said an appeal isn’t worth it — is that final?', a: 'No. A second opinion on prospects is part of the work. The first call covers whether the case is worth pursuing.' },
    ],
    context: {
      eyebrow: 'Time-limited',
      title: 'Appeal time runs from the day of the decision.',
      body: 'Early instruction matters. Transcripts and trial papers take time to obtain and review.',
    },
    related: ['criminal-defence', 'violent-crimes', 'drug-offences'],
  },
  {
    slug: 'inquests',
    title: 'Inquests',
    metaTitle: "Inquest Representation | London & UK",
    metaDescription:
      "Representing families and interested persons at inquests in London. Pre-inquest review through to the substantive hearing. Call 07922 247 999.",
    kicker: 'Coroner’s Court',
    cardSummary: 'Family and interested-person representation. Pre-inquest review through hearing.',
    definition:
      'An inquest is an inquiry in the Coroner’s Court into how someone died. It is not a trial and decides no one’s guilt. A family, or another interested person, can be represented at the pre-inquest review and at the inquest itself.',
    situation:
      'Representation of families and interested persons in the Coroner’s Court — pre-inquest review hearings through to the substantive inquest.',
    actions: [
      'Pre-inquest review hearings and scope arguments.',
      'Examination of witnesses at the substantive inquest.',
      'Article 2 inquest representation.',
      'Disclosure review and documentary preparation.',
    ],
    process: [
      'A short call to identify the type of inquest, the issues, and any next hearing date.',
      'A written client-care letter setting out scope and fee.',
      'Disclosure review and preparation of position, witnesses, and questions.',
      'Representation at the pre-inquest review and the substantive hearing.',
    ],
    faqs: [
      { q: 'Can a family instruct directly?', a: 'Yes. Inquest instructions are accepted under the Direct Access scheme where suitable. The first call covers whether the case is.' },
      { q: 'What is a pre-inquest review?', a: 'It is the procedural hearing that fixes the scope, witnesses, and timetable for the substantive inquest. Position before the PIR matters.' },
      { q: 'Is legal aid available for inquests?', a: 'In some cases, yes — typically through a solicitor with a legal aid contract. Astons Law Chambers can refer where this is the right route.' },
    ],
    context: {
      eyebrow: 'Pre-inquest review',
      title: 'Scope is set before the inquest.',
      body: 'The PIR is where the case takes its shape. Early instruction allows time to be heard there, not after.',
    },
    related: ['criminal-defence', 'appeals', 'violent-crimes'],
  },
]

export function getPracticeArea(slug: string): PracticeArea | undefined {
  return practiceAreas.find((a) => a.slug === slug)
}

export function getAreaTitle(slug: string): string {
  return getPracticeArea(slug)?.title ?? slug
}

// Old -> new slug redirects (criminal-only scope). Consumed by next.config.mjs.
export const slugRedirects: Record<string, string> = {
  'motoring-law': '/practice-areas/driving-offences',
  immigration: '/practice-areas',
  'family-law': '/practice-areas',
  family: '/practice-areas',
  'civil-litigation': '/practice-areas',
  civil: '/practice-areas',
  'proceeds-of-crime': '/practice-areas',
  extradition: '/practice-areas',
  licensing: '/practice-areas',
  'regulatory-law': '/practice-areas',
  regulatory: '/practice-areas',
}
