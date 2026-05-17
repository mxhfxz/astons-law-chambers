# Technical SEO Plan — Astons Law Chambers

**Written:** 2026-05-13 (Session B, Step 2b)
**Skill used:** seo-technical
**Input files:** .project/planning/03-site-architecture.md
**No conflicts with prior planning files.**

> This document is a pre-build technical SEO plan, not a post-launch audit. No site exists to crawl. All decisions are implementation specifications for the new Next.js 14+ App Router build deployed on Vercel.

---

## 1. Crawlability

### 1.1 Rendering Model

The project brief specifies: all data in `lib/` TypeScript files, no CMS, static content. The correct rendering strategy is **Static Site Generation (SSG)** for every page, including dynamic routes.

| Route | Rendering | Implementation |
|-------|-----------|---------------|
| `/` | Static | Default in App Router |
| `/practice-areas/` | Static | Default in App Router |
| `/practice-areas/[slug]/` | Static | `generateStaticParams()` returning all 10 slugs |
| `/fees/` | Static | Default in App Router |
| `/direct-access/` | Static | Default in App Router |
| `/complaints/` | Static | Default in App Router |
| `/privacy-policy/` | Static | Default in App Router |

All pages must include `export const dynamic = 'force-static'` or omit any dynamic data-fetching pattern. No server-side rendering, no `fetch()` calls with `cache: 'no-store'`. The build output should be a fully static site (all HTML pre-rendered at build time).

### 1.2 robots.txt

Implement via `app/robots.ts` (Next.js App Router `MetadataRoute.Robots`). This generates `/robots.txt` at build time.

**Recommended rules:**

```ts
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      // Block AI model-training crawlers.
      // These rules do not affect Google Search indexing (Googlebot is unaffected).
      // Blocking Google-Extended prevents Gemini training use only — not AI Overviews.
      {
        userAgent: 'GPTBot',
        disallow: ['/'],
      },
      {
        userAgent: 'Google-Extended',
        disallow: ['/'],
      },
      {
        userAgent: 'Bytespider',
        disallow: ['/'],
      },
      {
        userAgent: 'CCBot',
        disallow: ['/'],
      },
    ],
    sitemap: 'https://astonslaw.com/sitemap.xml',
  }
}
```

**Rationale for blocking AI training crawlers:**
A barrister's practice site contains client-adjacent content describing legal situations, tactics, and process. Allowing AI training crawlers to use this content without reciprocal benefit to the site carries no SEO upside. Blocking training crawlers does not affect search indexing or AI Overviews (which use the standard Googlebot).

