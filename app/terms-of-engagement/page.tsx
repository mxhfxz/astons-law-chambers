import type { Metadata } from 'next'
import { readSection } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Terms of Engagement',
  description:
    'Astons Law Chambers terms of engagement: regulatory status, fees, services, timescales, complaints, and professional indemnity insurance.',
  alternates: { canonical: '/terms-of-engagement' },
}

export default function TermsOfEngagementPage() {
  return <div dangerouslySetInnerHTML={{ __html: readSection('terms-of-engagement') }} />
}
