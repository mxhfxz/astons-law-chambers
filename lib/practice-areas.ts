export interface PracticeArea {
  slug: string
  title: string
  headline: string
  metaDescription: string
  zones: {
    situation: string[]
    actionSteps: string[]
    processSteps: string[]
    trustSignals: string[]
    faqs: Array<{ question: string; answer: string }>
  }
  legalAidAvailable: boolean | null
  bsbFeeDisclosureRequired: boolean
  relatedAreas: string[]
  priority: 'P0' | 'P1' | 'P2'
}

const EMPTY_ZONES: PracticeArea['zones'] = {
  situation: [],
  actionSteps: [],
  processSteps: [],
  trustSignals: [],
  faqs: [],
}

export const practiceAreas: PracticeArea[] = [
  {
    slug: 'criminal-defence',
    title: 'Criminal Defence',
    headline: '',
    metaDescription: '',
    zones: EMPTY_ZONES,
    legalAidAvailable: null,
    bsbFeeDisclosureRequired: false,
    relatedAreas: [],
    priority: 'P0',
  },
  {
    slug: 'motoring-law',
    title: 'Motoring Law',
    headline: '',
    metaDescription: '',
    zones: EMPTY_ZONES,
    legalAidAvailable: null,
    bsbFeeDisclosureRequired: true,
    relatedAreas: [],
    priority: 'P0',
  },
  {
    slug: 'immigration',
    title: 'Immigration',
    headline: '',
    metaDescription: '',
    zones: EMPTY_ZONES,
    legalAidAvailable: null,
    bsbFeeDisclosureRequired: true,
    relatedAreas: [],
    priority: 'P0',
  },
  {
    slug: 'family-law',
    title: 'Family Law',
    headline: '',
    metaDescription: '',
    zones: EMPTY_ZONES,
    legalAidAvailable: null,
    bsbFeeDisclosureRequired: false,
    relatedAreas: [],
    priority: 'P1',
  },
  {
    slug: 'proceeds-of-crime',
    title: 'Proceeds of Crime',
    headline: '',
    metaDescription: '',
    zones: EMPTY_ZONES,
    legalAidAvailable: null,
    bsbFeeDisclosureRequired: false,
    relatedAreas: [],
    priority: 'P1',
  },
  {
    slug: 'licensing',
    title: 'Licensing',
    headline: '',
    metaDescription: '',
    zones: EMPTY_ZONES,
    legalAidAvailable: null,
    bsbFeeDisclosureRequired: true,
    relatedAreas: [],
    priority: 'P1',
  },
  {
    slug: 'regulatory-law',
    title: 'Regulatory Law',
    headline: '',
    metaDescription: '',
    zones: EMPTY_ZONES,
    legalAidAvailable: null,
    bsbFeeDisclosureRequired: false,
    relatedAreas: [],
    priority: 'P2',
  },
  {
    slug: 'extradition',
    title: 'Extradition',
    headline: '',
    metaDescription: '',
    zones: EMPTY_ZONES,
    legalAidAvailable: null,
    bsbFeeDisclosureRequired: false,
    relatedAreas: [],
    priority: 'P2',
  },
  {
    slug: 'inquests',
    title: 'Inquests',
    headline: '',
    metaDescription: '',
    zones: EMPTY_ZONES,
    legalAidAvailable: null,
    bsbFeeDisclosureRequired: false,
    relatedAreas: [],
    priority: 'P2',
  },
  {
    slug: 'civil-litigation',
    title: 'Civil Litigation',
    headline: '',
    metaDescription: '',
    zones: EMPTY_ZONES,
    legalAidAvailable: null,
    bsbFeeDisclosureRequired: false,
    relatedAreas: [],
    priority: 'P2',
  },
]

export function getPracticeAreaBySlug(slug: string): PracticeArea {
  const area = practiceAreas.find((a) => a.slug === slug)
  if (!area) throw new Error(`Practice area not found: ${slug}`)
  return area
}
