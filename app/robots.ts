import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      // AI crawlers: GPTBot (OpenAI) and CCBot (Common Crawl) are allowed so
      // the site can be cited by ChatGPT and Perplexity — a visibility channel
      // for an audience that asks AI assistants what to do after an arrest.
      // Google-Extended (Gemini model training) and Bytespider (ByteDance)
      // stay blocked. Googlebot and Google AI Overviews are unaffected either
      // way.
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
