/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.green,
        dark: colors.zinc,
        light: colors.slate
      },
      fontFamily: {
        cursive: ['cursive'],
        roboto: ['Roboto', 'sans-serif']
      },
    },
  },
  plugins: [],
};
