import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "dark-navy": "#313E51",
        "grey-navy": "#626C7F",
        "light-bluish": "#ABC1E1",
        "light-grey": "#F4F6FA",
        green: "#26D782",
        navy: "#3B4D66",
        purple: "#A729F5",
        red: "#EE5454",
        white: "#FFFFFF",
      },
    },
  },
  plugins: [],
} satisfies Config;
