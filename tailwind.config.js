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
  main: 'gray',
  secondary: '#5c6bc0',
  transparent: 'transparent',
  current: 'currentColor',
  black: '#000',
  white: '#fff',
  gray: tailwindColors.trueGray,
}

const theme = {
  colors,
  fontFamily: {
    display: fontFamilys,
    body: fontFamilys,
  },
  textColor: (theme) => theme('colors'),
}

module.exports = {
  mode: 'jit',
  theme,
  varients: {
    borderRadius: ['responsive', 'hover', 'focus'],
  },
  purge: [
    './src/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
    './src/**/**/*.{js,jsx,ts,tsx,vue}',
  ],
}
