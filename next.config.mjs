/** @type {import('next').NextConfig} */

// Removed practice areas (criminal-only scope) collapse to /practice-areas.
const removed = [
  'regulatory-law', 'regulatory', 'proceeds-of-crime', 'extradition',
  'immigration-law', 'immigration', 'family-law', 'family',
  'civil-litigation', 'civil', 'licensing-law', 'licensing',
]

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // --- legacy top-level URLs from the previous site ---
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/criminal-defence', destination: '/practice-areas/criminal-defence', permanent: true },
      { source: '/criminal-defence-barrister', destination: '/practice-areas/criminal-defence', permanent: true },
      { source: '/motoring-law', destination: '/practice-areas/driving-offences', permanent: true },
      { source: '/motoring-offences', destination: '/practice-areas/driving-offences', permanent: true },
      { source: '/coroner-inquests', destination: '/practice-areas/inquests', permanent: true },
      { source: '/our-fees', destination: '/fees', permanent: true },
      { source: '/pricing', destination: '/fees', permanent: true },

      // --- legacy /compliance/* silo (recreated as flat top-level pages) ---
      { source: '/compliance/timescales', destination: '/timescales', permanent: true },
      { source: '/compliance/complaints-policy', destination: '/complaints', permanent: true },
      { source: '/compliance/terms-and-transparency-notice', destination: '/terms-of-engagement', permanent: true },
      { source: '/compliance/pricing-and-fees', destination: '/fees', permanent: true },
      { source: '/blog', destination: '/', permanent: true },
      { source: '/news', destination: '/', permanent: true },
      { source: '/articles', destination: '/', permanent: true },
      ...removed.map((s) => ({ source: `/${s}`, destination: '/practice-areas', permanent: true })),

      // --- legacy practice-area slugs ---
      { source: '/practice-areas/motoring-law', destination: '/practice-areas/driving-offences', permanent: true },
      ...removed.map((s) => ({
        source: `/practice-areas/${s}`,
        destination: '/practice-areas',
        permanent: true,
      })),

      // --- legacy /offences/* silo (previous site) — indexed in GSC, now 404.
      //     Intent-matched explicit mappings first; wildcard catch-all last
      //     (Next.js applies the first matching redirect in array order). ---
      { source: '/offences/held-by-police', destination: '/police-station-representation', permanent: true },
      { source: '/offences/immediate-advice', destination: '/police-station-representation', permanent: true },
      { source: '/offences/robbery-armed-robbery', destination: '/practice-areas/violent-crimes', permanent: true },
      { source: '/offences/assault', destination: '/practice-areas/violent-crimes', permanent: true },
      { source: '/offences/murder-manslaughter', destination: '/practice-areas/violent-crimes', permanent: true },
      { source: '/offences/violence-against-emergency-workers', destination: '/practice-areas/violent-crimes', permanent: true },
      { source: '/offences/gang-related-violence', destination: '/practice-areas/violent-crimes', permanent: true },
      { source: '/offences/public-order-offences-affray-riot', destination: '/practice-areas/violent-crimes', permanent: true },
      { source: '/offences/historical-violence-allegations', destination: '/practice-areas/violent-crimes', permanent: true },
      { source: '/offences/court-appearance', destination: '/practice-areas/criminal-defence', permanent: true },
      // POCA / confiscation / tainted gifts were removed from scope — no honest
      // detail page exists, so the hub is the least-bad target.
      { source: '/offences/:path*', destination: '/practice-areas', permanent: true },

      // --- legacy /transparency/* silo (previous site) ---
      { source: '/transparency/how-to-instruct-us', destination: '/direct-access', permanent: true },
      { source: '/transparency/your-rights-with-the-legal-ombudsman', destination: '/complaints', permanent: true },
      { source: '/transparency/timescales-how-long-cases-take', destination: '/timescales', permanent: true },
      { source: '/transparency/terms-conditions', destination: '/terms-of-engagement', permanent: true },
      { source: '/transparency/:path*', destination: '/', permanent: true },

      // --- legacy top-level crime URLs (previous site) ---
      { source: '/violent-crimes', destination: '/practice-areas/violent-crimes', permanent: true },
      { source: '/drug-offences', destination: '/practice-areas/drug-offences', permanent: true },
      { source: '/fraud-allegations', destination: '/practice-areas/criminal-defence', permanent: true },
      { source: '/restraint-confiscation-orders', destination: '/practice-areas', permanent: true },

      // --- legacy /uk-immigration/* silo (previous site, scope removed) ---
      { source: '/uk-immigration/tier-1-investor', destination: '/practice-areas', permanent: true },
      { source: '/uk-immigration/:path*', destination: '/practice-areas', permanent: true },
    ]
  },
}

export default nextConfig
