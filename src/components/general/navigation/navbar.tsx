'use client'

import { PropsWithChildren, FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { strings } from '@app-strings'
import { Logo, NavBarTitle } from '.'
import { Link } from '../link'
import { AuthMenu } from '../auth-menu'
import { GrLinkPrevious } from 'react-icons/gr'

const useStyles = makeStyles((theme) => ({
  container: ({
    position,
  }: {
    position: 'static' | 'fixed' | 'absolute' | 'relative'
  }) => ({
    backgroundColor:
      position === 'static' ? theme.palette.background.default : 'transparent',
    overflow: 'hidden',
    zIndex: 1,
    minHeight: theme.mixins.toolbar.minHeight,
  }),
}))

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
  const classes = useStyles({ position })

  return (
    <nav
      className={`bg-[inherit] ${className ? `${className} ` : className}${
        classes.container
      } ${
        position === 'fixed' ? 'fixed left-0 right-0 shadow' : 'shadow-none'
      }`}
    >
      <div className='relative flex items-center place-content-around px-4 min-h-[inherit]'>
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
        ) : (
          <AuthMenu authenticated={authenticated} />
        )}
      </div>
    </nav>
  )
}
