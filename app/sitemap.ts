import type { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import { practiceAreas } from '@/lib/practice-areas'
import { guides } from '@/lib/guides'
import { insights } from '@/lib/insights'

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

type ChangeFreq = 'weekly' | 'monthly' | 'yearly'

// Route -> content source file. Each static route's <lastmod> tracks the
// fragment it renders from.
const staticRoutes: Array<{ path: string; source: string; freq?: ChangeFreq }> = [
  { path: '/', source: 'content/sections/home.html', freq: 'weekly' },
  { path: '/practice-areas', source: 'content/sections/practice-areas.html' },
  { path: '/guides', source: 'content/sections/guides-index.html' },
  { path: '/police-station-representation', source: 'content/sections/police-station.html' },
  { path: '/fees', source: 'content/sections/fees.html' },
  { path: '/direct-access', source: 'content/sections/direct-access.html' },
  { path: '/authorised-to-conduct-litigation', source: 'content/sections/authorised-to-conduct-litigation.html' },
  { path: '/legal-aid', source: 'content/sections/legal-aid.html' },
  { path: '/about', source: 'content/sections/about.html' },
  { path: '/contact', source: 'content/sections/contact.html' },
  { path: '/complaints', source: 'content/sections/complaints.html', freq: 'yearly' },
  { path: '/timescales', source: 'content/sections/timescales.html' },
  { path: '/terms-of-engagement', source: 'content/sections/terms-of-engagement.html', freq: 'yearly' },
  { path: '/privacy-policy', source: 'content/sections/privacy-policy.html', freq: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(({ path: p, source, freq }) => ({
    url: p === '/' ? BASE : `${BASE}${p}`,
    lastModified: mtime(source),
    changeFrequency: freq ?? 'monthly',
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
  // Insights index + article pages render from content/insights/*.md.
  const insightEntries: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/insights`,
      lastModified: insights[0] ? new Date(insights[0].dateModified) : mtime('content/insights'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...insights.map((post) => ({
      url: `${BASE}/insights/${post.slug}`,
      lastModified: new Date(post.dateModified),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
  return [...staticEntries, ...areaEntries, ...guideEntries, ...insightEntries]
}
