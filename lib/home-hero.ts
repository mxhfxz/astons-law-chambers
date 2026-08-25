export const homeHero = {
  heading: 'Criminal Defence across London and the UK',
  brand: 'Astons Law Chambers',
  lead:
    'Astons Law Chambers is a BSB regulated criminal defence advocacy, providing expert support across the UK. We support with everything from violence related offences, drugs defence, to emergency support and police station callouts.',
  bookingLabel: 'Book a Free Consultation',
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
    bookingHeading: 'Book a consultation',
    bookingIntro:
      "If you'd like to book a time to speak with the barrister use the button below",
    bookingIntroDesktop: {
      before: "If you'd like to book a time to speak about your case, ",
      link: 'press here',
    },
    bookingLabel: 'Book a Consultation',
    formHeading: 'Send a message',
    fields: {
      name: 'First name',
      surname: 'Last name',
      phone: 'Phone number',
      message: 'Brief description of situation',
    },
    submit: 'Send enquiry',
    submitSuccess: 'Success!',
    submitFailure: 'Error',
    fieldError: 'Please fill this in to proceed',
    formError: 'Please complete the form correctly to proceed',
  },
} as const

/** Validation limits — enforced in logic only, never exposed in the UI. */
export const homeHeroFormRules = {
  nameMin: 3,
  phoneDigitMin: 10,
  phoneDigitMax: 13,
  messageMin: 10,
  messageMax: 500,
} as const
