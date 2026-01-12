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
        // 深色赛博朋克主题 (dark mode)
        cyber: {
          bg: '#0D0D1A',
          'bg-deep': '#08081A',
          card: '#141428',
          'card-hover': '#1a1a35',
          border: 'rgba(0, 245, 255, 0.1)',
          'border-hover': 'rgba(0, 245, 255, 0.3)',
          cyan: '#00F5FF',
          'cyan-dim': '#00C4CC',
          purple: '#BF00FF',
          'purple-dim': '#9900CC',
          pink: '#FF00AA',
          'pink-dim': '#CC0088',
          success: '#00FF9F',
          'success-dim': '#00CC7F',
          warning: '#FFB800',
          error: '#FF3366',
          text: '#FFFFFF',
          'text-secondary': '#B4B4D0',
          'text-muted': '#6B6B8A',
        },
        // 浅色奶油主题 (light mode)
        cream: {
          bg: '#FFFBF5',
          'bg-deep': '#FFF8F0',
          card: '#FFFFFF',
          'card-hover': '#FFF5EB',
          border: 'rgba(93, 78, 55, 0.1)',
          'border-hover': 'rgba(255, 138, 101, 0.3)',
          primary: '#FF8A65',
          'primary-dim': '#FF7043',
          'primary-light': '#FFAB91',
          secondary: '#B39DDB',
          'secondary-dim': '#9575CD',
          'secondary-light': '#D1C4E9',
          success: '#81C784',
          'success-dim': '#66BB6A',
          warning: '#FFB74D',
          error: '#E57373',
          text: '#5D4E37',
          'text-secondary': '#8B7355',
          'text-muted': '#A89880',
        }
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(180deg, #0D0D1A 0%, #141428 50%, #0D0D1A 100%)',
        'cyber-btn': 'linear-gradient(135deg, #00F5FF 0%, #BF00FF 100%)',
        'cyber-text': 'linear-gradient(90deg, #00F5FF 0%, #BF00FF 50%, #FF00AA 100%)',
        'cream-gradient': 'linear-gradient(180deg, #FFFBF5 0%, #FFF8F0 50%, #FFFBF5 100%)',
        'cream-btn': 'linear-gradient(135deg, #FF8A65 0%, #B39DDB 100%)',
        'cream-text': 'linear-gradient(90deg, #FF8A65 0%, #B39DDB 100%)',
      },
      boxShadow: {
        'cyber': '0 4px 30px rgba(0, 0, 0, 0.5)',
        'cyber-cyan': '0 0 30px rgba(0, 245, 255, 0.3)',
        'cyber-glow': '0 0 60px rgba(0, 245, 255, 0.2), 0 0 100px rgba(191, 0, 255, 0.1)',
        'cream': '0 4px 20px rgba(93, 78, 55, 0.08)',
        'cream-hover': '0 8px 30px rgba(93, 78, 55, 0.12)',
        'cream-primary': '0 4px 20px rgba(255, 138, 101, 0.25)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
}
