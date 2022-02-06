/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { IconButton, MenuItem, Menu, Tooltip } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'

import { Link } from './link'
import { TranslateBadge } from '../badges'
import { UserManager } from '@app/managers'
import { LOGGIN_ROUTES } from '@app/configs'
import { NavLinks } from './nav-links'
import { useMutation } from '@apollo/react-hooks'
import { LOGOUT } from '@app/mutations'
import { useWebsiteContext } from '../providers/website'

interface Props {
  loginClassName?: string
  className?: string
  registerClassName?: string
}

function AuthMenu({ loginClassName, className, registerClassName }: Props) {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<any>(null)
  const [logoutMutation, { client }] = useMutation(LOGOUT)
  const { setIssueFeedContent } = useWebsiteContext()

  const handleMenu = (event?: any) => {
    setAnchorEl(event?.currentTarget)
  }

  const logout = async (e: any) => {
    e?.preventDefault()
    setIssueFeedContent(null, false)

    try {
      await logoutMutation()
    } catch (e) {
      console.error(e)
    }

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

    UserManager.clearUser()
  }

  if (LOGGIN_ROUTES.includes(router?.pathname)) {
    return (
      <div>
        <TranslateBadge />
        <Tooltip title={'More options'}>
          <IconButton
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleMenu}
          >
            <AccountCircle />
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
            <MenuItem component={Link} href={'/dashboard'} color={'inherit'}>
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
  return (
    <NavLinks
      className={className}
      registerClassName={registerClassName}
      loginClassName={loginClassName}
      route={router?.pathname}
    />
  )
}

export { AuthMenu }
