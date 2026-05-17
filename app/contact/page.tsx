import type { Metadata } from 'next'
import { readSection } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Astons Law Chambers. Call 07922 247 999 or message on WhatsApp.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return <div dangerouslySetInnerHTML={{ __html: readSection('contact') }} />
}
