import React, { Fragment } from 'react'
import { observer } from 'mobx-react'

import {
  Snackbar as MUISnackbar,
  SnackbarContent,
  Typography,
  IconButton,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import CloseIcon from '@material-ui/icons/Close'
import { AppManager } from '@app/managers'
import { Link } from './link'

const useStyles = makeStyles((theme) => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  errorMessage: {
    color: '#000',
  },
  message: {
    color: '#fff',
    maxWidth: '70vw',
  },
}))

const SnackbarContainer = observer(({ store }: any) => {
  const classes = useStyles()
  const handleClose = (_: any, reason: string): any => {
    if (reason === 'clickaway') {
      return
    }
    store.closeSnack()
  }

  const tt = store?.snackbar?.title ?? ''

  const lowerCaseText = tt.toLowerCase()

  const needsUpgrade =
    lowerCaseText.includes('max websites added') ||
    lowerCaseText.includes('upgrade your account') ||
    lowerCaseText === 'you need to upgrade your account to edit scripts'

  const marketingRedirect = lowerCaseText.includes('redirected to dashboard')

  return (
    <MUISnackbar
      open={store.snackbar.open}
      autoHideDuration={6000}
      onClose={handleClose}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
    >
      <SnackbarContent
        color='primary'
        message={
          <Fragment>
            <Typography
              id='message-id'
              variant='subtitle1'
              className={
                store.snackbar.type === 'error'
                  ? classes.errorMessage
                  : classes.message
              }
            >
              {store.snackbar.title}
            </Typography>
            {needsUpgrade ? (
              <Link
                href='/payments'
                style={{
                  fontWeight: 'bold',
                  color: '#3b82f6',
                }}
              >
                UPGRADE ACCOUNT
              </Link>
            ) : null}
            {marketingRedirect ? (
              <Link href='/?noredirect=true' style={{ fontWeight: 'bold' }}>
                Go back to marketing page
              </Link>
            ) : null}
          </Fragment>
        }
        className={store.snackbar.type === 'error' ? classes.error : ''}
        action={[
          <IconButton
            key='close'
            aria-label='close'
            component='button'
            color='inherit'
            onClick={handleClose as any}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </MUISnackbar>
  )
})

const SnackBar = () => <SnackbarContainer store={AppManager} />

export { SnackBar }
