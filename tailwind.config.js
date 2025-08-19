
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: { brand: { DEFAULT: "#111827", accent: "#06b6d4" } },
      boxShadow: { glow: "0 0 20px rgba(6,182,212,0.3)" }
    },
  },
  plugins: [],
}
