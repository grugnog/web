import React, { memo, SyntheticEvent, useState } from 'react'
import { IconButton } from '@material-ui/core'
import { GrDown, GrUp } from 'react-icons/gr'
import { FeedIssueCard } from '../feed/issue'
import { Issue } from '@app/types'

const iconStyle = { height: 12, width: 12 }

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

  return (
    <li
      className='border border-t-0 border-l-0 border-r-0 h-[inherit]'
      style={style}
    >
      {!hideSelector ? null : (
        <div
          className={
            'flex flex-1 px-3 place-items-center py-1 border border-t-0 border-l-0 border-r-0'
          }
        >
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

export const IssueFeedCell = memo(IssueFeedCellComponent)
