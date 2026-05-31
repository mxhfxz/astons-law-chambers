# Sub-page Content — Research Findings

All content follows `PracticeArea` interface from `lib/practice-areas.ts`.  
Sub-pages add `parentSlug`. Copy-paste into TypeScript files in the implementation session.

**Rules applied:**
- No statutory section numbers
- No specific sentencing figures — guideline referenced by existence only
- 🚩 marks any claim that needs client confirmation before going live
- Definitions: 40–60 words, answer-first
- Page titles and `metaTitle`: "Criminal Defence" variants only — no "barrister"

---

## DRIVING OFFENCES SUB-PAGES

---

### 1. Drink Driving

```ts
{
  parentSlug: 'driving-offences',
  slug: 'drink-driving',
  title: 'Drink Driving Defence',
  metaTitle: 'Drink Driving Defence | Criminal Defence | London & UK',
  metaDescription: 'Criminal defence for drink driving charges in London. Breath test challenges, procedural defences, Magistrates\' Court representation. Call 07922 247 999.',
  // ↑ 157 chars ✓
  kicker: 'Driving Offences',
  cardSummary: 'Drink driving charge. Breath test procedure, disqualification, special reasons.',
  definition:
    'Drink driving is the offence of driving, or attempting to drive, with alcohol above the prescribed limit in breath, blood, or urine. The limit applies regardless of impairment. The offence is tried in the Magistrates\' Court. Disqualification is mandatory on conviction.',
  // ↑ 44 words ✓
  situation:
    'A charge or summons arrives and the immediate concern is whether the licence will survive. For many people, losing the licence means losing work. Whether there is a challenge to the reading, the procedure, or the circumstances is a question that must be asked before a plea is entered.',
  actions: [
    'Breath, blood, and urine procedure challenges.',
    'Calibration and device-reliability challenges.',
    'Hip flask and post-driving alcohol arguments.',
    'Special reasons hearings — avoiding disqualification where the offence is made out.',
    'Medical conditions and prescribed medication arguments.',
    'Magistrates\' Court trial representation.',
  ],
  process: [
    'A short call to go through the reading, the procedure at the roadside and station, and the hearing date.',
    'A written client-care letter setting out scope and fee.',
    'Disclosure review — calibration records, the breath testing procedure, and any gaps in it.',
    'Representation at the Magistrates\' Court.',
  ],
  faqs: [
    {
      q: 'My reading was over the limit — is there any point fighting it?',
      a: 'Yes. The reading and the procedure are both covered in the first call. Call 07922 247 999.',
    },
    {
      q: 'Can I avoid a disqualification?',
      a: 'Disqualification is mandatory on conviction. Whether a special reasons argument is available on the facts is covered in the first call. Call 07922 247 999.',
    },
    {
      q: 'What if the roadside test showed positive but I feel fine?',
      a: 'The reading and the procedure are both reviewed. The first call covers what the disclosure shows. Call 07922 247 999.',
    },
    {
      q: 'Will I lose my job?',
      a: 'For many people, the licence is the main concern. What the case can do on that question is covered in the first call. Call 07922 247 999.',
    },
    {
      q: 'What happens at the police station?',
      a: 'After a positive roadside test, you are taken to the police station for a formal specimen. The procedure at that stage is part of what is reviewed. Call 07922 247 999 before that process completes where possible.',
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
}
```

---

### 2. Drug Driving

