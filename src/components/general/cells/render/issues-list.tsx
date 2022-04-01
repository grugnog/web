import { Issue } from '@app/types'
import React, { memo } from 'react'
import { FeedIssue } from '../../feed/issue'
import { RenderIssue } from './issues'

interface IssuesList {
  pageIssues?: Issue[]
  item: any
  [x: string]: any
  error?: boolean
}

export function RenderIssuesListComponent({
  pageIssues = [],
  item,
  ...props
}: IssuesList) {
  return (
    <>
      {props?.error ? (
        <RenderIssue {...item} {...props} />
      ) : (
        pageIssues.map((pages: any, i: number) => {
          return (
            <RenderIssue
              {...pages}
              {...props}
              key={`${i} ${props?.listIndex}`}
            />
          )
        })
      )}
    </>
  )
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
// feed issue list component
export const FeedIssuesList = memo(FeedIssuesListComponent)
