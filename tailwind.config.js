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
      body: ["'DM Sans'", 'sans-serif'],
    },
    extend: {
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translate3d(0, 1.5rem, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -40px) scale(1.1)' },
          '66%': { transform: 'translate(-25px, 25px) scale(0.95)' },
        },
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        shimmer: {
          '100%': { transform: 'translateX(200%)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.85' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.9s ease-out both',
        float: 'float 6s ease-in-out infinite',
        blob: 'blob 18s ease-in-out infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
        glow: 'glow 5s ease-in-out infinite',
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...theme.light,
          primary: '#1b77ff',
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
          primary: '#1b77ff',
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
