/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],         // Fuente Inter regular
        interbold: ['InterBold', 'sans-serif'], // Fuente InterBold personalizada
      },
      colors: {
        primary: '#00ACC9',      // Color principal
        secondary: '#80BA27',    // Color secundario
        dark: '#132740',         // Color oscuro
        light: '#EFEFEF',        // Color claro
        fontPrimary: '#5F5E5E',  // Color de fuente principal
        gradient: {              // Gradiente personalizado
          from: '#00ACC9',       // Empieza en el color principal
          to: '#80BA27',         // Termina en el color secundario
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(90deg, #00ACC9 0%, #80BA27 100%)',
      },
      fontSize: {
        'interbold-base': ['22px', '28px'], // Tamaño y line-height de InterBold
      },
    },
  },
  plugins: [],
}
