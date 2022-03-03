import React, { Fragment, memo } from 'react'
import { List, Button, Typography } from '@material-ui/core'
import { printElement } from '@app/utils'
import { useStyles } from './styles'
import { RenderIssuesList } from './cells'
import { getAPIRoute } from '@app/configs'

// TODO: REMOVE AND SPLIT COMPONENT
const getIssue = (website: any) => {
  let issue
  if (website?.issue) {
    issue = website.issue
  } else if (
    Array.isArray(website?.issues) &&
    website?.issues?.length &&
    website?.issues[0]?.issues
  ) {
    issue = website?.issues[0]?.issues
  } else {
    issue = website?.issues
  }
  return issue
}

export function IssueListComponent({
  printable,
  website,
  className = '',
}: any) {
  const classes = useStyles()
  const CTA_LIST_ID = 'cta-issue-list'
  const issue = getIssue(website) ?? []

  if (!issue?.length) {
    return (
      <Typography variant='h5' component='p' className={classes.subTitle}>
        No issues found. Great work
      </Typography>
    )
  }

  return (
    <Fragment>
      {printable ? (
        <div style={{ marginBottom: 14, marginTop: 14 }}>
          <Button
            className={classes.print}
            style={{ marginRight: 5 }}
            onClick={() => printElement(CTA_LIST_ID, website)}
          >
            Print
          </Button>
          <Button
            className={classes.print}
            component={'a'}
            href={`${getAPIRoute()}/get-website?q=${
              website?.url
            }&download=true`}
          >
            Download
          </Button>
        </div>
      ) : null}
      <List
        className={`${classes.searchList} ${className ?? ''}`}
        id={CTA_LIST_ID}
      >
        {issue.map((item: any, listIndex: number) => (
          <RenderIssuesList
            item={item}
            url={issue?.pageUrl}
            listIndex={listIndex}
            error
            key={`${listIndex} ${item?.selector} ${item?.code}`}
          />
        ))}
      </List>
    </Fragment>
  )
}

export const IssueList = memo(IssueListComponent)
