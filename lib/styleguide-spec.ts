/**
 * Astons Design System — ONLY source of truth for UI work.
 *
 * Visual: /styleguide (unlisted, noindex, no site chrome)
 * Agents: READ THIS + open /styleguide BEFORE any site UI change.
 *
 * The /styleguide page may break OOP (docs UI). The live site must NEVER break OOP —
 * compose only recipes documented here.
 */

export const STYLEGUIDE_PATH = '/styleguide'

export const styleguideMeta = {
  title: 'Astons Design System',
  product: 'Astons Law Chambers',
  version: '1.0',
  status: 'Stable',
  updated: '2026-11-17',
  note: 'Internal. Unlisted · noindex · not in nav/sitemap. Agent contract: styleguideIntent + styleguideHowToUse in this file.',
} as const

/**
 * AGENT CONTRACT — not shown prominently on /styleguide (human catalogue).
 * Agents: read this + the page before any site UI change. Violating a bullet → stop.
 */
export const styleguideIntent = [
  'This page + lib/styleguide-spec.ts are the ONLY source of truth for product UI and for which code may be touched.',
  'Agents start every site action here — before planning, coding, or “quick fixes”.',
  'Product pages must NEVER break OOP: compose only documented Components / Patterns / Chrome recipes.',
  'This /styleguide docs UI MAY break OOP (Carbon chrome, tabs, serif titles). Never copy docs-only patterns into product.',
  'Everything is listed: foundations, components, patterns, chrome, full code map (TS/HTML/CSS/schema/public/config), exceptions, cleanup backlog.',
  'Code tab / code map = the files that implement or feed each recipe. No silent refactor, rename, extract, or delete without unlock.',
  'If it is not on this page, it does not exist for product work — flag the gap; unlock → update this SoT before or with code.',
  'Cleanup backlog holds refactor debt. Feature PRs leave those items alone until a cleanup pass is unlocked.',
  'Copy is read-only unless the user supplies the exact new text.',
] as const

/** AGENT workflow — machine SoT only; not a prominent page section */
export const styleguideHowToUse = [
  'Read styleguideIntent in this file, then open /styleguide.',
  'If you know the file path: look up pathToRecipes (page #path-index) → open those recipe anchors.',
  'If you know the recipe: open #id → read Related + openFirst (recipeGraph) → Code tab paths.',
  'Confirm the target file is on codeInventory. If not → flag gap; do not invent.',
  'Copy exact class strings / tokens. Follow Code-tab / openFirst paths only.',
  'If the item is on cleanupBacklog → leave it unless this task is an unlocked cleanup pass.',
  'Product site: OOP only. Docs page may break OOP — never copy docs chrome into product.',
  'Ship a tandem diff only. Unlock → update this spec + /styleguide in the same edit as code.',
] as const

/* ─── Navigation (Carbon-style IA) ─── */

export const styleguideNav = [
  {
    group: 'Getting started',
    items: [
      { id: 'overview', label: 'Overview' },
      { id: 'architecture', label: 'Architecture' },
      { id: 'path-index', label: 'Path → recipe' },
      { id: 'code-map', label: 'Full code map' },
      { id: 'exceptions', label: 'Documented exceptions' },
      { id: 'cleanup-backlog', label: 'Cleanup backlog' },
    ],
  },
  {
    group: 'Foundations',
    items: [
      { id: 'color', label: 'Color' },
      { id: 'typography', label: 'Typography' },
      { id: 'spacing', label: 'Spacing' },
      { id: 'breakpoints', label: 'Breakpoints' },
      { id: 'conversion', label: 'Conversion paths' },
    ],
  },
  {
    group: 'Components',
    items: [
      { id: 'page', label: 'Page' },
      { id: 'hero', label: 'Hero' },
      { id: 'article-header', label: 'ArticleHeader' },
      { id: 'body', label: 'Body' },
      { id: 'aside', label: 'Aside' },
      { id: 'final-strip', label: 'FinalStrip' },
      { id: 'button', label: 'Button' },
      { id: 'card', label: 'Card' },
      { id: 'home-hero', label: 'HomeHero' },
      { id: 'eligibility-indicator', label: 'EligibilityIndicator' },
      { id: 'consent-banner', label: 'ConsentBanner' },
    ],
  },
  {
    group: 'Patterns',
    items: [
      { id: 'pattern-tldr', label: 'TL;DR blockquote' },
      { id: 'pattern-faq', label: 'FAQ accordion' },
      { id: 'pattern-steps', label: 'Step cards' },
      { id: 'pattern-hero-trust', label: 'Hero trust strip' },
      { id: 'pattern-icon-sprite', label: 'Icon sprite' },
    ],
  },
  {
    group: 'Chrome',
    items: [
      { id: 'site-header', label: 'Site header' },
      { id: 'site-footer', label: 'Site footer' },
      { id: 'sticky-fab', label: 'Sticky bar & FAB' },
      { id: 'site-behaviour', label: 'SiteBehaviour' },
    ],
  },
  {
    group: 'Guidelines',
    items: [
      { id: 'page-map', label: 'Page → class map' },
      { id: 'invariants', label: 'Invariants' },
      { id: 'forbidden', label: 'Do not use' },
      { id: 'accessibility', label: 'Accessibility' },
    ],
  },
] as const

/* ─── Architecture / code wiring ─── */

export const architecture = {
  summary:
    'Static HTML sections + a few TSX pages. Design is an OOP class model in .project/ui-model/. Values ship as Tailwind class strings (precompiled) and tokens.css.',
  pipeline: [
    {
      step: '1. Spec',
      detail: 'This file + /styleguide. Class notes in .project/ui-model/*.md',
    },
    {
      step: '2. Content',
      detail: 'content/sections/<page>.html or content/chrome/<piece>.html',
    },
    {
      step: '3. Bind',
      detail: 'lib/render-*.ts replaces data-bind placeholders; lib/content.ts readSection/readChrome',
    },
    {
      step: '4. Route',
      detail: 'app/**/page.tsx injects HTML via dangerouslySetInnerHTML, or TSX (insights, HomeHero)',
    },
    {
      step: '5. Style',
      detail: 'app/preview-tailwind.css (no JIT) + app/preview-styles.css + styles/tokens.css',
    },
  ],
  keyFiles: [
    { path: 'lib/styleguide-spec.ts', role: 'Design system SoT (this file)' },
    { path: 'app/styleguide/page.tsx', role: 'Visual design system' },
    { path: '→ Full code map', role: 'Every site file is listed under #code-map — do not invent or silently refactor' },
  ],
} as const

/** Status meaning — agents must not "clean up" without unlock */
export type CodeStatus = 'active' | 'legacy' | 'docs'

/**
 * FULL inventory of site code. If a file is not here, it is a gap — flag it.
 * `connects` = OOP component / chrome / foundation it implements or feeds.
 * Tandem law: do not rewrite, rename, extract, or delete these without unlock.
 */
