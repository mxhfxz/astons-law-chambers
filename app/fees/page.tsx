import type { Metadata } from 'next'
import { readSection } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Fees',
  description:
    'How fees work at Astons Law Chambers — indicative ranges and a written client-care letter before any instruction is accepted.',
  alternates: { canonical: '/fees' },
}

export default function FeesPage() {
  return <div dangerouslySetInnerHTML={{ __html: readSection('fees') }} />
}
