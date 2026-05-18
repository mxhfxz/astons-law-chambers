// Confirmed values from memory/verified_facts.md.
// whatsappPrefill set 2026-05-17 per client direction — a short opener the
// sender completes themselves. calUrl confirmed 2026-05-14.
//
// Note: whatsappPrefill is stored as raw text. Any consumer building a
// wa.me link MUST URL-encode it, e.g.:
//   `${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappPrefill)}`

export const contact = {
  phone: '07922 247 999',
  phoneTel: 'tel:+447922247999',
  whatsapp: 'https://wa.me/447922247999',
  whatsappPrefill: 'I need legal support for...',
  calUrl: 'https://cal.com/astonslaw/callback?overlayCalendar=true',
} as const
