/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        'auto':'repeat(auto-fill, minmax(200px, 1fr))'
      },
      colors:{
        // New Modern Medical Color Palette
        'primary': '#0B8376',      // Teal/Medical green (main brand color)
        'secondary': '#FF6B6B',    // Coral red (accents, urgent)
        'accent': '#4ECDC4',       // Light teal (hover states)
        'dark': '#1A2332',         // Deep navy (text, headers)
        'light': '#F8FFFE',        // Off-white (backgrounds)
        'gray-custom': '#6B7280',  // Custom gray for text
        'success': '#10B981',      // Green for success states
        'warning': '#F59E0B',      // Amber for warnings
      },
      fontFamily: {
        'primary': ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'button': '0 2px 8px rgba(11, 131, 118, 0.3)',
        'soft': '0 2px 15px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        'card': '16px',
        'button': '12px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}