// Insights articles — client-authored via Pages CMS (Markdown + YAML
// frontmatter, committed to content/insights/ on the content-staging branch).
// Parsed at build time. Mirrors the SHAPE of lib/guides.ts, but the source of
// truth is the Markdown files, not a hand-maintained array.
//
// AIRTIGHT CONTRACT — see .project/insights-cms-2026-05-22/airtight-design.md:
//  - Draft / invalid / unparseable articles are EXCLUDED and logged, never
//    thrown. One bad file can NEVER fail the production build (§7).
//  - Every optional field has a defined fallback, so a sparse article still
//    yields a complete page (§5).
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface Insight {
  slug: string
  /** H1 / headline — rendered by the route, never by the body. */
  title: string
  /** SEO <title> (layout template appends " — Astons Law Chambers"). */
  metaTitle: string
  /** SEO meta description. */
  metaDescription: string
  /** One-line summary — Article schema description + index card text. */
  description: string
  /** Visible byline. Defaults to the principal. */
  author: string
  datePublished: string
  dateModified: string
  /** Optional hero image path under /insights/. null when absent. */
  heroImage: string | null
  heroAlt: string
  /**
   * Optional per-article aside CTA box. null → the default "Speak to a
   * barrister" box. `emphasis` switches to the red station-urgency styling
   * used on the police-station page and the guide asides.
   */
  asideCta: { eyebrow: string | null; headline: string; emphasis: boolean } | null
  /** Raw Markdown body — rendered to sanitised HTML by lib/render-insight.ts. */
  body: string
}

const DIR = path.join(process.cwd(), 'content', 'insights')
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const DEFAULT_AUTHOR = 'Ghulam Humayun'

function strOr(v: unknown, fallback: string): string {
  return typeof v === 'string' && v.trim() ? v.trim() : fallback
}

function isValidISODate(v: unknown): v is string {
  if (typeof v !== 'string' || !/^\d{4}-\d{2}-\d{2}/.test(v)) return false
  return !Number.isNaN(new Date(v).getTime())
}

/** Strip Markdown/HTML to plain text for excerpt + meta fallback. */
function toPlainText(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_`~|]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function excerpt(md: string, max = 155): string {
  const text = toPlainText(md)
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trim()}…`
}

/** Parse the optional aside CTA block. Missing/invalid → null (default box). */
function parseAsideCta(v: unknown): Insight['asideCta'] {
  if (!v || typeof v !== 'object') return null
  const o = v as Record<string, unknown>
  const headline = typeof o.headline === 'string' ? o.headline.trim() : ''
  if (!headline) return null
  return {
    eyebrow: typeof o.eyebrow === 'string' && o.eyebrow.trim() ? o.eyebrow.trim() : null,
    headline,
    emphasis: o.emphasis === true,
  }
}

function warn(file: string, msg: string): void {
  // Surfaced in the build log; the content-staging review catches it pre-merge.
  console.warn(`[insights] skipped content/insights/${file}: ${msg}`)
}

function loadAll(): Insight[] {
  let files: string[]
  try {
    files = fs.readdirSync(DIR).filter((f) => f.endsWith('.md') && !f.startsWith('.'))
  } catch {
    return [] // directory missing -> no insights; build unaffected
  }

  const out: Insight[] = []
  const seen = new Set<string>()

  for (const file of files) {
    const slug = file.replace(/\.md$/, '')
    try {
      const { data, content } = matter(fs.readFileSync(path.join(DIR, file), 'utf-8'))

      // --- validation: skip-and-log, never throw (airtight §7) ---
      if (data.draft === true) continue
      if (!SLUG_RE.test(slug)) { warn(file, `invalid slug "${slug}"`); continue }
      if (seen.has(slug)) { warn(file, `duplicate slug "${slug}"`); continue }
      if (typeof data.title !== 'string' || !data.title.trim()) { warn(file, 'missing title'); continue }
      if (!isValidISODate(data.datePublished)) { warn(file, 'missing/invalid datePublished'); continue }
      if (typeof content !== 'string' || !content.trim()) { warn(file, 'empty body'); continue }

      seen.add(slug)
      const title = data.title.trim()
      const description = strOr(data.description, excerpt(content))

      out.push({
        slug,
        title,
        metaTitle: strOr(data.metaTitle, title),
        metaDescription: strOr(data.metaDescription, description).slice(0, 200),
        description,
        author: strOr(data.author, DEFAULT_AUTHOR),
        datePublished: data.datePublished,
        dateModified: isValidISODate(data.dateModified) ? data.dateModified : data.datePublished,
        heroImage: strOr(data.heroImage, '') || null,
        heroAlt: strOr(data.heroAlt, ''),
        asideCta: parseAsideCta(data.asideCta),
        body: content,
      })
    } catch (err) {
      warn(file, `parse error: ${(err as Error).message}`)
    }
  }

  // newest first
  out.sort((a, b) => (a.datePublished < b.datePublished ? 1 : a.datePublished > b.datePublished ? -1 : 0))
  return out
}

export const insights: Insight[] = loadAll()

export function getInsight(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug)
}

export function formatInsightDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}
