import React, { useMemo } from 'react'
import { ListItem } from '@material-ui/core'
import { Link } from '../link'
import { MainRoutes, MobileRoutes } from './routes'

interface Props {
  home?: string
  className?: string
  mobileRender?: boolean
  classNameSpacing?: string
  classHiddenMobile?: string
  registerClassName?: string
}

function MarketingNavMenu({
  home = '',
  className = '',
  registerClassName = '',
  mobileRender,
  classNameSpacing = '',
  classHiddenMobile = '',
}: Props) {
  // TODO: use css to display diff nav
  const routes = useMemo(() => (mobileRender ? MobileRoutes : MainRoutes), [
    mobileRender,
  ])

  return (
    <ul
      className={`${className}${
        classNameSpacing ? ` ${classNameSpacing}` : ''
      } space-x-1`}
    >
      {routes.map(({ name, href }: { name: string; href: string }) => {
        const firstClassName = href === '/register' ? registerClassName : ''
        const itemClassName =
          !mobileRender && href !== '/register' && href !== '/login'
            ? `${firstClassName ? ' ' : ''}${classHiddenMobile}`
            : ''
        const classMinor =
          firstClassName || itemClassName
            ? `${firstClassName}${itemClassName}`
            : undefined

        const homeRoute = href.indexOf(home) !== -1

        return (
          <li key={name} className={classMinor}>
            <ListItem
              button
              component={Link}
              href={homeRoute ? '/' : href}
              color={'inherit'}
              variant={'subtitle1'}
            >
              {homeRoute ? 'Home' : name}
            </ListItem>
          </li>
        )
      })}
    </ul>
  )
}

export { MarketingNavMenu }
