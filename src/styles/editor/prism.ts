import { a11yDark } from './a11y-dark'

export const prismStyles = {
  ...a11yDark,
  hljs: {
    ...a11yDark.hljs,
    background: '',
    color: '',
    padding: 0,
    overflow: 'hidden',
    maxWidth: '74vw',
  },
}
