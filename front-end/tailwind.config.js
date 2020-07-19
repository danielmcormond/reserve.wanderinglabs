module.exports = {
  purge: [
    './src/*.js',
    './src/**/*.js',
    './src/**/*.jsx'
  ],
  theme: {
    extend: {
      colors: {
        green: {
          100: "#F1F8F2",
          200: "#DDEDDE",
          300: "#C9E1CA",
          400: "#A0CBA2",
          500: "#77B57A",
          600: "#6BA36E",
          700: "#476D49",
          800: "#365137",
          900: "#243625",
        },
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography')
  ],
};
