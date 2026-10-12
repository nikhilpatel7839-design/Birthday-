module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        blush: '#f9dfe7',
        cream: '#fffaf3',
        lilac: '#e8ddff',
        peach: '#f7d7c4',
        rose: '#d77a96',
        ink: '#4a3d46',
        sage: '#cfe5d8'
      },
      boxShadow: {
        paper: '0 18px 45px rgba(70, 51, 59, 0.12)',
        card: '0 10px 25px rgba(101, 71, 85, 0.12)'
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
        body: ['Arial', 'sans-serif']
      },
      backgroundImage: {
        grain: 'radial-gradient(circle at 1px 1px, rgba(105,86,94,0.08) 1.2px, transparent 0)'
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' }
        }
      },
      animation: {
        floaty: 'floaty 5s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
