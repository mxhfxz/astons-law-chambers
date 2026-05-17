import type { Metadata } from 'next'
import { readSection } from '@/lib/content'

export const metadata: Metadata = {
  title: 'About',
  description: 'Astons Law Chambers — a criminal defence practice based in London.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return <div dangerouslySetInnerHTML={{ __html: readSection('about') }} />
}
