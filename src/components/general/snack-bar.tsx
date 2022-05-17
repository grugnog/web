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

const upgradeRequired = (text: string) =>
  text.includes('max websites added') ||
  text.includes('upgrade your account') ||
  text.includes(
    'you hit your scan limit for the day, please try again tomorrow.'
  ) ||
  text.includes(
    'you hit your scan limit for the day, please try again tomorrow to add your website.'
  ) ||
  text === 'you need to upgrade your account to edit scripts'

const SnackbarContainer = observer(({ store }: any) => {
  if (!store?.snackbar) {
    return null
  }

  const lowerCaseText = store?.snackbar?.title
    ? String(store?.snackbar?.title).toLowerCase()
    : ''

  const needsUpgrade = upgradeRequired(lowerCaseText)
  const marketingRedirect = lowerCaseText.includes('redirected to dashboard')

  const handleClose = (_: any, reason: string): any => {
    if (reason === 'clickaway') {
      return
    }
    if (store && store.closeSnack) {
      store.closeSnack()
    }
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
              className={`text-lg line-clamp-2 ${
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
