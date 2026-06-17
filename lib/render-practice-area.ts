// Server-side fill of the practice-area templates. Mirrors the prototype's
// renderPracticeAreaDetail / renderPracticeAreaIndex (preview/index.html),
// but produces the markup at build time instead of in the browser.
import { PracticeArea, practiceAreas, getAreaTitle } from './practice-areas'
import { SubPracticeArea, getSubAreaBySlug, subPracticeAreas } from './sub-practice-areas'
import { readSection } from './content'

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/** Resolve a slug to its href, checking sub-pages first then top-level PAs. */
function resolveAreaHref(slug: string): string {
  const sub = getSubAreaBySlug(slug)
  if (sub) return `/practice-areas/${sub.parentSlug}/${sub.slug}`
  return `/practice-areas/${slug}`
}

/** Resolve a slug to its display title, checking sub-pages first then top-level PAs. */
function resolveAreaTitle(slug: string): string {
  const sub = getSubAreaBySlug(slug)
  if (sub) return sub.title
  return getAreaTitle(slug)
}

function cardHtml(a: PracticeArea, headingTag: 'h2' | 'h3'): string {
  return `<li><a href="/practice-areas/${a.slug}" class="block bg-offwhite border border-grey-300 rounded p-6 md:p-8 h-full hover:bg-white transition-colors group">
        <${headingTag} class="text-xl font-semibold tracking-tight2">${esc(a.title)}</${headingTag}>
        <p class="mt-2 text-base text-navy-700 leading-relaxed">${esc(a.cardSummary)}</p>
        <span class="mt-4 inline-flex items-center gap-2 text-base font-medium text-navy-950">
          <span class="underline underline-offset-4 decoration-1 group-hover:decoration-2">Learn more</span>
          <span aria-hidden="true" class="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:transform-none">→</span>
        </span>
      </a></li>`
}

/** Consequence callout for a practice area. Renders the context block as a
 *  bordered card (single-column IA replacement for the old sidebar). Returns an
 *  empty string when the area has no `context`, so the template placeholder
 *  collapses rather than showing stray "—" binds. */
function contextCalloutHtml(area: PracticeArea): string {
  if (!area.context) return ''
  const { eyebrow, title, body } = area.context
  // Bordered card; lives inside the main column now (no full-width wrapper).
  return `<div class="border border-grey-300 rounded p-6 md:p-8">
          <p class="text-xs font-semibold tracking-[0.12em] uppercase text-emergency-600">${esc(eyebrow)}</p>
          <p class="mt-2 text-lg font-semibold tracking-tightish text-navy-950">${esc(title)}</p>
          <p class="mt-2 text-navy-700 leading-relaxed">${esc(body)}</p>
        </div>`
}

/** Card for a sub-practice-area. Same markup as cardHtml but the href points
 *  at the nested route (/practice-areas/[parent]/[slug]) and the heading is an
 *  h3 (it sits under the section's h2). */
function subPageCardHtml(a: SubPracticeArea): string {
  return `<li><a href="/practice-areas/${a.parentSlug}/${a.slug}" class="block bg-offwhite border border-grey-300 rounded p-6 md:p-8 h-full hover:bg-white transition-colors group">
        <h3 class="text-xl font-semibold tracking-tight2">${esc(a.title)}</h3>
        <p class="mt-2 text-base text-navy-700 leading-relaxed">${esc(a.cardSummary)}</p>
        <span class="mt-4 inline-flex items-center gap-2 text-base font-medium text-navy-950">
          <span class="underline underline-offset-4 decoration-1 group-hover:decoration-2">Learn more</span>
          <span aria-hidden="true" class="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:transform-none">→</span>
        </span>
      </a></li>`
}

/** Grid of sub-offence cards for a parent practice area, in the same card grid
 *  used on the homepage and the practice-areas index. Returns an empty string
 *  when the area has no sub-pages, so the template placeholder simply collapses
 *  on childless pages and on the sub-pages themselves. */
function subPageGridHtml(parentSlug: string): string {
  const subs = subPracticeAreas.filter((s) => s.parentSlug === parentSlug)
  if (subs.length === 0) return ''
  const cards = subs.map(subPageCardHtml).join('')
  // Sub-offence cards now use the grey bordered card style (matching the aside
  // Related/Guides cards, user 2026-06-16), so the grid is separated cards, not
  // a gapless divider grid.
  return `<section>
          <h2 class="text-3xl font-semibold tracking-tight2">Offences we defend in this area</h2>
          <ul class="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">${cards}</ul>
        </section>`
}

