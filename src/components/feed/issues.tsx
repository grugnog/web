import React, { memo, FC, useState } from 'react'
import { IconButton, Fade } from '@material-ui/core'
import { useStyles } from '../general/styles'
import { useWebsiteContext } from '../providers/website'
import { GrClose } from 'react-icons/gr'
import { AppManager } from '@app/managers'
import { FeedList } from './list'
import { Website } from '@app/types'
import { useMemo } from 'react'
import { useWasmContext } from '../providers'

const FeedItemWrapper = ({ website, onScanEvent, index, domain }: any) => {
  const [visible, setVisible] = useState<boolean>(index === 0)
  const pages = Object.keys(website)

  const onHeadingToggleEvent = () => {
    setVisible((v) => !v)
  }

  return (
    <li>
      <button
        className='p-4 border-b font-bold text-xl w-full text-left hover:bg-gray-200'
        onClick={onHeadingToggleEvent}
      >
        {domain}
      </button>
      <ul className={!visible ? 'hidden' : 'visible'} aria-hidden={!visible}>
        {pages?.map((d: any) => {
          const issue = website[d] as any

          return (
            <FeedList
              key={issue?.pageUrl}
              onScanEvent={onScanEvent}
              issue={issue}
              isHidden={!visible}
            />
          )
        })}
      </ul>
    </li>
  )
}

const FeedItem = memo(FeedItemWrapper)

// side panel that appears fixed on the right of current issues of domain being. This returns a list of pages with a list of issues per page.
const Feed: FC = () => {
  const classes = useStyles()
  const { issueFeed, setIssueFeedContent, scanWebsite } = useWebsiteContext()
  const { data, open } = issueFeed
  const { feed } = useWasmContext()

  const issues = useMemo(() => {
    return Object.keys(data)
  }, [data])

  const closeFeed = () => {
    setIssueFeedContent(false)
  }

  const onScanEvent = async (target: string) => {
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
        const issueMessage = newIssuesCount > pageIssuesCount ? 'more' : 'less'
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
  }

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
          {issues?.map((domain, index) => {
            const website = data[domain]

            return (
              <FeedItem
                key={domain}
                domain={domain}
                index={index}
                onScanEvent={onScanEvent}
                website={website}
              />
            )
          })}
        </ul>
      </div>
    </Fade>
  )
}

export const IssueFeed = memo(Feed)
