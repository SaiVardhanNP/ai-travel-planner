// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // or your path
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // ✅ extend font-sans
      },
    },
  },
  plugins: [],
}
