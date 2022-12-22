import React from 'react'
import { classNames } from '@app/utils/classes'
import { PropsWithChildren } from 'react'
import { useInteractiveContext } from '../providers/interactive'
import { GrStatusGoodSmall } from 'react-icons/gr'

type ViewConfigTitleProps = {
  title?: string
  className?: string
}

// determine layout for view one of all or selected website todo
function ViewConfigTitleStateless({
  title = '',
  children,
  className = '',
}: PropsWithChildren<ViewConfigTitleProps>) {
  const { selectedWebsite } = useInteractiveContext()

  return (
    <div
      className={classNames(
        className,
        'flex items-center justify-between flex-wrap gap-y-1.5 pt-4 pb-2'
      )}
    >
      <>
        <div className='relative'>
          <div
            className={
              'border rounded px-3 py-1.5 text-sm font-medium text-gray-600 flex place-items-center gap-x-3'
            }
          >
            <h1 className={'min-w-[80px] max-w-[125px] truncate text-left'}>
              {selectedWebsite || title}
            </h1>
            <GrStatusGoodSmall className='grIcon text-[9px] text-gray-400' />
          </div>
        </div>
        {children}
      </>
    </div>
  )
}

export { ViewConfigTitleStateless }
