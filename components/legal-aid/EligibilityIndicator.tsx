'use client'

// Legal Aid Eligibility Indicator — interactive client island.
//
// COMPLIANCE: produces NO verdict. Three soft outcomes, each ending in the
// conversion trio (phone -> WhatsApp -> cal.com). 100% client-side: answers are
// held in component state only, never transmitted, stored, or sent to cal.com.
// No analytics fire on answers or results — only the site-wide delegated
// data-track listener on the CTA links (GA4 + Vercel), identical to every page.
// All visible strings come from lib/legal-aid-eligibility.ts (DRAFT copy).
//
// UI (user wireframe 2026-07-03): an accordion of all four questions. Selecting
// an answer marks that question complete, collapses it, and opens the next
// unanswered one. "See what this means" validates — incomplete questions turn to
// an error state — then the result replaces the accordion. Accessible: each
// header is a real <button> with aria-expanded/aria-controls; panels are
// role="region"; answers are native radios; the result is announced via
// aria-live and takes focus.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { contact } from '@/lib/contact'
import {
  QUESTIONS,
  RESULTS,
  computeSignal,
  type Answers,
  type QuestionId,
} from '@/lib/legal-aid-eligibility'

const TRACK_LOCATION = 'eligibility_result'
const waHref = `${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappPrefill)}`

type Status = 'complete' | 'error' | 'todo'