**Note:** `ChatGPT-User` (OpenAI's browsing crawler) is deliberately not blocked — this allows ChatGPT to cite the site in real-time browsing responses, which provides visibility.

### 1.3 Crawl Depth

All pages are within 2 clicks of the homepage:
- L1 pages: 1 click (Practice Areas, Fees, Direct Access)
- L2 pages: 2 clicks (Practice Areas hub → individual area)
- Footer pages: 1 click from any page (Complaints, Privacy Policy)

No pages are orphaned. See `03-site-architecture.md §5.4`.

### 1.4 JavaScript Rendering

Next.js App Router with SSG outputs HTML at build time. All critical SEO elements (title, meta description, canonical, structured data, robots meta) must be in the server-rendered HTML output — not injected by client-side JavaScript.

Specific requirements:
- Canonical tags: set via `generateMetadata()` — not via `useEffect` or client components
- Structured data: include as `<script type="application/ld+json">` in the server-rendered output using Next.js `generateMetadata()` or a server component
- Robots meta: set via `generateMetadata()` — never via JS injection
- Per December 2025 Google guidance: if raw HTML canonical conflicts with a JS-injected canonical, Google may use either. Keep them identical or use only the server-rendered one.

---

## 2. Indexability

### 2.1 Canonical Strategy

All pages use self-referencing canonical tags. No page should have a non-self canonical (no duplicate content issue exists on this static site).

Canonical implementation via `generateMetadata()`:

```ts
// Example: app/practice-areas/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }) {
  return {
    alternates: {
      canonical: `https://astonslaw.com/practice-areas/${params.slug}/`,
    },
  }
}
```

**Trailing slash decision:** Use consistent trailing slashes throughout. Set `trailingSlash: true` in `next.config.ts`. This ensures `/practice-areas/criminal-defence/` is canonical, not `/practice-areas/criminal-defence`. The architecture in `03-site-architecture.md` uses trailing slashes — this must be enforced by the framework config.

### 2.2 Duplicate Content Risks

On a static site with no CMS, the only duplicate content risks are:
- `www` vs non-`www`: Vercel handles this — configure the primary domain in Vercel dashboard. Non-www should 301 to www (or vice versa — pick one and enforce it). **Recommended:** `www.astonslaw.com` as canonical domain (consistent with most established law firm conventions).
- HTTP vs HTTPS: Vercel enforces HTTPS by default. No action required.
- Trailing vs non-trailing slash: resolved by `trailingSlash: true` in `next.config.ts` + Vercel's automatic redirect for mismatched slashes.

### 2.3 Pages That Must Not Be Indexed

None. All pages on this site should be indexable. There are no staging environments, admin areas, or internal tools exposed at these URLs. The `/complaints/` and `/privacy-policy/` pages are low-traffic but must remain indexable — users search for them directly, and indexing them is a BSB compliance signal.

**Note:** Do not add a `noindex` meta tag to any page on this site.

### 2.4 Thin Content Protocol

The 7-zone structure (800–1,200 words per practice area page) prevents thin content on P0/P1 pages. P2 placeholder pages (Zone 1–2 only) risk thin content. Mitigations:
- P2 pages must include at minimum: headline, one substantive paragraph of 150+ words describing the area, phone + WhatsApp CTAs, and a BSB-compliant disclaimer about fees.
- P2 pages should use `<meta name="robots" content="index, follow">` (the default) — do not noindex them. Thin content at launch is preferable to a noindexed structural gap; the pages will be filled in Phase 2.
- If P2 pages launch at fewer than 300 words, add an honest note: "Full information on [area] is being prepared. Contact Astons Law Chambers directly for urgent matters."

---

## 3. Security

Vercel provides HTTPS and automatic SSL certificate management for all deployed domains. No manual SSL configuration required.

**Required security headers** (implement via `next.config.ts` `headers()` function or `vercel.json`):

| Header | Value | Notes |
|--------|-------|-------|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains` | HSTS — 2-year max-age |
| `X-Content-Type-Options` | `nosniff` | Prevents MIME-type sniffing |
| `X-Frame-Options` | `DENY` | Prevents framing; no iframes needed on this site |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Appropriate for a legal practice site |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Disable unused browser features |
| `Content-Security-Policy` | Define after build — depends on which third-party scripts are included | Start with restrictive policy; expand as needed |

**CSP note:** The project brief restricts third-party scripts in the critical render path. A restrictive CSP is feasible from day one. GSAP and local fonts are self-hosted; no CDN script dependencies are assumed. Define the CSP once the full dependency list is known at build time.

---

## 4. URL Structure

See `03-site-architecture.md §2` for the full URL map. Technical enforcement requirements:

- Hyphens only (no underscores) in all slugs
- All slugs lowercase (enforced by `lib/practice-areas.ts` slug values)
- Consistent trailing slashes (`trailingSlash: true` in `next.config.ts`)
- URL length: all URLs in the architecture are well under 100 characters
- No query parameters for any content pages (static site has none)
- No ID-based URLs

### 4.1 Redirect Implementation (Vercel)

All 301 redirects from the live astonslaw.com URL structure to the new structure are implemented in `vercel.json`. The `vercel.json` redirect format:

