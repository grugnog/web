import { FC, memo } from 'react'
import { Button } from '@material-ui/core'
import { Link } from '../link'

type NavItemProps = {
  href?: string
  name?: string
  className?: string
  as?: string
  route?: string
}

export const NavItemComponent: FC<NavItemProps> = ({
  href,
  name,
  className,
  as,
  route,
}) => {
  const home = `/${href}` === route // display home route

  return (
    <Button
      href={home ? '/' : href}
      as={as}
      component={Link}
      variant={name === 'Register' ? 'outlined' : 'text'}
      className={`${className} font-sm`}
    >
      {home ? 'Home' : name}
    </Button>
  )
}

export const NavItem = memo(NavItemComponent)
