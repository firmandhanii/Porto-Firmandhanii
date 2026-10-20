/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0B0B14',
          card: '#120E24',
          hover: '#1A1536',
          alt: '#0F0C1D',
        },
        line: '#1A1536',
        accent: {
          DEFAULT: '#8B5CF6',
          hover: '#7C3AED',
          // Lighter violet for small text: passes WCAG AA (≥4.5:1) on bg
          soft: '#A78BFA',
        },
        // Secondary accent used for gradients and highlights
        cyan: {
          DEFAULT: '#22D3EE',
        },
        text: {
          primary: '#F3F4F6',
          secondary: '#D1D5DB',
          muted: '#9CA3AF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
