/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        teal: {
          DEFAULT: "#1A9C9C",
          dark: "#0E8A8A",
        },
      },
      fontFamily: {
        "serif-display": ["'Playfair Display'", "Georgia", "serif"],
        "sans-ui": ["'Inter'", "system-ui", "sans-serif"],
      },
      keyframes: {
        bubbleFloat: {
          "0%, 100%": { transform: "translate(-50%,-50%) rotate(-8deg)" },
          "50%": { transform: "translate(-50%,-52%) rotate(-4deg)" },
        },
        slideHint: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(6px)" },
        },
      },
      animation: {
        bubbleFloat: "bubbleFloat 5s ease-in-out infinite",
        slideHint: "slideHint 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
