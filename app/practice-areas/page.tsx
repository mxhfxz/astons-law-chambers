import type { Metadata } from 'next'
import { renderPracticeAreaIndex } from '@/lib/render-practice-area'

export const metadata: Metadata = {
  title: 'Criminal Defence Services [Direct Access], London',
  description:
    'The criminal defence work Astons Law Chambers takes as a London barrister — police station representation, Magistrates’ and Crown Court, appeals and inquests.',
  alternates: { canonical: '/practice-areas' },
}

export default function PracticeAreasPage() {
  return <div dangerouslySetInnerHTML={{ __html: renderPracticeAreaIndex() }} />
}
