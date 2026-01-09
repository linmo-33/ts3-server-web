/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        // 红黑游戏主题
        gaming: {
          bg: '#0a0a0a',
          card: '#141414',
          border: 'rgba(255, 255, 255, 0.06)',
          red: '#ef4444',
          'red-dark': '#dc2626',
          'red-light': '#f87171',
          text: '#ffffff',
          'text-muted': '#a1a1aa',
          'text-dim': '#71717a',
        }
      },
      backgroundImage: {
        'gaming-gradient': 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)',
        'gaming-card': 'linear-gradient(135deg, rgba(20, 20, 20, 0.9) 0%, rgba(15, 15, 15, 0.95) 100%)',
        'gaming-btn': 'linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #f87171 100%)',
      },
      boxShadow: {
        'gaming': '0 4px 30px rgba(0, 0, 0, 0.5)',
        'gaming-red': '0 4px 20px rgba(239, 68, 68, 0.3)',
        'gaming-glow': '0 0 40px rgba(239, 68, 68, 0.15)',
      }
    },
  },
  plugins: [],
}
