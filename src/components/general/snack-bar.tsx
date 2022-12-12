import { memo, SyntheticEvent, useCallback } from 'react'
import { observer } from 'mobx-react-lite'

import { AppManager } from '@app/managers'
import { Link } from './link'
import { GrClose } from 'react-icons/gr'
import { Button } from './buttons'

interface SnackProps {
  store: typeof AppManager
  topLevel?: boolean
  snackID?: string
}

const SnackbarContainer = observer(
  ({ store, topLevel, snackID }: SnackProps) => {
    const handleClose = useCallback(
      (event: SyntheticEvent<any, Event>, reason: string): any => {
        event?.preventDefault()
        if (reason === 'clickaway') {
          return
        }
        AppManager.closeSnack()
      },
      []
    )

    const snackStyle =
      !!store.snackbar.open && !(topLevel && store.modalActive)
        ? 'transition transform fixed z-100 bottom-0 inset-x-0 pb-2 sm:pb-5 opacity-100 scale-100 translate-y-0 ease-out duration-500 z-30'
        : 'hidden'

    // custom id to use for accessibility
    const id = snackID ?? 'message-id'

    return (
      <div
        aria-describedby={id}
        className={snackStyle}
        aria-hidden={!store?.snackbar?.open}
      >
        <div className='max-w-screen-xl mx-auto px-2 sm:px-4'>
          <div
            className={`min-w-[50vw] overflow-hidden truncate ${
              store.snackbar.type === 'error' ? 'border border-red-500' : ''
            } overflow-hidden truncate flex bg-white rounded space-x-4 p-4 place-items-center place-content-between border shadow`}
          >
            <div className='flex space-x-3'>
              <p
                id={id}
                className={`text-base max-w-[65vw] md:max-w-[40vw] truncate ${
                  store.snackbar.type === 'error'
                    ? 'text-red-600'
                    : 'text-black'
                }`}
              >
                {store.snackbar.title}
              </p>
              {store.snackbar.showBtn ? (
                <Link className={'font-medium text-[#3b82f6]'} href='/payments'>
                  UPGRADE ACCOUNT
                </Link>
              ) : null}
            </div>
            {store?.snackbar?.autoClose ? null : (
              <Button
                aria-label='close'
                onClick={handleClose}
                className={'border-0 md:py-2 md:rounded-3xl'}
              >
                <GrClose className='grIcon' title='Close bar' />
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }
)

const SnackBarWrapper = ({ snackID, topLevel }: Partial<SnackProps>) => (
  <SnackbarContainer store={AppManager} snackID={snackID} topLevel={topLevel} />
)

export const SnackBar = memo(SnackBarWrapper)
