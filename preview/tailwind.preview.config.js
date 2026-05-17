/**
 * Tailwind config for the static preview (preview/index.html).
 *
 * Mirrors the former inline `tailwind.config` exactly, so the built
 * stylesheet (preview/tailwind.built.css) can replace the render-blocking
 * cdn.tailwindcss.com script with no visual change.
 *
 * Rebuild:
 *   node_modules/.bin/tailwindcss \
 *     -c preview/tailwind.preview.config.js \
 *     -i preview/tailwind.input.css \
 *     -o preview/tailwind.built.css --minify
 */
module.exports = {
  content: ['preview/index.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        navy: {
          950: '#0E1628',
          900: '#16223C',
          800: '#1F2E50',
          700: '#283A64',
          100: '#E8EDF5',
        },
        offwhite: '#F8F9FB',
        footer: '#232536',
        emergency: { 500: '#C23616', 600: '#A12B10' },
        whatsapp: { DEFAULT: '#075E54', dark: '#054B43' },
        grey: { 900: '#111827', 600: '#4B5563', 300: '#D1D5DB', 100: '#F3F4F6' },
      },
      maxWidth: {
        prose: '70ch',
        container: '1200px',
        wide: '1360px',
      },
      letterSpacing: {
        tightish: '-0.01em',
        tight2: '-0.02em',
      },
    },
  },
}