```ts
{
  parentSlug: 'driving-offences',
  slug: 'drug-driving',
  title: 'Drug Driving Defence',
  metaTitle: 'Drug Driving Defence | Criminal Defence | London & UK',
  metaDescription: 'Criminal defence for drug driving charges in London. Prescribed medication defence, procedure challenges, Magistrates\' Court. Call 07922 247 999.',
  // ↑ 146 chars ✓
  kicker: 'Driving Offences',
  cardSummary: 'Drug driving charge. Prescribed medication, procedure challenge, Magistrates\' Court.',
  definition:
    'Drug driving covers two distinct offences: driving while impaired by drugs, and driving with a specified controlled drug above a legal limit in blood. The second offence can catch drivers on prescribed medication even where they were not impaired.',
  // ↑ 42 words ✓
  situation:
    'The offence increasingly catches drivers on prescribed medication who had no reason to suspect they were breaking the law. Whether the drug was recreational or prescribed, the procedure used to obtain the blood specimen is the starting point for any defence.',
  actions: [
    'Prescribed medication statutory defence — where a doctor or dentist prescribed the drug and it was taken in accordance with advice given.',
    'Blood specimen procedure challenges — consent, delay, continuity of sample.',
    'Roadside drug swipe test reliability challenges.',
    'Impairment-based offence: challenging the evidence that the driver was unfit through drugs.',
    'Magistrates\' Court representation and sentencing mitigation.',
  ],
  process: [
    'A short call to identify the drug alleged, whether it was prescribed, and the procedure followed at the roadside and station.',
    'A written client-care letter setting out scope and fee.',
    'Disclosure review — the roadside test record, the blood specimen procedure, and the laboratory result.',
    'Representation at the Magistrates\' Court.',
  ],
  faqs: [
    {
      q: 'I was taking prescribed medication — is that still drug driving?',
      a: 'Yes. The charge can apply to prescribed medication. What applies to your situation is covered in the first call. Call 07922 247 999.',
    },
    {
      q: 'Can a blood test result be challenged?',
      a: 'Yes. The blood specimen procedure is part of what is reviewed. The first call covers what the disclosure shows. Call 07922 247 999.',
    },
    {
      q: 'What happens at the roadside?',
      a: 'The roadside test is screening only. What follows at the police station is what the first call covers. Call 07922 247 999.',
    },
    {
      q: 'What is the penalty for drug driving?',
      a: 'Drug driving carries disqualification. The sentencing range and what applies to your situation are covered in the first call. Call 07922 247 999.',
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
}
```

---

### 3. Totting Up / Licence Disqualification

```ts
{
  parentSlug: 'driving-offences',
  slug: 'totting-up',
  title: 'Totting Up & Licence Disqualification',
  metaTitle: 'Totting Up Disqualification | Exceptional Hardship | London & UK',
  metaDescription: 'Criminal defence for totting-up disqualification in London. Exceptional hardship arguments, 12-point threshold, licence protection. Call 07922 247 999.',
  // ↑ 153 chars ✓
  kicker: 'Driving Offences',
  cardSummary: 'Twelve or more penalty points. Exceptional hardship. New driver revocation.',
  definition:
    'Totting up is the accumulation of 12 or more penalty points within three years, which triggers a mandatory disqualification. A driver at the threshold can argue exceptional hardship to avoid the ban. The threshold and the argument are distinct steps; the offence is not contested at the exceptional hardship hearing.',
  // ↑ 50 words ✓
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
    'Representation at the Magistrates\' Court hearing.',
  ],
  faqs: [
    {
      q: 'Can I avoid the ban if I have 12 or more points?',
      a: 'An exceptional hardship argument is available to the court. Whether it applies to your situation is covered in the first call. Call 07922 247 999.',
    },
    {
      q: 'What counts as exceptional hardship?',
      a: 'What the court considers depends on the facts. The first call covers whether the argument is realistic on your situation. Call 07922 247 999.',
    },
    {
      q: 'Can I use exceptional hardship again if I get more points later?',
      a: 'Whether a previous argument affects a new application depends on the grounds. The first call covers the position. Call 07922 247 999.',
    },
    {
      q: 'What happens to new drivers with 6 points?',
      a: 'New drivers who accumulate 6 or more points face different rules from established drivers. The first call covers what applies to your situation. Call 07922 247 999.',
    },
  ],
  context: {
    eyebrow: '12 points',
    title: 'The hardship argument turns on third-party consequences.',
    body: 'Courts consider dependants, employment, and those who rely on the driver. Personal inconvenience alone is not enough. The first call covers whether the argument is realistic on your facts.',
  },
  policeStation: undefined,
  related: ['driving-offences', 'drink-driving', 'drug-driving'],
}
```

