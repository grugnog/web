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
    <>
      <NavItem route={pathname} href={'/login'} name={'Login'} />
      <NavItem route={pathname} href={'/register'} name={'Register'} />
    </>
  )
}
