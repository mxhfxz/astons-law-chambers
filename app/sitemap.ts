import type { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import { practiceAreas } from '@/lib/practice-areas'
import { guides } from '@/lib/guides'

const BASE = 'https://astonslaw.com'

/** Last-modified date of a content source file, so <lastmod> reflects a real
 *  edit rather than the build timestamp (which Google learns to distrust). */
function mtime(rel: string): Date {
  try {
    return fs.statSync(path.join(process.cwd(), rel)).mtime
  } catch {
    return new Date()
  }
}

// Route -> content source file. Each static route's <lastmod> tracks the
// fragment it renders from.
const staticRoutes: Array<{ path: string; source: string }> = [
  { path: '/', source: 'content/sections/home.html' },
  { path: '/practice-areas', source: 'content/sections/practice-areas.html' },
  { path: '/guides', source: 'content/sections/guides-index.html' },
  { path: '/police-station-representation', source: 'content/sections/police-station.html' },
  { path: '/fees', source: 'content/sections/fees.html' },
  { path: '/direct-access', source: 'content/sections/direct-access.html' },
  { path: '/about', source: 'content/sections/about.html' },
  { path: '/contact', source: 'content/sections/contact.html' },
  { path: '/complaints', source: 'content/sections/complaints.html' },
  { path: '/timescales', source: 'content/sections/timescales.html' },
  { path: '/terms-of-engagement', source: 'content/sections/terms-of-engagement.html' },
  { path: '/privacy-policy', source: 'content/sections/privacy-policy.html' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(({ path: p, source }) => ({
    url: p === '/' ? BASE : `${BASE}${p}`,
    lastModified: mtime(source),
    changeFrequency: 'monthly',
    priority: p === '/' ? 1 : 0.7,
  }))
  // Practice-area detail pages render from lib/practice-areas.ts.
  const areaModified = mtime('lib/practice-areas.ts')
  const areaEntries: MetadataRoute.Sitemap = practiceAreas.map((a) => ({
    url: `${BASE}/practice-areas/${a.slug}`,
    lastModified: areaModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))
  // Guide article pages render from content/sections/guide-*.html.
  const guideEntries: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${BASE}/guides/${g.slug}`,
    lastModified: mtime(`content/sections/${g.section}.html`),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))
  return [...staticEntries, ...areaEntries, ...guideEntries]
}
