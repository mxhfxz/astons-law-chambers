import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { insights, getInsight, formatInsightDate } from '@/lib/insights'
import { renderInsightBody, insightJsonLd, imageDimensions } from '@/lib/render-insight'

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }))
}

// Slugs outside generateStaticParams resolve to the 404 page.
export const dynamicParams = false

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const insight = getInsight(params.slug)
  if (!insight) return {}
  return {
    title: { absolute: insight.metaTitle },
    description: insight.metaDescription,
    alternates: { canonical: `/insights/${insight.slug}` },
    openGraph: {
      type: 'article',
      title: insight.metaTitle,
      description: insight.metaDescription,
      ...(insight.heroImage ? { images: [{ url: insight.heroImage }] } : {}),
    },
  }
}

export default async function InsightPage({ params }: { params: { slug: string } }) {
  const insight = getInsight(params.slug)
  if (!insight) notFound()

  const bodyHtml = await renderInsightBody(insight.body)
  const heroDims = insight.heroImage ? imageDimensions(insight.heroImage) : null
  const reviewed = insight.dateModified !== insight.datePublished

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: insightJsonLd(insight) }}
      />
      <article className="bg-white">
        {/* Hero — dark two-column .hero-split, matches every other page */}
        <div className="bg-footer text-white hero-split">
          <div className="hero-split-left">
            <h1 className="fluid-h1 font-semibold tracking-tight2">{insight.title}</h1>
            <p className="mt-6 fluid-lead text-navy-100/90 max-w-prose">{insight.description}</p>

            <div className="mt-8 btn-row">
              <a
                href="https://cal.com/astonslaw/callback?overlayCalendar=true"
                aria-label="Book a consultation with Astons Law Chambers"
                data-track="book_click"
                data-track-location="insight_hero"
                className="btn btn-lg btn-inverse btn-full"
              >
                Book a Free Consultation
              </a>
              <a
                href="tel:+447922247999"
                aria-label="Call Astons Law Chambers"
                data-track="call_click"
                data-track-location="insight_hero"
                className="btn btn-lg btn-on-dark btn-full"
              >
                Call 07922 247 999
              </a>
            </div>
            <p className="mt-4 text-xs text-navy-100/80">
              <a href="https://www.barstandardsboard.org.uk/barristers-register/0A9C84A0E6BE3846C117FA4B4290EAD2.html" className="hover:text-white underline underline-offset-4 decoration-1">Regulated by the Bar Standards Board</a>
            </p>
          </div>
          <div className="hero-split-right">
            {/* eslint-disable-next-line @next/next/no-img-element -- raw <img> matches the site hero pattern; static dimensions prevent CLS. */}
            <img src="/hero_image.webp" alt="" width={720} height={656} fetchPriority="high" className="absolute inset-0 w-full h-full object-cover object-center" />
          </div>
        </div>

        {/* Body */}
        <div className="max-w-wide mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
            <div className="lg:col-span-2">
              {insight.heroImage && (
                // eslint-disable-next-line @next/next/no-img-element -- deliberate: raw <img> keeps the Next Image Optimization API out of the critical path (security posture in .project/security-notes.md) and matches the site's existing image pattern; build-injected width/height prevent CLS.
                <img
                  src={insight.heroImage}
                  alt={insight.heroAlt}
                  width={heroDims?.width}
                  height={heroDims?.height}
                  loading="eager"
                  decoding="async"
                  className="w-full h-auto rounded mb-10"
                />
              )}

              {/* Client-authored body: sanitised, heading-normalised HTML.
                  .insight-body owns all typography (styles/prose.css). */}
              <div className="insight-body" dangerouslySetInnerHTML={{ __html: bodyHtml }} />

              <p className="mt-12 text-sm text-grey-600 leading-relaxed border-t border-grey-300 pt-6">
                Written by {insight.author}, criminal barrister at Astons Law Chambers. Regulated by
                the Bar Standards Board · Direct Access · Litigation Certificate.{' '}
                <time dateTime={insight.datePublished}>Published {formatInsightDate(insight.datePublished)}</time>
                {reviewed && (
                  <>
                    {' · '}
                    <time dateTime={insight.dateModified}>last reviewed {formatInsightDate(insight.dateModified)}</time>
                  </>
                )}
                . This article is general information, not legal advice for a specific case.
              </p>
            </div>

            <div className="space-y-6 pa-aside self-start" data-track-loc="insight_aside">
              <div className="bg-offwhite border border-grey-300 rounded p-6">
                <p className="text-xs font-semibold tracking-[0.12em] uppercase text-grey-600">Speak to a barrister</p>
                <p className="mt-2 text-lg font-semibold tracking-tightish text-navy-950">
                  If a case is live, call 07922 247 999 now for immediate support.
                </p>
                <a
                  href="tel:+447922247999"
                  aria-label="Call Astons Law Chambers"
                  data-track="call_click"
                  data-track-location="insight_aside"
                  className="btn btn-md btn-primary w-full mt-4"
                >
                  Call 07922 247 999
                </a>
              </div>
              <div className="bg-offwhite border border-grey-300 rounded p-6">
                <p className="text-xs font-semibold tracking-[0.12em] uppercase text-grey-600">More</p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <a href="/insights" className="text-navy-950 underline underline-offset-4 decoration-1 hover:decoration-2">All articles →</a>
                  </li>
                  <li>
                    <a href="/guides" className="text-navy-950 underline underline-offset-4 decoration-1 hover:decoration-2">Guides →</a>
                  </li>
                  <li>
                    <a href="/practice-areas/criminal-defence" className="text-navy-950 underline underline-offset-4 decoration-1 hover:decoration-2">Criminal defence →</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* FINAL CONTACT STRIP — matches every content page (guides/about/etc.) */}
      <div className="relative overflow-hidden bg-navy-950 text-white" data-track-loc="insight_final_strip">
        <svg viewBox="0 0 32 32" aria-hidden="true" className="final-strip-mark">
          <path d="M16 1H32V17C23.1634 17 16 9.83656 16 1Z" />
          <path d="M31.9984 17C31.9993 17 32 17.0007 32 17.0016L32 33L16.0016 33C16.0007 33 16 32.9993 16 32.9984C16 24.1627 23.1627 17 31.9984 17Z" />
          <path d="M16 33L9.53674e-07 33L2.35244e-06 17C8.83656 17 16 24.1634 16 33Z" />
          <path d="M0 17L-6.99382e-07 1L16 1C16 9.83656 8.83656 17 0 17Z" />
        </svg>
        <div className="relative max-w-wide mx-auto px-6 py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="mt-2 text-3xl md:text-5xl font-semibold tracking-tight2 leading-tight">Speak to someone today</h2>
            <p className="mt-4 text-navy-100 leading-relaxed max-w-prose mx-auto">
              Available 24/7 for police station representation. Call or WhatsApp any time.
            </p>
            <div className="mt-8 flex flex-col gap-3 w-full max-w-[300px] mx-auto">
              <a href="tel:+447922247999" aria-label="Call Astons Law Chambers" data-track="call_click" data-track-location="insight_final_strip" className="btn btn-xl btn-inverse w-full flex">
                Call now
              </a>
              <a href="https://wa.me/447922247999?text=I%20need%20legal%20support%20for..." data-track="whatsapp_click" data-track-location="insight_final_strip" className="btn btn-lg btn-on-dark w-full flex">
                Message on WhatsApp
              </a>
              <a href="https://cal.com/astonslaw/callback?overlayCalendar=true" data-track="book_click" data-track-location="insight_final_strip" className="btn btn-lg btn-on-dark w-full flex">
                Book a call
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
