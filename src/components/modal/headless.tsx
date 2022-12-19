import { FC, Fragment, PropsWithChildren } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { getSize, TWSize } from '@app/styles/tw'

export const HeadlessModal: FC<
  PropsWithChildren<{
    open: boolean
    onClose(x?: any): any
    size?: TWSize
    hideBackdrop?: boolean
    center?: boolean
    overflow?: boolean // should apply overflow auto
  }>
> = ({
  children,
  open,
  onClose,
  size,
  hideBackdrop,
  center,
  overflow,
  ...props
}) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-20'
        onClose={onClose}
        aria-labelledby={'dynamic-modal-title'}
        aria-describedby='dynamic-modal-description'
        {...props}
      >
        {hideBackdrop ? null : (
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>
        )}
        {hideBackdrop && !center ? (
          <div className={`${size ? getSize(size) : 'sm:max-w-lg'}`}>
            {children}
          </div>
        ) : (
          <div className='fixed inset-0 z-10 overflow-y-auto'>
            <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              >
                <Dialog.Panel
                  className={`relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full ${
                    size ? getSize(size) : 'sm:max-w-lg'
                  } max-h-[80vh]${
                    overflow ? ' overflow-auto' : ' overflow-hidden'
                  }`}
                >
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        )}
      </Dialog>
    </Transition.Root>
  )
}
