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
    title: insight.metaTitle,
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
        {/* Hero — dark text-led, matches /guides */}
        <div className="bg-footer text-white">
          <div className="max-w-wide mx-auto px-6 pt-14 pb-12 md:pt-20 md:pb-16">
            <p className="text-sm font-medium text-navy-100/80 tracking-tightish">
              <a href="/" className="hover:text-white">Home</a> &nbsp;/&nbsp;{' '}
              <a href="/insights" className="hover:text-white">Insights</a> &nbsp;/&nbsp; {insight.title}
            </p>
            <p className="mt-6 fluid-eyebrow font-semibold uppercase text-navy-100/80">Insight</p>
            <h1 className="mt-3 fluid-h1 font-semibold tracking-tight2">{insight.title}</h1>
            <p className="mt-6 fluid-lead text-navy-100/90 max-w-prose">{insight.description}</p>

            <div className="mt-8 btn-row">
              <a
                href="tel:+447922247999"
                aria-label="Call Astons Law Chambers"
                data-track="call_click"
                data-track-location="insight_hero"
                className="btn btn-lg btn-inverse btn-full"
              >
                <svg className="ico" aria-hidden="true"><use href="#i-phone" /></svg>
                Call now
              </a>
              <a
                href="https://wa.me/447922247999?text=I%20need%20legal%20support%20for..."
                data-track="whatsapp_click"
                data-track-location="insight_hero"
                className="btn btn-lg btn-on-dark btn-full"
              >
                <svg className="ico" aria-hidden="true"><use href="#i-whatsapp" /></svg>
                WhatsApp
              </a>
            </div>
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

            <div className="space-y-6 lg:sticky lg:top-28 self-start" data-track-loc="insight_aside">
              <div className="bg-offwhite border border-grey-300 rounded p-6">
                <p className="text-xs font-semibold tracking-[0.12em] uppercase text-grey-600">Speak to a barrister</p>
                <p className="mt-2 text-lg font-semibold tracking-tightish text-navy-950">
                  If a case is live, the first call is free.
                </p>
                <a
                  href="tel:+447922247999"
                  aria-label="Call Astons Law Chambers"
                  data-track="call_click"
                  data-track-location="insight_aside"
                  className="btn btn-md btn-primary w-full mt-4"
                >
                  <svg className="ico" aria-hidden="true"><use href="#i-phone" /></svg>
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
    </>
  )
}
