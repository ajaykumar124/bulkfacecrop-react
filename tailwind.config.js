/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'panel-bg': 'var(--panel-bg)',
        'panel-border': 'var(--panel-border)',
        'text-main': 'var(--text-main)',
        'text-muted': 'var(--text-muted)',
        'glass-bg': 'var(--glass-bg)',
        'glass-bg-hover': 'var(--glass-bg-hover)',
        'glass-border': 'var(--glass-border)',
        'glass-border-hover': 'var(--glass-border-hover)',
        'card-bg': 'var(--card-bg)',
        'accent-color': '#3b82f6',
        'success-color': '#10b981',
      },
      keyframes: {
        gradientBG: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          'from': { opacity: '0', transform: 'translateY(-20px) translateX(-50%)' },
          'to': { opacity: '1', transform: 'translateY(0) translateX(-50%)' },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        }
      },
      animation: {
        'gradient-bg': 'gradientBG 15s ease infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'fade-in-down': 'fadeInDown 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      backgroundSize: {
        '400%': '400% 400%',
      }
    },
  },
  plugins: [],
}
