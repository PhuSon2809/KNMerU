const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      bagel: ['DFVN Bagel Fat One', 'sans-serif'],
      dongle: ['Dongle-Regular', 'sans-serif'],
      purenotes: ['DFVN-Purenotes', 'sans-serif']
    },
    extend: {
      screens: {
        '2xl': '1440px'
      },
      colors: {
        red: {
          main: 'var(--red-main)'
        },
        blue: {
          main: 'var(--blue-main)',
          dark: 'var(--blue-dark)'
        },
        green: {
          main: '#17eb89',
          dark: '#039854'
        },
        pink: {
          main: 'var(--pink-main)',
          dark: 'var(--pink-dark)'
        },
        orange: {
          main: 'var(--orange-main)',
          dark: 'var(--orange-dark)'
        },
        skin: {
          main: 'var(--skin-main)'
        },
        yellow: {
          main: 'var(--yellow-main)',
          light: 'var(--yellow-light)',
          dark: 'var(--yellow-dark)'
        },
        text: {
          white: 'var(--white-mer)',
          back: 'var(--black-mer)'
        },
        gray: {
          1: 'var(--gray-1)',
          2: 'var(--gray-2)',
          3: 'var(--gray-3)',
          4: 'var(--gray-4)',
          5: 'var(--gray-5)',
          6: 'var(--gray-6)',
          7: 'var(--gray-7)'
        }
      },
      borderRadius: {
        1: '20px',
        2: '30px'
      },
      boxShadow: {
        pink: '-4px 6px 0px 0px #FF92CB'
      },
      backgroundImage: {
        certificate: "url('/src/assets/images/bg_certificate.png')"
      }
    }
  },
  plugins: [
    require('tailwindcss-animate'),
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
        },
        '.text-dongle-24': {
          '@apply font-dongle text-[24px]/[24px]': {}
        },
        '.transition-300': {
          '@apply transition-all duration-300 ease-in-out': {}
        },
        '.transition-500': {
          '@apply transition-all duration-500 ease-in-out': {}
        }
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    })
  ]
}
