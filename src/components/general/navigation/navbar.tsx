import { FC, memo, SyntheticEvent } from 'react'
import { IconButton, IconButtonProps } from '@material-ui/core'
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
  menu: {
    display: 'flex',
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(1),
    },
  },
  iconButton: {
    background: 'transparent',
    boxShadow: 'none',
    marginLeft: theme.spacing(2),
    overflow: 'hidden',
    fontSize: 13,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
  register: {
    minWidth: 90.6562,
    [theme.breakpoints.down('sm')]: {
      minWidth: 'auto',
    },
  },
  login: {
    minWidth: 90.6562,
    [theme.breakpoints.down('sm')]: {
      minWidth: 'auto',
      marginLeft: 0,
    },
  },
}))

type LeftbuttonWrapperProps = {
  menu?: string // menu css
  buttonProps: IconButtonProps
  marketing?: boolean
  backButton?: boolean // display a go back button
}

// start left button of the nav
const LeftbuttonWrapper = ({
  menu,
  buttonProps,
  marketing,
  backButton,
}: LeftbuttonWrapperProps) => {
  return backButton || !marketing ? (
    <IconButton className={menu} {...buttonProps} title={'Navigate Home'}>
      {backButton ? <GrLinkPrevious /> : <Logo />}
    </IconButton>
  ) : null
}

const Leftbutton = memo(LeftbuttonWrapper)

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
  children?: any
}

const NavBarComponent: FC<NavProps> = ({
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
}) => {
  const classes = useStyles({ position })

  const buttonProps = !backButton
    ? { href: '/', component: Link }
    : {
        onClick: async (e: SyntheticEvent<HTMLButtonElement>) => {
          e?.preventDefault()
          if (backButton) {
            history.back()
          } else {
            window.location.href = '/'
          }
        },
      }

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
          <div className={`flex flex-1 place-items-center`}>
            <Leftbutton
              menu={classes.menu}
              buttonProps={buttonProps}
              backButton={backButton}
              marketing={marketing}
            />
            <NavBarTitle
              title={title}
              flex
              marketing={marketing}
              notitle={notitle}
            />
          </div>
        )}
        {!authenticated && marketingLinks ? (
          marketingLinks
        ) : (
          <AuthMenu
            className={classes.iconButton}
            registerClassName={classes.register}
            loginClassName={classes.login}
            authenticated={authenticated}
          />
        )}
      </div>
    </nav>
  )
}

export const NavBar = memo(NavBarComponent)
