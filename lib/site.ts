// Site-level constants. The BSB / Legal Ombudsman links and regulatory copy
// live in the content/ HTML fragments — that is the rendered source of truth.
// A bsb{} block previously sat here but was never wired into any page; a stale
// copy of it caused a 2026-05-17 link fix to be applied to dead code, so it
// was removed. Only `url` is consumed (app/robots.ts).
export const site = {
  name: 'Astons Law Chambers',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://astonslaw.com',
} as const
