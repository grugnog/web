import { memo, useDeferredValue, useState, useCallback } from 'react'
import type { IssueData } from '@app/types'
import type { Feed } from 'a11ywatch-web-wasm'
import { PageList } from './page-list'
import { GrSort } from 'react-icons/gr'

type FeedItemProps = {
  feed: Feed
  data?: Map<string, Map<string, IssueData>>
  domain: string
  onScanEvent?: any
  index?: number
  highlightErrors?: boolean
}

// domain list interface
interface DomainListProps {
  websites?: string[]
  feed: Feed
  data?: Map<string, Map<string, IssueData>>
  onScanEvent?(x: any): any
}

type FeedButtonProps = {
  domain: string
  pageCount: number
  onHeadingToggleEvent(): any
  onSortClick(): any
}

const FeedButton = ({
  domain,
  onHeadingToggleEvent,
  onSortClick,
  pageCount,
}: FeedButtonProps) => {
  return (
    <div className='flex'>
      <button
        className='p-4 text-lg w-full text-left font-medium hover:bg-gray-200'
        onClick={onHeadingToggleEvent}
      >
        <div>
          {domain}
          <div className='text-sm text-gray-600 font-normal'>
            {pageCount} page{pageCount === 1 ? '' : 's'}
          </div>
        </div>
      </button>
      <button
        className='p-4 text-left hover:bg-gray-200'
        onClick={onSortClick}
        title={`sort ${domain}`}
        aria-label={`sort ${domain}`}
      >
        <GrSort className='grIcon' />
      </button>
    </div>
  )
}

const FeedButtonMemo = memo(FeedButton)

const FeedItemWrapper = ({
  feed,
  onScanEvent,
  index,
  domain,
}: FeedItemProps) => {
  const [visible, setVisible] = useState<boolean>(index === 0)
  const [sorted, setSorted] = useState<boolean>(false)
  const pages = useDeferredValue(feed?.get_website_keys(domain) ?? [])

  const onHeadingToggleEvent = useCallback(
    () => setVisible((v) => !v),
    [setVisible]
  )

  const onSortClick = useCallback(() => {
    if (domain && feed) {
      feed.sort_website(domain)
    }
    setSorted((s) => !s)
  }, [setSorted, feed, domain])

  return (
    <li>
      <FeedButtonMemo
        domain={domain}
        onHeadingToggleEvent={onHeadingToggleEvent}
        onSortClick={onSortClick}
        pageCount={pages.length}
      />
      <ul className={!visible ? 'hidden' : 'visible'} aria-hidden={!visible}>
        <PageList
          pages={pages}
          onScanEvent={onScanEvent}
          sorted={sorted}
          feed={feed}
          domain={domain}
        />
      </ul>
    </li>
  )
}

const FeedItem = memo(FeedItemWrapper)

// domain list
const DomainListWrapper = ({
  websites,
  feed,
  data,
  onScanEvent,
}: DomainListProps) => (
  <ul>
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
