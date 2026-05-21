import type { Metadata } from 'next'
import { readSection } from '@/lib/content'

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Astons Law Chambers — a criminal defence practice in London, taking instructions direct from the public under the Bar Standards Board Public Access scheme.',
  alternates: { canonical: '/about' },
}

// BreadcrumbList parity with the practice-area pages and the other deep
// non-PA pages that already carry it (/fees, /legal-aid,
// /authorised-to-conduct-litigation). Visible breadcrumb on the page is
// "Home / About"; schema mirrors it verbatim.
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://astonslaw.com' },
    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://astonslaw.com/about' },
  ],
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div dangerouslySetInnerHTML={{ __html: readSection('about') }} />
    </>
  )
}
