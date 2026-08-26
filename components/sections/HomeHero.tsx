'use client'

import HCaptcha from '@hcaptcha/react-hcaptcha'
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type FormEvent,
} from 'react'
import {
  homeHero,
  homeHeroFormRules,
  nationalPhoneDigits,
  toE164UkPhone,
} from '@/lib/home-hero'
import { contact } from '@/lib/contact'
import { HCAPTCHA_SITEKEY, submitToWeb3Forms } from '@/lib/web3forms'

type FieldKey = 'name' | 'surname' | 'phone' | 'message'

type FormValues = Record<FieldKey, string>

type FieldErrors = Partial<Record<FieldKey, string>>

const emptyValues: FormValues = {
  name: '',
  surname: '',
  phone: '',
  message: '',
}

function isValidUkPhone(value: string): boolean {
  const digits = nationalPhoneDigits(value)
  const { phoneNationalMin, phoneNationalMax } = homeHeroFormRules
  return digits.length >= phoneNationalMin && digits.length <= phoneNationalMax
}

function validate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {}
  const { nameMin, messageMin, messageMax } = homeHeroFormRules
  const { errors: copy } = homeHero.form

  if (values.name.trim().length < nameMin) errors.name = copy.name
  if (!values.surname.trim()) errors.surname = copy.surname
  if (!isValidUkPhone(values.phone)) errors.phone = copy.phone

  const message = values.message.trim()
  if (message.length < messageMin) errors.message = copy.messageMin
  else if (values.message.length > messageMax) errors.message = copy.messageMax

  return errors
}

interface HomeHeroProps {
  trustHtml: string
}

