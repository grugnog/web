import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '0%',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  mobileHidden: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  detailedContainer: {
    paddingTop: '6%',
  },
  block: {
    flex: 1,
  },
  intro: {
    lineHeight: '0.92em',
  },
  submit: {
    marginTop: 10,
    width: 200,
    marginBottom: 20,
    border: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down('sm')]: {
      width: '50%',
    },
    '&::after': {
      display: 'block',
      position: 'absolute',
      left: '100%',
      content: '"FREE forever."',
      textAlign: 'left',
      letterSpacing: 1,
      textTransform: 'uppercase',
      marginLeft: 20,
      maxWidth: 130,
      width: '100%',
      color: '#b9bec7',
      pointerEvents: 'none',
      top: 'auto',
    },
  },
  join: {
    marginBottom: '5%',
    textAlign: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    color: '#6e747f',
  },
  bottomAnchor: {
    display: 'block',
  },
}))
