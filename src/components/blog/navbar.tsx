import React, { FC, memo } from 'react'
import { strings } from '@app-strings'
import { Link } from '../general/link'
import { SmallLogo } from '../general'
import { DOMAIN_NAME } from '@app/configs'

const BLOG_HREF = process.env.NODE_ENV === 'production' ? '/' : '/blog'

const NavBarComponent: FC<any> = ({ title = strings.appName }) => {
  return (
    <header>
      <nav className='bg-[#0E1116] z-1 px-2 py-1 md:py-3 md:px-4'>
        <div className='flex align-items-center place-items-center text-white md:space-x-2 font-bold'>
          <Link className={`text-black`} href={DOMAIN_NAME}>
            <SmallLogo className='block invert' />
          </Link>
          <span>/</span>
          <Link className={`text-normal`} href={BLOG_HREF}>
            <div className='pl-1 text-white'>{title}</div>
          </Link>
        </div>
      </nav>
    </header>
  )
}

export const NavBar = memo(NavBarComponent)