---

## VIOLENT CRIMES SUB-PAGES

---

### 4. GBH Defence

```ts
{
  parentSlug: 'violent-crimes',
  slug: 'gbh',
  title: 'GBH Defence',
  metaTitle: 'GBH Defence | Grievous Bodily Harm | Criminal Defence London',
  metaDescription: 'Criminal defence for GBH charges in London. Crown Court representation, police station support. Legal aid can be discussed. Call 07922 247 999.',
  // ↑ 143 chars ✓
  kicker: 'Violent Crimes',
  cardSummary: 'Grievous bodily harm charge. Crown Court. Intent, self-defence, serious injury.',
  definition:
    'Grievous bodily harm is the causing of really serious bodily harm to another person. There are two forms: causing GBH with intent, which is tried in the Crown Court; and recklessly inflicting GBH, which is either-way. The form charged determines the sentencing range and the court venue.',
  // ↑ 47 words ✓
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
  faqs: [
    {
      q: 'I was defending myself — can I still be charged with GBH?',
      a: 'Yes. What happened and whether it constitutes a defence are questions for the first call. Call 07922 247 999.',
    },
    {
      q: 'What is the difference between the two forms of GBH?',
      a: 'The form charged affects which court hears the case and the sentencing range. The first call covers what the charge means for your situation. Call 07922 247 999.',
    },
    {
      q: 'Will I go to prison for GBH?',
      a: 'GBH carries a serious sentence. What applies to your situation is covered in the first call. Call 07922 247 999.',
    },
    {
      q: 'What if the victim does not want to give evidence?',
      a: 'The prosecution can proceed without the complainant. What the evidence shows is covered at the first call. Call 07922 247 999.',
    },
    {
      q: 'Can I get bail?',
      a: 'Bail is addressed at the first court appearance. The first call covers the position and what can be done. Call 07922 247 999.',
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
}
```

---

### 5. Knife Crime Defence

```ts
{
  parentSlug: 'violent-crimes',
  slug: 'knife-crime',
  title: 'Knife Crime Defence',
  metaTitle: 'Knife Crime Defence | Bladed Article | Criminal Defence London',
  metaDescription: 'Criminal defence for knife and bladed article charges in London. Possession, threat, lawful excuse. Crown Court representation. Call 07922 247 999.',
  // ↑ 149 chars ✓
  kicker: 'Violent Crimes',
  cardSummary: 'Bladed article possession, threatening with a knife. Custody is a realistic outcome.',
  definition:
    'Knife crime offences include carrying a bladed article or offensive weapon in a public place, threatening with a blade, and using a knife in the commission of another offence. They range from summary matters to serious Crown Court indictments, and custody is more common than people expect.',
  // ↑ 47 words ✓
  situation:
    'Custody is a realistic outcome for knife offences, particularly for threatening or for a second possession charge. The defences — lawful excuse, good reason, no knowledge of possession — turn on the specific facts. Early instruction allows the evidence that supports them to be gathered before it is lost.',
  actions: [
    'Possession of a bladed article in a public place — lawful excuse and good reason defences.',
    'Threatening with a bladed article — intent and context arguments.',
    'Knife used in assault or robbery: role and contribution arguments in multi-defendant cases.',
    'Second and subsequent possession offences: minimum custodial sentence implications.',
    'Crown Court trial and sentencing mitigation.',
  ],
  process: [
    'A short call to identify what was found, where, in what circumstances, and the hearing date.',
    'A written client-care letter setting out scope and fee.',
    'Disclosure review — the search record, the stop circumstances, and any CCTV or witnesses.',
    'Representation at the Magistrates\' or Crown Court.',
  ],
  faqs: [
    {
      q: 'I had the knife for work — is that a defence?',
      a: 'Work purposes can be raised as a lawful excuse. Whether it applies on the facts is covered in the first call. Call 07922 247 999.',
    },
    {
      q: 'I did not know the knife was there — can I still be convicted?',
      a: 'Knowledge of the knife being present is relevant to the case. What that means for your situation is covered in the first call. Call 07922 247 999.',
    },
    {
      q: 'What is the sentence for knife possession?',
      a: 'The sentencing range depends on the charge and the surrounding facts. The first call covers what applies to your situation. Call 07922 247 999.',
    },
    {
      q: 'I am under 18 — does it work differently?',
      a: 'Youth Court procedure applies. The first call covers what that means, and a parent or guardian should be present. Call 07922 247 999.',
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
}
```

