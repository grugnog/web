import React, { memo } from 'react'
import { useRouter } from 'next/router'

import { IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { strings } from '@app-strings'
import { Logo, NavBarTitle } from './navigation'
import { Link } from './link'
import { AuthMenu } from './auth-menu'
import { GrLinkPrevious } from 'react-icons/gr'

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
    minHeight: theme.mixins.toolbar.minHeight,
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
  authenticated,
}: any) => {
  const classes = useStyles({ position })
  const router = useRouter()

  const buttonProps = !backButton
    ? { href: '/', component: Link }
    : {
        onClick: async (e: any) => {
          e?.preventDefault()
          if (backButton) {
            router.back()
          } else {
            await router.push('/')
          }
        },
      }

  return (
    <nav
      className={`bg-[inherit] ${className ? `${className} ` : className}${
        classes.container
      } ${
        position === 'fixed' ? 'fixed left-0 right-0 shadow' : 'shadow-none'
      }`}
    >
      <div className='relative flex items-center px-5 min-h-[inherit]'>
        {toolbar || children ? (
          toolbar || children
        ) : (
          <div
            className={`flex flex-1 place-content-center place-items-center`}
          >
            {backButton || !marketing ? (
              <IconButton className={classes.menu} {...buttonProps}>
                {backButton ? <GrLinkPrevious /> : <Logo />}
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
            authenticated={authenticated}
          />
        )}
      </div>
    </nav>
  )
}

export const NavBar = memo(NavBarComponent)
