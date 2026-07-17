import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
    "./src/providers/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "#333333",
        input: "#333333",
        ring: "#ffea00",
        background: "#000000",
        foreground: "#ffea00",
        primary: {
          DEFAULT: "#ffea00",
          foreground: "#000000",
        },
        secondary: {
          DEFAULT: "#333333",
          foreground: "#ffea00",
        },
        destructive: {
          DEFAULT: "#ff0000",
          foreground: "#ffea00",
        },
        yellow: {
          100: "#ffea00",
          200: "#ffd700",
          300: "#ffed4e",
        },
        black: {
          50: "#1a1a1a",
          100: "#333333",
          200: "#000000",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
