// @ts-check
const { fontFamily } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import("tailwindcss/types").Config } */
module.exports = {
  content: [
    "./node_modules/pliny/**/*.js",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,tsx}",
    "./components/**/*.{js,ts,tsx}",
    "./layouts/**/*.{js,ts,tsx}",
    "./data/**/*.mdx",
  ],
  darkMode: "class",
  theme: {
    extend: {
      lineHeight: {
        11: "2.75rem",
        12: "3rem",
        13: "3.25rem",
        14: "3.5rem",
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
      },
      // One radius for every squared-off surface on the site — filter buttons,
      // the venue chip, project thumbnails, the avatar. 8px is soft enough to
      // read as intentional rather than a default 4px, and still square enough
      // to sit with the rules and left-aligned text blocks everywhere else.
      // Use `rounded-ui`; do not reach for rounded/md/lg/full directly.
      borderRadius: {
        ui: "0.5rem",
      },
      colors: {
        // Neutral ink ramp. The site reads as black-and-gray, so `primary` is
        // not a hue — it is the dark end of the gray scale, shifted so that
        // primary-500 lands on gray-700 (#374151), the weight the social icons
        // already used. Anything that was navy now resolves to that ink.
        primary: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#9ca3af",
          400: "#4b5563",
          500: "#374151",
          600: "#1f2937",
          700: "#111827",
          800: "#0d121c",
          900: "#080b12",
          950: "#000000",
        },
        gray: colors.gray,
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme("colors.primary.500"),
              "&:hover": {
                color: `${theme("colors.primary.600")}`,
              },
              code: { color: theme("colors.primary.400") },
            },
            "h1,h2": {
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.tight"),
            },
            h3: {
              fontWeight: "600",
            },
            code: {
              color: theme("colors.gray.800"),
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme("colors.primary.500"),
              "&:hover": {
                color: `${theme("colors.primary.400")}`,
              },
              code: { color: theme("colors.primary.400") },
            },
            "h1,h2,h3,h4,h5,h6": {
              color: theme("colors.gray.100"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
