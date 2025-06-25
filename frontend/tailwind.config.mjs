/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: '3px 4px 4px rgba(0, 0, 0, 0.25)', // Agregar sombra personalizada
      },
      fontFamily: {
        sans: ['Montserrat', 'var(--font-montserrat)', 'Arial', 'sans-serif'], // Cambia la fuente por defecto
      },
      colors: {
        bgComponents: '#1E1C1D', // Background de componentes
        background: '#232323',
        foreground: '#DDDDDD',
        btnBach: '#131313',
        whiteText: '#DDDDDD',
        redSpend: '#D54C4C',
        greenIn: '#39B54A',
      },

    },
  },
  plugins: [],
};

// background: '#353535',
