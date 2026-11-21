import type { Metadata } from 'next'
import { HomeCharmBar } from '@/components/sections/HomeCharmBar'
import { HeroUrgencyBanner } from '@/components/sections/HeroUrgencyBanner'
import { insights, formatInsightDate } from '@/lib/insights'
import { getCharmSlidesForPath } from '@/lib/home-charm'
import { insightsHubJsonLd } from '@/lib/render-insight'

export const metadata: Metadata = {
  title: { absolute: 'Criminal Law Insights & Articles | Astons Law Chambers' },
  description:
    'Expert commentary and insights on UK criminal law, court procedures, and defence strategies from a specialist London barrister.',
  alternates: { canonical: '/insights' },
}

export default function InsightsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: insightsHubJsonLd() }}
      />
      <section className="hero hero--image hero--lead hero--page">
        <HeroUrgencyBanner />
        <div className="hero__panel hero__panel--content">
          <div className="hero__panel-inner">
            <h1 className="fluid-h1 font-semibold tracking-tight2 text-navy-950">
              Legal Insights
            </h1>
            <div className="mt-8 btn-row hero-cta-stack">
              <a
                href="tel:+447922247999"
                aria-label="Call Astons Law Chambers"
                data-track="call_click"
                data-track-location="insights_hub_hero"
                className="btn btn-lg btn-primary btn-full hero-cta-call"
              >
                Call 07922 247 999
              </a>
              <a
                href="https://cal.com/astonslaw/callback?overlayCalendar=true"
                data-cal-link="astonslaw/callback"
                data-cal-namespace="callback"
                data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                aria-label="Book a consultation with Astons Law Chambers"
                data-track="book_click"
                data-track-location="insights_hub_hero"
                className="btn btn-lg btn-primary btn-full hero-cta-book"
              >
                Book a Free Consultation
              </a>
              <div className="hero-cta-message-row">
                <a
                  href="https://wa.me/447922247999?text=I%20need%20legal%20support%20for..."
                  aria-label="Message Astons Law Chambers on WhatsApp"
                  data-track="whatsapp_click"
                  data-track-location="insights_hub_hero"
                  className="btn btn-lg btn-secondary hero-cta-whatsapp"
                >
                  <svg aria-hidden="true" focusable="false">
                    <use href="#i-whatsapp" />
                  </svg>
                </a>
                <button
                  type="button"
                  aria-label="Send a message to Astons Law Chambers"
                  aria-haspopup="dialog"
                  data-open-home-message
                  data-track-location="insights_hub_hero"
                  className="btn btn-lg btn-secondary btn-full hero-cta-message"
                >
                  Send a Message
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="hero__panel hero__panel--media" aria-hidden="true" />
      </section>
      <HomeCharmBar slides={getCharmSlidesForPath('/insights')} />

      <article className="bg-white">
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
                  className="block bg-offwhite border border-grey-300 rounded p-6 md:p-8 h-full hover:bg-white transition-colors group"
                >
                  <p className="text-sm text-grey-600">
                    <time dateTime={post.datePublished}>{formatInsightDate(post.datePublished)}</time>
                  </p>
                  <h2 className="mt-2 text-xl font-semibold tracking-tight2 text-navy-950">{post.title}</h2>
                  <p className="mt-3 text-base text-navy-700 leading-relaxed">{post.description}</p>
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

      {/* FINAL CONTACT STRIP — matches every content page (guides/about/etc.) */}
      <div className="relative overflow-hidden bg-navy-950 text-white" data-track-loc="insights_hub_final_strip">
        <svg viewBox="0 0 32 32" aria-hidden="true" className="final-strip-mark">
          <path d="M16 1H32V17C23.1634 17 16 9.83656 16 1Z" />
          <path d="M31.9984 17C31.9993 17 32 17.0007 32 17.0016L32 33L16.0016 33C16.0007 33 16 32.9993 16 32.9984C16 24.1627 23.1627 17 31.9984 17Z" />
          <path d="M16 33L9.53674e-07 33L2.35244e-06 17C8.83656 17 16 24.1634 16 33Z" />
          <path d="M0 17L-6.99382e-07 1L16 1C16 9.83656 8.83656 17 0 17Z" />
        </svg>
        <div className="relative max-w-wide mx-auto px-6 py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight2">Speak to someone today</h2>
            <p className="mt-4 text-navy-100 leading-relaxed max-w-prose mx-auto">
              Available 24/7 for police station representation. Call or WhatsApp any time.
            </p>
            <div className="mt-8 flex flex-col gap-3 w-full max-w-[300px] mx-auto">
              <a href="tel:+447922247999" aria-label="Call Astons Law Chambers" data-track="call_click" data-track-location="insights_hub_final_strip" className="btn btn-xl btn-inverse w-full flex">
                Call now
              </a>
              <a href="https://wa.me/447922247999?text=I%20need%20legal%20support%20for..." data-track="whatsapp_click" data-track-location="insights_hub_final_strip" className="btn btn-lg btn-on-dark w-full flex">
                Message on WhatsApp
              </a>
              <a href="https://cal.com/astonslaw/callback?overlayCalendar=true" data-cal-link="astonslaw/callback" data-cal-namespace="callback" data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}' data-track="book_click" data-track-location="insights_hub_final_strip" className="btn btn-lg btn-on-dark w-full flex">
                Book a call
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
