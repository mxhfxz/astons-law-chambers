import type { Metadata } from 'next'
import { HomeCharmBar } from '@/components/sections/HomeCharmBar'
import { HomeHero } from '@/components/sections/HomeHero'
import { readSection } from '@/lib/content'

export const metadata: Metadata = {
  title: { absolute: 'Astons Law Chambers | Criminal Defence Experts' },
  description:
    'Free consultation and emergency police station support. Astons Law Chambers offer support for violence, drug offences, fraud and other serious crimes. Call 07922 247 999 for immediate support.',
}

export default function HomePage() {
  return (
    <>
      {/* Preload the hero background photo. Homepage-only — keeping this in the
          root layout made every other route fetch an unused image. */}
      <link rel="preload" as="image" href="/images/bg_main.avif" />
      <HomeHero />
      <HomeCharmBar />
      <div dangerouslySetInnerHTML={{ __html: readSection('home') }} />
    </>
  )
}
