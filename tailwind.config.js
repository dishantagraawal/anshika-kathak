/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        kathak: {
          maroon: {
            50: "#fdf2f3",
            100: "#f9dde1",
            200: "#f0b9c2",
            300: "#e48a9a",
            400: "#d4546c",
            500: "#c03354",
            600: "#ab2145",
            700: "#8f1a3a",
            800: "#761834",
            900: "#63162f",
            950: "#3a0618",
          },
          gold: {
            50: "#fefbf0",
            100: "#fcf3d4",
            200: "#f8e4a5",
            300: "#f3cf6a",
            400: "#eeb43a",
            500: "#d49228",
            600: "#b87220",
            700: "#99541e",
            800: "#7d431f",
            900: "#67381d",
            950: "#3b1c0e",
          },
          saffron: {
            50: "#fff7ed",
            100: "#ffedd5",
            200: "#fed7aa",
            300: "#fdba74",
            400: "#fb923c",
            500: "#f97316",
            600: "#ea580c",
            700: "#c2410c",
            800: "#9a3412",
            900: "#7c2d12",
          },
          ivory: "#FAF8F0",
          cream: "#F5F0E1",
          parchment: "#EDE4D0",
          dark: "#1A0A0E",
          brown: "#3E2723",
        },
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-lato)", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 30s linear infinite",
        "spin-slow-reverse": "spin 25s linear infinite reverse",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 3s infinite",
        shimmer: "shimmer 4s linear infinite",
        sway: "sway 4s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "scale-in": "scale-in 0.6s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        sway: {
          "0%, 100%": { transform: "rotate(-1.5deg)" },
          "50%": { transform: "rotate(1.5deg)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      backgroundImage: {
        "paisley-gradient":
          "linear-gradient(135deg, #63162f 0%, #3a0618 50%, #1A0A0E 100%)",
        "gold-gradient":
          "linear-gradient(135deg, #C9A84C 0%, #FFD700 50%, #C9A84C 100%)",
        "warm-gradient": "linear-gradient(180deg, #FAF8F0 0%, #F5F0E1 100%)",
      },
    },
  },
  plugins: [],
};
