export const h1 = (theme: any, props: any = {}) => ({
  fontSize: '3rem',
  fontWeight: 700,
  '@media (min-width:600px)': {
    fontSize: '4.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '6rem',
  },
  ...props,
})
