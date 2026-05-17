# Vercel Deployment Configuration Plan — Astons Law Chambers

**Written:** 2026-05-13 (Session C, Step 4f)
**Skill used:** vercel-deployment
**Input files:** .project/planning/03-site-architecture.md, .project/planning/04-seo-technical.md, .project/planning/13-nextjs-scaffold-spec.md

---

## 1. Vercel Project Configuration

| Setting | Value | Notes |
|---------|-------|-------|
| Framework | Next.js | Auto-detected |
| Root directory | `.` (repo root) | Vercel deploys from repo root |
| Build command | `npm run build` | Default Next.js build |
| Output directory | `.next` | Default — no static export override |
| Install command | `npm ci` | Reproducible installs |
| Node.js version | 20.x | LTS; minimum for Next.js 14 |

No `output: 'export'` in `next.config.ts`. Vercel handles App Router natively, generating static pages at build time for all routes without a separate export step.

---

## 2. `vercel.json` Structure

This is a plan for the content of `vercel.json`. The file is created in Phase 1.

```json
{
  "framework": "nextjs",
  "redirects": [...],
  "headers": [...],
  "cleanUrls": true,
  "trailingSlash": true
}
```

### `cleanUrls: true`
Removes `.html` extensions from URLs. Not required for App Router (Next.js handles this), but ensures consistency if any static assets are served.

### `trailingSlash: true`
All URLs have trailing slashes. Must match the canonical strategy in `04-seo-technical.md §3`.

---

## 3. Redirect Rules

Based on `03-site-architecture.md §4`. All redirects are permanent 301s.

**Pre-launch requirement:** Crawl the live astonslaw.com before finalising. The source URLs below are probable based on standard barrister site patterns. Verify exact slugs against the live site crawl output and add any additional redirects found.

```json
{
  "redirects": [
    { "source": "/about/", "destination": "/direct-access/", "permanent": true },
    { "source": "/about-us/", "destination": "/direct-access/", "permanent": true },
    { "source": "/criminal-defence/", "destination": "/practice-areas/criminal-defence/", "permanent": true },
    { "source": "/criminal-defence-barrister/", "destination": "/practice-areas/criminal-defence/", "permanent": true },
    { "source": "/motoring-law/", "destination": "/practice-areas/motoring-law/", "permanent": true },
    { "source": "/motoring-offences/", "destination": "/practice-areas/motoring-law/", "permanent": true },
    { "source": "/regulatory-law/", "destination": "/practice-areas/regulatory-law/", "permanent": true },
    { "source": "/regulatory/", "destination": "/practice-areas/regulatory-law/", "permanent": true },
    { "source": "/proceeds-of-crime/", "destination": "/practice-areas/proceeds-of-crime/", "permanent": true },
    { "source": "/poca/", "destination": "/practice-areas/proceeds-of-crime/", "permanent": true },
    { "source": "/extradition/", "destination": "/practice-areas/extradition/", "permanent": true },
    { "source": "/immigration/", "destination": "/practice-areas/immigration/", "permanent": true },
    { "source": "/immigration-law/", "destination": "/practice-areas/immigration/", "permanent": true },
    { "source": "/inquests/", "destination": "/practice-areas/inquests/", "permanent": true },
    { "source": "/coroner-inquests/", "destination": "/practice-areas/inquests/", "permanent": true },
    { "source": "/family-law/", "destination": "/practice-areas/family-law/", "permanent": true },
    { "source": "/family/", "destination": "/practice-areas/family-law/", "permanent": true },
    { "source": "/civil-litigation/", "destination": "/practice-areas/civil-litigation/", "permanent": true },
    { "source": "/civil/", "destination": "/practice-areas/civil-litigation/", "permanent": true },
    { "source": "/licensing/", "destination": "/practice-areas/licensing/", "permanent": true },
    { "source": "/licensing-law/", "destination": "/practice-areas/licensing/", "permanent": true },
    { "source": "/contact/", "destination": "/", "permanent": true },
    { "source": "/contact-us/", "destination": "/", "permanent": true },
    { "source": "/blog/", "destination": "/", "permanent": true },
    { "source": "/news/", "destination": "/", "permanent": true },
    { "source": "/articles/", "destination": "/", "permanent": true },
    { "source": "/our-fees/", "destination": "/fees/", "permanent": true },
    { "source": "/pricing/", "destination": "/fees/", "permanent": true }
  ]
}
```

**Note on `/fees/`:** If the live site already uses `/fees/` as its slug, no redirect is needed for that specific URL. The redirect from `/our-fees/` and `/pricing/` covers alternative patterns.

---

## 4. Security Headers

