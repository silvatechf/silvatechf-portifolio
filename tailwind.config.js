/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#08070b",
          secondary: "#0f0e13",
          tertiary: "#1a191f",
        },
        accent: {
          primary: "#c8a4f4",
          secondary: "#f4c8a4",
          tertiary: "#7ee0d0",
        },
        text: {
          primary: "#f0eef5",
          secondary: "#8a8894",
        },
        line: "rgba(200, 164, 244, 0.08)",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: {
        sm: "4px",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(200, 164, 244, 0.1)",
        "glow-sm": "0 0 24px -8px rgba(200, 164, 244, 0.12)",
      },
      letterSpacing: {
        widest: ".22em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "draw-line": {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        "fade-up": "fade-up 600ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
      },
      transitionTimingFunction: {
        entrance: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      backgroundImage: {
        "mesh-void":
          "radial-gradient(60% 60% at 20% 20%, rgba(200,164,244,0.16) 0%, rgba(200,164,244,0) 60%), radial-gradient(50% 50% at 80% 30%, rgba(244,200,164,0.10) 0%, rgba(244,200,164,0) 60%), radial-gradient(70% 70% at 50% 80%, rgba(126,224,208,0.08) 0%, rgba(126,224,208,0) 60%)",
      },
    },
  },
  plugins: [],
};
