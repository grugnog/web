'use client'

import { PropsWithChildren, FC } from 'react'
import { strings } from '@app-strings'
import { Logo, NavBarTitle } from '.'
import { Link } from '../link'
import { AuthMenu } from '../auth-menu'
import { GrLinkPrevious } from 'react-icons/gr'
import { NavbarMenu } from './navbar-menu'

type LeftbuttonWrapperProps = {
  marketing?: boolean
  backButton?: boolean // display a go back button
}

// start left button of the nav
const Leftbutton = ({ marketing, backButton }: LeftbuttonWrapperProps) => {
  if (backButton) {
    const onClickEvent = () => {
      if (typeof history !== 'undefined') {
        history.back()
      }
    }
    return (
      <button
        className={'text-lg hover:bg-gray-100 rounded-3xl px-3 py-3'}
        title={'Navigate to home'}
        onClick={onClickEvent}
      >
        <GrLinkPrevious />
      </button>
    )
  }

  if (!marketing) {
    return (
      <Link
        className={'text-lg hover:bg-gray-100 rounded-3xl px-3 py-3'}
        title={'Navigate to home'}
        href={'/'}
      >
        <Logo />
      </Link>
    )
  }
  return null
}

// navbar props
interface NavProps {
  title?: string | string[]
  backButton?: boolean
  marketing?: boolean
  toolbar?: any
  className?: string
  position?: 'fixed' | 'absolute' | 'relative' | 'static' // navbar position
  marketingLinks?: any
  notitle?: boolean
  authenticated?: boolean
  loading?: boolean
}

// todo: stateless navbar marketing
export const NavBar: FC<PropsWithChildren<NavProps>> = ({
  title = strings.appName,
  backButton,
  marketing,
  toolbar,
  className = '',
  position = 'static',
  children,
  marketingLinks,
  notitle,
  authenticated,
  loading,
}) => {
  const bg = position === 'static' ? `bg-white` : 'bg-[inherit]'

  return (
    <nav
      style={{ minHeight: 55 }}
      className={`${bg} z-1 min-h-[55px] space-x-2 ${
        className ? `${className}` : className
      } ${
        position === 'fixed' ? 'fixed left-[13%] md:left-[250px] right-0' : ''
      }`}
    >
      <div className='relative flex items-center place-content-around px-4 gap-x-2 min-h-[inherit]'>
        {toolbar || children ? (
          toolbar || children
        ) : (
          <div className={`flex flex-1 place-items-center gap-x-2`}>
            <Leftbutton backButton={backButton} marketing={marketing} />
            <NavBarTitle
              title={title}
              flex
              marketing={marketing}
              notitle={notitle}
            />
          </div>
        )}
        {loading ? (
          <div className='h-15 w-15 bg-gray-300 rounded'></div>
        ) : !authenticated && marketingLinks ? (
          marketingLinks
        ) : authenticated ? (
          <AuthMenu authenticated={authenticated} />
        ) : (
          <NavbarMenu />
        )}
      </div>
    </nav>
  )
}
