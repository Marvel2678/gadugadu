/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ['./app/index.tsx', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brand1: '#F25912',
        brand2: '#5C3E94',
        brand3: '#412B6B',
        brand4: '#211832',
      },
      animation: {
        typewriter: 'typewriter 2s steps(11) forwards',
      },
      keyframes: {
        typewriter: {
          to: {
            left: '100%',
          },
        },
      },
    },
  },
  plugins: [],
};
