import type { Metadata } from 'next'
import { readSection } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Complaints Procedure',
  description:
    'How to make a complaint about Astons Law Chambers, how it will be handled, the time limits that apply, and how to escalate to the Legal Ombudsman.',
  alternates: { canonical: '/complaints' },
}

export default function ComplaintsPage() {
  return <div dangerouslySetInnerHTML={{ __html: readSection('complaints') }} />
}
