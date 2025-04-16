/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        coffee: {
          brown: '#4A2C2A',
          light: '#F5E6D3',
          dark: '#2C1810',
          accent: '#D4A574',
        },
        mint: {
          100: '#E8F5E9',
          200: '#A3D9C1',
          400: '#4CAF50',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'coffee-pattern': "url('/coffee_background.png')",
      },
    },
  },
  plugins: [],
} 