---

### 9. Domestic Abuse & Coercive Control

```ts
{
  parentSlug: 'violent-crimes',
  slug: 'domestic-abuse',
  title: 'Domestic Abuse & Coercive Control Defence',
  metaTitle: 'Domestic Abuse Defence | Coercive Control | Criminal Defence London',
  metaDescription: 'Criminal defence for domestic abuse and coercive control allegations in London. Police station to Crown Court. Legal aid can be discussed. Call 07922 247 999.',
  // ↑ 160 chars ✓
  kicker: 'Violent Crimes',
  cardSummary: 'Domestic abuse, coercive control allegations. Special procedures. Police station to Crown Court.',
  definition:
    'Domestic abuse covers criminal allegations between intimate partners or family members: assault, harassment, stalking, and coercive or controlling behaviour. Each offence carries its own evidential framework, including risk assessments, special measures for complainants, and restraining orders that can be imposed before any conviction.',
  // ↑ 46 words ✓
  situation:
    'The police often proceed even when the complainant does not wish to press charges. An arrest triggers bail conditions, a risk assessment, and sometimes a non-molestation order — all of which affect daily life before any hearing. The strongest moment to act is at the police station, before the interview.',
  actions: [
    'Police station representation and interview advice.',
    'Bail and conditional caution challenges.',
    'Non-molestation and restraining order conditions — challenging terms imposed.',
    'Coercive control: threshold and course-of-conduct arguments.',
    'Reluctant complainant evidence and hearsay challenges.',
    'Crown Court and Magistrates\' Court trial representation.',
  ],
  process: [
    'A short call to identify the allegation, the complainant, any bail conditions in place, and the next court date.',
    'A written client-care letter setting out scope and fee.',
    'Disclosure review — the risk assessment, the complainant\'s account, CCTV, and phone records.',
    'Representation at every stage, from bail hearing through to verdict.',
  ],
  faqs: [
    {
      q: 'The complainant does not want to give evidence — will the case still go ahead?',
      a: 'It can. The prosecution can proceed without the complainant. What the case depends on is covered at the first call. Call 07922 247 999.',
    },
    {
      q: 'I have been given bail conditions — can I challenge them?',
      a: 'Yes. Conditions can be challenged. What can be done on your specific conditions is covered in the first call. Call 07922 247 999.',
    },
    {
      q: 'What is coercive or controlling behaviour?',
      a: 'Coercive control is a criminal allegation based on a pattern of behaviour in a relationship. What it means for your situation is covered in the first call. Call 07922 247 999.',
    },
    {
      q: 'Will I have a record if the case is dropped?',
      a: 'A charge and a caution have different outcomes for your record. The difference is covered in the first call. Call 07922 247 999.',
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
}
```

---

### 10. Robbery

