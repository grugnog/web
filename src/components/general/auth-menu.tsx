import { useCallback, memo, useEffect, useState, SyntheticEvent } from 'react'
import { useRouter } from 'next/router'

import { IconButton, MenuItem, Menu, Tooltip } from '@material-ui/core'
import { Link } from './link'
import { UserManager } from '@app/managers'
import { LOGGIN_ROUTES } from '@app/configs'
import { useMutation } from '@apollo/react-hooks'
import { LOGOUT } from '@app/mutations'
import { useWebsiteContext } from '../providers/website'
import { CgProfile } from 'react-icons/cg'
import { NavItem } from './navigation/nav-item'

type AuthMenuComponentProps = {
  authenticated?: boolean // user logged in
}

function AuthMenuComponent({ authenticated }: AuthMenuComponentProps) {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<any>(null)
  const [logoutMutation, { data, client }] = useMutation(LOGOUT, {
    ignoreResults: true,
  })
  const { setIssueFeedContent } = useWebsiteContext()

  useEffect(() => {
    if (data) {
      ;async () => {
        await client?.clearStore().catch((e) => console.error(e))
      }
    }
  }, [data, client])

  const handleMenu = useCallback(
    (event?: any) => {
      setAnchorEl(event?.currentTarget)
    },
    [setAnchorEl]
  )

  // simple logout
  const logout = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e?.preventDefault()
    setIssueFeedContent(false)

    try {
      await logoutMutation()
      UserManager.clearUser()
    } catch (e) {
      console.error(e)
    }

    window.location.pathname = '/'
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
        >
          {router?.pathname !== '/profile' ? (
            <MenuItem>
              <Link href={'/profile'}>Profile</Link>
            </MenuItem>
          ) : null}
          {router?.pathname !== '/dashboard' ? (
            <MenuItem>
              <Link href={'/'}>Dashboard</Link>
            </MenuItem>
          ) : null}
          {router?.pathname !== '/api-info' ? (
            <MenuItem>
              <Link href={'/api-info'}>API</Link>
            </MenuItem>
          ) : null}
          {router?.pathname !== '/payments' ? (
            <MenuItem>
              <Link href={'/payments'}>Payments</Link>
            </MenuItem>
          ) : null}
          {router?.pathname !== '/settings' ? (
            <MenuItem>
              <Link href={'/settings'}>Settings</Link>
            </MenuItem>
          ) : null}
          <MenuItem style={{ padding: 0 }}>
            <button
              onClick={logout}
              className={
                'text-center w-full text-red-600 text-base px-5 py-2 m-0 border-t'
              }
            >
              Logout
            </button>
          </MenuItem>
        </Menu>
      </div>
    )
  }

  // when not authed return login or register
  return (
    <>
      <NavItem route={router?.pathname} href={'/login'} name={'Login'} />
      <NavItem route={router?.pathname} href={'/register'} name={'Register'} />
    </>
  )
}

export const AuthMenu = memo(AuthMenuComponent)
