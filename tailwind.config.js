/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";
import plugin from "tailwindcss/plugin";
import { screens } from "tailwindcss/defaultTheme";

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
          light: colors.sky[100],
          lighter: colors.white,
          dark: colors.zinc[800],
          darker: "#121212"
        },
      },
      fontFamily: {
        cursive: ['cursive'],
        roboto: ['Roboto', 'sans-serif']
      },
      screens: {
        xs: "425px",
        ...screens,
        pwa: { raw: '(max-width: 640px) and (display-mode: standalone)' },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-opaque": "pulse-opaque 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;"
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
        "pulse-opaque": {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '0.3' },
        }
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('tailwind-scrollbar')({
      nocompatible: true,
      preferredStrategy: 'pseudoelements',
    }),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.center': {
          'display': 'grid',
          "place-items": "center"
        }
      });
    })
  ],
};
