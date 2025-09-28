import type { Config } from "tailwindcss";
import fluid, { extract, screens, fontSize, type FluidThemeConfig } from "fluid-tailwind";

const config: Config = {
  content: {
    files: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    extract,
  },
  theme: {
    fluid: (({ theme }) => ({
      defaultScreens: ["20rem", theme("screens.lg")],
    })) satisfies FluidThemeConfig,
    screens, // Tailwind's default screens (in rem)
    fontSize, // Tailwind's default font sizes (in rem, includes line-heights)
    extend: {
      colors: {
        "brand-blue": "#4876ff",
        "brand-lime": "#d9f154",
        "brand-navy": "#2e3192",
        "brand-orange": "#ff7347",
        "brand-pink": "#f7d0e9",
        "brand-purple": "#692e54",
        "brand-gray": "#fffdf9",
      },
      fontFamily: {
        sans: ["var(--font-bowlby-sc)"],
        mono: ["var(--font-dm-mono)"],
      },
      screens: {
        xs: "20rem",
      },
      keyframes: {
        squiggle: {
          "0%": { filter: 'url("#squiggle-0")' },
          "25%": { filter: 'url("#squiggle-1")' },
          "50%": { filter: 'url("#squiggle-2")' },
          "75%": { filter: 'url("#squiggle-3")' },
          "100%": { filter: 'url("#squiggle-4")' },
        },
      },
      animation: {
        squiggle: "squiggle .5s infinite",
      },
    },
  },
  plugins: [
    fluid({
      checkSC144: false, // keep disabled if you previously used it false
    }),
  ],
} satisfies Config;

export default config;
