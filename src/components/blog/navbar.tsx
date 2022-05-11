import React, { Fragment, FC, memo } from 'react'
import { AppBar, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { strings } from '@app-strings'
import { Link } from '../general/link'
import { TranslateBadge } from '../badges'
import { SmallLogo } from '../general'
import { theme as appTheme } from '@app/theme/main'
import { companyName } from '@app/configs'

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#000',
    color: theme.palette.background.default,
    overflow: 'hidden',
    zIndex: 1,
    ...theme.mixins.toolbar,
  },
  menu: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(1),
    },
  },
  menuBar: {
    display: 'flex',
    marginRight: 6,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  hideShadow: {
    boxShadow: 'none',
  },
  ghIcon: {
    marginLeft: 18,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  toolbarInnerContainer: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
}))

const BLOG_HREF = process.env.NODE_ENV === 'production' ? '/' : '/blog'

const NavBarComponent: FC<any> = ({
  title = strings.appName,
  className,
  position = 'relative',
  component = 'nav',
}) => {
  const classes = useStyles()

  return (
    <Fragment>
      <div
        style={{ background: appTheme.palette.background.default }}
        className='p-4'
      >
        <a href='https://a11ywatch.com'>Back to {companyName}.com</a>
      </div>
      <AppBar
        position={position}
        className={`${className} ${classes.container} ${classes.hideShadow}`}
        component={component}
      >
        <Toolbar>
          <div className={classes.toolbarInnerContainer}>
            <Link
              className={`${classes.menu} space-x-2 align-items-center text-normal text-black`}
              href={BLOG_HREF}
            >
              <div className='invert'>
                <SmallLogo />
              </div>
              <div className='pl-1 text-white'>{title}</div>
            </Link>
          </div>
          <TranslateBadge className={classes.ghIcon} />
        </Toolbar>
      </AppBar>
    </Fragment>
  )
}

export const NavBar = memo(NavBarComponent)
