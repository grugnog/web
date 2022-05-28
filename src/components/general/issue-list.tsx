import React, { memo } from 'react'
import { List } from '@material-ui/core'
import { useStyles } from './styles'
import { RenderIssuesList } from './cells/render/issues-list'
import { issueExtractor } from '@app/utils'

export function IssueListComponent({ website, className = '' }: any) {
  const classes = useStyles()
  const CTA_LIST_ID = 'cta-issue-list'
  const issue = issueExtractor(website) ?? []

  if (!issue?.length) {
    return <p className={'py-2 text-2xl'}>No issues found. Great work</p>
  }

  return (
    <List
      className={`${classes.searchList} ${className ?? ''}`}
      id={CTA_LIST_ID}
    >
      {issue.map((item: any, listIndex: number) => (
        <RenderIssuesList
          pageIssues={issue}
          url={website?.pageUrl}
          key={`${listIndex} ${item?.selector} ${item?.code}`}
        />
      ))}
    </List>
  )
}

export const IssueList = memo(IssueListComponent)
