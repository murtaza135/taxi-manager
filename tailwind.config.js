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
        light: colors.slate,
        "dark-primary": colors.zinc[800],
        "dark-secondary": colors.zinc[900],
        "light-primary": colors.slate[100],
        "light-secondary": colors.slate[200],
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
