import type { Metadata } from 'next'
import { renderGuidesIndex, guidesHubJsonLd } from '@/lib/render-guide'

export const metadata: Metadata = {
  title: { absolute: 'UK Police & Court Guides | Know Your Rights | Astons Law Chambers' },
  description:
    'Free legal guides on UK police procedures, arrests, custody time limits, and voluntary interviews. Know your rights before speaking to the police.',
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
