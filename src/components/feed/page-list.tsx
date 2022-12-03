import { memo } from 'react'
import type { IssueData } from '@app/types'
import type { Feed } from 'a11ywatch-web-wasm'
import { LiveFeedList } from './live-feed'

type FeedItemProps = {
  feed: Feed
  data?: Map<string, Map<string, IssueData>>
  domain: string
  onScanEvent?: any
  index?: number
  highlightErrors?: boolean
}

const PageListWrapper = ({
  pages,
  onScanEvent,
  feed,
  domain,
}: FeedItemProps & {
  pages: any[]
  sorted?: boolean
}) => {
  return (
    <>
      {pages?.map((pageUrl: any) => (
        <LiveFeedList
          key={pageUrl}
          highlightErrors
          onScanEvent={onScanEvent}
          isHidden
          domain={domain}
          feed={feed}
          pageUrl={pageUrl}
        />
      ))}
    </>
  )
}

export const PageList = memo(PageListWrapper)
