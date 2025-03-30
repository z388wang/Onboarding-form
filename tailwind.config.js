/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        xs: "4px",
        s: "8px",
        m: "12px",
        l: "16px",
        xl: "24px",
        "2xl": "32px",
        "3xl": "40px",
      },
      borderRadius: {
        xsmall: "4px",
        small: "8px",
        medium: "12px",
        large: "16px",
        xlarge: "24px",
      },
      colors: {
        // Neutrals
        neutral: {
          0: "#FFFFFF",
          100: "#F9FAFB",
          200: "#EFEFF1",
          300: "#D5D7D9",
          400: "#D7D7DA",
          600: "#87878B",
          800: "#38393A",
          900: "#080812",
        },
        red: "#B00C0C",
      },
      fontSize: {
        // Homepage H1
        homepageH1SemiBold: ["64px", { fontWeight: "600", lineHeight: "70px" }],
        homepageH1Regular: ["64px", { fontWeight: "400", lineHeight: "70px" }],

        // H1
        h1SemiBold: ["48px", { fontWeight: "600", lineHeight: "62px" }],
        h1Regular: ["48px", { fontWeight: "400", lineHeight: "62px" }],

        // H2
        h2SemiBold: ["32px", { fontWeight: "600", lineHeight: "40px" }],
        h2Regular: ["32px", { fontWeight: "400", lineHeight: "40px" }],

        // H3
        h3SemiBold: ["24px", { fontWeight: "600", lineHeight: "32px" }],
        h3Regular: ["24px", { fontWeight: "400", lineHeight: "32px" }],

        // H4
        h4SemiBold: ["20px", { fontWeight: "600", lineHeight: "26px" }],
        h4Regular: ["20px", { fontWeight: "400", lineHeight: "26px" }],

        // Body 1
        body1SemiBold: ["16px", { fontWeight: "600", lineHeight: "22px" }],
        body1Medium: ["16px", { fontWeight: "500", lineHeight: "22px" }],
        body1Regular: ["16px", { fontWeight: "400", lineHeight: "22px" }],
        body1Light: ["16px", { fontWeight: "300", lineHeight: "22px" }],

        // Body 2
        body2SemiBold: ["14px", { fontWeight: "600", lineHeight: "22px" }],
        body2Medium: ["14px", { fontWeight: "500", lineHeight: "20px" }],
        body2Regular: ["14px", { fontWeight: "400", lineHeight: "20px" }],
        body2Light: ["14px", { fontWeight: "300", lineHeight: "20px" }],

        // Micro
        microMedium: ["12px", { fontWeight: "500", lineHeight: "16px" }],
        microNormal: ["12px", { fontWeight: "400", lineHeight: "16px" }],
        microLight: ["12px", { fontWeight: "300", lineHeight: "16px" }],
      },
    },
  },
  plugins: [],
};