/** Slugs with no realistic "calling from a police station" scenario — these get
 *  no red box and no Guides card (user, 2026-06-09). Appeals = post-conviction;
 *  Inquests = families, not arrest; Totting-up = penalty points / court. */
const NO_STATION_SCENARIO = new Set(['appeals', 'inquests', 'totting-up'])

/** Aside block 1 — the top CTA card. Custody-scenario pages get the RED police
 *  box (single Call button, the only side-panel CTA carrying an icon). All other
 *  pages get the blue Astons box (Call + Book, no icons). User 2026-06-16. */
function asideCtaBoxHtml(slug: string): string {
  if (NO_STATION_SCENARIO.has(slug)) {
    return `<div class="bg-navy-950 text-white rounded p-6">
          <p class="text-lg font-semibold tracking-tightish">Book a consultation or call for legal support today</p>
          <a href="tel:+447922247999" aria-label="Call Astons Law Chambers" data-track="call_click" data-track-location="practice_area_aside" class="btn btn-md btn-inverse w-full mt-4 flex">
            Call now
          </a>
          <a href="https://cal.com/astonslaw/callback?overlayCalendar=true" aria-label="Book a consultation with Astons Law Chambers" data-track="book_click" data-track-location="practice_area_aside" class="btn btn-md btn-on-dark w-full mt-3 flex">
            Book a consultation
          </a>
        </div>`
  }
  return `<div class="bg-emergency-500 text-white rounded p-6">
          <p class="text-lg font-semibold tracking-tightish">Police station representation available 24/7</p>
          <a href="tel:+447922247999" aria-label="Call Astons Law Chambers" data-track="call_click" data-track-location="practice_area_aside" class="btn btn-md btn-inverse-emergency w-full mt-4 flex">
            <svg class="ico" aria-hidden="true"><use href="#i-phone"/></svg>
            Call now
          </a>
        </div>`
}

/** Related-areas link list (user rule, 2026-06-09):
 *  - sub-page        → parent, then sibling sub-pages
 *  - top-level w/ children → its child sub-pages
 *  - top-level w/o children → existing curated `related[]` (fallback, so the
 *    aside never collapses to empty). */
function relatedItemsHtml(
  area: PracticeArea,
  parentInfo?: { slug: string; title: string },
): string {
  const links: Array<{ href: string; title: string }> = []
  if (parentInfo) {
    links.push({ href: `/practice-areas/${parentInfo.slug}`, title: parentInfo.title })
    for (const s of subPracticeAreas.filter((s) => s.parentSlug === parentInfo.slug && s.slug !== area.slug)) {
      links.push({ href: `/practice-areas/${s.parentSlug}/${s.slug}`, title: s.title })
    }
  } else {
    const children = subPracticeAreas.filter((s) => s.parentSlug === area.slug)
    if (children.length > 0) {
      for (const c of children) {
        links.push({ href: `/practice-areas/${c.parentSlug}/${c.slug}`, title: c.title })
      }
    } else {
      for (const slug of area.related) {
        links.push({ href: resolveAreaHref(slug), title: resolveAreaTitle(slug) })
      }
    }
  }
  return links
    .map(
      (l) =>
        `<li><a href="${l.href}" class="text-navy-950 underline underline-offset-4 decoration-1 hover:decoration-2">${esc(l.title)} &rarr;</a></li>`,
    )
    .join('')
}

/** Aside block 2 — Related areas card. */
function asideRelatedHtml(
  area: PracticeArea,
  parentInfo?: { slug: string; title: string },
): string {
  const items = relatedItemsHtml(area, parentInfo)
  if (!items) return ''
  return `<div class="bg-offwhite border border-grey-300 rounded p-6">
          <p class="text-xs font-semibold tracking-[0.12em] uppercase text-grey-600">Related areas</p>
          <ul class="mt-3 space-y-2 text-sm">${items}</ul>
        </div>`
}

/** Aside block 3 — Guides card. Shown only where a relevant guide exists. The
 *  two current guides are arrest/interview guides, so they map to the same set
 *  as the red box. Coded but not rendered elsewhere until a relevant guide is
 *  added (user, 2026-06-09). */
