/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.5rem",
      "5xl": "3rem",
    },
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        sidebar: {
          DEFAULT: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: "hsl(var(--primary))",
          "primary-foreground": "hsl(var(--primary-foreground))",
          accent: "hsl(var(--accent))",
          "accent-foreground": "hsl(var(--accent-foreground))",
          border: "hsl(var(--border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("tailwindcss-animate"),
  ],
};
