import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#00b9b5',
          secondary: '#00ab00',
          accent: '#00c414',
          neutral: '#301219',
          'base-100': '#292621',
          info: '#00aae5',
          success: '#00861c',
          warning: '#ffbf1c',
          error: '#d6003d',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
export default config;
