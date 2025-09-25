/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./views/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      // Breakpoints otimizados para dispositivos móveis
      screens: {
        'xs': '375px',    // Smartphones pequenos
        'sm': '640px',    // Smartphones grandes
        'md': '768px',    // Tablets portrait
        'lg': '1024px',   // Tablets landscape / Desktop pequeno
        'xl': '1280px',   // Desktop médio
        '2xl': '1536px',  // Desktop grande
        // Breakpoints customizados
        'mobile': {'max': '767px'},     // Apenas mobile
        'tablet': {'min': '768px', 'max': '1023px'}, // Apenas tablet
        'desktop': {'min': '1024px'},   // Desktop e acima
      },
      
      // Espaçamentos otimizados para mobile
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      
      // Tamanhos de fonte responsivos
      fontSize: {
        'xs-mobile': ['0.75rem', { lineHeight: '1rem' }],
        'sm-mobile': ['0.875rem', { lineHeight: '1.25rem' }],
        'base-mobile': ['1rem', { lineHeight: '1.5rem' }],
        'lg-mobile': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl-mobile': ['1.25rem', { lineHeight: '1.75rem' }],
      },
      
      // Alturas mínimas para mobile
      minHeight: {
        'screen-mobile': '100vh',
        'screen-safe': 'calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
      },
      
      // Larguras máximas para containers
      maxWidth: {
        'mobile': '100vw',
        'tablet': '768px',
        'desktop': '1200px',
      },
      
      // Animações otimizadas para mobile
      animation: {
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in-mobile': 'fadeInMobile 0.4s ease-out',
      },
      
      keyframes: {
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeInMobile: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      
      // Cores com melhor contraste para mobile
      colors: {
        'mobile-primary': '#0d9488',
        'mobile-secondary': '#06b6d4',
        'mobile-accent': '#8b5cf6',
        'mobile-background': '#f8fafc',
        'mobile-surface': '#ffffff',
        'mobile-text': '#1f2937',
        'mobile-text-light': '#6b7280',
      },
    },
  },
  plugins: [
    // Plugin para suporte a safe areas (notch, etc)
    function({ addUtilities }) {
      addUtilities({
        '.safe-area-inset': {
          'padding-top': 'env(safe-area-inset-top)',
          'padding-bottom': 'env(safe-area-inset-bottom)',
          'padding-left': 'env(safe-area-inset-left)',
          'padding-right': 'env(safe-area-inset-right)',
        },
        '.touch-manipulation': {
          'touch-action': 'manipulation',
        },
        '.scroll-smooth-mobile': {
          'scroll-behavior': 'smooth',
          '-webkit-overflow-scrolling': 'touch',
        },
      });
    },
  ],
}