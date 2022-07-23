import { memo, FC, useState, useCallback } from 'react'
import { IconButton, Fade } from '@material-ui/core'
import { useStyles } from '../general/styles'
import { useWebsiteContext } from '../providers/website'
import { GrClose } from 'react-icons/gr'
import { AppManager } from '@app/managers'
import { FeedList } from './list'
import { Website } from '@app/types'
import { useMemo } from 'react'
import { useWasmContext } from '../providers'

// per page list
const FeedListPageWrapper = ({
  website,
  pageName,
  onScanEvent,
  visible,
}: any) => {
  const issue = website[pageName]

  return (
    <FeedList
      key={issue?.pageUrl}
      onScanEvent={onScanEvent}
      issue={issue}
      isHidden={!visible}
    />
  )
}

const FeedPage = memo(FeedListPageWrapper)

const FeedItemWrapper = ({ feed, onScanEvent, index, domain }: any) => {
  const [visible, setVisible] = useState<boolean>(index === 0)
  const [sorted, setSorted] = useState<string[]>([])

  const website = feed[domain]

  const websitePages = useMemo(() => {
    return website && Object.keys(website)
  }, [website])

  // prevent sorting
  const pages = useMemo(
    () =>
      sorted?.length
        ? [...new Set([...sorted, ...websitePages])]
        : websitePages,
    [sorted, websitePages]
  )

  const onHeadingToggleEvent = () => {
    setVisible((v) => !v)
  }

  const onSortClick = () => {
    setSorted(pages.sort())
  }

  return (
    <li>
      <div className='flex space-x-2'>
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
      <ul className={!visible ? 'hidden' : 'visible'} aria-hidden={!visible}>
        {pages?.map((d: any) => (
          <FeedPage
            key={`${website?.domain}-${d}`}
            onScanEvent={onScanEvent}
            visible={visible}
            pageName={d}
            website={website}
          />
        ))}
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
      let webPage: Website

      try {
        webPage = await scanWebsite({ variables: { url: target } })
      } catch (e) {
        console.error(e)
        return
      }

      // replace issue feed section with new value
      if (webPage) {
        // the current item in the feed
        const page = feed?.get_website({
          domain: webPage?.domain,
          pageUrl: target,
        })

        if (page) {
          const pageIssues = page?.issues || []
          // old issues
          const pageIssuesCount = pageIssues?.length ? pageIssues.length : 0
          // new issues
          const newIssuesCount = webPage?.issuesInfo?.totalIssues ?? 0
          // did the issues on the page update
          const issuesUpdated = pageIssuesCount !== newIssuesCount
          const issueMessage =
            newIssuesCount > pageIssuesCount ? 'more' : 'less'
          const issueDif = pageIssuesCount - newIssuesCount

          let message = 'No new issues found'

          if (issuesUpdated) {
            message = `${issueDif} ${issueMessage} issue${
              issueDif === 1 ? '' : 's'
            } found`
          }

          AppManager.toggleSnack(true, message, 'message')
        }

        setIssueFeedContent(true)
      }
    },
    [feed]
  )

  return (
    <Fade in={issues.length && open ? true : false}>
      <div className={`${classes.root} shadow`} aria-live='polite'>
        <div
          className={`flex place-items-center px-3 py-1 border border-t-0 border-r-0 border-l-0 bg-gray-100`}
        >
          <p className={`flex-1 text-lg font-semibold`}>Recent Issues</p>
          <IconButton
            edge='start'
            color='inherit'
            onClick={closeFeed}
            aria-label='close'
          >
            <GrClose />
          </IconButton>
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
