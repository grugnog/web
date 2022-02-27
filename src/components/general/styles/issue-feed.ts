import { makeStyles, createStyles } from '@material-ui/core/styles'
import type { MergedTheme } from '@app/theme'

const containerPadding = { paddingLeft: 12, paddingRight: 10 }

export const useStyles = makeStyles(
  ({ breakpoints, palette, color }: MergedTheme) =>
    createStyles({
      root: {
        position: 'fixed',
        right: 0,
        top: 65,
        bottom: 0,
        width: '20vw',
        minWidth: 260,
        borderLeft: `1px solid ${color?.border || '#ccc'}`,
        borderTop: `1px solid ${color?.border || '#ccc'}`,
        backgroundColor: palette.background.default,
        overflowY: 'scroll',
        zIndex: 2,
        [breakpoints.down(1280)]: {
          display: 'none',
        },
      },
      title: {
        flex: 1,
      },
      list: {
        overflowX: 'hidden',
        paddingBottom: 0,
        paddingTop: 0,
        listStyleType: 'none',
      },
      searchList: {
        overflowX: 'hidden',
        overflowY: 'scroll',
        paddingBottom: 0,
        display: 'block',
        maxHeight: 'calc(100vh - 48px)',
        [breakpoints.down('sm')]: {
          maxHeight: '50vh',
        },
        paddingTop: 0,
      },
      checklist: {
        maxHeight: 'none',
        overflowY: 'hidden',
      },
      subTitle: {
        ...containerPadding,
        borderBottom: `1px solid ${color?.border || '#ccc'}`,
      },
      row: {
        display: 'flex',
        borderBottom: `1px solid ${color?.border || '#ccc'}`,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 30,
      },
      titleContainer: containerPadding,
      print: {
        minHeight: 'auto',
      },
    })
)
