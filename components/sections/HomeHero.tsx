'use client'

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react'
import { homeHero, homeHeroFormRules } from '@/lib/home-hero'
import { contact } from '@/lib/contact'

type FieldKey = 'name' | 'surname' | 'phone' | 'message'

type FormValues = Record<FieldKey, string>

const emptyValues: FormValues = {
  name: '',
  surname: '',
  phone: '',
  message: '',
}

function isValidUkPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '')
  const { phoneDigitMin, phoneDigitMax } = homeHeroFormRules
  if (digits.length < phoneDigitMin || digits.length > phoneDigitMax) return false

  if (digits.startsWith('0')) return digits.length === 10 || digits.length === 11
  if (digits.startsWith('44')) return digits.length === 12 || digits.length === 13
  return false
}

function validate(values: FormValues): Partial<Record<FieldKey, boolean>> {
  const errors: Partial<Record<FieldKey, boolean>> = {}
  const { nameMin, messageMin, messageMax } = homeHeroFormRules

  if (values.name.trim().length < nameMin) errors.name = true
  if (!values.surname.trim()) errors.surname = true
  if (!isValidUkPhone(values.phone)) errors.phone = true

  const message = values.message.trim()
  if (message.length < messageMin || message.length > messageMax) {
    errors.message = true
  }

  return errors
}

interface HomeHeroProps {
  trustHtml: string
}

