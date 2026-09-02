/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
        sans: [
          'Instrument Sans Variable',
          'Instrument Sans',
          'ui-sans-serif',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
      },
      maxWidth: {
        shell: '1180px',
      },
      keyframes: {
        blink: {
          '0%, 44%': { opacity: '.9' },
          '45%, 100%': { opacity: '0' },
        },
      },
      animation: {
        blink: 'blink 1.35s steps(1, end) infinite',
      },
    },
  },
  plugins: [],
};
