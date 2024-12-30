/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors:{
      'dark': '#213555',
      'dd':'#182336',
      'med': '#3E5879',
      'beige': '#D8C4B6',
      'dbeige':'#bfac9f',
      'light': '#F5EFE7',
      'red': '#C62300'
    },
    extend: {
      fontFamily: {
        ar: ['Arial Rounded MT Bold'],
      },
    },
  },
  plugins: [],
}

