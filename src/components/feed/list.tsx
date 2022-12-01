import React, { memo, useState, FC, useEffect } from 'react'
import { IssueFeedCell } from '../general/cells'
import { issueExtractor } from '@app/utils'
import { FeedHeading } from './heading'
import type { FeedComponentProps } from './interface'
import { FixedSizeList as List } from 'react-window'
import { getListHeight } from './utils'
import { FilterManager } from '@app/managers/filters'
import { Header3 } from '../general/header'

interface RowProps {
  index: number
  style?: React.CSSProperties
}

// List of issues rendered.
const FeedListComponent: FC<FeedComponentProps> = ({
  onScanEvent,
  issue,
  isHidden,
  fullScreen,
  highlightErrors,
}) => {
  const [sectionHidden, onToggleSection] = useState<boolean>(!!isHidden)

  const pageIssues = issueExtractor(issue) // array of issues extract duplex types

  useEffect(() => {
    for (const item of pageIssues) {
      FilterManager.addFilter(item?.code)
    }
  }, [pageIssues])

  const Row = ({ index, style }: RowProps) => (
    <IssueFeedCell item={pageIssues[index]} style={style} />
  )

  const issueCount = pageIssues.length

  const { size, height } = getListHeight({ fullScreen, issueCount })

  if (fullScreen) {
    if (!issueCount) {
      return (
        <div
          className={`bg-[rgba(172,182,192,0.06)] w-full h-full place-content-center flex p-3`}
        >
          <Header3>No Issues found!</Header3>
        </div>
      )
    }
    return (
      <ul className={`bg-[rgba(172,182,192,0.06)] w-full h-full`}>
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

  const highLight =
    highlightErrors &&
    issue?.issues?.length &&
    issue.issues[0]?.type === 'error'

  return (
    <li>
      <FeedHeading
        onScanEvent={onScanEvent}
        onToggleSection={onToggleSection}
        sectionHidden={sectionHidden}
        pageUrl={issue?.pageUrl}
        totalIssues={issue?.issues?.length || 0}
        highLight={!!highLight}
      />
      {sectionHidden ? null : (
        <ul className={`overflow-x-hidden bg-gray-50`}>
          <List
            height={height}
            itemCount={issueCount}
            itemSize={size}
            width={'100%'}
          >
            {Row}
          </List>
        </ul>
      )}
    </li>
  )
}

export const FeedList = memo(FeedListComponent)
