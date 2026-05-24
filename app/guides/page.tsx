import type { Metadata } from 'next'
import { renderGuidesIndex, guidesHubJsonLd } from '@/lib/render-guide'

export const metadata: Metadata = {
  title: { absolute: 'Know Your Rights | Police interviews, court summons, appeals & more – Astons Law Chambers' },
  description:
    'Know your rights before speaking to anyone. Guides on arrest, custody, police interviews, and more. Call 07922 247 999.',
  alternates: { canonical: '/guides' },
}

export default function GuidesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: guidesHubJsonLd() }}
      />
      <div dangerouslySetInnerHTML={{ __html: renderGuidesIndex() }} />
    </>
  )
}
