import type { Metadata } from 'next'
import { readSection } from '@/lib/content'

export const metadata: Metadata = {
  title: { absolute: 'Direct Access for criminal offences | Legal Aid & 24/7 police station representation – Astons Law Chambers' },
  description:
    'Instruct a criminal defence barrister directly in London – no solicitor required. Authorised under the BSB Public Access scheme. Legal aid can be discussed. Call 07922 247 999.',
  alternates: { canonical: '/direct-access' },
}

// BreadcrumbList parity with the practice-area pages and the other deep
// non-PA pages that already carry it. Visible breadcrumb is
// "Home / Direct Access".
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://astonslaw.com' },
    { '@type': 'ListItem', position: 2, name: 'Direct Access', item: 'https://astonslaw.com/direct-access' },
  ],
}

export default function DirectAccessPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div dangerouslySetInnerHTML={{ __html: readSection('direct-access') }} />
    </>
  )
}
