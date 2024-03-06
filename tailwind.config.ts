import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('tailwind-scrollbar')],
  theme: {},
};
export default config;
