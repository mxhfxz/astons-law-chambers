import type { Metadata } from 'next'
import { readSection } from '@/lib/content'

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Astons Law Chambers — a criminal defence practice in London, taking instructions direct from the public under the Bar Standards Board Public Access scheme.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return <div dangerouslySetInnerHTML={{ __html: readSection('about') }} />
}
