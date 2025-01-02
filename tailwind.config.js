/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        black: 'hsl(0 0% 0%)',
        white: 'hsl(0 0% 100%)',
        transparent: 'hsl(0 0% 0% / 0%)',
        primary: 'hsl(0 0% 100%)',
        secondary: 'hsl(0 0% 0%)',
        info: 'hsl(200 54% 53%)',
        success: 'hsl(134 61% 41%)',
        warning: 'hsl(45 100% 42%)',
        error: 'hsl(354 70% 54%)',
        bg: 'hsl(0 0% 8%)',
        'text-light': 'hsl(0 0% 0%)',
        'text-dark': 'hsl(0 0% 100%)',
        'shadow-pink': 'hsl(313 100% 81%)',
        'shadow-torquoise': 'hsl(175 100% 65%)',
      },
      fontFamily: {
        text: ['open-sans', 'sans-serif'],
      },
      fontSize: {
        '2xs': '.625rem',  // 10px
        'xs': '.75rem',    // 12px
        's': '.875rem',    // 14px
        'm': '1rem',       // 16px
        'l': '1.125rem',   // 18px
        'xl': '1.5rem',    // 24px
        '2xl': '2rem',     // 32px
        '3xl': '2.5rem',   // 40px
      },
      lineHeight: {
        normal: '1.5',
      },
      fontWeight: {
        normal: '400',
      },
      fontStyle: {
        normal: 'normal',
      },
      spacing: {
        '2': '.125rem', // 2px
        '4': '.25rem',  // 4px
        '8': '.5rem',   // 8px
        '16': '1rem',   // 16px
        '24': '1.5rem', // 24px
        '32': '2rem',   // 32px
        '40': '2.5rem', // 40px
      },
      borderWidth: {
        '1': '1px',
        '2': '2px',
      },
      borderRadius: {
        '2': '.125rem', // 2px
        '4': '.25rem',  // 4px
        '8': '.5rem',   // 8px
        '16': '1rem',   // 16px
        'circle': '50%',
        'full': '100vmax',
        'none': '0',
      },
      boxShadow: {
        '2': '0 0 2px',
        '3': '0 0 3px',
        '4': '0 0 4px',
        '8': '0 0 8px',
        '16': '0 0 16px',
        '24': '0 0 24px',
      },
      transitionDuration: {
        'default': '.25s',
      },
      transitionTimingFunction: {
        'default': 'ease-in-out',
      },
      screens: {
        'sm': '640px',   // Small devices (e.g., mobile phones)
        'md': '768px',   // Medium devices (e.g., tablets)
        'lg': '1024px',  // Large devices (e.g., laptops)
        'xl': '1280px',  // Extra large devices (e.g., desktops)
        '2xl': '1536px', // Extra extra large devices (e.g., large desktops)
      },
      keyframes: {
        moveToTop: {
          '0%': { transform: 'translate(-50%, calc(-50svb + 100%))' },
          '30%, 70%': { opacity: '1' },
          '100%': { transform: 'translate(-50%, calc(50svb - 100%))' },
        },
      },
      animation: {
        moveToTop: 'moveToTop 5s linear forwards',
      },
      padding: {
        'section-block': 'clamp(2rem, 10svb, 8rem)',
        'section-inline': 'clamp(1rem, 4svi, 3rem)',
      },
      translate: {
        'half': '-50%',
        '80': '-80%',
      },
      opacity: {
        '0': '0',
        '100': '1',
      },
    },
  },
  plugins: [],
}