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

  const logout = useCallback(
    async (e: any) => {
      e?.preventDefault()
      setIssueFeedContent(null, false)

      try {
        await client?.clearStore()
      } catch (e) {
        console.error(e)
      }

      try {
        await client?.resetStore()
      } catch (e) {
        console.error(e)
      }

      try {
        await logoutMutation()
      } catch (e) {
        console.error(e)
      }

      try {
        router.reload()
      } catch (e) {
        console.error(e)
      }

      UserManager.clearUser()
    },
    [setIssueFeedContent, client, router, logoutMutation]
  )

  if (
    (!authenticated && LOGGIN_ROUTES.includes(router?.pathname)) ||
    (authenticated && router?.pathname === '/api-info')
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
