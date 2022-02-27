import { makeStyles, createStyles } from '@material-ui/core/styles'
import type { MergedTheme } from '@app/theme'

export const collaspeListStyles = makeStyles(
  ({ palette, spacing }: MergedTheme) =>
    createStyles({
      root: {
        width: '100%',
        backgroundColor: palette.divider,
        marginTop: '60px',
      },
      nested: {
        paddingLeft: spacing(4),
        paddingRight: spacing(4),
      },
      info: {
        borderTop: `1px solid ${palette.divider}`,
        paddingLeft: spacing(2),
        paddingRight: spacing(2),
        paddingBottom: spacing(1),
        paddingTop: spacing(1),
      },
      text: {
        fontSize: '1em',
      },
      textHeader: {
        fontSize: '1.2em',
        fontWeight: 'bold',
      },
      code: {
        maxHeight: '60vh',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: 0,
          border: 0,
        },
      },
      title: {
        flex: 1,
        fontWeight: 500,
      },
      row: {
        display: 'inline-flex',
        alignItems: 'center',
      },
    })
)
