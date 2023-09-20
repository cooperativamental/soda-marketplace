/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')


module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./context/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    values: {

    },
    extend: {
      boxShadow: {
        'tab': '0px 1px 0px -0.5px',
        'tabSelected': "0px 0px 4px -2px "
      },
      colors: {
        'backg': '#081635',
        'inputs': '#102042',
        'blue-custom': '#000031',
        'sky': '#B1FCFE',
        'red-custom': '#ED7043',
        'chok': '#B1FCFE',
        'green-custom': '#7DFBA2',
        'yellow-custom': '#FFFFA6',
        'border': '#334155',
        'export': '#387847',
      },
      backgroundImage: {
        'bubble': "url('../public/bluebubble.svg')"
      },
      animationDuration: {
        '300ms': '300ms',
        '900ms': '900ms',
      },
      animationDelay: {
        '300ms': '300ms',
        '900ms': '900ms',
      },
      keyframes: {
        bubble: {
          '0%': { backgroundPosition: "0 100vh" },
          '100%': { backgroundPosition: '0 0' },
        },
        rotateCan: {
          '0%': { transform: 'rotate(0deg)', "--tw-blur": "blur(0px)" },
          '30%': { transform: 'rotate(25deg)' },
          '100%': { transform: 'translate(10px, 100vh)' },
        },
        slide: {
          '0%': { transform: 'rotate(0deg)', "--tw-blur": "blur(0px)" },
          '30%': { transform: 'rotate(25deg)' },
          '100%': { transform: 'translate(10px, 100vh)' },
        }
      },
      animationDelay: {
        100: "100ms",
        200: "200ms",
        300: "300ms"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('./pluginsTailwind/animationDelay')
  ],
}