export const codeInventory: {
  group: string
  files: { path: string; role: string; connects: string; status: CodeStatus }[]
}[] = [
  {
    group: 'Design system',
    files: [
      { path: 'lib/styleguide-spec.ts', role: 'Machine SoT — recipes, inventory, invariants', connects: 'SoT', status: 'active' },
      { path: 'app/styleguide/page.tsx', role: 'Visual design system page', connects: 'SoT', status: 'docs' },
      { path: 'app/styleguide/SgTabs.tsx', role: 'Docs tabs (Guidelines/Spec/Code)', connects: 'SoT docs chrome', status: 'docs' },
      { path: 'app/styleguide/styleguide.css', role: 'Docs-only Carbon layout CSS', connects: 'SoT docs chrome', status: 'docs' },
    ],
  },
  {
    group: 'Lib — content & render',
    files: [
      { path: 'lib/content.ts', role: 'readSection / readChrome / withHeroTrust', connects: 'Page / Hero / Chrome', status: 'active' },
      { path: 'lib/render-practice-area.ts', role: 'PA index/detail HTML binds, asides, cards, callouts', connects: 'Body / Aside / Card / FinalStrip', status: 'active' },
      { path: 'lib/render-guide.ts', role: 'Guide detail + guides hub tiles', connects: 'Body / Card / Aside', status: 'active' },
      { path: 'lib/render-insight.ts', role: 'Insight Markdown→HTML + JSON-LD helpers', connects: 'Body / Hero (insights)', status: 'active' },
      { path: 'lib/home-hero.ts', role: 'Homepage hero + form copy/validation strings', connects: 'HomeHero', status: 'active' },
      { path: 'lib/home-charm.ts', role: 'Homepage charm ticker slides (CRO guides/insights)', connects: 'HomeHero', status: 'active' },
    ],
  },
  {
    group: 'Lib — data sources',
    files: [
      { path: 'lib/contact.ts', role: 'ONLY phone / WhatsApp / cal.com source', connects: 'Button CTAs / chrome', status: 'active' },
      { path: 'lib/site.ts', role: 'Site name, canonical URL, BSB/regulatory constants', connects: 'Page / layout meta', status: 'active' },
      { path: 'lib/practice-areas.ts', role: 'Practice area records (slug, titles, body)', connects: 'Page / Card grids', status: 'active' },
      { path: 'lib/sub-practice-areas.ts', role: 'Sub-service records under PA parents', connects: 'Page / Card grids', status: 'active' },
      { path: 'lib/guides.ts', role: 'Guide records', connects: 'Page / Card / Body', status: 'active' },
      { path: 'lib/insights.ts', role: 'Insight records + Markdown bodies', connects: 'Insights pages', status: 'active' },
      { path: 'lib/legal-aid-eligibility.ts', role: 'Eligibility tool copy + decision tree (DRAFT)', connects: 'EligibilityIndicator', status: 'active' },
    ],
  },
  {
    group: 'Lib — forms, analytics, webhooks',
    files: [
      { path: 'lib/web3forms.ts', role: 'Web3Forms endpoint + hCaptcha sitekey + submit', connects: 'HomeHero form', status: 'active' },
      { path: 'lib/analytics.ts', role: 'Page-type / CTA-type / funnel helpers', connects: 'SiteBehaviour / track', status: 'active' },
      { path: 'lib/journey.ts', role: 'sessionStorage journey path for attribution', connects: 'SiteBehaviour / track', status: 'active' },
      { path: 'lib/track.ts', role: 'Client VA track helper (forms + CTAs)', connects: 'HomeHero / SiteBehaviour', status: 'active' },
      { path: 'lib/cal-webhook.ts', role: 'Cal.com webhook verify + event name map (no PII)', connects: 'API cal webhook', status: 'active' },
    ],
  },
  {
    group: 'Components — product',
    files: [
      { path: 'components/sections/HomeHero.tsx', role: 'Homepage Hero media|light panel + message modal + mobile FABs', connects: 'HomeHero / Hero / Card / Button', status: 'active' },
      { path: 'components/sections/HomeCharmBar.tsx', role: 'Home charm bar — BSB + Google + CRO ticker', connects: 'HomeHero', status: 'active' },
      { path: 'components/sections/HomeLeadForm.tsx', role: 'Web3Forms + hCaptcha lead form (message modal)', connects: 'HomeHero', status: 'active' },
      { path: 'components/legal-aid/EligibilityIndicator.tsx', role: 'Interactive eligibility tool', connects: 'EligibilityIndicator / Body', status: 'active' },
      { path: 'components/site/chrome.tsx', role: 'Mounts sprite/header/footer/sticky/FAB HTML', connects: 'Chrome', status: 'active' },
      { path: 'components/site/SiteBehaviour.tsx', role: 'Mega menu, mobile nav, tracking, Cal embed', connects: 'SiteBehaviour / Chrome', status: 'active' },
      { path: 'components/site/ConsentBanner.tsx', role: 'Analytics consent banner', connects: 'ConsentBanner', status: 'active' },
    ],
  },
  {
    group: 'Components — legacy placeholders (do not wire)',
    files: [
      { path: 'components/layout/Header.tsx', role: 'Phase-1 placeholder — UNUSED; real header is content/chrome', connects: '— (legacy)', status: 'legacy' },
      { path: 'components/layout/Footer.tsx', role: 'Phase-1 placeholder — UNUSED', connects: '— (legacy)', status: 'legacy' },
      { path: 'components/layout/StickyBar.tsx', role: 'Phase-1 placeholder — UNUSED; live sticky via chrome.tsx', connects: '— (legacy)', status: 'legacy' },
    ],
  },
  {
    group: 'Hooks — unused (do not wire without unlock)',
    files: [
      { path: 'hooks/useReducedMotion.ts', role: 'prefers-reduced-motion helper — currently unimported', connects: '— (orphan)', status: 'legacy' },
      { path: 'hooks/useStickyBarVisibility.ts', role: 'Sticky visibility helper — currently unimported', connects: '— (orphan)', status: 'legacy' },
    ],
  },
  {
    group: 'App — shell & infra',
    files: [
      { path: 'app/layout.tsx', role: 'Root layout; hides chrome on /styleguide', connects: 'Page shell', status: 'active' },
      { path: 'middleware.ts', role: 'Sets x-pathname for styleguide chrome hide', connects: 'SoT / layout', status: 'active' },
      { path: 'app/not-found.tsx', role: '404 → content/sections/not-found.html', connects: 'ArticleHeader / Body', status: 'active' },
      { path: 'app/robots.ts', role: 'robots.txt; disallows /styleguide', connects: 'SoT', status: 'active' },
      { path: 'app/sitemap.ts', role: 'XML sitemap route list', connects: 'Routes', status: 'active' },
      { path: 'app/api/webhooks/cal/route.ts', role: 'Cal.com BOOKING webhook → Vercel Analytics', connects: 'cal-webhook', status: 'active' },
      { path: 'styles/tokens.css', role: 'Primitive → semantic → component tokens', connects: 'Foundations', status: 'active' },
      { path: 'styles/globals.css', role: 'Global imports / base', connects: 'Foundations', status: 'active' },
      { path: 'app/preview-styles.css', role: 'Buttons, fluid type, hero, insight-body, scoped', connects: 'Button / Hero / Body', status: 'active' },
      { path: 'app/preview-tailwind.css', role: 'Precompiled Tailwind only — no JIT', connects: 'Foundations', status: 'active' },
      { path: 'tailwind.config.ts', role: 'Token bridge for utilities', connects: 'Foundations', status: 'active' },
      { path: 'next.config.mjs', role: 'Next config', connects: 'Infra', status: 'active' },
      { path: 'postcss.config.mjs', role: 'PostCSS config', connects: 'Infra', status: 'active' },
      { path: 'package.json', role: 'Dependencies + scripts', connects: 'Infra', status: 'active' },
      { path: 'vercel.json', role: 'Vercel project config', connects: 'Infra', status: 'active' },
      { path: 'tsconfig.json', role: 'TypeScript config', connects: 'Infra', status: 'active' },
      { path: '.eslintrc.json', role: 'ESLint config', connects: 'Infra', status: 'active' },
    ],
  },
  {
    group: 'App — routes (page.tsx)',
    files: [
      { path: 'app/page.tsx', role: 'Home — HomeHero + home.html', connects: 'HomeHero / Body / FinalStrip', status: 'active' },
      { path: 'app/about/page.tsx', role: 'About', connects: 'Hero / Body / Aside / FinalStrip', status: 'active' },
      { path: 'app/fees/page.tsx', role: 'Fees', connects: 'Hero / Body / Aside / FinalStrip', status: 'active' },
      { path: 'app/direct-access/page.tsx', role: 'Direct access', connects: 'Hero / Body / Aside / FinalStrip', status: 'active' },
      { path: 'app/contact/page.tsx', role: 'Contact — channel Cards', connects: 'Hero / Card / Button', status: 'active' },
      { path: 'app/practice-areas/page.tsx', role: 'PA index', connects: 'Hero / Card / FinalStrip', status: 'active' },
      { path: 'app/practice-areas/[slug]/page.tsx', role: 'PA detail', connects: 'Hero / Body / PracticeAside / FinalStrip', status: 'active' },
      { path: 'app/practice-areas/[slug]/[subslug]/page.tsx', role: 'Sub-service detail', connects: 'Hero / Body / PracticeAside / FinalStrip', status: 'active' },
      { path: 'app/guides/page.tsx', role: 'Guides hub', connects: 'Hero / Card / FinalStrip', status: 'active' },
      { path: 'app/guides/[slug]/page.tsx', role: 'Guide detail', connects: 'Hero / Body / Aside / FinalStrip', status: 'active' },
      { path: 'app/insights/page.tsx', role: 'Insights hub (TSX)', connects: 'Hero / Card / FinalStrip', status: 'active' },
      { path: 'app/insights/[slug]/page.tsx', role: 'Insight article (TSX)', connects: 'Hero / Body / Aside / FinalStrip', status: 'active' },
      { path: 'app/police-station-representation/page.tsx', role: 'Police station', connects: 'Hero / Body / PracticeAside / FinalStrip', status: 'active' },
      { path: 'app/legal-aid/page.tsx', role: 'Legal aid', connects: 'Hero / Body / Aside / FinalStrip', status: 'active' },
      { path: 'app/legal-aid/eligibility/page.tsx', role: 'Eligibility + tool mount', connects: 'Hero / EligibilityIndicator / Aside', status: 'active' },
      { path: 'app/authorised-to-conduct-litigation/page.tsx', role: 'Authorised to conduct litigation', connects: 'Hero / Body / Aside / FinalStrip', status: 'active' },
      { path: 'app/complaints/page.tsx', role: 'Complaints', connects: 'ArticleHeader / Body', status: 'active' },
      { path: 'app/privacy-policy/page.tsx', role: 'Privacy', connects: 'ArticleHeader / Body', status: 'active' },
      { path: 'app/terms-of-engagement/page.tsx', role: 'Terms', connects: 'ArticleHeader / Body', status: 'active' },
      { path: 'app/timescales/page.tsx', role: 'Timescales', connects: 'ArticleHeader / Body / FinalStrip', status: 'active' },
    ],
  },
  {
    group: 'Content — chrome HTML',
    files: [
      { path: 'content/chrome/header.html', role: 'Site header + mega menu markup', connects: 'Site header', status: 'active' },
      { path: 'content/chrome/footer.html', role: 'Site footer markup', connects: 'Site footer', status: 'active' },
      { path: 'content/chrome/sticky-bar.html', role: 'Mobile sticky contact bar', connects: 'Sticky bar & FAB', status: 'active' },
      { path: 'content/chrome/desktop-fab.html', role: 'Desktop contact FAB', connects: 'Sticky bar & FAB', status: 'active' },
      { path: 'content/chrome/sprite.html', role: 'SVG icon sprite', connects: 'Chrome icons', status: 'active' },
      { path: 'content/chrome/hero-trust.html', role: 'Hero BSB/trust strip fragment', connects: 'Hero', status: 'active' },
    ],
  },
  {
    group: 'Content — section HTML',
    files: [
      { path: 'content/sections/home.html', role: 'Home body (grids, situations, Cal, strip)', connects: 'Body / Card / FinalStrip', status: 'active' },
      { path: 'content/sections/about.html', role: 'About body', connects: 'Hero / Body / Aside', status: 'active' },
      { path: 'content/sections/fees.html', role: 'Fees body', connects: 'Hero / Body / Aside', status: 'active' },
      { path: 'content/sections/direct-access.html', role: 'Direct access body', connects: 'Hero / Body / Aside', status: 'active' },
      { path: 'content/sections/contact.html', role: 'Contact channel cards', connects: 'Hero / Card', status: 'active' },
      { path: 'content/sections/practice-areas.html', role: 'PA index body', connects: 'Hero / Card', status: 'active' },
      { path: 'content/sections/pa-detail.html', role: 'PA/sub detail template (bound)', connects: 'Hero / Body / PracticeAside', status: 'active' },
      { path: 'content/sections/guides-index.html', role: 'Guides hub body', connects: 'Hero / Card', status: 'active' },
      { path: 'content/sections/guide-first-24-hours.html', role: 'Guide: first 24 hours', connects: 'Hero / Body / Aside', status: 'active' },
      { path: 'content/sections/guide-voluntary-interview.html', role: 'Guide: voluntary interview', connects: 'Hero / Body / Aside', status: 'active' },
      { path: 'content/sections/police-station.html', role: 'Police station body', connects: 'Hero / Body / PracticeAside', status: 'active' },
      { path: 'content/sections/legal-aid.html', role: 'Legal aid body', connects: 'Hero / Body / Aside', status: 'active' },
      { path: 'content/sections/legal-aid-eligibility.html', role: 'Eligibility page shell + <!--ELIGIBILITY_TOOL-->', connects: 'EligibilityIndicator', status: 'active' },
      { path: 'content/sections/authorised-to-conduct-litigation.html', role: 'Authorised litigation body', connects: 'Hero / Body / Aside', status: 'active' },
      { path: 'content/sections/complaints.html', role: 'Complaints body', connects: 'ArticleHeader / Body', status: 'active' },
      { path: 'content/sections/privacy-policy.html', role: 'Privacy body', connects: 'ArticleHeader / Body', status: 'active' },
      { path: 'content/sections/terms-of-engagement.html', role: 'Terms body', connects: 'ArticleHeader / Body', status: 'active' },
      { path: 'content/sections/timescales.html', role: 'Timescales body', connects: 'ArticleHeader / Body', status: 'active' },
      { path: 'content/sections/not-found.html', role: '404 body', connects: 'ArticleHeader / Body', status: 'active' },
    ],
  },
  {
    group: 'Content — insights Markdown',
    files: [
      {
        path: 'content/insights/first-hearing-magistrates-court.md',
        role: 'Insight body source',
        connects: 'Insights article / render-insight',
        status: 'active',
      },
      {
        path: 'content/insights/no-comment-police-interview.md',
        role: 'Insight body source',
        connects: 'Insights article / render-insight',
        status: 'active',
      },
      {
        path: 'content/insights/released-under-investigation-what-happens-next.md',
        role: 'Insight body source',
        connects: 'Insights article / render-insight',
        status: 'active',
      },
    ],
  },
  {
    group: 'Schema — JSON-LD',
    files: [
      { path: 'schema/about.json', role: 'About JSON-LD', connects: 'about route', status: 'active' },
      { path: 'schema/authorised-to-conduct-litigation.json', role: 'Authorised JSON-LD', connects: 'authorised route', status: 'active' },
      { path: 'schema/contact.json', role: 'Contact JSON-LD', connects: 'contact route', status: 'active' },
      { path: 'schema/direct-access.json', role: 'Direct access JSON-LD', connects: 'direct-access route', status: 'active' },
      { path: 'schema/fees.json', role: 'Fees JSON-LD', connects: 'fees route', status: 'active' },
      { path: 'schema/guides.json', role: 'Guides hub JSON-LD', connects: 'guides route', status: 'active' },
      { path: 'schema/guides/first-24-hours-after-arrest.json', role: 'Guide JSON-LD', connects: 'guide detail', status: 'active' },
      { path: 'schema/guides/voluntary-interview.json', role: 'Guide JSON-LD', connects: 'guide detail', status: 'active' },
      { path: 'schema/legal-aid.json', role: 'Legal aid JSON-LD', connects: 'legal-aid route', status: 'active' },
      { path: 'schema/police-station-representation.json', role: 'Police station JSON-LD', connects: 'police-station route', status: 'active' },
      { path: 'schema/practice-areas.json', role: 'PA hub JSON-LD', connects: 'practice-areas route', status: 'active' },
      { path: 'schema/practice-areas/criminal-defence.json', role: 'PA JSON-LD', connects: 'PA detail', status: 'active' },
      { path: 'schema/practice-areas/driving-offences.json', role: 'PA JSON-LD', connects: 'PA detail', status: 'active' },
      { path: 'schema/practice-areas/drug-offences.json', role: 'PA JSON-LD', connects: 'PA detail', status: 'active' },
      { path: 'schema/practice-areas/inquests.json', role: 'PA JSON-LD', connects: 'PA detail', status: 'active' },
      { path: 'schema/practice-areas/violent-crimes.json', role: 'PA JSON-LD', connects: 'PA detail', status: 'active' },
      { path: 'schema/practice-areas/youth-crimes.json', role: 'PA JSON-LD', connects: 'PA detail', status: 'active' },
    ],
  },
  {
    group: 'Public assets',
    files: [
      { path: 'public/logo.png', role: 'Primary logo raster', connects: 'Header / chrome', status: 'active' },
      { path: 'public/Astons_Logo_Icon.png', role: 'Logo icon', connects: 'Chrome / PWA', status: 'active' },
      { path: 'public/bsb-logo.svg', role: 'BSB mark in hero trust', connects: 'Hero trust strip', status: 'active' },
      { path: 'public/favicon.ico', role: 'Favicon', connects: 'layout head', status: 'active' },
      { path: 'public/favicon.svg', role: 'Favicon SVG', connects: 'layout head', status: 'active' },
      { path: 'public/apple-touch-icon.png', role: 'Apple touch icon', connects: 'layout head', status: 'active' },
      { path: 'public/icon-192.png', role: 'PWA icon 192', connects: 'site.webmanifest', status: 'active' },
      { path: 'public/icon-512.png', role: 'PWA icon 512', connects: 'site.webmanifest', status: 'active' },
      { path: 'public/og-image.png', role: 'Default OG image', connects: 'layout meta', status: 'active' },
      { path: 'public/site.webmanifest', role: 'Web app manifest', connects: 'layout head', status: 'active' },
      { path: 'public/llms.txt', role: 'LLM / AI crawler hints', connects: 'SEO / public', status: 'active' },
      { path: 'public/BingSiteAuth.xml', role: 'Bing site auth', connects: 'SEO', status: 'active' },
      {
        path: 'public/371c281e8c5d2e3882e2b0d3753fbf385c243140faec5b9a474097a0d11dee09.txt',
        role: 'Domain verification file',
        connects: 'SEO',
        status: 'active',
      },
      { path: 'public/hero_image.webp', role: 'Hero imagery asset', connects: 'Hero (if used)', status: 'active' },
      { path: 'public/images/bg_main.avif', role: 'Background image', connects: 'Visual', status: 'active' },
      {
        path: 'public/images/6932d02135f1b6d14298a74a_AdobeStock_30597838.avif',
        role: 'Stock atmosphere image',
        connects: 'Visual',
        status: 'active',
      },
      { path: 'public/fonts/ibm-plex-sans-400.woff2', role: 'IBM Plex Sans 400', connects: 'Typography', status: 'active' },
      { path: 'public/fonts/ibm-plex-sans-500.woff2', role: 'IBM Plex Sans 500', connects: 'Typography', status: 'active' },
      { path: 'public/fonts/ibm-plex-sans-600.woff2', role: 'IBM Plex Sans 600', connects: 'Typography', status: 'active' },
      { path: 'public/fonts/ibm-plex-sans-700.woff2', role: 'IBM Plex Sans 700', connects: 'Typography', status: 'active' },
      {
        path: 'public/resources/first-24-hours-after-arrest.pdf',
        role: 'Guide PDF download',
        connects: 'Guides',
        status: 'active',
      },
      {
        path: 'public/resources/do-i-need-a-lawyer-at-a-voluntary-police-interview.pdf',
        role: 'Guide PDF download',
        connects: 'Guides',
        status: 'active',
      },
    ],
  },
  {
    group: 'Class notes (.project/ui-model)',
    files: [
      { path: '.project/ui-model/_index.md', role: 'Class catalogue index', connects: 'Class docs', status: 'active' },
      { path: '.project/ui-model/STYLEGUIDE.md', role: 'Class library workflow', connects: 'Class docs', status: 'active' },
      { path: '.project/ui-model/MEASURE.md', role: 'Pointer → styleguide SoT', connects: 'SoT pointer', status: 'active' },
      { path: '.project/ui-model/Invariants.md', role: 'Invariant notes', connects: 'Invariants', status: 'active' },
      { path: '.project/ui-model/AUDIT.md', role: 'Historical audit → cleanup backlog', connects: 'Cleanup backlog', status: 'active' },
      { path: '.project/ui-model/Page.md', role: 'Page class notes', connects: 'Page', status: 'active' },
      { path: '.project/ui-model/Hero.md', role: 'Hero class notes', connects: 'Hero', status: 'active' },
      { path: '.project/ui-model/ArticleHeader.md', role: 'ArticleHeader class notes', connects: 'ArticleHeader', status: 'active' },
      { path: '.project/ui-model/Body.md', role: 'Body class notes', connects: 'Body', status: 'active' },
      { path: '.project/ui-model/Aside.md', role: 'Aside class notes', connects: 'Aside', status: 'active' },
      { path: '.project/ui-model/FinalStrip.md', role: 'FinalStrip class notes', connects: 'FinalStrip', status: 'active' },
      { path: '.project/ui-model/Button.md', role: 'Button class notes', connects: 'Button', status: 'active' },
      { path: '.project/ui-model/Card.md', role: 'Card class notes', connects: 'Card', status: 'active' },
    ],
  },
]

