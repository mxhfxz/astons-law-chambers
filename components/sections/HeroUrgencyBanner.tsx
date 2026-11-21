import { homeHero } from '@/lib/home-hero'

/**
 * Sitewide red urgency strip — desktop + mobile copy from lib/home-hero.ts.
 * Mount as first child of every .hero--lead (HomeHero, HTML via WithCharmBar, insights).
 */
export function HeroUrgencyBanner() {
  return (
    <a
      href={homeHero.callHref}
      aria-label={homeHero.callAriaLabel}
      data-track="call_click"
      data-track-location="hero_urgency_banner"
      className="hero-urgency-banner"
    >
      <span className="hero-urgency-banner__desktop">
        {homeHero.leadSupportDesktop}
      </span>
      <span className="hero-urgency-banner__mobile">
        {homeHero.leadSupportMobile}
      </span>
    </a>
  )
}

/** HTML fragment for injection into static section markup (WithCharmBar). */
export function urgencyBannerHtml(): string {
  return [
    `<a href="${homeHero.callHref}" aria-label="${homeHero.callAriaLabel}" data-track="call_click" data-track-location="hero_urgency_banner" class="hero-urgency-banner">`,
    `<span class="hero-urgency-banner__desktop">${homeHero.leadSupportDesktop}</span>`,
    `<span class="hero-urgency-banner__mobile">${homeHero.leadSupportMobile}</span>`,
    `</a>`,
  ].join('')
}
