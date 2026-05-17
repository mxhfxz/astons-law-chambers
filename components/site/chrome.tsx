// Static site chrome — verbatim markup from the approved prototype
// (preview/index.html). Injected as-is so the design is byte-faithful.
// Interactivity is attached separately by <SiteBehaviour /> (client).
import { readChrome } from '@/lib/content'

function Raw({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export function IconSprite() {
  return <Raw html={readChrome('sprite')} />
}

export function PoliceBanner() {
  return <Raw html={readChrome('police-banner')} />
}

export function SiteHeader() {
  return <Raw html={readChrome('header')} />
}

export function SiteFooter() {
  return <Raw html={readChrome('footer')} />
}

export function StickyPill() {
  return <Raw html={readChrome('sticky-pill')} />
}

export function QuickExit() {
  return <Raw html={readChrome('quick-exit')} />
}
