import type { Metadata } from 'next'
import { readSection } from '@/lib/content'
import EligibilityIndicator from '@/components/legal-aid/EligibilityIndicator'

// DRAFT metadata — pending client (Ghulam) approval. "Calculator" is
// deliberately avoided in title, description, and schema (BSB: no promise of a
// claimable outcome). This tool page complements /legal-aid (the explainer).
export const metadata: Metadata = {
  title: {
    absolute: 'Do I Qualify for Legal Aid? Criminal Legal Aid Eligibility Check | Astons Law Chambers',
  },
  description:
    'A quick, private check to see whether criminal legal aid is likely to apply to your case — with a straight answer for your circumstances. Not an official decision.',
  alternates: { canonical: '/legal-aid/eligibility' },
}

const pageUrl = 'https://astonslaw.com/legal-aid/eligibility'

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${pageUrl}#article`,
  headline: 'Do I Qualify for Legal Aid? A Criminal Legal Aid Eligibility Check',
  description:
    'How to tell whether criminal legal aid is likely to apply to your case: the stage of proceedings, passporting benefits, the means test, and why dependants and housing costs matter. A general indicator, not an official decision.',
  mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
  author: { '@id': 'https://astonslaw.com/#principal' },
  publisher: { '@id': 'https://astonslaw.com/#organization' },
  inLanguage: 'en-GB',
  isPartOf: { '@id': 'https://astonslaw.com/#website' },
}

// FAQ mirrors the on-page questions in content/sections/legal-aid-eligibility.html.
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${pageUrl}#faq`,
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is this an official eligibility decision?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. It is a general indicator to help you understand the likely position. Only the Legal Aid Agency can decide an application, and GOV.UK hosts the official calculator and current financial thresholds.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does using it share my details with anyone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. The check runs entirely in your browser. Your answers are not sent anywhere, saved, or linked to you, and no email or sign-up is needed.',
      },
    },
    {
      '@type': 'Question',
      name: 'It said income alone might not qualify me. Does that mean no?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not at all. Income is only part of the means test, which weighs disposable income after allowances for dependants and housing. Many working households still qualify. It is worth checking properly before ruling it out.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I still get help if I am not eligible for legal aid?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. A hardship review, the Bar's pro bono charity, or private instruction are all routes depending on the case. The first call sets out which one fits.",
      },
    },
    {
      '@type': 'Question',
      name: 'How accurate is the check?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It reflects the main factors an application turns on, but it cannot weigh every detail the Legal Aid Agency does. Treat it as a guide to the right next step, not a calculation.',
      },
    },
  ],
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://astonslaw.com' },
    { '@type': 'ListItem', position: 2, name: 'Legal Aid', item: 'https://astonslaw.com/legal-aid' },
    { '@type': 'ListItem', position: 3, name: 'Eligibility', item: pageUrl },
  ],
}

// The fragment holds all copy; the interactive island mounts at the marker so
// the tool sits between the intro and the supporting content.
const [fragmentTop, fragmentBottom] = readSection('legal-aid-eligibility').split('<!--ELIGIBILITY_TOOL-->')

export default function LegalAidEligibilityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Full-viewport panel: intro + the interactive check fill the screen
          below the sticky chrome (user direction 2026-07-03). */}
      <section className="la-elig-screen">
        <div dangerouslySetInnerHTML={{ __html: fragmentTop }} />
        <div className="la-elig-screen__tool bg-white">
          <div className="px-6 w-full flex justify-center">
            <EligibilityIndicator />
          </div>
        </div>
      </section>
      <div dangerouslySetInnerHTML={{ __html: fragmentBottom }} />
    </>
  )
}
