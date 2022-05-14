import { Issue } from '@app/types'
import React, { memo } from 'react'
import { FeedIssue } from '../../feed/issue'
import { RenderIssue } from './issues'

interface IssuesList {
  pageIssues?: Issue[]
  item: any
  error?: boolean
  [x: string]: any
}

// issues on the page - used for modals
export function RenderIssuesListComponent({
  pageIssues = [],
  item,
  ...props
}: IssuesList) {
  if (props?.error) {
    return <RenderIssue {...item} {...props} />
  }

  if (pageIssues && Array.isArray(pageIssues)) {
    return (
      <>
        {pageIssues?.map((pages: any, i: number) => {
          return (
            <RenderIssue
              {...pages}
              {...props}
              key={`${i} ${props?.listIndex}`}
            />
          )
        })}
      </>
    )
  }

  return null
}

export function FeedIssuesListComponent({
  pageIssues = [],
  item,
  ...props
}: IssuesList) {
  return <FeedIssue {...props} {...item} />
}

// dynamic issues list component handling all edges
export const RenderIssuesList = memo(RenderIssuesListComponent)
// feed issue list component - side panel on the right
export const FeedIssuesList = memo(FeedIssuesListComponent)
