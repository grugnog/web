import React, { memo, FC } from 'react'
import { Typography, IconButton, Fade } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'
import { useStyles } from '../general/styles'
import { WebsitePrimaryCell } from '../general/cells'
import { useWebsiteContext } from '../providers/website'

const IssueRow = ({ index, style, item, url }: any) => (
  <div style={style} key={`${item?.selector} ${item?.code} ${index}`}>
    <WebsitePrimaryCell
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

  if (issueFeed?.data?.length && issueFeed?.open) {
    return (
      <Fade in>
        <div className={classes.root}>
          <div className={`${classes.row} ${classes.titleContainer}`}>
            <Typography variant='h6' component='p' className={classes.title}>
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

          {issueFeed?.data?.map((issue: any, issueIndex: number) => {
            const issues = issue?.issues

            return (
              <div key={`${issueIndex} ${issue?.pageUrl} ${issue?.domain}`}>
                <Typography
                  variant='subtitle1'
                  component='p'
                  className={classes.subTitle}
                >
                  {issue.pageUrl}
                </Typography>
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
