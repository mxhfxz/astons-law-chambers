import type { Metadata } from 'next'
import { readSection } from '@/lib/content'

export const metadata: Metadata = {
  title: { absolute: 'Criminal Case Timescales & Court Process | Astons Law Chambers' },
  description:
    "Understand the timeline of your criminal case in England & Wales. What to expect at the Magistrates' Court, Crown Court, and Appeals.",
  alternates: { canonical: '/timescales' },
}

// BreadcrumbList parity with the other deep non-PA pages that already
// carry it. Visible breadcrumb is "Home / Timescales".
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://astonslaw.com' },
    { '@type': 'ListItem', position: 2, name: 'Timescales', item: 'https://astonslaw.com/timescales' },
  ],
}

export default function TimescalesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div dangerouslySetInnerHTML={{ __html: readSection('timescales') }} />
    </>
  )
}
