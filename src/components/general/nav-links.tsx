import React, { FC } from 'react'
import { NavItem } from './nav-item'

interface Props {
  className?: string
  as?: string
  route?: string
  registerClassName?: string
  loginClassName?: string
  href?: string
  name?: string
}

export const NavLinks: FC<Props> = ({
  route,
  as,
  className,
  registerClassName,
  loginClassName,
  href = '/register',
  name = 'Register',
}) => {
  return (
    <NavItem
      href={href}
      key={href}
      as={as}
      route={route}
      name={name}
      registerClassName={registerClassName}
      loginClassName={loginClassName}
      className={className}
    />
  )
}
