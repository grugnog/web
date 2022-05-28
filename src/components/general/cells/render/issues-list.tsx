import { Issue } from '@app/types'
import React, { memo } from 'react'
import { FeedIssue } from '../../feed/issue'

interface IssuesList {
  pageIssues?: Issue[]
  error?: boolean
  [x: string]: any
}

// issues on the page - used for modals
export function RenderIssuesListComponent({
  pageIssues = [],
  ...props
}: IssuesList) {
  const { error, ...extra } = props

  // if error display cell cell. TODO: remove
  if (props?.error) {
    return <FeedIssue {...extra} />
  }

  if (pageIssues && Array.isArray(pageIssues)) {
    return (
      <>
        {pageIssues?.map((pages: any, i: number) => {
          return (
            <FeedIssue {...pages} {...extra} key={`${i} ${props?.listIndex}`} />
          )
        })}
      </>
    )
  }

  return null
}

// dynamic issues list component handling all edges
export const RenderIssuesList = memo(RenderIssuesListComponent)
