import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  submit: {
    width: 200,
    border: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down('sm')]: {
      width: '50%',
    },
    '&::after': {
      display: 'block',
      position: 'absolute',
      left: '100%',
      content: '"Always free."',
      textAlign: 'left',
      letterSpacing: 1,
      textTransform: 'uppercase',
      marginLeft: 20,
      maxWidth: 130,
      width: '100%',
      color: 'rgb(115, 115, 115)',
      pointerEvents: 'none',
      top: 'auto',
    },
  },
}))
