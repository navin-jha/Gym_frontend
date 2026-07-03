/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
        "2xl": "3rem",
      },
    },

    extend: {
      colors: {
        primary: "#2563EB",
        primaryDark: "#1D4ED8",

        secondary: "#0F172A",

        background: "#F8FAFC",
        surface: "#F1F5F9",
        card: "#FFFFFF",

        border: "#E2E8F0",

        heading: "#0F172A",
        text: "#475569",

        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",

        info: "#06B6D4",
      },

      borderRadius: {
        xs: "6px",
        sm: "10px",
        md: "14px",
        lg: "18px",

        input: "14px",
        button: "14px",
        card: "22px",
      },

      boxShadow: {
        card: "0 6px 24px rgba(15,23,42,.06)",

        cardHover: "0 10px 35px rgba(15,23,42,.10)",

        button: "0 4px 14px rgba(37,99,235,.18)",

        dropdown: "0 10px 40px rgba(15,23,42,.08)",

        modal: "0 20px 60px rgba(15,23,42,.15)",
      },

      fontSize: {
        hero: ["40px", { lineHeight: "48px" }],

        h1: ["32px", { lineHeight: "40px" }],

        h2: ["26px", { lineHeight: "34px" }],

        h3: ["22px", { lineHeight: "30px" }],

        body: ["15px", { lineHeight: "24px" }],

        small: ["13px", { lineHeight: "18px" }],
      },

      transitionDuration: {
        250: "250ms",
        400: "400ms",
      },

      keyframes: {
        fadeIn: {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },

        slideUp: {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },

          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        scaleIn: {
          from: {
            opacity: "0",
            transform: "scale(.95)",
          },

          to: {
            opacity: "1",
            transform: "scale(1)",
          },
        },

        float: {
          "0%,100%": {
            transform: "translateY(0px)",
          },

          "50%": {
            transform: "translateY(-8px)",
          },
        },
      },

      animation: {
        fade: "fadeIn .4s ease",

        slide: "slideUp .5s ease",

        scale: "scaleIn .3s ease",

        float: "float 3s ease-in-out infinite",
      },
    },
  },

  plugins: [],
};