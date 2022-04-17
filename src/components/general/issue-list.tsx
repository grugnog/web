import React, { memo } from 'react'
import { List } from '@material-ui/core'
import { useStyles } from './styles'
import { FeedIssuesList } from './cells/render/issues-list'

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

export function IssueListComponent({ website, className = '' }: any) {
  const classes = useStyles()
  const CTA_LIST_ID = 'cta-issue-list'
  const issue = getIssue(website) ?? []

  if (!issue?.length) {
    return <p className={'py-2 text-2xl'}>No issues found. Great work</p>
  }

  return (
    <List
      className={`${classes.searchList} ${className ?? ''}`}
      id={CTA_LIST_ID}
    >
      {issue.map((item: any, listIndex: number) => (
        <FeedIssuesList
          item={item}
          url={issue?.pageUrl}
          listIndex={listIndex}
          key={`${listIndex} ${item?.selector} ${item?.code}`}
        />
      ))}
    </List>
  )
}

export const IssueList = memo(IssueListComponent)
