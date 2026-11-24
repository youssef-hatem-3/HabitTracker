const { platformSelect } = require('nativewind/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        heading: platformSelect({
          ios: 'PlusJakartaSans-Bold',
          android: 'PlusJakartaSans',
          default: 'PlusJakartaSans-Bold',
        }),
        'heading-semibold': platformSelect({
          ios: 'PlusJakartaSans-SemiBold',
          android: 'PlusJakartaSansSemiBold',
          default: 'PlusJakartaSans-SemiBold',
        }),
        body: platformSelect({
          ios: 'Inter-Regular',
          android: 'Inter',
          default: 'Inter-Regular',
        }),
        'body-semibold': platformSelect({
          ios: 'Inter-SemiBold',
          android: 'InterSemiBold',
          default: 'Inter-SemiBold',
        }),
      },
      // Stitch overrides these names; e.g. rounded-xl is 24px, not Tailwind's 12px.
      borderRadius: {
        sm: '6px',
        DEFAULT: '12px',
        md: '16px',
        lg: '20px',
        xl: '24px',
        full: '9999px',
      },
      // NativeWind's shadow defaults are darker than the Tailwind source in Stitch.
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
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
        muted: '#707974',
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
