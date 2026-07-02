import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0F172A", // deep slate / navy
        surface: "#131E33", // slightly lifted navy for panels
        primary: {
          DEFAULT: "#3B82F6", // blue
          light: "#60A5FA",
          dark: "#2563EB",
        },
        accent: {
          cyan: "#22D3EE",
          emerald: "#10B981",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "sans-serif"],
        display: ["var(--font-space-grotesk)", "ui-sans-serif", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(59, 130, 246, 0.35), 0 0 60px rgba(59, 130, 246, 0.12)",
        "glow-lg": "0 0 40px rgba(59, 130, 246, 0.45), 0 0 100px rgba(34, 211, 238, 0.18)",
        "glow-cyan": "0 0 20px rgba(34, 211, 238, 0.35)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(24px, -32px) scale(1.08)" },
          "66%": { transform: "translate(-18px, 18px) scale(0.94)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.7s ease-out forwards",
        "gradient-x": "gradient-x 6s ease infinite",
        blob: "blob 14s infinite ease-in-out",
      },
    },
  },
  plugins: [],
};

export default config;
