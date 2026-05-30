import type { Metadata } from 'next'
import { readSection } from '@/lib/content'

export const metadata: Metadata = {
  title: { absolute: 'Criminal Defence Fees & Legal Aid Rates | London & UK' },
  description:
    'Transparent fees for criminal defence. Written quote before any work begins. Legal aid available for eligible cases. Call 07922 247 999.',
  alternates: { canonical: '/fees' },
}

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Criminal Defence Legal Services',
  description:
    'Criminal defence law with indicative fee ranges. Written fee agreed before any instruction is accepted.',
  provider: {
    '@type': 'LegalService',
    name: 'Astons Law Chambers',
    url: 'https://astonslaw.com',
  },
  areaServed: { '@type': 'Country', name: 'England and Wales' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Criminal Defence Fee Schedule',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Hourly Rate',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: 175,
          maxPrice: 400,
          priceCurrency: 'GBP',
          valueAddedTaxIncluded: false,
        },
      },
      {
        '@type': 'Offer',
        name: 'First Appearance / Plea',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: 500,
          maxPrice: 1500,
          priceCurrency: 'GBP',
          valueAddedTaxIncluded: false,
        },
      },
      {
        '@type': 'Offer',
        name: 'Written Advice',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: 75,
          maxPrice: 1500,
          priceCurrency: 'GBP',
          valueAddedTaxIncluded: false,
        },
      },
      {
        '@type': 'Offer',
        name: 'Single Day Hearing',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: 700,
          maxPrice: 3500,
          priceCurrency: 'GBP',
          valueAddedTaxIncluded: false,
        },
      },
      {
        '@type': 'Offer',
        name: 'Trial Brief Fee',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: 1500,
          priceCurrency: 'GBP',
          valueAddedTaxIncluded: false,
        },
      },
      {
        '@type': 'Offer',
        name: 'Trial Refresher (per day)',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: 700,
          maxPrice: 2000,
          priceCurrency: 'GBP',
          valueAddedTaxIncluded: false,
        },
      },
    ],
  },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div dangerouslySetInnerHTML={{ __html: readSection('fees') }} />
    </>
  )
}
