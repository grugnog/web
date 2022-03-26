import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Logo } from './logo'
import { Link } from '../link'
import { companyName } from '@app/configs'

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.text.primary,
    letterSpacing: '.12rem',
  },
  brand: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  logoText: {
    paddingLeft: '1rem',
    alignSelf: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  link: {
    paddingTop: 4,
    '&:hover': {
      textDecoration: 'none',
    },
  },
}))

function NavBarTitle({
  title,
  children,
  flex,
  marketing,
  ismobile,
  notitle,
  ...props
}: any) {
  const classes = useStyles()

  if (marketing && !notitle) {
    return (
      <Link href='/' className={classes.link}>
        <div className={classes.brand}>
          <Logo />
          <Typography
            component={'strong'}
            className={`${classes.title} ${classes.logoText}`}
          >
            {companyName}
          </Typography>
        </div>
      </Link>
    )
  }

  return (
    <Typography
      variant='h6'
      noWrap
      component={'div'}
      className={`${classes.title} flex flex-1 place-items-center`}
      {...props}
    >
      {children || title}
    </Typography>
  )
}

export { NavBarTitle }
