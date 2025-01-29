/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],  
  theme: {
    extend: {
      colors : {
        vuejs:  {
          100: "#49e659",
          200: "#ffffff",
        }
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}

