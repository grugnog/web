import React from 'react'
import { Button } from '@material-ui/core'
import { Link } from '@app/components/general'
import { strings } from '@app-strings'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    color: '#fff',
    right: 0,
    padding: '8px 16px 8px 16px',
    maxHeight: '40px',
    background: theme.palette.secondary.main,
    top: '100px',
    minWidth: '196.406px',
    position: 'absolute',
    borderTopLeftRadius: '18px',
    borderBottomLeftRadius: '18px',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    textTransform: 'none',
    boxShadow:
      '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '&:hover': {
      color: '#0E1116',
      border: '1px solid #ccc',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}))

function CtaProfessionalSupportButton() {
  const classes = useStyles()

  return (
    <Button className={classes.root} component={Link} href={'/consulting'}>
      {strings.getSupport}
    </Button>
  )
}

export { CtaProfessionalSupportButton }
