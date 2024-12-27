/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '640px', // Tamanho de tela para 'sm' (pequeno)
        'md': '768px', // Tamanho de tela para 'md' (médio)
        'lg': '1024px', // Tamanho de tela para 'lg' (grande)
        'xl': '1280px', // Tamanho de tela para 'xl' (extra grande)
        '2xl': '1536px', // Tamanho de tela para '2xl' (extra extra grande)
        'xxl': '1800px', // Exemplo de breakpoint personalizado
      },

      colors: {
        preto: '#191C20',
        preto2:'#000000',
        azulClaro:'#36618E',
        primary: '#e5e7eb',
        secondary: '#033aa8',
        detail: '#cccccc',
        divisor: '#7a7a7a',
        violeta: '#8A2BE2',
        roxo: '#800080',
        cinza: 'gray-600',
        vermelho: '#FF0000',
        azul: '#0000FF',
        verde: '#008000',
        amarelo: '#FFFF00',
        laranja: '#FFA500',
        azulescuro: '#00008B',
        azulmarinho: '#000080',
        marron: '#8B4513',
        bordo: '#800000',
        branco: '#FFFFFF',
        rosa: '#FFC0CB',
        bege: '#F5F5DC',
        customBlue: '#001D36',
        customLightBlue: '#F8F9FF',
        customBlueBorder: '#36618E',
        customBlueRelease: '#36618E',
        customHeaderBlack: '#191C20', 
        customGray: '#73777F',
        customGrayBg: '#DFE2EB',
                
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'ui-serif', 'Georgia', 'serif'],
        mono: ['Fira Code', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        visby: ['"Visby CF"', 'sans-serif'],
      },
      fontWeight: {
        thin: '100',
        hairline: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        'extra-bold': '800',
        black: '900',
      },
      fontSize: {
        'custom-2-5rem': '2.5rem',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.placeholder-gray::placeholder': {
          color: '#B0BEC5',
        },
        '.placeholder-bold::placeholder': {
        fontWeight: '600', // Altere o valor conforme necessário (400, 500, 600, 700, etc.)
      },
    })
  }
]
}