/**
 * Live off-recipe shells. Do not copy into new work.
 * See cleanupBacklog for which of these to migrate when the user unlocks a cleanup pass.
 */
export const documentedExceptions = [
  {
    id: 'nested-situation-row',
    where: 'content/sections/home.html',
    classes: 'bg-white border border-grey-300 rounded p-4 …',
    why: 'Nested link row inside a Card — not a second page Card skin',
    connects: 'Card (parent) only',
  },
  {
    id: 'cal-facade',
    where: 'content/sections/home.html',
    classes: 'rounded-md bg-white ring-1 … shadow-[…] + channel text-2xl title',
    why: 'Interactive Cal booking widget shell — not Body Card chrome (title uses channel rank)',
    connects: 'Home body exception',
  },
  {
    id: 'mega-cta',
    where: 'content/chrome/header.html',
    classes: 'rounded-md navy panel + eligibility tile',
    why: 'Mega menu chrome — not Body Card',
    connects: 'Site header',
  },
  {
    id: 'police-hero-caption',
    where: 'content/sections/police-station.html',
    classes: 'extra caption under hero CTAs',
    why: 'Off-spec Hero element + operational claim 🚩 — leave until unlock',
    connects: 'Hero (exception)',
  },
  {
    id: 'insight-body-ramp',
    where: 'app/preview-styles.css .insight-body',
    classes: 'rem-based h2/h3/h4',
    why: 'CMS-style article body; parallel to Body.sectionHeading utilities',
    connects: 'Body (insights)',
  },
  {
    id: 'home-message-modal',
    where: 'components/sections/HomeHero.tsx + HomeLeadForm.tsx',
    classes: '.hero-lead-form-modal (+ .is-minimized) + square WA btn-secondary icon',
    why: 'Home-only message modal: desktop dock/minimize; mobile fullscreen under header — do not reuse',
    connects: 'HomeHero',
  },
  {
    id: 'home-charm-bar',
    where: 'components/sections/HomeCharmBar.tsx',
    classes: '.home-charm-bar — BSB | Google | full-cell ticker link + text “Learn more”',
    why: 'Home-only under-hero charm bar; trust relocated from hero left — do not reuse as site chrome',
    connects: 'HomeHero',
  },
] as const

/**
 * Refactor debt — items created or left divergent from ONE STYLE.
 * Do NOT migrate in a feature PR. When the user unlocks a cleanup pass, work this list
 * only, migrating to the target recipe. Do not invent a third style while cleaning.
 */
