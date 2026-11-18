import theme from 'daisyui/src/theming/themes'

// "The leaflet in the box": paper stock and ink, plus one spot colour (the
// logo blue) and the logo mint/lime as second and third spot inks. Each theme
// sets the same tokens; contrast is in exhaustive-unslop/DESIGN.md.
const lightTokens = {
  '--se-paper': '#f2f1ec',
  '--se-surface': '#e7e5dd',
  '--se-ink': '#15171b',
  '--se-muted': '#55595f',
  '--se-line': '#c9c6bb',
  '--se-link': '#2152cc',
  // line-art fills inside drawings (the "unprinted" paper inside a screen)
  '--se-sheet': '#fbfaf7',
  '--se-tile-blue': '#dce5fb',
  '--se-tile-mint': '#d6f1ed',
}
const darkTokens = {
  '--se-paper': '#121418',
  '--se-surface': '#1b1e24',
  '--se-ink': '#eceae3',
  '--se-muted': '#a2a6ad',
  '--se-line': '#30343c',
  '--se-link': '#8fb0ff',
  '--se-sheet': '#1f2329',
  '--se-tile-blue': '#1a2547',
  '--se-tile-mint': '#16302f',
}
const shared = {
  primary: '#2557e0',
  'primary-content': '#ffffff',
  secondary: '#494949',
  neutral: '#03131a',
  info: '#00e1ff',
  success: '#90ca27',
  warning: '#ff8800',
  error: '#ff7f7f',
  '--rounded-box': '0.5rem',
  '--rounded-btn': '0.375rem',
  '--animation-btn': '0',
  '--animation-input': '0',
  '--btn-focus-scale': '1',
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'index.html'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '3rem',
        xl: '4rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
    fontFamily: {
      sans: ["'Archivo'", 'system-ui', 'sans-serif'],
      body: ["'Archivo'", 'system-ui', 'sans-serif'],
      mono: ["'IBM Plex Mono'", 'ui-monospace', 'monospace'],
    },
    extend: {
      colors: {
        paper: 'var(--se-paper)',
        surface: 'var(--se-surface)',
        ink: 'var(--se-ink)',
        muted: 'var(--se-muted)',
        line: 'var(--se-line)',
        link: 'var(--se-link)',
        sheet: 'var(--se-sheet)',
        // the spot ink: the logo blue one step darker so white type on it passes AA (5.97:1)
        spot: '#2557e0',
        'spot-soft': '#d9e4ff',
        'tile-blue': 'var(--se-tile-blue)',
        'tile-mint': 'var(--se-tile-mint)',
        lime: '#dcff4a',
        'logo-mint': '#d6f1ed',
        'logo-blue': '#316cff',
        // the logo blue one step darker, for screens that carry white text (5.1:1)
        'screen-blue': '#2b62f0',
        'logo-lime': '#dcff4a',
      },
      borderRadius: {
        // printed things have nearly square corners
        cell: '2px',
        control: '3px',
        panel: '4px',
        shot: '6px',
      },
      boxShadow: {
        shot: '0 1px 2px rgb(0 0 0 / 0.06), 0 12px 32px -12px rgb(0 0 0 / 0.25)',
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...theme.light,
          ...shared,
          'base-100': '#f2f1ec',
          'base-200': '#e7e5dd',
          'base-300': '#c9c6bb',
          'base-content': '#15171b',
          ...lightTokens,
        },
        dark: {
          ...theme.dark,
          ...shared,
          'base-100': '#121418',
          'base-200': '#1b1e24',
          'base-300': '#30343c',
          'base-content': '#eceae3',
          ...darkTokens,
        },
      },
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
