/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#3B6FE8',
          50: '#EEF2FF',
          100: '#E8F0FE',
          600: '#3B6FE8',
          700: '#2D5CD4',
        },
        surface: '#F8F9FB',
        border: '#E5E7EB',
      },
    },
  },
  plugins: [],
}
