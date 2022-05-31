import React, { memo, useState, FC } from 'react'
import { IssueFeedCell } from '../general/cells'
import { issueExtractor } from '@app/utils'
import { FeedHeading } from './heading'
import type { FeedComponentProps } from './interface'
import { FixedSizeList as List } from 'react-window'

const listHeight =
  typeof window !== 'undefined' ? window.innerHeight / 2.3 : 500

// List of issues rendered.
const FeedListComponent: FC<FeedComponentProps> = ({
  onScanEvent,
  issue,
  isHidden,
}) => {
  const [sectionHidden, onToggleSection] = useState<boolean>(!!isHidden)
  const pageIssues = issueExtractor(issue) // array of issues extract duplex types

  const Row = ({ index, style }: any) => {
    const item = pageIssues[index]

    return (
      <IssueFeedCell
        key={`${item.code}-${item.selector}-${issue.pageUrl}`}
        item={item}
        style={style}
      />
    )
  }

  return (
    <li>
      <FeedHeading
        onScanEvent={onScanEvent}
        onToggleSection={onToggleSection}
        sectionHidden={sectionHidden}
        issue={issue}
      />
      <ul
        className={`overflow-x-hidden${
          sectionHidden
            ? ' hidden'
            : ' visible border border-t-0 border-l-0 border-r-0 bg-[rgba(172,182,192,0.06)]'
        }`}
      >
        <List
          height={listHeight}
          itemCount={pageIssues.length}
          itemSize={Math.min(listHeight / 1.38, 260)}
          width={'100%'}
        >
          {Row}
        </List>
      </ul>
    </li>
  )
}

export const FeedList = memo(FeedListComponent)
