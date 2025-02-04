/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Matches all React components
  ],
  theme: {
    screens: {
      'sm': '480px', // Small screen / phone
      'md': '768px', // Medium screen / tablet
      'lg': '1024px', // Large screen / desktop
      'xl': '1280px', // Extra large screen / wide desktop
      '2xl': '1536px', // Extra extra large screen / full hd
    },
    color: {
      'deeppurple':'rgba(30, 0, 120, 0.7)',
      'lightpurple':'rgba(30, 0, 120, 0.2)',
      'transparent' :'rgba(30, 0, 120, 0.1)',
      'white': 'white',
      'grey':'grey',
    },
    extend: {},
  },
  plugins: [],
};
