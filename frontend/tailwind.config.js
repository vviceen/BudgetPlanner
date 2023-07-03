/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#0093D8",

          "secondary": "#004562",

          "accent": "#E60B6A",

          "neutral": "#1f2937",

          "base-100": "#ffffff",

          "info": "#58595B",

          "success": "#00b456",

          "warning": "#fbbd23",

          "error": "#F51035",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

