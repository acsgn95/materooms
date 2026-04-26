import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E8192C',
        secondary: '#E8192C',
        accent: '#F7933A',
        dark: '#1A1A1A',
        light: '#F5F6FA',
        success: '#26C281',
        warning: '#F9CA24',
        danger: '#E8192C',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #E8192C 0%, #F7933A 100%)',
      },
    },
  },
  plugins: [],
}
export default config
