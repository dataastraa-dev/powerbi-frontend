/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        'xs' : {'min': '320px', 'max': '567px'}
      },
    },
  },
  plugins: [],
}