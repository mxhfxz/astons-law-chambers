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
  /** Legacy bullet fields. Retained for backward compatibility while pages are
   *  migrated to prose (Option B, 2026-06-06). Rendered only when the matching
   *  `*Prose` field is absent. */
  actions: string[]
  process: string[]
  /** Prose rewrite (Option B, 2026-06-06). When present these replace the
   *  `actions`/`process` lists with flowing paragraphs. `processProse` answers
   *  "how a case proceeds"; `actionsProse` covers how the defence is built.
   *  Each array element is one paragraph. Optional headings override the
   *  generic section headings (needed for inquests, appeals, criminal-defence).
   *  Grounded in the Gemini dossier; conceptual only — no statutes, section
   *  numbers, or figures (feedback_legal_specificity, user 2026-06-06). */
  processHeading?: string
  processProse?: string[]
  actionsHeading?: string
  actionsProse?: string[]
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
    kicker: 'Criminal Defence',
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
    processHeading: 'How a criminal case proceeds',
    processProse: [
      'A criminal case usually begins with an investigation, an arrest, and a police interview. What is said in that interview can shape everything that follows. Astons Law Chambers provides police station support at any hour.',
      'After the interview the police take no further action, release you while they continue to investigate, or charge you. A charge means a first hearing at the Magistrates’ Court. Less serious matters are dealt with there; the most serious move to the Crown Court for trial before a jury.',
      'Astons Law Chambers acts at every stage, from the police station through the Magistrates’ Court and Crown Court. Call 07922 247 999 to talk through where your case stands.',
    ],
    actionsHeading: 'How the defence is built',
    actionsProse: [
      'In a criminal case the prosecution has to prove what it alleges. A defence is built by testing whether it can: examining how the evidence was gathered, how reliable it is, and whether the police followed the rules that apply to them.',
      'Disclosure matters too. The prosecution holds material it does not rely on, and some of it can assist the defence.',
      'Astons Law Chambers takes on criminal defence cases in the Magistrates’ Court and Crown Court. The first call is free — call 07922 247 999.',
    ],
    faqs: [
      { q: 'Can I instruct a barrister directly?', a: 'Yes. Astons Law Chambers is authorised under the Bar Standards Board Public Access scheme to take instructions directly from members of the public. A solicitor is not required.' },
      { q: 'What if I am at a police station now?', a: 'Call 07922 247 999. Police station support can be arranged from the same call. You can ask the custody officer to hold the interview until a representative is present.' },
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
    kicker: 'Violent Crimes',
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
    processHeading: 'How an assault case proceeds',
    processProse: [
      'Most violence allegations begin with an arrest and a police interview soon after the incident, while accounts and CCTV are still being gathered. What you say at that stage, including any claim of self-defence, is recorded and used later. Astons Law Chambers provides police station support at any hour.',
      'If you are charged, the first hearing is at the Magistrates’ Court. Common assault stays there; actual and grievous bodily harm, and robbery, are heard in the Crown Court before a jury. Bail conditions often forbid contact with the complainant while the case runs.',
      'Astons Law Chambers represents people accused of violence in both courts. Call 07922 247 999 to talk through the allegation and the next hearing.',
    ],
    actionsHeading: 'How the defence is built',
    actionsProse: [
      'The prosecution has to prove the force used was unlawful. Where self-defence is raised, the question is whether you honestly believed force was necessary and whether the force was reasonable in the circumstances as you saw them.',
      'Medical evidence, CCTV, and witness accounts are tested closely: what each one actually shows, how an injury was caused, and whether the sequence of events matches the charge. The level of harm alleged is measured against what the medical evidence supports.',
      'Astons Law Chambers takes on assault, ABH, GBH and robbery cases in the Magistrates’ Court and Crown Court. The first call is free — call 07922 247 999.',
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
    related: ['criminal-defence', 'youth-crimes', 'inquests', 'gbh', 'knife-crime', 'domestic-abuse', 'robbery'],
  },
  {
    slug: 'youth-crimes',
    title: 'Youth Crimes',
    metaTitle: "Youth Crimes Defence | Under-18 Legal Aid | London & UK",
    metaDescription:
      "Criminal defence for clients under 18 in London. Youth Court and Crown Court representation. Legal aid can be discussed. Call 07922 247 999.",
    kicker: 'Youth Crimes',
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
    processHeading: 'How a youth case proceeds',
    processProse: [
      'Many cases involving under-18s are dealt with out of court, through warnings or other disposals meant to keep a child out of the formal system. Where a charge is brought, most are heard in the Youth Court, which sits less formally and expects a parent or guardian to attend.',
      'The most serious allegations, or cases where a young person is charged alongside an adult, can go to the Crown Court. Reporting restrictions usually keep a child’s identity out of the public domain. Astons Law Chambers provides police station support at any hour, with a parent or guardian able to be present.',
      'Astons Law Chambers represents clients under 18 in the Youth Court and, where the case is sent up, the Crown Court. Call 07922 247 999 — a parent can be on the same call.',
    ],
    actionsHeading: 'How a young person is defended',
    actionsProse: [
      'Defending a young person starts with making sure they can follow and take part in their own case. The defence checks that the police kept to the extra protections children are entitled to, including the presence of an appropriate adult at the interview.',
      'Where there is neurodivergence or developmental immaturity, the court can be asked for measures that allow a fair hearing. The youth system is built around preventing reoffending, so welfare and the young person’s circumstances weigh heavily in how a case is resolved.',
      'Astons Law Chambers conducts youth cases with the procedures the Youth Court requires. The first call is free — call 07922 247 999.',
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
    kicker: 'Driving Offences',
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
    processHeading: 'How a driving case proceeds',
    processProse: [
      'Many motoring matters arrive by post, as a requisition or a single justice notice, with no arrest at all. You enter a plea by post or online, and only a contested case, or one that risks disqualification, needs a hearing. More serious offences begin with a roadside stop and arrest.',
      'Most driving cases are heard in the Magistrates’ Court; dangerous driving and the gravest offences can be sent to the Crown Court. A conviction can mean penalty points, a fine, or a disqualification, and for many drivers the licence is what the case is really about.',
      'Astons Law Chambers defends driving offences in the Magistrates’ Court and, where sent up, the Crown Court. Call 07922 247 999 to talk through the charge and the hearing date.',
    ],
    actionsHeading: 'How the defence is built',
    actionsProse: [
      'The prosecution has to follow the correct procedure, and a defence often turns on whether it did: how a speed or alcohol reading was taken, whether the testing equipment was reliable, and whether the paperwork holds up.',
      'Where the offence is made out, a special reasons argument can sometimes persuade the court not to endorse points or disqualify. Where penalty points would trigger a ban, an exceptional hardship argument can keep a licence, but it has to be supported with real evidence of the consequences.',
      'Astons Law Chambers handles drink and drug driving, totting-up, and the full range of motoring offences. The first call is free — call 07922 247 999.',
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
    related: ['criminal-defence', 'drug-offences', 'appeals', 'drink-driving', 'drug-driving', 'totting-up'],
  },
  {
    slug: 'drug-offences',
    title: 'Drug Offences',
    metaTitle: "Drugs & Supply Offences | Criminal Defence | London & UK",
    metaDescription:
      "Criminal defence for drug possession, supply and importation charges in London. Forensic and disclosure challenges. Legal aid can be discussed. Call 07922 247 999.",
    kicker: 'Drug Offences',
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
    processHeading: 'How a drug case proceeds',
    processProse: [
      'Drug cases usually begin with a stop and search or a search of a property. Anything seized is sent for forensic analysis, and phones and devices are examined, which can take months. What you say in the police interview about ownership and knowledge matters from the outset.',
      'Simple possession is often dealt with in the Magistrates’ Court. Supply, production, importation, and conspiracy are heard in the Crown Court. Where there is a conviction for a supply offence, the prosecution can also move to take your assets.',
      'Astons Law Chambers provides police station support at any hour and represents drug cases in both courts. Call 07922 247 999 to talk through the allegation.',
    ],
    actionsHeading: 'How the defence is built',
    actionsProse: [
      'A defence starts with how the evidence was obtained: whether the search was lawful, whether the seized items were handled and recorded properly, and what the forensic analysis actually establishes.',
      'Knowledge and control are central. The prosecution has to prove you knew of the drugs and controlled them, not just that they were nearby. Where supply is alleged, the meaning read into messages, cash, and quantities is open to challenge.',
      'Astons Law Chambers takes on possession, supply, importation and conspiracy cases. The first call is free — call 07922 247 999.',
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
    related: ['criminal-defence', 'driving-offences', 'violent-crimes', 'possession-with-intent', 'drug-supply', 'county-lines'],
  },
  {
    slug: 'appeals',
    title: 'Appeals',
    metaTitle: "Criminal Appeals & Conviction Review | London & UK",
    metaDescription:
      "Appealing a criminal conviction or sentence in London. Advice on prospects, grounds of appeal and Court of Appeal representation. Call 07922 247 999.",
    kicker: 'Appeals',
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
    processHeading: 'How an appeal works',
    processProse: [
      'An appeal challenges a conviction or a sentence after the case has ended. A decision of the Magistrates’ Court can be appealed to the Crown Court, which hears the matter again in full. An appeal from the Crown Court goes to the Court of Appeal and first needs permission.',
      'The time to appeal is short and runs from the day of the decision, so it is worth acting quickly even if the trial papers are not yet to hand. An appeal also carries risk: the Crown Court can increase a sentence on a rehearing, and an unsuccessful appeal can carry costs.',
      'Astons Law Chambers advises on appeals to the Crown Court and the Court of Appeal. Call 07922 247 999 before the time limit runs.',
    ],
    actionsHeading: 'What an appeal has to show',
    actionsProse: [
      'An appeal is not a chance to run the trial again. It has to identify something that went wrong: an error of law, a misdirection to the jury, or a procedural failure that makes the conviction unsafe.',
      'A sentence appeal has to show the sentence was wrong in principle or well outside the proper range. The starting point is a hard look at the transcript, the summing-up, and the papers to see whether a ground exists.',
      'Astons Law Chambers advises on prospects, drafts grounds, and represents at the hearing. The first call is free — call 07922 247 999.',
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
    kicker: 'Inquests',
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
    processHeading: 'How an inquest works',
    processProse: [
      'An inquest is an inquiry into how someone died. It is held in the Coroner’s Court and is required for deaths that are violent, unnatural, or sudden and unexplained. It does not decide guilt or blame; it establishes the facts.',
      'The coroner usually opens with a post-mortem and gathers information through their officers. A pre-inquest review sets the scope, the witnesses, and the timetable; the inquest itself then follows, where witnesses are questioned and a conclusion is reached. Families can take part throughout as interested persons.',
      'Astons Law Chambers represents families and other interested persons in the Coroner’s Court. Call 07922 247 999 to talk through the inquest and any hearing date.',
    ],
    actionsHeading: 'How a family is represented',
    actionsProse: [
      'Representation at an inquest is about getting to the truth of what happened. Acting for a family means examining where care or systems may have failed and questioning witnesses to draw out how the death came about.',
      'Much of the groundwork happens before the hearing, at the pre-inquest review, where the scope of the inquiry is decided. The position taken there shapes what the inquest is able to examine.',
      'Astons Law Chambers acts for families and interested persons from the pre-inquest review through to the conclusion. Call 07922 247 999.',
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
  {
    slug: 'fraud',
    title: 'Fraud & Financial Crime Defence',
    metaTitle: 'Fraud Defence | Financial Crime | Criminal Defence London & UK',
    metaDescription:
      'Criminal defence for fraud and financial crime in London. False representation, money laundering, Crown Court. Legal aid can be discussed. Call 07922 247 999.',
    kicker: 'Fraud',
    cardSummary: 'Fraud, false representation, money laundering. Digital evidence. Crown Court.',
    definition:
      "Fraud offences involve dishonesty and financial gain: fraud by false representation, fraud by abuse of position, money laundering, and conspiracy to defraud. Most are tried in the Crown Court. The prosecution's case is typically built from digital records and financial transactions.",
    situation:
      'Fraud investigations are often long-running before any arrest or charge. By the time the defendant is interviewed, the prosecution may have months or years of financial records, device data, and communications. Early representation — at interview under caution, or before — determines the first account and how the case can be contested.',
    actions: [
      'Interview under caution representation — fraud interviews are document-heavy and can be lengthy.',
      'Financial document and bank record analysis.',
      'Digital evidence challenges — device data, email and message extraction, forensic procedure.',
      'Money laundering: knowledge and suspicion arguments.',
      'Abuse of position cases: fiduciary duty and authorisation arguments.',
      'Crown Court trial and confiscation proceedings.',
    ],
    process: [
      'A short call to identify the allegation, the stage of the investigation, and whether an interview is pending.',
      'A written client-care letter setting out scope and fee.',
      "Review of the prosecution's financial evidence, digital materials, and disclosure schedule.",
      'Representation at every hearing through to verdict and, where required, confiscation proceedings.',
    ],
    processHeading: 'How a fraud case proceeds',
    processProse: [
      'Fraud investigations are often long, running for months or years before anyone is charged. By the time of the interview, the prosecution may hold extensive financial records, device data, and communications. Bank accounts and funds can be frozen while the investigation continues.',
      'Most fraud is tried in the Crown Court, where the evidence can run to thousands of pages of documents and forensic accounting. Where there is a conviction, the prosecution can pursue confiscation of assets said to be the proceeds of the offence.',
      'Astons Law Chambers represents fraud cases from interview under caution through to trial. Call 07922 247 999 to talk through where the investigation stands.',
    ],
    actionsHeading: 'How the defence is built',
    actionsProse: [
      'Fraud turns on dishonesty, judged by what a person actually knew or believed and whether their conduct was dishonest by ordinary standards. A defence works through the documents to test the prosecution’s account of what happened and why.',
      'The volume of material is itself a battleground. Financial flows can be traced and reinterpreted, the meaning put on messages can be challenged, and disclosure has to be pressed so that material assisting the defence comes to light.',
      'Astons Law Chambers takes on fraud, money laundering and related financial crime, including confiscation proceedings. The first call is free — call 07922 247 999.',
    ],
    faqs: [
      {
        q: 'I have received a letter saying I am under investigation — should I act now?',
        a: 'Yes. The investigation stage is when the prosecution builds its case, and the most important decisions are often made before any interview. Getting advice before you respond protects your position. Call 07922 247 999.',
      },
      {
        q: 'What is fraud by false representation?',
        a: 'It is the most common fraud charge. The prosecution has to prove you made a representation you knew was untrue or misleading, dishonestly, intending to make a gain or cause a loss. The money does not have to change hands — the offence is complete once the false representation is made with that intent.',
      },
      {
        q: 'Can digital evidence be challenged?',
        a: 'Yes. How devices and accounts were seized and examined, and what the data actually shows in context, are all open to challenge. Messages and records can read very differently once the full picture is disclosed. Call 07922 247 999.',
      },
      {
        q: 'What are confiscation proceedings?',
        a: 'If you are convicted, the prosecution can ask the court to calculate the benefit you are said to have gained and order you to pay it, which can mean selling assets. These proceedings are separate from the trial and are contested on their own evidence.',
      },
      {
        q: 'What is money laundering?',
        a: 'It covers dealing with money or property that is, or is suspected to be, the proceeds of crime. The prosecution usually has to prove you knew or suspected the source, and what counts as knowledge or suspicion is often the heart of the case.',
      },
    ],
    context: {
      eyebrow: 'Digital evidence',
      title: 'Fraud cases are built on documents. Documents can be challenged.',
      body: "Financial records, messages, and device data form the prosecution's case. The defence starts with what those records actually show.",
    },
    policeStation: {
      title: 'Under caution for fraud — call before the interview. Fraud interviews are document-heavy.',
    },
    related: ['criminal-defence', 'appeals'],
  },
  {
    slug: 'sexual-offences',
    title: 'Sexual Offences Defence',
    metaTitle: 'Sexual Offences Defence | Criminal Defence Lawyer | London & UK',
    metaDescription:
      'Criminal defence for sexual offence allegations in London. Pre-charge representation, Crown Court. Confidential. Call 07922 247 999.',
    kicker: 'Sexual Offences',
    cardSummary: 'Sexual offence allegations. Pre-charge to Crown Court. Highly sensitive.',
    definition:
      'Sexual offences are among the most serious criminal allegations a person can face. They are tried in the Crown Court. The consequences of an allegation — on employment, relationships, and daily life — begin before any charge or conviction. An accused person has the right to representation at every stage.',
    situation:
      'An allegation of a sexual offence has consequences immediately, before any charge or conviction. The investigation can take months or years, during which bail conditions may restrict daily life. Representation at interview under caution — and throughout the investigation — determines every decision that follows.',
    actions: [
      'Pre-charge representation — advice during the investigation before a decision to charge.',
      'Police interview under caution — sexual offence interviews are conducted under specific procedures and can be extended.',
      'Bail conditions: challenging conditions imposed during the investigation.',
      'Digital evidence: devices and accounts are routinely examined in sexual offence investigations.',
      'Complainant evidence: special measures, prior statements, and third-party disclosure.',
      'Crown Court trial and, where relevant, Sexual Harm Prevention Order hearings.',
    ],
    process: [
      'A short call, in complete confidence, to understand the allegation, the stage of the investigation, and whether an interview has been requested.',
      'A written client-care letter setting out scope and fee.',
      "Review of the prosecution's case — the digital evidence, the complainant's account, and any third-party material.",
      'Representation at every stage: police interview, bail hearings, and Crown Court through to verdict.',
    ],
    processHeading: 'How a sexual offence case proceeds',
    processProse: [
      'An allegation has consequences straight away, before any charge. Investigations are carried out by specialist officers and can last months, with bail conditions restricting daily life while they continue. What is said at the interview under caution shapes everything that follows.',
      'These cases are tried in the Crown Court. The complainant has lifelong anonymity and usually gives evidence from behind a screen or by video link, and there are strict limits on how they can be questioned. A defendant has no automatic anonymity and may be named once charged.',
      'Astons Law Chambers represents people under investigation or charged with a sexual offence, from interview onwards. The first call is in confidence — call 07922 247 999.',
    ],
    actionsHeading: 'How the defence is built',
    actionsProse: [
      'Consent is most often the central issue: whether the prosecution can prove the complainant did not consent and that the defendant did not reasonably believe they did. The account each side gives, and the digital record around it, are examined closely.',
      'Messages, social media, and other digital evidence frequently matter as much as oral testimony. Where a complainant’s previous behaviour is relevant, the court’s permission is needed before it can be raised, and that is a careful, separate application.',
      'Astons Law Chambers takes on sexual offence cases in the Crown Court, including related order hearings. Call 07922 247 999, in confidence.',
    ],
    faqs: [
      {
        q: 'I have been arrested but not charged — what happens now?',
        a: 'The investigation can take many months, and bail conditions may restrict where you go and who you contact while it continues. You can be represented throughout, not only once charged, and acting early protects your account. Call 07922 247 999.',
      },
      {
        q: 'Can the investigation be kept confidential?',
        a: 'The first call is in complete confidence. A person under investigation is not usually named publicly, though that can change once a charge is brought. What can be kept private at each stage is explained on the call. Call 07922 247 999.',
      },
      {
        q: 'What is a Sexual Harm Prevention Order?',
        a: 'It is a court order that can be imposed after conviction and may restrict things such as internet use, travel, or contact with named people. Its terms can be argued, and how it would apply is addressed as part of the case. Call 07922 247 999.',
      },
      {
        q: 'Is legal aid available for sexual offences?',
        a: 'Astons Law Chambers is not a legal aid contract holder. Where legal aid applies, it is arranged through a partner solicitor firm at no cost to you. Call 07922 247 999.',
      },
    ],
    context: {
      eyebrow: 'Allegation',
      title: 'The consequences start before any conviction.',
      body: 'Employment, relationships, and bail conditions are all affected before the case reaches a court. Representation from the earliest stage keeps the options open and the process properly managed.',
    },
    policeStation: {
      title: 'Under caution for a sexual offence — call before the interview. These interviews are long and consequential.',
    },
    related: ['criminal-defence', 'appeals', 'youth-crimes'],
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
