import React, { useCallback, memo, useState } from 'react'
import { useRouter } from 'next/router'

import { IconButton, MenuItem, Menu, Tooltip } from '@material-ui/core'
import { Link } from './link'
import { UserManager } from '@app/managers'
import { LOGGIN_ROUTES } from '@app/configs'
import { NavLinks } from './nav-links'
import { useMutation } from '@apollo/react-hooks'
import { LOGOUT } from '@app/mutations'
import { useWebsiteContext } from '../providers/website'
import { CgProfile } from 'react-icons/cg'

interface Props {
  loginClassName?: string
  className?: string
  registerClassName?: string
  authenticated?: boolean // user logged in
}

function AuthMenuComponent({
  loginClassName,
  className,
  registerClassName,
  authenticated,
}: Props) {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<any>(null)
  const [logoutMutation, { client }] = useMutation(LOGOUT)
  const { setIssueFeedContent } = useWebsiteContext()

  const handleMenu = useCallback(
    (event?: any) => {
      setAnchorEl(event?.currentTarget)
    },
    [setAnchorEl]
  )

  // simple logout
  const logout = async (e: any) => {
    e?.preventDefault()
    setIssueFeedContent(false)

    try {
      await logoutMutation()
    } catch (e) {
      console.error(e)
    }

    UserManager.clearUser()

    if (router.pathname !== '/') {
      try {
        await router.push('/')
      } catch (e) {
        console.error(e)
      }
    } else {
      router.reload()
    }

    try {
      await client?.resetStore()
    } catch (e) {
      console.error(e)
    }

    try {
      await client?.clearStore()
    } catch (e) {
      console.error(e)
    }
  }

  if (
    (!authenticated && LOGGIN_ROUTES.includes(router?.pathname)) ||
    authenticated
  ) {
    return (
      <div>
        <Tooltip title={'More options'}>
          <IconButton
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleMenu}
          >
            <CgProfile color={'black'} />
          </IconButton>
        </Tooltip>
        <Menu
          id='menu-appbar'
          open={!!anchorEl}
          onClose={() => handleMenu()}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {router?.pathname !== '/profile' ? (
            <MenuItem component={Link} href={'/profile'} color={'inherit'}>
              Profile
            </MenuItem>
          ) : null}
          {router?.pathname !== '/dashboard' ? (
            <MenuItem component={Link} href={'/'} color={'inherit'}>
              Dashboard
            </MenuItem>
          ) : null}
          {router?.pathname !== '/api-info' ? (
            <MenuItem component={Link} href={'/api-info'} color={'inherit'}>
              API
            </MenuItem>
          ) : null}
          {router?.pathname !== '/payments' ? (
            <MenuItem component={Link} href={'/payments'} color={'inherit'}>
              Payments
            </MenuItem>
          ) : null}
          {router?.pathname !== '/settings' ? (
            <MenuItem component={Link} href={'/settings'} color={'inherit'}>
              Settings
            </MenuItem>
          ) : null}
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </div>
    )
  }

  // when not authed return login or register
  return (
    <>
      <NavLinks
        className={className}
        registerClassName={registerClassName}
        loginClassName={loginClassName}
        route={router?.pathname}
        href={'/login'}
        name={'Login'}
      />
      <NavLinks
        className={className}
        registerClassName={registerClassName}
        loginClassName={loginClassName}
        route={router?.pathname}
      />
    </>
  )
}

export const AuthMenu = memo(AuthMenuComponent)
