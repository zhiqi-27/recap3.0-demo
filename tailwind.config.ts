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
        ink: 'var(--text-primary)',
        accent: 'var(--interactive-primary)',
        surface: {
          canvas: 'var(--surface-canvas)',
          base: 'var(--surface-base)',
          muted: 'var(--surface-muted)',
          elevated: 'var(--surface-elevated)',
          overlay: 'var(--surface-overlay)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          meta: 'var(--text-meta)',
          disabled: 'var(--text-disabled)',
          inverse: 'var(--text-inverse)',
        },
        line: {
          subtle: 'var(--line-subtle)',
          strong: 'var(--line-strong)',
          accent: 'var(--line-accent)',
        },
        interactive: {
          primary: 'var(--interactive-primary)',
          pressed: 'var(--interactive-primary-pressed)',
          disabled: 'var(--interactive-primary-disabled)',
          soft: 'var(--interactive-soft)',
          focus: 'var(--interactive-focus)',
        },
      },
      boxShadow: {
        soft: '0 18px 40px rgba(17, 17, 17, 0.06)',
      },
    },
  },
  plugins: [],
};

export default config;
