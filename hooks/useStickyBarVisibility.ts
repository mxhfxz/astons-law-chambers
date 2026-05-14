'use client'

import { useEffect, useState } from 'react'

const DESKTOP_BREAKPOINT_PX = 1280
const DEFAULT_SHOW_AFTER_PX = 600

/**
 * Phase 1 stub.
 * Per `10-mobile-layout-spec.md`: StickyBar renders null on viewports >= 1280px.
 * Per `11-ux-flows.md`: StickyBar is the primary CTA "from the moment the user
 * scrolls past Zone 1". This hook returns false until the user scrolls past
 * `showAfterPx`, then stays true. On desktop it always returns false.
 *
 * Phase 3 may revise the activation strategy (e.g., scroll-up/scroll-down
 * behaviour). The plan description "scroll-direction logic" is loose; the UX
 * spec is the authority and says always-visible-after-threshold on mobile.
 */
export function useStickyBarVisibility(
  showAfterPx: number = DEFAULT_SHOW_AFTER_PX,
): boolean {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window.innerWidth >= DESKTOP_BREAKPOINT_PX) {
      setVisible(false)
      return
    }

    const update = () => {
      const isDesktop = window.innerWidth >= DESKTOP_BREAKPOINT_PX
      if (isDesktop) {
        setVisible(false)
        return
      }
      setVisible(window.scrollY > showAfterPx)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [showAfterPx])

  return visible
}
