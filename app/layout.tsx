import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import {
  IconSprite,
  SiteHeader,
  SiteFooter,
  StickyBar,
  DesktopFab,
} from '@/components/site/chrome'
import { SiteBehaviour } from '@/components/site/SiteBehaviour'
import { ConsentBanner } from '@/components/site/ConsentBanner'
import './preview-tailwind.css'
import './preview-styles.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://astonslaw.com'),
  title: {
    default: 'Criminal Defence London & Nationwide | Legal Aid – Astons Law Chambers',
    template: '%s — Astons Law Chambers',
  },
  description:
    'Criminal defence in London and nationwide. Support for violent crimes, fraud, drug charges and more. Police station representation 24/7. Legal Aid available. Call 07922 247 999.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Astons Law Chambers',
    locale: 'en_GB',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', images: ['/og-image.png'] },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '48x48' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  themeColor: '#0E1628',
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Astons Law Chambers',
    image: 'https://astonslaw.com/logo.png',
    '@id': 'https://astonslaw.com/#organization',
    url: 'https://astonslaw.com',
    telephone: '+447922247999',
    email: 'info@astonslaw.com',
    priceRange: '£ - Fixed-fee structures available',
    description: 'Criminal Defence When It Matters Most. Expert, relentless criminal defence. We challenge the evidence, protect your rights, and fight for your future. Emergency 24/7 criminal defence lawyers in London specialising in serious crime, motoring offences, fraud, and youth defence.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '85 Great Portland Street',
      addressLocality: 'London',
      addressRegion: 'Greater London',
      postalCode: 'W1W 7LT',
      addressCountry: 'GB',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '51.51858477517324',
      longitude: '-0.14254003068235244',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    areaServed: {
      '@type': 'Place',
      name: 'London, UK',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Greater London',
        addressCountry: 'GB',
      },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Criminal defence services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Criminal Defence',
            description: 'Representation from investigation through trial. Magistrates’ and Crown Court.',
            serviceType: 'Criminal defence barrister (direct access), London',
            provider: { '@id': 'https://astonslaw.com/#organization' },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Violent Crimes',
            description: 'Assault, ABH, GBH, affray, robbery. Police station through appeal.',
            serviceType: 'Criminal defence barrister for violent crime allegations, London',
            provider: { '@id': 'https://astonslaw.com/#organization' },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Youth Crimes',
            description: 'Defence for clients under 18. Youth Court procedure and welfare considerations.',
            serviceType: 'Criminal defence barrister for clients under 18, Youth Court, London',
            provider: { '@id': 'https://astonslaw.com/#organization' },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Driving Offences',
            description: 'Drink/drug driving, totting-up, exceptional hardship. Licence-loss work.',
            serviceType: 'Criminal defence barrister for driving offences, London',
            provider: { '@id': 'https://astonslaw.com/#organization' },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Drug Offences',
            description: 'Possession, supply, importation. Forensic and disclosure challenges.',
            serviceType: 'Criminal defence barrister for drug offences, London',
            provider: { '@id': 'https://astonslaw.com/#organization' },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Appeals',
            description: 'Conviction and sentence appeals. Prospects, grounds, hearing.',
            serviceType: 'Criminal appeals barrister, Crown Court and Court of Appeal, London',
            provider: { '@id': 'https://astonslaw.com/#organization' },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Inquests',
            description: 'Family and interested-person representation. Pre-inquest review through hearing.',
            serviceType: "Inquest representation by a barrister, Coroner's Court, London",
            provider: { '@id': 'https://astonslaw.com/#organization' },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Fraud & Financial Crime Defence',
            description: 'Fraud, false representation, money laundering. Digital evidence. Crown Court.',
            serviceType: 'Criminal defence barrister for fraud and financial crime, London',
            provider: { '@id': 'https://astonslaw.com/#organization' },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Sexual Offences Defence',
            description: 'Sexual offence allegations. Pre-charge to Crown Court. Highly sensitive.',
            serviceType: 'Criminal defence barrister for sexual offence allegations, London',
            provider: { '@id': 'https://astonslaw.com/#organization' },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '24/7 Police Station Representation',
            description: 'I am at a Police Station: Know your rights during an interview and find out exactly what the police are—and are not—allowed to ask you. Call for 24/7 Representation.',
            serviceType: 'Criminal Defence',
            provider: { '@id': 'https://astonslaw.com/#organization' },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Legal Aid',
            description: 'If legal aid is the appropriate route, the case is referred to a partner solicitor firm. The referral is made at no cost. The partner firm applies for legal aid on your behalf and runs the case under its contract with the Legal Aid Agency.',
            serviceType: 'Legal Aid',
            provider: { '@id': 'https://astonslaw.com/#organization' },
          },
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '41',
      bestRating: '5',
      worstRating: '1',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+447922247999',
        contactType: 'Emergency Defence Team',
        availableLanguage: 'English',
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59',
        },
      },
    ],
    sameAs: [
      'https://www.linkedin.com/company/astons-law-chambers/',
      'https://www.barstandardsboard.org.uk',
    ],
    knowsAbout: [
      'Criminal Defence',
      'Serious Crime',
      'Motoring Offences',
      'Fraud',
      'Financial Crime',
      'Youth Defence',
      'Inquests',
      'Legal Aid',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can I afford private representation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer transparent, fixed-fee structures for many cases, so you know exactly where you stand from day one. No hidden costs. We also offer Legal Aid.',
        },
      },
      {
        '@type': 'Question',
        name: 'The police want to interview me voluntary. Do I need a lawyer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. What you say in a voluntary interview is evidence. Never attend without legal protection. We can arrange to be there with you.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is it too late to change solicitors?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It is rarely too late. If you are unhappy with your current representation, we can facilitate a seamless transfer of your case immediately.',
        },
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://astonslaw.com/#principal',
    name: 'Ghulam Humayun',
    jobTitle: 'Barrister',
    worksFor: { '@id': 'https://astonslaw.com/#organization' },
    sameAs: [
      'https://www.barstandardsboard.org.uk/barristers-register/0A9C84A0E6BE3846C117FA4B4290EAD2.html',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://astonslaw.com/#website',
    url: 'https://astonslaw.com',
    name: 'Astons Law Chambers',
    publisher: { '@id': 'https://astonslaw.com/#organization' },
  },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        {/* IBM Plex Sans is self-hosted — @font-face is in preview-styles.css,
            served same-origin. No external font request, no Google Fonts chain. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="has-sticky-bar">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-navy-950 focus:text-white focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to content
        </a>

        <IconSprite />
        <SiteHeader />
        <ConsentBanner />
        <main id="main">{children}</main>
        <SiteFooter />
        <StickyBar />
        <DesktopFab />
        <SiteBehaviour />
        <Analytics />

        {/* Google Consent Mode v2 default — storage denied until CMP fires
            an update. Fires beforeInteractive so nothing can store before
            the page runs. The returning-visitor restore script below upgrades
            consent within the 500ms wait_for_update window for users who
            already accepted. */}
        <Script id="consent-mode-default" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'denied',
  personalization_storage: 'denied',
  security_storage: 'granted',
  wait_for_update: 500,
});`}
        </Script>

        {/* Restore consent for returning visitors — runs beforeInteractive so
            the update fires within the 500ms wait_for_update window above.
            The React banner (ConsentBanner.tsx) handles new visitors;
            this handles everyone who already accepted in a prior session. */}
        <Script id="consent-restore" strategy="beforeInteractive">
          {`try {
  var __alcStored = localStorage.getItem('alc_consent_v1');
  if (__alcStored === 'granted') {
    gtag('consent', 'update', {
      analytics_storage: 'granted',
      functionality_storage: 'granted',
      personalization_storage: 'granted',
    });
  }
} catch(e) {}`}
        </Script>

        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8TDVMH13D7"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
gtag('js', new Date());
var __alcGaConfig = { send_page_view: true };
try {
  // Opt-in debug mode via ?gtm_debug=true on any URL — events from this
  // session land in GA4 DebugView immediately. Off by default; no impact
  // on normal visitors. Lets us verify tracking without the Chrome
  // extension. Once set on config, debug_mode is inherited by every
  // subsequent gtag('event', ...) call in the session.
  if (new URLSearchParams(window.location.search).get('gtm_debug') === 'true') {
    __alcGaConfig.debug_mode = true;
  }
} catch (e) { /* SSR / no URL — fall through to default config */ }
gtag('config', 'G-8TDVMH13D7', __alcGaConfig);`}
        </Script>

        {/* cal.com embed loader — lazyOnload: the homepage shows a facade and
            only mounts the calendar on click. The facade handler in
            SiteBehaviour retries for window.Cal for ~4s, so initialising Cal
            during idle (rather than right after hydration) cannot miss it,
            and embed.js no longer loads on every page during the load window. */}
        <Script id="cal-init" strategy="lazyOnload">
          {`(function (C, A, L) {
  let p = function (a, ar) { a.q.push(ar); };
  let d = C.document;
  C.Cal = C.Cal || function () {
    let cal = C.Cal; let ar = arguments;
    if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; }
    if (ar[0] === L) {
      const api = function () { p(api, arguments); };
      const namespace = ar[1]; api.q = api.q || [];
      if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); }
      else p(cal, ar);
      return;
    }
    p(cal, ar);
  };
})(window, "https://app.cal.com/embed/embed.js", "init");
Cal("init", "callback", { origin: "https://cal.com" });
// layout: "column_view" — cro-2026 BE1 / T1.6 default-selected-slot
// move. Column view lists available slots in chronological order with
// the next available pre-emphasised at the top, so the visitor's choice
// is "accept the suggested slot or pick another" rather than "scan a
// month grid and pick a date first". Look-ahead window is unchanged —
// that is the cal.com dashboard "Future bookings limit" setting (kept
// narrow per the safety baseline), independent of the layout option.
Cal.ns.callback("ui", { theme: "light", hideEventTypeDetails: false, layout: "column_view" });`}
        </Script>

      </body>
    </html>
  )
}
