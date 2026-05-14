// Phase 1 placeholder. Replaced in Phase 5 (Practice Area Pages).
// Exists so generateStaticParams resolves all 10 slugs and Phase 1 DoD can pass.

import { practiceAreas, getPracticeAreaBySlug } from '@/lib/practice-areas'

export function generateStaticParams() {
  return practiceAreas.map((area) => ({ slug: area.slug }))
}

export default function PracticeAreaPage({
  params,
}: {
  params: { slug: string }
}) {
  const area = getPracticeAreaBySlug(params.slug)
  return (
    <div>
      <h1>{area.title}</h1>
      <p>
        Practice area: <code>{area.slug}</code> (priority {area.priority})
      </p>
      <p>Phase 1 scaffold placeholder. The page is built in Phase 5.</p>
    </div>
  )
}
