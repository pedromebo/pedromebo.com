/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...fontFamily.sans],
      },
      colors: {
        primary: {
          // Night City Synthwave (Cyan & Magenta)
          200: 'rgb(var(--tw-clr-primary-200) / <alpha-value>)',
          300: 'rgb(var(--tw-clr-primary-300) / <alpha-value>)',
          400: 'rgb(var(--tw-clr-primary-400) / <alpha-value>)',
          500: 'rgb(var(--tw-clr-primary-500) / <alpha-value>)',
        },
        dark: '#111638',
        night: '#0a0d24',
        synth: {
          primary: '#0a0d24',
          'ink-deep': '#111638',
          'on-primary': '#ffffff',
          cyan: '#00f5d4',
          magenta: '#ff2e93',
          indigo: '#596dff',
          'indigo-deep': '#24208f',
          'indigo-mid': '#586094',
          'canvas-dark': '#111638',
          'canvas-light': '#ffffff',
          night: '#0a0d24',
          'press-light': '#eff0f7',
          'press-stronger': '#e6e8f2',
          'hairline-indigo': '#262f6e',
          'hairline-cool': '#cbcfe0',
          'hairline-cloud': '#e5e7eb',
          ink: '#111638',
          'ink-press': '#0e122e',
          'on-dark-muted': '#b6bddb',
          'on-dark-faint': '#282f59',
          'ring-focus': '#00f5d4',
        },
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: 0.99,
            filter:
              'drop-shadow(0 0 1px rgba(0, 245, 212, 0.9)) drop-shadow(0 0 15px rgba(255, 46, 147, 0.7)) drop-shadow(0 0 1px rgba(0, 245, 212, 0.9))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: 0.4,
            filter: 'none',
          },
        },
        tilt: {
          '0%, 50%, 100%': {
            transform: 'rotate(0deg)',
          },
          '25%': {
            transform: 'rotate(0.5deg)',
          },
          '75%': {
            transform: 'rotate(-0.5deg)',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        tilt: 'tilt 10s infinite linear',
      },
      typography: {
        DEFAULT: {},
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
