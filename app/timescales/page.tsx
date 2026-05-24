import type { Metadata } from 'next'
import { readSection } from '@/lib/content'

export const metadata: Metadata = {
  title: { absolute: 'Criminal Case Timescales | What to Expect – Astons Law Chambers' },
  description:
    "How long a criminal case takes in England and Wales – Magistrates' Court, Crown Court and on appeal. Published under BSB transparency rules. Call 07922 247 999.",
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
