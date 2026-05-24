import type { Metadata } from 'next'
import { readSection } from '@/lib/content'

export const metadata: Metadata = {
  title: { absolute: 'Criminal Defence Fees & Legal Aid – Astons Law Chambers' },
  description:
    'Transparent fees for criminal defence. Written quote before any work begins. Legal aid available for eligible cases. Call 07922 247 999.',
  alternates: { canonical: '/fees' },
}

// BreadcrumbList parity with the practice-area pages (audit M7).
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://astonslaw.com' },
    { '@type': 'ListItem', position: 2, name: 'Fees', item: 'https://astonslaw.com/fees' },
  ],
}

export default function FeesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div dangerouslySetInnerHTML={{ __html: readSection('fees') }} />
    </>
  )
}