```ts
{
  parentSlug: 'violent-crimes',
  slug: 'robbery',
  title: 'Robbery Defence',
  metaTitle: 'Robbery Defence | Crown Court Criminal Defence | London & UK',
  metaDescription: 'Criminal defence for robbery charges in London. Crown Court representation, police station support. Legal aid can be discussed. Call 07922 247 999.',
  // ↑ 150 chars ✓
  kicker: 'Violent Crimes',
  cardSummary: 'Robbery charge. Crown Court. Identification, joint enterprise, force threshold.',
  definition:
    'Robbery is theft using force or the threat of force against a person. It is an indictable offence tried in the Crown Court. Whether force or a threat of force was used — and the nature of it — is frequently a central issue in contested cases.',
  // ↑ 41 words ✓
  situation:
    'A robbery charge puts the defendant in the Crown Court facing a custodial sentence as the likely outcome on conviction. The defences — identification, joint enterprise, the degree of force used — need to be assessed against the prosecution\'s evidence before any decision about plea is made.',
  actions: [
    'Police station representation at arrest.',
    'Identification evidence challenges — CCTV, cell-site, and eyewitness evidence.',
    'Joint enterprise: contesting the defendant\'s role and knowledge.',
    'Force threshold arguments: whether what happened constituted robbery rather than theft.',
    'Aggravated robbery where a weapon was used.',
    'Crown Court trial and sentencing mitigation.',
  ],
  process: [
    'A short call to identify the allegation, the prosecution\'s evidence, and any next court date.',
    'A written client-care letter setting out scope and fee.',
    'Disclosure review — the CCTV, the identification material, and the prosecution schedule.',
    'Representation at the Crown Court through to verdict and sentence.',
  ],
  faqs: [
    {
      q: 'Will I be remanded in custody?',
      a: 'Remand is addressed at the first court appearance. The first call covers the position and what can be done. Call 07922 247 999.',
    },
    {
      q: 'The CCTV does not clearly show me — does that matter?',
      a: 'Yes. Identification evidence is reviewed in disclosure. The first call covers what the prosecution is relying on. Call 07922 247 999.',
    },
    {
      q: 'I was there but I did not use the force — will I still be convicted?',
      a: 'Being present at an offence has specific consequences in law. What your role means for the case is covered in the first call. Call 07922 247 999.',
    },
    {
      q: 'What is the sentence for robbery?',
      a: 'Robbery carries a serious sentence. What applies to your situation is covered in the first call. Call 07922 247 999.',
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
}
```

---

## DRUG OFFENCES SUB-PAGES

---

### 6. Possession with Intent to Supply

```ts
{
  parentSlug: 'drug-offences',
  slug: 'possession-with-intent',
  title: 'Possession with Intent to Supply',
  metaTitle: 'Possession with Intent to Supply | Criminal Defence | London',
  metaDescription: 'Criminal defence for possession with intent to supply charges in London. Intent challenges, disclosure review, Crown Court. Call 07922 247 999.',
  // ↑ 142 chars ✓
  kicker: 'Drug Offences',
  cardSummary: 'Possession with intent to supply. Intent is the central issue. Crown Court.',
  definition:
    'Possession with intent to supply is a more serious charge than simple possession. The prosecution must prove both that the defendant possessed a controlled drug and that they intended to supply it to another person. The evidence used to establish intent is frequently challenged.',
  // ↑ 45 words ✓
  situation:
    'The charge puts the defendant in a different sentencing bracket from simple possession. The prosecution builds the case for intent from the quantity, the packaging, digital messages, and cash. Each of those elements can be examined. The difference between possession and intent to supply is often where the defence is found.',
  actions: [
    'Intent challenges — quantity, packaging, messages, and cash evidence.',
    'Forensic challenges — purity analysis, weight, and attribution to the defendant.',
    'Personal use arguments: contesting intent by reference to the defendant\'s own use.',
    'Disclosure review for joint enterprise and supply chain role.',
    'Crown Court trial and sentencing mitigation.',
  ],
  process: [
    'A short call to identify what was found, where, and what the prosecution\'s case for intent is.',
    'A written client-care letter setting out scope and fee.',
    'Disclosure review — the forensic evidence, the digital messages, and any co-defendant material.',
    'Representation at the Crown Court through to verdict and sentence.',
  ],
  faqs: [
    {
      q: 'How does the prosecution prove intent to supply?',
      a: 'Intent is inferred from the surrounding evidence. The first call covers what the prosecution is relying on. Call 07922 247 999.',
    },
    {
      q: 'What if I was holding them for someone else?',
      a: 'The circumstances of possession and what they mean for the charge are covered in the first call. Call 07922 247 999.',
    },
    {
      q: 'What is the sentence for possession with intent to supply?',
      a: 'The sentencing range depends on the class, the quantity, and the role. The first call covers what applies to your situation. Call 07922 247 999.',
    },
    {
      q: 'Will legal aid cover this?',
      a: 'Astons Law Chambers is not a legal aid contract holder. Where legal aid applies, it is arranged through a partner solicitor firm. The first call covers the funding position. Call 07922 247 999.',
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
}
```

