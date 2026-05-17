import type { Metadata } from 'next'
import { readSection } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Timescales',
  description:
    'How long a criminal case takes in England and Wales, and the factors that affect it. Published under the Bar Standards Board transparency rules.',
  alternates: { canonical: '/timescales' },
}

export default function TimescalesPage() {
  return <div dangerouslySetInnerHTML={{ __html: readSection('timescales') }} />
}
