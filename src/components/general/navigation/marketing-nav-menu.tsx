import React, { useMemo } from 'react'
import { ListItem } from '@material-ui/core'
import { Link } from '../link'
import { MainRoutes, MobileRoutes } from './routes'
import { GrGithub } from 'react-icons/gr'

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

      <li className='flex px-4 pl-6' style={{ minWidth: 40 }}>
        <a
          href={'https://github.com/a11ywatch/a11ywatch'}
          rel='noreferrer'
          aria-label='A11yWatch on Github'
          className='place-items-center flex'
          target='_blank'
        >
          <GrGithub size={22} />
        </a>
      </li>
    </ul>
  )
}

export { MarketingNavMenu }