function asideGuidesHtml(slug: string): string {
  if (NO_STATION_SCENARIO.has(slug)) return ''
  return `<div class="bg-offwhite border border-grey-300 rounded p-6">
          <p class="text-xs font-semibold tracking-[0.12em] uppercase text-grey-600">Guides</p>
          <ul class="mt-3 space-y-2 text-sm">
            <li><a href="/guides/first-24-hours-after-arrest" class="text-navy-950 underline underline-offset-4 decoration-1 hover:decoration-2">First 24 hours after an arrest →</a></li>
            <li><a href="/guides/do-i-need-a-lawyer-at-a-voluntary-police-interview" class="text-navy-950 underline underline-offset-4 decoration-1 hover:decoration-2">Do I need a lawyer at a voluntary interview? →</a></li>
          </ul>
        </div>`
}

/** Card for police-station representation. It is a top-level page, not a
 *  PracticeArea, but appears in the practice-area grids — and as a primary
 *  conversion (KPI) page it sits second, right after Criminal Defence. */
function policeStationCardHtml(headingTag: 'h2' | 'h3'): string {
  return `<li><a href="/police-station-representation" class="block bg-offwhite border border-grey-300 rounded p-6 md:p-8 h-full hover:bg-white transition-colors group">
        <span class="block text-xs font-semibold tracking-[0.12em] uppercase text-emergency-600 mb-3">24 hours</span>
        <${headingTag} class="text-xl font-semibold tracking-tight2">Police Station Representation</${headingTag}>
        <p class="mt-2 text-base text-navy-700 leading-relaxed">Attendance at the station, before the interview begins.</p>
        <span class="mt-4 inline-flex items-center gap-2 text-base font-medium text-navy-950">
          <span class="underline underline-offset-4 decoration-1 group-hover:decoration-2">Learn more</span>
          <span aria-hidden="true" class="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:transform-none">→</span>
        </span>
      </a></li>`
}

/** Practice-areas index page with the grid populated from data, plus the
 *  police-station card inserted second. */
export function renderPracticeAreaIndex(): string {
  const html = readSection('practice-areas')
  const cards = practiceAreas.map((a) => cardHtml(a, 'h2'))
  cards.splice(1, 0, policeStationCardHtml('h2'))
  return html.replace('<!-- Populated by JS from PRACTICE_AREAS -->', cards.join(''))
}

/** Get-in-touch CTA banner. Placed just below the intro when the page has no
 *  context callout, or directly above the FAQ when it does — so the two grey
 *  boxes never sit adjacent at the top (user, 2026-06-09). Copy is the
 *  user-authored banner copy. */
function getInTouchBannerHtml(): string {
  return `<div class="bg-offwhite border border-grey-300 rounded p-6 md:p-8">
                <p class="text-xl font-semibold tracking-tightish text-navy-950">Get in touch</p>
                <p class="mt-3 text-navy-700 leading-relaxed">Book a consultation or call for legal support today</p>
                <div class="cta-actions">
                  <a href="https://cal.com/astonslaw/callback?overlayCalendar=true" aria-label="Book a consultation with Astons Law Chambers" data-track="book_click" data-track-location="practice_area_get_in_touch" class="btn btn-lg btn-primary flex">
                    Book a consultation
                  </a>
                  <div class="md:hidden">
                    <a href="tel:+447922247999" aria-label="Call Astons Law Chambers on 07922 247 999" data-track="call_click" data-track-location="practice_area_get_in_touch" class="btn btn-lg btn-secondary flex">
                      <svg class="ico" aria-hidden="true"><use href="#i-phone"/></svg>
                      Call now
                    </a>
                  </div>
                  <a href="https://wa.me/447922247999?text=I%20need%20legal%20support%20for..." aria-label="Send a message on WhatsApp" data-track="whatsapp_click" data-track-location="practice_area_get_in_touch" class="btn btn-lg btn-secondary flex">
                    <svg class="ico" aria-hidden="true"><use href="#i-whatsapp"/></svg>
                    Send a message
                  </a>
                </div>
              </div>`
}

/** Internal: builds the detail page HTML from the pa-detail template.
 *  Accepts an optional parentInfo for sub-pages that need a 4-level breadcrumb. */
