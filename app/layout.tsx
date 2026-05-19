import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import {
  IconSprite,
  SiteHeader,
  SiteFooter,
  StickyPill,
  QuickExit,
} from '@/components/site/chrome'
import { SiteBehaviour } from '@/components/site/SiteBehaviour'
import './preview-tailwind.css'
import './preview-styles.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://astonslaw.com'),
  title: {
    default: 'Astons Law Chambers — Criminal Defence Barrister, London',
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
        <StickyPill />
        <QuickExit />
        <SiteBehaviour />

        {/* Cookie consent — CookieYes CMP + Google Consent Mode v2.
            GA4 storage is denied by default; CookieYes fires the consent
            update when the visitor accepts. "Google Consent Mode" must be
            enabled in the CookieYes dashboard for that update to reach GA4. */}
        <Script id="consent-mode-default" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500,
});`}
        </Script>
        <Script
          id="cookieyes"
          strategy="beforeInteractive"
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
gtag('config', 'G-8TDVMH13D7', { send_page_view: true });`}
        </Script>

        {/* cal.com embed loader */}
        <Script id="cal-init" strategy="afterInteractive">
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
Cal.ns.callback("ui", { theme: "light", hideEventTypeDetails: false, layout: "month_view" });`}
        </Script>

      </body>
    </html>
  )
}
