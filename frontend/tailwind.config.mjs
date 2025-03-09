/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'var(--font-montserrat)', 'Arial', 'sans-serif'], // Cambia la fuente por defecto
      },
      colors: {
        background: '#353535',
        foreground: '#DDDDDD',
        topHeader: '#131313',
        whiteText: '#DDDDDD',
        redSpend: '#D54C4C',
        greenIn: '#00DC1D',
        bgComponents: '#626262',
      },
    },
  },
  plugins: [],
};
