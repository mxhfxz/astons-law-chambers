import type { Metadata } from 'next'
import { readSection } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Complaints Procedure',
  description:
    'How to make a complaint about Astons Law Chambers, how it will be handled, the time limits that apply, and how to escalate to the Legal Ombudsman.',
  alternates: { canonical: '/complaints' },
}

// BreadcrumbList parity with the other deep non-PA pages that already
// carry it. Visible breadcrumb is "Home / Complaints".
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://astonslaw.com' },
    { '@type': 'ListItem', position: 2, name: 'Complaints', item: 'https://astonslaw.com/complaints' },
  ],
}

export default function ComplaintsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div dangerouslySetInnerHTML={{ __html: readSection('complaints') }} />
    </>
  )
}
