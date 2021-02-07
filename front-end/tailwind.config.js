const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/*.js', './src/**/*.js', './src/**/*.jsx'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      indigo: colors.indigo,
      gray: colors.trueGray,
      red: colors.red,
      blue: colors.lightBlue,
      yellow: colors.amber,
      pink: colors.pink,
      orange: colors.orange,
      green: {
        100: '#F1F8F2',
        200: '#DDEDDE',
        300: '#C9E1CA',
        400: '#A0CBA2',
        500: '#77B57A',
        600: '#6BA36E',
        700: '#476D49',
        800: '#365137',
        900: '#243625'
      }
    },
    fontFamily: {
      sans: [
        '"Helvetica Neue"',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"'
      ]
    }
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled']
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
