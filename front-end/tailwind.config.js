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
        'gray': {
          100: "#ffffff",
          200: "#e9eaeb",
          300: "#d4d5d7",
          400: "#bfc0c4",
          500: "#aaacb0",
          600: "#7f8289",
          700: "#555962",
          800: "#40444e",
          900: "#2b303b",
        },
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography')
  ],
};
