// Server-side fill of the practice-area templates. Mirrors the prototype's
// renderPracticeAreaDetail / renderPracticeAreaIndex (preview/index.html),
// but produces the markup at build time instead of in the browser.
import { PracticeArea, practiceAreas, getAreaTitle } from './practice-areas'
import { readSection } from './content'

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function cardHtml(a: PracticeArea, headingTag: 'h2' | 'h3'): string {
  return `<li><a href="/practice-areas/${a.slug}" class="block bg-white p-6 md:p-8 h-full hover:bg-offwhite transition-colors group">
        <${headingTag} class="text-xl font-semibold tracking-tight2">${esc(a.title)}</${headingTag}>
        <p class="mt-2 text-base text-navy-700 leading-relaxed">${esc(a.cardSummary)}</p>
        <span class="mt-4 inline-flex items-center gap-2 text-base font-medium text-navy-950">
          <span class="underline underline-offset-4 decoration-1 group-hover:decoration-2">Learn more</span>
          <span aria-hidden="true" class="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:transform-none">→</span>
        </span>
      </a></li>`
}

/** Practice-areas index page with the grid populated from data. */
export function renderPracticeAreaIndex(): string {
  const html = readSection('practice-areas')
  const cards = practiceAreas.map((a) => cardHtml(a, 'h2')).join('')
  return html.replace('<!-- Populated by JS from PRACTICE_AREAS -->', cards)
}

/** Practice-area detail page for a given area. */
export function renderPracticeAreaDetail(area: PracticeArea): string {
  let html = readSection('pa-detail')

  const setVal = (name: string, value: string) => {
    html = html.replace(
      new RegExp(`(data-bind="${name}"\\s*>)\\s*—\\s*(<)`, 'g'),
      `$1${esc(value)}$2`,
    )
  }

  setVal('title', area.title)
  setVal('kicker', area.kicker)
  setVal('situation', area.situation)
  if (area.context) {
    setVal('contextEyebrow', area.context.eyebrow)
    setVal('contextTitle', area.context.title)
    setVal('contextBody', area.context.body)
  }

  const actions = area.actions
    .map(
      (s) =>
        `<li class="pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-grey-300">${esc(s)}</li>`,
    )
    .join('')
  html = html.replace('data-bind="actions"></ul>', `data-bind="actions">${actions}</ul>`)

  const process = area.process.map((s) => `<li>${esc(s)}</li>`).join('')
  html = html.replace('data-bind="process"></ol>', `data-bind="process">${process}</ol>`)

  const faqs = area.faqs
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
  html = html.replace('data-bind="faqs"></dl>', `data-bind="faqs">${faqs}</dl>`)

  const related = area.related
    .map(
      (slug) =>
        `<li><a href="/practice-areas/${slug}" class="text-navy-950 underline underline-offset-4 decoration-1 hover:decoration-2">${esc(getAreaTitle(slug))} →</a></li>`,
    )
    .join('')
  html = html.replace('data-bind="related"></ul>', `data-bind="related">${related}</ul>`)

  if (area.policeStation) {
    html = html.replace('data-bind="policeBanner" hidden ', 'data-bind="policeBanner" ')
    setVal('policeBannerTitle', area.policeStation.title)
  }

  return html
}

/** FAQPage + BreadcrumbList JSON-LD for a practice-area detail page. */
export function practiceAreaJsonLd(area: PracticeArea): string {
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: area.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://astonslaw.com' },
      { '@type': 'ListItem', position: 2, name: 'Defence work', item: 'https://astonslaw.com/practice-areas' },
      {
        '@type': 'ListItem',
        position: 3,
        name: area.title,
        item: `https://astonslaw.com/practice-areas/${area.slug}`,
      },
    ],
  }
  return JSON.stringify([faq, crumbs])
}
