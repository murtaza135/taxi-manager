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
        primary: {
          ...colors.sky,
          light: colors.sky[300],
          dark: colors.sky[600]
        },
        achromatic: {
          ...colors.zinc,
          light: colors.white,
          dark: colors.zinc[800]
        },
        scene: {
          light: colors.sky[100],
          dark: "#121212"
        }
      },
      fontFamily: {
        cursive: ['cursive'],
        roboto: ['Roboto', 'sans-serif']
      },
      screens: {
        xs: "425px"
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
