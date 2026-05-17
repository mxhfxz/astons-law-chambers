import type { Metadata } from 'next'
import { readSection } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Astons Law Chambers collects, uses, and protects personal information when you contact us or use this website, and the data protection rights you have.',
  alternates: { canonical: '/privacy-policy' },
}

export default function PrivacyPolicyPage() {
  return <div dangerouslySetInnerHTML={{ __html: readSection('privacy-policy') }} />
}
