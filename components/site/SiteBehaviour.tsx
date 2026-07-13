'use client'

// Client-side behaviour for the ported site. This is the prototype's
// foot-of-body script (preview/index.html) minus the hash router — Next.js
// App Router handles routing now. Listeners on persistent chrome are wired
// once; per-route work (GA page_view, cal facade) re-runs on
// pathname change.
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { track as vaTrack } from '@vercel/analytics'
import { getCtaType, getPageType } from '@/lib/analytics'
import { getJourneyAttribution, recordPageView } from '@/lib/journey'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    Cal?: { ns?: Record<string, (action: string, cfg: unknown) => void> }
  }
}

// Module-level: cal.com 'bookingSuccessful' listener is wired at most once
// per page-load, even if the user clicks "Book a call" and re-mounts the
// embed multiple times (e.g. after a route change back to /).
let bookingListenerWired = false

export function SiteBehaviour() {
  const pathname = usePathname()
  // The GA4 config call (layout.tsx) already sends the page_view for the
  // first load via send_page_view. Only client-side route changes need a
  // manual one — firing on mount as well would double-count every entry.
  const firstRoute = useRef(true)

  // One-time: chrome interactivity + delegated GA tracking.
  useEffect(() => {
    const yearEl = document.getElementById('footerYear')
    if (yearEl) yearEl.textContent = String(new Date().getFullYear())

    // --- Mega menu --------------------------------------------------------
    const trigger = document.getElementById('servicesTrigger')
    const mega = document.getElementById('servicesMega')
    const header = document.getElementById('siteHeader')
    let closeTimer: ReturnType<typeof setTimeout> | undefined
    const setMega = (open: boolean) => {
      if (!mega || !trigger) return
      clearTimeout(closeTimer)
      mega.dataset.open = String(open)
      trigger.setAttribute('aria-expanded', String(open))
    }
    const scheduleClose = () => {
      closeTimer = setTimeout(() => setMega(false), 300)
    }
    const cleanups: Array<() => void> = []
    if (trigger && mega && header) {
      // #servicesTrigger is a link to /practice-areas. Clicking navigates to
      // the hub; the mega menu is a hover/focus disclosure layered on top —
      // so there is no click handler here (it must not preventDefault).
      const open = () => setMega(true)
      trigger.addEventListener('mouseenter', open)
      trigger.addEventListener('focus', open)
      mega.addEventListener('mouseenter', open)
      mega.addEventListener('mouseleave', scheduleClose)
      header.addEventListener('mouseleave', scheduleClose)
      const siblings = document.querySelectorAll<HTMLElement>('nav[aria-label="Primary"] .nav-link')
      const closeNow = () => setMega(false)
      siblings.forEach((el) => {
        if (el === trigger) return
        el.addEventListener('mouseenter', closeNow)
        el.addEventListener('focus', closeNow)
      })
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMega(false)
      }
      const onDocClick = (e: MouseEvent) => {
        if (!header.contains(e.target as Node)) setMega(false)
      }
      document.addEventListener('keydown', onKey)
      document.addEventListener('click', onDocClick)
      cleanups.push(() => {
        document.removeEventListener('keydown', onKey)
        document.removeEventListener('click', onDocClick)
      })
    }

    // --- Mobile menu ------------------------------------------------------
    const mobileToggle = document.getElementById('mobileMenuToggle')
    const mobileMenu = document.getElementById('mobileMenu')
    const onMobileToggle = () => {
      if (!mobileMenu || !mobileToggle) return
      const willOpen = mobileMenu.classList.contains('hidden')
      mobileMenu.classList.toggle('hidden')
      mobileToggle.setAttribute('aria-expanded', String(willOpen))
      mobileToggle.setAttribute('aria-label', willOpen ? 'Close menu' : 'Open menu')
      // Lock page scroll behind the full-screen menu.
      document.body.classList.toggle('menu-open', willOpen)
    }
    mobileToggle?.addEventListener('click', onMobileToggle)
    const onMobileKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
        onMobileToggle()
      }
    }
    document.addEventListener('keydown', onMobileKey)

    // --- Police banner ----------------------------------------------------
    // The banner is pinned below the navbar and always visible — no scroll
    // show/hide. CSS keeps it in place; nothing to wire up here.

    // --- GA4 delegated click tracking -------------------------------------
    const track = (name: string, params: Record<string, unknown>) => {
      if (typeof window.gtag !== 'function') return
      try {
        window.gtag('event', name, params)
      } catch {
        /* no-op */
      }
    }
    const onClickCapture = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a, button') as HTMLElement | null
      if (!target) return
      const href = target.getAttribute('href') || ''
      let name = target.dataset.track
      if (!name) {
        if (href.startsWith('tel:')) name = 'call_click'
        else if (href.startsWith('https://wa.me/')) name = 'whatsapp_click'
        else if (href.includes('cal.com/astonslaw')) name = 'book_click'
      }
      if (!name) return
      let placement = target.dataset.trackLocation
      if (!placement) {
        const wrap = target.closest('[data-track-loc]') as HTMLElement | null
        placement = wrap?.dataset.trackLoc || 'unspecified'
      }
      // Outbound destination — only for off-platform links so reports can
      // group by destination without polluting on-site clicks.
      const isOutbound =
        href.startsWith('tel:') ||
        href.startsWith('https://wa.me/') ||
        href.includes('cal.com')
      const params: Record<string, unknown> = {
        // GA4-native funnel dimensions (the useful ones).
        cta_type: getCtaType(name),
        placement,
        page_type: getPageType(window.location.pathname),
        page_path: window.location.pathname,
        // Legacy UA-style fields kept for back-compat with anything built on
        // event_label / location. GA4 ignores them in the standard UI; they
        // cost nothing and avoid breaking older custom reports.
        event_category: 'engagement',
        event_label: placement,
        location: placement,
      }
      if (isOutbound) params.outbound_url = href
      track(name, params)

      // --- Vercel Analytics custom event ---------------------------------
      // Same event name + cta_type + placement as GA4 (one taxonomy), plus
      // session funnel attribution so the Vercel dashboard shows which path
      // the visitor followed before contacting. Property values are
      // string|number only (Vercel requirement). vaTrack no-ops safely when
      // Analytics isn't mounted and console-logs in development.
      const attr = getJourneyAttribution()
      vaTrack(name, {
        cta_type: getCtaType(name),
        placement,
        page_type: getPageType(window.location.pathname),
        page_path: window.location.pathname,
        funnel: attr.funnel,
        entry_page: attr.entry,
        journey: attr.journey,
        steps: attr.steps,
      })
    }
    document.addEventListener('click', onClickCapture, { capture: true })
    mobileToggle?.addEventListener('click', () =>
      track('mobile_menu_toggle', { event_label: 'primary_nav' }),
    )

    // --- Cal.com element-click popup --------------------------------------
    // "Book" buttons carry data-cal-link / data-cal-namespace / data-cal-config
    // and open the calendar as a modal instead of redirecting to cal.com.
    // Those data-cal-config attributes are the THIRD cal.com config location
    // (after app/layout.tsx and the inline mount below) — they pin the popup
    // to month_view, knowingly overriding the T1.6 column_view default per the
    // user's 2026-07-13 decision. Any cal.com config change must consider all
    // three locations.
    // cal.com's own auto-wiring scans [data-cal-link] once at embed load, so it
    // misses buttons rendered after a client-side route change and did not
    // intercept reliably here. This delegated listener opens the modal via the
    // initialised namespace instead, surviving SPA navigation. If the embed
    // isn't ready we don't preventDefault, so the anchor's href (the cal.com
    // booking page) still works as a no-JS fallback. The capture-phase tracker
    // above has already fired book_click by the time this runs.
    const onCalTrigger = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest('[data-cal-link]') as HTMLElement | null
      if (!el) return
      const ns = el.dataset.calNamespace
      const api = ns ? window.Cal?.ns?.[ns] : undefined
      if (typeof api !== 'function') return
      let config: unknown = {}
      const raw = el.dataset.calConfig
      if (raw) {
        try {
          config = JSON.parse(raw)
        } catch {
          /* malformed config — fall back to embed defaults */
        }
      }
      e.preventDefault()
      api('modal', { calLink: el.dataset.calLink, config })
    }
    document.addEventListener('click', onCalTrigger)

    return () => {
      document.removeEventListener('click', onClickCapture, { capture: true } as EventListenerOptions)
      document.removeEventListener('click', onCalTrigger)
      document.removeEventListener('keydown', onMobileKey)
      mobileToggle?.removeEventListener('click', onMobileToggle)
      cleanups.forEach((fn) => fn())
    }
  }, [])

  // Per-route: GA page_view, cal.com facade, close mobile menu.
  useEffect(() => {
    // Record the page in the session journey first — on the first mount this
    // captures the landing page, on later runs each subsequent step. Powers
    // the funnel attribution attached to Vercel conversion events.
    recordPageView(pathname)

    const mm = document.getElementById('mobileMenu')
    mm?.classList.add('hidden')
    // Reset the open-menu state so scroll isn't left locked and the
    // hamburger morphs back after a client-side navigation.
    document.body.classList.remove('menu-open')
    const mt = document.getElementById('mobileMenuToggle')
    mt?.setAttribute('aria-expanded', 'false')
    mt?.setAttribute('aria-label', 'Open menu')

    if (firstRoute.current) {
      firstRoute.current = false
    } else if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: pathname,
        page_location: window.location.href,
        page_title: document.title,
        page_type: getPageType(pathname),
      })
    }

    // Cal.com facade — mount the inline embed only when the user asks for it.
    const loadBtn = document.getElementById('cal-load-btn')
    if (!loadBtn) return
    const onLoad = () => {
      const facade = document.getElementById('cal-facade')
      const host = document.getElementById('cal-callback-inline')
      if (host) host.hidden = false
      facade?.remove()
      let tries = 0
      const mount = () => {
        const h = document.getElementById('cal-callback-inline')
        if (!h || h.offsetParent === null) return false
        const cal = window.Cal
        if (!cal?.ns?.callback) return false
        try {
          cal.ns.callback('inline', {
            elementOrSelector: '#cal-callback-inline',
            // layout: "column_view" — cro-2026 BE1 / T1.6 default-selected-
            // slot move (2026-05-21). Column view surfaces the next available
            // slot at the top of the chronological list instead of requiring
            // the visitor to click a date on a month grid first; cuts the
            // unspent decision per cro-2026 default-architecture analysis.
            // Look-ahead window is unchanged — that is the cal.com dashboard
            // "Future bookings limit" setting, not a layout option.
            //
            // SCOPE (2026-07-13): column_view now governs THIS homepage inline
            // embed only. The popup booking CTAs (insights + practice areas)
            // pass layout: "month_view" via their own data-cal-config — user
            // decision 2026-07-13, taken knowingly against the T1.6 default.
            // The two surfaces are intentionally different; do not "fix" one
            // to match the other without checking with the user.
            config: { layout: 'column_view', useSlotsViewOnSmallScreen: 'true', theme: 'light' },
            calLink: 'astonslaw/callback',
          })
          // Wire the booking_completed listener once per page-load. Without
          // this we only count book intent (book_click), never the closure.
          if (!bookingListenerWired) {
            try {
              cal.ns.callback('on', {
                action: 'bookingSuccessful',
                callback: () => {
                  // Vercel Analytics — the actual booking closure, with the
                  // same funnel attribution as the click events.
                  const attr = getJourneyAttribution()
                  vaTrack('booking_completed', {
                    cta_type: 'book',
                    placement: 'cal_inline',
                    page_type: getPageType(window.location.pathname),
                    page_path: window.location.pathname,
                    funnel: attr.funnel,
                    entry_page: attr.entry,
                    journey: attr.journey,
                    steps: attr.steps,
                  })
                  if (typeof window.gtag !== 'function') return
                  window.gtag('event', 'booking_completed', {
                    cta_type: 'book',
                    placement: 'cal_inline',
                    page_type: getPageType(window.location.pathname),
                    page_path: window.location.pathname,
                  })
                },
              })
              bookingListenerWired = true
            } catch {
              /* no-op — embed not ready for 'on' yet; retried by interval */
            }
          }
          return true
        } catch {
          return false
        }
      }
      if (mount()) return
      const timer = setInterval(() => {
        if (mount() || ++tries > 20) clearInterval(timer)
      }, 200)
    }
    loadBtn.addEventListener('click', onLoad)
    return () => loadBtn.removeEventListener('click', onLoad)
  }, [pathname])

  return null
}