---

### 7. Drug Supply & Dealing

```ts
{
  parentSlug: 'drug-offences',
  slug: 'drug-supply',
  title: 'Drug Supply & Dealing Defence',
  metaTitle: 'Drug Supply Defence | Dealing Charges | Criminal Defence London',
  metaDescription: 'Criminal defence for drug supply charges in London. Role in supply chain, Crown Court. Legal aid can be discussed. Call 07922 247 999.',
  // ↑ 135 chars ✓
  kicker: 'Drug Offences',
  cardSummary: 'Drug supply and dealing. Role in the supply chain determines the sentence.',
  definition:
    'Drug supply is the offence of supplying or offering to supply a controlled drug to another person. It includes actual supply and being concerned in supply. The sentence depends heavily on the defendant\'s role — whether they were an organiser, a runner, or somewhere in between.',
  // ↑ 46 words ✓
  situation:
    'A supply charge puts the case in the Crown Court and carries a custodial sentence in most circumstances. The most important question is role: organiser, supplier, courier, or street dealer. Role determines the sentencing range and is often where the defence is built.',
  actions: [
    'Role challenges — contesting the prosecution\'s characterisation of the defendant\'s position in the supply chain.',
    'Disclosure review for digital, cell-site, and surveillance evidence.',
    'Forensic challenges — attribution, quantity, purity.',
    'Duress and exploitation defences where relevant.',
    'Guilty plea timing and sentencing mitigation.',
    'Crown Court trial representation.',
  ],
  process: [
    'A short call to identify the allegation, what the police found, and the prosecution\'s case.',
    'A written client-care letter setting out scope and fee.',
    'Disclosure review — the electronic evidence, the surveillance, and the forensic analysis.',
    'Trial preparation and representation at the Crown Court.',
  ],
  faqs: [
    {
      q: 'How does role affect the sentence?',
      a: 'Role determines the sentencing range. What role the prosecution attributes and whether that is accurate are covered in the first call. Call 07922 247 999.',
    },
    {
      q: 'I was just delivering — will that help?',
      a: 'A courier role has different implications from a leading role. What the prosecution characterises your role as, and whether that is accurate, is covered in the first call. Call 07922 247 999.',
    },
    {
      q: 'What is the difference between supply and possession with intent to supply?',
      a: 'Both charges can be brought together. What each means for your case is covered in the first call. Call 07922 247 999.',
    },
    {
      q: 'Is legal aid available for a supply case?',
      a: 'Astons Law Chambers is not a legal aid contract holder. Where legal aid applies, it is arranged through a partner solicitor firm. The first call covers the funding position. Call 07922 247 999.',
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
}
```

---

### 8. County Lines

