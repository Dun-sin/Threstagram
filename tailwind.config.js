/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Exo 2"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#060b0a',
        secondary: '#f9ffff',
        brand: '#1a8fbb',
      },
      fontSize: {
        f2xs: 'var(--step--2)',
        fxs: 'var(--step--1)',
        fsm: 'var(--step-0)',
        fmd: 'var(--step-1)',
        flg: 'var(--step-2)',
        fxl: 'var(--step-3)',
        f2xl: 'var(--step-4)',
        f3xl: 'var(--step-5)',
      },
    },
  },
  plugins: [],
};
