// Shared client analytics — mirrors SiteBehaviour click tracking so form
// funnel events use the same GA4 + Vercel Analytics taxonomy.
// Safe no-ops when gtag / Analytics are unavailable. Never send PII.

import { track as vaTrack } from '@vercel/analytics'
import { getCtaType, getPageType } from '@/lib/analytics'
import { getJourneyAttribution } from '@/lib/journey'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

type TrackProps = Record<string, string | number | boolean | undefined>

export function trackEvent(
  name: string,
  props: TrackProps = {},
): void {
  if (typeof window === 'undefined') return

  const placement =
    typeof props.placement === 'string' ? props.placement : 'hero_lead_form'
  const pagePath = window.location.pathname
  const pageType = getPageType(pagePath)

  const gaParams: Record<string, unknown> = {
    cta_type: getCtaType(name),
    placement,
    page_type: pageType,
    page_path: pagePath,
    event_category: 'engagement',
    event_label: placement,
    location: placement,
    ...props,
  }

  if (typeof window.gtag === 'function') {
    try {
      window.gtag('event', name, gaParams)
    } catch {
      /* no-op */
    }
  }

  const attr = getJourneyAttribution()
  const vaProps: Record<string, string | number> = {
    cta_type: getCtaType(name),
    placement,
    page_type: pageType,
    page_path: pagePath,
    funnel: attr.funnel,
    entry_page: attr.entry,
    journey: attr.journey,
    steps: attr.steps,
  }
  for (const [key, value] of Object.entries(props)) {
    if (typeof value === 'string' || typeof value === 'number') {
      vaProps[key] = value
    } else if (typeof value === 'boolean') {
      vaProps[key] = value ? 1 : 0
    }
  }

  try {
    vaTrack(name, vaProps)
  } catch {
    /* no-op */
  }
}
