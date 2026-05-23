// Static site chrome — verbatim markup from the approved prototype
// (preview/index.html). Injected as-is so the design is byte-faithful.
// Interactivity is attached separately by <SiteBehaviour /> (client).
import { readChrome } from '@/lib/content'

// `display: contents` (via .chrome-mount) makes this wrapper generate no box,
// so injected chrome — e.g. the `position: sticky` header — resolves its
// containing block to <body> rather than to a wrapper the height of one
// element. Without it the sticky header un-sticks the moment the wrapper
// scrolls past, ~73px down the page.
function Raw({ html }: { html: string }) {
  return <div className="chrome-mount" dangerouslySetInnerHTML={{ __html: html }} />
}

export function IconSprite() {
  return <Raw html={readChrome('sprite')} />
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

export function StickyBar() {
  return <Raw html={readChrome('sticky-bar')} />
}

export function QuickExit() {
  return <Raw html={readChrome('quick-exit')} />
}
