import React from 'react'
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
    alignSelf: 'center',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
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
      <Link
        href='/'
        className={'hover:no-underline'}
        title={`${companyName} Home`}
      >
        <div className={`${classes.brand} space-x-1.5`}>
          <Logo />
          <div className={`text-2xl ${classes.title} ${classes.logoText}`}>
            {companyName}
          </div>
        </div>
      </Link>
    )
  }

  return (
    <span
      className={`text-2xl ${classes.title} flex flex-1 line-clamp-1`}
      {...props}
    >
      {children || title}
    </span>
  )
}

export { NavBarTitle }