```ts
{
  parentSlug: 'drug-offences',
  slug: 'county-lines',
  title: 'County Lines Defence',
  metaTitle: 'County Lines Defence | Modern Slavery | Criminal Defence London',
  metaDescription: 'Criminal defence for county lines charges in London. Modern slavery defence, exploitation, Crown Court. Legal aid can be discussed. Call 07922 247 999.',
  // ↑ 153 chars ✓
  kicker: 'Drug Offences',
  cardSummary: 'County lines supply network. Exploitation and modern slavery defence. Crown Court.',
  definition:
    'County lines is a drug supply model that uses a dedicated phone line and a network of individuals — often young or vulnerable people — to distribute drugs from urban centres to smaller towns. Many defendants in these cases were coerced or exploited rather than acting freely.',
  // ↑ 45 words ✓
  situation:
    'Many county lines defendants are victims of exploitation. The modern slavery and trafficking defence — and the statutory defence under the Modern Slavery Act — can be determinative if the exploitation is established. The urgency is identifying that dimension of the case before the first court appearance.',
  actions: [
    'Modern Slavery Act statutory defence — where the defendant was compelled to commit the offence as a result of slavery or exploitation.',
    'Cuckooing and exploitation evidence: identifying and documenting coercion.',
    'Role challenges — where the defendant\'s role was as a runner under direction, not an organiser.',
    'Youth context: specific protections and procedures where the defendant is under 18.',
    'Referral to the National Referral Mechanism where appropriate.',
    'Crown Court trial and sentencing mitigation.',
  ],
  process: [
    'A short call to identify the defendant\'s role, whether there are signs of exploitation, and the stage of proceedings.',
    'A written client-care letter setting out scope and fee.',
    'Investigation into the exploitation dimension — records, communications, welfare background — before any plea is entered.',
    'Representation at the Crown Court, with the modern slavery argument fully developed.',
  ],
  faqs: [
    {
      q: 'What is the modern slavery defence for county lines?',
      a: 'A statutory defence applies where the defendant was compelled to commit the offence as a result of exploitation. Whether it applies depends on the facts. The first call covers the defendant\'s situation. Call 07922 247 999.',
    },
    {
      q: 'How do I know if the exploitation defence applies?',
      a: 'Whether exploitation applies depends on the defendant\'s situation and the facts. The first call covers what is there. Call 07922 247 999.',
    },
    {
      q: 'What is cuckooing?',
      a: 'Cuckooing is the practice of using a vulnerable person\'s address as a base for supply. Its relevance to the case is covered in the first call. Call 07922 247 999.',
    },
    {
      q: 'Will I go to prison?',
      a: 'County lines cases carry serious sentences. The first call covers the defendant\'s situation. Call 07922 247 999.',
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
}
```

---

## NEW TOP-LEVEL PRACTICE AREAS

These go into `lib/practice-areas.ts` (the existing array), not the sub-pages file.
URL: `/practice-areas/fraud` and `/practice-areas/sexual-offences`.

---

### 11. Fraud & Financial Crime

```ts
{
  slug: 'fraud',
  title: 'Fraud & Financial Crime Defence',
  metaTitle: 'Fraud Defence | Financial Crime | Criminal Defence London & UK',
  metaDescription: 'Criminal defence for fraud and financial crime in London. False representation, money laundering, Crown Court. Legal aid can be discussed. Call 07922 247 999.',
  // ↑ 160 chars ✓
  kicker: 'Financial Crime',
  cardSummary: 'Fraud, false representation, money laundering. Digital evidence. Crown Court.',
  definition:
    'Fraud offences involve dishonesty and financial gain: fraud by false representation, fraud by abuse of position, money laundering, and conspiracy to defraud. Most are tried in the Crown Court. The prosecution\'s case is typically built from digital records and financial transactions.',
  // ↑ 44 words ✓
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
    'Review of the prosecution\'s financial evidence, digital materials, and disclosure schedule.',
    'Representation at every hearing through to verdict and, where required, confiscation proceedings.',
  ],
  faqs: [
    {
      q: 'I have received a letter saying I am under investigation — should I act now?',
      a: 'Yes. The investigation stage is when the key decisions are made. Call 07922 247 999.',
    },
    {
      q: 'What is fraud by false representation?',
      a: 'Fraud by false representation is what the allegation involves and what it requires the prosecution to prove. Both are covered in the first call. Call 07922 247 999.',
    },
    {
      q: 'Can digital evidence be challenged?',
      a: 'Yes. The digital evidence and how it was obtained are reviewed in disclosure. The first call covers what the prosecution has. Call 07922 247 999.',
    },
    {
      q: 'What are confiscation proceedings?',
      a: 'After a conviction, the prosecution can apply for a confiscation order. What that involves is covered in the first call. Call 07922 247 999.',
    },
    {
      q: 'What is money laundering?',
      a: 'Money laundering is an allegation about dealing with the proceeds of crime. What the charge involves and what applies to your situation are covered in the first call. Call 07922 247 999.',
    },
  ],
  context: {
    eyebrow: 'Digital evidence',
    title: 'Fraud cases are built on documents. Documents can be challenged.',
    body: 'Financial records, messages, and device data form the prosecution\'s case. The defence starts with what those records actually show.',
  },
  policeStation: {
    title: 'Under caution for fraud — call before the interview. Fraud interviews are document-heavy.',
  },
  related: ['criminal-defence', 'appeals', 'drug-offences'],
}
```

