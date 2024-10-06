import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fffbeb', // amber-50
          100: '#fef3c7', // amber-100
          200: '#fde68a', // amber-200
          300: '#fcd34d', // amber-300
          400: '#fbbf24', // amber-400
          500: '#f59e0b', // amber-500
          600: '#d97706', // amber-600
          700: '#b45309', // amber-700
          800: '#92400e', // amber-800
          900: '#78350f', // amber-900
          950: '#451a03', // amber-950
        },
        // Keep your existing secondary if needed
        secondary: {
          light: '#f1f5f9', // slate-100
          dark: '#0f172a', // slate-900
        },
      },
      screens: {
        xs: '480px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