Based on `04-seo-technical.md §5`. Implemented as `headers` array in `vercel.json`.

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data:; connect-src 'self';"
        }
      ]
    },
    {
      "source": "/_next/static/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

**CSP note:** If third-party services are added (e.g., analytics), the CSP `connect-src` and `script-src` directives must be updated. Never add third-party scripts to the critical render path — add them as deferred or async at a minimum.

**Font loading note:** `fonts.googleapis.com` and `fonts.gstatic.com` are listed in `style-src` and `font-src`. However, `next/font` loads fonts at build time and inlines the CSS — these CSP entries may not be needed and can be removed post-build if font loading is fully handled via `next/font`. Verify against the production build before removing.

---

## 5. Environment Variables

| Variable | Purpose | Value State |
|----------|---------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL base for `lib/site.ts` and sitemap | TBD — `https://astonslaw.com` is assumed; confirm domain before Phase 7 |
| `NEXT_PUBLIC_CAL_URL` | Cal.com booking URL for CTAs | 🚩 Pending client confirmation |

**No sensitive secrets required.** This is a static marketing site with no database, no authentication, no API calls from the server. All `NEXT_PUBLIC_` variables are safe to expose in the browser bundle.

Vercel environment variable configuration:
- Set in Vercel project dashboard under Settings → Environment Variables.
- Apply to: Production, Preview, Development environments.
- `NEXT_PUBLIC_CAL_URL` is set to empty string until client confirms the URL — the booking CTA renders as hidden or disabled until the value is populated.

---

## 6. Build Output and Caching Strategy

### Build Output

Next.js App Router with all static pages pre-renders at build time. Vercel's build process:

1. Runs `npm ci` — installs dependencies from `package-lock.json`.
2. Runs `npm run build` — generates `.next/` output.
3. Deploys static assets to Vercel's CDN.
4. Pre-rendered HTML pages are served from Vercel's edge network.

No Incremental Static Regeneration (ISR) is configured — content changes require a full rebuild. This is correct for a static site with no CMS.

### Cache Headers

| Asset type | Cache-Control | Rationale |
|------------|--------------|-----------|
| `/_next/static/*` | `public, max-age=31536000, immutable` | Hashed filenames — safe to cache forever |
| HTML pages (`/`, `/practice-areas/*`, etc.) | Vercel default: served from edge, revalidated on deploy | Pages update on every deploy |
| `robots.txt`, `sitemap.xml` | Vercel default (`public/` served as static files) | Short-lived enough for deploy cadence |

Vercel automatically handles CDN edge caching for Next.js deployments. No additional cache configuration is required beyond the `_next/static` immutable header above.

### Preview Deployments

Vercel creates a preview deployment for every push to a non-main branch. This is the correct workflow for component review before merging to main. The preview deployment URL is auto-generated.

**Note:** 301 redirects defined in `vercel.json` apply to preview deployments as well — this can cause unexpected redirect behaviour during testing. Verify redirects against the production domain only after go-live.

---

## 7. Sitemap and IndexNow

### `public/sitemap.xml`

Static sitemap file generated at build time. 16 URLs as defined in `04-seo-technical.md §7`. Updated manually on every page addition.

Alternatively: generate programmatically using `app/sitemap.ts` (Next.js 14 built-in) which exports a `MetadataRoute.Sitemap` — this is the preferred approach as it stays in sync with the route structure automatically.

### IndexNow

Submit to IndexNow after each deploy to notify Bing (and other IndexNow participants) of updated pages. This can be triggered manually or via a Vercel deploy hook webhook. Configuration is a Phase 7 pre-launch task — see `04-seo-technical.md §8`.

---

## 8. Domain Configuration

- Primary domain: `astonslaw.com` (confirm with client — this is the assumed target).
- `www.astonslaw.com` should redirect to `astonslaw.com` (apex). Configure in Vercel Domains settings.
- SSL is automatic via Vercel.
- Domain transfer or DNS update is a client-side action — Claude cannot do this.

**Pre-launch DNS checklist:**
- [ ] Verify apex domain (`astonslaw.com`) points to Vercel.
- [ ] `www` → apex redirect configured in Vercel.
- [ ] SSL certificate provisioned (automatic on Vercel — allow 10 minutes).
- [ ] Test `NEXT_PUBLIC_SITE_URL` matches actual production domain.

---

## 9. Open Items

- 🚩 `NEXT_PUBLIC_CAL_URL` — cal.com URL not confirmed; set to empty until client confirms.
- 🚩 Production domain — assumed `astonslaw.com`; confirm with client before Phase 7.
- Live site crawl required before redirect map is finalised (pre-launch task).
- IndexNow API key registration (Phase 7 pre-launch task).
