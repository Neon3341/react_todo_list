/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', 
  ],
  theme: {
    extend: {
      spacing: {
        'box-xl': '1440px',
        'box-l': '1280px',
        'box-m': '1080px',
        'box-m': '720px',
        'box-s': '100%',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gray: "var(--gray)",
        coffee: "var(--coffee)",
        latte: "var(--latte)",
        cappuccino: "var(--cappuccino)",
        matcha: "var(--matcha)",
        sky: "var(--sky)",
      },
    },
  },
  plugins: [
  ],
}

