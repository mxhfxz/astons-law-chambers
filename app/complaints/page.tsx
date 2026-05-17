import type { Metadata } from 'next'
import { readSection } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Complaints Procedure',
  description: 'The complaints procedure for Astons Law Chambers.',
  alternates: { canonical: '/complaints' },
}

export default function ComplaintsPage() {
  return <div dangerouslySetInnerHTML={{ __html: readSection('complaints') }} />
}
