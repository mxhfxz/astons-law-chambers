/**
 * Charm bar ticker slides — titles/hrefs are existing site strings only (copy read-only).
 * CRO default = arrest / interview / custody urgency. Per-route sets prefer related pages;
 * empty/weak contexts fall back to CRO default.
 */

export type CharmSlide = { href: string; title: string }

/** CRO-first default (home + fallback). */
export const homeCharmSlides: readonly CharmSlide[] = [
  {
    href: '/guides/first-24-hours-after-arrest',
    title: 'What to do in the first 24 hours after being arrested in the UK',
  },
  {
    href: '/guides/do-i-need-a-lawyer-at-a-voluntary-police-interview',
    title: 'Do I need a lawyer at a voluntary police interview under caution?',
  },
  {
    href: '/insights/no-comment-police-interview',
    title: 'What "no comment" means in a police interview',
  },
  {
    href: '/insights/released-under-investigation-what-happens-next',
    title: 'Released Under Investigation: What Happens Next?',
  },
] as const

/** Existing site CTA label (home defence cards). */
export const homeCharmCtaLabel = 'Learn more' as const

/** Existing page H1s used as ticker titles where relevant. */
const SITE = {
  policeStation: {
    href: '/police-station-representation',
    title: 'Representation at the station, before the interview begins.',
  },
  fees: { href: '/fees', title: 'Fees and legal aid' },
  legalAid: { href: '/legal-aid', title: 'Legal Aid for Criminal Cases' },
  directAccess: { href: '/direct-access', title: 'Direct Access' },
  authorised: {
    href: '/authorised-to-conduct-litigation',
    title: 'Authorised to Conduct Litigation',
  },
  practiceAreas: { href: '/practice-areas', title: 'Criminal defence' },
  guides: {
    href: '/guides',
    title: 'Plain-English guides for the moments that matter most',
  },
  firstHearing: {
    href: '/insights/first-hearing-magistrates-court',
    title: "What happens at a first hearing in the Magistrates' Court",
  },
} as const

const GUIDE_SLIDES: Record<string, CharmSlide> = {
  'first-24-hours-after-arrest': homeCharmSlides[0],
  'do-i-need-a-lawyer-at-a-voluntary-police-interview': homeCharmSlides[1],
}

const INSIGHT_SLIDES: Record<string, CharmSlide> = {
  'no-comment-police-interview': homeCharmSlides[2],
  'released-under-investigation-what-happens-next': homeCharmSlides[3],
  'first-hearing-magistrates-court': SITE.firstHearing,
}

/** PA slug → related existing slides (custody-heavy areas lean CRO + police). */
const PA_RELATED: Record<string, CharmSlide[]> = {
  'criminal-defence': [
    SITE.policeStation,
    homeCharmSlides[0],
    homeCharmSlides[1],
    SITE.firstHearing,
  ],
  'violent-crimes': [
    SITE.policeStation,
    homeCharmSlides[0],
    homeCharmSlides[2],
    homeCharmSlides[3],
  ],
  'youth-crimes': [
    SITE.policeStation,
    homeCharmSlides[0],
    homeCharmSlides[1],
    homeCharmSlides[3],
  ],
  'driving-offences': [
    SITE.policeStation,
    homeCharmSlides[0],
    homeCharmSlides[1],
    SITE.fees,
  ],
  'drug-offences': [
    SITE.policeStation,
    homeCharmSlides[0],
    homeCharmSlides[2],
    homeCharmSlides[3],
  ],
  fraud: [
    homeCharmSlides[1],
    homeCharmSlides[2],
    SITE.firstHearing,
    SITE.fees,
  ],
  'sexual-offences': [
    SITE.policeStation,
    homeCharmSlides[0],
    homeCharmSlides[1],
    homeCharmSlides[2],
  ],
  inquests: [SITE.practiceAreas, SITE.fees, SITE.directAccess, homeCharmSlides[0]],
}

function dedupeExclude(
  slides: CharmSlide[],
  excludeHref?: string,
  limit = 4
): CharmSlide[] {
  const seen = new Set<string>()
  const out: CharmSlide[] = []
  for (const slide of slides) {
    if (excludeHref && slide.href === excludeHref) continue
    if (seen.has(slide.href)) continue
    seen.add(slide.href)
    out.push(slide)
    if (out.length >= limit) break
  }
  return out
}

function withCroFill(preferred: CharmSlide[], excludeHref?: string): CharmSlide[] {
  return dedupeExclude([...preferred, ...homeCharmSlides], excludeHref)
}

/**
 * Resolve ticker slides for a pathname. Always returns 2–4 slides.
 * Unknown / utility routes → CRO default.
 */
export function getCharmSlidesForPath(pathname: string): CharmSlide[] {
  const path = pathname.replace(/\/$/, '') || '/'

  if (path === '/') return [...homeCharmSlides]

  if (path === '/police-station-representation') {
    return withCroFill([SITE.policeStation], path)
  }

  const guideMatch = path.match(/^\/guides\/([^/]+)$/)
  if (guideMatch) {
    const slug = guideMatch[1]
    const self = GUIDE_SLIDES[slug]
    const preferred = [
      ...Object.values(GUIDE_SLIDES),
      ...Object.values(INSIGHT_SLIDES),
      SITE.policeStation,
    ]
    return withCroFill(preferred, self?.href ?? path)
  }

  if (path === '/guides') {
    return withCroFill([
      homeCharmSlides[0],
      homeCharmSlides[1],
      SITE.policeStation,
      SITE.practiceAreas,
    ])
  }

  const insightMatch = path.match(/^\/insights\/([^/]+)$/)
  if (insightMatch) {
    const slug = insightMatch[1]
    const self = INSIGHT_SLIDES[slug]
    const preferred = [
      ...Object.values(INSIGHT_SLIDES),
      ...Object.values(GUIDE_SLIDES),
      SITE.policeStation,
    ]
    return withCroFill(preferred, self?.href ?? path)
  }

  if (path === '/insights') {
    return withCroFill([
      SITE.firstHearing,
      homeCharmSlides[2],
      homeCharmSlides[3],
      homeCharmSlides[0],
    ])
  }

  const paSubMatch = path.match(/^\/practice-areas\/([^/]+)\/([^/]+)$/)
  if (paSubMatch) {
    const parent = paSubMatch[1]
    return withCroFill(PA_RELATED[parent] ?? [...homeCharmSlides], path)
  }

  const paMatch = path.match(/^\/practice-areas\/([^/]+)$/)
  if (paMatch) {
    const slug = paMatch[1]
    return withCroFill(PA_RELATED[slug] ?? [...homeCharmSlides], path)
  }

  if (path === '/practice-areas') {
    return withCroFill([
      SITE.policeStation,
      homeCharmSlides[0],
      homeCharmSlides[1],
      SITE.firstHearing,
    ])
  }

  if (
    path === '/fees' ||
    path === '/legal-aid' ||
    path === '/legal-aid/eligibility'
  ) {
    return withCroFill([SITE.fees, SITE.legalAid, SITE.directAccess, homeCharmSlides[0]], path)
  }

  if (path === '/direct-access' || path === '/authorised-to-conduct-litigation') {
    return withCroFill(
      [SITE.directAccess, SITE.authorised, SITE.fees, homeCharmSlides[0]],
      path
    )
  }

  /* about, contact, complaints, privacy, terms, timescales, 404, etc. */
  return [...homeCharmSlides]
}
