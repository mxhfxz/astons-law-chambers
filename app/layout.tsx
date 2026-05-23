import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import {
  IconSprite,
  SiteHeader,
  SiteFooter,
  StickyBar,
  QuickExit,
} from '@/components/site/chrome'
import { SiteBehaviour } from '@/components/site/SiteBehaviour'
import './preview-tailwind.css'
import './preview-styles.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://astonslaw.com'),
  title: {
    default: 'Criminal Defence Barrister [Direct Access] — London | Astons Law Chambers',
    template: '%s — Astons Law Chambers',
  },
  description:
    "Criminal defence lawyer in London, instructed direct without a solicitor. Police station, Magistrates' and Crown Court representation. Call 07922 247 999.",
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LegalService', 'LocalBusiness'],
      '@id': 'https://astonslaw.com/#organization',
      name: 'Astons Law Chambers',
      description:
        "Criminal defence lawyer and barrister in London, instructed direct under the Bar Standards Board Public Access scheme. Representation at the police station, Magistrates' Court and Crown Court.",
      url: 'https://astonslaw.com',
      telephone: '+447922247999',
      areaServed: ['London', 'England', 'Wales'],
      priceRange: '££',
      image: 'https://astonslaw.com/og-image.png',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '85 Great Portland Street, First Floor',
        addressLocality: 'London',
        postalCode: 'W1W 7LT',
        addressCountry: 'GB',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 51.5203,
        longitude: -0.1437,
      },
      sameAs: [
        'https://share.google/UUmxWclpCyvczjSSS',
        'https://www.linkedin.com/company/astons-law-chambers/',
        'https://uk.trustpilot.com/review/astonslaw.com',
      ],
      founder: { '@id': 'https://astonslaw.com/#principal' },
      employee: { '@id': 'https://astonslaw.com/#principal' },
    },
    {
      '@type': 'Person',
      '@id': 'https://astonslaw.com/#principal',
      name: 'Ghulam Humayun',
      jobTitle: 'Barrister',
      worksFor: { '@id': 'https://astonslaw.com/#organization' },
      knowsAbout: [
        'Criminal defence',
        'Police station representation',
        'Violent crimes',
        'Youth crimes',
        'Driving offences',
        'Drug offences',
        'Criminal appeals',
        'Inquests',
      ],
      // T2.1 (Branch 4, 2026-05-21): Person sameAs grounds the practitioner
      // entity to the regulator-published BSB Register identity — the single
      // safe Person-level sameAs. No personal LinkedIn/X/Inn bio: those expose
      // the practitioner's connection graph, photo, or non-BSB facts (safety
      // baseline). The URL ends in a 32-char content hash, not a slug or bar
      // number, so a major BSB re-index could rotate it. Grep for
      // "0A9C84A0E6BE3846C117FA4B4290EAD2" on a periodic check; if it 404s,
      // replace with the register-search URL used on /home. Same hash also on
      // /about and /authorised-to-conduct-litigation.
      sameAs: [
        'https://www.barstandardsboard.org.uk/barristers-register/0A9C84A0E6BE3846C117FA4B4290EAD2.html',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://astonslaw.com/#website',
      url: 'https://astonslaw.com',
      name: 'Astons Law Chambers',
      publisher: { '@id': 'https://astonslaw.com/#organization' },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://cdn-cookieyes.com" />
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
        <main id="main">{children}</main>
        <SiteFooter />
        <StickyBar />
        <QuickExit />
        <SiteBehaviour />

        {/* Cookie consent — CookieYes CMP + Google Consent Mode v2.
            The consent DEFAULT (storage denied) stays beforeInteractive so
            nothing can store before the page runs — this is what enforces
            compliance, not the timing of the banner script. The CookieYes
            banner script itself is afterInteractive: it is a third-party CDN
            request and does not need to block first paint. It still loads
            right after hydration, shows the banner, and fires the consent
            update on accept. "Google Consent Mode" must be enabled in the
            CookieYes dashboard for that update to reach GA4. */}
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
        <Script
          id="cookieyes"
          strategy="afterInteractive"
          src="https://cdn-cookieyes.com/client_data/d7524e47cae5f257fa8780a88c968ac8/script.js"
        />

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
