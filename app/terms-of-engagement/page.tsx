import type { Metadata } from 'next'
import { readSection } from '@/lib/content'
import { WithCharmBar } from '@/components/sections/WithCharmBar'

export const metadata: Metadata = {
  title: { absolute: 'Terms of Engagement | Astons Law Chambers' },
  description:
    'Professional terms of engagement, regulatory status, fee structures, and BSB compliance information for Astons Law Chambers.',
  alternates: { canonical: '/terms-of-engagement' },
}

export default function TermsOfEngagementPage() {
  return <WithCharmBar html={readSection('terms-of-engagement')} path="/terms-of-engagement" />
}
