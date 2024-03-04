import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./@/components/ui/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["BebasNeue-Regular", "ui-sans-serif", "system-ui"],
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
      height: {
        hero: "calc(100vh - 64px)",
        nav: "80px",
      },
      minHeight: {
        hero: "calc(100vh - 64px)",
      },
    },
  },
  plugins: [],
} satisfies Config;
