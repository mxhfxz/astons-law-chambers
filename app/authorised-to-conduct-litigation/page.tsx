import type { Metadata } from 'next'
import { readSection } from '@/lib/content'

export const metadata: Metadata = {
  title: { absolute: 'Criminal Litigation Authorisation | Barrister and Solicitor in One – Astons Law Chambers' },
  description:
    'Astons Law Chambers can file documents and run a case end-to-end. Authorised by the BSB to conduct criminal litigation without a separate solicitor needed. Call 07922 247 999.',
  alternates: { canonical: '/authorised-to-conduct-litigation' },
}

const pageUrl = 'https://astonslaw.com/authorised-to-conduct-litigation'

// Article + FAQPage + BreadcrumbList + Service. The Service schema links
// back to #organization in the root layout's @graph, so this page is
// part of one coherent entity-and-service map rather than an isolated
// fragment.
const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${pageUrl}#article`,
  headline: 'Authorised to Conduct Litigation',
  description:
    "Astons Law Chambers holds the Bar Standards Board authorisation to conduct litigation. The practice can run a criminal case end-to-end without a separate solicitor.",
  mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
  author: { '@id': 'https://astonslaw.com/#principal' },
  publisher: { '@id': 'https://astonslaw.com/#organization' },
  inLanguage: 'en-GB',
  isPartOf: { '@id': 'https://astonslaw.com/#website' },
}

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${pageUrl}#service`,
  serviceType: 'End-to-end criminal defence representation by a barrister authorised to conduct litigation',
  provider: { '@id': 'https://astonslaw.com/#organization' },
  areaServed: ['London', 'England', 'Wales'],
  audience: { '@type': 'Audience', audienceType: 'Defendants in criminal proceedings, England and Wales' },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${pageUrl}#faq`,
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is "authorised to conduct litigation" the same thing as being a solicitor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. A barrister with the litigation extension can carry out litigation tasks a solicitor would normally do, but is regulated by the Bar Standards Board, not the Solicitors Regulation Authority. The qualification routes and ongoing rules are different.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I check the authorisation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Search the Bar Standards Board Barristers' Register for the practitioner. A barrister authorised to conduct litigation has that fact listed on their Register entry.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does it cost more to instruct one practice end-to-end?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Usually not. Because one professional carries the case, there is no separate solicitor fee for the same work. The fee structure is set out in writing before instruction.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a barrister authorised to conduct litigation handle a Crown Court trial alone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, where the case suits a single counsel. Larger trials, and cases with several co-defendants, are reviewed at first instruction to confirm whether additional representation is appropriate.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if my case turns out to be more suited to a solicitor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Suitability is assessed during the first call and revisited as the case develops. Where a solicitor is the better fit, Astons Law Chambers refers to a partner firm.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who is authorised to conduct litigation in the UK?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Solicitors, by default. Barristers who hold the Bar Standards Board litigation extension. Chartered Legal Executives with the CILEx litigation right. Self-represented parties acting as litigants-in-person for their own cases.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a barrister authorised to conduct litigation send a letter before action?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The litigation extension covers correspondence on behalf of the client, including formal pre-action letters, applications to the court, and communications with the prosecution.',
      },
    },
  ],
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://astonslaw.com' },
    { '@type': 'ListItem', position: 2, name: 'Authorised to Conduct Litigation', item: pageUrl },
  ],
}

export default function AuthorisedToConductLitigationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div dangerouslySetInnerHTML={{ __html: readSection('authorised-to-conduct-litigation') }} />
    </>
  )
}
