import {
  memo,
  FC,
  useDeferredValue,
  useState,
  useCallback,
  useMemo,
} from 'react'
import { useWebsiteContext } from '../providers/website'
import { useWasmContext } from '../providers'
import type { IssueData, Website } from '@app/types'
import type { Feed } from 'a11ywatch-web-wasm'
import { TopSection } from './top'
import { PageList } from './page-list'
import { alertIssueDifference } from '@app/utils/alerts'

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

const FeedButton = ({ domain, onHeadingToggleEvent, onSortClick }: any) => {
  return (
    <div className='flex'>
      <button
        className='p-4 text-lg w-full text-left font-medium hover:bg-gray-200'
        onClick={onHeadingToggleEvent}
      >
        {domain}
      </button>
      <button className='p-4 text-left hover:bg-gray-200' onClick={onSortClick}>
        Sort
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

const DomainList = memo(DomainListWrapper)

// side panel that appears fixed on the right of current issues of domain being. This returns a list of pages with a list of issues per page.
const LiveFeed: FC = () => {
  const { feed } = useWasmContext()
  const { feedOpen, setIssueFeedContent, singlePageScan, forceUpdate } =
    useWebsiteContext()
  const websites = useDeferredValue(feed?.get_data_keys() ?? [])

  const onScanEvent = useCallback(
    async (target: string) => {
      let webPage: Website | null = null
      const domain = new URL(target).hostname
      // the current item in the feed - wasm binds domain updates after
      const page = feed?.get_page(domain, target)

      try {
        webPage = await singlePageScan({ variables: { url: target } })
      } catch (e) {
        console.error(e)
      }

      // replace issue feed section with new value
      if (webPage && page) {
        alertIssueDifference({
          lastCount: page?.issues?.length || 0,
          nextCount: webPage?.issue?.length || 0,
        })
      }
    },
    [feed, singlePageScan]
  )

  const { mainStyle, topStyles } = useMemo(() => {
    const mobileStyles = feedOpen
      ? `h-full w-full z-20 overflow-y-auto`
      : 'pl-[15vw] max-h-[60px] bottom-0 rounded w-full lg:max-h-full lg:overflow-y-auto lg:rounded-none lg:h-full lg:bottom-0 lg:top-0 lg:pl-0 lg:z-20'

    const mainStyle = `${
      feedOpen ? 'z-20 ' : ''
    }border-t md:border-t-0 text-side fixed lg:min-w-[24vw] lg:relative`

    const topStyles = `fixed bottom-0 bg-lightgray gap-x-4 lg:border-l lg:w-[24vw] ${mobileStyles}`

    return {
      mainStyle,
      topStyles,
    }
  }, [feedOpen])

  const clearData = useCallback(() => {
    feed?.clear_data()
    forceUpdate()
  }, [feed, forceUpdate])

  return (
    <>
      {feedOpen ? <style>{`body { overflow: hidden; }`}</style> : null}
      <div className={mainStyle} aria-live='polite'>
        <div className={topStyles} id='live-feed'>
          <TopSection
            onClick={setIssueFeedContent}
            open={feedOpen}
            clearFeed={clearData}
            feedExist={websites.length}
          />
          <DomainList
            websites={websites}
            onScanEvent={onScanEvent}
            feed={feed}
          />
        </div>
      </div>
    </>
  )
}

// authed application feed
export const IssueFeed = memo(LiveFeed)
