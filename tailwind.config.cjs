/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    'screens': {
      'sm': '576px',
      'md': '960px',
      'lg': '1440px',
    }
  },
  plugins: [],
}