export const cleanupBacklog = [
  {
    id: 'nested-situation-row',
    where: 'content/sections/home.html (situation card inner links)',
    current: 'bg-white … rounded p-4 nested row',
    target: 'Keep as nested exception OR unlock Card nested-row subclass on styleguide',
    blocker: 'Need unlock: exception forever vs promote',
  },
  {
    id: 'cal-facade-shell',
    where: 'content/sections/home.html (Book a callback panel)',
    current: 'rounded-md + ring + shadow widget (title now channel text-2xl)',
    target: 'Stay chrome exception OR unlock named Home Cal facade recipe',
    blocker: 'Shell only — title aligned in cohesion pass',
  },
  {
    id: 'mega-eligibility-tile',
    where: 'content/chrome/header.html',
    current: 'rounded-md border panels (CTA + eligibility)',
    target: 'Stay Site header chrome OR unlock mega-tile recipe',
    blocker: 'Need unlock — chrome vs Card',
  },
  {
    id: 'police-hero-caption',
    where: 'content/sections/police-station.html hero',
    current: 'Extra caption under CTAs + 🚩 operational claim',
    target: 'Remove caption OR unlock as documented Hero hook (copy still needs explicit text if changed)',
    blocker: 'Copy + Hero unlock',
  },
  {
    id: 'insight-body-ramp',
    where: 'app/preview-styles.css .insight-body h2/h3/h4',
    current: 'Rem ramp parallel to utility section scale',
    target: 'Align to Body.sectionHeading / type roles OR document as permanent InsightBody recipe',
    blocker: 'Need unlock',
  },
  {
    id: 'legacy-layout-placeholders',
    where: 'components/layout/Header.tsx, Footer.tsx, StickyBar.tsx',
    current: 'Unused Phase-1 placeholders',
    target: 'Delete after unlock OR keep marked legacy forever',
    blocker: 'Need unlock to delete',
  },
  {
    id: 'orphan-hooks',
    where: 'hooks/useReducedMotion.ts, hooks/useStickyBarVisibility.ts',
    current: 'Unimported',
    target: 'Wire to GSAP/sticky if needed OR delete after unlock',
    blocker: 'Need unlock',
  },
  {
    id: 'hero-band-long-h1',
    where: 'Guide heroes @1024–1200px',
    current: '500px floor; long H1s grow past band',
    target: 'Shorten H1s (copy unlock) OR accept floor-only',
    blocker: 'Copy decision',
  },
  {
    id: 'nav-defence-work-label',
    where: 'content/chrome/header.html mega links',
    current: '"View all defence work" / "All defence work" while nav says Services',
    target: 'User-supplied exact new link text only',
    blocker: 'Copy unlock',
  },
  {
    id: 'docs-sot-pointers',
    where: 'SESSION-HANDOFF.md, AUDIT.md, _index.md start lines',
    current: 'Still say start at STYLEGUIDE.md / MEASURE.md',
    target: 'Point to /styleguide + lib/styleguide-spec.ts',
    blocker: 'Docs cleanup unlock (safe; no product UI)',
  },
  {
    id: 'phase-b-pa-hero-copy',
    where: 'pa-detail / sub-service heroes',
    current: 'Shared / generic hero lines; Phase B per-area lines not started',
    target: 'Per-area hero copy adapted from card summaries — only after user supplies exact text',
    blocker: 'Copy unlock (Phase B)',
  },
] as const

/** Contact / conversion — only approved paths */
export const conversionPaths = [
  { channel: 'Phone', value: '07922 247 999 → tel:+447922247999', source: 'lib/contact.ts' },
  { channel: 'WhatsApp', value: 'wa.me/447922247999', source: 'lib/contact.ts' },
  { channel: 'Booking', value: 'cal.com (confirm URL in lib/contact.ts)', source: 'lib/contact.ts' },
  { channel: 'Lead form', value: 'HomeHero Send a Message → .hero-lead-form-modal (Web3Forms)', source: 'components/sections/HomeLeadForm.tsx' },
] as const

/**
 * Recurring Body / Hero patterns that are not full page-slot classes.
 * Still recipes — compose exactly; do not invent parallels.
 */
export const patterns = [
  {
    id: 'pattern-tldr',
    name: 'TL;DR blockquote',
    summary: 'AEO direct-answer callout. First element of Body main on fees / legal-aid / authorised.',
    guidelines: [
      'Classes: border-l-2 border-navy-950 bg-offwhite pl-5 pr-4 py-4 max-w-prose',
      'Body text inside: text-lg text-navy-700 leading-relaxed (or matching body role).',
      'Do not invent a second callout skin.',
    ],
    code: [
      { label: 'Fees', path: 'content/sections/fees.html', note: 'Legal aid callout' },
      { label: 'Legal aid', path: 'content/sections/legal-aid.html', note: 'TL;DR' },
      { label: 'Authorised', path: 'content/sections/authorised-to-conduct-litigation.html', note: 'TL;DR' },
      { label: 'Notes', path: '.project/ui-model/Body.md', note: 'Documented under Body' },
    ],
  },
  {
    id: 'pattern-faq',
    name: 'FAQ accordion',
    summary: 'Native <details>/<dl> FAQ blocks on police-station, guides, PA pages.',
    guidelines: [
      'Use existing details/dl markup + list-none marker hide in preview-styles.css.',
      'Question weight: font-semibold tracking-tightish.',
      'Do not invent a new accordion component or icon-button FAQ.',
    ],
    code: [
      { label: 'Police', path: 'content/sections/police-station.html', note: 'FAQ dl' },
      { label: 'Guides', path: 'content/sections/guide-*.html', note: 'FAQ blocks' },
      { label: 'CSS', path: 'app/preview-styles.css', note: 'details marker hide' },
    ],
  },
  {
    id: 'pattern-steps',
    name: 'Step cards',
    summary: 'Home “how it works” dark step cards with .step-numeral watermarks.',
    guidelines: [
      'Scoped to home how-it-works; CSS in preview-styles.css (.step-numeral, .step-card).',
      'Do not reuse numerals as a general decoration system on other pages without unlock.',
    ],
    code: [
      { label: 'Home', path: 'content/sections/home.html', note: 'step-card markup' },
      { label: 'CSS', path: 'app/preview-styles.css', note: '.step-numeral / .step-card' },
    ],
  },
  {
    id: 'pattern-hero-trust',
    name: 'Hero trust strip',
    summary: 'BSB logo + reviews row injected under Hero CTAs via withHeroTrust.',
    guidelines: [
      'Fragment: content/chrome/hero-trust.html',
      'Wired by lib/content.ts withHeroTrust — do not hardcode a parallel trust row.',
      'No practitioner portrait.',
    ],
    code: [
      { label: 'HTML', path: 'content/chrome/hero-trust.html', note: 'Fragment' },
      { label: 'Wire', path: 'lib/content.ts', note: 'withHeroTrust' },
      { label: 'CSS', path: 'app/preview-styles.css', note: '.hero-trust*' },
      { label: 'Asset', path: 'public/bsb-logo.svg', note: 'BSB mark' },
    ],
  },
  {
    id: 'pattern-icon-sprite',
    name: 'Icon sprite',
    summary: 'SVG <symbol> sprite for chrome chevrons / WA icons. Mounted once via IconSprite.',
    guidelines: [
      'Only chrome / sticky / FAB / header WA may use icons in contact UI.',
      'Do not add in-page button icons.',
    ],
    code: [
      { label: 'HTML', path: 'content/chrome/sprite.html', note: 'Symbols' },
      { label: 'Mount', path: 'components/site/chrome.tsx', note: 'IconSprite' },
    ],
  },
] as const

export const accessibilityRules = [
  'Touch targets ≥ 44px on interactive controls.',
  'Every GSAP / motion path must respect prefers-reduced-motion (useReducedMotion when wired).',
  'Server-render animated elements at final visible state — never hide pre-hydration for animation.',
  'Focus-visible styles on buttons/links; do not remove outlines without a replacement.',
  'Consent banner and sticky/FAB must remain keyboard reachable.',
  'No practitioner portrait images.',
] as const

/* ─── Foundations ─── */

export const colorPrimitives = [
  {
    group: 'Navy',
    tokens: [
      { token: '--color-navy-950', hex: '#0E1628', tw: 'navy-950', light: false },
      { token: '--color-navy-900', hex: '#16223C', tw: 'navy-900', light: false },
      { token: '--color-navy-800', hex: '#1F2E50', tw: 'navy-800', light: false },
      { token: '--color-navy-700', hex: '#283A64', tw: 'navy-700', light: false },
      { token: '--color-navy-100', hex: '#E8EDF5', tw: 'navy-100', light: true },
    ],
  },
  {
    group: 'Neutral',
    tokens: [
      { token: '--color-white', hex: '#FFFFFF', tw: 'white', light: true },
      { token: '--color-off-white', hex: '#F8F9FB', tw: 'offwhite', light: true },
      { token: '--color-grey-100', hex: '#F3F4F6', tw: 'grey-100', light: true },
      { token: '--color-grey-300', hex: '#D1D5DB', tw: 'grey-300', light: true },
      { token: '--color-grey-600', hex: '#4B5563', tw: 'grey-600', light: false },
      { token: '--color-grey-900', hex: '#111827', tw: 'grey-900', light: false },
    ],
  },
  {
    group: 'Signal',
    tokens: [
      { token: '--color-emergency-500', hex: '#C23616', tw: 'emergency-500', light: false },
      { token: '--color-emergency-600', hex: '#A12B10', tw: 'emergency-600', light: false },
      { token: '--color-whatsapp', hex: '#25D366', tw: 'whatsapp', light: false },
    ],
  },
] as const

export const colorSemantic = [
  { token: '--color-text-primary', maps: 'navy-950' },
  { token: '--color-text-secondary', maps: 'grey-600' },
  { token: '--color-text-inverse', maps: 'white' },
  { token: '--color-bg-base', maps: 'white' },
  { token: '--color-bg-subtle', maps: 'off-white' },
  { token: '--color-bg-dark', maps: 'navy-900' },
  { token: '--color-bg-footer', maps: 'navy-800' },
  { token: '--color-border-default', maps: 'grey-300' },
  { token: '--color-emergency-bg', maps: 'emergency-500' },
] as const

/** Ranked type ladder — lower rank = larger / more dominant. One progression site-wide. */
export const typeLadder = [
  { rank: 1, role: 'Page title', recipe: 'fluid-h1 font-semibold tracking-tight2', note: 'Hero + ArticleHeader' },
  { rank: 2, role: 'Section / FinalStrip', recipe: 'text-3xl md:text-4xl font-semibold tracking-tight2', note: '30→36px' },
  { rank: 3, role: 'Channel card title', recipe: 'text-2xl font-semibold tracking-tightish', note: '24px' },
  { rank: 4, role: 'Feature / callout title', recipe: 'text-xl font-semibold tracking-tight2', note: '20px — never tightish' },
  { rank: 5, role: 'Step title / aside phone', recipe: 'text-lg font-semibold tracking-tightish', note: '18px; steps = pattern-steps only' },
  { rank: 6, role: 'Article / Body intro lead', recipe: 'text-lg … leading-relaxed', note: 'Light intros; Hero uses fluid-lead' },
  { rank: 7, role: 'Body', recipe: 'text-base … leading-relaxed', note: '16px — not fluid-body' },
  { rank: 8, role: 'Channel dense', recipe: 'text-sm … leading-relaxed', note: '14px' },
  { rank: 9, role: 'Eyebrow', recipe: 'text-xs … tracking-[0.12em] uppercase', note: 'Mega may use fluid-eyebrow (chrome only)' },
] as const

