import React, { memo } from 'react'
import { issueSort } from '@app/lib'
import { RenderIssue } from './issues'

export function RenderIssuesListComponent({
  pageIssues = [],
  item,
  ...props
}: any) {
  return props?.error ? (
    <RenderIssue {...item} {...props} />
  ) : (
    pageIssues.sort(issueSort).map((pages: any, i: number) => {
      return (
        <RenderIssue {...pages} {...props} key={`${i} ${pages?.selector}`} />
      )
    })
  )
}

export const RenderIssuesList = memo(RenderIssuesListComponent)
