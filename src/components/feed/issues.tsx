import React, { memo, FC, useMemo, useCallback } from 'react'
import { IconButton, Fade } from '@material-ui/core'
import { useStyles } from '../general/styles'
import { IssueFeedCell } from '../general/cells'
import { useWebsiteContext } from '../providers/website'
import { Link } from '../general'
import { GrClose } from 'react-icons/gr'

// REFACTOR COMPONENT
const IssueRow = ({ index, item, url }: any) => (
  <IssueFeedCell
    issuesModal
    error
    item={item}
    listIndex={index}
    url={url}
    listTitleMax
  />
)

const IssueMemo = memo(IssueRow)

function IssueTitleComponent({ pageUrl }: { pageUrl: string }) {
  return (
    <div className='px-3 py-2 border border-x-0 border-t-0'>
      <Link
        title={`view in sandbox ${pageUrl}`}
        href={`/website-details?websiteUrl=${encodeURIComponent(pageUrl)}`}
        className={'text-lg'}
        style={{ color: '#707070', fontWeight: 'bold' }}
      >
        {pageUrl}
      </Link>
    </div>
  )
}

const IssueTitle = memo(IssueTitleComponent)

const Feed: FC = () => {
  const classes = useStyles()
  const { issueFeed, setIssueFeedContent } = useWebsiteContext()
  const { data, open } = issueFeed

  const issues = useMemo(() => data ?? [], [data])

  const closeFeed = useCallback(() => {
    setIssueFeedContent([], false)
  }, [setIssueFeedContent])

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
            const pageIssues = issue?.issues

            return (
              <div key={issueIndex}>
                <IssueTitle pageUrl={issue.pageUrl} />
                <div className={classes.list}>
                  {pageIssues?.map((item, i) => {
                    return (
                      <IssueMemo
                        key={i}
                        index={issueIndex}
                        url={issue.pageUrl}
                        item={item}
                      />
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </Fade>
    )
  }
  return null
}

export const IssueFeed = memo(Feed)
