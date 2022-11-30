import { memo, useCallback } from 'react'
import { observer } from 'mobx-react-lite'

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
  )

const SnackbarContainer = observer(({ store }: any) => {
  const lowerCaseText = store?.snackbar?.title ?? ''
  const needsUpgrade = upgradeRequired(lowerCaseText)

  const handleClose = useCallback(
    (_: any, reason: string): any => {
      if (reason === 'clickaway') {
        return
      }
      if (store && store.closeSnack) {
        store.closeSnack()
      }
    },
    [store]
  )

  return (
    <MUISnackbar
      open={!!store?.snackbar?.open}
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
          <div className='overflow-hidden truncate'>
            <p
              id='message-id'
              className={`text-base max-w-[65vw] md:max-w-[40vw] truncate ${
                store.snackbar.type === 'error' ? 'text-red-600' : 'text-black'
              }`}
            >
              {store.snackbar.title}
            </p>
            {needsUpgrade ? (
              <Link className={'font-medium text-[#3b82f6]'} href='/payments'>
                UPGRADE ACCOUNT
              </Link>
            ) : null}
          </div>
        }
        className={`w-[50vw] overflow-hidden truncate ${
          store.snackbar.type === 'error' ? 'border border-red-500' : ''
        }`}
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

export const SnackBar = memo(SnackBarWrapper)
