/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Logo } from './logo'
import { Link } from '../link'
import { companyName } from '@app-config'

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.text.primary,
    letterSpacing: '.12rem',
  },
  flex: {
    flex: 1,
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
  const flexStyle = flex ? classes.flex : ''

  if (marketing && !notitle) {
    return (
      <Link href='/' className={classes.link} prefetch={false}>
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
      component={'span'}
      className={`${classes.title} ${flexStyle}`}
      {...props}
    >
      {children || title}
    </Typography>
  )
}

export { NavBarTitle }
