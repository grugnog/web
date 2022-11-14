import { makeStyles, Theme } from '@material-ui/core/styles'

export const drawerStyles = makeStyles((theme: Theme) => {
  const drawerWidth = '250px'
  const breakDrawerWidth = 'sm'

  let extraBreakPoints = {
    shift: {
      [theme.breakpoints.down(breakDrawerWidth)]: {
        width: `calc(100% - 13%)`,
      },
    },
    drawer: {
      [theme.breakpoints.down(breakDrawerWidth)]: {
        width: `13%`,
      },
    },
  }

  return {
    absolute: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
    },
    nav: {
      zIndex: 3,
      backgroundColor: theme.palette.background.default,
    },
    appBarShift: {},
    menuButton: {
      marginLeft: 2,
      marginRight: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        marginRight: theme.spacing(1),
      },
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      flexDirection: 'column',
      overflowX: 'hidden',
      ...extraBreakPoints.drawer,
    },
    drawerPaper: {
      width: drawerWidth,
      overflowX: 'hidden',
      ...extraBreakPoints.drawer,
    },
    drawerIconContainer: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
    },
    toggleAlert: {
      flex: 1,
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    alert: {
      [theme.breakpoints.down('sm')]: {
        color: theme.palette.primary.main,
      },
    },
    content: {
      flexGrow: 1,
      paddingBottom: theme.spacing(1),
      overflow: 'auto',
    },
    title: {
      color: 'rgba(255, 255, 255, 0.85)',
      letterSpacing: '.12rem',
      fontWeight: 800,
      [theme.breakpoints.down('sm')]: {
        fontSize: 16,
      },
    },
  }
})
