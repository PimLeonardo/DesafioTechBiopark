/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#2e3a48",
          200: "#181B1E",
        },
        secondary: {
          100: "#C91143",
          200: "#8D1042",
        },
      },
    },
  },
  plugins: [],
};
