'use client'

import { useState, type ReactNode } from 'react'

type Tab = { id: string; label: string; content: ReactNode }

export function SgTabs({ tabs, label }: { tabs: Tab[]; label: string }) {
  const [active, setActive] = useState(tabs[0]?.id ?? '')
  const current = tabs.find((t) => t.id === active) ?? tabs[0]
  if (!current) return null

  return (
    <div className="sg-tabs">
      <div className="sg-tabs__list" role="tablist" aria-label={label}>
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={t.id === current.id}
            className={`sg-tabs__tab${t.id === current.id ? ' is-active' : ''}`}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="sg-tabs__panel" role="tabpanel">
        {current.content}
      </div>
    </div>
  )
}
