import React from 'react'
import { Link } from '../link'
import { MainRoutes } from './routes'

interface Props {
  home?: string
}

function MarketingNavMenu({ home = '' }: Props) {
  return (
    <ul className={`flex flex-1 justify-end gap-x-1 place-items-center`}>
      {MainRoutes.map(({ name, href }: { name: string; href: string }) => {
        const firstClassName = href === '/register' ? 'border-2 rounded' : ''
        const itemClassName =
          href !== '/register' && href !== '/login'
            ? `${firstClassName ? ' ' : ''} hidden md:flex`
            : ''
        const classMinor =
          firstClassName || itemClassName
            ? `${firstClassName}${itemClassName}`
            : undefined

        const homeRoute = href.indexOf(home) !== -1

        return (
          <li key={name}>
            <Link
              href={homeRoute ? '/' : href}
              className={`${classMinor} px-6 py-2 hover:opacity-70`}
            >
              {homeRoute ? 'Home' : name}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export { MarketingNavMenu }
