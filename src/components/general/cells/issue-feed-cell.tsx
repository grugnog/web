import { SyntheticEvent, useState } from 'react'
import { IconButton } from '@material-ui/core'
import { GrDown, GrUp } from 'react-icons/gr'
import { FeedIssueCard } from '../feed/issue'
import { Issue } from '@app/types'
import { FilterManager } from '@app/managers/filters'
import { observer } from 'mobx-react-lite'

const iconStyle = { height: 13, width: 13 }

// Issue Cell used on Feed after authentication.
export function IssueFeedCellComponent({
  item,
  hideSelector,
  style,
}: {
  item: Partial<Issue>
  hideSelector?: boolean
  style?: any
}) {
  const [issueView, setIssueView] = useState<boolean>(true)

  const onToggleIssue = (e: SyntheticEvent<HTMLButtonElement>) => {
    e?.preventDefault()
    setIssueView((v) => !v)
  }

  // todo: move to parent
  const filtered =
    item && item.code
      ? FilterManager.filters.has(item.code) &&
        FilterManager.filters.get(item.code)?.checked
      : false

  return (
    <li
      className={`h-[inherit] ${
        filtered ? 'bg-gray-200 text-gray-700 font-medium' : ''
      }`}
      style={style}
    >
      {!hideSelector ? null : (
        <div className={'flex flex-1 px-3 place-items-center py-2'}>
          <p className={`flex flex-1 text-base line-clamp-1`}>
            {item?.selector}
          </p>
          <IconButton
            aria-label='toggle item visibility'
            aria-controls='menu-appbar-item'
            onClick={onToggleIssue}
            color='inherit'
          >
            {issueView ? (
              <GrUp className='grIcon' style={iconStyle} />
            ) : (
              <GrDown className='grIcon' style={iconStyle} />
            )}
          </IconButton>
        </div>
      )}
      <FeedIssueCard {...item} hidden={!issueView} />
    </li>
  )
}

export const IssueFeedCell = observer(IssueFeedCellComponent)