export const typeRoles = [
  {
    id: 'hero-title',
    role: 'Page title — Hero',
    classes: 'fluid-h1 font-semibold tracking-tight2',
    size: 'clamp 36→52px',
    sample: 'Criminal Defence Barrister',
    dark: true,
  },
  {
    id: 'article-title',
    role: 'Page title — ArticleHeader',
    classes: 'fluid-h1 font-semibold tracking-tight2',
    size: 'clamp 36→52px (same as Hero)',
    sample: 'Complaints procedure',
    dark: false,
  },
  {
    id: 'section-title',
    role: 'Section title',
    classes: 'text-3xl md:text-4xl font-semibold tracking-tight2',
    size: '30→36px @768',
    sample: 'What to do now',
    dark: false,
  },
  {
    id: 'card-feature',
    role: 'Card title — feature',
    classes: 'text-xl font-semibold tracking-tight2 text-navy-950',
    size: '20px',
    sample: 'Arrested or under investigation',
    dark: false,
  },
  {
    id: 'card-channel',
    role: 'Card title — contact channel',
    classes: 'text-2xl font-semibold tracking-tightish text-navy-950',
    size: '24px',
    sample: 'Book a consultation',
    dark: false,
  },
  {
    id: 'eyebrow',
    role: 'Eyebrow',
    classes: 'text-xs font-semibold tracking-[0.12em] uppercase text-grey-600',
    size: '12px',
    sample: 'WhatsApp',
    dark: false,
  },
  {
    id: 'hero-lead',
    role: 'Hero support line',
    classes: 'fluid-lead',
    size: '~17→21px',
    sample: 'Operating across London, Birmingham, Manchester and other UK cities.',
    dark: true,
  },
  {
    id: 'article-lead',
    role: 'ArticleHeader / Body intro lead',
    classes: 'text-lg text-navy-700 leading-relaxed',
    size: '18px',
    sample: 'How we handle complaints and what to expect.',
    dark: false,
  },
  {
    id: 'body',
    role: 'Body copy',
    classes: 'text-base text-navy-700 leading-relaxed',
    size: '~16px',
    sample: 'Three situations the practice is contacted about most, and what to do in each.',
    dark: false,
  },
  {
    id: 'channel-body',
    role: 'Dense / channel body',
    classes: 'text-sm text-navy-700 leading-relaxed',
    size: '14px',
    sample: 'Outside office hours, or if you prefer to write.',
    dark: false,
  },
  {
    id: 'aside-phone',
    role: 'Aside phone (desktop)',
    classes: 'text-lg font-semibold tracking-tightish text-navy-950',
    size: '18px',
    sample: '07922 247 999',
    dark: false,
  },
] as const

export const trackingOnly = [
  { token: 'tracking-tight2', value: '−0.02em' },
  { token: 'tracking-tightish', value: '−0.01em' },
  { token: 'tracking-[0.12em]', value: '0.12em (eyebrows only)' },
] as const

export const spaceScale = [
  { token: '--space-1', rem: '0.25rem', px: '4px' },
  { token: '--space-2', rem: '0.5rem', px: '8px' },
  { token: '--space-3', rem: '0.75rem', px: '12px' },
  { token: '--space-4', rem: '1rem', px: '16px' },
  { token: '--space-6', rem: '1.5rem', px: '24px' },
  { token: '--space-8', rem: '2rem', px: '32px' },
  { token: '--space-10', rem: '2.5rem', px: '40px' },
  { token: '--space-12', rem: '3rem', px: '48px' },
  { token: '--space-16', rem: '4rem', px: '64px' },
  { token: '--space-20', rem: '5rem', px: '80px' },
  { token: '--space-24', rem: '6rem', px: '96px' },
] as const

export const containers = [
  { name: 'Page width', value: 'max-w-wide (1360px)' },
  { name: 'Page gutter', value: 'px-6 (24px)' },
  { name: 'Prose', value: 'max-w-prose (70ch)' },
  { name: 'FinalStrip column', value: 'max-w-2xl inside wide' },
] as const

export const sectionShells = [
  { name: 'Body', classes: 'max-w-wide mx-auto px-6 py-16 md:py-20' },
  { name: 'ArticleHeader', classes: 'max-w-wide mx-auto px-6 pt-14 pb-10 md:pt-20 md:pb-12' },
  { name: 'FinalStrip inner', classes: 'relative max-w-wide mx-auto px-6 py-16 md:py-24' },
  {
    name: 'Hero left ≥1024',
    classes: 'Live CSS: ~3.5–4rem pad; min-height 500px floor (document reality — no third shell)',
  },
] as const

/** Allowed intra-section margin tokens only — no mt-5 / mt-7 / mb-14 */
export const gapsMargins = [
  { use: 'Body ↔ aside grid', classes: 'gap-10 lg:gap-16' },
  { use: 'Card grids', classes: 'gap-6 only (never gap-4)' },
  { use: 'Section stack', classes: 'space-y-12 or mt-12' },
  { use: 'Heading → para (feature)', classes: 'mt-3' },
  { use: 'Para → para', classes: 'mt-3' },
  { use: 'Para ↔ list / block → button', classes: 'mt-4' },
  { use: 'Channel title → body', classes: 'mt-2' },
  { use: 'Hero / CTA row after copy', classes: 'mt-8 (.btn-row)' },
  { use: 'Minor inline', classes: 'gap-2 / gap-3 only' },
] as const

export const breakpoints = [
  { px: 640, meaning: 'sm — btn-row; phone CTA swap ends' },
  { px: 768, meaning: 'md — section 36px; card p-8; aside phone text' },
  { px: 1024, meaning: 'Hero two-column; home form dark panel; Aside sticky' },
] as const

/* ─── Components (full docs) ─── */

export type ComponentDoc = {
  id: string
  name: string
  status: 'Stable'
  modelFile: string
  summary: string
  guidelines: string[]
  specs: { label: string; value: string }[]
  code: { label: string; path: string; note: string }[]
  toc: string[]
}

