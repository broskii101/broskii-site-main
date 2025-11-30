/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lora', 'serif'], // Body text
        serif: ['Playfair Display', 'serif'], // Headings
        display: ['Playfair Display', 'serif'], // Alternative for headings
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Exact Broskii logo blue from the goggles/mountain area
        'broskii-blue': {
          DEFAULT: '#2b5b93', // The exact blue from the logo goggles
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#648199',
          600: '#2b5b93', // Main color
          700: '#1e4a7a',
          800: '#163a61',
          900: '#0f2a48',
        },
        // Exact light blue from the screenshot - updated to match precisely
        'broskii-light-blue': {
          DEFAULT: '#55c9f4', // Updated to match the exact screenshot color
          50: '#f0f9fe',
          100: '#e0f3fd',
          200: '#bae6fb',
          300: '#7dd3f8',
          400: '#38bef5',
          500: '#55c9f4', // Main color - exact match from screenshot
          600: '#0ea5e9',
          700: '#0284c7',
          800: '#0369a1',
          900: '#075985',
        },
        // Custom Broskii dark blue color
        'broskii-dark-blue': {
          DEFAULT: '#6093AC',
          50: '#f2f7fa',
          100: '#e6eff4',
          200: '#ccdfe9',
          300: '#b3cfde',
          400: '#99bfd3',
          500: '#80afc8',
          600: '#6093AC', // Main color - rgb(96, 147, 172)
          700: '#4d7689',
          800: '#3a5966',
          900: '#263c43',
        },
        // Custom CTA blue color - rgb(0, 124, 176)
        'broskii-cta-blue': {
          DEFAULT: '#007CB0',
          50: '#e6f4fb',
          100: '#cce9f7',
          200: '#99d3ef',
          300: '#66bde7',
          400: '#33a7df',
          500: '#0091d7',
          600: '#007CB0', // Main color - rgb(0, 124, 176)
          700: '#006a96',
          800: '#00587c',
          900: '#004662',
        },
        // Custom mission blue color - rgb(130, 202, 255)
        'broskii-mission-blue': {
          DEFAULT: '#82CAFF',
          50: '#f0f8ff',
          100: '#e0f1ff',
          200: '#c1e3ff',
          300: '#a2d5ff',
          400: '#82caff', // Main color - rgb(130, 202, 255)
          500: '#63bfff',
          600: '#44b4ff',
          700: '#25a9ff',
          800: '#069eff',
          900: '#0093e6',
        },
        // Custom cream background color - rgb(255, 254, 250)
        'broskii-cream': {
          DEFAULT: '#FFFEFA',
        },
        snow: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
};