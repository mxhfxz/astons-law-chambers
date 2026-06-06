# Gemini Deep Research prompt — PA & sub-page content research

Paste the block below into Gemini (Deep Research). Output feeds the prose rewrite
of all 19 practice-area / sub-pages. Researches law & procedure only — Astons /
Ghulam facts are layered in separately from `verified_facts`, never from the web.

---

You are a legal research analyst specialising in criminal law in England & Wales. I am writing the website pages for a criminal defence practice and need rigorous, source-backed research so a human can write accurate, professional page content. Produce a detailed research dossier covering the areas listed below. A person will turn your dossier into prose, so prioritise depth, accuracy and nuance over formatting.

JURISDICTION & CURRENCY
- England & Wales only. State the law as it stands in 2026.
- Cite an authoritative official source for every substantive claim: legislation.gov.uk, the Sentencing Council, CPS legal guidance, gov.uk, judiciary.uk, or the relevant court.
- Where the law has recently changed, is under active reform, or you are not certain it is current, mark it "⚠ VERIFY" and say what is uncertain and as of when. Do not present uncertain law as settled.
- Do not invent statutory section numbers, case names, or sentencing figures. Only give a section number, citation, or numeric range if it comes from a current official source, and put that source next to it. If you cannot source a specific number, describe it qualitatively and flag it.

COMPLIANCE GUARDRAILS (this content will sit on a regulated barrister's website)
- No guarantees or predictions of outcome. Frame defence work as what is examined, tested and argued — never "we win" or "charges dropped".
- Accurately distinguish: the roles of a barrister vs a solicitor; police-station representation; Magistrates' Court vs Crown Court; and where each offence is investigated, tried and sentenced.
- For driving / motoring offences, set out the consequences accurately (disqualification, penalty points, endorsements, etc.). Note that indicative fee and VAT transparency is a regulatory requirement for motoring work.
- Describe real consequences factually. No sensationalism, no scare tactics.

AUDIENCE
The reader has usually just been arrested, charged, interviewed under caution, or accused. They are searching under stress and need to understand what is happening to them. Surface what that person actually needs to know and the questions they genuinely ask.

FOR EACH AREA BELOW, RETURN THESE EIGHT SECTIONS:
1. Definition & scope — what the offence/area covers in plain English; the governing statute or framework (with source); whether it is summary, either-way or indictable; which court(s) hear it.
2. What is genuinely at stake — the real consequences on conviction (custody, driving disqualification, criminal record, ancillary/ancillary orders, notification or registration requirements, etc.), with sources. Note well-established collateral effects (employment, travel, immigration status) where relevant.
3. How a case proceeds — the realistic procedural journey: investigation, police station and interview under caution, charge, first hearing, allocation and plea, trial, sentence. Identify the time-sensitive moments where early legal advice changes things.
4. The substance of a defence — what an experienced criminal defence advocate actually scrutinises on this specific type of case: the evidence, the procedure followed, disclosure, identification, intent/state of mind, reliability of forensic or roadside tests, witness accounts, and so on. Be specific to the offence, not generic. No outcome promises.
5. Sentencing approach — how sentencing works for this offence in general terms: that the Sentencing Council guideline applies, the culpability/harm factors that move a case up or down, and the realistic range of disposals. Give numeric ranges only if taken directly from the current guideline, with the source; otherwise describe qualitatively and flag.
6. Real questions people ask — 6 to 10 genuine questions a defendant searches for about this offence, each with an accurate, source-backed answer. These become the page FAQs.
7. Terminology & nuance — the correct legal terms, common public misconceptions, and the distinctions a knowledgeable page must get right (e.g. s.18 vs s.20 GBH; possession vs possession with intent; the difference between drink and drug driving procedures).
8. Sources — the authoritative sources used for this area, with links.

AREAS TO RESEARCH

Parent areas
1. General criminal defence (across Magistrates' and Crown Court)
2. Violent offences (the assault spectrum — common assault through to the most serious)
3. Youth crime (under-18 defendants; the youth justice system; reporting restrictions)
4. Driving / motoring offences (general)
5. Drug offences (general)
6. Appeals (Court of Appeal Criminal Division, and Crown Court appeals against Magistrates' decisions)
7. Inquests (Coroner's Court — note: the reader here is often a bereaved family member, not an accused person; reflect that in what you surface)
8. Fraud & financial crime
9. Sexual offences (the reader is someone accused of a serious offence; cover anonymity, safeguarding and the particular sensitivity)

Sub-topics (research each as a focused, specific topic)
- Driving: drink driving; drug driving; totting up / penalty-point disqualification (including the exceptional hardship argument)
- Violent: grievous bodily harm (GBH); knife crime / possession of a bladed article; domestic abuse and coercive control; robbery
- Drugs: possession with intent to supply; drug supply / dealing; county lines

OUTPUT FORMAT
Use a clear heading for each area (its name), then the eight numbered sections. Be thorough — long, specific and sourced is the goal. This is research for extraction; the finished prose comes later.

DO NOT INCLUDE
- Any named law firm, chambers, barrister or solicitor — research the law and procedure generically; the practice's own details are added separately.
- Any jurisdiction other than England & Wales.
- Marketing language, persuasion, or outcome guarantees — only accurate, sourced substance.

---

## After the research comes back

The dossier feeds a rewrite that:
- Converts every page from terse bullet lists to **prose** (definition, the stakes, how a case runs, the substance of the defence, sentencing in plain terms, real FAQs).
- Layers Astons / Ghulam facts from `verified_facts` over the generic legal substance.
- Runs through `avoid-ai-writing` + the project voice rules (no marketing speak, no rule-of-three, no hollow intensifiers, entity-first).
- Keeps every operational/legal claim 🚩-flagged for sign-off; no unverified section numbers or sentencing figures ship.
- Likely needs a template change: the `actions` `<ul>` and `process` `<ol>` become prose blocks.
