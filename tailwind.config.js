import theme from 'daisyui/src/theming/themes'

// "The leaflet in the box": paper stock and ink, plus one spot colour (the
// logo blue) and the logo mint/lime as second and third spot inks. Each theme
// sets the same tokens; contrast is in exhaustive-unslop/DESIGN.md.
// Light is uncoated white leaflet stock (a cool grey-white, not cream); dark is
// the inside of the carton, a brown-black board. Two blues only: the spot ink,
// and in dark mode a lighter link blue that reads on the board.
const lightTokens = {
  '--se-paper': '#eeefec',
  '--se-surface': '#e2e4e0',
  '--se-ink': '#14161a',
  '--se-muted': '#50555b',
  '--se-line': '#bfc3bf',
  '--se-link': '#2557e0',
  // the unprinted white inside a drawn screen
  '--se-sheet': '#fbfbfa',
  '--se-hero': '#e6eaf0',
  '--se-brand-chip': '#e3e5e1',
  '--se-brand-edge': '#d0d3cd',
}
const darkTokens = {
  '--se-paper': '#16140f',
  '--se-surface': '#211e18',
  '--se-ink': '#ede8dc',
  '--se-muted': '#a9a295',
  '--se-line': '#3a352c',
  '--se-link': '#93b1ff',
  '--se-sheet': '#221f19',
  '--se-hero': '#1c2130',
  '--se-brand-chip': '#1f1c16',
  '--se-brand-edge': '#332f27',
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
