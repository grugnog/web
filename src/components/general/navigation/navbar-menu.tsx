'use client'

import { useRouter } from 'next/router'
import { NavItem } from './nav-item'

type AuthMenuComponentProps = {
  authenticated?: boolean // user logged in
}

// auth menu on the right of the ui
export function NavbarMenu(_: AuthMenuComponentProps) {
  const { pathname } = useRouter()

  return (
    <ul className='flex list-none gap-x-3'>
      <li>
        <NavItem route={pathname} href={'/login'} name={'Login'} />
      </li>
      <li>
        <NavItem
          route={pathname}
          href={'/register'}
          name={'Register'}
          className={'px-3 py-2 border-2 rounded'}
        />
      </li>
    </ul>
  )
}
