import React, { memo, SyntheticEvent, useCallback, useState } from 'react'
import { IconButton } from '@material-ui/core'
import { GrDown, GrUp } from 'react-icons/gr'
import { FeedIssueCard } from '../feed/issue'
import { Issue } from '@app/types'

export function IssueFeedCellComponent({
  item,
  hideSelector,
}: {
  item: Partial<Issue>
  hideSelector?: boolean
}) {
  const [issueView, setIssueView] = useState<boolean>(true)

  const onToggleIssue = useCallback(
    (e: SyntheticEvent<HTMLButtonElement>) => {
      e?.preventDefault()
      setIssueView((v) => !v)
    },
    [setIssueView]
  )

  const iconStyle = { height: 12, width: 12 }

  return (
    <li className='border border-t-0 border-l-0 border-r-0'>
      <div
        className={
          'flex flex-1 px-3 place-items-center py-1 border border-t-0 border-l-0 border-r-0'
        }
      >
        <p className={`flex flex-1 text-md line-clamp-2`}>{item?.selector}</p>
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
      <div className={issueView ? 'visible' : 'hidden'}>
        {issueView ? (
          <FeedIssueCard {...item} hideSelector={hideSelector} />
        ) : null}
      </div>
    </li>
  )
}

export const IssueFeedCell = memo(IssueFeedCellComponent)
