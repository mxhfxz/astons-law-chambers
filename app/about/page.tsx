import type { Metadata } from 'next'
import { readSection } from '@/lib/content'

export const metadata: Metadata = {
  title: { absolute: 'About Astons Law Chambers | Direct Access Criminal Barrister' },
  description:
    'Specialist criminal defence barrister in London offering Direct Access and Legal Aid. Expert representation from the police station to the Crown Court.',
  alternates: { canonical: '/about' },
}

const pageUrl = 'https://astonslaw.com/about'

// Expanded Person node for the About/profile page. The global layout.tsx
// carries the thin Person object (name, jobTitle, worksFor, sameAs).
// This page adds knowsAbout as a practice-signal array — the fields an
// entity-resolution engine uses to surface the practitioner in AI and
// knowledge-graph contexts.
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://astonslaw.com/#principal',
  name: 'Ghulam Humayun',
  jobTitle: 'Barrister',
  worksFor: { '@id': 'https://astonslaw.com/#organization' },
  sameAs: [
    'https://www.barstandardsboard.org.uk/barristers-register/0A9C84A0E6BE3846C117FA4B4290EAD2.html',
  ],
  knowsAbout: [
    'Criminal defence law',
    'Police station representation',
    'Magistrates Court proceedings',
    'Crown Court trials',
    'Violent crime allegations',
    'Drug possession and supply charges',
    'Driving and road traffic offences',
    'Youth Court proceedings',
    'Criminal appeals — conviction and sentence',
    'Inquest representation in the Coroner\'s Court',
    'Legal Aid and means testing',
    'Bail applications and contested bail hearings',
    'Disclosure review and defence strategy',
    'Plea advice and sentencing mitigation',
    'End-to-end criminal litigation without a solicitor',
  ],
}

// Service node: anchors the practice entity to this page.
const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${pageUrl}#service`,
  name: 'Criminal Defence Legal Services',
  description: 'Criminal defence legal representation in London and across England and Wales, from police station through to Crown Court trial and appeal.',
  serviceType: 'Criminal Defence',
  provider: { '@id': 'https://astonslaw.com/#organization' },
  areaServed: [
    { '@type': 'Place', name: 'London' },
    { '@type': 'Place', name: 'England and Wales' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Criminal Defence Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Police Station Representation',
          description: 'Attendance at the police station before the interview begins. Available at any hour.',
          serviceType: 'Criminal Defence',
          provider: { '@id': 'https://astonslaw.com/#organization' },
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Magistrates Court and Crown Court Representation',
          description: 'Criminal defence from first hearing through to trial and sentencing in both the Magistrates Court and Crown Court.',
          serviceType: 'Criminal Defence',
          provider: { '@id': 'https://astonslaw.com/#organization' },
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Criminal Appeals',
          description: 'Appeals against conviction and sentence in the Crown Court and the Court of Appeal (Criminal Division).',
          serviceType: 'Criminal Appeals',
          provider: { '@id': 'https://astonslaw.com/#organization' },
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Inquest Representation',
          description: 'Representation of families and interested persons at inquests in the Coroner\'s Court.',
          serviceType: 'Inquests and Coronial Law',
          provider: { '@id': 'https://astonslaw.com/#organization' },
        },
      },
    ],
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://astonslaw.com' },
    { '@type': 'ListItem', position: 2, name: 'About', item: pageUrl },
  ],
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div dangerouslySetInnerHTML={{ __html: readSection('about') }} />
    </>
  )
}
