import { HomeCharmBar } from '@/components/sections/HomeCharmBar'
import { urgencyBannerHtml } from '@/components/sections/HeroUrgencyBanner'
import { getCharmSlidesForPath } from '@/lib/home-charm'

const CHARM_MARKER = '<!-- data-bind="charm-bar" -->'

/** Insert shared urgency banner as first child of the first .hero--lead if missing. */
function ensureUrgencyBanner(html: string): string {
  if (html.includes('hero-urgency-banner')) return html
  return html.replace(
    /(<section\b[^>]*\bhero--lead\b[^>]*>)/i,
    `$1${urgencyBannerHtml()}`,
  )
}

/**
 * Split HTML on the charm-bar marker and mount HomeCharmBar between halves.
 * Ensures every lead hero has the sitewide urgency banner.
 * If the marker is absent, still injects the banner and renders the HTML.
 */
export function WithCharmBar({
  html,
  path,
}: {
  html: string
  path: string
}) {
  const withBanner = ensureUrgencyBanner(html)
  const idx = withBanner.indexOf(CHARM_MARKER)
  if (idx === -1) {
    return <div dangerouslySetInnerHTML={{ __html: withBanner }} />
  }

  const before = withBanner.slice(0, idx)
  const after = withBanner.slice(idx + CHARM_MARKER.length)

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: before }} />
      <HomeCharmBar slides={getCharmSlidesForPath(path)} />
      {after.trim() ? (
        <div dangerouslySetInnerHTML={{ __html: after }} />
      ) : null}
    </>
  )
}
