import React, { memo } from 'react'
import { List } from '@material-ui/core'
import { useStyles } from './styles'
import { RenderIssuesList } from './cells/render/issues-list'
import { issueExtractor } from '@app/utils'

export function IssueListComponent({ website, className = '' }: any) {
  const classes = useStyles()
  const issues = issueExtractor(website)

  if (!issues?.length) {
    return <p className={'py-2 text-2xl'}>No issues found. Great work</p>
  }

  return (
    <List
      className={`${classes.searchList} ${className ?? ''}`}
      id={'cta-issue-list'}
    >
      {issues.map((item: any) => (
        <RenderIssuesList
          pageIssues={issues}
          url={website?.pageUrl}
          key={`${item?.selector}_${item?.code}`}
        />
      ))}
    </List>
  )
}

export const IssueList = memo(IssueListComponent)
