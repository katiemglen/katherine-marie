import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        jungle: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        golden: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
        },
        mystic: {
          purple: "#7c3aed",
          teal: "#14b8a6",
          deep: "#0f172a",
          dark: "#1a1a2e",
          card: "rgba(15, 23, 42, 0.6)",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "jungle-gradient":
          "linear-gradient(135deg, #052e16 0%, #1a1a2e 50%, #0f172a 100%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(22, 101, 52, 0.15) 0%, rgba(124, 58, 237, 0.1) 100%)",
        "hero-gradient":
          "linear-gradient(180deg, transparent 0%, rgba(5, 46, 22, 0.8) 60%, #052e16 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        float: "float 6s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(34, 197, 94, 0.1)" },
          "100%": { boxShadow: "0 0 40px rgba(34, 197, 94, 0.3)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
