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
        primary: { DEFAULT: "#0b1e38", dark: "#071527", light: "#122540" },
        gold: { DEFAULT: "#c9a227", dark: "#a07f18", light: "#e3c66b" },
        cream: "#faf7f0",
      },
      fontFamily: {
        sans: ["'Segoe UI'", "system-ui", "-apple-system", "sans-serif"],
        serif: ["'Playfair Display'", "Georgia", "Cambria", "serif"],
        display: ["var(--font-display)", "Impact", "Haettenschweiler", "'Arial Narrow Bold'", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(11,30,56,0.18)",
        lift: "0 20px 50px -16px rgba(11,30,56,0.28)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease forwards",
        "fade-in": "fadeIn 0.9s ease forwards",
        "slow-pan": "slowPan 18s ease-in-out infinite alternate",
        marquee: "marquee 46s linear infinite",
        "marquee-fast": "marquee 30s linear infinite",
        "marquee-slow": "marquee 70s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slowPan: {
          "0%": { transform: "scale(1) translate(0,0)" },
          "100%": { transform: "scale(1.1) translate(1.5%, 1.5%)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;