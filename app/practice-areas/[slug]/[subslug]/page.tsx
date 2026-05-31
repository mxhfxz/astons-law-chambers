import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { subPracticeAreas, getSubPracticeArea } from '@/lib/sub-practice-areas'
import { getPracticeArea } from '@/lib/practice-areas'
import { renderSubPracticeAreaDetail, subPracticeAreaJsonLd } from '@/lib/render-practice-area'

export function generateStaticParams() {
  return subPracticeAreas.map((a) => ({ slug: a.parentSlug, subslug: a.slug }))
}

export const dynamicParams = false

export function generateMetadata({
  params,
}: {
  params: { slug: string; subslug: string }
}): Metadata {
  const area = getSubPracticeArea(params.slug, params.subslug)
  if (!area) return {}
  return {
    title: { absolute: area.metaTitle },
    description: area.metaDescription,
    alternates: { canonical: `/practice-areas/${area.parentSlug}/${area.slug}` },
  }
}

export default function SubPracticeAreaPage({
  params,
}: {
  params: { slug: string; subslug: string }
}) {
  const area = getSubPracticeArea(params.slug, params.subslug)
  if (!area) notFound()

  const parent = getPracticeArea(area.parentSlug)
  const parentTitle = parent?.title ?? area.parentSlug

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: subPracticeAreaJsonLd(area, parentTitle),
        }}
      />
      <div
        dangerouslySetInnerHTML={{
          __html: renderSubPracticeAreaDetail(area, parentTitle),
        }}
      />
    </>
  )
}