function buildDetailHtml(
  area: PracticeArea,
  parentInfo?: { slug: string; title: string },
): string {
  let html = readSection('pa-detail')

  const setVal = (name: string, value: string) => {
    html = html.replace(
      new RegExp(`(data-bind="${name}"\\s*>)\\s*—\\s*(<)`, 'g'),
      `$1${esc(value)}$2`,
    )
  }

  setVal('title', area.title)
  setVal('kicker', area.kicker)
  setVal('definition', area.definition)
  setVal('situation', area.situation)

  // Consequence callout: conditional — collapses to '' when the area has no
  // context, so context-less pages show nothing rather than literal "—" binds.
  html = html.replace('<!-- data-bind="context-callout" -->', contextCalloutHtml(area))

  // S4 — "how a case proceeds". Prose when `processProse` is set (Option B,
  // 2026-06-06); otherwise the legacy numbered list, so un-migrated pages still
  // render during the page-by-page rewrite.
  setVal('process-heading', area.processHeading ?? 'How a case proceeds')
  const processBody = area.processProse
    ? area.processProse.map((p) => `<p>${esc(p)}</p>`).join('')
    : `<ol class="space-y-3 list-decimal pl-5">${area.process
        .map((s) => `<li>${esc(s)}</li>`)
        .join('')}</ol>`
  html = html.replace('data-bind="process-body"></div>', `data-bind="process-body">${processBody}</div>`)

  // S5 — how the defence is built. Prose when `actionsProse` is set; otherwise
  // the legacy bullet list.
  setVal('actions-heading', area.actionsHeading ?? 'How the defence is built')
  const actionsBody = area.actionsProse
    ? area.actionsProse.map((p) => `<p>${esc(p)}</p>`).join('')
    : `<ul class="space-y-2">${area.actions
        .map(
          (s) =>
            `<li class="pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-grey-300">${esc(s)}</li>`,
        )
        .join('')}</ul>`
  html = html.replace('data-bind="actions-body"></div>', `data-bind="actions-body">${actionsBody}</div>`)

  // FAQ items — no chevron (not collapsible), user 2026-06-09.
  const faqs = area.faqs
    .map(
      (f) => `
        <div class="border-t border-grey-300 pt-4">
          <dt class="font-semibold tracking-tightish">${esc(f.q)}</dt>
          <dd class="mt-2 text-navy-700 leading-relaxed">${esc(f.a)}</dd>
        </div>`,
    )
    .join('')
  html = html.replace('data-bind="faqs"></dl>', `data-bind="faqs">${faqs}</dl>`)

  // Sub-offence grid: only on a top-level parent page (no parentInfo) that has
  // sub-pages. On sub-pages and childless areas the placeholder collapses to ''.
  const subGrid = parentInfo ? '' : subPageGridHtml(area.slug)
  html = html.replace('<!-- data-bind="subpages" -->', subGrid)

  // Get-in-touch banner placement: above the FAQ when a context callout is
  // present (avoids two adjacent grey boxes), otherwise in the top slot.
  const banner = getInTouchBannerHtml()
  html = html.replace('<!-- data-bind="cta-top" -->', area.context ? '' : banner)
  html = html.replace('<!-- data-bind="cta-above-faq" -->', area.context ? banner : '')

  // Right sticky aside: CTA box (red police box on custody pages, else blue
  // Astons box) + related areas + guides (conditional). Each block returns ''
  // when it should not appear.
  const aside = [
    asideCtaBoxHtml(area.slug),
    asideRelatedHtml(area, parentInfo),
    asideGuidesHtml(area.slug),
  ]
    .filter(Boolean)
    .join('')
  html = html.replace('<!-- data-bind="aside" -->', aside)

  return html
}

/** Practice-area detail page for a given area. */
export function renderPracticeAreaDetail(area: PracticeArea): string {
  return buildDetailHtml(area)
}

/** Sub-practice-area detail page — same template, 4-level breadcrumb. */
export function renderSubPracticeAreaDetail(
  area: SubPracticeArea,
  parentTitle: string,
): string {
  return buildDetailHtml(area, { slug: area.parentSlug, title: parentTitle })
}

