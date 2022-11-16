import {
  memo,
  FC,
  useDeferredValue,
  useState,
  useCallback,
  useMemo,
} from 'react'
import { useWebsiteContext } from '../providers/website'
import { GrClose, GrExpand } from 'react-icons/gr'
import { AppManager } from '@app/managers'
import { useWasmContext } from '../providers'
import type { IssueData, Website } from '@app/types'
import type { Feed } from 'a11ywatch-web-wasm'
import { FilterDropdown } from './filters'
import { LiveFeedList } from './live-feed'

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

const PageList = memo(PageListWrapper)

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

const Top = ({ onClick, open }: { onClick(x: any): any; open: boolean }) => {
  const closeFeed = () => onClick(!open)

  return (
    <div className={`flex place-items-center px-3 py-1 h-14 text-side gap-x-2`}>
      <p className={`flex-1 text-lg font-semibold`}>Recent</p>
      <FilterDropdown open={open} />
      <button
        onClick={closeFeed}
        aria-label='close'
        title='close issue feed'
        className='visible lg:hidden p-3 hover:bg-gray-200 rounded-2xl'
        type={'button'}
      >
        {!open ? <GrExpand /> : <GrClose />}
      </button>
    </div>
  )
}

// re-render on state change for toggling click event
const TopSection = memo(Top, (x, y) => x.open === y.open)

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
  const { feedOpen, setIssueFeedContent, scanWebsite } = useWebsiteContext()
  const websites = useDeferredValue(feed?.get_data_keys() ?? [])

  const onScanEvent = useCallback(
    async (target: string) => {
      let webPage: Website | null = null

      try {
        webPage = await scanWebsite({ variables: { url: target } })
      } catch (e) {
        console.error(e)
      }

      // replace issue feed section with new value
      if (webPage && feed) {
        // the current item in the feed
        const page = feed.get_page(webPage.domain, target)

        if (page) {
          // old issues
          const pageIssuesCount = page?.issues?.length || 0
          // new issues
          const newIssuesCount =
            webPage?.issue?.length ?? webPage?.issuesInfo?.totalIssues ?? 0

          let message = 'No new issues found'

          // issue count updated
          if (pageIssuesCount !== newIssuesCount) {
            const issueDif = newIssuesCount - pageIssuesCount
            const issueMessage =
              newIssuesCount > pageIssuesCount ? 'more' : 'less'
            message = `${issueDif} ${issueMessage} issue${
              issueDif === 1 ? '' : 's'
            } found`
          }

          AppManager.toggleSnack(true, message, 'message')
        }
      }
    },
    [feed, scanWebsite]
  )

  const { mainStyle, topStyles } = useMemo(() => {
    const mobileStyles = feedOpen
      ? `h-full w-full z-20 overflow-y-auto`
      : 'pl-[15vw] max-h-[60px] bottom-0 rounded w-full lg:max-h-full lg:overflow-y-auto lg:rounded-none lg:h-full lg:bottom-0 lg:top-0 lg:pl-0 lg:z-20'

    const mainStyle = `${
      feedOpen ? 'z-20 ' : ''
    }border-t md:border-t-0 text-side fixed lg:min-w-[24vw] lg:relative`

    const topStyles = `fixed bottom-0 bg-lightgray lg:border-l lg:w-[24vw] ${mobileStyles}`

    return {
      mainStyle,
      topStyles,
    }
  }, [feedOpen])

  return (
    <>
      {feedOpen ? <style>{`body { overflow: hidden; }`}</style> : null}
      <div className={mainStyle} aria-live='polite'>
        <div className={topStyles} id='live-feed'>
          <TopSection onClick={setIssueFeedContent} open={feedOpen} />
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
