/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["SF Pro Display", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
