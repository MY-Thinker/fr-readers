/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        // 红楼朱漆
        rouge: {
          50: "#FBF1EE",
          100: "#F4DAD3",
          200: "#E6AC9F",
          300: "#D77E6B",
          400: "#B8503F",
          500: "#9B2D20", // 暮霞红
          600: "#83251B",
          700: "#6A1E16",
          800: "#521711",
          900: "#3A100B",
        },
        // 宣纸米
        xuan: {
          50: "#FBF6E9",
          100: "#F5EFE0",
          200: "#EDE3CC",
          300: "#E0D2AE",
          400: "#C9B486",
          500: "#B0985F",
        },
        // 青玉绿
        jade: {
          50: "#EBF0EE",
          100: "#C9D6D1",
          200: "#92AAA3",
          300: "#5E7C72",
          400: "#3E5C50",
          500: "#314F44",
          600: "#273E36",
          700: "#1D2E28",
        },
        // 墨黛
        ink: {
          50: "#E8E5E2",
          100: "#C7C1BB",
          200: "#8E867E",
          300: "#564E46",
          400: "#322B25",
          500: "#1F1A17",
          600: "#16120F",
        },
        // 金箔
        gold: {
          50: "#FBF4E6",
          100: "#F1E2BE",
          200: "#E0C884",
          300: "#C8A96A",
          400: "#A88943",
          500: "#836A2F",
        },
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', '"Songti SC"', '"SimSun"', "serif"],
        brush: ['"Ma Shan Zheng"', '"Noto Serif SC"', "cursive"],
        sans: ['"Noto Sans SC"', "-apple-system", "sans-serif"],
      },
      boxShadow: {
        seal: "0 2px 0 rgba(106, 30, 22, 0.45), 0 6px 16px -4px rgba(155, 45, 32, 0.35)",
        scroll: "0 10px 40px -12px rgba(31, 26, 23, 0.25)",
        card: "0 4px 24px -8px rgba(31, 26, 23, 0.18)",
      },
      backgroundImage: {
        "paper-grain":
          "radial-gradient(circle at 20% 30%, rgba(200, 169, 106, 0.08) 0px, transparent 40%), radial-gradient(circle at 80% 70%, rgba(155, 45, 32, 0.06) 0px, transparent 45%)",
        "ink-wash":
          "radial-gradient(ellipse at top, rgba(155, 45, 32, 0.12), transparent 60%)",
        "gold-line":
          "linear-gradient(90deg, transparent, rgba(200, 169, 106, 0.6), transparent)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "seal-stamp": {
          "0%": { opacity: "0", transform: "scale(1.4) rotate(-8deg)" },
          "60%": { opacity: "1", transform: "scale(0.95) rotate(-2deg)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(0deg)" },
        },
        "scroll-unfurl": {
          "0%": { transform: "scaleY(0.4)", opacity: "0" },
          "100%": { transform: "scaleY(1)", opacity: "1" },
        },
        "float-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 0.8s ease both",
        "seal-stamp": "seal-stamp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "scroll-unfurl": "scroll-unfurl 0.9s cubic-bezier(0.16, 1, 0.3, 1) both",
        "float-soft": "float-soft 4s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};
