/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#F2F5F7',
        'secondary': '#C3CFD9',
        'tertiary' : '#4B5C6B'
      }
    },
  },
  plugins: [],
};
