/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#fff8f0",
        blush: "#f8dce5",
        rose: "#bd7a83",
        wine: "#6f1f24",
        leaf: "#5f7254",
        royalGold: "#b9872d",
        softGold: "#f4d38b",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        script: ["Great Vibes", "Edwardian Script ITC", "Brush Script MT", "cursive"],
        body: ["Inter", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 34px rgba(212, 164, 72, 0.35)",
      },
    },
  },
  plugins: [],
};
