'use client'

import { useEffect, useState } from 'react'
import {
  homeCharmCtaLabel,
  homeCharmSlides,
  type CharmSlide,
} from '@/lib/home-charm'

/**
 * Charm bar — BSB + Google + CRO ticker (styleguide HomeHero / home-charm).
 * Pass `slides` for page-relevant set; defaults to CRO home set.
 */
export function HomeCharmBar({
  slides = homeCharmSlides,
}: {
  slides?: readonly CharmSlide[]
}) {
  const list = slides.length > 0 ? slides : homeCharmSlides
  const [index, setIndex] = useState(0)
  const [fading, setFading] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    setIndex(0)
  }, [list])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (reduceMotion || list.length < 2) return

    let fadeTimer: number | undefined
    const id = window.setInterval(() => {
      setFading(true)
      fadeTimer = window.setTimeout(() => {
        setIndex((current) => (current + 1) % list.length)
        setFading(false)
      }, 700)
    }, 8000)

    return () => {
      window.clearInterval(id)
      if (fadeTimer !== undefined) window.clearTimeout(fadeTimer)
    }
  }, [reduceMotion, list])

  const slide = list[index % list.length] ?? list[0]

  return (
    <section className="home-charm-bar" aria-label="Trust and guides">
      <div className="home-charm-bar__inner">
        <a
          href="https://www.barstandardsboard.org.uk/barristers-register/0A9C84A0E6BE3846C117FA4B4290EAD2.html"
          className="home-charm-bar__cell home-charm-bar__bsb"
          aria-label="Regulated by the Bar Standards Board — view the Barristers' Register"
        >
          <img
            src="/bsb-logo.svg"
            alt="Regulated by the Bar Standards Board"
            width="116"
            height="60"
          />
        </a>

        <a
          href="https://share.google/afMXn5mcTqsIlZAaA"
          target="_blank"
          rel="noopener noreferrer"
          className="home-charm-bar__cell home-charm-bar__reviews"
          aria-label="Astons Law Chambers Google reviews — rated 4.9 out of 5"
        >
          <svg className="g-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18A10.97 10.97 0 0 0 1 12c0 1.77.43 3.45 1.18 4.93l3.66-2.83z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z"
            />
          </svg>
          <span className="home-charm-bar__reviews-meta">
            <span className="home-charm-bar__reviews-top">
              <span className="stars" aria-hidden="true">
                <svg viewBox="0 0 20 20" focusable="false">
                  <path
                    fill="#FBBC04"
                    d="M10 1.6l2.47 5.13 5.65.73-4.16 3.86 1.06 5.58L10 14.98l-5.02 2.92 1.06-5.58L1.88 8.46l5.65-.73z"
                  />
                </svg>
                <svg viewBox="0 0 20 20" focusable="false">
                  <path
                    fill="#FBBC04"
                    d="M10 1.6l2.47 5.13 5.65.73-4.16 3.86 1.06 5.58L10 14.98l-5.02 2.92 1.06-5.58L1.88 8.46l5.65-.73z"
                  />
                </svg>
                <svg viewBox="0 0 20 20" focusable="false">
                  <path
                    fill="#FBBC04"
                    d="M10 1.6l2.47 5.13 5.65.73-4.16 3.86 1.06 5.58L10 14.98l-5.02 2.92 1.06-5.58L1.88 8.46l5.65-.73z"
                  />
                </svg>
                <svg viewBox="0 0 20 20" focusable="false">
                  <path
                    fill="#FBBC04"
                    d="M10 1.6l2.47 5.13 5.65.73-4.16 3.86 1.06 5.58L10 14.98l-5.02 2.92 1.06-5.58L1.88 8.46l5.65-.73z"
                  />
                </svg>
                <svg viewBox="0 0 20 20" focusable="false">
                  <defs>
                    <linearGradient id="alc-charm-star-49" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="90%" stopColor="#FBBC04" />
                      <stop offset="90%" stopColor="#FFFFFF" stopOpacity="0.28" />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#alc-charm-star-49)"
                    d="M10 1.6l2.47 5.13 5.65.73-4.16 3.86 1.06 5.58L10 14.98l-5.02 2.92 1.06-5.58L1.88 8.46l5.65-.73z"
                  />
                </svg>
              </span>
              <span className="home-charm-bar__rating">4.9</span>
            </span>
            <span className="home-charm-bar__reviews-label">Google Reviews</span>
          </span>
        </a>

        <a
          href={slide.href}
          className={
            fading
              ? 'home-charm-bar__cell home-charm-bar__ticker is-fading'
              : 'home-charm-bar__cell home-charm-bar__ticker'
          }
          aria-live="polite"
          data-track={
            slide.href.startsWith('/guides/') ? 'guide_click' : undefined
          }
          data-track-location="home_charm_ticker"
        >
          <span className="home-charm-bar__ticker-title">{slide.title}</span>
          <span className="home-charm-bar__cta">
            <span className="home-charm-bar__cta-label">{homeCharmCtaLabel}</span>
            <svg
              className="home-charm-bar__cta-icon"
              aria-hidden="true"
              focusable="false"
            >
              <use href="#i-arrow-right" />
            </svg>
          </span>
        </a>
      </div>
    </section>
  )
}
