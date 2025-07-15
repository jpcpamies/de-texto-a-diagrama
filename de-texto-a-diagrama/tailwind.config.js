/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#1a1a1a',
        'bg-secondary': '#2d2d2d',
        'bg-tertiary': '#3a3a3a',
        'text-primary': '#ffffff',
        'text-secondary': '#b0b0b0',
        'text-tertiary': '#808080',
        'accent-primary': '#4ecdc4',
        'accent-secondary': '#10A37F',
        'accent-hover': '#3db3ab',
        success: '#4ade80',
        warning: '#fbbf24',
        error: '#f87171',
        info: '#60a5fa',
        primary: {
          50: '#eff6ff',
          500: '#4ecdc4',
          600: '#3db3ab',
          700: '#2db5ac',
        },
        secondary: {
          50: '#f8fafc',
          500: '#10A37F',
          600: '#0d8f6f',
          700: '#0a7d5f',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      spacing: {
        'unit': '8px',
      },
      borderRadius: {
        'default': '8px',
        'card': '12px',
      },
      transitionDuration: {
        'default': '200ms',
      },
      transitionTimingFunction: {
        'default': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      boxShadow: {
        'subtle': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'elevated': '0 4px 16px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}