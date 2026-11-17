import theme from 'daisyui/src/theming/themes'

// Page tokens live as CSS variables inside each daisyUI theme so they follow
// the light/dark/system switch. Values and contrast ratios: exhaustive-unslop/DESIGN-BRIEF.md.
const lightTokens = {
  '--se-paper': '#ffffff',
  '--se-surface': '#f4f6f8',
  '--se-ink': '#0f1419',
  '--se-muted': '#4b5560',
  '--se-line': '#dde2e7',
  '--se-link': '#2456d6',
  // soft logo-blue ground for a few sections: lighter than paper, never a jump
  '--se-tint': '#eef3ff',
}
const darkTokens = {
  '--se-paper': '#0b0d10',
  '--se-surface': '#15181c',
  '--se-ink': '#f1f4f7',
  '--se-muted': '#9ba5af',
  '--se-line': '#262b31',
  '--se-link': '#8fb0ff',
  '--se-tint': '#141c2c',
}
const shared = {
  primary: '#2b62f0',
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
      sans: ["'IBM Plex Sans'", 'system-ui', 'sans-serif'],
      body: ["'IBM Plex Sans'", 'system-ui', 'sans-serif'],
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
        tint: 'var(--se-tint)',
        lime: '#dcff4a',
        'logo-mint': '#d6f1ed',
        'logo-blue': '#316cff',
        'logo-lime': '#dcff4a',
      },
      borderRadius: {
        cell: '4px',
        control: '6px',
        panel: '8px',
        shot: '10px',
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
          'base-100': '#ffffff',
          'base-200': '#f4f6f8',
          'base-300': '#dde2e7',
          'base-content': '#0f1419',
          ...lightTokens,
        },
        dark: {
          ...theme.dark,
          ...shared,
          'base-100': '#0b0d10',
          'base-200': '#15181c',
          'base-300': '#262b31',
          'base-content': '#f1f4f7',
          ...darkTokens,
        },
      },
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
