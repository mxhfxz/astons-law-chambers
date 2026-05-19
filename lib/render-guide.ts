// Server-side render for the guide article pages. Reads the hand-written
// fragment, injects the FAQ block from lib/guides.ts (so the visible FAQ and
// the FAQPage schema stay in sync), and emits Article + FAQPage +
// BreadcrumbList JSON-LD. Mirrors lib/render-practice-area.ts.
import { Guide, guides } from './guides'
import { readSection } from './content'

const BASE = 'https://astonslaw.com'

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/** Guide detail page: fragment HTML with the FAQ accordion filled in. */
export function renderGuide(guide: Guide): string {
  const html = readSection(guide.section)
  const faqs = guide.faqs
    .map(
      (f) => `
        <div class="border-t border-grey-300 pt-4">
          <dt class="flex items-start justify-between gap-4 font-semibold tracking-tightish">
            <span class="flex-1">${esc(f.q)}</span>
            <svg aria-hidden="true" class="shrink-0 w-4 h-4 mt-1 text-grey-300"><use href="#i-chevron-down"/></svg>
          </dt>
          <dd class="mt-2 text-navy-700 leading-relaxed">${esc(f.a)}</dd>
        </div>`,
    )
    .join('')
  return html.replace('data-bind="faqs"></dl>', `data-bind="faqs">${faqs}</dl>`)
}

/** Guides hub page: the index fragment with the guide cards filled in. */
export function renderGuidesIndex(): string {
  const html = readSection('guides-index')
  const cards = guides
    .map(
      (g) => `<a href="/guides/${g.slug}" class="block bg-white border border-grey-300 rounded p-6 md:p-8 hover:bg-offwhite transition-colors group">
        <h2 class="text-xl font-semibold tracking-tight2 text-navy-950">${esc(g.title)}</h2>
        <p class="mt-2 text-base text-navy-700 leading-relaxed">${esc(g.description)}</p>
        <span class="mt-4 inline-flex items-center gap-2 text-base font-medium text-navy-950">
          <span class="underline underline-offset-4 decoration-1 group-hover:decoration-2">Read the guide</span>
          <span aria-hidden="true" class="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:transform-none">→</span>
        </span>
      </a>`,
    )
    .join('')
  return html.replace('data-bind="guideCards"></div>', `data-bind="guideCards">${cards}</div>`)
}

/** Article + FAQPage + BreadcrumbList JSON-LD for a guide detail page. */
export function guideJsonLd(guide: Guide): string {
  const url = `${BASE}/guides/${guide.slug}`
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    datePublished: guide.datePublished,
    dateModified: guide.dateModified,
    inLanguage: 'en-GB',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@id': `${BASE}/#principal` },
    publisher: { '@id': `${BASE}/#organization` },
  }
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE}/guides` },
      { '@type': 'ListItem', position: 3, name: guide.title, item: url },
    ],
  }
  return JSON.stringify([article, faq, crumbs])
}

/** BreadcrumbList JSON-LD for the /guides hub page. */
export function guidesHubJsonLd(): string {
  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE}/guides` },
    ],
  }
  return JSON.stringify(crumbs)
}