export const components: ComponentDoc[] = [
  {
    id: 'page',
    name: 'Page',
    status: 'Stable',
    modelFile: '.project/ui-model/Page.md',
    summary: 'Abstract base every route inherits: Header + Body + optional FinalStrip.',
    guidelines: [
      'Never invent a fourth page shell.',
      'Header is Hero (conversion) or ArticleHeader (legal/utility) only.',
      'FinalStrip omitted on contact and pure legal text pages (see page map).',
    ],
    specs: [
      { label: 'Slots', value: 'header · body · finalStrip?' },
      { label: 'Assignment', value: '_index.md page → class table' },
    ],
    code: [
      { label: 'Model', path: '.project/ui-model/Page.md', note: 'Abstract class' },
      { label: 'Index', path: '.project/ui-model/_index.md', note: 'Page → class map' },
      { label: 'Routes', path: 'app/**/page.tsx', note: 'Compose section HTML or TSX' },
    ],
    toc: ['guidelines', 'specifications', 'code'],
  },
  {
    id: 'hero',
    name: 'Hero',
    status: 'Stable',
    modelFile: '.project/ui-model/Hero.md',
    summary:
      'Light lead hero (white | photo). Book + WA + Message modal. Charm bar under hero. Home 80vh; other pages 60vh.',
    guidelines: [
      'Classes: hero hero--image hero--lead (+ hero--page on non-home).',
      'h1 = fluid-h1 font-semibold tracking-tight2 text-navy-950; lead = fluid-lead text-navy-700.',
      'CTAs: Book btn-primary + WA square + Send a Message (data-open-home-message → HeroMessageDock).',
      'Police-station: urgency banner + Call Now + WhatsApp only.',
      'Charm: .home-charm-bar sitewide; slides via getCharmSlidesForPath (CRO fallback).',
      'Home: data-home-hero, sticky off, 80vh; pages: sticky on, 60vh.',
    ],
    specs: [
      { label: 'Shell', value: 'hero hero--image hero--lead [hero--page]' },
      { label: 'Title', value: 'fluid-h1 font-semibold tracking-tight2 text-navy-950' },
      { label: 'Lead', value: 'fluid-lead text-navy-700 max-w-prose' },
      { label: 'Primary CTA', value: 'btn btn-lg btn-primary btn-full hero-cta-book' },
      { label: 'Message row', value: '.hero-cta-message-row — WA + Send a Message' },
      { label: 'Height', value: 'home calc(80vh-72px); page calc(60vh-72px) @≥1024' },
    ],
    code: [
      { label: 'Model', path: '.project/ui-model/Hero.md', note: 'Class + overrides' },
      { label: 'CSS', path: 'app/preview-styles.css', note: '.hero--lead / .hero--page / charm' },
      { label: 'Modal dock', path: 'components/sections/HeroMessageDock.tsx', note: 'Sitewide Web3Forms modal' },
      { label: 'Charm', path: 'components/sections/HomeCharmBar.tsx', note: '+ lib/home-charm.ts' },
      { label: 'Wire', path: 'components/sections/WithCharmBar.tsx', note: 'HTML split + charm mount' },
      { label: 'Home', path: 'components/sections/HomeHero.tsx', note: '80vh + urgency + FABs' },
    ],
    toc: ['guidelines', 'live-demo', 'specifications', 'code'],
  },
  {
    id: 'article-header',
    name: 'ArticleHeader',
    status: 'Stable',
    modelFile: '.project/ui-model/ArticleHeader.md',
    summary: 'Legacy light header. Legal/utility pages now use Hero (lead) with breadcrumb in the white panel.',
    guidelines: [
      'Former instances (complaints, privacy, terms, timescales, 404, eligibility) → Hero lead + charm (2026-11-21).',
      'h1 = fluid-h1 font-semibold tracking-tight2 — same page-title rank as Hero.',
      'Wrapper: max-w-wide mx-auto px-6 pt-14 pb-10 md:pt-20 md:pb-12.',
      'Do not use on conversion pages — those use Hero.',
    ],
    specs: [
      { label: 'Wrapper', value: 'max-w-wide mx-auto px-6 pt-14 pb-10 md:pt-20 md:pb-12' },
      { label: 'Title', value: 'fluid-h1 font-semibold tracking-tight2' },
    ],
    code: [
      { label: 'Model', path: '.project/ui-model/ArticleHeader.md', note: '' },
      { label: 'Examples', path: 'content/sections/complaints.html', note: 'Also privacy, terms, timescales, not-found' },
    ],
    toc: ['guidelines', 'specifications', 'code'],
  },
  {
    id: 'body',
    name: 'Body',
    status: 'Stable',
    modelFile: '.project/ui-model/Body.md',
    summary: 'Content wrapper under the header. Section heading scale is site-wide.',
    guidelines: [
      'Wrapper: max-w-wide mx-auto px-6 py-16 md:py-20.',
      'Grid: grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16; main lg:col-span-2.',
      'Section h2: text-3xl md:text-4xl font-semibold tracking-tight2 — one scale only.',
      'Intra: heading→para mt-3, para→para mt-3, para↔list mt-4.',
    ],
    specs: [
      { label: 'Wrapper', value: 'max-w-wide mx-auto px-6 py-16 md:py-20' },
      { label: 'Grid', value: 'grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16' },
      { label: 'Section title', value: 'text-3xl md:text-4xl font-semibold tracking-tight2' },
    ],
    code: [
      { label: 'Model', path: '.project/ui-model/Body.md', note: '' },
      { label: 'CMS mirror', path: 'app/preview-styles.css', note: '.insight-body h2 rem ramp' },
    ],
    toc: ['guidelines', 'specifications', 'code'],
  },
  {
    id: 'aside',
    name: 'Aside',
    status: 'Stable',
    modelFile: '.project/ui-model/Aside.md',
    summary: 'Sticky right column. ContactAside (light card CTAs) or PracticeAside (red/navy boxes + related).',
    guidelines: [
      'Card chrome: bg-offwhite border border-grey-300 rounded p-6.',
      'Sticky via .pa-aside @≥1024.',
      'ContactAside: mobile Call btn-primary; desktop phone text + WA/Book secondary.',
      'PracticeAside: emergency or navy CTA box + related + guides (render-practice-area).',
      'Never text-navy-100 on light aside cards.',
    ],
    specs: [
      { label: 'Chrome', value: 'bg-offwhite border border-grey-300 rounded p-6' },
      { label: 'Sticky', value: '.pa-aside @≥1024' },
      { label: 'Buttons', value: 'btn-md btn-primary / btn-secondary (light)' },
    ],
    code: [
      { label: 'Model', path: '.project/ui-model/Aside.md', note: 'ContactAside / PracticeAside' },
      { label: 'PA builder', path: 'lib/render-practice-area.ts', note: 'asideCtaBoxHtml, asideRelatedHtml, asideGuidesHtml' },
      { label: 'CSS', path: 'app/preview-styles.css', note: '.pa-aside, .aside-phone-desktop' },
      { label: 'HTML examples', path: 'content/sections/fees.html', note: 'ContactAside pattern' },
    ],
    toc: ['guidelines', 'live-demo', 'specifications', 'code'],
  },
  {
    id: 'final-strip',
    name: 'FinalStrip',
    status: 'Stable',
    modelFile: '.project/ui-model/FinalStrip.md',
    summary: 'Dark closing CTA strip. Same h2 scale as Body section titles.',
    guidelines: [
      'bg-navy-950 text-white; inner max-w-wide px-6 py-16 md:py-24.',
      'h2: text-3xl md:text-4xl — never md:text-5xl.',
      'Buttons: Call btn-xl btn-inverse; WA/Book btn-lg btn-on-dark.',
      'Second dark band only (with Hero).',
    ],
    specs: [
      { label: 'Shell', value: 'bg-navy-950 text-white' },
      { label: 'Inner', value: 'max-w-wide mx-auto px-6 py-16 md:py-24' },
      { label: 'Title', value: 'text-3xl md:text-4xl font-semibold tracking-tight2' },
    ],
    code: [
      { label: 'Model', path: '.project/ui-model/FinalStrip.md', note: '' },
      { label: 'Examples', path: 'content/sections/home.html', note: 'Closing strip markup' },
    ],
    toc: ['guidelines', 'live-demo', 'specifications', 'code'],
  },
  {
    id: 'button',
    name: 'Button',
    status: 'Stable',
    modelFile: '.project/ui-model/Button.md',
    summary: 'Colour enum + surface rule. Defined in preview-styles.css.',
    guidelines: [
      'Dark surface: btn-inverse (primary), btn-on-dark (secondary).',
      'Light surface: btn-primary, btn-secondary.',
      'Police: btn-emergency / btn-inverse-emergency.',
      'Sizes: sm = header (incl. mobile) · md = aside/channel/light-card/form/tool · lg = hero + FinalStrip secondary · xl = FinalStrip Call only.',
      'Never btn-lg on light Body/Card surfaces.',
      'No in-page icons (sticky/FAB/header WA only).',
    ],
    specs: [
      { label: 'Dark primary', value: 'btn-inverse' },
      { label: 'Dark secondary', value: 'btn-on-dark' },
      { label: 'Light primary', value: 'btn-primary' },
      { label: 'Light secondary', value: 'btn-secondary' },
      { label: 'Sizes', value: 'btn-sm header · btn-md light · btn-lg hero/strip 2° · btn-xl strip Call' },
    ],
    code: [
      { label: 'Model', path: '.project/ui-model/Button.md', note: '' },
      { label: 'CSS', path: 'app/preview-styles.css', note: '.btn-* definitions' },
      { label: 'Contact data', path: 'lib/contact.ts', note: 'hrefs only from here' },
    ],
    toc: ['guidelines', 'live-demo', 'specifications', 'code'],
  },
  {
    id: 'card',
    name: 'Card',
    status: 'Stable',
    modelFile: '.project/ui-model/Card.md',
    summary: 'Canonical light grey surface. Feature title vs contact-channel title.',
    guidelines: [
      'Chrome: bg-offwhite border border-grey-300 rounded p-6 (or md:p-8 comfortable).',
      'Feature/situation/grid: title text-xl tracking-tight2; body mt-3 text-base.',
      'Contact channel: title text-2xl tracking-tightish; body mt-2 text-sm; optional eyebrow.',
      'Linked tile: block + comfortable + h-full hover:bg-white transition-colors group.',
      'Do not invent parallel radius/shadow/fill.',
    ],
    specs: [
      { label: 'Compact', value: 'bg-offwhite border border-grey-300 rounded p-6' },
      { label: 'Comfortable', value: '… p-6 md:p-8' },
      { label: 'Feature title', value: 'text-xl font-semibold tracking-tight2 text-navy-950' },
      { label: 'Channel title', value: 'text-2xl font-semibold tracking-tightish text-navy-950' },
    ],
    code: [
      { label: 'Model', path: '.project/ui-model/Card.md', note: '' },
      { label: 'PA cards', path: 'lib/render-practice-area.ts', note: 'cardHtml, subPageCardHtml' },
      { label: 'Guide cards', path: 'lib/render-guide.ts', note: 'guides hub tiles' },
      { label: 'Home grids', path: 'content/sections/home.html', note: 'Defence + situation cards' },
      { label: 'Contact channels', path: 'content/sections/contact.html', note: 'WA / Book / Phone' },
      { label: 'Insights hub', path: 'app/insights/page.tsx', note: 'asLink tiles' },
    ],
    toc: ['guidelines', 'live-demo', 'specifications', 'code'],
  },
  {
    id: 'home-hero',
    name: 'HomeHero',
    status: 'Stable',
    modelFile: '.project/ui-model/Hero.md',
    summary:
      'Homepage Hero: urgency banner + 40/60 content | media. Mobile: banner → media 20vh → content.',
    guidelines: [
      'Full-width .hero-urgency-banner (emergency-500) on every .hero--lead — HeroUrgencyBanner / WithCharmBar inject; desktop leadSupportDesktop (with number); mobile leadSupportMobile; tel: link.',
      'Desktop: minmax(22rem, 2fr) / minmax(0, 3fr) — ~40/60 wide; content floor wins when shrinking.',
      'Desktop content: bg-offwhite; heading + brand + geography lead. Media yields first.',
      'Mobile ≤1023: banner → media max 20vh → content.',
      'Desktop CTAs: Book btn-lg btn-primary; row = square WA btn-secondary (icon only) + Send a Message opens modal.',
      'Message modal (.hero-lead-form-modal): HeroMessageDock in layout — sitewide via [data-open-home-message].',
      'Desktop ≥1024: dock bottom-left of #desktopFab (aligned bottoms); grows upward; fields scroll; sticky submit stays visible. No backdrop. Close + Minimize. FAB file-plus opens modal; re-click → .is-flash.',
      'Mobile ≤1023: fullscreen below #siteHeader; bar = formHeading + Close × + separator; form below. No minimize.',
      'Modal type (open): navy-950 headings/labels/inputs; navy-700 intro/hint.',
      'Mobile panel: Call + Send a Message; Book via FAB; WA icon in header (hide hero WA square).',
      'Copy from lib/home-hero.ts — read-only.',
      'Trust badges → .home-charm-bar under every hero (sitewide).',
      'Charm: edge-to-edge; BSB+Google = 2fr; ticker = 3fr. Soft 8s fade. Slides = getCharmSlidesForPath (CRO fallback). Desktop “Learn more” underline on hover; mobile #i-arrow-right; mobile BSB/Google height 4rem (64px).',
      'Desktop home: nav + .hero--lead ≥ 80vh → calc(80vh - 72px). Other pages .hero--page → calc(60vh - 72px).',
    ],
    specs: [
      { label: 'Shell', value: 'hero hero--image hero--lead' },
      { label: 'Urgency', value: '.hero-urgency-banner (emergency-500)' },
      { label: 'Content', value: '.hero__panel--content 40%' },
      { label: 'Media', value: '.hero__panel--media 60%' },
      { label: 'Primary CTA', value: 'btn btn-lg btn-primary btn-full' },
      { label: 'Message row', value: '.hero-cta-message-row — WA square + Send a Message' },
      { label: 'Modal', value: '.hero-lead-form-modal / .is-minimized (home-only)' },
      { label: 'Charm bar', value: '.home-charm-bar — BSB | Google | ticker' },
    ],
    code: [
      { label: 'TSX', path: 'components/sections/HomeHero.tsx', note: 'Media + light content + modal + FABs' },
      { label: 'Charm', path: 'components/sections/HomeCharmBar.tsx', note: 'BSB + Google + ticker' },
      { label: 'Charm data', path: 'lib/home-charm.ts', note: 'CRO slide hrefs + titles' },
      { label: 'Form', path: 'components/sections/HomeLeadForm.tsx', note: 'Web3Forms + hCaptcha (modal only)' },
      { label: 'Copy', path: 'lib/home-hero.ts', note: 'Heading / brand / leads / CTA / form strings' },
      { label: 'Route', path: 'app/page.tsx', note: '<HomeHero /> + <HomeCharmBar /> + home.html' },
      { label: 'CSS', path: 'app/preview-styles.css', note: '.hero--lead / .home-charm-bar / modal' },
    ],
    toc: ['guidelines', 'specifications', 'code'],
  },
  {
    id: 'eligibility-indicator',
    name: 'EligibilityIndicator',
    status: 'Stable',
    modelFile: '— (tool; compose Body layout only)',
    summary:
      'Interactive legal-aid eligibility decision tree on /legal-aid/eligibility. Mounted via <!--ELIGIBILITY_TOOL--> split in the section HTML.',
    guidelines: [
      'All visible strings from lib/legal-aid-eligibility.ts — copy read-only / DRAFT flagged there.',
      'Do not invent a parallel card skin for results — use existing light surface recipes.',
      'No analytics on answers/results beyond site-wide delegated clicks.',
      'Do not relocate the tool without updating the HTML split marker + route.',
    ],
    specs: [
      { label: 'Route', value: '/legal-aid/eligibility' },
      { label: 'Mount marker', value: '<!--ELIGIBILITY_TOOL--> in legal-aid-eligibility.html' },
    ],
    code: [
      { label: 'TSX', path: 'components/legal-aid/EligibilityIndicator.tsx', note: 'Client tool' },
      { label: 'Copy/tree', path: 'lib/legal-aid-eligibility.ts', note: 'DRAFT strings + logic' },
      { label: 'Shell', path: 'content/sections/legal-aid-eligibility.html', note: 'Page chrome + marker' },
      { label: 'Route', path: 'app/legal-aid/eligibility/page.tsx', note: 'Split + mount' },
    ],
    toc: ['guidelines', 'specifications', 'code'],
  },
  {
    id: 'consent-banner',
    name: 'ConsentBanner',
    status: 'Stable',
    modelFile: '— (site chrome)',
    summary: 'Analytics cookie consent banner. Site-wide; hidden on /styleguide.',
    guidelines: [
      'Site chrome — not a Body Card.',
      'Do not invent alternate consent UIs or marketing cookie walls.',
      'Hidden with other chrome on /styleguide.',
    ],
    specs: [
      { label: 'Mount', value: 'app/layout.tsx when !isStyleguide' },
    ],
    code: [
      { label: 'TSX', path: 'components/site/ConsentBanner.tsx', note: 'Accept / decline' },
      { label: 'Layout', path: 'app/layout.tsx', note: 'Conditional mount' },
    ],
    toc: ['guidelines', 'specifications', 'code'],
  },
]

