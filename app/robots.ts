import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      // Block AI model-training crawlers. Does NOT affect Google Search
      // indexing (Googlebot is unaffected). Blocking Google-Extended prevents
      // Gemini training use only — not AI Overviews.
      // ChatGPT-User (OpenAI browsing crawler) deliberately not blocked.
      {
        userAgent: 'GPTBot',
        disallow: ['/'],
      },
      {
        userAgent: 'Google-Extended',
        disallow: ['/'],
      },
      {
        userAgent: 'Bytespider',
        disallow: ['/'],
      },
      {
        userAgent: 'CCBot',
        disallow: ['/'],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  }
}
