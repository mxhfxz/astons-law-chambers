import type { Metadata } from 'next'
import { readSection } from '@/lib/content'

export const metadata: Metadata = {
  title: { absolute: 'Direct Access Criminal Barrister London | No Solicitor Needed' },
  description:
    'Instruct a specialist criminal barrister directly under the BSB Public Access scheme. Transparent fixed fees and expert defence. Contact Astons Law Chambers.',
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
