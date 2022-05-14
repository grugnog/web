import React, { memo } from 'react'
import { observer } from 'mobx-react'

import {
  Snackbar as MUISnackbar,
  SnackbarContent,
  IconButton,
} from '@material-ui/core'

import { AppManager } from '@app/managers'
import { Link } from './link'
import { GrClose } from 'react-icons/gr'

const SnackbarContainer = observer(({ store }: any) => {
  if (!store?.snackbar) {
    return null
  }

  const lowerCaseText = store?.snackbar?.title
    ? String(store?.snackbar?.title).toLowerCase()
    : ''

  const needsUpgrade =
    lowerCaseText.includes('max websites added') ||
    lowerCaseText.includes('upgrade your account') ||
    lowerCaseText === 'you need to upgrade your account to edit scripts'

  const marketingRedirect = lowerCaseText.includes('redirected to dashboard')

  const handleClose = (_: any, reason: string): any => {
    if (reason === 'clickaway') {
      return
    }
    store.closeSnack()
  }

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
        style={{
          backgroundColor: '#fff',
        }}
        message={
          <div className='line-clamp-2 max-w-[76vw]'>
            <p
              id='message-id'
              className={`text-lg line-clamp-4 ${
                store.snackbar.type === 'error' ? 'text-red-500' : 'text-black'
              }`}
            >
              {store.snackbar.title}
            </p>
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
          </div>
        }
        className={
          store.snackbar.type === 'error' ? 'border border-red-500' : ''
        }
        action={[
          <IconButton
            key='close'
            aria-label='close'
            component='button'
            color='inherit'
            onClick={handleClose as any}
          >
            <GrClose />
          </IconButton>,
        ]}
      />
    </MUISnackbar>
  )
})

const SnackBarWrapper = () => <SnackbarContainer store={AppManager} />

const SnackBar = memo(SnackBarWrapper)

export { SnackBar }
