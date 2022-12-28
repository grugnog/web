import { memo } from 'react'
import { GrClose, GrExpand } from 'react-icons/gr'
import { FilterDropdown } from './filters'

const Top = ({
  onClick,
  open,
  feedExist,
  clearFeed,
}: {
  onClick(x: any): any
  open: boolean
  feedExist?: boolean
  clearFeed(): any
}) => {
  const closeFeed = () => onClick(!open)

  return (
    <div className={`flex place-items-center px-3 py-1 h-14 gap-x-5`}>
      <p className={`flex-1 text-lg font-semibold`}>Recent</p>
      {feedExist ? (
        <button
          onClick={clearFeed}
          className={'px-4 py-3 hover:opacity-70 rounded-2xl text-sm'}
          title={'Clear Recent'}
        >
          Clear
        </button>
      ) : null}
      <FilterDropdown open={open} />
      <button
        onClick={closeFeed}
        aria-label='close'
        title='close issue feed'
        className='visible lg:hidden p-3 hover:opacity-70 rounded-2xl'
        type={'button'}
      >
        {!open ? (
          <GrExpand className='grIcon' />
        ) : (
          <GrClose className='grIcon' />
        )}
      </button>
    </div>
  )
}

// re-render on state change for toggling click event
export const TopSection = memo(Top)
