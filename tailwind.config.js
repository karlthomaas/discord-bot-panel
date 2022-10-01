/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#202225',
          800: '#292b2f', // mute deafen panel
          600: '#2F3136',
          400: '#36393f',
          200: '#36393F',
          150: '#96989D',
          100: '#3C3F45',
          50: '#40444B',
          25: '#36393F', // chat background
          10: '#8E9297', // channel hash
        },

        indigo:{
          50: "#3848a1"
        }


      }
    },
  },
  plugins: [],
}
