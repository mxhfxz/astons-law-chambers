import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      // AI crawlers: explicit allows for citation-eligible crawlers so the site
      // appears in ChatGPT, Claude, and Perplexity answers — a direct channel
      // for an audience that asks AI assistants what to do after an arrest.
      // Google-Extended (Gemini training) and Bytespider (ByteDance) stay
      // blocked. Googlebot and Google AI Overviews are unaffected either way.
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
      },
      {
        userAgent: 'Google-Extended',
        disallow: ['/'],
      },
      {
        userAgent: 'Bytespider',
        disallow: ['/'],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  }
}
