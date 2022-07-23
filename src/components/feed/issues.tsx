import {
  memo,
  FC,
  useDeferredValue,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react'
import { Fade } from '@material-ui/core'
import { useStyles } from '../general/styles'
import { useWebsiteContext } from '../providers/website'
import { GrClose } from 'react-icons/gr'
import { AppManager } from '@app/managers'
import { FeedList } from './list'
import { Website } from '@app/types'
import { useMemo } from 'react'
import { useWasmContext } from '../providers'

// per page list
const FeedListPageWrapper = ({ website, pageName, onScanEvent }: any) => {
  const issue = website[pageName]

  return (
    <FeedList
      key={issue?.pageUrl}
      onScanEvent={onScanEvent}
      issue={issue}
      isHidden={true}
    />
  )
}

const FeedPage = memo(FeedListPageWrapper)

const PageList = ({ pages, website, onScanEvent }: any) => {
  return (
    <>
      {pages?.map((pageName: string) => (
        <FeedPage
          key={`${website?.domain}-${pageName}`}
          onScanEvent={onScanEvent}
          pageName={pageName}
          website={website}
        />
      ))}
    </>
  )
}

const FeedButton = ({ domain, onHeadingToggleEvent, onSortClick }: any) => {
  return (
    <div className='flex'>
      <button
        className='p-4 border-b font-bold text-xl w-full text-left hover:bg-gray-200'
        onClick={onHeadingToggleEvent}
      >
        {domain}
      </button>
      <button
        className='p-4 border-b font-bold text-left hover:bg-gray-200'
        onClick={onSortClick}
      >
        Sort
      </button>
    </div>
  )
}

const FeedButtonMemo = memo(FeedButton)

const FeedItemWrapper = ({ feed, onScanEvent, index, domain }: any) => {
  const website = feed[domain] // TODO: defer

  const [visible, setVisible] = useState<boolean>(index === 0)
  const [_sorted, setSorted] = useState<boolean>(false)

  // keep tracking of the pages in order
  const refPages = useRef<Record<string, string>>({})
  const pages = useDeferredValue(Object.keys(refPages.current))

  useEffect(() => {
    if (website) {
      Object.assign(refPages.current, website)
    }
  }, [website])

  const onHeadingToggleEvent = () => {
    setVisible((v) => !v)
  }

  const onSortClick = () => {
    const ordered = Object.keys(refPages.current)
      .sort()
      .reduce((obj: any, key) => {
        obj[key] = refPages.current[key]
        return obj
      }, {})
    refPages.current = ordered

    setSorted((s) => !s)
  }

  const pagesList = useMemo(
    () => (
      <PageList pages={pages} website={website} onScanEvent={onScanEvent} />
    ),
    [pages, website, onScanEvent]
  )

  return (
    <li>
      <FeedButtonMemo
        domain={domain}
        onHeadingToggleEvent={onHeadingToggleEvent}
        onSortClick={onSortClick}
      />
      <ul className={!visible ? 'hidden' : 'visible'} aria-hidden={!visible}>
        {pagesList}
      </ul>
    </li>
  )
}

const FeedItem = memo(FeedItemWrapper)

// side panel that appears fixed on the right of current issues of domain being. This returns a list of pages with a list of issues per page.
const Feed: FC = () => {
  const classes = useStyles()
  const { feed } = useWasmContext()
  const { issueFeed, setIssueFeedContent, scanWebsite } = useWebsiteContext()

  const { data, open } = issueFeed

  const issues = useMemo(() => {
    return Object.keys(data)
  }, [data])

  const closeFeed = useCallback(() => {
    setIssueFeedContent(false)
  }, [setIssueFeedContent])

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

        setIssueFeedContent(true)
      }
    },
    [feed, scanWebsite, setIssueFeedContent]
  )

  return (
    <Fade in={issues.length && open ? true : false}>
      <div className={`${classes.root} shadow`} aria-live='polite'>
        <div
          className={`flex place-items-center px-3 py-1 h-14 border border-t-0 border-r-0 border-l-0 bg-gray-100`}
        >
          <p className={`flex-1 text-lg font-semibold`}>Recent Issues</p>
          <button
            onClick={closeFeed}
            aria-label='close'
            title='close issue feed'
            className='p-3 hover:bg-gray-200 rounded-2xl'
          >
            <GrClose />
          </button>
        </div>
        <ul>
          {issues?.map((domain, index) => (
            <FeedItem
              feed={data}
              key={domain}
              domain={domain}
              index={index}
              onScanEvent={onScanEvent}
            />
          ))}
        </ul>
      </div>
    </Fade>
  )
}

export const IssueFeed = memo(Feed)
