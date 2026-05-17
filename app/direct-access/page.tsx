import type { Metadata } from 'next'
import { readSection } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Direct Access to a Barrister',
  description:
    'Instructing a criminal defence barrister directly, without a solicitor, under the Bar Standards Board Public Access scheme — how Direct Access works in London.',
  alternates: { canonical: '/direct-access' },
}

export default function DirectAccessPage() {
  return <div dangerouslySetInnerHTML={{ __html: readSection('direct-access') }} />
}
