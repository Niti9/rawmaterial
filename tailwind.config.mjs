/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "rgb(79, 70, 229)",
        success: "rgb(16, 185, 129)",
        secondary: "rgba(240, 0, 185)",
        warning: "#f000b9",
        "slate-150": "#e9eef5",
        navy: {
          100: "#c2c9d6",
          700: "#26334d",
          300: "#697a9b",
          400: "#5c6b8a",
          450: "#465675",
          750: "#222e45",
          900: "#192132",
          500: "#384766",
          50: "#e7e9ef"
        },
        focus: "#4338ca",
        accent: "#5f5af6",
        info: "#0ea5e9",
        error: "#ff5724",
        "accent/50": "rgba(95, 90, 246, 0.5)" // RGBA for half-opacity
      },
      ringColor: {
        accent: "#5f5af6", // Matching the .dark:ring-accent styles
        "accent/50": "rgba(95, 90, 246, 0.5)"
      },
      zIndex: {
        100: "100",
        200: "200"
      }
    }
  },
  plugins: []
};
