import type { Metadata } from 'next'
import { insights, formatInsightDate } from '@/lib/insights'
import { insightsHubJsonLd } from '@/lib/render-insight'

export const metadata: Metadata = {
  title: 'Insights — Criminal Law Articles',
  description:
    'Articles on criminal law and the questions that come up most, from Astons Law Chambers — a criminal defence barrister in London. Call 07922 247 999.',
  alternates: { canonical: '/insights' },
}

export default function InsightsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: insightsHubJsonLd() }}
      />
      <article className="bg-white">
        {/* Hero — dark text-led, matches /guides */}
        <div className="bg-footer text-white">
          <div className="max-w-wide mx-auto px-6 pt-14 pb-12 md:pt-20 md:pb-16">
            <p className="text-sm font-medium text-navy-100/80 tracking-tightish">
              <a href="/" className="hover:text-white">Home</a> &nbsp;/&nbsp; Insights
            </p>
            <p className="mt-6 fluid-eyebrow font-semibold uppercase text-navy-100/80">Insights</p>
            <h1 className="mt-3 fluid-h1 font-semibold tracking-tight2">
              Articles on criminal law and what to do next
            </h1>
            <p className="mt-6 fluid-lead text-navy-100/90 max-w-prose">
              Notes from Astons Law Chambers on criminal law and the questions that come up most.
              If a case is live, the first call is free.
            </p>

            <div className="mt-8 btn-row">
              <a
                href="tel:+447922247999"
                aria-label="Call Astons Law Chambers"
                data-track="call_click"
                data-track-location="insights_hub_hero"
                className="btn btn-lg btn-inverse btn-full"
              >
                <svg className="ico" aria-hidden="true"><use href="#i-phone" /></svg>
                Call now
              </a>
              <a
                href="https://wa.me/447922247999?text=I%20need%20legal%20support%20for..."
                data-track="whatsapp_click"
                data-track-location="insights_hub_hero"
                className="btn btn-lg btn-on-dark btn-full"
              >
                <svg className="ico" aria-hidden="true"><use href="#i-whatsapp" /></svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Article cards */}
        <div className="max-w-wide mx-auto px-6 py-16 md:py-20">
          {insights.length === 0 ? (
            <p className="text-base text-navy-700 leading-relaxed max-w-prose">
              There are no articles yet. In the meantime, the{' '}
              <a href="/guides" className="text-navy-950 underline underline-offset-4 decoration-1 hover:decoration-2">
                guides
              </a>{' '}
              cover arrest, police custody and police interviews.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {insights.map((post) => (
                <a
                  key={post.slug}
                  href={`/insights/${post.slug}`}
                  className="block bg-white border border-grey-300 rounded p-6 md:p-8 hover:bg-offwhite transition-colors group"
                >
                  <p className="text-sm text-grey-600">
                    <time dateTime={post.datePublished}>{formatInsightDate(post.datePublished)}</time>
                  </p>
                  <h2 className="mt-2 text-xl font-semibold tracking-tight2 text-navy-950">{post.title}</h2>
                  <p className="mt-2 text-base text-navy-700 leading-relaxed">{post.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-base font-medium text-navy-950">
                    <span className="underline underline-offset-4 decoration-1 group-hover:decoration-2">Read the article</span>
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:transform-none"
                    >
                      →
                    </span>
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      </article>
    </>
  )
}
