/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        heading: ['PlusJakartaSans-Bold'],
        'heading-semibold': ['PlusJakartaSans-SemiBold'],
        body: ['Inter-Regular'],
        'body-semibold': ['Inter-SemiBold'],
      },
      colors: {
        background: '#F8FAF9',
        surface: '#F8FAF9',
        'surface-card': '#FFFFFF',
        'surface-subtle': '#F1F5F3',
        primary: '#107A48',
        'on-primary': '#FFFFFF',
        'primary-container': '#E8F5EE',
        'on-primary-container': '#084427',
        secondary: '#2E7D68',
        'secondary-container': '#E6F4F0',
        'on-secondary-container': '#114235',
        text: '#191C1B',
        'text-secondary': '#58655E',
        outline: '#E2E8E5',
        'outline-strong': '#CBD5D0',
        'streak-amber': '#D97706',
        'streak-amber-subtle': '#FEF3C7',
        'partial-green': '#86EFAC',
      },
    },
  },
  plugins: [],
};
