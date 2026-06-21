import type { Metadata } from 'next'
import { readSection } from '@/lib/content'

export const metadata: Metadata = {
  title: { absolute: 'Privacy Policy | Astons Law Chambers' },
  description:
    'How Astons Law Chambers collects, uses, and protects your personal and case data in compliance with UK data protection laws.',
  alternates: { canonical: '/privacy-policy' },
}

export default function PrivacyPolicyPage() {
  return <div dangerouslySetInnerHTML={{ __html: readSection('privacy-policy') }} />
}
