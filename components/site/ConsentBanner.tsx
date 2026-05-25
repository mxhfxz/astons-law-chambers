'use client'
import { useEffect, useState } from 'react'

const KEY = 'alc_consent_v1'

export function ConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  const decide = (decision: 'granted' | 'denied') => {
    try { localStorage.setItem(KEY, decision) } catch { /* no-op */ }
    setVisible(false)
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: decision,
        functionality_storage: decision,
        personalization_storage: decision,
      })
    }
  }

  if (!visible) return null

  return (
    <div id="consentBanner" role="region" aria-label="Cookie consent">
      <p className="consent-banner-text">
        We use analytics cookies to understand how visitors use this site.{' '}
        <a href="/privacy-policy" className="consent-banner-link">Privacy policy</a>
      </p>
      <div className="consent-banner-actions">
        <button
          onClick={() => decide('granted')}
          className="consent-btn consent-btn-accept"
          aria-label="Accept analytics cookies"
        >
          Accept
        </button>
        <button
          onClick={() => decide('denied')}
          className="consent-btn consent-btn-decline"
          aria-label="Decline analytics cookies"
        >
          Decline
        </button>
      </div>
    </div>
  )
}
