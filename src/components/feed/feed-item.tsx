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
        className='p-4 text-lg w-full text-left font-medium hover:opacity-70'
        onClick={onHeadingToggleEvent}
      >
        <div>
          {domain}
          <div className='text-sm font-normal'>
            {pageCount} page{pageCount === 1 ? '' : 's'}
          </div>
        </div>
      </button>
      <button
        className='p-4 text-left hover:opacity-70'
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

export const FeedItem = memo(FeedItemWrapper)
