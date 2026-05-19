// Guide / resource articles. Client-authored long-form advice content
// (sourced from the two arrest/interview PDFs, 2026-05-19). Each guide is a
// hand-written HTML fragment in content/sections/; this file carries the
// routing, metadata, schema dates, and the FAQ data (kept here so the visible
// FAQ block and the FAQPage JSON-LD render from one source).

export interface GuideFaq {
  q: string
  a: string
}

export interface Guide {
  slug: string
  /** H1 / Article headline — must match the rendered <h1>. */
  title: string
  /** SEO <title> (the layout template appends " — Astons Law Chambers"). */
  metaTitle: string
  /** SEO meta description, 140–160 chars. */
  metaDescription: string
  /** One-line summary — Article schema description + hub card text. */
  description: string
  /** content/sections/<section>.html fragment name. */
  section: string
  /** Downloadable PDF in public/resources/. */
  pdf: string
  datePublished: string
  dateModified: string
  faqs: GuideFaq[]
}

export const guides: Guide[] = [
  {
    slug: 'first-24-hours-after-arrest',
    title: 'What to do in the first 24 hours after being arrested in the UK',
    metaTitle: 'Arrested in the UK: First 24 Hours',
    metaDescription:
      'What happens in the first 24 hours after an arrest in the UK — the custody clock, the right to free legal advice, and the police interview. Call 07922 247 999.',
    description:
      'A guide for families: the custody clock, the rights the police must give, and why the police interview is the decision that matters most.',
    section: 'guide-first-24-hours',
    pdf: '/resources/first-24-hours-after-arrest.pdf',
    datePublished: '2026-05-19',
    dateModified: '2026-05-19',
    faqs: [
      {
        q: 'Can the police really hold someone for 96 hours without charging them?',
        a: 'Yes, but only with a magistrate’s warrant, and only for indictable offences. The 96-hour limit is rare; most cases resolve well within 24. Extensions to 36 hours need a senior officer’s authorisation, and anything beyond that requires the police to go to court. If your family member is approaching the 24-hour mark, the custody team will already know whether they intend to apply for an extension.',
      },
      {
        q: 'Will it look bad if my family member asks for a solicitor?',
        a: 'No. Requesting a solicitor is the normal response to being arrested, and it cannot be used against you. The custody sergeant has to ask whether you want one, and the right is built into the system. Asking for a solicitor is expected; declining one is what stands out.',
      },
      {
        q: 'Can I speak to my family member while they are in custody?',
        a: 'Usually no. The right is to have someone informed of the arrest, not to have a conversation. The police will pass a message that the person is in custody and where they are being held. Contact during the detention period is rarely permitted. If you are the person they asked the police to inform, you have done what you can. The next thing that matters is making sure they have legal advice.',
      },
      {
        q: 'What if they have been arrested in another part of the country?',
        a: 'The same rules apply across England and Wales. The duty solicitor scheme is national, and any solicitor or barrister instructed privately can attend any police station. Travel affects timing — if someone has further to come the interview will be delayed, though the custody clock keeps running. Where legal advice has been requested, the police will usually wait for it to arrive before interviewing.',
      },
      {
        q: 'Should they answer questions in the interview, or say no comment?',
        a: 'There is no general answer. It depends on the disclosure the police have given, the nature of the allegation, and the account your family member would want to give. What matters is that the decision is made with legal advice, after hearing what the police are actually alleging.',
      },
    ],
  },
  {
    slug: 'do-i-need-a-lawyer-at-a-voluntary-police-interview',
    title: 'Do I need a lawyer at a voluntary police interview under caution?',
    metaTitle: 'Lawyer at a Voluntary Police Interview',
    metaDescription:
      'A voluntary police interview is still conducted under caution. What it means, why the police use it, and whether you need a lawyer before you attend. Call 07922 247 999.',
    description:
      'What a voluntary interview under caution actually is, what the caution means, why the police choose it, and what preparing for one properly involves.',
    section: 'guide-voluntary-interview',
    pdf: '/resources/do-i-need-a-lawyer-at-a-voluntary-police-interview.pdf',
    datePublished: '2026-05-19',
    dateModified: '2026-05-19',
    faqs: [
      {
        q: 'Is a voluntary police interview serious?',
        a: 'Yes. A voluntary interview under caution is a formal police interview. The only difference from an interview after arrest is that you attend by agreement rather than being detained. What you say is recorded and can be used as evidence in the same way.',
      },
      {
        q: 'Can I leave a voluntary police interview?',
        a: 'Yes. You can leave at any time, and you can decline to attend. But the police can arrest you if they consider the grounds for an arrest are met. Attending voluntarily does not remove the possibility of arrest during or after the interview.',
      },
      {
        q: 'Do I have to pay for a solicitor at a voluntary interview?',
        a: 'No. Free, independent legal advice is available for a voluntary interview through the duty solicitor scheme, regardless of your income or the offence. It covers advice before and during the interview. Instructing someone privately is a separate option if you want to choose your representative.',
      },
      {
        q: 'Will asking for a solicitor make me look guilty or slow things down?',
        a: 'No. Taking legal advice is the normal response to a police interview. The police are not allowed to suggest the interview will be quicker if you decline a solicitor. Asking for advice is expected, not unusual.',
      },
      {
        q: 'Can I be charged after a voluntary interview?',
        a: 'Yes. After a voluntary interview the police may take no further action, release you under investigation, or charge you. It is the same range of outcomes as an interview after arrest, decided on the evidence as a whole.',
      },
    ],
  },
]

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug)
}