export const chromeDocs = [
  {
    id: 'site-header',
    name: 'Site header',
    summary: 'Sticky site nav + mega menu + mobile menu. Not a Body Card.',
    guidelines: [
      'Chrome is not Body Card chrome — do not reuse mega/Cal facade skins as page cards.',
      'Desktop ≥md CTA: Book a call (btn-sm btn-primary) only. No Call / Message in the nav bar.',
      'Icons allowed in header WhatsApp only among in-chrome patterns; not in-page buttons.',
      'Hidden on /styleguide via middleware x-pathname + layout conditional.',
      'Copy in header.html is read-only unless user supplies exact new text.',
    ],
    code: [
      { label: 'Markup', path: 'content/chrome/header.html', note: 'Nav + mega structure' },
      { label: 'Mount', path: 'components/site/chrome.tsx', note: 'SiteHeader' },
      { label: 'Behaviour', path: 'components/site/SiteBehaviour.tsx', note: 'Mega/mobile' },
      { label: 'Hide', path: 'middleware.ts', note: 'x-pathname for /styleguide' },
    ],
  },
  {
    id: 'site-footer',
    name: 'Site footer',
    summary: 'Site-wide footer links and contact.',
    guidelines: [
      'Site-wide only — not a page Body section.',
      'Hidden on /styleguide with the rest of site chrome.',
      'Conversion links resolve through verified contact paths only.',
    ],
    code: [
      { label: 'Markup', path: 'content/chrome/footer.html', note: 'Links + contact' },
      { label: 'Mount', path: 'components/site/chrome.tsx', note: 'SiteFooter' },
    ],
  },
  {
    id: 'sticky-fab',
    name: 'Sticky bar & FAB',
    summary: 'Only allowed icon contact patterns. Homepage sticky disabled; mobile FABs in HomeHero.',
    guidelines: [
      'Only place (with header WA) where icon-in-button contact UI is allowed.',
      'Homepage: sticky bar disabled; HomeHero owns mobile FABs.',
      'Desktop FAB: WhatsApp + file-plus (message). Book is header/hero only. Home intercepts [data-open-home-message] → modal (flash if already open); else /contact.',
      'Do not invent new FAB colours or icon buttons on product pages.',
    ],
    code: [
      { label: 'Mobile sticky', path: 'content/chrome/sticky-bar.html', note: 'Non-home routes' },
      { label: 'Desktop FAB', path: 'content/chrome/desktop-fab.html', note: 'WA + message (file-plus)' },
      { label: 'Home FABs', path: 'components/sections/HomeHero.tsx', note: '.hero-mobile-fabs + modal FAB listen' },
      { label: 'Mount', path: 'components/site/chrome.tsx', note: 'StickyBar + DesktopFab' },
      { label: 'Sprite', path: 'content/chrome/sprite.html', note: 'i-file-plus (Lucide)' },
    ],
  },
  {
    id: 'site-behaviour',
    name: 'SiteBehaviour',
    summary:
      'Client behaviours for chrome: mega/mobile nav, delegated CTA tracking, Cal embed listeners, journey recording.',
    guidelines: [
      'Do not move tracking into page components without unlock.',
      'Journey + analytics helpers live in lib/ — this file wires them to the DOM.',
      'Cal embed events stay here; server truth is app/api/webhooks/cal.',
    ],
    code: [
      { label: 'TSX', path: 'components/site/SiteBehaviour.tsx', note: 'Client behaviours' },
      { label: 'Analytics', path: 'lib/analytics.ts', note: 'page/CTA/funnel types' },
      { label: 'Journey', path: 'lib/journey.ts', note: 'session path' },
      { label: 'Webhook', path: 'app/api/webhooks/cal/route.ts', note: 'Server booking events' },
      { label: 'Webhook helpers', path: 'lib/cal-webhook.ts', note: 'Verify + event map' },
    ],
  },
] as const

export const pageMap = [
  { page: 'home', header: 'Hero (HomeHero)', aside: '—', strip: '✓' },
  { page: 'about, fees, direct-access', header: 'Hero', aside: 'ContactAside', strip: '✓' },
  { page: 'contact', header: 'Hero', aside: 'channel cards', strip: '✗' },
  { page: 'practice-areas, guides-index', header: 'Hero', aside: '—', strip: '✓' },
  { page: 'guides (detail)', header: 'Hero', aside: '— / emergency', strip: '✓' },
  { page: 'pa-detail / sub', header: 'Hero', aside: 'PracticeAside', strip: '✓' },
  { page: 'insights hub', header: 'Hero (TSX)', aside: '—', strip: '✓' },
  { page: 'insights article', header: 'Hero (TSX)', aside: 'ContactAside-style', strip: '✓' },
  { page: 'police-station', header: 'Hero (emergency)', aside: 'PracticeAside', strip: '✓' },
  { page: 'legal-aid, authorised…, eligibility', header: 'Hero', aside: 'ContactAside', strip: '✓' },
  { page: 'complaints, privacy, terms', header: 'ArticleHeader', aside: '—', strip: '✗' },
  { page: 'timescales', header: 'ArticleHeader', aside: '—', strip: '✓' },
] as const

export const invariants = [
  'Approved conversion paths only: tel / wa.me / cal.com / homepage Web3Forms.',
  'Surface ↔ button: dark → inverse/on-dark; light → primary/secondary.',
  'Banding surgical: Hero + ≤1 FinalStrip (or one surgical dark body band).',
  'One section heading scale: text-3xl md:text-4xl.',
  'No in-page button icons (sticky/FAB/header WA only).',
  'Precompiled Tailwind only — no JIT.',
  'Copy is read-only unless user supplies exact new text.',
  'No practitioner portrait. Entity-first.',
  'Tandem change only — no drive-by refactor.',
  'ONE STYLE: this styleguide is SoT; unlock to change recipes.',
  'Full code map lists every file — do not refactor, rename, or delete unlisted or listed files without unlock.',
  'Patterns (TL;DR, FAQ, steps, hero-trust, sprite) are recipes too — compose exactly.',
  'Before any edit: confirm the file is on the code map and the recipe is on this page.',
] as const

export const driftForbidden = [
  { drift: 'md:text-6xl / text-4xl md:text-6xl page title', migrate: 'fluid-h1 (page title rank)' },
  { drift: 'md:text-5xl or extra h2 size', migrate: 'Section title' },
  { drift: 'text-xl + tracking-tightish', migrate: 'Feature title (tight2) or channel (text-2xl tightish)' },
  { drift: 'text-2xl md:text-3xl titles', migrate: 'Channel text-2xl only' },
  { drift: 'fluid-h2 / fluid-h3 / fluid-body in product', migrate: 'typeLadder roles' },
  { drift: 'Card grid gap-4', migrate: 'gap-6' },
  { drift: 'Body section md:py-24 or lg:py-24', migrate: 'Body py-16 md:py-20' },
  { drift: 'mt-5 / mt-7 / mb-14 / random mt-10 on CTAs', migrate: 'mt-2|3|4|8|12 only' },
  { drift: 'btn-lg on light Card/Body/tool', migrate: 'btn-md' },
  { drift: 'New tracking tokens', migrate: 'tight2 / tightish / 0.12em' },
  { drift: 'Card fill bg-white (page tiles)', migrate: 'bg-offwhite Card chrome' },
  { drift: 'rounded-md / shadow as card chrome', migrate: 'rounded + Card border' },
  { drift: 'CSS font-size fighting utilities', migrate: 'Type roles' },
  { drift: 'text-navy-100 on light cards', migrate: 'text-navy-700' },
  { drift: 'New button colours / icon-in-button', migrate: 'Button enum' },
  { drift: 'New hero columns / badges / overlays', migrate: 'Hero only' },
] as const

export const cardRecipes = [
  {
    name: 'Compact (Aside)',
    chrome: 'bg-offwhite border border-grey-300 rounded p-6',
  },
  {
    name: 'Comfortable',
    chrome: 'bg-offwhite border border-grey-300 rounded p-6 md:p-8',
  },
  {
    name: 'Linked tile',
    chrome:
      'block bg-offwhite border border-grey-300 rounded p-6 md:p-8 h-full hover:bg-white transition-colors group',
  },
] as const

export const buttons = {
  dark: { primary: 'btn-inverse', secondary: 'btn-on-dark' },
  light: { primary: 'btn-primary', secondary: 'btn-secondary' },
  sizes: [
    { token: 'btn-sm', use: 'Header CTAs (desktop + mobile)' },
    { token: 'btn-md', use: 'Aside / channel / light Card / form / eligibility tool' },
    { token: 'btn-lg', use: 'Hero + FinalStrip secondary only' },
    { token: 'btn-xl', use: 'FinalStrip Call only' },
  ],
} as const

/* ─── Cross-references (agent efficiency) ───
 * When changing the site: path → recipes, or recipe → related + openFirst files.
 */

export type RecipeGraphEntry = {
  /** Jump links to other styleguide sections (#id) */
  related: string[]
  /** Open these files first when editing this recipe */
  openFirst: string[]
}

