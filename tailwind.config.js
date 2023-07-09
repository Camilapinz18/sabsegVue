/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      opacity:["disabled"],
      screens: {
        'hover': {'raw': '(hover: none)'},
      },
    },
  },
  plugins: [],
}