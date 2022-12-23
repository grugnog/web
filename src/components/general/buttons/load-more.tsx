import React from 'react'
import { Button } from './button'

// load more content if exist
export const LoadMoreButton: React.FC<{
  onLoadMoreEvent(x: any): Promise<void>
  visible?: boolean
  title?: string | React.ReactElement
  loading?: boolean
}> = ({ onLoadMoreEvent, visible, loading, title }) => {
  return (
    <div
      className={`${visible ? 'flex place-content-center py-8' : 'hidden'}`}
      aria-busy={loading ? 'true' : 'false'}
    >
      <Button onClick={onLoadMoreEvent} className={'w-40'}>
        {loading ? 'Loading...' : title || 'Load More'}
      </Button>
    </div>
  )
}
