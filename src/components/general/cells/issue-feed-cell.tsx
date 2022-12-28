import React from 'react'
import { FeedIssueCard } from '../feed/issue'
import { Issue } from '@app/types'
import { FilterManager } from '@app/managers/filters'
import { observer } from 'mobx-react-lite'

// Issue Cell used on Feed after authentication.
const IssueFeedCellComponent = ({
  item,
  style,
  completed,
}: {
  item: Issue
  hideSelector?: boolean
  style?: any
  completed?: boolean
}) => {
  const filtered =
    FilterManager.filters.has(item.code) &&
    FilterManager.filters.get(item.code)?.checked

  const filterStyles = filtered
    ? ' bg-gray-200 dark:bg-gray-500 font-medium'
    : ''
  const completedStyles = completed
    ? ' bg-green-100 dark:bg-green-700 font-medium'
    : ''

  return (
    <div
      className={`h-[inherit]${filterStyles}${completedStyles}`}
      style={style}
    >
      <FeedIssueCard
        message={item.message}
        code={item.code}
        context={item.context}
        type={item.type}
        selector={item.selector}
        recurrence={item.recurrence}
      />
    </div>
  )
}

export const IssueFeedCell = observer(IssueFeedCellComponent)
