const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "infinite-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "infinite-scroll": "infinite-scroll 25s linear infinite",
      },
      width: {
        "600px": "600px",
      },
      boxShadow: {
        custom:
          "rgba(17, 17, 26, 0.1) 0px 6px 20px, rgba(17, 17, 26, 0.1) 0px 12px 40px",
      },
    },
  },
  variants: {
    boxShadow: ["hover"], // Ensure hover variant is enabled
  },
  plugins: [],
});
