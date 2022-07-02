import { Button } from './button'

import React from 'react'

// load more content if exist
export const LoadMoreButton: React.FC<{
  onLoadMoreEvent(x: any): Promise<void>
  visible?: boolean
}> = ({ onLoadMoreEvent, visible }) => {
  return (
    <div
      className={`${
        visible ? 'block' : 'hidden'
      } flex place-content-center pt-8`}
    >
      <Button onClick={onLoadMoreEvent} className={'w-40'}>
        Load More
      </Button>
    </div>
  )
}
