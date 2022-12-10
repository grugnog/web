import { roleMap } from '@app/utils/role-map'
import { HeadlessModal } from '../modal/headless'
import { Button } from './buttons'

interface CancelSubscriptionModalProps {
  open: boolean
  onClose(x: any): any
  role?: number
  onCancelEvent?(x: any): any
}

export const CancelSubscriptionModal = ({
  open,
  onClose,
  role,
  onCancelEvent,
}: CancelSubscriptionModalProps) => {
  return (
    <HeadlessModal
      open={open}
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <div className='space-y-6 p-6 flex flex-col'>
        <p id='alert-dialog-title' className='text-xl font-medium'>
          Cancel your subscription?
        </p>
        <p id='alert-dialog-description'>
          Confirm cancel for <b>{roleMap(role)}</b> subscription? You can always
          re-sub later on. Cancelling resets all of your data from your account.
          Please make sure to backup your data accordingly.
        </p>
      </div>
      <div className='py-4 space-x-3 px-6 flex place-content-end'>
        <Button onClick={onClose} className={"border-none"}>No</Button>
        <Button
          onClick={onCancelEvent}
          className={'text-red-600 border-red-600'}
        >
          Confirm Cancel
        </Button>
      </div>
    </HeadlessModal>
  )
}
