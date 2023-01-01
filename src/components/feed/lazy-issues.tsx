import React, { memo, FC, useMemo } from 'react'
import { IssueFeedCell } from '../general/cells'
import { FixedSizeList as List } from 'react-window'
import { getListHeight } from './utils'
import { PageIssue } from '@app/types'

interface RowProps {
  index: number
  style?: React.CSSProperties
}

// base feed props
interface LazyIssuesProps {
  fullScreen?: boolean
  issues: PageIssue[]
  pageMatchers?: Set<string>
}

// List of issues rendered.
const LazyIssuesComponent: FC<LazyIssuesProps> = ({
  fullScreen,
  issues,
  pageMatchers,
}) => {
  // allow feed adjustment at render for manual triggering
  const issueCount = issues.length

  const { size, height } = useMemo(
    () => getListHeight({ fullScreen, issueCount }),
    [fullScreen, issueCount]
  )

  const Row = ({ index, style }: RowProps) => {
    const item = issues[index]

    return (
      <IssueFeedCell
        item={item}
        style={style}
        completed={
          pageMatchers &&
          !!pageMatchers.size &&
          !pageMatchers.has(item.code + item.selector + item.context)
        }
      />
    )
  }

  if (fullScreen) {
    return (
      <div className={`bg-[rgba(172,182,192,0.06)] w-full h-full`}>
        <List
          height={height}
          itemCount={issueCount}
          itemSize={size}
          width={'100%'}
        >
          {Row}
        </List>
      </div>
    )
  }

  return (
    <ul className={`overflow-x-hidden`}>
      <List
        height={height}
        itemCount={issueCount}
        itemSize={size}
        width={'100%'}
      >
        {Row}
      </List>
    </ul>
  )
}

export const LazyIssues = memo(LazyIssuesComponent)
