import type { Metadata } from 'next'
import { readSection } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Astons Law Chambers, a criminal defence barrister in London. Call 07922 247 999, message on WhatsApp, or book a callback. Direct instruction available.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return <div dangerouslySetInnerHTML={{ __html: readSection('contact') }} />
}
