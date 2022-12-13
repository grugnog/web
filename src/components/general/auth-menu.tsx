import { useCallback, useEffect, useState, SyntheticEvent } from 'react'
import { useRouter } from 'next/router'

import { Menu } from '@material-ui/core'
import { Link } from './link'
import { UserManager } from '@app/managers'
import { LOGGIN_ROUTES } from '@app/configs'
import { useMutation } from '@apollo/react-hooks'
import { LOGOUT } from '@app/mutations'
import { CgProfile } from 'react-icons/cg'
import { NavItem } from './navigation/nav-item'
import { useWasmContext } from '../providers'
import { FilterManager } from '@app/managers/filters'
import { Button } from './buttons'

type AuthMenuComponentProps = {
  authenticated?: boolean // user logged in
}

const menuItemCss =
  'w-full px-4 py-2 md:px-4 border-t h-10 flex text-sm place-items-center place-content-start hover:no-underline hover:bg-gray-100'

export function AuthMenu({ authenticated }: AuthMenuComponentProps) {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<any>(null)
  const [logoutMutation, { data, client }] = useMutation(LOGOUT)
  const { feed } = useWasmContext()

  useEffect(() => {
    if (data) {
      ;async () => {
        try {
          await client?.clearStore()
        } catch (e) {
          console.error(e)
        }
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

    try {
      feed?.clear_data()
      await logoutMutation()
      UserManager.clearUser()
      FilterManager.clearFilters()
    } catch (e) {
      console.error(e)
    }

    await router.push('/')
  }

  if (
    (!authenticated && LOGGIN_ROUTES.includes(router?.pathname)) ||
    authenticated
  ) {
    return (
      <div>
        <Button
          iconButton
          aria-label='account of current user'
          aria-controls='menu-appbar'
          aria-haspopup='true'
          onClick={handleMenu}
        >
          <CgProfile color={'black'} className={'grIcon'} />
        </Button>
        <Menu
          id='menu-appbar'
          open={!!anchorEl}
          onClose={() => handleMenu()}
          anchorEl={anchorEl}
        >
          {router?.pathname !== '/profile' ? (
            <li className='w-full'>
              <Link href={'/profile'} className={menuItemCss}>
                Profile
              </Link>
            </li>
          ) : null}
          {router?.pathname !== '/dashboard' ? (
            <li className='w-full'>
              <Link href={'/dashboard'} className={menuItemCss}>
                Dashboard
              </Link>
            </li>
          ) : null}
          {router?.pathname !== '/api-info' ? (
            <li className='w-full'>
              <Link href={'/api-info'} className={menuItemCss}>
                API
              </Link>
            </li>
          ) : null}
          {router?.pathname !== '/payments' ? (
            <li className='w-full'>
              <Link href={'/payments'} className={menuItemCss}>
                Payments
              </Link>
            </li>
          ) : null}
          {router?.pathname !== '/settings' ? (
            <li className='w-full'>
              <Link href={'/settings'} className={menuItemCss}>
                Settings
              </Link>
            </li>
          ) : null}
          <li className='w-full'>
            <button onClick={logout} className={menuItemCss}>
              Logout
            </button>
          </li>
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
