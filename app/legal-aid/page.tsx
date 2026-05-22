import type { Metadata } from 'next'
import { readSection } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Criminal Legal Aid in London',
  description:
    'Criminal legal aid at the police station, Magistrates’ and Crown Court. Astons Law Chambers refers eligible cases to a partner firm at no cost.',
  alternates: { canonical: '/legal-aid' },
}

const pageUrl = 'https://astonslaw.com/legal-aid'

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${pageUrl}#article`,
  headline: 'Criminal Legal Aid: How It Works at Astons Law Chambers',
  description:
    'How criminal legal aid works in England and Wales, who qualifies, what it covers at each stage, and how Astons Law Chambers refers legal-aid-eligible cases to a partner solicitor firm at no cost.',
  mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
  author: { '@id': 'https://astonslaw.com/#principal' },
  publisher: { '@id': 'https://astonslaw.com/#organization' },
  inLanguage: 'en-GB',
  isPartOf: { '@id': 'https://astonslaw.com/#website' },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${pageUrl}#faq`,
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is legal aid free for the entire case?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "In the Magistrates' Court, yes, where both tests are passed. In the Crown Court, you may be required to contribute toward costs from income, with a possible capital contribution if convicted. The Legal Aid Agency assesses this on application.",
      },
    },
    {
      '@type': 'Question',
      name: 'I have a job. Should I still apply for criminal legal aid?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Eligibility is calculated against income, dependants, housing costs, and disposable income. Many working defendants qualify, especially where there are children at home or significant housing costs. The GOV.UK calculator gives a quick indication.',
      },
    },
    {
      '@type': 'Question',
      name: 'I own a house. Can I still get criminal legal aid?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Often, yes, for the initial grant. Capital and equity are assessed but home ownership is not an automatic disqualification. A capital contribution may apply at the end of a Crown Court case if you are convicted.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I choose my own solicitor on legal aid?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes, provided the firm holds a Legal Aid Agency contract. If you call Astons Law Chambers, the referral is made to the practice's partner firm; you remain free to instruct any contracted firm of your choice.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does Astons Law Chambers charge a referral fee?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Referral fees in criminal proceedings are prohibited under both Bar Standards Board and Solicitors Regulation Authority rules. The referral is made free of charge.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I apply for criminal legal aid?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "For Magistrates' Court cases, your solicitor applies on your behalf using the Legal Aid Agency form. For Crown Court cases, the court itself processes the application after the case is sent up. You do not apply directly to the Legal Aid Agency yourself.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I get legal aid for a Direct Access barrister?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not directly — Direct Access is private instruction. If your case is suitable for legal aid, Astons Law Chambers refers it to a partner solicitor firm. That firm may then instruct Ghulam Humayun as counsel under the Advocates’ Graduated Fee Scheme. The fees are billed to the Legal Aid Agency, not to you.',
      },
    },
  ],
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://astonslaw.com' },
    { '@type': 'ListItem', position: 2, name: 'Legal Aid', item: pageUrl },
  ],
}

export default function LegalAidPage() {
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
      <div dangerouslySetInnerHTML={{ __html: readSection('legal-aid') }} />
    </>
  )
}
