import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { guides, getGuide } from '@/lib/guides'
import { renderGuide, guideJsonLd } from '@/lib/render-guide'

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }))
}

// Slugs outside generateStaticParams resolve to the 404 page.
export const dynamicParams = false

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const guide = getGuide(params.slug)
  if (!guide) return {}
  return {
    title: { absolute: guide.metaTitle },
    description: guide.metaDescription,
    alternates: { canonical: `/guides/${guide.slug}` },
  }
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = getGuide(params.slug)
  if (!guide) notFound()
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: guideJsonLd(guide) }}
      />
      <div dangerouslySetInnerHTML={{ __html: renderGuide(guide) }} />
    </>
  )
}
