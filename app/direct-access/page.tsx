import type { Metadata } from 'next'
import { readSection } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Direct Access',
  description:
    'Instructing a barrister directly, without a solicitor, under the Bar Standards Board Public Access scheme.',
  alternates: { canonical: '/direct-access' },
}

export default function DirectAccessPage() {
  return <div dangerouslySetInnerHTML={{ __html: readSection('direct-access') }} />
}
