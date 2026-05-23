import type { Metadata } from 'next'
import { readSection } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Direct Access to a Barrister [No Solicitor Needed]',
  description:
    'Instructing a criminal defence barrister directly, without a solicitor, under the Bar Standards Board Public Access scheme — how Direct Access works in London.',
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
