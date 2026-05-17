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

      // --- legacy /compliance/* silo (content consolidated into new pages) ---
      { source: '/compliance/timescales', destination: '/direct-access', permanent: true },
      { source: '/compliance/complaints-policy', destination: '/complaints', permanent: true },
      { source: '/compliance/terms-and-transparency-notice', destination: '/fees', permanent: true },
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
    ]
  },
}

export default nextConfig
