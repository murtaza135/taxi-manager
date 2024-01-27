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
        primary: colors.sky,
        achromatic: colors.zinc,
        "primary-light": colors.sky[300],
        "primary-dark": colors.sky[600],
        "achromatic-light": colors.white,
        "achromatic-dark": colors.zinc[800],
        "scene-light": colors.sky[100],
        "scene-dark": "#121212",
        dark: colors.zinc,
        light: colors.slate,
        "primary-1": colors.sky[300],
        "primary-2": colors.sky[600],
        "dark-1": colors.zinc[800],
        "dark-2": "#121212",
        "light-1": colors.white,
        "light-2": colors.sky[100],
      },
      fontFamily: {
        cursive: ['cursive'],
        roboto: ['Roboto', 'sans-serif']
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
