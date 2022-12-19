import { FC } from 'react'
import { strings } from '@app-strings'
import { Link } from '../general/link'
import { Logo } from '../general'

let BLOG_HREF = '/blog'
let BLOG_ROUTE = BLOG_HREF

if (process.env.NODE_ENV === 'production') {
  BLOG_HREF = '/'
}

export const NavBar: FC<any> = ({ title = strings.appName }) => {
  return (
    <header>
      <nav className='bg-[#0E1116] z-10 px-2 py-1 md:py-3 md:px-4'>
        <div className='flex content-center place-items-center text-white md:space-x-2 font-semibold'>
          <Link className={`text-black`} href={BLOG_ROUTE}>
            <Logo className='block invert' width={24} height={24} />
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
