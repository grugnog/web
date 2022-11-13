import React, { memo, useState, FC } from 'react'
import { IssueFeedCell } from '../general/cells'
import { issueExtractor } from '@app/utils'
import { FeedHeading } from './heading'
import type { FeedComponentProps } from './interface'
import { FixedSizeList as List } from 'react-window'

const getListHeight = ({
  fullScreen,
  issueCount = 0,
}: {
  fullScreen?: boolean
  issueCount: number
}) => {
  // full height of screen for window
  const list = typeof window !== 'undefined' ? window.innerHeight : 500
  const size = Math.max(list / 6, 200) // try to fit 6 items per screen viewport

  let height = 0

  if (fullScreen) {
    height = list
  } else if (issueCount <= 4) {
    height = size * issueCount
  } else {
    height = list / 2
  }

  return { size, height }
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

  if (!issue) {
    return null
  }

  const pageIssues = issueExtractor(issue) // array of issues extract duplex types

  // todo: memo row cell out of render
  const Row = ({
    index,
    style,
  }: {
    index: number
    style?: React.CSSProperties
  }) => <IssueFeedCell item={pageIssues[index]} style={style} />

  const issueCount = pageIssues?.length ?? 0

  const { size, height } = getListHeight({ fullScreen, issueCount })

  if (fullScreen) {
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
        pageUrl={issue.pageUrl}
        totalIssues={issue.issues?.length || 0}
        highLight={!!highLight}
      />
      {sectionHidden ? null : (
        <ul className={`overflow-x-hidden bg-[rgba(172,182,192,0.06)]`}>
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
