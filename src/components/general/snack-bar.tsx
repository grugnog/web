'use client'

import { SyntheticEvent } from 'react'
import { observer } from 'mobx-react-lite'

import { AppManager } from '@app/managers'
import { Link } from './link'
import { GrClose } from 'react-icons/gr'
import { Button } from './buttons'

interface SnackProps {
  topLevel?: boolean
  snackID?: string
}

// close the snackbar
const handleClose = (
  event: SyntheticEvent<any, Event>,
  reason: string
): any => {
  event?.preventDefault()
  if (reason === 'clickaway') {
    return
  }
  AppManager.closeSnack()
}

const SnackBarComponent = ({ topLevel, snackID }: SnackProps) => {
  const snackStyle =
    !!AppManager.snackbar.open && !(topLevel && AppManager.modalActive)
      ? 'transition transform fixed z-100 bottom-0 inset-x-0 pb-2 sm:pb-5 opacity-100 scale-100 translate-y-0 ease-out duration-500 z-30'
      : 'hidden'

  // custom id to use for accessibility
  const id = snackID ?? 'message-id'

  return (
    <div
      aria-describedby={id}
      className={snackStyle}
      aria-hidden={!AppManager.snackbar.open}
    >
      <div className='max-w-screen-xl mx-auto px-2 sm:px-4'>
        <div
          className={`min-w-[50vw] overflow-hidden truncate ${
            AppManager.snackbar.type === 'error' ? 'border border-red-500' : ''
          } overflow-hidden truncate flex bg-white rounded space-x-4 p-4 place-items-center place-content-between border shadow`}
        >
          <div className='flex gap-x-1.5'>
            <p
              id={id}
              className={`text-base max-w-[65vw] md:max-w-[40vw] truncate ${
                AppManager.snackbar.type === 'error'
                  ? 'text-red-600'
                  : 'text-black'
              }`}
            >
              {AppManager.snackbar.title}
            </p>
            {AppManager.snackbar.showBtn ? (
              <Link className={'font-medium text-[#3b82f6]'} href='/payments'>
                UPGRADE ACCOUNT
              </Link>
            ) : null}
          </div>
          {AppManager.snackbar.autoClose ? null : (
            <Button
              aria-label='close'
              onClick={handleClose}
              className={'border-0 md:py-2'}
              iconButton
            >
              <GrClose className='grIcon text-sm' title='Close bar' />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export const SnackBar = observer(SnackBarComponent)
