import { createTheme } from '@material-ui/core/styles'

import { red, grey, orange } from '@material-ui/core/colors'
import { h1, h2, h6, subtitle1 } from '../common'

export const theme = (function () {
  return createTheme({
    typography: {
      fontFamily: [
        'system-ui',
        '-apple-system',
        'Segoe UI',
        'Roboto',
        'Ubuntu',
        'Cantarell',
        'Noto Sans',
        'sans-serif',
        'BlinkMacSystemFont',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji',
      ].join(','),
      button: {
        borderRadius: '2px',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        padding: '0px 30px',
        color: '#000',
        fontWeight: 600,
      },
      h3: {
        lineHeight: '1.3px',
      },
    },
    palette: {
      type: 'light',
      primary: { ...grey, main: '#707070' },
      secondary: {
        main: '#3f3d56',
      },
      background: { default: '#fff' },
      warning: orange,
      error: red,
    },
  })
})()

theme.typography.h1 = h1(theme)
theme.typography.h2 = h2(theme)
theme.typography.body1 = h6(theme)
theme.typography.h6 = h6(theme)

theme.typography.subtitle1 = subtitle1(theme)

export default theme
