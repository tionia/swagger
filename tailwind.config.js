const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'ottoman-red': '#ED2227',
        'flash-white': '#F2F4F6',
        'dark-willow': '#14171A',
        'calla-lilly': '#E5E9EC',
        'tarnished-silver': '#797D7F',
        'silver-charm': '#ADB1B4',

        'swagger-green': '#49cc90',
        'swagger-red': '#f93e3e',
        'swagger-blue': '#61affe',
        'swagger-yellow': '#fca130',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['var(--font-lato)'],
      },
    },
  },
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/forms'),
    nextui(),
  ],
}
