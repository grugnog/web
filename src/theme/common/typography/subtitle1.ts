export const subtitle1 = (theme: any, props: any = {}) => ({
  fontSize: '1.35rem',
  fontWeight: 400,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  '@media (min-width:600px)': {
    fontSize: '1.28rem',
  },
  [theme.breakpoints.down('381')]: {
    fontSize: '1.25rem',
  },
  [theme.breakpoints.down('321')]: {
    fontSize: '1.22rem',
  },
  ...props,
})
