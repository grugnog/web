import React, { memo, FC, useCallback } from 'react'
import { IconButton, Fade } from '@material-ui/core'
import { useStyles } from '../general/styles'
import { useWebsiteContext } from '../providers/website'
import { GrClose } from 'react-icons/gr'
import { AppManager } from '@app/managers'
import { FeedList } from './list'
import { Website } from '@app/types'
import { useMemo } from 'react'

// side panel that appears fixed on the right of current issues of domain being. This returns a list of pages with a list of issues per page.
const Feed: FC = () => {
  const classes = useStyles()
  const { issueFeed, setIssueFeedContent, scanWebsite } = useWebsiteContext()

  const { data, open } = issueFeed

  const issues = useMemo(() => {
    return Object.keys(data)
  }, [data])

  const closeFeed = useCallback(() => {
    setIssueFeedContent({}, false)
  }, [setIssueFeedContent])

  const onScanEvent = async (target: string) => {
    let webPage: Partial<Website> | null = null

    try {
      webPage = await scanWebsite({ variables: { url: target } })
    } catch (e) {
      console.error(e)
      return
    }

    // clone array to prevent mutation
    const issuesClone: any = { ...data }

    // replace issue feed section with new value
    if (webPage) {
      const { url, domain, issuesInfo } = webPage
      // the current item in the feed
      const page = domain && url && issuesClone[domain][url]

      if (page) {
        // @ts-ignore
        const pageIssues = page?.issues || page?.issue || []
        // old issues
        const pageIssuesCount = pageIssues?.length ? pageIssues.length : 0
        // new issues
        const newIssuesCount = issuesInfo?.totalIssues ?? 0
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

      setIssueFeedContent(issuesClone, true)
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
          {issues?.map((v, index) => {
            // @ts-ignore
            const website = data[v] as any

            if (!website) {
              return
            }

            return (
              <li key={website._id + index}>
                <ul>
                  {Object.keys(website)?.map((d: any) => {
                    const issue = data[v][d] as any

                    return (
                      <FeedList
                        key={issue?.pageUrl}
                        onScanEvent={onScanEvent}
                        issue={issue}
                        isHidden={!!index}
                      />
                    )
                  })}
                </ul>
              </li>
            )
          })}
        </ul>
      </div>
    </Fade>
  )
}

export const IssueFeed = memo(Feed)
