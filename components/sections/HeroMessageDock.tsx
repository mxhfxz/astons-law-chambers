'use client'

import { useEffect, useRef, useState } from 'react'
import { homeHero } from '@/lib/home-hero'
import { HomeLeadForm } from '@/components/sections/HomeLeadForm'

/**
 * Sitewide message modal dock — same shell/CSS as HomeHero modal.
 * Opens via [data-open-home-message] (hero Message + desktop FAB file-plus).
 */
export function HeroMessageDock() {
  const closeRef = useRef<HTMLButtonElement>(null)
  const [messageOpen, setMessageOpen] = useState(false)
  const [messageMinimized, setMessageMinimized] = useState(false)
  const [messageFlash, setMessageFlash] = useState(false)
  const messageOpenRef = useRef(false)
  const messageMinimizedRef = useRef(false)
  messageOpenRef.current = messageOpen
  messageMinimizedRef.current = messageMinimized

  useEffect(() => {
    function onOpenClick(event: MouseEvent) {
      const target = event.target as Element | null
      if (!target?.closest?.('[data-open-home-message]')) return
      event.preventDefault()
      if (!messageOpenRef.current) {
        setMessageOpen(true)
        setMessageMinimized(false)
        return
      }
      if (messageMinimizedRef.current) {
        setMessageMinimized(false)
        return
      }
      setMessageFlash(true)
    }
    document.addEventListener('click', onOpenClick)
    return () => document.removeEventListener('click', onOpenClick)
  }, [])

  useEffect(() => {
    if (!messageFlash) return
    const id = window.setTimeout(() => setMessageFlash(false), 480)
    return () => window.clearTimeout(id)
  }, [messageFlash])

  useEffect(() => {
    if (!messageOpen || messageMinimized) return

    const mobileQuery = window.matchMedia('(max-width: 1023px)')
    const previousOverflow = document.body.style.overflow
    if (mobileQuery.matches) {
      document.body.style.overflow = 'hidden'
    }
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMessageOpen(false)
        setMessageMinimized(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [messageOpen, messageMinimized])

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 1023px)')
    const sync = () => {
      if (mobileQuery.matches) setMessageMinimized(false)
    }
    mobileQuery.addEventListener('change', sync)
    return () => mobileQuery.removeEventListener('change', sync)
  }, [])

  function closeMessage() {
    setMessageOpen(false)
    setMessageMinimized(false)
    setMessageFlash(false)
  }

  if (!messageOpen) return null

  return (
    <div
      className={[
        'hero-lead-form-modal',
        messageMinimized ? 'is-minimized' : '',
        messageFlash ? 'is-flash' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        className="hero-lead-form-modal__panel"
        role="dialog"
        aria-modal={!messageMinimized}
        aria-label={homeHero.form.formHeading}
      >
        <div
          className="hero-lead-form-modal__bar"
          onClick={
            messageMinimized ? () => setMessageMinimized(false) : undefined
          }
        >
          <p className="hero-lead-form-modal__title">
            {homeHero.form.formHeading}
          </p>
          <div className="hero-lead-form-modal__actions">
            <button
              type="button"
              className="hero-lead-form-modal__minimize"
              aria-label="Minimize"
              onClick={(event) => {
                event.stopPropagation()
                setMessageMinimized(true)
              }}
            >
              <span aria-hidden="true">–</span>
            </button>
            <button
              ref={closeRef}
              type="button"
              className="hero-lead-form-modal__close"
              aria-label="Close"
              onClick={(event) => {
                event.stopPropagation()
                closeMessage()
              }}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </div>
        <div className="hero-lead-form-modal__body">
          <HomeLeadForm />
        </div>
      </div>
    </div>
  )
}
