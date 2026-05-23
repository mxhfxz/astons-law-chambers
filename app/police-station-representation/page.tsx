import type { Metadata } from 'next'
import { readSection } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Police Station Representation [24/7], London',
  description:
    'Criminal defence lawyer representation at the police station in London, before the interview begins. Available 24 hours — call 07922 247 999.',
  alternates: { canonical: '/police-station-representation' },
}

const pageUrl = 'https://astonslaw.com/police-station-representation'

// BreadcrumbList parity with the other deep non-PA pages. Visible
// breadcrumb on the page is "Home / Police station representation".
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://astonslaw.com' },
    { '@type': 'ListItem', position: 2, name: 'Police station representation', item: pageUrl },
  ],
}

// FAQPage. Question/answer text MUST match the visible FAQ block in
// content/sections/police-station.html character-for-character — Google's
// FAQPage policy disallows schema that paraphrases the on-page wording.
// Source: content/sections/police-station.html, the "Common questions"
// section (5 Q&A pairs).
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${pageUrl}#faq`,
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How quickly can someone attend?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Attendance is arranged from the same call. Travel time to the station depends on its location, but the request to delay interview is made immediately.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the suspect entitled to a lawyer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Anyone held at a police station is entitled to free legal advice and to have a representative present at interview. They do not have to accept the duty solicitor.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does private representation cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A single written fee is set out in a client-care letter before any attendance. Indicative ranges are on the Fees page.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is legal aid available at the police station?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — and it is free at the police station, regardless of income. Private instruction is the choice clients make when they want a specific representative rather than the duty solicitor. See how legal aid works at Astons Law Chambers for the wider case.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can the same barrister carry the case after the police station?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, where the case suits a single counsel. Astons Law Chambers is authorised to conduct litigation, so the practice can run the file end-to-end without a separate solicitor.',
      },
    },
  ],
}

export default function PoliceStationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div dangerouslySetInnerHTML={{ __html: readSection('police-station') }} />
    </>
  )
}
