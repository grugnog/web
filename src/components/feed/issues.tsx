import React, { memo, FC, useMemo } from 'react'
import { Typography, IconButton, Fade } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'
import { useStyles } from '../general/styles'
import { IssueFeedCell } from '../general/cells'
import { useWebsiteContext } from '../providers/website'
import { Link } from '../general'

const IssueRow = ({ index, style, item, url }: any) => (
  <div style={style} key={`${item?.selector} ${item?.code} ${index}`}>
    <IssueFeedCell
      issuesModal
      error
      item={item}
      listIndex={index}
      url={url}
      listTitleMax
    />
  </div>
)

const IssueMemo = memo(IssueRow)

const Feed: FC = () => {
  const classes = useStyles()
  const { issueFeed, setIssueFeedContent } = useWebsiteContext()

  const data = useMemo(() => {
    return issueFeed?.data ?? []
  }, [issueFeed])

  if (data?.length && issueFeed?.open) {
    return (
      <Fade in>
        <div className={classes.root}>
          <div className={`${classes.row} ${classes.titleContainer}`}>
            <Typography
              variant='h6'
              component='p'
              className={`${classes.title} font-semibold`}
            >
              Recent Issues
            </Typography>
            <IconButton
              edge='start'
              color='inherit'
              onClick={() => {
                setIssueFeedContent([], false)
              }}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
          </div>
          {data.map((issue, issueIndex: number) => {
            const issues = issue?.issues ?? []

            return (
              <div key={`${issueIndex} ${issue?.pageUrl} ${issue?.domain}`}>
                <div className='px-3 py-2 border border-x-0 border-t-0'>
                  <Link
                    title={`view in sandbox ${issue.pageUrl}`}
                    href={`/website-details?websiteUrl=${encodeURIComponent(
                      issue.pageUrl
                    )}`}
                    className={'text-lg'}
                    style={{ color: '#707070', fontWeight: 'bold' }}
                  >
                    {issue.pageUrl}
                  </Link>
                </div>
                <div className={classes.list}>
                  <IssueMemo
                    index={issueIndex}
                    url={issue.pageUrl}
                    item={issues[issueIndex]}
                  />
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
