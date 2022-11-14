import { makeStyles, createStyles } from '@material-ui/core/styles'
import type { MergedTheme } from '@app/theme'

const useStyles = makeStyles(({ breakpoints }: MergedTheme) =>
  createStyles({
    root: {
      width: '24vw',
      minWidth: 260,
      overflowY: 'scroll',
      zIndex: 4,
      [breakpoints.down('sm')]: {
        top: '30%',
        height: '70vh',
        width: '100vw',
        left: 0,
        position: 'fixed',
        overflowY: 'auto',
      },
    },
  })
)

export { useStyles }
