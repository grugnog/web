import {
  memo,
  FC,
  useDeferredValue,
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from 'react'
import { useWebsiteContext } from '../providers/website'
import { GrClose, GrExpand } from 'react-icons/gr'
import { AppManager } from '@app/managers'
import { FeedList } from './list'
import { useWasmContext } from '../providers'
import type { IssueData, Website } from '@app/types'

const PageList = ({
  pages,
  onScanEvent,
}: Partial<FeedItemProps> & {
  pages: any[]
}) => {
  return (
    <>
      {pages?.map((website: any) => (
        <FeedList
          key={website.pageUrl}
          issue={website}
          highlightErrors
          onScanEvent={onScanEvent}
          isHidden
        />
      ))}
    </>
  )
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

type FeedItemProps = {
  feed?: Map<string, Map<string, IssueData>>
  domain?: string
  onScanEvent?: any
  index?: number
  highlightErrors?: boolean
}

const FeedItemWrapper = ({
  feed,
  onScanEvent,
  index,
  domain,
}: FeedItemProps) => {
  // keep tracking of the pages in order
  const refPages = useRef<IssueData[]>([])
  const refMap = useRef<Set<string>>(new Set())

  const [visible, setVisible] = useState<boolean>(index === 0)
  const [_sorted, setSorted] = useState<boolean>(false)

  const pages = useDeferredValue(refPages?.current ?? [])

  const website = useMemo(() => {
    if (domain && feed instanceof Map) {
      return feed.get(domain)
    }
  }, [feed, domain])

  // todo: remove effect
  useEffect(() => {
    if (website) {
      const items = website.values()

      for (const item of items) {
        if (!refMap.current.has(item.pageUrl)) {
          refMap.current.add(item.pageUrl)
          refPages.current.push(item)
        }
      }
    }
  }, [website])

  const onHeadingToggleEvent = useCallback(
    () => setVisible((v) => !v),
    [setVisible]
  )

  const onSortClick = useCallback(() => {
    if (refPages.current) {
      refPages.current.sort((a, b) => a.pageUrl.localeCompare(b.pageUrl))
    }
    setSorted((s) => !s)
  }, [setSorted])

  return (
    <li>
      <FeedButtonMemo
        domain={domain}
        onHeadingToggleEvent={onHeadingToggleEvent}
        onSortClick={onSortClick}
      />
      <ul className={!visible ? 'hidden' : 'visible'} aria-hidden={!visible}>
        <PageList pages={pages} onScanEvent={onScanEvent} />
      </ul>
    </li>
  )
}

const FeedItem = memo(FeedItemWrapper)

const Top = ({ onClick, open }: { onClick(x: any): any; open: boolean }) => {
  const closeFeed = () => onClick(!open)

  return (
    <div className={`flex place-items-center px-3 py-1 h-14 text-side`}>
      <p className={`flex-1 text-lg font-semibold`}>Recent Issues</p>
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

// domain list interface
interface DomainListProps {
  issues?: string[]
  feed?: Map<string, Map<string, IssueData>>
  onScanEvent?(x: any): any
}

// domain list
const DomainListWrapper = ({ issues, feed, onScanEvent }: DomainListProps) => {
  return (
    <ul>
      {issues?.map((domain, index) => (
        <FeedItem
          feed={feed}
          key={domain}
          domain={domain}
          index={index}
          onScanEvent={onScanEvent}
        />
      ))}
    </ul>
  )
}

const DomainList = memo(DomainListWrapper)

// side panel that appears fixed on the right of current issues of domain being. This returns a list of pages with a list of issues per page.
const Feed: FC = () => {
  const { feed } = useWasmContext()
  const { feedOpen, setIssueFeedContent, scanWebsite } = useWebsiteContext()
  const data = useDeferredValue(feed.get_data())

  const issues = useMemo(() => {
    if (data instanceof Map) {
      const keys = data.keys()
      if (keys) {
        return [...keys]
      }
      return []
    }
    return data ? Object.keys(data) : []
  }, [data])

  const onScanEvent = useCallback(
    async (target: string) => {
      let webPage: Website | null = null

      try {
        webPage = await scanWebsite({ variables: { url: target } })
      } catch (e) {
        console.error(e)
      }

      // replace issue feed section with new value
      if (webPage) {
        // the current item in the feed
        const page = feed?.get_website({
          domain: webPage?.domain,
          pageUrl: target,
        })

        if (page) {
          // old issues
          const pageIssuesCount = page?.issues?.length || 0
          // new issues
          const newIssuesCount = webPage?.issuesInfo?.totalIssues || 0

          let message = 'No new issues found'

          // issue count updated
          if (pageIssuesCount !== newIssuesCount) {
            const issueDif = pageIssuesCount - newIssuesCount
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
      : 'pl-[15vw] max-h-[60px] overflow-hidden bottom-0 rounded w-full lg:max-h-full lg:overflow-y-auto lg:rounded-none lg:h-full lg:bottom-0 lg:top-0 lg:pl-0 lg:z-20'

    const mainStyle = `${
      feedOpen ? 'z-20' : ''
    } border-t md:border-t-0 text-side fixed lg:min-w-[24vw] lg:relative`

    const topStyles = `fixed bottom-0 bg-lightgray lg:border-l lg:w-[24vw] ${mobileStyles}`

    return {
      mobileStyles,
      mainStyle,
      topStyles,
    }
  }, [feedOpen])

  return (
    <>
      {feedOpen ? <style>{`body { overflow: hidden; }`}</style> : null}
      <div className={mainStyle} aria-live='polite'>
        <div className={topStyles}>
          <TopSection onClick={setIssueFeedContent} open={feedOpen} />
          <DomainList feed={data} issues={issues} onScanEvent={onScanEvent} />
        </div>
      </div>
    </>
  )
}

export const IssueFeed = memo(Feed)
