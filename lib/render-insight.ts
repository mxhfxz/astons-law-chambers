// Server-side render for Insights article bodies. Converts client-authored
// Markdown to a sanitised, semantically-normalised HTML string and emits
// Article + BreadcrumbList JSON-LD. Build-time only; ships zero client JS.
//
// AIRTIGHT PIPELINE — see .project/insights-cms-2026-05-22/airtight-design.md:
//   parse -> gfm -> rehype(raw HTML parsed) -> NORMALISE HEADINGS (§3)
//   -> INJECT IMAGE DIMENSIONS (§4) -> SANITISE allowlist (§2)
//   -> add rel on external links -> stringify
// The sanitiser runs AFTER raw HTML is parsed, so any pasted <script>,
// <iframe>, on* handler, style, or class is stripped. The client never
// reasons about H1/H2 — the normaliser owns the outline.
import fs from 'fs'
import path from 'path'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import { visit } from 'unist-util-visit'
import { imageSize } from 'image-size'
import type { Root, Element } from 'hast'
import type { Insight } from './insights'

const BASE = 'https://astonslaw.com'
const HEADING_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

// --- Allowlist sanitiser schema (deny-by-default, §2) ---
const schema = {
  ...defaultSchema,
  tagNames: [
    'p', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'blockquote',
    'strong', 'em', 'b', 'i', 'a', 'code', 'pre', 'hr', 'img', 'br',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
  ],
  attributes: {
    a: ['href'],
    img: ['src', 'alt', 'width', 'height', 'loading', 'decoding'],
    th: ['scope'],
    '*': [],
  },
  protocols: {
    href: ['http', 'https', 'mailto', 'tel'],
    src: ['http', 'https'],
  },
}

/** §3 — re-flow body headings into a gap-free h2->h4 outline; drop any body H1. */
function rehypeNormalizeHeadings() {
  return (tree: Root): void => {
    const present = new Set<number>()
    visit(tree, 'element', (node: Element) => {
      const i = HEADING_TAGS.indexOf(node.tagName)
      if (i >= 0) present.add(i + 1)
    })
    if (present.size === 0) return
    const map = new Map<number, number>()
    ;[...present].sort((a, b) => a - b).forEach((orig, i) => map.set(orig, Math.min(2 + i, 4)))
    visit(tree, 'element', (node: Element) => {
      const i = HEADING_TAGS.indexOf(node.tagName)
      if (i >= 0) node.tagName = `h${map.get(i + 1)}`
    })
  }
}

/** §4 — inject width/height (CLS) + lazy/decoding on every body image. */
function rehypeImageDimensions() {
  return (tree: Root): void => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName !== 'img') return
      const props = node.properties ?? (node.properties = {})
      const src = props.src
      if (typeof src === 'string' && src.startsWith('/')) {
        try {
          const dim = imageSize(fs.readFileSync(path.join(process.cwd(), 'public', src)))
          if (dim.width && dim.height) {
            props.width = dim.width
            props.height = dim.height
          }
        } catch {
          // missing/unreadable image: skip dimensions, never break the build
        }
      }
      if (!props.loading) props.loading = 'lazy'
      props.decoding = 'async'
    })
  }
}

/** Mark header-row cells with scope="col" for screen readers (GFM emits bare <th>). */
function rehypeTableScope() {
  return (tree: Root): void => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName !== 'th') return
      const props = node.properties ?? (node.properties = {})
      if (!props.scope) props.scope = 'col'
    })
  }
}

/** Add rel="noopener noreferrer" to external links (runs after sanitise). */
function rehypeExternalLinks() {
  return (tree: Root): void => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName !== 'a') return
      const href = node.properties?.href
      if (typeof href === 'string' && /^https?:\/\//i.test(href)) {
        node.properties!.rel = 'noopener noreferrer'
      }
    })
  }
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeNormalizeHeadings)
  .use(rehypeImageDimensions)
  .use(rehypeTableScope)
  .use(rehypeSanitize, schema)
  .use(rehypeExternalLinks)
  .use(rehypeStringify)

/** Render a Markdown body to sanitised, normalised HTML. */
export async function renderInsightBody(markdown: string): Promise<string> {
  const file = await processor.process(markdown)
  return String(file)
}

/** Intrinsic dimensions of a local /public image, or null (for the hero <img>). */
export function imageDimensions(src: string): { width: number; height: number } | null {
  if (typeof src !== 'string' || !src.startsWith('/')) return null
  try {
    const dim = imageSize(fs.readFileSync(path.join(process.cwd(), 'public', src)))
    if (dim.width && dim.height) return { width: dim.width, height: dim.height }
  } catch {
    // missing/unreadable: caller renders without explicit dimensions
  }
  return null
}

/** Article + BreadcrumbList JSON-LD for an article page. */
export function insightJsonLd(insight: Insight): string {
  const url = `${BASE}/insights/${insight.slug}`
  const article: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: insight.title,
    description: insight.description,
    datePublished: insight.datePublished,
    dateModified: insight.dateModified,
    inLanguage: 'en-GB',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@id': `${BASE}/#principal` },
    publisher: { '@id': `${BASE}/#organization` },
  }
  if (insight.heroImage) {
    article.image = insight.heroImage.startsWith('http')
      ? insight.heroImage
      : `${BASE}${insight.heroImage}`
  }
  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Insights', item: `${BASE}/insights` },
      { '@type': 'ListItem', position: 3, name: insight.title, item: url },
    ],
  }
  const graph: Record<string, unknown>[] = [article, crumbs]
  if (insight.faqs && insight.faqs.length) {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: insight.faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    })
  }
  return JSON.stringify(graph)
}

/** BreadcrumbList JSON-LD for the /insights hub page. */
export function insightsHubJsonLd(): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Insights', item: `${BASE}/insights` },
    ],
  })
}
