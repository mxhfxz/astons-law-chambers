'use client'

import { useEffect, useRef, useState } from 'react'
import { contact } from '@/lib/contact'
import { homeHero } from '@/lib/home-hero'
import { HeroUrgencyBanner } from '@/components/sections/HeroUrgencyBanner'

/**
 * Homepage Hero — media | light content panel (styleguide HomeHero).
 * Desktop: Book + WhatsApp square + Send a Message (HeroMessageDock modal).
 * Trust badges live in HomeCharmBar under the hero. Copy from lib/home-hero.ts only.
 */
export function HomeHero() {
  const heroRef = useRef<HTMLElement>(null)
  const [showMobileFabs, setShowMobileFabs] = useState(false)

  const whatsappHref = `${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappPrefill)}`

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const mobileQuery = window.matchMedia('(max-width: 1023px)')

    const update = () => {
      if (!mobileQuery.matches) {
        setShowMobileFabs(false)
        return
      }
      const rect = hero.getBoundingClientRect()
      const pastHalfHero = rect.top + rect.height * 0.5 <= 0
      setShowMobileFabs(pastHalfHero)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    mobileQuery.addEventListener('change', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      mobileQuery.removeEventListener('change', update)
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="hero hero--image hero--lead"
      data-home-hero
    >
      <HeroUrgencyBanner />

      <div className="hero__panel hero__panel--content">
        <div className="hero__panel-inner">
          <h1 className="text-xs font-semibold tracking-[0.12em] uppercase text-navy-700">
            {homeHero.heading}
          </h1>
          <h2 className="mt-4 fluid-h1 font-semibold tracking-tight2 text-navy-950">
            {homeHero.brand}
          </h2>
          <p className="mt-6 fluid-lead text-navy-700 max-w-prose">
            {homeHero.lead}
          </p>

          <div className="mt-8 btn-row hero-cta-stack">
            <a
              href={homeHero.callHref}
              aria-label={homeHero.callAriaLabel}
              data-track="call_click"
              data-track-location="hero"
              className="btn btn-lg btn-primary btn-full hero-cta-call"
            >
              {homeHero.callLabel}
            </a>
            <a
              href={homeHero.bookingHref}
              aria-label={homeHero.bookingAriaLabel}
              data-track="book_click"
              data-track-location="hero"
              className="btn btn-lg btn-primary btn-full hero-cta-book"
            >
              {homeHero.bookingLabel}
            </a>
            <div className="hero-cta-message-row">
              <a
                href={whatsappHref}
                aria-label="Message Astons Law Chambers on WhatsApp"
                data-track="whatsapp_click"
                data-track-location="hero_whatsapp"
                className="btn btn-lg btn-secondary hero-cta-whatsapp"
              >
                <svg aria-hidden="true" focusable="false">
                  <use href="#i-whatsapp" />
                </svg>
              </a>
              <button
                type="button"
                aria-label={homeHero.messageAriaLabel}
                aria-haspopup="dialog"
                data-open-home-message
                data-track-location="hero_message"
                className="btn btn-lg btn-secondary btn-full hero-cta-message"
              >
                {homeHero.messageLabel}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__panel hero__panel--media" aria-hidden="true" />

      <div
        className={
          showMobileFabs ? 'hero-mobile-fabs is-visible' : 'hero-mobile-fabs'
        }
        aria-hidden={!showMobileFabs}
      >
        <a
          href={homeHero.bookingHref}
          aria-label={homeHero.bookingAriaLabel}
          data-track="book_click"
          data-track-location="hero_book_fab"
          className="hero-mobile-fab hero-mobile-fab--book"
          tabIndex={showMobileFabs ? 0 : -1}
        >
          <svg aria-hidden="true" focusable="false">
            <use href="#i-calendar-plus" />
          </svg>
        </a>
        <a
          href={homeHero.callHref}
          aria-label={homeHero.callAriaLabel}
          data-track="call_click"
          data-track-location="hero_call_fab"
          className="hero-mobile-fab hero-mobile-fab--call"
          tabIndex={showMobileFabs ? 0 : -1}
        >
          <svg aria-hidden="true" focusable="false">
            <use href="#i-phone" />
          </svg>
        </a>
      </div>
    </section>
  )
}
