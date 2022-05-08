import React, { memo, FC, useMemo, useCallback } from 'react'
import { IconButton, Fade } from '@material-ui/core'
import { useStyles } from '../general/styles'
import { useWebsiteContext } from '../providers/website'
import { GrClose } from 'react-icons/gr'
import { AppManager } from '@app/managers'
import { FeedCell } from './cell'

const Feed: FC = () => {
  const classes = useStyles()
  const { issueFeed, setIssueFeedContent, scanWebsite } = useWebsiteContext()
  const { data, open } = issueFeed

  const issues = useMemo(() => data ?? [], [data])

  const closeFeed = useCallback(() => {
    setIssueFeedContent([], false)
  }, [setIssueFeedContent])

  const onScanEvent = async (target: string) => {
    try {
      const data = await scanWebsite({ variables: { url: target } })

      // replace issue feed section with new value
      if (data) {
        // clone array to prevent mutation
        const issuesClone = [...issues]
        // new issue for page
        const issueIndex = issuesClone.findIndex(
          (source) => source.pageUrl === data?.url
        )

        // current issue
        const issueItem = issues[issueIndex]
        const pageIssues = issuesClone[issueIndex]?.issues
        const pageIssuesCount = pageIssues?.length
        // new issue
        const newIssue = data?.issue
        const newIssuesCount = newIssue?.length

        if (issueItem) {
          const issueMessage =
            newIssuesCount > pageIssuesCount ? 'more' : 'less'

          const issueDif = pageIssuesCount - newIssuesCount

          AppManager.toggleSnack(
            true,
            pageIssuesCount !== newIssuesCount
              ? `${issueDif} ${issueMessage} issue${
                  issueDif === 1 ? '' : 's'
                } found`
              : 'No new issues found',
            'message'
          )

          // no issues found. remove from array
          if (!newIssue || newIssuesCount === 0) {
            issuesClone.splice(issueIndex, 1)
          } else {
            issuesClone[issueIndex].issues = data.issue
          }
        } else {
          issuesClone.push({
            pageUrl: data.url,
            domain: data.domain,
            issues: data.issue,
          })
        }

        setIssueFeedContent(issuesClone, true)
      }
    } catch (e) {
      console.error(e)
    }
  }

  if (issues.length && open) {
    return (
      <Fade in>
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
          {issues.map((issue, issueIndex: number) => {
            return (
              <FeedCell
                key={issueIndex}
                issueIndex={issueIndex}
                onScanEvent={onScanEvent}
                issue={issue}
              />
            )
          })}
        </div>
      </Fade>
    )
  }
  return null
}

export const IssueFeed = memo(Feed)
