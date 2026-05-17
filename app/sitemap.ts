import type { MetadataRoute } from 'next'
import { practiceAreas } from '@/lib/practice-areas'

const BASE = 'https://astonslaw.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '/',
    '/practice-areas',
    '/police-station-representation',
    '/fees',
    '/direct-access',
    '/about',
    '/contact',
    '/complaints',
    '/timescales',
    '/terms-of-engagement',
  ]
  const now = new Date()
  const staticEntries: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }))
  const areaEntries: MetadataRoute.Sitemap = practiceAreas.map((a) => ({
    url: `${BASE}/practice-areas/${a.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))
  return [...staticEntries, ...areaEntries]
}
