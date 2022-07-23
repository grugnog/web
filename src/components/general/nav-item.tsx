import { FC, memo } from 'react'
import { Button } from '@material-ui/core'
import { Link } from './link'

interface Props {
  href?: string
  name?: string
  className?: string
  as?: string
  route?: string
  registerClassName?: string
  loginClassName?: string
}

export const NavItemComponent: FC<Props> = ({
  href,
  name,
  className,
  as,
  route,
  registerClassName = '',
  loginClassName = '',
}) => {
  const home = `/${href}` === route
  return (
    <Button
      href={home ? '/' : href}
      as={as}
      component={Link}
      variant={name === 'Register' ? 'outlined' : 'text'}
      className={`${className} ${registerClassName} ${loginClassName} font-sm`}
    >
      {home ? 'Home' : name}
    </Button>
  )
}

export const NavItem = memo(NavItemComponent)
