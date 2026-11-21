import type { Metadata } from 'next'
import { readSection } from '@/lib/content'
import { WithCharmBar } from '@/components/sections/WithCharmBar'

export const metadata: Metadata = {
  title: { absolute: 'Privacy Policy | Astons Law Chambers' },
  description:
    'How Astons Law Chambers collects, uses, and protects your personal and case data in compliance with UK data protection laws.',
  alternates: { canonical: '/privacy-policy' },
}

export default function PrivacyPolicyPage() {
  return <WithCharmBar html={readSection('privacy-policy')} path="/privacy-policy" />
}
