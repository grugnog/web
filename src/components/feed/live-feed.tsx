import React, { memo, useState, FC, useEffect, useMemo } from 'react'
import { IssueFeedCell } from '../general/cells'
import { issueExtractor } from '@app/utils'
import { FeedHeading } from './heading'
import type { FeedComponentProps } from './interface'
import { FixedSizeList as List } from 'react-window'
import { getListHeight } from './utils'
import { FilterManager } from '@app/managers/filters'
import { Feed } from 'a11ywatch-web-wasm'

interface RowProps {
  index: number
  style?: React.CSSProperties
}

// base feed props
interface BaseFeed extends Omit<FeedComponentProps, 'issue'> {
  feed: Feed
  domain: string
  pageUrl: string
}

// List of issues rendered.
const LiveFeedComponent: FC<BaseFeed> = ({
  onScanEvent,
  isHidden,
  fullScreen,
  highlightErrors,
  feed,
  domain,
  pageUrl,
}) => {
  const [sectionHidden, onToggleSection] = useState<boolean>(!!isHidden)

  const issue = useMemo(() => feed.get_page(domain, pageUrl), [domain, pageUrl])

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

  const { size, height } = useMemo(
    () => getListHeight({ fullScreen, issueCount }),
    [fullScreen, issueCount]
  )

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

export const LiveFeedList = memo(LiveFeedComponent)
