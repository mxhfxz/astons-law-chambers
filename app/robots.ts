import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Catch-all: every crawler may read the whole site. Anything not named
      // below (Bytespider, Amazonbot, Meta-ExternalAgent, cohere-ai, Applebot,
      // etc.) is allowed by this rule.
      {
        userAgent: '*',
        allow: '/',
      },
      // AI search/answer crawlers, named explicitly so the site is a clear,
      // intentional source for ChatGPT, Gemini, Perplexity, Claude, and Apple
      // Intelligence — the channel an arrested person uses when they ask an AI
      // assistant what to do. Indexing bots and user-initiated fetch bots are
      // both listed so the site shows up in training, search, and live answers.
      // Googlebot and Google AI Overviews are unaffected by these rules.
      {
        // OpenAI / ChatGPT — training, search, and live user fetches
        userAgent: ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User'],
        allow: '/',
      },
      {
        // Google Gemini grounding + training (Googlebot handles normal search)
        userAgent: 'Google-Extended',
        allow: '/',
      },
      {
        // Perplexity — index + live user fetches
        userAgent: ['PerplexityBot', 'Perplexity-User'],
        allow: '/',
      },
      {
        // Anthropic / Claude — index, search, and live user fetches
        userAgent: ['ClaudeBot', 'Claude-SearchBot', 'Claude-User'],
        allow: '/',
      },
      {
        // Apple Intelligence / Siri
        userAgent: 'Applebot-Extended',
        allow: '/',
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  }
}
