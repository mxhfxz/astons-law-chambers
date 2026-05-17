// Confirmed values from memory/verified_facts.md.
// whatsappPrefill confirmed 2026-05-14: typos corrected from client-supplied text.
// calUrl confirmed 2026-05-14.
//
// Note: whatsappPrefill is stored as raw text. Any consumer building a
// wa.me link MUST URL-encode it, e.g.:
//   `${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappPrefill)}`

export const contact = {
  phone: '07922 247 999',
  phoneTel: 'tel:+447922247999',
  whatsapp: 'https://wa.me/447922247999',
  whatsappPrefill:
    'Replace this with what you need assistance with. I will respond to you asap. Police station callouts are available 24 hours, and I am also able to provide legal aid through the firms I work with',
  calUrl: 'https://cal.com/astonslaw/callback?overlayCalendar=true',
} as const
