import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'app-palette': {
          100: '#54494B',
          200: '#F1F7ED',
          300: '#91C7B1',
          400: '#B33951',
          500: '#E3D081'
        }
      },
      screens: {
        '-2xl': { max: '1600px'},
        // => @media (max-width: 1600px) { ... }
        '-xl': { max: '1400px'},
        // => @media (max-width: 1400px) { ... }
        '-lg': { max: '1023px'},
        // => @media (max-width: 1023px) { ... }
        '-md': { max: '767px'},
        // => @media (max-width: 767px) { ... }
        '-sm': { max: '639px'},
        // => @media (max-width: 639px) { ... }
        '-xs': { max: '480px'},
        // => @media (max-width: 480px) { ... }
      },
      keyframes: {
        glow: {
          '50%': {
            transform: 'scale(1.1)',
            filter: 'brightness(1.5)',
          }
        },
        glow_saturate: {
          '50%': {
            transform: 'scale(1.04)',
            filter: 'brightness(1.2)',
          }
        },
        saturate: {
          '50%': {
            filter: 'brightness(1.5)',
            transform: 'scale(1.1)',
          }
        }
      },
      animation: {
        glow: 'glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        glow_saturate: 'glow_saturate 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        saturate: 'saturate 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }
    },
  },
  plugins: [],
}
export default config
