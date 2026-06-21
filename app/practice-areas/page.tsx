import type { Metadata } from 'next'
import { renderPracticeAreaIndex } from '@/lib/render-practice-area'

export const metadata: Metadata = {
  title: { absolute: 'Criminal Defence Services | Direct Access Barrister London' },
  description:
    'Expert criminal defence for violent crimes, drug offences, fraud, and driving offences. Direct access barrister in London. 24/7 police station support.',
  alternates: { canonical: '/practice-areas' },
}

export default function PracticeAreasPage() {
  return <div dangerouslySetInnerHTML={{ __html: renderPracticeAreaIndex() }} />
}
