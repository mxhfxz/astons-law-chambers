// Analytics helpers — small, pure, no side effects. Used by
// components/site/SiteBehaviour.tsx to enrich GA4 event payloads so reports
// can slice the funnel by page type and CTA type, not just URL paths.
//
// Taxonomy and rationale live in
// .project/conversion-tracking-2026-05-20/spec.md.

/** Maps a pathname to a stable `page_type` identifier for GA4 segmentation.
 *  Trailing slashes are tolerated (next.config sets trailingSlash: true). */
export function getPageType(pathname: string): string {
  // Strip trailing slash for matching, but keep '/' for the homepage.
  const p = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname

  if (p === '/' || p === '') return 'home'
  if (p === '/police-station-representation') return 'police_station'
  if (p === '/practice-areas') return 'practice_areas_hub'
  if (p.startsWith('/practice-areas/')) return 'practice_area_detail'
  if (p === '/guides') return 'guides_hub'
  if (p.startsWith('/guides/')) return 'guide_article'
  if (p === '/fees') return 'fees'
  if (p === '/about') return 'about'
  if (p === '/contact') return 'contact'
  if (p === '/direct-access') return 'direct_access'
  if (p === '/complaints') return 'complaints'
  if (p === '/timescales') return 'timescales'
  if (p === '/privacy-policy') return 'privacy_policy'
  if (p === '/terms-of-engagement') return 'terms_of_engagement'
  return 'other'
}

/** Maps a GA4 event name to a higher-level `cta_type` for funnel grouping.
 *  e.g. `call_click` -> `call`. Returns 'other' for unrecognised names. */
export function getCtaType(eventName: string): string {
  switch (eventName) {
    case 'call_click':
      return 'call'
    case 'whatsapp_click':
      return 'whatsapp'
    case 'book_click':
    case 'booking_completed':
      return 'book'
    case 'guide_click':
      return 'guide'
    case 'download_click':
      return 'download'
    case 'quick_exit':
      return 'quick_exit'
    default:
      return 'other'
  }
}
