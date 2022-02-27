import React, { FC } from 'react'
import { NavItem } from './nav-item'

interface Props {
  className?: string
  as?: string
  route?: string
  registerClassName?: string
  loginClassName?: string
}

export const NavLinks: FC<Props> = ({
  route,
  as,
  className,
  registerClassName,
  loginClassName,
}) => {
  return (
    <NavItem
      href={'/register'}
      key={'register'}
      as={as}
      route={route}
      name={'Register'}
      registerClassName={registerClassName}
      loginClassName={loginClassName}
      className={className}
    />
  )
}
