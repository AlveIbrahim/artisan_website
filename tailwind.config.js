/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'warm-white': '#fefefe',
        'cream': '#faf9f7',
        'sage': {
          DEFAULT: '#9ca986',
          light: '#b8c5a6',
          dark: '#7a8a6b',
        },
        'terracotta': {
          DEFAULT: '#d4a574',
          light: '#e6c299',
          dark: '#b8925f',
        },
        'charcoal': {
          DEFAULT: '#3a3a3a',
          light: '#5a5a5a',
        },
        'soft-gray': '#f5f5f5',
        'medium-gray': '#e0e0e0',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'sm': '2px',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'gentle-wave': 'gentle-wave 8s ease-in-out infinite',
      },
      keyframes: {
        'gentle-wave': {
          '0%, 100%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
