/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Karla", "sans-serif"],
        fontRubik:["Rubik Doodle Shadow","sans-serif"],
        Courgette:["Courgette"],
        SyneMono:["Syne Mono","monospace"],
        karla:["Karla","sans-serif"],
        bebas:['Bebas Neue', 'sans-serif']
      },
      backgroundImage: {
        "hero-pattern": "url('/assets/coolmerc1.jpeg')",
      },
      fontSize: {
        'mammoth':'5rem',
        'goliath':'7rem',
        'supermassive':'10rem'
      },
      color: {
        customcolor: '#fff', // Add a new color with the name 'customcolor' and value '#fff'
      },
      textShadow: {
        customcolor: '0 0 10px #fff, 0 0 20px #fff, 0 0 40px #fff, 0 0 80px #fff',
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.gradient-overlay': {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: 'linear-gradient(to right, transparent, white)',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}