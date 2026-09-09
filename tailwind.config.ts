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
        // Wispr Flow Inspired Editorial Palette
        canvas: '#FBF9F5', // Soft warm cream/off-white primary page background
        cream: {
          DEFAULT: '#FBF9F5',
          subtle: '#F6F3EB',
          surface: '#FFFFFF',
          card: '#FFFFFF',
          border: 'rgba(18, 19, 22, 0.08)',
        },
        charcoal: {
          DEFAULT: '#121316', // Deep near-black for primary text
          secondary: '#2C2D31',
          muted: '#66676E',
          subtle: '#9D9EA5',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          cream: '#FBF9F5',
          beige: '#F2EFE9',
          subtle: '#F6F3EC',
          hover: '#EDE9E0',
        },
        content: {
          DEFAULT: '#121316',
          secondary: '#36373D',
          muted: '#696A72',
          subtle: '#9A9BA2',
        },
        border: {
          DEFAULT: 'rgba(18, 19, 22, 0.10)',
          subtle: 'rgba(18, 19, 22, 0.06)',
          strong: 'rgba(18, 19, 22, 0.20)',
          dark: 'rgba(255, 255, 255, 0.15)',
        },
        // Deep Teal / Forest Green for high-impact showcase sections
        teal: {
          deep: '#0D2F28',
          surface: '#133D34',
          subtle: '#1C4A40',
          border: 'rgba(255, 255, 255, 0.12)',
        },
        // Soft Lavender / Light Purple for primary CTAs and interactive accents
        lavender: {
          DEFAULT: '#DDD6FE',
          accent: '#E2DCFD',
          hover: '#D4CBFC',
          soft: '#F1EDFD',
          border: 'rgba(18, 19, 22, 0.20)',
        },
        // Muted Beige / Gray-green for secondary cards & subtle backgrounds
        beige: {
          DEFAULT: '#F2EFE9',
          subtle: '#F7F5F0',
          dark: '#E7E3DA',
          card: '#FAF8F4',
        },
        coop: {
          50: '#F2F9F6',
          100: '#E1F3EC',
          200: '#C2E7D9',
          500: '#10B981',
          600: '#0D2F28',
          700: '#0A2721',
          800: '#071F1A',
          900: '#041512',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Newsreader', 'Cormorant Garamond', 'Georgia', 'serif'],
        display: ['Newsreader', 'Playfair Display', 'serif'],
        ui: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(18, 19, 22, 0.03)',
        'card': '0 1px 3px 0 rgba(18, 19, 22, 0.04), 0 1px 2px -1px rgba(18, 19, 22, 0.03)',
        'float': '0 8px 24px -4px rgba(18, 19, 22, 0.06)',
        'premium': '0 16px 40px -8px rgba(18, 19, 22, 0.08)',
        'teal': '0 12px 32px -8px rgba(13, 47, 40, 0.25)',
      }
    },
  },
  plugins: [],
};
export default config;
