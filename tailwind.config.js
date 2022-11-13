const tailwindColors = require('tailwindcss/colors')

delete tailwindColors['lightBlue']
// delete tailwindColors['warmGray']
// delete tailwindColors['trueGray']
// delete tailwindColors['coolGray']
// delete tailwindColors['blueGray']

const fontFamilys = [
  'system-ui',
  '-apple-system',
  'Helvetica Neue',
  'Arial',
  'sans-serif',
  'Apple Color Emoji',
  'Segoe UI Emoji',
  'Segoe UI Symbol',
]

const colors = {
  ...tailwindColors,
  main: 'gray',
  secondary: '#5c6bc0',
  transparent: 'transparent',
  current: 'currentColor',
  gray: tailwindColors.neutral,
  black: '#000',
  white: '#fff',
  lightgray: 'rgb(245, 247, 249)',
}

const theme = {
  colors,
  fontFamily: {
    display: fontFamilys,
    body: fontFamilys,
  },
  fontSize: {
    xs: '.75rem',
    sm: '.875rem',
    tiny: '.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '4rem',
    '7xl': '5rem',
  },
  textColor: (theme) => theme('colors'),
  extend: {
    minHeight: {
      inherit: 'inherit',
    },
    height: {
      inherit: 'inherit',
    },
    content: {
      before: 'before',
    },
    backgroundImage: {
      'gradient-radial':
        'radial-gradient(circle at 33.918961px 222.257324px, rgba(10, 22, 22, 0.06), rgba(0, 0, 0, 0.1))',
    },
  },
}

module.exports = {
  theme,
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  plugins: [require('@tailwindcss/line-clamp')],
}
