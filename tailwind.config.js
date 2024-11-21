/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      'mobile-min': '375px',
      'mobile-max': '576px',
    },
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      maxWidth: {
        mobile: '576px',
      },
      minWidth: {
        mobile: '375px',
      },
      colors: {
        primary: '#4A90E2',
        secondary: '#7A5FE7',
        background: '#FFFFFF',
        text: '#4A4A4A',
        accent: '#7ED321',
        secondaryBtn: '#82BFAF',
        toastSuccess: '#ECFDF3',
        toastError: '#FFF0F0',
        toastInfo: '#F0F8FF',
        toastWarning: '#FFFCF0',
      },
    },
  },
  plugins: [],
};
