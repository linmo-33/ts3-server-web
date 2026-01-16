/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'var(--font-noto-sc)',
          '"PingFang SC"',
          '"Microsoft YaHei"',
          'sans-serif'
        ],
      },
      colors: {
        // Fresh Green Theme - Claymorphism Style
        fresh: {
          // Background
          bg: '#FDF8F3',
          'bg-deep': '#FAF3EC',

          // Cards
          card: '#FFFFFF',
          'card-hover': '#FEFEFE',

          // Borders
          border: 'rgba(31, 41, 55, 0.08)',
          'border-hover': 'rgba(34, 197, 94, 0.3)',

          // Primary Green
          primary: '#22C55E',
          'primary-dark': '#16A34A',
          'primary-deep': '#166534',
          'primary-light': '#4ADE80',

          // Accent Pink/Coral
          accent: '#F87171',
          'accent-light': '#FB7185',
          'accent-deep': '#EF4444',

          // Success/Warning/Error
          success: '#22C55E',
          warning: '#F59E0B',
          error: '#EF4444',

          // Text Colors
          text: '#1F2937',
          'text-secondary': '#4B5563',
          'text-muted': '#9CA3AF',
        }
      },
      backgroundImage: {
        'fresh-gradient': 'linear-gradient(180deg, #FDF8F3 0%, #FAF3EC 50%, #FDF8F3 100%)',
        'fresh-btn': 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
        'fresh-btn-accent': 'linear-gradient(135deg, #F87171 0%, #FB7185 100%)',
        'fresh-text': 'linear-gradient(90deg, #22C55E 0%, #16A34A 100%)',
      },
      boxShadow: {
        'fresh': '0 4px 20px rgba(31, 41, 55, 0.06)',
        'fresh-lg': '0 8px 30px rgba(31, 41, 55, 0.08)',
        'fresh-xl': '0 12px 40px rgba(31, 41, 55, 0.1)',
        'fresh-primary': '0 4px 20px rgba(34, 197, 94, 0.25)',
        'fresh-accent': '0 4px 20px rgba(248, 113, 113, 0.25)',
        // Claymorphism shadows
        'clay': '8px 8px 20px rgba(31, 41, 55, 0.08), -4px -4px 12px rgba(255, 255, 255, 0.9)',
        'clay-inset': 'inset 4px 4px 10px rgba(31, 41, 55, 0.05), inset -4px -4px 10px rgba(255, 255, 255, 0.8)',
      },
      animation: {
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'bounce-soft': 'bounce-soft 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-soft': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' },
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
