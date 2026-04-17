/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#FBFAF7',
        cloud: '#F2F0EB',
        ink: '#0A1228',
        navy: {
          DEFAULT: '#0F2B5B',
          deep: '#081A3C',
          soft: '#5B7DB8',
        },
        crimson: {
          DEFAULT: '#B8242B',
          deep: '#8A1A20',
        },
        blush: '#E8D3D1',
        ash: '#6A6E78',
        line: '#D8D5CD',
        gold: '#B8914A',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'eyebrow': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.16em' }],
        'meta': ['0.875rem', { lineHeight: '1.5' }],
        'body': ['1rem', { lineHeight: '1.65' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'h3': ['clamp(1.25rem, 2vw, 1.75rem)', { lineHeight: '1.25' }],
        'h2': ['clamp(1.625rem, 3.5vw, 2.5rem)', { lineHeight: '1.15' }],
        'h1': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.1' }],
        'display-lg': ['clamp(2.25rem, 6vw, 4.5rem)', { lineHeight: '1.05' }],
        'display-xl': ['clamp(3rem, 9vw, 6.5rem)', { lineHeight: '1.0' }],
      },
      letterSpacing: {
        eyebrow: '0.16em',
        tight: '-0.015em',
      },
      maxWidth: {
        container: '1440px',
        prose: '68ch',
      },
      spacing: {
        'section': 'clamp(4rem, 10vw, 10rem)',
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        '160': '160ms',
        '280': '280ms',
        '480': '480ms',
        '800': '800ms',
      },
      backgroundImage: {
        'royal-descent': 'linear-gradient(180deg, #0F2B5B 0%, #081A3C 60%, #0A1228 100%)',
        'ceremonial-fade': 'linear-gradient(135deg, #FBFAF7 0%, #E8D3D1 55%, #B8242B 100%)',
        'crimson-ink': 'linear-gradient(160deg, #B8242B 0%, #8A1A20 50%, #0A1228 100%)',
        'flag-whisper': 'linear-gradient(135deg, #0F2B5B 0%, #1A1F3A 30%, #3A1F24 70%, #B8242B 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 480ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'rise': 'rise 800ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'marquee': 'marquee 40s linear infinite',
        'drift': 'drift 2.4s cubic-bezier(0.22, 1, 0.36, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        drift: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '50%': { transform: 'translateY(10px)', opacity: '1' },
        },
      },
      boxShadow: {
        'elevated': '0 20px 40px -20px rgba(11, 18, 40, 0.15)',
      },
    },
  },
  plugins: [],
}
