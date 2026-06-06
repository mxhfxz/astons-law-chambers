import type { PracticeArea } from './practice-areas'

export interface SubPracticeArea extends PracticeArea {
  parentSlug: string
}

export const subPracticeAreas: SubPracticeArea[] = [
  // ── DRIVING OFFENCES ──────────────────────────────────────────────────────

  {
    parentSlug: 'driving-offences',
    slug: 'drink-driving',
    title: 'Drink Driving Defence',
    metaTitle: 'Drink Driving Defence | Criminal Defence | London & UK',
    metaDescription:
      "Criminal defence for drink driving charges in London. Breath test challenges, procedural defences, Magistrates' Court representation. Call 07922 247 999.",
    kicker: 'Driving Offences',
    cardSummary: 'Drink driving charge. Breath test procedure, disqualification, special reasons.',
    definition:
      "Drink driving is the offence of driving, or attempting to drive, with alcohol above the prescribed limit in breath, blood, or urine. The limit applies regardless of impairment. The offence is tried in the Magistrates' Court. Disqualification is mandatory on conviction.",
    situation:
      'A charge or summons arrives and the immediate concern is whether the licence will survive. For many people, losing the licence means losing work. Whether there is a challenge to the reading, the procedure, or the circumstances is a question that must be asked before a plea is entered.',
    actions: [
      'Breath, blood, and urine procedure challenges.',
      'Calibration and device-reliability challenges.',
      'Hip flask and post-driving alcohol arguments.',
      'Special reasons hearings — avoiding disqualification where the offence is made out.',
      'Medical conditions and prescribed medication arguments.',
      "Magistrates' Court trial representation.",
    ],
    process: [
      'A short call to go through the reading, the procedure at the roadside and station, and the hearing date.',
      'A written client-care letter setting out scope and fee.',
      'Disclosure review — calibration records, the breath testing procedure, and any gaps in it.',
      "Representation at the Magistrates' Court.",
    ],
    processHeading: 'How a drink driving case proceeds',
    processProse: [
      'It usually starts with a roadside breath test. A positive test leads to arrest and a further, formal specimen at the police station, taken on approved equipment. If that reading is unreliable, a blood or urine sample may be taken instead.',
      'You are normally charged before leaving the station and given a date at the Magistrates’ Court, where these cases are heard. A conviction brings a disqualification, so for most people the licence is what the case is really about.',
      'Astons Law Chambers provides police station support at any hour and represents drink driving cases at the Magistrates’ Court. Call 07922 247 999 to talk through the charge.',
    ],
    actionsHeading: 'How the defence is built',
    actionsProse: [
      'Because the offence does not depend on whether you felt impaired, a defence usually turns on procedure and science rather than on how you were driving. The question is whether the station followed the correct steps and whether the reading can be relied on.',
      'There are recognised arguments in the right case: that alcohol was taken after driving had ended, that the equipment was not working properly, or that a medical condition affected the result. Where the offence is made out but the circumstances were genuinely exceptional, a special reasons argument can ask the court not to disqualify.',
      'Astons Law Chambers reviews the station procedure and the disclosure before any plea is advised. The first call is free — call 07922 247 999.',
    ],
    faqs: [
      {
        q: 'My reading was over the limit — is there any point getting advice?',
        a: 'Yes. The offence depends on the reading and on the procedure used to obtain it, and both can be examined. A reading over the limit does not always mean the case is unanswerable. Call 07922 247 999.',
      },
      {
        q: 'Can I avoid a disqualification?',
        a: 'On conviction a disqualification is the normal outcome and usually cannot be avoided. The exception is a special reasons argument, which asks the court not to disqualify where the circumstances of the offence are genuinely exceptional. Whether it is realistic depends on the facts. Call 07922 247 999.',
      },
      {
        q: 'What if I refused to give a sample?',
        a: 'Failing to provide a specimen without a reasonable excuse is a separate offence, treated as seriously as driving over the limit and sometimes more so. Whether there was a reasonable excuse is itself something that can be argued. Call 07922 247 999.',
      },
      {
        q: 'What happens at the police station?',
        a: 'After a positive roadside test you are taken to the station for a formal specimen on approved equipment. How that procedure is carried out is often central to the case, which is why advice at that stage matters. Call 07922 247 999.',
      },
    ],
    context: {
      eyebrow: 'Disqualification',
      title: 'Keeping the licence is often the case.',
      body: 'The challenge, the reading, and the procedure together determine whether there is anything to argue. The first call covers what the disclosure is likely to show.',
    },
    policeStation: {
      title: 'Held for drink driving — call before the breath specimen process is complete.',
    },
    related: ['driving-offences', 'drug-driving', 'totting-up'],
  },

  {
    parentSlug: 'driving-offences',
    slug: 'drug-driving',
    title: 'Drug Driving Defence',
    metaTitle: 'Drug Driving Defence | Criminal Defence | London & UK',
    metaDescription:
      "Criminal defence for drug driving charges in London. Prescribed medication defence, procedure challenges, Magistrates' Court. Call 07922 247 999.",
    kicker: 'Driving Offences',
    cardSummary: "Drug driving charge. Prescribed medication, procedure challenge, Magistrates' Court.",
    definition:
      'Drug driving covers two distinct offences: driving while impaired by drugs, and driving with a specified controlled drug above a legal limit in blood. The second offence can catch drivers on prescribed medication even where they were not impaired.',
    situation:
      'The offence increasingly catches drivers on prescribed medication who had no reason to suspect they were breaking the law. Whether the drug was recreational or prescribed, the procedure used to obtain the blood specimen is the starting point for any defence.',
    actions: [
      'Prescribed medication statutory defence — where a doctor or dentist prescribed the drug and it was taken in accordance with advice given.',
      'Blood specimen procedure challenges — consent, delay, continuity of sample.',
      'Roadside drug swipe test reliability challenges.',
      'Impairment-based offence: challenging the evidence that the driver was unfit through drugs.',
      "Magistrates' Court representation and sentencing mitigation.",
    ],
    process: [
      'A short call to identify the drug alleged, whether it was prescribed, and the procedure followed at the roadside and station.',
      'A written client-care letter setting out scope and fee.',
      'Disclosure review — the roadside test record, the blood specimen procedure, and the laboratory result.',
      "Representation at the Magistrates' Court.",
    ],
    processHeading: 'How a drug driving case proceeds',
    processProse: [
      'It begins with a roadside swab that screens for common drugs. A positive screen leads to arrest and a blood sample taken at the station by a healthcare professional. The sample goes to a laboratory, and results can take months, so you are often released to wait before any charge is brought.',
      'These cases are heard at the Magistrates’ Court. The limits for illegal drugs are set very low, and the offence does not require proof that your driving was actually affected. A conviction brings a disqualification.',
      'Astons Law Chambers provides police station support at any hour and represents drug driving cases at the Magistrates’ Court. Call 07922 247 999 to talk through the charge.',
    ],
    actionsHeading: 'How the defence is built',
    actionsProse: [
      'A defence centres on the science and the procedure. How the blood sample was taken, stored, and transported all bear on whether the result can be relied on, and a sample that was mishandled can degrade before it is analysed.',
      'Where the drug was lawfully prescribed and taken as directed, there is a defence open to drivers who were not actually impaired. Whether it applies depends on the medication, the dose, and the advice that was given.',
      'Astons Law Chambers reviews the specimen procedure and the laboratory evidence before any plea is advised. The first call is free — call 07922 247 999.',
    ],
    faqs: [
      {
        q: 'I was taking prescribed medication — is that still drug driving?',
        a: 'It can be. The offence can catch drivers on prescription medicine, but there is a defence where the drug was prescribed and taken in line with the advice given, provided your driving was not impaired. Whether it applies depends on the medication and the dose. Call 07922 247 999.',
      },
      {
        q: 'Can a blood test result be challenged?',
        a: 'Yes. How the sample was taken, stored, and analysed all affect how much weight the result carries, and delay or poor handling can undermine it. Call 07922 247 999.',
      },
      {
        q: 'Do the police have to prove I was impaired?',
        a: 'For the limit-based offence, no. The prosecution only has to show the drug was in your blood above the set limit, not that your driving was affected. Impairment matters for a separate, older offence. Call 07922 247 999.',
      },
      {
        q: 'How long do drugs stay in the system?',
        a: 'Traces of some drugs, cannabis in particular, can remain in the blood for days after any effect has worn off, which is part of why these cases are contested. Call 07922 247 999.',
      },
    ],
    context: {
      eyebrow: 'Prescribed medication',
      title: 'The statutory defence exists — it does not apply automatically.',
      body: 'The prescription, the dosage, and the advice given are what determine the question. The first call covers the position.',
    },
    policeStation: {
      title: 'Held for drug driving — call before the blood specimen is taken where possible.',
    },
    related: ['driving-offences', 'drink-driving', 'totting-up'],
  },

  {
    parentSlug: 'driving-offences',
    slug: 'totting-up',
    title: 'Totting Up & Licence Disqualification',
    metaTitle: 'Totting Up Disqualification | Exceptional Hardship | London & UK',
    metaDescription:
      'Criminal defence for totting-up disqualification in London. Exceptional hardship arguments, 12-point threshold, licence protection. Call 07922 247 999.',
    kicker: 'Driving Offences',
    cardSummary: 'Twelve or more penalty points. Exceptional hardship. New driver revocation.',
    definition:
      'Totting up is the accumulation of 12 or more penalty points within three years, which triggers a mandatory disqualification. A driver at the threshold can argue exceptional hardship to avoid the ban. The threshold and the argument are distinct steps; the offence is not contested at the exceptional hardship hearing.',
    situation:
      'The points have accumulated and a disqualification is now automatic unless the court accepts an exceptional hardship argument. The strength of that argument depends on the consequences for others — not just the driver. The first call covers whether the facts support the argument and how to prepare it.',
    actions: [
      'Exceptional hardship hearings — representing drivers at the 12-point threshold.',
      'Evidence gathering for exceptional hardship: employment, dependants, third-party consequences.',
      'New driver licence revocation: 6 points in the first two years removes the licence and requires a retest.',
      'Disqualification review and early termination applications.',
      'Points-eligible offences: contesting the underlying offence before the points are imposed.',
    ],
    process: [
      'A short call to go through the current points total, the offence that triggers the threshold, and the court date.',
      'A written client-care letter setting out scope and fee.',
      'Preparation of the exceptional hardship argument with supporting evidence — employment, dependants, financial impact on third parties.',
      "Representation at the Magistrates' Court hearing.",
    ],
    processHeading: 'How a totting-up case works',
    processProse: [
      'Totting up is triggered when a fresh offence takes your penalty points past the limit that forces a ban. The final offence is often a minor one, such as speeding, but once the points cross the threshold the court is obliged to disqualify.',
      'The case is heard at the Magistrates’ Court. You are not contesting the latest offence at this stage; the hearing is about whether the ban must take effect. A separate hearing is set so the court can consider an exceptional hardship argument.',
      'Astons Law Chambers represents drivers facing a totting-up ban at the Magistrates’ Court. Call 07922 247 999 to talk through the points and the hearing date.',
    ],
    actionsHeading: 'How a ban is challenged',
    actionsProse: [
      'The argument here is not about guilt. It is exceptional hardship: showing the court that a ban would cause hardship well beyond the ordinary inconvenience of losing a licence.',
      'What carries weight is the effect on other people — employees who would lose work, dependants who rely on the driver, a household that would lose its income. The argument has to be built on documents and evidence, not assertion, which is where careful preparation makes the difference.',
      'Astons Law Chambers prepares and presents exceptional hardship arguments with the supporting evidence the court expects. The first call is free — call 07922 247 999.',
    ],
    faqs: [
      {
        q: 'Can I avoid a ban once I reach the points limit?',
        a: 'Sometimes. Once you reach the threshold a disqualification is the default, but the court can decide not to impose it if you prove exceptional hardship. Whether that argument is realistic depends on your circumstances. Call 07922 247 999.',
      },
      {
        q: 'What counts as exceptional hardship?',
        a: 'Ordinary hardship — the inconvenience of not driving, or even losing your own job — is usually not enough on its own. The court looks for hardship that goes further, often the serious effect a ban would have on other people who depend on you. Call 07922 247 999.',
      },
      {
        q: 'Can I use the same hardship reasons again later?',
        a: 'Generally not. If an argument succeeds, you usually cannot rely on the same grounds again within the following few years, so the reasons put forward need to be chosen carefully. Call 07922 247 999.',
      },
      {
        q: 'What happens to new drivers?',
        a: 'New drivers are treated more strictly. Passing a lower points threshold in the first couple of years after passing revokes the licence altogether, which means returning to a provisional licence and retaking the test. Call 07922 247 999.',
      },
    ],
    context: {
      eyebrow: '12 points',
      title: 'The hardship argument turns on third-party consequences.',
      body: 'Courts consider dependants, employment, and those who rely on the driver. Personal inconvenience alone is not enough. The first call covers whether the argument is realistic on your facts.',
    },
    policeStation: undefined,
    related: ['driving-offences', 'drink-driving', 'drug-driving'],
  },

  // ── VIOLENT CRIMES ───────────────────────────────────────────────────────

  {
    parentSlug: 'violent-crimes',
    slug: 'gbh',
    title: 'GBH Defence',
    metaTitle: 'GBH Defence | Grievous Bodily Harm | Criminal Defence London',
    metaDescription:
      'Criminal defence for GBH charges in London. Crown Court representation, police station support. Legal aid can be discussed. Call 07922 247 999.',
    kicker: 'Violent Crimes',
    cardSummary: 'Grievous bodily harm charge. Crown Court. Intent, self-defence, serious injury.',
    definition:
      'Grievous bodily harm is the causing of really serious bodily harm to another person. There are two forms: causing GBH with intent, which is tried in the Crown Court; and recklessly inflicting GBH, which is either-way. The form charged determines the sentencing range and the court venue.',
    situation:
      'A GBH charge carries a serious sentence and, for the more serious form, puts the case in the Crown Court. Whether the prosecution can prove the intent required for the more serious form is often the most important question in the case. The time to ask it is before plea.',
    actions: [
      'Police station representation at arrest.',
      'Bail applications and contested remand hearings.',
      'Intent arguments — the prosecution must prove state of mind for the more serious form.',
      'Self-defence and loss of control arguments.',
      'Identification and CCTV evidence challenges.',
      'Crown Court trial and sentencing mitigation.',
    ],
    process: [
      'A short call to identify the allegation, the injury, the circumstances of the arrest, and any next court date.',
      'A written client-care letter setting out scope and fee.',
      'Disclosure review — the medical evidence, the witness accounts, and any CCTV. A view on plea, venue, and trial strategy.',
      'Representation at every hearing through to verdict.',
    ],
    processHeading: 'How a GBH case proceeds',
    processProse: [
      'Because of the seriousness of the injuries, an arrest for GBH is often followed by a remand application, and police bail is frequently refused. The interview is where your account, including any claim of self-defence, is first recorded.',
      'The case is sent to the Crown Court. The prosecution relies heavily on medical evidence about the injuries, expert reports, and any CCTV. The more serious form of the offence, which requires proof of intent, carries the highest sentences.',
      'Astons Law Chambers provides police station support at any hour and represents GBH cases in the Crown Court. Call 07922 247 999 to talk through the allegation.',
    ],
    actionsHeading: 'How the defence is built',
    actionsProse: [
      'The defence separates the act from the state of mind behind it. The most serious form requires proof that you intended really serious harm; without that, the case may fall to the lesser form, which only requires recklessness. That distinction can change the whole shape of a sentence.',
      'Self-defence is tested where it arises, looking at whether the force was necessary and proportionate to the threat as you saw it. The medical evidence is examined too, to see whether the injuries truly meet the threshold the charge requires.',
      'Astons Law Chambers takes on GBH cases through to trial and sentence. The first call is free — call 07922 247 999.',
    ],
    faqs: [
      {
        q: 'I was defending myself — can I still be charged with GBH?',
        a: 'Yes. You can be charged even where you say you acted in self-defence; the question is then whether the prosecution can disprove it. Self-defence succeeds where the force was honestly thought necessary and was reasonable in the circumstances as you saw them. Call 07922 247 999.',
      },
      {
        q: 'What is the difference between the two forms of GBH?',
        a: 'Both involve really serious harm, but they differ on intent. The more serious form requires proof that you meant to cause that harm; the lesser form only requires that you were reckless as to causing some harm. The form charged sets the court and the sentencing range. Call 07922 247 999.',
      },
      {
        q: 'Will I go to prison for GBH?',
        a: 'GBH is a serious offence and a custodial sentence is a real prospect, especially for the intent form. Sentence turns on the level of harm, the circumstances, and mitigation, and reducing a charge from the intent form to the lesser form can make a significant difference. Call 07922 247 999.',
      },
      {
        q: 'Can I get bail?',
        a: 'Bail is decided at the first hearing and is often contested in GBH cases, where the court weighs the seriousness and any risk to witnesses. There is still an argument to be made, and how it is put matters. Call 07922 247 999.',
      },
    ],
    context: {
      eyebrow: 'Intent vs recklessness',
      title: 'What the prosecution has to prove determines the defence.',
      body: 'The form charged shapes the sentencing range, the court venue, and the approach to trial. Early instruction allows the case to be framed correctly from the start.',
    },
    policeStation: {
      title: 'In custody for GBH — call before the interview begins.',
    },
    related: ['violent-crimes', 'knife-crime', 'robbery'],
  },

  {
    parentSlug: 'violent-crimes',
    slug: 'knife-crime',
    title: 'Knife Crime Defence',
    metaTitle: 'Knife Crime Defence | Bladed Article | Criminal Defence London',
    metaDescription:
      'Criminal defence for knife and bladed article charges in London. Possession, threat, lawful excuse. Crown Court representation. Call 07922 247 999.',
    kicker: 'Violent Crimes',
    cardSummary: 'Bladed article possession, threatening with a knife. Custody is a realistic outcome.',
    definition:
      'Knife crime offences include carrying a bladed article or offensive weapon in a public place, threatening with a blade, and using a knife in the commission of another offence. They range from summary matters to serious Crown Court indictments, and custody is more common than people expect.',
    situation:
      'Custody is a realistic outcome for knife offences, particularly for threatening or for a second possession charge. The defences — lawful excuse, good reason, no knowledge of possession — turn on the specific facts. Early instruction allows the evidence that supports them to be gathered before it is lost.',
    actions: [
      'Possession of a bladed article in a public place — lawful excuse and good reason defences.',
      'Threatening with a bladed article — intent and context arguments.',
      "Knife used in assault or robbery: role and contribution arguments in multi-defendant cases.",
      'Second and subsequent possession offences: minimum custodial sentence implications.',
      'Crown Court trial and sentencing mitigation.',
    ],
    process: [
      'A short call to identify what was found, where, in what circumstances, and the hearing date.',
      'A written client-care letter setting out scope and fee.',
      "Disclosure review — the search record, the stop circumstances, and any CCTV or witnesses.",
      "Representation at the Magistrates' or Crown Court.",
    ],
    processHeading: 'How a knife crime case proceeds',
    processProse: [
      'Most knife allegations begin with a stop and search. What you tell the police about why you had the item, and where you had it, is recorded at interview and becomes central to the case.',
      'Simple possession can be dealt with at the Magistrates’ Court, while threatening with a blade or using one in another offence is sent to the Crown Court. The courts take a firm line, and custody is a realistic outcome even for possession, more so for a second offence.',
      'Astons Law Chambers provides police station support at any hour and represents knife cases in both courts. Call 07922 247 999 to talk through what was found and where.',
    ],
    actionsHeading: 'How the defence is built',
    actionsProse: [
      'The first question is often whether the stop and search was lawful. Where it was not, there may be grounds to challenge how the item came to be found at all.',
      'If possession is admitted, the law allows for a good reason or lawful authority — a blade needed for work, for example, or as part of a religious observance. Carrying something for self-protection is not a good reason. Whether a recognised reason applies turns on the precise facts at the moment of the stop.',
      'Astons Law Chambers takes on possession and threatening offences through to trial and sentence. The first call is free — call 07922 247 999.',
    ],
    faqs: [
      {
        q: 'I had the knife for work — is that a defence?',
        a: 'It can be. Needing a blade for work is a recognised good reason, but it has to fit the facts: what the item was, why you had it at that moment, and where you were stopped. The same does not apply to carrying something for protection. Call 07922 247 999.',
      },
      {
        q: 'I did not know the knife was there — can I still be convicted?',
        a: 'Knowledge matters. If you genuinely did not know the item was on you or in your vehicle, that goes to the heart of the case, though it has to be supported by the circumstances. Call 07922 247 999.',
      },
      {
        q: 'Will I go to prison for carrying a knife?',
        a: 'Custody is a real possibility. The courts treat knife possession as a deterrent matter, and a second possession offence in particular carries a minimum custodial sentence in most cases. The circumstances and mitigation still matter. Call 07922 247 999.',
      },
      {
        q: 'I am under 18 — does it work differently?',
        a: 'Yes. A young person’s case is heard in the Youth Court under its own procedure, with reporting restrictions and a parent or guardian involved, and the approach to sentence is different from the adult courts. Call 07922 247 999.',
      },
    ],
    context: {
      eyebrow: 'Custody risk',
      title: 'Defences turn on what was found, where, and why.',
      body: 'Lawful excuse and good reason must be argued with evidence. The first call covers what the disclosure shows.',
    },
    policeStation: {
      title: 'Arrested for a knife offence — call before the interview begins.',
    },
    related: ['violent-crimes', 'gbh', 'robbery'],
  },

  {
    parentSlug: 'violent-crimes',
    slug: 'domestic-abuse',
    title: 'Domestic Abuse & Coercive Control Defence',
    metaTitle: 'Domestic Abuse Defence | Coercive Control | Criminal Defence London',
    metaDescription:
      'Criminal defence for domestic abuse and coercive control allegations in London. Police station to Crown Court. Legal aid can be discussed. Call 07922 247 999.',
    kicker: 'Violent Crimes',
    cardSummary:
      'Domestic abuse, coercive control allegations. Special procedures. Police station to Crown Court.',
    definition:
      "Domestic abuse covers criminal allegations between intimate partners or family members: assault, harassment, stalking, and coercive or controlling behaviour. Each offence carries its own evidential framework, including risk assessments, special measures for complainants, and restraining orders that can be imposed before any conviction.",
    situation:
      'The police often proceed even when the complainant does not wish to press charges. An arrest triggers bail conditions, a risk assessment, and sometimes a non-molestation order — all of which affect daily life before any hearing. The strongest moment to act is at the police station, before the interview.',
    actions: [
      'Police station representation and interview advice.',
      'Bail and conditional caution challenges.',
      'Non-molestation and restraining order conditions — challenging terms imposed.',
      'Coercive control: threshold and course-of-conduct arguments.',
      'Reluctant complainant evidence and hearsay challenges.',
      "Crown Court and Magistrates' Court trial representation.",
    ],
    process: [
      'A short call to identify the allegation, the complainant, any bail conditions in place, and the next court date.',
      'A written client-care letter setting out scope and fee.',
      "Disclosure review — the risk assessment, the complainant's account, CCTV, and phone records.",
      'Representation at every stage, from bail hearing through to verdict.',
    ],
    processHeading: 'How a domestic abuse case proceeds',
    processProse: [
      'These cases often move forward even when the complainant does not want to pursue them, because the decision rests with the prosecution rather than the individual. An arrest usually brings immediate bail conditions, which can mean leaving your home and having no contact with the complainant while the case runs.',
      'Coercive control allegations are built differently from a single assault. The police gather phone data, messages, and financial records to show a pattern of behaviour over time, and the case is often heard in the Crown Court.',
      'Astons Law Chambers provides police station support at any hour and represents domestic abuse cases in both courts. Call 07922 247 999 to talk through the allegation and any bail conditions.',
    ],
    actionsHeading: 'How the defence is built',
    actionsProse: [
      'Where coercive control is alleged, the defence tests whether the behaviour really crosses the legal line: whether it was a genuine pattern with a serious effect, or ordinary relationship conflict recast after the fact. Context is everything, and isolated messages can read very differently when seen in full.',
      'Where the complainant withdraws, the prosecution may still try to proceed on the surrounding evidence, and the strength of that evidence can be challenged. Bail conditions imposed in the meantime can also be contested.',
      'Astons Law Chambers takes on domestic abuse and coercive control cases from the police station onward. The first call is free — call 07922 247 999.',
    ],
    faqs: [
      {
        q: 'The complainant does not want to give evidence — will the case still go ahead?',
        a: 'It can. The decision to prosecute belongs to the Crown, not the complainant, and cases sometimes continue on other evidence such as messages or a recorded 999 call. How strong that evidence is can be tested. Call 07922 247 999.',
      },
      {
        q: 'I have been given bail conditions — can I challenge them?',
        a: 'Yes. Conditions such as being kept out of your home or away from your children can be challenged, and the court can vary them. Whether a challenge is likely to succeed depends on the circumstances. Call 07922 247 999.',
      },
      {
        q: 'What is coercive or controlling behaviour?',
        a: 'It is a pattern of behaviour against someone you are personally connected to that controls or frightens them — for example isolating them, controlling money, or monitoring their movements. It does not require physical violence, but it does require a repeated course of conduct with a serious effect. Call 07922 247 999.',
      },
      {
        q: 'Will I have a record if the case is dropped?',
        a: 'If the matter is dropped with no charge or caution, there is no conviction. An arrest can still be recorded, and a caution counts differently from a charge, so what shows up later depends on how the case ends. Call 07922 247 999.',
      },
    ],
    context: {
      eyebrow: 'Bail and conditions',
      title: 'The arrest triggers consequences before any conviction.',
      body: 'Bail conditions, non-molestation orders, and contact restrictions affect daily life immediately. Acting early keeps the options open.',
    },
    policeStation: {
      title: 'Arrested for domestic abuse — call before the interview. The first account matters.',
    },
    related: ['violent-crimes', 'gbh', 'youth-crimes'],
  },

  {
    parentSlug: 'violent-crimes',
    slug: 'robbery',
    title: 'Robbery Defence',
    metaTitle: 'Robbery Defence | Crown Court Criminal Defence | London & UK',
    metaDescription:
      'Criminal defence for robbery charges in London. Crown Court representation, police station support. Legal aid can be discussed. Call 07922 247 999.',
    kicker: 'Violent Crimes',
    cardSummary: 'Robbery charge. Crown Court. Identification, joint enterprise, force threshold.',
    definition:
      'Robbery is theft using force or the threat of force against a person. It is an indictable offence tried in the Crown Court. Whether force or a threat of force was used — and the nature of it — is frequently a central issue in contested cases.',
    situation:
      "A robbery charge puts the defendant in the Crown Court facing a custodial sentence as the likely outcome on conviction. The defences — identification, joint enterprise, the degree of force used — need to be assessed against the prosecution's evidence before any decision about plea is made.",
    actions: [
      'Police station representation at arrest.',
      'Identification evidence challenges — CCTV, cell-site, and eyewitness evidence.',
      "Joint enterprise: contesting the defendant's role and knowledge.",
      'Force threshold arguments: whether what happened constituted robbery rather than theft.',
      'Aggravated robbery where a weapon was used.',
      'Crown Court trial and sentencing mitigation.',
    ],
    process: [
      "A short call to identify the allegation, the prosecution's evidence, and any next court date.",
      'A written client-care letter setting out scope and fee.',
      'Disclosure review — the CCTV, the identification material, and the prosecution schedule.',
      'Representation at the Crown Court through to verdict and sentence.',
    ],
    processHeading: 'How a robbery case proceeds',
    processProse: [
      'Robbery is treated as one of the most serious offences, so an arrest is usually followed by a remand application and bail is hard to secure. The investigation leans on CCTV, phone location data, and identification procedures to place a suspect at the scene.',
      'The case bypasses any trial at the Magistrates’ Court and is sent straight to the Crown Court. On conviction a custodial sentence is the usual starting point, even for someone with no previous convictions.',
      'Astons Law Chambers provides police station support at any hour and represents robbery cases in the Crown Court. Call 07922 247 999 to talk through the allegation.',
    ],
    actionsHeading: 'How the defence is built',
    actionsProse: [
      'Identification is frequently the first battleground. Where a suspect was masked or the incident was brief, eyewitness accounts and CCTV can be tested for reliability, and the accuracy of phone location evidence can be challenged.',
      'Where more than one person is involved, the question is what each actually did and intended. Being present is not the same as taking part, and the defence examines whether a person shared the intention to use force and steal. Whether what happened was truly robbery, rather than a separate theft and assault, can also be in issue.',
      'Astons Law Chambers takes on robbery cases through to trial and sentence. The first call is free — call 07922 247 999.',
    ],
    faqs: [
      {
        q: 'Will I be remanded in custody?',
        a: 'Possibly. Bail is contested in robbery cases, and the court weighs the seriousness and any risk to witnesses, so remand is a real prospect. There is still a bail argument to make, and how it is presented matters. Call 07922 247 999.',
      },
      {
        q: 'The CCTV does not clearly show me — does that matter?',
        a: 'Yes. Identification is often the weakest part of a robbery case. Unclear footage, a brief sighting, or a masked suspect all give grounds to test how safe the identification really is. Call 07922 247 999.',
      },
      {
        q: 'I was there but I did not use force — will I still be convicted?',
        a: 'Not automatically. The prosecution would have to show you shared the plan to use force and steal, not merely that you were present. What you knew and what you did are exactly what the defence examines. Call 07922 247 999.',
      },
      {
        q: 'What makes it robbery rather than theft?',
        a: 'Robbery is theft combined with force, or the threat of force, used in order to steal. If force was not used to carry out the theft — for example a fight that happened to be followed by a taking — the right charges may be separate theft and assault, which are treated differently. Call 07922 247 999.',
      },
    ],
    context: {
      eyebrow: 'Crown Court',
      title: 'Identification and role are the two most important questions.',
      body: 'Who was there, what they knew, and what they did are each open to examination. Early disclosure review reveals what the prosecution has.',
    },
    policeStation: {
      title: 'Arrested for robbery — call before the interview. The first account matters.',
    },
    related: ['violent-crimes', 'gbh', 'knife-crime'],
  },

  // ── DRUG OFFENCES ────────────────────────────────────────────────────────

  {
    parentSlug: 'drug-offences',
    slug: 'possession-with-intent',
    title: 'Possession with Intent to Supply',
    metaTitle: 'Possession with Intent to Supply | Criminal Defence | London',
    metaDescription:
      'Criminal defence for possession with intent to supply charges in London. Intent challenges, disclosure review, Crown Court. Call 07922 247 999.',
    kicker: 'Drug Offences',
    cardSummary: 'Possession with intent to supply. Intent is the central issue. Crown Court.',
    definition:
      'Possession with intent to supply is a more serious charge than simple possession. The prosecution must prove both that the defendant possessed a controlled drug and that they intended to supply it to another person. The evidence used to establish intent is frequently challenged.',
    situation:
      'The charge puts the defendant in a different sentencing bracket from simple possession. The prosecution builds the case for intent from the quantity, the packaging, digital messages, and cash. Each of those elements can be examined. The difference between possession and intent to supply is often where the defence is found.',
    actions: [
      'Intent challenges — quantity, packaging, messages, and cash evidence.',
      "Forensic challenges — purity analysis, weight, and attribution to the defendant.",
      "Personal use arguments: contesting intent by reference to the defendant's own use.",
      'Disclosure review for joint enterprise and supply chain role.',
      'Crown Court trial and sentencing mitigation.',
    ],
    process: [
      "A short call to identify what was found, where, and what the prosecution's case for intent is.",
      'A written client-care letter setting out scope and fee.',
      'Disclosure review — the forensic evidence, the digital messages, and any co-defendant material.',
      'Representation at the Crown Court through to verdict and sentence.',
    ],
    processHeading: 'How a possession with intent case proceeds',
    processProse: [
      'These cases usually follow a stop, a vehicle search, or a search of a property that turns up drugs alongside items the police read as signs of dealing — packaging, scales, cash, or a second phone. What you say at interview about why those things were there matters from the start.',
      'Because intent to supply is alleged, the case is usually sent to the Crown Court, which puts it in a far higher sentencing bracket than simple possession. Phones and devices are examined for messages, and that analysis can take months.',
      'Astons Law Chambers provides police station support at any hour and represents these cases in the Crown Court. Call 07922 247 999 to talk through what was found.',
    ],
    actionsHeading: 'How the defence is built',
    actionsProse: [
      'The dividing line between possession and intent to supply is where most of these cases are won or lost. The prosecution builds intent from circumstantial evidence — the quantity, how it was packaged, cash, and messages — and each strand can be examined and explained.',
      'Where the drugs were genuinely for personal use, even in a larger quantity bought to save money, that account can be put forward. The forensic evidence on weight and purity, and whether the items can be attributed to you at all, are also open to challenge.',
      'Astons Law Chambers takes on possession with intent cases through to trial and sentence. The first call is free — call 07922 247 999.',
    ],
    faqs: [
      {
        q: 'How does the prosecution prove intent to supply?',
        a: 'Rarely by catching someone in the act. Intent is usually inferred from the surrounding evidence — the quantity, individual packaging, scales, cash, and messages on a phone. Because it is built on inference, each part of it can be questioned. Call 07922 247 999.',
      },
      {
        q: 'What if I was holding them for someone else?',
        a: 'Holding drugs for another person can still be supply in law, but the circumstances matter a great deal, including whether you were pressured or exploited into doing it. How that is presented can change the charge or the sentence. Call 07922 247 999.',
      },
      {
        q: 'What if they were for my own use?',
        a: 'Personal use, even of a larger amount bought in bulk, is a recognised answer to an intent to supply allegation. Whether it succeeds depends on the quantity and the rest of the evidence, but it can reduce the charge to simple possession. Call 07922 247 999.',
      },
      {
        q: 'Will legal aid cover this?',
        a: 'Astons Law Chambers is not a legal aid contract holder. Where legal aid applies, it is arranged through a partner solicitor firm at no cost to you. Call 07922 247 999.',
      },
    ],
    context: {
      eyebrow: 'Intent is the issue',
      title: 'Personal use and supply are different charges with different sentences.',
      body: 'The prosecution must prove intent. That case is built from circumstantial evidence — and each element can be examined. Early disclosure review sets the defence strategy.',
    },
    policeStation: {
      title: 'In custody for possession or supply — call before the interview begins.',
    },
    related: ['drug-offences', 'drug-supply', 'county-lines'],
  },

  {
    parentSlug: 'drug-offences',
    slug: 'drug-supply',
    title: 'Drug Supply & Dealing Defence',
    metaTitle: 'Drug Supply Defence | Dealing Charges | Criminal Defence London',
    metaDescription:
      'Criminal defence for drug supply charges in London. Role in supply chain, Crown Court. Legal aid can be discussed. Call 07922 247 999.',
    kicker: 'Drug Offences',
    cardSummary: 'Drug supply and dealing. Role in the supply chain determines the sentence.',
    definition:
      "Drug supply is the offence of supplying or offering to supply a controlled drug to another person. It includes actual supply and being concerned in supply. The sentence depends heavily on the defendant's role — whether they were an organiser, a runner, or somewhere in between.",
    situation:
      'A supply charge puts the case in the Crown Court and carries a custodial sentence in most circumstances. The most important question is role: organiser, supplier, courier, or street dealer. Role determines the sentencing range and is often where the defence is built.',
    actions: [
      "Role challenges — contesting the prosecution's characterisation of the defendant's position in the supply chain.",
      'Disclosure review for digital, cell-site, and surveillance evidence.',
      'Forensic challenges — attribution, quantity, purity.',
      'Duress and exploitation defences where relevant.',
      'Guilty plea timing and sentencing mitigation.',
      'Crown Court trial representation.',
    ],
    process: [
      "A short call to identify the allegation, what the police found, and the prosecution's case.",
      'A written client-care letter setting out scope and fee.',
      'Disclosure review — the electronic evidence, the surveillance, and the forensic analysis.',
      'Trial preparation and representation at the Crown Court.',
    ],
    processHeading: 'How a drug supply case proceeds',
    processProse: [
      'Supply cases often come out of long, covert investigations: surveillance, test purchases, or material recovered from encrypted phone networks. By the time of arrest the prosecution may hold a large volume of data, and the case can run to thousands of pages.',
      'Supply, especially of the most serious drugs, is sent to the Crown Court and carries a custodial sentence in most circumstances. Where there is a conviction, the prosecution can also move to take assets said to be the proceeds of the offending.',
      'Astons Law Chambers provides police station support at any hour and represents supply cases in the Crown Court. Call 07922 247 999 to talk through the allegation.',
    ],
    actionsHeading: 'How the defence is built',
    actionsProse: [
      'Role is the single most important question in most supply cases. The sentence for someone who organised and profited is very different from that for a courier following orders, and the defence works to place a person accurately within the operation rather than at the top of it.',
      'Much turns on attribution: whether a particular phone, message, or handle was really yours. The lawfulness of covert surveillance, the reliability of any undercover identification, and the meaning read into communications are all open to challenge. Where a person was coerced or exploited, that can be raised as well.',
      'Astons Law Chambers takes on supply and conspiracy cases through to trial and sentence. The first call is free — call 07922 247 999.',
    ],
    faqs: [
      {
        q: 'How does role affect the sentence?',
        a: 'Heavily. Sentencing for supply is built around the part you played — from leading an operation down to acting as a runner under direction. Establishing the right role, rather than accepting the prosecution’s, is often the most valuable part of the defence. Call 07922 247 999.',
      },
      {
        q: 'I was just delivering — will that help?',
        a: 'It can. Acting as a courier under direction is treated very differently from organising the supply. The prosecution’s characterisation of your role is not the final word, and it can be contested with the evidence. Call 07922 247 999.',
      },
      {
        q: 'Can I be convicted on text messages alone?',
        a: 'Potentially. Messages offering or arranging drugs, linked to a phone said to be yours, can support a conviction even without drugs being found on you. That makes attribution — proving the phone was actually yours — a key area of challenge. Call 07922 247 999.',
      },
      {
        q: 'Is legal aid available for a supply case?',
        a: 'Astons Law Chambers is not a legal aid contract holder. Where legal aid applies, it is arranged through a partner solicitor firm at no cost to you. Call 07922 247 999.',
      },
    ],
    context: {
      eyebrow: 'Role in the supply chain',
      title: 'Role is the most important argument in most supply cases.',
      body: 'What the defendant did, what they knew, and what they gained from it all form part of the case. The first call covers what the prosecution has and what can be examined.',
    },
    policeStation: {
      title: 'In custody for drug supply — call before the interview begins.',
    },
    related: ['drug-offences', 'possession-with-intent', 'county-lines'],
  },

  {
    parentSlug: 'drug-offences',
    slug: 'county-lines',
    title: 'County Lines Defence',
    metaTitle: 'County Lines Defence | Modern Slavery | Criminal Defence London',
    metaDescription:
      'Criminal defence for county lines charges in London. Modern slavery defence, exploitation, Crown Court. Legal aid can be discussed. Call 07922 247 999.',
    kicker: 'Drug Offences',
    cardSummary: 'County lines supply network. Exploitation and modern slavery defence. Crown Court.',
    definition:
      'County lines is a drug supply model that uses a dedicated phone line and a network of individuals — often young or vulnerable people — to distribute drugs from urban centres to smaller towns. Many defendants in these cases were coerced or exploited rather than acting freely.',
    situation:
      'Many county lines defendants are victims of exploitation. The modern slavery and trafficking defence — and the statutory defence under the Modern Slavery Act — can be determinative if the exploitation is established. The urgency is identifying that dimension of the case before the first court appearance.',
    actions: [
      'Modern Slavery Act statutory defence — where the defendant was compelled to commit the offence as a result of slavery or exploitation.',
      'Cuckooing and exploitation evidence: identifying and documenting coercion.',
      "Role challenges — where the defendant's role was as a runner under direction, not an organiser.",
      'Youth context: specific protections and procedures where the defendant is under 18.',
      'Referral to the National Referral Mechanism where appropriate.',
      'Crown Court trial and sentencing mitigation.',
    ],
    process: [
      "A short call to identify the defendant's role, whether there are signs of exploitation, and the stage of proceedings.",
      'A written client-care letter setting out scope and fee.',
      'Investigation into the exploitation dimension — records, communications, welfare background — before any plea is entered.',
      'Representation at the Crown Court, with the modern slavery argument fully developed.',
    ],
    processHeading: 'How a county lines case proceeds',
    processProse: [
      'These cases are built from phone and location data linking a controlling line to the movements of the people carrying drugs. Arrests often happen at an address that has been taken over from a vulnerable occupant, or during a journey between towns.',
      'The charges are usually supply or conspiracy and are heard in the Crown Court, where sentences for those running an operation are severe. For the young or vulnerable people used as couriers, the most important early step is identifying whether they were exploited rather than acting freely.',
      'Astons Law Chambers provides police station support at any hour and represents county lines cases in the Crown Court. Call 07922 247 999 — raise any sign of exploitation as early as possible.',
    ],
    actionsHeading: 'How the defence is built',
    actionsProse: [
      'Where a person was coerced or trafficked into carrying drugs, there is a statutory defence for those compelled to offend through exploitation. Establishing it can be decisive, and it can be supported by a formal referral that assesses whether someone is a victim of modern slavery.',
      'The threshold is more protective for children than for adults. Beyond that defence, role still matters: someone directed as a runner is in a very different position from an organiser, and the evidence of exploitation, coercion, and background all bear on how the case is resolved.',
      'Astons Law Chambers develops the exploitation dimension early and represents these cases through to trial and sentence. The first call is free — call 07922 247 999.',
    ],
    faqs: [
      {
        q: 'What is the modern slavery defence for county lines?',
        a: 'It is a defence for people who committed an offence because they were forced to through exploitation or trafficking. If it is established, it can prevent a conviction altogether. Whether it applies depends on the individual’s circumstances. Call 07922 247 999.',
      },
      {
        q: 'How do I know if the exploitation defence applies?',
        a: 'It depends on how the person came to be involved: whether they were coerced, threatened, or controlled, and how old they are, since the protection is stronger for under-18s. A formal assessment can help establish it, and that process can be started early. Call 07922 247 999.',
      },
      {
        q: 'What is cuckooing?',
        a: 'It is where a gang takes over the home of a vulnerable person and uses it as a base for dealing. Recognising that someone was a victim of cuckooing, rather than a willing participant, can change the whole direction of their case. Call 07922 247 999.',
      },
      {
        q: 'My child has been arrested — what should I do?',
        a: 'Call as early as possible, and raise any sign that they were pressured or exploited before the interview takes place. Children drawn into county lines are often victims first, and that has to be identified from the outset. A parent or guardian can be present. Call 07922 247 999.',
      },
    ],
    context: {
      eyebrow: 'Modern Slavery Act',
      title: 'Exploitation can be a complete defence.',
      body: 'Exploitation in county lines cases is identified at the earliest stage. The first call covers the defendant\'s situation.',
    },
    policeStation: {
      title: 'Arrested for county lines — signs of exploitation should be raised before the interview.',
    },
    related: ['drug-offences', 'drug-supply', 'possession-with-intent'],
  },
]

export function getSubPracticeArea(
  parentSlug: string,
  slug: string,
): SubPracticeArea | undefined {
  return subPracticeAreas.find((a) => a.parentSlug === parentSlug && a.slug === slug)
}

export function getSubAreaBySlug(slug: string): SubPracticeArea | undefined {
  return subPracticeAreas.find((a) => a.slug === slug)
}
