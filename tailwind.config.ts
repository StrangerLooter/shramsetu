import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#FAFAF9', // Calm warm neutral background
        surface: {
          DEFAULT: '#FFFFFF',
          subtle: '#F4F4F1',
          hover: '#F0F0EC',
        },
        content: {
          DEFAULT: '#09090B',
          secondary: '#3F3F46',
          muted: '#71717A',
          subtle: '#A1A1AA',
        },
        border: {
          DEFAULT: '#E4E4E7',
          subtle: '#F1F1F0',
          dark: '#27272A',
        },
        civic: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        },
        brand: {
          50: '#F0F5FF',
          100: '#E0EBFF',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E3A8A',
          900: '#0F172A',
          950: '#090D1A',
        },
        coop: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        worker: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.03), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
        'float': '0 8px 24px -4px rgba(0, 0, 0, 0.06)',
        'premium': '0 12px 32px -8px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
};
export default config;
