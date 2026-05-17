# Deploy guide — Astons Law Chambers preview to production

Plain steps. Reads top-to-bottom. The site is currently the static SPA at
`preview/index.html`. The Next.js scaffold at the repo root is for a future
production build and is NOT what gets deployed here.

---

## What's been prepared in this branch

- `vercel.json` rewritten for a **static deploy of `preview/`** — no Next.js
  build will run, the framework is set to null, `outputDirectory` points at
  `preview`.
- All legacy URL paths (`/criminal-defence-barrister`, `/motoring-law`, etc.)
  redirect to the equivalent hash form on the new site.
- Real-URL forms of current routes (`/about`, `/fees`, `/contact`, etc.)
  redirect to their hash form so search-result clicks and pasted links land
  on the right content client-side.
- Catch-all rewrite serves `index.html` for any unmatched path — the SPA
  takes over from there.
- Static assets ready: `preview/favicon.svg`, `preview/og-image.svg`.
- Meta tags wired into `<head>`: favicon link, canonical, Open Graph + Twitter
  Card tags pointing at `https://astonslaw.com/`.

---

## What you need before you start

1. A **Vercel account**. Free tier is enough.
2. **Domain access** for `astonslaw.com` — you'll need to add a CNAME or A
   record at your DNS provider when Vercel asks.
3. (Optional) **Vercel CLI installed locally**: `npm i -g vercel` then `vercel
   login`. You can do everything from the web dashboard if you prefer.

---

## Deploy steps

### 1. Create the Vercel project

**Option A — web dashboard (easier):**
1. Go to https://vercel.com/new
2. Import this repo from GitHub
3. When asked for framework: leave as "Other" (or whatever Vercel detects —
   the `framework: null` in `vercel.json` will override it).
4. Build command: leave empty.
5. Output directory: `preview`
6. Click Deploy. First deploy takes about 30 seconds.

**Option B — CLI:**
```bash
cd /Users/mahfuzpholby/Documents/Agency-Work/astons-law-chambers
vercel
# answer prompts: link to a new project, accept the auto-detected settings
# Vercel reads vercel.json so most things will be right
```

You'll get a URL like `astons-law-chambers-xxxx.vercel.app`. Visit it and
confirm:
- Home loads
- Sticky pill bottom-right with the green Call chip
- Practice-area pages render when you click cards
- `#/contact` shows the contact page
- `#/legal-aid` falls through to the 404 page (does NOT show blank)

### 2. Add the custom domain

In the Vercel dashboard:
1. Project Settings → Domains
2. Add `astonslaw.com` and `www.astonslaw.com`
3. Vercel will give you either:
   - An A record value (`76.76.21.21` or similar), OR
   - A CNAME target (`cname.vercel-dns.com`)
4. Add the records at your DNS provider (probably whoever currently hosts
   `astonslaw.com`). Set TTL to 300 (5 minutes) so propagation is fast.
5. Wait for Vercel to confirm — usually 1–10 minutes.

HTTPS certificate is automatic. Don't add one manually.

### 3. Smoke-test the live site

Open the live site and check:
- HTTPS works (URL bar shows the padlock)
- Sticky pill shows "Call 07922 247 999"
- Tap-to-call works on mobile (use phone, not desktop)
- WhatsApp button opens WhatsApp
- Booking button opens the cal.com flow
- Sharing the URL to WhatsApp shows the OG image and title

### 4. (Optional but recommended) Convert the OG image to PNG

The placeholder OG image at `preview/og-image.svg` is SVG. Modern platforms
(WhatsApp, LinkedIn, X, Facebook) accept SVG OG images, but a small number
of older platforms still want PNG. To convert:

- Open `preview/og-image.svg` in a browser, screenshot at 1200×630
- Or use an online SVG-to-PNG converter at 1200×630
- Save as `preview/og-image.png`
- Update the `og:image` and `twitter:image` URLs in `preview/index.html`
  from `og-image.svg` to `og-image.png`
- Re-deploy

The branded version (when you have one designed) should be 1200×630 PNG and
saved at the same path.

---

## What's deliberately NOT in this deploy

The same items from the launch-readiness conversation:

- BSB regulatory links in the footer — hidden until you have
  client-specific URLs.
- About-page facts (year of call, Inn, BSB number) — page still says
  generic things only.
- The Next.js production rebuild — separate phase. Hash routing has
  trade-offs (poor SEO, no real-URL deep-linking, JS-rendered FAQs not
  fully indexed); the Next.js build fixes all of that.
- A sitemap.xml — Vercel serves it as 404 by default, fine for launch but
  should be added with the Next.js rebuild.

**Note:** `preview/robots.txt` currently disallows all crawlers — this is
the **staging** setting to keep the vercel.app URL out of Google. **Before
you go live on `astonslaw.com`**, swap that file for a production version
(`User-agent: *` / `Allow: /` plus a sitemap reference once you have one).

---

## If something breaks

| Symptom | Likely cause | Fix |
|---|---|---|
| 404 on home | `outputDirectory` not set to `preview` | Edit vercel.json, redeploy |
| Blank screen on `/practice-areas/criminal-defence` | Vercel didn't apply the redirects | Confirm vercel.json is committed before deploy |
| CSS not loading | Tailwind CDN blocked by a corporate proxy | This is rare; affects only specific networks. Not a launch blocker. |
| OG image blank on WhatsApp share | Platform doesn't yet support SVG OG | Convert to PNG per step 4 above |
| `astonslaw.com` doesn't resolve | DNS not yet propagated | Wait. Up to 24 hours, usually <1 hour. |

---

## Rollback

If the new site goes live and something is wrong:

1. In Vercel dashboard → Deployments
2. Find the previous-working deployment (or the previous live `astonslaw.com`
   if you set up a redirect from the old host)
3. Click "Promote to Production" on the older deployment

DNS changes mean you can't roll back to the OLD live host without changing
DNS again — keep those records noted somewhere before you cut over.
