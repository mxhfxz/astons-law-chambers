import type { Metadata } from 'next'
import { readSection } from '@/lib/content'

export const metadata: Metadata = {
  title: { absolute: 'Astons Law Chambers | Direct Access Criminal Barrister London' },
  description:
    'Direct access criminal defence barrister in London. Fixed fees, no solicitor required. 24/7 emergency police station representation. Call or WhatsApp now.',
}

export default function HomePage() {
  return (
    <>
      {/* Preload the LCP hero image. Homepage-only — keeping this in the root
          layout made every other route fetch an unused image. */}
      <link rel="preload" as="image" href="/hero_image.webp" />
      <div dangerouslySetInnerHTML={{ __html: readSection('home') }} />
    </>
  )
}