export function HomeHero({ trustHtml }: HomeHeroProps) {
  const heroRef = useRef<HTMLElement>(null)
  const [showMobileFabs, setShowMobileFabs] = useState(false)
  const [values, setValues] = useState<FormValues>(emptyValues)
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<FieldKey, boolean>>
  >({})
  const [submittedInvalid, setSubmittedInvalid] = useState(false)

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
      // Show once the 50% mark of the hero has scrolled past the top of the viewport
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

  function update(key: FieldKey, value: string) {
    const next = { ...values, [key]: value }
    setValues(next)

    if (submittedInvalid || fieldErrors[key]) {
      const errors = validate(next)
      setFieldErrors(errors)
      setSubmittedInvalid(Object.keys(errors).length > 0)
    }
  }

  function validateField(key: FieldKey) {
    setFieldErrors((current) => ({
      ...current,
      [key]: Boolean(validate(values)[key]),
    }))
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const errors = validate(values)
    const invalid = Object.keys(errors).length > 0

    setFieldErrors(errors)
    setSubmittedInvalid(invalid)
  }

  function fieldClass(key: FieldKey) {
    return fieldErrors[key]
      ? 'hero-lead-form__control hero-lead-form__control--error'
      : 'hero-lead-form__control'
  }

  function errorProps(key: FieldKey) {
    return fieldErrors[key]
      ? {
          'aria-invalid': true as const,
          'aria-describedby': `hero-${key}-error`,
        }
      : {}
  }

  function renderField(key: Exclude<FieldKey, 'name' | 'surname'>) {
    const isMessage = key === 'message'
    const commonProps = {
      id: `hero-${key}`,
      name: key,
      required: true,
      value: values[key],
      className: fieldClass(key),
      onChange: (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => update(key, event.target.value),
      onBlur: () => validateField(key),
      ...errorProps(key),
    }

    return (
      <div className="hero-lead-form__field" key={key}>
        <label htmlFor={`hero-${key}`}>{form.fields[key]}</label>
        {isMessage ? (
          <textarea {...commonProps} rows={4} />
        ) : (
          <input {...commonProps} type="tel" autoComplete="tel" />
        )}
        {fieldErrors[key] ? (
          <p
            id={`hero-${key}-error`}
            className="hero-lead-form__error"
            role="alert"
          >
            {form.fieldError}
          </p>
        ) : null}
      </div>
    )
  }

  const { form } = homeHero
  const hasAnyField = Object.values(values).some((value) => value.trim().length > 0)
  const submitClass = hasAnyField
    ? 'btn btn-lg btn-inverse btn-full'
    : 'btn btn-lg btn-secondary btn-full'

  return (
    <section ref={heroRef} className="hero hero--image hero--lead">
      <div className="hero__panel hero__panel--content">
        <div className="hero__panel-inner">
          <h1 className="text-xs font-semibold tracking-[0.12em] uppercase text-navy-100/80">
            {homeHero.heading}
          </h1>
          <h2 className="mt-4 fluid-h1 font-semibold tracking-tight2 text-white">
            {homeHero.brand}
          </h2>
          <p className="mt-6 fluid-lead text-navy-100/90 max-w-prose">
            {homeHero.lead}
          </p>

          <div className="mt-8 btn-row">
            <a
              href={homeHero.bookingHref}
              aria-label={homeHero.bookingAriaLabel}
              data-track="book_click"
              data-track-location="hero"
              className="btn btn-lg btn-inverse btn-full hero-cta-book"
            >
              {homeHero.bookingLabel}
            </a>
            <a
              href={homeHero.callHref}
              aria-label={homeHero.callAriaLabel}
              data-track="call_click"
              data-track-location="hero"
              className="btn btn-lg btn-on-dark btn-full hero-cta-call"
            >
              {homeHero.callLabel}
            </a>
          </div>

          <div
            className="hero-trust-mount"
            dangerouslySetInnerHTML={{ __html: trustHtml }}
          />
        </div>
      </div>

      <div className="hero__panel hero__panel--form">
        <div className="hero-lead-form-wrap">
          <div className="hero-lead-form__intro">
            <h3 className="hero-lead-form__panel-heading">{form.panelHeading}</h3>
            <h4 className="hero-lead-form__section-heading">
              {form.custodyHeading}
            </h4>
            <p className="hero-lead-form__panel-intro">{form.panelIntro}</p>
          </div>

          <div className="hero-lead-form__booking">
            <h4 className="hero-lead-form__section-heading">
              {form.bookingHeading}
            </h4>
            <p className="hero-lead-form__booking-intro hero-lead-form__booking-intro--mobile">
              {form.bookingIntro}
            </p>
            <p className="hero-lead-form__booking-intro hero-lead-form__booking-intro--desktop">
              {form.bookingIntroDesktop.before}
              <a
                href={homeHero.bookingHref}
                aria-label={homeHero.bookingAriaLabel}
                data-track="book_click"
                data-track-location="hero_form_inline"
                className="hero-lead-form__booking-link"
              >
                {form.bookingIntroDesktop.link}
              </a>
            </p>
            <a
              href={homeHero.bookingHref}
              aria-label={homeHero.bookingAriaLabel}
              data-track="book_click"
              data-track-location="hero_form"
              className="btn btn-lg btn-secondary btn-full"
            >
              {form.bookingLabel}
            </a>
          </div>

          <div className="hero-lead-form__message">
            <h4 className="hero-lead-form__form-heading">{form.formHeading}</h4>

            <form className="hero-lead-form" onSubmit={onSubmit} noValidate>
            {/* Name pair — fields stay put; errors sit under the row (Evolve pattern) */}
            <div className="hero-lead-form__pair">
              <div className="hero-lead-form__pair-fields">
                <div className="hero-lead-form__field">
                  <label htmlFor="hero-name">{form.fields.name}</label>
                  <input
                    id="hero-name"
                    name="name"
                    type="text"
                    autoComplete="given-name"
                    required
                    value={values.name}
                    className={fieldClass('name')}
                    onChange={(event) => update('name', event.target.value)}
                    onBlur={() => validateField('name')}
                    {...errorProps('name')}
                  />
                </div>
                <div className="hero-lead-form__field">
                  <label htmlFor="hero-surname">{form.fields.surname}</label>
                  <input
                    id="hero-surname"
                    name="surname"
                    type="text"
                    autoComplete="family-name"
                    required
                    value={values.surname}
                    className={fieldClass('surname')}
                    onChange={(event) => update('surname', event.target.value)}
                    onBlur={() => validateField('surname')}
                    {...errorProps('surname')}
                  />
                </div>
              </div>
              {(fieldErrors.name || fieldErrors.surname) ? (
                <div className="hero-lead-form__pair-errors">
                  {fieldErrors.name ? (
                    <p
                      id="hero-name-error"
                      className="hero-lead-form__error"
                      role="alert"
                    >
                      {form.fieldError}
                    </p>
                  ) : (
                    <span className="hero-lead-form__error-spacer" aria-hidden="true" />
                  )}
                  {fieldErrors.surname ? (
                    <p
                      id="hero-surname-error"
                      className="hero-lead-form__error"
                      role="alert"
                    >
                      {form.fieldError}
                    </p>
                  ) : (
                    <span className="hero-lead-form__error-spacer" aria-hidden="true" />
                  )}
                </div>
              ) : null}
            </div>

            {renderField('phone')}
            {renderField('message')}

            <button type="submit" className={submitClass}>
              {form.submit}
            </button>
            {submittedInvalid ? (
              <p className="hero-lead-form__error" role="alert">
                {form.formError}
              </p>
            ) : null}
          </form>
          </div>
        </div>
      </div>

      <div
        className={
          showMobileFabs ? 'hero-mobile-fabs is-visible' : 'hero-mobile-fabs'
        }
        aria-hidden={!showMobileFabs}
      >
        <a
          href={contact.whatsapp}
          aria-label="Message Astons Law Chambers on WhatsApp"
          data-track="whatsapp_click"
          data-track-location="hero_wa_fab"
          className="hero-mobile-fab hero-mobile-fab--whatsapp"
          tabIndex={showMobileFabs ? 0 : -1}
        >
          <svg aria-hidden="true" focusable="false">
            <use href="#i-whatsapp" />
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
