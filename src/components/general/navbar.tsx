import React, { Fragment, memo } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import { IconButton } from '@material-ui/core'
import { Public as AppIcon, ArrowBack as BackIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { strings } from '@app-strings'
import { NavBarTitle } from './navigation'
import { Link } from './link'
import { AuthMenu } from './auth-menu'
import { TranslateBadge } from '../badges'

const WrapShadow = dynamic(
  () => import('./wrap-shadow').then((mod) => mod.WrapShadow) as any,
  {
    ssr: false,
  }
)

const useStyles = makeStyles((theme) => ({
  flex: {
    flex: 1,
  },
  container: ({
    position,
  }: {
    position: 'static' | 'fixed' | 'absolute' | 'relative'
  }) => ({
    backgroundColor:
      position === 'static' ? theme.palette.background.default : 'transparent',
    overflow: 'hidden',
    zIndex: 1,
    ...theme.mixins.toolbar,
  }),
  menu: {
    display: 'flex',
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(1),
    },
  },
  iconButton: {
    background: 'transparent',
    boxShadow: 'none',
    marginLeft: theme.spacing(2),
    overflow: 'hidden',
    fontSize: 13,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
  register: {
    minWidth: 90.6562,
    [theme.breakpoints.down('sm')]: {
      minWidth: 'auto',
    },
  },
  login: {
    minWidth: 90.6562,
    [theme.breakpoints.down('sm')]: {
      minWidth: 'auto',
      marginLeft: 0,
    },
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
}))

const NavBarComponent = ({
  title = strings.appName,
  backButton,
  marketing,
  toolbar,
  className = '',
  position = 'static',
  children,
  marketingLinks,
  notitle,
}: any) => {
  const classes = useStyles({ position })
  const router = useRouter()

  const buttonProps = !backButton
    ? { href: '/', component: Link }
    : {
        onClick: (e: any) => {
          e?.preventDefault()
          if (backButton) {
            router.back()
          } else {
            router.push('/')
          }
        },
      }

  return (
    <Fragment>
      <nav
        className={`${className ? `${className} ` : className}${
          classes.container
        } shadow-none ${position === 'fixed' ? 'fixed left-0 right-0' : ''}`}
      >
        <div className='relative flex items-center pl-5 pr-5 min-h-[inherit]'>
          {toolbar || children ? (
            toolbar || children
          ) : (
            <div className={`flex flex-1 place-content-center`}>
              {backButton || !marketing ? (
                <IconButton className={classes.menu} {...buttonProps}>
                  {backButton ? <BackIcon /> : <AppIcon />}
                </IconButton>
              ) : null}
              <NavBarTitle
                title={title}
                flex
                marketing={marketing}
                notitle={notitle}
              />
            </div>
          )}
          {marketingLinks}
          {marketingLinks ? null : (
            <AuthMenu
              className={`${classes.iconButton}`}
              registerClassName={classes.register}
              loginClassName={classes.login}
            />
          )}
          {marketing ? (
            <div className='pl-4'>
              <TranslateBadge className={classes.ghIcon} />
            </div>
          ) : null}
        </div>
      </nav>
      {position === 'fixed' ? <WrapShadow /> : null}
    </Fragment>
  )
}

export const NavBar = memo(NavBarComponent)
