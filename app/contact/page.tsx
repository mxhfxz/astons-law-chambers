import type { Metadata } from 'next'
import { readSection } from '@/lib/content'

export const metadata: Metadata = {
  title: { absolute: 'Contact Astons Law Chambers | 24/7 Criminal Barrister London' },
  description:
    '24/7 emergency criminal defence and police station support. Contact Astons Law Chambers directly via call or WhatsApp. Written fee quotes provided.',
  alternates: { canonical: '/contact' },
}

const pageUrl = 'https://astonslaw.com/contact'

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://astonslaw.com' },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: pageUrl },
  ],
}

// ContactPage node: Google uses this to surface the contact details panel
// in knowledge graph results. contactPoint mirrors the global layout.tsx
// contactPoint array — keeping them in sync ensures the entity reads
// consistently across all search entry points.
const contactPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${pageUrl}#contactpage`,
  name: 'Contact Astons Law Chambers',
  description: 'Get in touch with Astons Law Chambers for criminal defence legal support. Call or WhatsApp 07922 247 999 at any time.',
  url: pageUrl,
  mainEntity: { '@id': 'https://astonslaw.com/#organization' },
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      <div dangerouslySetInnerHTML={{ __html: readSection('contact') }} />
    </>
  )
}
