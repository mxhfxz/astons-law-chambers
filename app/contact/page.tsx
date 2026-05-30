import type { Metadata } from 'next'
import { readSection } from '@/lib/content'

export const metadata: Metadata = {
  title: { absolute: 'Get in Touch for 24/7 Police station representation & Criminal defence – Astons Law Chambers' },
  description:
    'Call 07922 247 999 at any time. WhatsApp or book a callback. Police station support and criminal defence in London and the UK. Legal aid can be offered through partner firms.',
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
  mainEntity: {
    '@type': 'LegalService',
    name: 'Astons Law Chambers',
    telephone: '+44-7922-247999',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+44-7922-247999',
        contactType: 'Emergency Defence Team',
        availableLanguage: 'English',
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59',
        },
      },
      {
        '@type': 'ContactPoint',
        telephone: '+44-7922-247999',
        contactType: 'General enquiries',
        availableLanguage: 'English',
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '17:30',
        },
      },
    ],
  },
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
