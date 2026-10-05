/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./web/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#ef4444",
          crimson: "#dc2626",
          darkRed: "#991b1b",
          emerald: "#10b981",
          darkEmerald: "#059669",
          cyan: "#06b6d4",
          darkCanvas: "#09090b",
          surface: "#121215",
          card: "#18181b",
          cardElevated: "#222226",
          border: "#27272a",
          borderHighlight: "#3f3f46",
          mutedText: "#a1a1aa",
          subtleText: "#71717a"
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    }
  },
  plugins: [],
}
