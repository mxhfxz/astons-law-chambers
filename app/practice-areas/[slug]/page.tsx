import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { practiceAreas, getPracticeArea } from '@/lib/practice-areas'
import { renderPracticeAreaDetail, practiceAreaJsonLd } from '@/lib/render-practice-area'

export function generateStaticParams() {
  return practiceAreas.map((a) => ({ slug: a.slug }))
}

// Slugs outside generateStaticParams resolve to the 404 page.
export const dynamicParams = false

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const area = getPracticeArea(params.slug)
  if (!area) return {}
  return {
    title: area.title,
    description: area.cardSummary,
    alternates: { canonical: `/practice-areas/${area.slug}` },
  }
}

export default function PracticeAreaPage({ params }: { params: { slug: string } }) {
  const area = getPracticeArea(params.slug)
  if (!area) notFound()
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: practiceAreaJsonLd(area) }}
      />
      <div dangerouslySetInnerHTML={{ __html: renderPracticeAreaDetail(area) }} />
    </>
  )
}