export function HomeHero({ trustHtml }: HomeHeroProps) {
  const heroRef = useRef<HTMLElement>(null)
  const captchaRef = useRef<HCaptcha>(null)
  const captchaSlotRef = useRef<HTMLDivElement>(null)
  const messageBlockRef = useRef<HTMLDivElement>(null)
  const [showMobileFabs, setShowMobileFabs] = useState(false)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [showCaptcha, setShowCaptcha] = useState(false)
  const [values, setValues] = useState<FormValues>(emptyValues)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [submittedInvalid, setSubmittedInvalid] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<'success' | 'error' | null>(
    null,
  )
  const [lockedMessageHeight, setLockedMessageHeight] = useState<number | null>(
    null,
  )

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

  useEffect(() => {
    if (!showCaptcha) return
    captchaSlotRef.current?.scrollIntoView({
      block: 'nearest',
      behavior: 'smooth',
    })
  }, [showCaptcha])

  function update(key: FieldKey, value: string) {
    const next = { ...values, [key]: value }
    setValues(next)
    if (submitResult === 'error') setSubmitResult(null)

    const formActive = Object.values(next).some((entry) => entry.trim().length > 0)
    if (!formActive) setCaptchaToken(null)

    if (submittedInvalid || fieldErrors[key]) {
      const errors = validate(next)
      setFieldErrors(errors)
      setSubmittedInvalid(Object.keys(errors).length > 0)
    } else if (key === 'message' && value.length > homeHeroFormRules.messageMax) {
      setFieldErrors((current) => ({
        ...current,
        message: homeHero.form.errors.messageMax,
      }))
    }
  }

  function validateField(key: FieldKey) {
    const errors = validate(values)
    setFieldErrors((current) => {
      const next = { ...current }
      if (errors[key]) next[key] = errors[key]
      else delete next[key]
      return next
    })
  }

  async function sendEnquiry(token: string) {
    setIsSubmitting(true)
    const result = await submitToWeb3Forms({
      first_name: values.name.trim(),
      last_name: values.surname.trim(),
      phone: toE164UkPhone(values.phone),
      message: values.message.trim(),
      captchaToken: token,
    })

    if (result.ok) {
      if (messageBlockRef.current) {
        setLockedMessageHeight(messageBlockRef.current.offsetHeight)
      }
      setValues(emptyValues)
      setFieldErrors({})
      setSubmittedInvalid(false)
      setCaptchaToken(null)
      setShowCaptcha(false)
      captchaRef.current?.resetCaptcha()
      setIsSubmitting(false)
      setSubmitResult('success')
      return
    }

    captchaRef.current?.resetCaptcha()
    setCaptchaToken(null)
    setIsSubmitting(false)
    setSubmitResult('error')
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitResult === 'success' || isSubmitting) return
    setSubmitResult(null)

    const errors = validate(values)
    const invalid = Object.keys(errors).length > 0

    setFieldErrors(errors)
    setSubmittedInvalid(invalid)
    if (invalid) return

    // Hang send on captcha: show check, keep button in Sending… until verified
    if (!captchaToken) {
      setIsSubmitting(true)
      setShowCaptcha(true)
      return
    }

    await sendEnquiry(captchaToken)
  }

  function onCaptchaVerify(token: string) {
    setCaptchaToken(token)
    void sendEnquiry(token)
  }

  function onCaptchaExpire() {
    setCaptchaToken(null)
    // Keep Sending… pending — user must pass the check again
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

  const { form } = homeHero
  const { messageMin, messageMax } = homeHeroFormRules
  const hasAnyField = Object.values(values).some((value) => value.trim().length > 0)
  const messageLength = values.message.length
  const messageOverMax = messageLength > messageMax
  const messageMinProgress = Math.min(messageLength / messageMin, 1)
  const messageRingRadius = 9
  const messageRingCircumference = 2 * Math.PI * messageRingRadius
  const messageRingOffset =
    messageRingCircumference * (1 - messageMinProgress)
  const messageRingClass = messageOverMax
    ? 'hero-lead-form__min-ring hero-lead-form__min-ring--over'
    : messageMinProgress >= 1
      ? 'hero-lead-form__min-ring hero-lead-form__min-ring--complete'
      : 'hero-lead-form__min-ring'
  const submitClass = hasAnyField
    ? 'btn btn-lg btn-inverse btn-full'
    : 'btn btn-lg btn-secondary btn-full'
  const showConfirmation = submitResult === 'success'
  const messageBlockStyle: CSSProperties | undefined = lockedMessageHeight
    ? { minHeight: lockedMessageHeight }
    : undefined

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
            <a
              href={homeHero.callHref}
              aria-label={homeHero.callAriaLabel}
              data-track="call_click"
              data-track-location="hero_form_custody"
              className="btn btn-lg btn-secondary btn-full hero-lead-form__custody-call"
            >
              {form.custodyCallLabel}
            </a>
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

          <div
            ref={messageBlockRef}
            className="hero-lead-form__message"
            style={messageBlockStyle}
          >
            {showConfirmation ? (
              <div className="hero-lead-form__confirmation" role="status">
                <span className="hero-lead-form__confirmation-icon" aria-hidden="true">
                  <svg focusable="false">
                    <use href="#i-check" />
                  </svg>
                </span>
                <h3 className="hero-lead-form__confirmation-heading">
                  {form.confirmationHeading}
                </h3>
                <p className="hero-lead-form__confirmation-body">
                  {form.confirmationBody}
                </p>
              </div>
            ) : (
              <>
                <h4 className="hero-lead-form__form-heading">{form.formHeading}</h4>
                <p className="hero-lead-form__form-intro">{form.formIntro}</p>

                <form className="hero-lead-form" onSubmit={onSubmit} noValidate>
                  <div className="hero-lead-form__pair">
                    <div className="hero-lead-form__field hero-lead-form__field--name">
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
                      {fieldErrors.name ? (
                        <p
                          id="hero-name-error"
                          className="hero-lead-form__error hero-lead-form__error--field"
                          role="alert"
                        >
                          {fieldErrors.name}
                        </p>
                      ) : null}
                    </div>
                    <div className="hero-lead-form__field hero-lead-form__field--surname">
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
                      {fieldErrors.surname ? (
                        <p
                          id="hero-surname-error"
                          className="hero-lead-form__error hero-lead-form__error--field"
                          role="alert"
                        >
                          {fieldErrors.surname}
                        </p>
                      ) : null}
                    </div>
                    {(fieldErrors.name || fieldErrors.surname) ? (
                      <div className="hero-lead-form__pair-errors" aria-hidden="true">
                        {fieldErrors.name ? (
                          <p className="hero-lead-form__error" role="presentation">
                            {fieldErrors.name}
                          </p>
                        ) : (
                          <span
                            className="hero-lead-form__error-spacer"
                            aria-hidden="true"
                          />
                        )}
                        {fieldErrors.surname ? (
                          <p className="hero-lead-form__error" role="presentation">
                            {fieldErrors.surname}
                          </p>
                        ) : (
                          <span
                            className="hero-lead-form__error-spacer"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    ) : null}
                  </div>

                  <div className="hero-lead-form__field">
                    <label htmlFor="hero-phone">{form.fields.phone}</label>
                    <div
                      className={
                        fieldErrors.phone
                          ? 'hero-lead-form__phone hero-lead-form__phone--error'
                          : 'hero-lead-form__phone'
                      }
                    >
                      <span className="hero-lead-form__phone-prefix" aria-hidden="true">
                        {form.phonePrefix}
                      </span>
                      <input
                        id="hero-phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel-national"
                        required
                        value={values.phone}
                        className="hero-lead-form__control hero-lead-form__phone-input"
                        onChange={(event) => update('phone', event.target.value)}
                        onBlur={() => validateField('phone')}
                        {...errorProps('phone')}
                      />
                    </div>
                    {fieldErrors.phone ? (
                      <p
                        id="hero-phone-error"
                        className="hero-lead-form__error"
                        role="alert"
                      >
                        {fieldErrors.phone}
                      </p>
                    ) : null}
                  </div>

                  <div className="hero-lead-form__field">
                    <label htmlFor="hero-message">{form.fields.message}</label>
                    <div className="hero-lead-form__message-box">
                      <textarea
                        id="hero-message"
                        name="message"
                        rows={4}
                        required
                        value={values.message}
                        className={
                          fieldErrors.message || messageOverMax
                            ? 'hero-lead-form__control hero-lead-form__control--error'
                            : 'hero-lead-form__control'
                        }
                        onChange={(
                          event: ChangeEvent<HTMLTextAreaElement>,
                        ) => update('message', event.target.value)}
                        onBlur={() => validateField('message')}
                        {...errorProps('message')}
                        aria-describedby="hero-message-hint hero-message-progress"
                      />
                      <div
                        id="hero-message-progress"
                        className={messageRingClass}
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={messageMin}
                        aria-valuenow={Math.min(messageLength, messageMin)}
                        aria-label={`Message length toward minimum of ${messageMin} characters`}
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                          <circle
                            className="hero-lead-form__min-ring-track"
                            cx="12"
                            cy="12"
                            r={messageRingRadius}
                            fill="none"
                          />
                          <circle
                            className="hero-lead-form__min-ring-progress"
                            cx="12"
                            cy="12"
                            r={messageRingRadius}
                            fill="none"
                            strokeDasharray={messageRingCircumference}
                            strokeDashoffset={messageRingOffset}
                            transform="rotate(-90 12 12)"
                          />
                        </svg>
                      </div>
                    </div>
                    <p id="hero-message-hint" className="hero-lead-form__field-hint">
                      {form.messageMinHint}
                    </p>
                    {fieldErrors.message || messageOverMax ? (
                      <p
                        id="hero-message-error"
                        className="hero-lead-form__error"
                        role="alert"
                      >
                        {fieldErrors.message ?? form.errors.messageMax}
                      </p>
                    ) : null}
                  </div>

                  {showCaptcha ? (
                    <div ref={captchaSlotRef} className="hero-lead-form__captcha">
                      <HCaptcha
                        ref={captchaRef}
                        sitekey={HCAPTCHA_SITEKEY}
                        reCaptchaCompat={false}
                        onVerify={onCaptchaVerify}
                        onExpire={onCaptchaExpire}
                      />
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    className={
                      isSubmitting ? `${submitClass} is-sending` : submitClass
                    }
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span
                          className="hero-lead-form__spinner"
                          aria-hidden="true"
                        />
                        {form.submitSending}
                      </>
                    ) : (
                      form.submit
                    )}
                  </button>
                  {submitResult === 'error' ? (
                    <p className="hero-lead-form__error" role="alert">
                      {form.submitFailure}
                    </p>
                  ) : null}
                  {submittedInvalid ? (
                    <p className="hero-lead-form__error" role="alert">
                      {form.errors.form}
                    </p>
                  ) : null}
                </form>
              </>
            )}
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
