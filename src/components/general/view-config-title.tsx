import { Popover } from '@headlessui/react'
import { classNames } from '@app/utils/classes'
import { PropsWithChildren } from 'react'
import { Header } from './header'
import { AllWebsitesList } from './website/all-websites-list'
import { HomeManager } from '@app/managers'
import { useInteractiveContext } from '../providers/interactive'

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

  return (
    <div
      className={classNames(
        className,
        'flex items-center justify-between flex-wrap'
      )}
    >
      <>
        <Popover className='relative'>
          <Popover.Button className={'border rounded px-3 py-2'}>
            <h1 className={'text-base font-medium text-gray-600'}>
              {selectedWebsite || title}
            </h1>
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
