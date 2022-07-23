import React from 'react'
import { Button } from './button'

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
