import type { Metadata } from 'next'
import { HomeHero } from '@/components/sections/HomeHero'
import { readChrome, readSection } from '@/lib/content'

export const metadata: Metadata = {
  title: { absolute: 'Astons Law Chambers | Direct Access Criminal Barrister London' },
  description:
    'Direct access criminal defence barrister in London. Fixed fees, no solicitor required. 24/7 emergency police station representation. Call or WhatsApp now.',
}

export default function HomePage() {
  return (
    <>
      {/* Preload the hero background photo. Homepage-only — keeping this in the
          root layout made every other route fetch an unused image. */}
      <link rel="preload" as="image" href="/images/bg_main.avif" />
      <HomeHero trustHtml={readChrome('hero-trust')} />
      <div dangerouslySetInnerHTML={{ __html: readSection('home') }} />
    </>
  )
}
