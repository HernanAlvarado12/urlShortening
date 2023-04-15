/** @type {import('tailwindcss').Config} */
export default {
  content: ['./*.{html,js}'],
  darkMode: 'class',
  future: {
    hoverOnlyWhenSupported: true
  },
  theme: {
    extend: {
      screens: {
        xs: '724px',
        md: '900px'
      },
      spacing: {
        '0.2': '0.2rem',
        '0.5': '0.5rem',
        '1': '1rem',
        '1.5': '1.5rem',
        '2': '2rem',
        '3': '3rem',
        '3.5': '3.5rem',
        '4': '4rem',
        '5': '5rem',
        '6': '6rem',
        '7': '7rem',
        '8': '8rem',
        '9': '9rem',
        '10': '10rem',
        '15': '15rem',
        '50': '50%',
        '85': '85%',
        '90': '90%'
      },
      gridTemplateColumns: {
        shorter: '5.5fr 5fr'
      },
      fontSize: {
        xs: '1.4rem',
        sm: '1.6rem',
        md: '1.8rem',
        base: '2.4rem',
        lg: '2.8rem',
        xl: '4.2rem',
        '2xl': '5.2rem'
      },
      borderRadius: {
        sm: '0.6rem',
        md: '0.8rem',
        lg: '1rem'
      },
      transitionDuration: {
        400: '400ms'
      },
      colors: {
        gray: 'hsl(0, 0%, 75%)',
        red: 'hsl(0, 87%, 67%)',
        cyan: 'hsl(180, 66%, 49%)',
        blue: 'hsl(255, 11%, 22%)',
        violet: {
          DEFAULT: 'hsl(257, 27%, 26%)',
          100: 'hsl(257, 7%, 63%)',
          200: 'hsl(260, 8%, 14%)'
        },
      }
    },
  },
  plugins: [],
}

