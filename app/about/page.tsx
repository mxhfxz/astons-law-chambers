import type { Metadata } from 'next'
import { readSection } from '@/lib/content'

export const metadata: Metadata = {
  title: { absolute: 'Criminal Defence Legal Support | Direct Access Barrister – Astons Law Chambers' },
  description:
    'Astons Law Chambers is a criminal defence barrister practice in London. Instructed direct — no solicitor required. Legal aid available. Call 07922 247 999.',
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
