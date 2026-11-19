import theme from 'daisyui/src/theming/themes'

// "The leaflet in the box", printed in blues: the ground, the section tints,
// the download band and the footer are shades of the logo blue, with ink for
// text and the spot blue for links and buttons. Each theme sets the same tokens.
const lightTokens = {
  '--se-paper': '#f0f4fc',
  '--se-surface': '#e1e8f7',
  '--se-ink': '#0f1729',
  '--se-muted': '#475069',
  '--se-line': '#c2cde6',
  '--se-link': '#2557e0',
  // the unprinted white inside a drawn screen
  '--se-sheet': '#fbfcff',
  '--se-hero': '#dde6fb',
  '--se-tint': '#e5ecfc',
  '--se-deep': '#d3dffa',
}
const darkTokens = {
  '--se-paper': '#0e1322',
  '--se-surface': '#161d31',
  '--se-ink': '#e8edf8',
  '--se-muted': '#a2acc6',
  '--se-line': '#2b3552',
  '--se-link': '#93b1ff',
  '--se-sheet': '#141b2e',
  '--se-hero': '#15203d',
  '--se-tint': '#121a32',
  '--se-deep': '#1a2650',
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
  // hover styles only where there is a real hover, so a tapped row doesn't stay shaded on touch
  future: { hoverOnlyWhenSupported: true },
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
        hero: 'var(--se-hero)',
        tint: 'var(--se-tint)',
        deep: 'var(--se-deep)',
        // the spot ink: the logo blue one step darker so white type on it passes AA (5.97:1)
        spot: '#2557e0',
        lime: '#dcff4a',
        'logo-mint': '#d6f1ed',
        'logo-blue': '#316cff',
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
          'base-100': '#eeefec',
          'base-200': '#e2e4e0',
          'base-300': '#bfc3bf',
          'base-content': '#14161a',
          ...lightTokens,
        },
        dark: {
          ...theme.dark,
          ...shared,
          'base-100': '#16140f',
          'base-200': '#211e18',
          'base-300': '#3a352c',
          'base-content': '#ede8dc',
          ...darkTokens,
        },
      },
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
