import type { Metadata } from 'next'
import { renderGuidesIndex, guidesHubJsonLd } from '@/lib/render-guide'

export const metadata: Metadata = {
  title: 'Guides — Arrest & Police Interviews',
  description:
    'Plain-English guides on arrest, police custody and police interviews in the UK — your rights and what to do next, from a criminal defence barrister in London.',
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
