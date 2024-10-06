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
          light: '#f0f9ff', // blue-50
          dark: '#0c4a6e', // blue-900
        },
        secondary: {
          light: '#f1f5f9', // slate-100
          dark: '#0f172a', // slate-900
        },
      },
    },
  },
  plugins: [],
};
export default config;
