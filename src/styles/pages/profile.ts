import { makeStyles } from '@material-ui/core/styles'

export const useProfileStyles = makeStyles(() => ({
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  email: {
    marginBottom: 10.5,
  },
  password: {
    marginRight: 70,
  },
  submit: {
    minWidth: 170,
  },
  payments: {
    minWidth: 170,
    background: '#ccc',
    marginBottom: 10.5,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 20,
  },
  input: {
    marginBottom: 10,
  },
  passwordTitle: {
    marginRight: 10,
  },
  defaultButton: {
    margin: 0,
    marginLeft: 70,
    padding: 0,
  },
}))
