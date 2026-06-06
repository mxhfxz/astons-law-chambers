// Session funnel attribution for Vercel Analytics.
//
// We record the visitor's page-type journey in sessionStorage as they move
// through the site, then attach a compact summary to every conversion event
// (call / WhatsApp / book / booking_completed / guide / download). This is
// what lets the Vercel dashboard answer "which funnel did this person follow
// before they contacted us?".
//
// Client-only: every entry point is guarded with `typeof window` and wrapped
// in try/catch so a blocked/absent sessionStorage can never throw or break a
// page. Nothing here runs on the server.

import { getFunnel, getPageType } from '@/lib/analytics'

const STORAGE_KEY = 'alc_journey'
// Cap the stored path so the `journey` property stays a bounded, readable
// string in the dashboard rather than an unbounded breadcrumb.
const MAX_STEPS = 8

interface JourneyState {
  /** page_type of the first page in this session (the landing page). */
  entry: string
  /** First practice-area topic the visitor engaged, sticky for the session;
   *  falls back to the entry page_type when no topic page was seen. */
  funnel: string
  /** Ordered page_type sequence, consecutive-deduped, capped to MAX_STEPS. */
  path: string[]
}

/** Attribution attached to a conversion event. All values are dashboard-safe. */
export interface JourneyAttribution {
  /** Landing page_type for the session. */
  entry: string
  /** The funnel the visitor followed (topic slug or page_type). */
  funnel: string
  /** Human-readable path, e.g. "home > practice_area_detail > fees". */
  journey: string
  /** Number of distinct page-types seen before converting. */
  steps: number
}

function read(): JourneyState | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as JourneyState) : null
  } catch {
    return null
  }
}

function write(state: JourneyState): void {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    /* sessionStorage unavailable (private mode / blocked) — tracking degrades
       gracefully; the page is unaffected. */
  }
}

/** Record a page view in the session journey. Safe to call on every route
 *  change, including the first load (which captures the landing page). */
export function recordPageView(pathname: string): void {
  if (typeof window === 'undefined') return
  const pageType = getPageType(pathname)
  const onTopicPage = pathname.includes('/practice-areas/')

  let state = read()
  if (!state) {
    state = {
      entry: pageType,
      funnel: onTopicPage ? getFunnel(pathname) : pageType,
      path: [],
    }
  } else if (state.funnel === state.entry && onTopicPage) {
    // First practice-area topic encountered upgrades the generic funnel and
    // then sticks for the rest of the session.
    state.funnel = getFunnel(pathname)
  }

  // Append page_type, skipping consecutive duplicates, capped to MAX_STEPS.
  if (state.path[state.path.length - 1] !== pageType) {
    state.path.push(pageType)
    if (state.path.length > MAX_STEPS) state.path = state.path.slice(-MAX_STEPS)
  }

  write(state)
}

/** Read the current session's funnel attribution for a conversion event. */
export function getJourneyAttribution(): JourneyAttribution {
  if (typeof window === 'undefined') {
    return { entry: 'direct', funnel: 'direct', journey: '', steps: 0 }
  }
  const state = read()
  if (!state) return { entry: 'direct', funnel: 'direct', journey: '', steps: 0 }
  return {
    entry: state.entry,
    funnel: state.funnel,
    journey: state.path.join(' > '),
    steps: state.path.length,
  }
}
