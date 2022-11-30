import { makeStyles } from '@material-ui/core/styles'

export const useProfileStyles = makeStyles(() => ({
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  password: {
    marginRight: 70,
  },
  submit: {
    minWidth: 175,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 20,
  },
  input: {},
  passwordTitle: {
    marginRight: 10,
  },
  defaultButton: {
    margin: 0,
    marginLeft: 70,
    padding: 0,
  },
}))
