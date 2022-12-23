import { FC, ReactNode } from 'react'

import { Logo } from './logo'
import { Link } from '../link'
import { companyName } from '@app/configs'

interface NavBarTitleProps {
  title?: string | string[]
  children?: ReactNode | string
  flex?: boolean
  marketing?: boolean
  ismobile?: boolean
  notitle?: boolean
  href?: string
}

const NavBarTitle: FC<NavBarTitleProps> = ({
  title,
  children,
  flex,
  marketing,
  ismobile,
  notitle,
  ...props
}) => {
  if (notitle) {
    return null
  }

  if (marketing) {
    return (
      <Link
        href='/'
        className={'hover:no-underline'}
        title={`${companyName} Home`}
      >
        <div className={`flex place-items-center space-x-1.5`}>
          <Logo />
          <div
            className={`text-lg md:text-xl tracking-normal font-bold hidden md:block`}
          >
            {companyName}
          </div>
        </div>
      </Link>
    )
  }

  return (
    <span
      className={`text-lg md:text-xl tracking-normal font-medium flex flex-1 line-clamp-1`}
      {...props}
    >
      {children || title}
    </span>
  )
}

export { NavBarTitle }
