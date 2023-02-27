/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: "#4caf50",
        primary: "#0E2A17",
        secondary: "#5B5B5B",
      },
    },
  },
  plugins: [],
};
