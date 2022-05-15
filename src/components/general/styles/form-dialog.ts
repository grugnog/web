import { makeStyles } from '@material-ui/core/styles'
import type { MergedTheme } from '@app/theme'

export const formDialogStyles = makeStyles((theme: MergedTheme) => ({
  addButton: {
    marginLeft: theme.spacing(1),
  },
  dialogPadding: {
    paddingTop: `${theme.spacing(1)}px !important`,
  },
  input: {
    marginLeft: 2,
    flex: 1,
    width: '100%',
    [theme.breakpoints.down('md')]: {
      minWidth: 60,
      marginLeft: 'auto',
    },
  },
  inputAdjust: {
    marginLeft: 4,
  },
  formLabel: {
    padding: 0,
    margin: 0,
    [theme.breakpoints.down('md')]: {
      marginLeft: 'auto',
    },
  },
  formLabelText: {
    fontSize: '1.25rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '0.8rem',
    },
  },
  inputSelect: {
    fontSize: '1rem',
    paddingLeft: 4,
    [theme.breakpoints.down('md')]: {
      fontSize: 13,
    },
    maxHeight: '50vh',
  },
  textInput: {
    [theme.breakpoints.down('md')]: {
      fontSize: 15,
    },
  },
  formControl: {
    width: 'auto',
    margin: 0,
    padding: 0,
    minWidth: 120,
    [theme.breakpoints.down('md')]: {
      minWidth: 100,
    },
    [theme.breakpoints.down('md')]: {
      minWidth: 80,
    },
  },
  topRow: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: theme?.spacing(3),
  },
  topTitle: {
    flex: 1,
    ['& > h2']: {
      fontWeight: 600,
    },
  },
}))
