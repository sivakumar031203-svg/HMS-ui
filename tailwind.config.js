// tailwind.config.js — replace entire file
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Tells Tailwind WHERE to look for class names
    // Only includes CSS for classes you actually use
    // This is called "purging" — keeps bundle size tiny
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
        // Custom color — used as: bg-primary-500, text-primary-700
        // Extend means ADD to defaults, not replace them
      }
    },
  },
  plugins: [],
}