export const recipeGraph: Record<string, RecipeGraphEntry> = {
  page: {
    related: ['hero', 'article-header', 'body', 'final-strip', 'page-map'],
    openFirst: ['.project/ui-model/Page.md', '.project/ui-model/_index.md'],
  },
  hero: {
    related: ['button', 'home-hero', 'pattern-hero-trust', 'page', 'conversion'],
    openFirst: ['.project/ui-model/Hero.md', 'app/preview-styles.css', 'content/chrome/hero-trust.html'],
  },
  'article-header': {
    related: ['body', 'page', 'pattern-tldr'],
    openFirst: ['.project/ui-model/ArticleHeader.md', 'content/sections/complaints.html'],
  },
  body: {
    related: ['aside', 'card', 'pattern-tldr', 'pattern-faq', 'page'],
    openFirst: ['.project/ui-model/Body.md', 'content/sections/about.html'],
  },
  aside: {
    related: ['card', 'button', 'body', 'conversion'],
    openFirst: ['.project/ui-model/Aside.md', 'lib/render-practice-area.ts'],
  },
  'final-strip': {
    related: ['button', 'body', 'page', 'conversion'],
    openFirst: ['.project/ui-model/FinalStrip.md', 'content/sections/home.html'],
  },
  button: {
    related: ['hero', 'aside', 'final-strip', 'card', 'conversion', 'sticky-fab'],
    openFirst: ['.project/ui-model/Button.md', 'app/preview-styles.css', 'lib/contact.ts'],
  },
  card: {
    related: ['aside', 'button', 'body', 'home-hero', 'exceptions', 'cleanup-backlog'],
    openFirst: ['.project/ui-model/Card.md', 'content/sections/contact.html', 'content/sections/home.html'],
  },
  'home-hero': {
    related: ['hero', 'card', 'button', 'sticky-fab', 'conversion', 'pattern-hero-trust'],
    openFirst: [
      'components/sections/HomeHero.tsx',
      'lib/home-hero.ts',
      'lib/web3forms.ts',
      'app/preview-styles.css',
    ],
  },
  'eligibility-indicator': {
    related: ['body', 'button', 'card', 'conversion'],
    openFirst: [
      'components/legal-aid/EligibilityIndicator.tsx',
      'lib/legal-aid-eligibility.ts',
      'app/legal-aid/eligibility/page.tsx',
    ],
  },
  'consent-banner': {
    related: ['site-behaviour', 'site-header'],
    openFirst: ['components/site/ConsentBanner.tsx', 'app/layout.tsx'],
  },
  'pattern-tldr': {
    related: ['body', 'article-header'],
    openFirst: ['content/sections/fees.html', '.project/ui-model/Body.md'],
  },
  'pattern-faq': {
    related: ['body', 'aside'],
    openFirst: ['content/sections/police-station.html', 'app/preview-styles.css'],
  },
  'pattern-steps': {
    related: ['body', 'card'],
    openFirst: ['content/sections/home.html', 'app/preview-styles.css'],
  },
  'pattern-hero-trust': {
    related: ['hero', 'home-hero'],
    openFirst: ['content/chrome/hero-trust.html', 'lib/content.ts', 'public/bsb-logo.svg'],
  },
  'pattern-icon-sprite': {
    related: ['site-header', 'sticky-fab', 'button'],
    openFirst: ['content/chrome/sprite.html', 'components/site/chrome.tsx'],
  },
  'site-header': {
    related: ['site-behaviour', 'pattern-icon-sprite', 'conversion', 'exceptions', 'cleanup-backlog'],
    openFirst: ['content/chrome/header.html', 'components/site/chrome.tsx', 'components/site/SiteBehaviour.tsx'],
  },
  'site-footer': {
    related: ['conversion', 'site-header'],
    openFirst: ['content/chrome/footer.html', 'components/site/chrome.tsx', 'lib/contact.ts'],
  },
  'sticky-fab': {
    related: ['button', 'home-hero', 'pattern-icon-sprite', 'conversion'],
    openFirst: [
      'content/chrome/sticky-bar.html',
      'content/chrome/desktop-fab.html',
      'components/sections/HomeHero.tsx',
    ],
  },
  'site-behaviour': {
    related: ['site-header', 'conversion', 'consent-banner'],
    openFirst: [
      'components/site/SiteBehaviour.tsx',
      'lib/analytics.ts',
      'lib/journey.ts',
      'app/api/webhooks/cal/route.ts',
    ],
  },
  color: {
    related: ['typography', 'button', 'card'],
    openFirst: ['styles/tokens.css'],
  },
  typography: {
    related: ['hero', 'body', 'card', 'spacing'],
    openFirst: ['styles/tokens.css', 'app/preview-styles.css'],
  },
  spacing: {
    related: ['body', 'card', 'breakpoints'],
    openFirst: ['lib/styleguide-spec.ts', '.project/ui-model/Body.md'],
  },
  breakpoints: {
    related: ['hero', 'home-hero', 'aside', 'spacing'],
    openFirst: ['app/preview-styles.css'],
  },
  conversion: {
    related: ['button', 'home-hero', 'site-header', 'sticky-fab'],
    openFirst: ['lib/contact.ts', 'lib/web3forms.ts'],
  },
  'page-map': {
    related: ['page', 'hero', 'article-header', 'aside', 'final-strip'],
    openFirst: ['lib/styleguide-spec.ts', '.project/ui-model/_index.md'],
  },
  exceptions: {
    related: ['cleanup-backlog', 'card', 'hero', 'site-header'],
    openFirst: ['lib/styleguide-spec.ts'],
  },
  'cleanup-backlog': {
    related: ['exceptions', 'forbidden', 'card'],
    openFirst: ['lib/styleguide-spec.ts', '.project/ui-model/AUDIT.md'],
  },
  forbidden: {
    related: ['cleanup-backlog', 'card', 'button', 'typography'],
    openFirst: ['lib/styleguide-spec.ts'],
  },
  accessibility: {
    related: ['button', 'consent-banner', 'sticky-fab'],
    openFirst: ['hooks/useReducedMotion.ts', 'components/site/ConsentBanner.tsx'],
  },
}

/** Human labels for recipe #ids (nav + related links) */
export const recipeLabels: Record<string, string> = Object.fromEntries(
  styleguideNav.flatMap((g) => g.items.map((i) => [i.id, i.label])),
)

/** Map free-text "connects" tokens from codeInventory → recipe ids */
const CONNECTS_TO_RECIPE: Record<string, string> = {
  Page: 'page',
  Hero: 'hero',
  HomeHero: 'home-hero',
  ArticleHeader: 'article-header',
  Body: 'body',
  Aside: 'aside',
  ContactAside: 'aside',
  PracticeAside: 'aside',
  FinalStrip: 'final-strip',
  Button: 'button',
  Card: 'card',
  EligibilityIndicator: 'eligibility-indicator',
  ConsentBanner: 'consent-banner',
  Chrome: 'site-header',
  'Site header': 'site-header',
  'Site footer': 'site-footer',
  'Sticky bar & FAB': 'sticky-fab',
  SiteBehaviour: 'site-behaviour',
  Foundations: 'color',
  Typography: 'typography',
  'Hero trust strip': 'pattern-hero-trust',
  'Chrome icons': 'pattern-icon-sprite',
  conversion: 'conversion',
  'HomeHero form': 'home-hero',
  'API cal webhook': 'site-behaviour',
  'cal-webhook': 'site-behaviour',
  SoT: 'overview',
  Invariants: 'invariants',
  'Cleanup backlog': 'cleanup-backlog',
}

function addPathRecipe(
  map: Map<string, Set<string>>,
  path: string,
  recipeId: string,
) {
  if (!path || path.includes('*') || path.startsWith('→')) return
  if (!map.has(path)) map.set(path, new Set())
  map.get(path)!.add(recipeId)
}

/**
 * Reverse index: file path → styleguide recipe anchors.
 * Agents: when editing a path, open these #ids first.
 */
function buildPathToRecipes(): { path: string; recipeIds: string[]; labels: string[] }[] {
  const map = new Map<string, Set<string>>()

  for (const group of codeInventory) {
    for (const f of group.files) {
      const parts = f.connects.split(/[/·,]+/).map((s) => s.trim()).filter(Boolean)
      for (const part of parts) {
        const id =
          CONNECTS_TO_RECIPE[part] ||
          (part.startsWith('Hero') ? 'hero' : undefined) ||
          (part.includes('Card') ? 'card' : undefined) ||
          (part.includes('Aside') ? 'aside' : undefined) ||
          (part.includes('FinalStrip') ? 'final-strip' : undefined) ||
          (part.includes('HomeHero') ? 'home-hero' : undefined) ||
          (part.includes('Eligibility') ? 'eligibility-indicator' : undefined) ||
          (part.includes('Consent') ? 'consent-banner' : undefined) ||
          (part.includes('SiteBehaviour') || part.includes('track') || part.includes('analytics')
            ? 'site-behaviour'
            : undefined) ||
          (part.includes('sticky') || part.includes('FAB') ? 'sticky-fab' : undefined) ||
          (part.includes('header') || part.includes('Header') || part.includes('Chrome')
            ? 'site-header'
            : undefined) ||
          (part.includes('footer') || part.includes('Footer') ? 'site-footer' : undefined) ||
          (part.includes('Button') || part.includes('CTA') ? 'button' : undefined) ||
          (part.includes('Body') ? 'body' : undefined) ||
          (part.includes('Page') ? 'page' : undefined) ||
          (part.includes('render-insight') || part.includes('Insights') ? 'body' : undefined) ||
          (part.includes('Typography') || part.includes('font') ? 'typography' : undefined) ||
          (part.includes('token') || part.includes('Foundations') ? 'color' : undefined)
        if (id) addPathRecipe(map, f.path, id)
      }
      // Always link inventory row to code-map itself for orphans/legacy
      if (f.status === 'legacy') addPathRecipe(map, f.path, 'cleanup-backlog')
    }
  }

  for (const doc of components) {
    for (const c of doc.code) addPathRecipe(map, c.path, doc.id)
  }
  for (const p of patterns) {
    for (const c of p.code) addPathRecipe(map, c.path, p.id)
  }
  for (const c of chromeDocs) {
    for (const row of c.code) addPathRecipe(map, row.path, c.id)
  }
  for (const [id, g] of Object.entries(recipeGraph)) {
    for (const path of g.openFirst) addPathRecipe(map, path, id)
  }

  return [...map.entries()]
    .map(([path, ids]) => {
      const recipeIds = [...ids].sort()
      return {
        path,
        recipeIds,
        labels: recipeIds.map((id) => recipeLabels[id] || id),
      }
    })
    .sort((a, b) => a.path.localeCompare(b.path))
}

export const pathToRecipes = buildPathToRecipes()

export function recipesForPath(path: string): string[] {
  const hit = pathToRecipes.find((r) => r.path === path)
  return hit?.recipeIds ?? []
}
