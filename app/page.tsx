import type { Metadata } from 'next'
import { readSection } from '@/lib/content'

export const metadata: Metadata = {
  title: { absolute: 'Criminal Defence London | Emergency & Legal Aid - Astons Law' },
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
