import type { Metadata } from 'next'
import { renderPracticeAreaIndex } from '@/lib/render-practice-area'

export const metadata: Metadata = {
  title: { absolute: 'Criminal Defence | Violence, Drugs, Fraud & more – Astons Law Chambers' },
  description:
    'Criminal defence across the UK. Serious crimes, violence, drugs and more. 24/7 Police station advocacy, legal aid available. Call 07922 247 999.',
  alternates: { canonical: '/practice-areas' },
}

export default function PracticeAreasPage() {
  return <div dangerouslySetInnerHTML={{ __html: renderPracticeAreaIndex() }} />
}
