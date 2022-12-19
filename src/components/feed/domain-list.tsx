import { memo } from 'react'
import type { IssueData } from '@app/types'
import type { Feed } from 'a11ywatch-web-wasm'
import { FeedItem } from './feed-item'

// domain list interface
interface DomainListProps {
  websites?: string[]
  feed: Feed
  data?: Map<string, Map<string, IssueData>>
  onScanEvent?(x: any): any
}

// domain list
const DomainListWrapper = ({
  websites,
  feed,
  data,
  onScanEvent,
}: DomainListProps) => (
  <ul className='list-none'>
    {websites?.map((domain, index) => (
      <FeedItem
        feed={feed}
        key={domain}
        domain={domain}
        index={index}
        data={data}
        onScanEvent={onScanEvent}
      />
    ))}
  </ul>
)

export const DomainList = memo(DomainListWrapper)
