import { FC } from 'react'
import { Link } from '../link'

type NavItemProps = {
  href?: string
  name?: string
  className?: string
  as?: string
  route?: string
}

export const NavItem: FC<NavItemProps> = ({
  href,
  name,
  className = '',
  as,
  route,
}) => {
  const home = `/${href}` === route // display home route

  return (
    <Link
      href={home ? '/' : href}
      as={as}
      className={`${className} font-sm${name === 'Register' ? ' border' : ''}`}
    >
      {home ? 'Home' : name}
    </Link>
  )
}
