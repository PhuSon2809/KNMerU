const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      bagel: ['DFVN Bagel Fat One', 'sans-serif']
    },
    extend: {
      colors: {
        blue: {
          main: 'var(--blue-main)'
        },
        green: {
          main: 'var(--green-main)'
        },
        pink: {
          main: 'var(--pink-main)'
        },
        orange: {
          main: 'var(--orange-main)'
        },
        skin: {
          main: 'var(--skin-main)'
        },
        yellow: {
          main: 'var(--yellow-main)',
          dark: 'var(--yellow-dark)'
        },
        white: {
          main: 'var(--white-mer)'
        },
        black: {
          main: 'var(--black-mer)'
        }
      },
      borderRadius: {}
    }
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.flex-center': {
          '@apply flex items-center justify-center': {}
        },
        '.flex-between': {
          '@apply flex items-center justify-between': {}
        },
        '.absolute-center': {
          '@apply absolute-center-y absolute-center-x': {}
        },
        '.absolute-center-y': {
          '@apply absolute top-1/2 -translate-y-1/2': {}
        },
        '.absolute-center-x': {
          '@apply absolute left-1/2 -translate-x-1/2': {}
        }
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    })
  ]
}
