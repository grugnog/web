/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
const tailwindColors = require('tailwindcss/colors')

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
}

module.exports = {
  theme,
  content: [
    './src/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
    './src/**/**/*.{js,jsx,ts,tsx,vue}',
  ],
}
