import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        'color-primary': {
          DEFAULT: '#1391a0',
          50: '#5A5E64',
          100: '#50545A',
          200: '#3F424A',
          300: '#2E3039',
          400: '#1E2029',
          500: '#04080F',
          600: '#03070E',
          700: '#02060C',
          800: '#01040B',
          900: '#00030A',
        },
        'color-secundary': {
          DEFAULT: '#00ABF0',
          50: '#A9DFFA',
          100: '#85D0F6',
          200: '#57BEEF',
          300: '#2EAAE7',
          400: '#179CE3',
          500: '#00ABF0',
          600: '#00A0E7',
          700: '#0096DD',
          800: '#008CDA',
          900: '#007ACF',
        },
        'color-background': {
          DEFAULT: '#effdff',
        },
        'color-text': {
          DEFAULT: '#02805a',
        },
        'color-title': {
          DEFAULT: '#DAE3E5',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#F7F8F9',
          400: '#EBEDEF',
          500: '#DAE3E5',
          600: '#B7C2C8',
          700: '#95A4AB',
          800: '#72868E',
          900: '#566E7A',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