---

### 12. Sexual Offences

> **Voice note:** This page is for a person facing a serious allegation, not a general information
> reader. The voice is direct and non-sensationalising. Consequences before conviction are a
> real concern and should be acknowledged. Nothing here should read as if written for a
> legal information website.

```ts
{
  slug: 'sexual-offences',
  title: 'Sexual Offences Defence',
  metaTitle: 'Sexual Offences Defence | Criminal Defence Lawyer | London & UK',
  metaDescription: 'Criminal defence for sexual offence allegations in London. Pre-charge representation, Crown Court. Confidential. Call 07922 247 999.',
  // ↑ 132 chars ✓
  kicker: 'Criminal',
  cardSummary: 'Sexual offence allegations. Pre-charge to Crown Court. Highly sensitive.',
  definition:
    'Sexual offences are among the most serious criminal allegations a person can face. They are tried in the Crown Court. The consequences of an allegation — on employment, relationships, and daily life — begin before any charge or conviction. An accused person has the right to representation at every stage.',
  // ↑ 50 words ✓
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
    'Review of the prosecution\'s case — the digital evidence, the complainant\'s account, and any third-party material.',
    'Representation at every stage: police interview, bail hearings, and Crown Court through to verdict.',
  ],
  faqs: [
    {
      q: 'I have been arrested but not charged — what happens now?',
      a: 'The investigation can take months. During that time bail conditions may be in place. Pre-charge representation is available throughout. Call 07922 247 999.',
    },
    {
      q: 'Can the investigation be kept confidential?',
      a: 'The first call is in complete confidence. What can and cannot be kept private at each stage is covered then. Call 07922 247 999.',
    },
    {
      q: 'What is a Sexual Harm Prevention Order?',
      a: 'An SHPO is a court order that can be imposed after conviction. What it involves and how it is addressed are covered in the first call. Call 07922 247 999.',
    },
    {
      q: 'Is legal aid available for sexual offences?',
      a: 'Astons Law Chambers is not a legal aid contract holder. Where legal aid applies, it is arranged through a partner solicitor firm. The funding position is covered in the first call. Call 07922 247 999.',
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
}
```

---

## Outstanding checks before implementation

- 🚩 **"Available 24/7 for police station support"** — appears in the shared template `pa-detail.html`, not in this content. Not added here. Existing template text unchanged.
- 🚩 **"first call is free"** — appears in the shared template `pa-detail.html` ("Before you call" aside block). Not added here. Existing template text unchanged.
- **metaDescription for drug-supply**: the 135-char version is used above.
- **Sexual offences voice**: review the page against the voice note before going live. If the client has specific instructions for this page, take them before implementation.
- **Fraud `related` links**: `drug-offences` is a slightly loose adjacency. If fraud is added to the nav as a top-level PA, consider swapping to `driving-offences` or keeping as-is and reviewing after the page is live.
