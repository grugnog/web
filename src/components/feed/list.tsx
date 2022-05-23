import React, { memo, useState, FC } from 'react'
import { IssueFeedCell } from '../general/cells'
import { issueExtractor } from '@app/utils'
import { FeedHeading } from './heading'
import type { FeedComponentProps } from './interface'
import { PageIssue } from '@app/types'

// list of issues rendered.
const FeedListComponent: FC<FeedComponentProps> = ({
  onScanEvent,
  issue,
  isHidden,
}) => {
  const [sectionHidden, onToggleSection] = useState<boolean>(!!isHidden)
  const pageIssues = issueExtractor(issue) // array of issues extract duplex types

  return (
    <li>
      <FeedHeading
        onScanEvent={onScanEvent}
        onToggleSection={onToggleSection}
        sectionHidden={sectionHidden}
        issue={issue}
      />
      <ul
        className={`overflow-x-hidden${sectionHidden ? ' hidden' : ' visible'}`}
      >
        {pageIssues?.map((item: PageIssue) => {
          return (
            <IssueFeedCell
              key={`${item.code}-${item.selector}-${issue.pageUrl}`}
              item={item}
              hideSelector
            />
          )
        })}
      </ul>
    </li>
  )
}

export const FeedList = memo(FeedListComponent)
