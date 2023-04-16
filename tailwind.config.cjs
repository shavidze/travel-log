/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line global-require
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark', 'forest'],
  },
};