function StatusIcon({ status }: { status: Status }) {
  if (status === 'complete') {
    return (
      <svg className="la-elig__status-ico" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="11" fill="currentColor" />
        <path
          d="M6.5 12.5l3.5 3.5L17.5 8"
          fill="none"
          stroke="white"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  if (status === 'error') {
    return (
      <svg className="la-elig__status-ico" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="11" fill="currentColor" />
        <path d="M12 6.75v6.5" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="12" cy="17" r="1.35" fill="white" />
      </svg>
    )
  }
  return (
    <svg className="la-elig__status-ico" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg
      className="la-elig__chevron"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

function ResultCtas() {
  return (
    <div className="la-elig__ctas" data-track-loc={TRACK_LOCATION}>
      <a
        href={contact.phoneTel}
        aria-label="Call Astons Law Chambers"
        data-track="call_click"
        data-track-location={TRACK_LOCATION}
        className="btn btn-lg btn-primary btn-full"
      >
        Call {contact.phone}
      </a>
      <a
        href={waHref}
        aria-label="Message Astons Law Chambers on WhatsApp"
        data-track="whatsapp_click"
        data-track-location={TRACK_LOCATION}
        className="btn btn-lg btn-secondary btn-full"
      >
        Message on WhatsApp
      </a>
      <a
        href={contact.calUrl}
        aria-label="Book a call with Astons Law Chambers"
        data-track="book_click"
        data-track-location={TRACK_LOCATION}
        className="btn btn-lg btn-secondary btn-full"
      >
        Book a call
      </a>
    </div>
  )
}

function Footnote() {
  return (
    <p className="la-elig__footnote">
      *A general guide only, not an official decision. It does not guarantee legal aid. Only the
      Legal Aid Agency can decide an application. See the guidance on{' '}
      <a
        href="https://www.gov.uk/check-legal-aid"
        target="_blank"
        rel="noopener"
        className="la-elig__gov-link"
      >
        GOV.UK
      </a>
      .
    </p>
  )
}

export function EligibilityIndicator() {
  const [answers, setAnswers] = useState<Answers>({})
  const [openId, setOpenId] = useState<QuestionId | null>(QUESTIONS[0].id)
  const [submitted, setSubmitted] = useState(false)
  const [attempted, setAttempted] = useState(false)
  const resultRef = useRef<HTMLHeadingElement>(null)
  const headRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const outcome = useMemo(() => (submitted ? computeSignal(answers) : null), [submitted, answers])
  const result = outcome ? RESULTS[outcome] : null
  const allAnswered = QUESTIONS.every((q) => answers[q.id])

  const toggle = useCallback((id: QuestionId) => {
    setOpenId((cur) => (cur === id ? null : id))
  }, [])

  // Select an answer -> mark complete, collapse, open the next unanswered one.
  const handleSelect = useCallback((id: QuestionId, value: string) => {
    setAnswers((prev) => {
      const next = { ...prev, [id]: value }
      const idx = QUESTIONS.findIndex((q) => q.id === id)
      const following = QUESTIONS.find((q, i) => i > idx && !next[q.id])
      const remaining = following ?? QUESTIONS.find((q) => !next[q.id])
      setOpenId(remaining ? remaining.id : null)
      return next
    })
  }, [])

  const handleSeeResult = useCallback(() => {
    const incomplete = QUESTIONS.find((q) => !answers[q.id])
    if (incomplete) {
      setAttempted(true)
      setOpenId(incomplete.id)
      headRefs.current[incomplete.id]?.focus()
      return
    }
    setSubmitted(true)
  }, [answers])

  const handleReset = useCallback(() => {
    setAnswers({})
    setOpenId(QUESTIONS[0].id)
    setSubmitted(false)
    setAttempted(false)
  }, [])

  useEffect(() => {
    if (submitted && resultRef.current) resultRef.current.focus()
  }, [submitted])

  if (submitted && result) {
    return (
      <div className="la-elig" data-outcome={result.outcome}>
        <div className="la-elig__inner">
          <div className="la-elig__result" role="status" aria-live="polite">
            <h2 ref={resultRef} tabIndex={-1} className="la-elig__result-heading">
              {result.heading}
            </h2>
            {result.body.map((para, i) => (
              <p key={i} className="la-elig__result-body">
                {para}
              </p>
            ))}
            <p className="la-elig__result-lead">{result.ctaLead}</p>
            <ResultCtas />
            <button type="button" onClick={handleReset} className="la-elig__restart">
              Start again
            </button>
          </div>
          <Footnote />
        </div>
      </div>
    )
  }

  return (
    <div className="la-elig">
      <div className="la-elig__inner">
        <div className="la-elig__accordion">
          {QUESTIONS.map((q) => {
            const answered = !!answers[q.id]
            const isOpen = openId === q.id
            const status: Status = answered ? 'complete' : attempted ? 'error' : 'todo'
            const headId = `laq-head-${q.id}`
            const panelId = `laq-panel-${q.id}`
            return (
              <div
                key={q.id}
                className="la-elig__q"
                data-status={status}
                data-open={isOpen ? 'true' : undefined}
              >
                <button
                  type="button"
                  id={headId}
                  ref={(el) => {
                    headRefs.current[q.id] = el
                  }}
                  className="la-elig__q-head"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(q.id)}
                >
                  <span className="la-elig__q-label">{q.legend}</span>
                  <span className="la-elig__q-tools">
                    <StatusIcon status={status} />
                    <ChevronIcon />
                  </span>
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headId}
                  className="la-elig__q-panel"
                  ref={(el) => {
                    // Collapsed panels animate via CSS grid-rows but stay in the
                    // DOM; `inert` keeps their radios out of the tab order + AT.
                    if (!el) return
                    if (isOpen) el.removeAttribute('inert')
                    else el.setAttribute('inert', '')
                  }}
                >
                  <div className="la-elig__q-panel-inner">
                    {q.help ? <p className="la-elig__help">{q.help}</p> : null}
                    <fieldset className="la-elig__opts">
                      <legend className="sr-only">{q.legend}</legend>
                      {q.options.map((opt) => {
                        const selected = answers[q.id] === opt.value
                        return (
                          <label
                            key={opt.value}
                            className="la-elig__option"
                            data-selected={selected ? 'true' : undefined}
                          >
                            <input
                              type="radio"
                              name={q.id}
                              value={opt.value}
                              checked={selected}
                              onChange={() => handleSelect(q.id, opt.value)}
                              className="la-elig__radio"
                            />
                            <span className="la-elig__dot" aria-hidden="true" />
                            <span className="la-elig__option-text">
                              <span className="la-elig__option-label">{opt.label}</span>
                              {opt.hint ? (
                                <span className="la-elig__option-hint">{opt.hint}</span>
                              ) : null}
                            </span>
                          </label>
                        )
                      })}
                    </fieldset>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <p className="la-elig__error-msg" role="alert">
          {attempted && !allAnswered ? 'Please answer all four questions to see your result.' : ''}
        </p>

        <div className="la-elig__submit">
          <button
            type="button"
            className="btn btn-md btn-primary btn-full"
            onClick={handleSeeResult}
          >
            View eligibility
          </button>
        </div>

        <Footnote />
      </div>
    </div>
  )
}

export default EligibilityIndicator
