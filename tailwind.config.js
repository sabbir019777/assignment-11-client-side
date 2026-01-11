// tailwind.config.js 
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  
  darkMode: 'class', 

  theme: {
    extend: {
      keyframes: {
        'neon-glow': {
          '0%, 100%': { filter: 'drop-shadow(0 0 1px #8B5CF6) drop-shadow(0 0 4px #EC4899)' },
          '50%': { filter: 'drop-shadow(0 0 10px #8B5CF6) drop-shadow(0 0 15px #EC4899)' },
        },
        'border-pulse': {
          '0%, 100%': { 'border-color': 'rgba(129, 230, 217, 0.5)' },
          '50%': { 'border-color': 'rgba(129, 230, 217, 1)' },
        },
      },
      animation: {
        'neon-slow': 'neon-glow 5s ease-in-out infinite',
        'border-pulse': 'border-pulse 3s ease-in-out infinite',
      },
    },
  },
}