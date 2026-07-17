import theme from 'daisyui/src/theming/themes'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'index.html', 'node_modules/daisyui/dist/**/*.js', 'node_modules/react-daisyui/dist/**/*.js'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '6rem',
        '2xl': '8rem',
      },
    },
    fontFamily: {
      sans: ["'IBM Plex Sans'", 'sans-serif'],
      body: ["'IBM Plex Sans'", 'sans-serif'],
      mono: ["'IBM Plex Mono'", 'monospace'],
      soft: ["'Nunito'", 'sans-serif'],
    },
    extend: {
      colors: {
        'logo-mint': '#d6f1ed',
        'logo-blue': '#316cff',
        'logo-cyan': '#1ccbdd',
        'logo-lime': '#a6e15a',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translate3d(0, 1.5rem, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -40px) scale(1.1)' },
          '66%': { transform: 'translate(-25px, 25px) scale(0.95)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.9s ease-out both',
        blob: 'blob 18s ease-in-out infinite',
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...theme.light,
          primary: '#316cff',
          'primary-content': '#ffffff',
          secondary: '#494949',
          neutral: '#03131a',
          info: '#00e1ff',
          success: '#90ca27',
          warning: '#ff8800',
          error: '#ff7f7f',
          '--rounded-box': '0.25rem',
          '--rounded-btn': '0.25rem',
        },
        dark: {
          ...theme.dark,
          primary: '#316cff',
          'primary-content': '#ffffff',
          secondary: '#494949',
          neutral: '#03131a',
          info: '#00e1ff',
          success: '#90ca27',
          warning: '#ff8800',
          error: '#ff7f7f',
          'base-100': '#14181c',
          'base-200': '#1e2328',
          'base-300': '#28323c',
          'base-content': '#dcebfa',
          '--rounded-box': '0.25rem',
          '--rounded-btn': '0.25rem',
        },
      },
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
