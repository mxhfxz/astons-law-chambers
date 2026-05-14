import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-inverse': 'var(--color-text-inverse)',
        'bg-base': 'var(--color-bg-base)',
        'bg-subtle': 'var(--color-bg-subtle)',
        'bg-dark': 'var(--color-bg-dark)',
        'bg-footer': 'var(--color-bg-footer)',
        'border-default': 'var(--color-border-default)',
        'border-strong': 'var(--color-border-strong)',
        'cta-phone': 'var(--color-cta-phone)',
        'cta-whatsapp': 'var(--color-cta-whatsapp)',
        'link': 'var(--color-link)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        serif: ['var(--font-serif)'],
      },
      fontSize: {
        'legal-small': ['var(--text-xs)', { lineHeight: '1.5' }],
        'caption': ['var(--text-sm)', { lineHeight: '1.5' }],
        'base': ['var(--text-base)', { lineHeight: '1.7' }],
        'lead': ['var(--text-lg)', { lineHeight: '1.7' }],
        'sub': ['var(--text-xl)', { lineHeight: '1.4', fontWeight: '600' }],
        'h3': ['var(--text-2xl)', { lineHeight: '1.3', fontWeight: '600' }],
        'h2': ['var(--text-3xl)', { lineHeight: '1.25', fontWeight: '700' }],
        'h1-mobile': ['var(--text-4xl)', { lineHeight: '1.15', fontWeight: '700' }],
        'h1-desktop': ['var(--text-5xl)', { lineHeight: '1.1', fontWeight: '700' }],
        'display': ['var(--text-display)', { lineHeight: '1.05', fontWeight: '700' }],
      },
      spacing: {
        'section-y': 'var(--spacing-section-y-mobile)',
        'container-x': 'var(--spacing-container-x)',
        'sticky-bar': 'var(--sticky-bar-height)',
        'nav': 'var(--nav-height-mobile)',
      },
      maxWidth: {
        'prose': 'var(--prose-max-width)',
        'container': 'var(--container-max-desktop)',
      },
      transitionDuration: {
        'fast': 'var(--duration-fast)',
        'base': 'var(--duration-base)',
        'slow': 'var(--duration-slow)',
      },
    },
  },
  plugins: [],
}

export default config