```json
{
  "redirects": [
    {
      "source": "/contact/",
      "destination": "/",
      "permanent": true
    },
    {
      "source": "/criminal-defence/",
      "destination": "/practice-areas/criminal-defence/",
      "permanent": true
    },
    {
      "source": "/motoring-law/",
      "destination": "/practice-areas/motoring-law/",
      "permanent": true
    },
    {
      "source": "/regulatory-law/",
      "destination": "/practice-areas/regulatory-law/",
      "permanent": true
    },
    {
      "source": "/proceeds-of-crime/",
      "destination": "/practice-areas/proceeds-of-crime/",
      "permanent": true
    },
    {
      "source": "/extradition/",
      "destination": "/practice-areas/extradition/",
      "permanent": true
    },
    {
      "source": "/immigration/",
      "destination": "/practice-areas/immigration/",
      "permanent": true
    },
    {
      "source": "/inquests/",
      "destination": "/practice-areas/inquests/",
      "permanent": true
    },
    {
      "source": "/family-law/",
      "destination": "/practice-areas/family-law/",
      "permanent": true
    },
    {
      "source": "/civil-litigation/",
      "destination": "/practice-areas/civil-litigation/",
      "permanent": true
    },
    {
      "source": "/licensing/",
      "destination": "/practice-areas/licensing/",
      "permanent": true
    },
    {
      "source": "/about/",
      "destination": "/direct-access/",
      "permanent": true
    },
    {
      "source": "/about-us/",
      "destination": "/direct-access/",
      "permanent": true
    },
    {
      "source": "/contact-us/",
      "destination": "/",
      "permanent": true
    },
    {
      "source": "/blog/",
      "destination": "/",
      "permanent": true
    },
    {
      "source": "/news/",
      "destination": "/",
      "permanent": true
    }
  ]
}
```

**Pre-launch action:** Crawl astonslaw.com and verify exact source URLs against this list. Add any missing source patterns. Redirect chains are not allowed — each source must resolve in one hop. Test all redirects with `curl -I` before going live.

### 4.2 Redirect Chain Prevention

The vercel.json format resolves all redirects as direct 301s. No redirect chains are possible at the Vercel routing layer. However: if source URLs in the crawl are themselves already redirecting on the live site (e.g., `/about` → `/about/` → `/about-us/`), only map the final resolved URL as the source in `vercel.json`.

---

## 5. Mobile Optimisation

Mobile-first indexing is complete (July 2024 — Google indexes all sites exclusively via mobile Googlebot). The Astons site is mobile-first by design brief.

Required technical implementations:

| Requirement | Implementation |
|------------|---------------|
| Viewport meta tag | `<meta name="viewport" content="width=device-width, initial-scale=1">` — included in Next.js root layout by default |
| Touch targets | Minimum 48×48px with 8px spacing — enforce in Tailwind component design |
| Base font size | 16px minimum — enforce in `styles/tokens.css` base typography token |
| No horizontal scroll | Enforced by `max-width: 100%` and `overflow-x: hidden` on root |
| Tap-to-call links | `href="tel:+447922247999"` — not plain text numbers |
| WhatsApp deep links | `href="https://wa.me/447922247999"` — not text |

Core Web Vitals targets (from synthesis.md §3):
- LCP: < 2.5s on 4G mobile (Lighthouse mobile audit)
- INP: < 200ms
- CLS: < 0.1
- Lighthouse mobile performance: 90+

LCP strategy: text-first above-fold layout with no hero image. The LCP element will likely be the practice statement headline or phone number — both are text nodes with immediate paint. `next/image` with explicit dimensions on any image prevents CLS.

---

## 6. XML Sitemap Plan

Implement via `app/sitemap.ts` (Next.js App Router `MetadataRoute.Sitemap`). This generates `/sitemap.xml` at build time.

**Structure (all pages, no priority weighting beyond what is natural):**

