export const homeHero = {
  heading: 'Criminal Defence across London and the UK',
  brand: 'Astons Law Chambers',
  lead:
    'Astons Law Chambers is a BSB regulated criminal defence advocacy, providing expert support across the UK. We support with everything from violence related offences, drugs defence, to emergency support and police station callouts.',
  bookingLabel: 'Book a free consultation',
  bookingAriaLabel: 'Book a consultation with Astons Law Chambers',
  bookingHref: 'https://cal.com/astonslaw/callback?overlayCalendar=true',
  callLabel: 'Call now',
  callAriaLabel: 'Call Astons Law Chambers on 07922 247 999',
  callHref: 'tel:+447922247999',
  form: {
    panelHeading: 'Ways to get in touch',
    custodyHeading: 'Police station & emergency support',
    panelIntro:
      'If you are in police custody and need support, call 07922 247 999 now.',
    custodyCallLabel: 'Call now',
    bookingHeading: 'Book a consultation',
    bookingIntro:
      "If you'd like to book a time to speak with the barrister use the button below",
    bookingIntroDesktop: {
      before: "If you'd like to book a time to speak about your case, ",
      link: 'press here',
    },
    bookingLabel: 'Book a consultation',
    formHeading: 'Send a message',
    formIntro:
      'Use the form below to explain your situation. Astons Law Chambers will get back to you.',
    fields: {
      name: 'First name',
      surname: 'Last name',
      phone: 'Phone number',
      message: 'Brief description of situation',
    },
    phonePrefix: '+44',
    messageMinHint:
      'Your message must contain a minimum of 25 characters and a maximum of 750.',
    submit: 'Send enquiry',
    submitSending: 'Sending...',
    submitSuccess: 'Success!',
    submitFailure: 'Error',
    confirmationHeading: 'Your message has been sent!',
    confirmationBody:
      'Astons Law Chambers will get back to you soon. Sending this message does not create a barrister–client relationship and does not amount to instruction or representation.',
    errors: {
      name: 'Please enter your first name (at least 3 characters)',
      surname: 'Please enter your last name',
      phone: 'Please enter a valid UK phone number',
      messageMin: 'Please enter at least 25 characters',
      messageMax: 'Please keep your message to 750 characters or fewer',
      form: 'Please complete the form correctly to proceed',
    },
  },
} as const

/** Validation limits — logic + message helper / min-progress ring (user-approved UI). */
export const homeHeroFormRules = {
  nameMin: 3,
  /** National significant number length after +44 (leading 0 stripped). */
  phoneNationalMin: 9,
  phoneNationalMax: 10,
  messageMin: 25,
  messageMax: 750,
} as const

/** Digits for the editable part of the phone field (no +44). */
export function nationalPhoneDigits(value: string): string {
  let digits = value.replace(/\D/g, '')
  if (digits.startsWith('0')) digits = digits.slice(1)
  return digits
}

/** E.164 string for Web3Forms from the national input. */
export function toE164UkPhone(value: string): string {
  return `+44${nationalPhoneDigits(value)}`
}