/** FAQPage + BreadcrumbList + Service JSON-LD for a practice-area detail
 *  page. The Service node is the T1.4 add (safety-aware-implementation-
 *  plan.md, 2026-05-21).
 *
 *  Safety control: `provider` deliberately references `#organization`,
 *  NOT `#principal`. This keeps individual-attached service data off the
 *  knowledge graph, so an AI assistant composes "Astons Law Chambers
 *  offers X" rather than "Ghulam Humayun personally offers X at Y price".
 *  No `serviceOutput.employee`, no `provider.employee`, no Person link
 *  of any kind on Service nodes. */
export function practiceAreaJsonLd(area: PracticeArea): string {
  const pageUrl = `https://astonslaw.com/practice-areas/${area.slug}`
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
        item: pageUrl,
      },
    ],
  }
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: area.title,
    description: area.cardSummary,
    serviceType: serviceTypeFor(area.slug),
    provider: { '@id': 'https://astonslaw.com/#organization' },
    areaServed: ['London', 'England', 'Wales'],
    audience: {
      '@type': 'Audience',
      audienceType: audienceTypeFor(area.slug),
    },
  }
  return JSON.stringify([faq, crumbs, service])
}

/** FAQPage + BreadcrumbList (4-level) + Service JSON-LD for sub-practice-area
 *  detail pages. Same safety controls as practiceAreaJsonLd. */
export function subPracticeAreaJsonLd(
  area: SubPracticeArea,
  parentTitle: string,
): string {
  const pageUrl = `https://astonslaw.com/practice-areas/${area.parentSlug}/${area.slug}`
  const parentUrl = `https://astonslaw.com/practice-areas/${area.parentSlug}`
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
      { '@type': 'ListItem', position: 3, name: parentTitle, item: parentUrl },
      { '@type': 'ListItem', position: 4, name: area.title, item: pageUrl },
    ],
  }
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: area.title,
    description: area.cardSummary,
    serviceType: serviceTypeFor(area.slug),
    provider: { '@id': 'https://astonslaw.com/#organization' },
    areaServed: ['London', 'England', 'Wales'],
    audience: {
      '@type': 'Audience',
      audienceType: 'Defendants in criminal proceedings, England and Wales',
    },
  }
  return JSON.stringify([faq, crumbs, service])
}

/** serviceType is a short human-readable label for the legal service the
 *  page describes. Covers top-level PAs and sub-pages; defaults catch-all. */
function serviceTypeFor(slug: string): string {
  const types: Record<string, string> = {
    'criminal-defence': 'Criminal defence barrister (direct access), London',
    'violent-crimes': 'Criminal defence barrister for violent crime allegations, London',
    'youth-crimes': 'Criminal defence barrister for clients under 18, Youth Court, London',
    'driving-offences': 'Criminal defence barrister for driving offences, London',
    'drug-offences': 'Criminal defence barrister for drug offences, London',
    'appeals': 'Criminal appeals barrister, Crown Court and Court of Appeal, London',
    'inquests': "Inquest representation by a barrister, Coroner's Court, London",
    'fraud': 'Criminal defence barrister for fraud and financial crime, London',
    'sexual-offences': 'Criminal defence barrister for sexual offence allegations, London',
    'drink-driving': 'Criminal defence barrister for drink driving charges, London',
    'drug-driving': 'Criminal defence barrister for drug driving charges, London',
    'totting-up': 'Criminal defence barrister for totting-up disqualification, London',
    'gbh': 'Criminal defence barrister for GBH charges, London',
    'knife-crime': 'Criminal defence barrister for knife and bladed article offences, London',
    'domestic-abuse': 'Criminal defence barrister for domestic abuse allegations, London',
    'robbery': 'Criminal defence barrister for robbery charges, London',
    'possession-with-intent': 'Criminal defence barrister for possession with intent to supply, London',
    'drug-supply': 'Criminal defence barrister for drug supply charges, London',
    'county-lines': 'Criminal defence barrister for county lines charges, London',
  }
  return types[slug] ?? 'Criminal defence barrister (direct access), London'
}

/** Inquests serve families and interested persons, not defendants; the
 *  other PAs serve defendants. Audience phrasing reflects that. */
function audienceTypeFor(slug: string): string {
  if (slug === 'inquests') {
    return 'Families and interested persons in coronial proceedings, England and Wales'
  }
  return 'Defendants in criminal proceedings, England and Wales'
}
