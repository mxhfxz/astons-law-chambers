'use client'

// Client-side behaviour for the ported site. This is the prototype's
// foot-of-body script (preview/index.html) minus the hash router — Next.js
// App Router handles routing now. Listeners on persistent chrome are wired
// once; per-route work (GA page_view, cal facade) re-runs on
// pathname change.
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    Cal?: { ns?: Record<string, (action: string, cfg: unknown) => void> }
  }
}

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
      const onTriggerClick = (e: Event) => {
        e.preventDefault()
        setMega(mega.dataset.open !== 'true')
      }
      const open = () => setMega(true)
      trigger.addEventListener('click', onTriggerClick)
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
        trigger.removeEventListener('click', onTriggerClick)
        document.removeEventListener('keydown', onKey)
        document.removeEventListener('click', onDocClick)
      })
    }

    // --- Mobile menu ------------------------------------------------------
    const mobileToggle = document.getElementById('mobileMenuToggle')
    const mobileMenu = document.getElementById('mobileMenu')
    const onMobileToggle = () => {
      if (!mobileMenu || !mobileToggle) return
      const isOpen = !mobileMenu.classList.contains('hidden')
      mobileMenu.classList.toggle('hidden')
      mobileToggle.setAttribute('aria-expanded', String(!isOpen))
    }
    mobileToggle?.addEventListener('click', onMobileToggle)

    // --- Police banner — show on scroll up, hide on scroll down -----------
    const banner = document.getElementById('policeBanner')
    let lastY = window.scrollY
    let ticking = false
    const DELTA = 6
    const onScrollFrame = () => {
      const y = Math.max(0, window.scrollY)
      const d = y - lastY
      if (y <= 4) banner?.classList.add('is-visible')
      else if (d > DELTA) banner?.classList.remove('is-visible')
      else if (d < -DELTA) banner?.classList.add('is-visible')
      lastY = y
      ticking = false
    }
    banner?.classList.add('is-visible')
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(onScrollFrame)
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // --- Quick exit -------------------------------------------------------
    const leaveSite = () => {
      try {
        window.location.replace('https://www.bbc.co.uk/weather')
      } catch {
        window.location.href = 'https://www.bbc.co.uk/weather'
      }
    }
    const quickExits = document.querySelectorAll<HTMLElement>('[data-leave-site]')
    quickExits.forEach((el) => el.addEventListener('click', leaveSite))

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
      let name = target.dataset.track
      if (!name) {
        const href = target.getAttribute('href') || ''
        if (href.startsWith('tel:')) name = 'call_click'
        else if (href.startsWith('https://wa.me/')) name = 'whatsapp_click'
        else if (href.includes('cal.com/astonslaw')) name = 'book_click'
      }
      if (!name) return
      let loc = target.dataset.trackLocation
      if (!loc) {
        const wrap = target.closest('[data-track-loc]') as HTMLElement | null
        loc = wrap?.dataset.trackLoc || 'unspecified'
      }
      track(name, {
        event_category: 'engagement',
        event_label: loc,
        location: loc,
        page_path: window.location.pathname,
      })
    }
    document.addEventListener('click', onClickCapture, { capture: true })
    trigger?.addEventListener('click', () => track('mega_menu_open', { event_label: 'services' }))
    mobileToggle?.addEventListener('click', () =>
      track('mobile_menu_toggle', { event_label: 'primary_nav' }),
    )

    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('click', onClickCapture, { capture: true } as EventListenerOptions)
      mobileToggle?.removeEventListener('click', onMobileToggle)
      quickExits.forEach((el) => el.removeEventListener('click', leaveSite))
      cleanups.forEach((fn) => fn())
    }
  }, [])

  // Per-route: GA page_view, cal.com facade, close mobile menu.
  useEffect(() => {
    const mm = document.getElementById('mobileMenu')
    mm?.classList.add('hidden')

    if (firstRoute.current) {
      firstRoute.current = false
    } else if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: pathname,
        page_location: window.location.href,
        page_title: document.title,
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
            config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true', theme: 'light' },
            calLink: 'astonslaw/callback',
          })
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
