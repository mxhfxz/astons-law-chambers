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
import { HCAPTCHA_SITEKEY, submitToWeb3Forms } from '@/lib/web3forms'
import { trackEvent } from '@/lib/track'

type FieldKey = 'name' | 'surname' | 'phone' | 'message'
type FormStep = FieldKey | 'captcha' | 'complete'
type FormValues = Record<FieldKey, string>
type FieldErrors = Partial<Record<FieldKey, string>>

const emptyValues: FormValues = {
  name: '',
  surname: '',
  phone: '',
  message: '',
}

const FORM_STEP_ORDER: FormStep[] = [
  'name',
  'surname',
  'phone',
  'message',
  'captcha',
  'complete',
]

const TRACK_PLACEMENT = 'hero_lead_form_modal'

function stepRank(step: FormStep): number {
  return FORM_STEP_ORDER.indexOf(step)
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

/**
 * Homepage lead-capture form (Web3Forms + hCaptcha).
 * Used inside the hero Send a Message modal — copy from lib/home-hero.ts only.
 */
export function HomeLeadForm() {
  const captchaRef = useRef<HCaptcha>(null)
  const captchaSlotRef = useRef<HTMLDivElement>(null)
  const messageBlockRef = useRef<HTMLDivElement>(null)
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
  const formStartedRef = useRef(false)
  const formCompletedRef = useRef(false)
  const stepsSeenRef = useRef<Set<FormStep>>(new Set())
  const furthestStepRef = useRef<FormStep | null>(null)

  function markStep(step: FormStep) {
    if (formCompletedRef.current) return

    if (!formStartedRef.current) {
      formStartedRef.current = true
      trackEvent('lead_form_start', { placement: TRACK_PLACEMENT })
    }

    if (!stepsSeenRef.current.has(step)) {
      stepsSeenRef.current.add(step)
      trackEvent('lead_form_step', {
        placement: TRACK_PLACEMENT,
        step,
      })
    }

    const current = furthestStepRef.current
    if (!current || stepRank(step) > stepRank(current)) {
      furthestStepRef.current = step
    }
  }

  useEffect(() => {
    if (!showCaptcha) return
    captchaSlotRef.current?.scrollIntoView({
      block: 'nearest',
      behavior: 'smooth',
    })
  }, [showCaptcha])

  useEffect(() => {
    const onPageHide = () => {
      if (!formStartedRef.current || formCompletedRef.current) return
      trackEvent('lead_form_abandon', {
        placement: TRACK_PLACEMENT,
        last_step: furthestStepRef.current ?? 'name',
        steps_reached: stepsSeenRef.current.size,
      })
    }
    window.addEventListener('pagehide', onPageHide)
    return () => window.removeEventListener('pagehide', onPageHide)
  }, [])

  function update(key: FieldKey, value: string) {
    const next = { ...values, [key]: value }
    setValues(next)
    if (submitResult === 'error') setSubmitResult(null)

    if (value.trim().length > 0) markStep(key)

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
      formCompletedRef.current = true
      markStep('complete')
      trackEvent('lead_form_success', {
        placement: TRACK_PLACEMENT,
        steps_reached: stepsSeenRef.current.size,
      })
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

    trackEvent('lead_form_fail', {
      placement: TRACK_PLACEMENT,
      last_step: furthestStepRef.current ?? 'captcha',
    })
    captchaRef.current?.resetCaptcha()
    setCaptchaToken(null)
    setIsSubmitting(false)
    setSubmitResult('error')
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitResult === 'success' || isSubmitting) return
    setSubmitResult(null)

    trackEvent('lead_form_submit_click', { placement: TRACK_PLACEMENT })

    const errors = validate(values)
    const invalid = Object.keys(errors).length > 0

    setFieldErrors(errors)
    setSubmittedInvalid(invalid)
    if (invalid) {
      const firstInvalid = (Object.keys(errors) as FieldKey[]).sort(
        (a, b) => stepRank(a) - stepRank(b),
      )[0]
      trackEvent('lead_form_invalid', {
        placement: TRACK_PLACEMENT,
        first_invalid: firstInvalid ?? 'name',
        invalid_count: Object.keys(errors).length,
      })
      return
    }

    if (!captchaToken) {
      markStep('captcha')
      trackEvent('lead_form_captcha_show', { placement: TRACK_PLACEMENT })
      setIsSubmitting(true)
      setShowCaptcha(true)
      return
    }

    await sendEnquiry(captchaToken)
  }

  function onCaptchaVerify(token: string) {
    markStep('captcha')
    setCaptchaToken(token)
    void sendEnquiry(token)
  }

  function onCaptchaExpire() {
    setCaptchaToken(null)
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
          'aria-describedby': `hero-modal-${key}-error`,
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
  /* Light modal surface — primary when active, secondary when empty */
  const submitClass = hasAnyField
    ? 'btn btn-lg btn-primary btn-full'
    : 'btn btn-lg btn-secondary btn-full'
  const showConfirmation = submitResult === 'success'
  const messageBlockStyle: CSSProperties | undefined = lockedMessageHeight
    ? { minHeight: lockedMessageHeight }
    : undefined

  return (
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
                <label htmlFor="hero-modal-name">{form.fields.name}</label>
                <input
                  id="hero-modal-name"
                  name="name"
                  type="text"
                  autoComplete="given-name"
                  required
                  value={values.name}
                  className={fieldClass('name')}
                  onFocus={() => markStep('name')}
                  onChange={(event) => update('name', event.target.value)}
                  onBlur={() => validateField('name')}
                  {...errorProps('name')}
                />
                {fieldErrors.name ? (
                  <p
                    id="hero-modal-name-error"
                    className="hero-lead-form__error hero-lead-form__error--field"
                    role="alert"
                  >
                    {fieldErrors.name}
                  </p>
                ) : null}
              </div>
              <div className="hero-lead-form__field hero-lead-form__field--surname">
                <label htmlFor="hero-modal-surname">{form.fields.surname}</label>
                <input
                  id="hero-modal-surname"
                  name="surname"
                  type="text"
                  autoComplete="family-name"
                  required
                  value={values.surname}
                  className={fieldClass('surname')}
                  onFocus={() => markStep('surname')}
                  onChange={(event) => update('surname', event.target.value)}
                  onBlur={() => validateField('surname')}
                  {...errorProps('surname')}
                />
                {fieldErrors.surname ? (
                  <p
                    id="hero-modal-surname-error"
                    className="hero-lead-form__error hero-lead-form__error--field"
                    role="alert"
                  >
                    {fieldErrors.surname}
                  </p>
                ) : null}
              </div>
              {fieldErrors.name || fieldErrors.surname ? (
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
              <label htmlFor="hero-modal-phone">{form.fields.phone}</label>
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
                  id="hero-modal-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  required
                  value={values.phone}
                  className="hero-lead-form__control hero-lead-form__phone-input"
                  onFocus={() => markStep('phone')}
                  onChange={(event) => update('phone', event.target.value)}
                  onBlur={() => validateField('phone')}
                  {...errorProps('phone')}
                />
              </div>
              {fieldErrors.phone ? (
                <p
                  id="hero-modal-phone-error"
                  className="hero-lead-form__error"
                  role="alert"
                >
                  {fieldErrors.phone}
                </p>
              ) : null}
            </div>

            <div className="hero-lead-form__field">
              <label htmlFor="hero-modal-message">{form.fields.message}</label>
              <div className="hero-lead-form__message-box">
                <textarea
                  id="hero-modal-message"
                  name="message"
                  rows={4}
                  required
                  value={values.message}
                  className={
                    fieldErrors.message || messageOverMax
                      ? 'hero-lead-form__control hero-lead-form__control--error'
                      : 'hero-lead-form__control'
                  }
                  onFocus={() => markStep('message')}
                  onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                    update('message', event.target.value)
                  }
                  onBlur={() => validateField('message')}
                  {...errorProps('message')}
                  aria-describedby="hero-modal-message-hint hero-modal-message-progress"
                />
                <div
                  id="hero-modal-message-progress"
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
              <p
                id="hero-modal-message-hint"
                className="hero-lead-form__field-hint"
              >
                {form.messageMinHint}
              </p>
              {fieldErrors.message || messageOverMax ? (
                <p
                  id="hero-modal-message-error"
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
  )
}
