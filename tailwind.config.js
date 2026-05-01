/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#165DFF",
        secondary: "#7B61FF",
        accent: "#FF7D00",
        dark: "#1E293B",
        light: "#F8FAFC",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        skillsphere: {
          primary: "#165DFF",
          secondary: "#7B61FF",
          accent: "#FF7D00",
          neutral: "#1E293B",
          "base-100": "#ffffff",
        },
      },
    ],
  },
};