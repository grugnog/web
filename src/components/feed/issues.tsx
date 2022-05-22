import React, { memo, FC, useMemo, useCallback } from 'react'
import { IconButton, Fade } from '@material-ui/core'
import { useStyles } from '../general/styles'
import { useWebsiteContext } from '../providers/website'
import { GrClose } from 'react-icons/gr'
import { AppManager } from '@app/managers'
import { FeedList } from './list'
import { Website } from '@app/types'

// side panel that appears fixed on the right of current issues of domain being. This returns a list of pages with a list of issues per page.
const Feed: FC = () => {
  const classes = useStyles()
  const { issueFeed, setIssueFeedContent, scanWebsite } = useWebsiteContext()
  const { data, open } = issueFeed

  const issues = useMemo(() => data ?? [], [data]) // memo issues as data source

  const closeFeed = useCallback(() => {
    setIssueFeedContent([], false)
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
    const issuesClone = [...issues]

    // replace issue feed section with new value
    if (webPage) {
      const { url, issuesInfo } = webPage

      // the current item in the feed
      const pageIndex = issuesClone.findIndex(
        (source) => source.pageUrl === url
      )
      const page = issuesClone[pageIndex]
      const pageIssues = page?.issues || []

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

      // // TODO: find what issues do not exist in each array and remove
      // if (!issue || newIssuesCount === 0) {
      //   // issuesClone.splice(issueIndex, 1)
      // } else if (issue && Array.isArray(issue)) {
      //   page.issues = issue as any
      // }
    }

    setIssueFeedContent(issuesClone, true)
  }

  return (
    <Fade in={issues.length && open ? true : false}>
      <div className={`${classes.root} shadow`}>
        <div
          className={`flex place-items-center px-3 py-1 border border-t-0 border-r-0 border-l-0 bg-gray-200`}
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
          {issues.map((issue, index) => {
            return (
              <FeedList
                key={issue.pageUrl}
                onScanEvent={onScanEvent}
                issue={issue}
                isHidden={!!index}
              />
            )
          })}
        </ul>
      </div>
    </Fade>
  )
}

export const IssueFeed = memo(Feed)