```ts
// app/sitemap.ts (structure — not implementation, this is a plan)
// Returns all indexable URLs with lastmod = build date

URLs to include:
  - /
  - /practice-areas/
  - /practice-areas/criminal-defence/
  - /practice-areas/motoring-law/
  - /practice-areas/regulatory-law/
  - /practice-areas/proceeds-of-crime/
  - /practice-areas/extradition/
  - /practice-areas/immigration/
  - /practice-areas/inquests/
  - /practice-areas/family-law/
  - /practice-areas/civil-litigation/
  - /practice-areas/licensing/
  - /fees/
  - /direct-access/
  - /complaints/
  - /privacy-policy/

Total: 16 URLs

URLs to exclude from sitemap:
  - None on this site (all pages are indexable)
```

**Priority values:** Do not use arbitrary `<priority>` values. Google ignores them in most cases. Omit `<priority>` from the sitemap.

**Changefreq values:** Omit. This site is static and rarely updated; `changefreq` is unreliable and Google treats it as advisory only.

**Lastmod:** Include `<lastmod>` using the build date. Update on each deployment.

Reference the sitemap in `robots.txt` (see §1.2).

---

## 7. Structured Data

The technical requirement is that structured data is embedded in the server-rendered HTML as `<script type="application/ld+json">` blocks, not injected client-side. In Next.js App Router, the correct implementation is a server component that renders the JSON-LD script tag directly.

The full schema plan (which schema types, which fields, which pages) is in `05-seo-schema-plan.md`. The technical requirement from this plan:

- Structured data must be present in the HTML returned by the Next.js SSG build
- Per December 2025 Google guidance: do not rely on client-side JavaScript to inject structured data
- Validate all structured data with Google's Rich Results Test before launch

---

## 8. IndexNow

IndexNow enables faster indexing on Bing, Yandex, and Naver. For a barrister practice site, Bing matters (professional services searches, UK users on Edge/Bing). Implementation is low-effort.

**Plan:**
- Generate an IndexNow API key
- Host the key file at `https://astonslaw.com/{api-key}.txt`
- Submit key URL to `https://www.bing.com/indexnow`
- Trigger IndexNow pings for the 16 sitemap URLs at first deployment

This is a post-build implementation task, not a build-phase blocker.

---

## 9. Technical SEO Launch Checklist

### Pre-build (plan phase — items for build spec)
- [ ] `trailingSlash: true` confirmed in `next.config.ts`
- [ ] `www.astonslaw.com` confirmed as canonical domain (or non-www if client prefers — pick one)
- [ ] All 16 page URLs confirmed against `03-site-architecture.md`
- [ ] Live site crawl scheduled before deployment

### Build phase
- [ ] `app/robots.ts` — AI crawler blocking rules + sitemap reference
- [ ] `app/sitemap.ts` — all 16 URLs, lastmod = build date
- [ ] Security headers in `next.config.ts` or `vercel.json`
- [ ] `generateMetadata()` on every page: title, description, canonical, OG tags
- [ ] Structured data (JSON-LD) as server component on every page type
- [ ] `generateStaticParams()` on `/practice-areas/[slug]/`
- [ ] Trailing slash consistency enforced (`next.config.ts` + Vercel settings)
- [ ] `next/image` with explicit dimensions on all images

### Pre-launch (before DNS cutover)
- [ ] Live site crawl complete; redirect map verified and finalised
- [ ] `vercel.json` redirect rules tested end-to-end (no chains, no 404s)
- [ ] Vercel domain configuration: canonical domain set, www redirect configured
- [ ] Google Search Console: new property added, sitemap submitted
- [ ] Bing Webmaster Tools: property added, sitemap submitted
- [ ] PageSpeed Insights: LCP < 2.5s, INP < 200ms, CLS < 0.1 confirmed on mobile
- [ ] Rich Results Test: structured data validates on homepage, one practice area page, fees page
- [ ] All 301 redirects tested: `curl -I https://astonslaw.com/contact/` returns 301
- [ ] No `noindex` tags present on any page (confirm with screaming frog or similar)
- [ ] No broken internal links

### Post-launch
- [ ] IndexNow key file hosted and pinged for all 16 URLs
- [ ] GSC coverage report: no indexation errors after 48 hours
- [ ] GSC index coverage: all 16 URLs appear as "Indexed"
