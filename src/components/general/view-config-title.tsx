import { Popover } from '@headlessui/react'
import { classNames } from '@app/utils/classes'
import { PropsWithChildren, useMemo } from 'react'
import { AllWebsitesList } from './website/all-websites-list'
import { useInteractiveContext } from '../providers/interactive'
import { GrStatusGoodSmall } from 'react-icons/gr'

type ViewConfigTitleProps = {
  title?: string
  className?: string
}

// determine layout for view one of all or selected website todo
function ViewConfigTitle({
  title = '',
  children,
  className = '',
}: PropsWithChildren<ViewConfigTitleProps>) {
  const { selectedWebsite } = useInteractiveContext()

  const pageTitle = useMemo(() => {
    // todo: set hostname on event instead
    if (selectedWebsite) {
      try {
        return new URL(selectedWebsite).hostname
      } catch (e) {
        console.error(e)
      }
    }
  }, [selectedWebsite])

  return (
    <div
      className={classNames(
        className,
        'flex items-center justify-between flex-wrap gap-y-1.5 pt-4 pb-2'
      )}
    >
      <>
        <Popover className='relative'>
          <Popover.Button
            className={
              'border rounded px-3 py-1.5 text-sm font-medium text-gray-600 flex place-items-center gap-x-3 bg-white'
            }
          >
            <h1 className={'min-w-[80px] max-w-[180px] truncate text-left'}>
              {pageTitle || title}
            </h1>
            <GrStatusGoodSmall className='grIcon text-[9px] text-gray-400' />
          </Popover.Button>
          <Popover.Panel className='absolute z-10 text-gray-700 w-96 py-1'>
            <AllWebsitesList />
          </Popover.Panel>
        </Popover>
        {children}
      </>
    </div>
  )
}

export { ViewConfigTitle }