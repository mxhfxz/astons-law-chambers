import type { Metadata } from 'next'
import { readSection } from '@/lib/content'

export const metadata: Metadata = {
  title: { absolute: 'Get in Touch for 24/7 Police station representation & Criminal defence – Astons Law Chambers' },
  description:
    'Call 07922 247 999 at any time. WhatsApp or book a callback. Police station support and criminal defence in London and the UK. Legal aid can be offered through partner firms.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return <div dangerouslySetInnerHTML={{ __html: readSection('contact') }} />
}
