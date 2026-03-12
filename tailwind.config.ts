import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0f172a',
        accent: '#2563eb',
      },
      boxShadow: {
        soft: '0 8px 24px rgba(15, 23, 42, 0.06)',
      },
    },
  },
  plugins: [],
};

export default config;
