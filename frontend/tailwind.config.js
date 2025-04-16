/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        coffee: {
          dark: '#3b2f2f',
          light: '#e6c6a5',
          accent: '#ffd8a9',
        },
        white: {
          DEFAULT: '#ffffff',
          '90': 'rgba(255, 255, 255, 0.9)',
          '80': 'rgba(255, 255, 255, 0.8)',
        },
        black: {
          '40': 'rgba(0, 0, 0, 0.4)',
          '50': 'rgba(0, 0, 0, 0.5)',
        },
      },
      fontSize: {
        sm: "1.25rem",    // 20px
        base: "1.5rem",   // 24px
        lg: "1.75rem",    // 28px
        xl: "2rem",       // 32px
        "2xl": "2.5rem",  // 40px
        "3xl": "3rem",    // 48px
        "4xl": "3.5rem",  // 56px
      },
      spacing: {
        28: "7rem",     // для больших отступов
        36: "9rem",
        44: "11rem",
      },
      maxWidth: {
        'screen-2xl': '1536px',
        '1600': '1600px',
      },
      minHeight: {
        '200': '200px',
        '220': '220px',
      },
      minWidth: {
        '200': '200px',
        '220': '220px',
      },
      backdropBlur: {
        xs: '2px',
      },
      brightness: {
        50: '.5',
      },
      gridTemplateColumns: {
        'fluid': 'repeat(auto-fit, minmax(220px, 1fr))',
      },
    },
  },
  plugins: [],
} 