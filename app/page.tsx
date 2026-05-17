import { readSection } from '@/lib/content'

// Homepage. Title/description/canonical inherit the layout defaults.
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
