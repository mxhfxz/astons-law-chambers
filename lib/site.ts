// Phase 1 stub per .project/planning/13-nextjs-scaffold-spec.md §4.
// Fields are confirmed via memory/verified_facts.md unless noted.

export const site = {
  name: 'Astons Law Chambers',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://astonslaw.com',
  // FLAG: meta default description not confirmed; empty until set
  description: '',
  bsb: {
    // Locked phrasing — do not extend (see memory/verified_facts.md "Regulator")
    regulatoryStatement: 'Regulated by the Bar Standards Board',
    registerUrl:
      'https://www.barstandardsboard.org.uk/search-barrister.html',
    publicAccessGuidanceUrl:
      'https://www.barcouncil.org.uk/i-am-a-member-of-the-public/going-to-court/public-access.html',
    // FLAG: BSB number not confirmed; do not fabricate. See memory/verified_facts.md
    // "Confirmed fabrications" section.
  },
  legalOmbudsman: {
    url: 'https://www.legalombudsman.org.uk',
    phone: '0300 555 0333',
  },
} as const
