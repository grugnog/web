import React, { memo } from 'react'
import { RenderIssue } from './issues'

export function RenderIssuesListComponent({
  pageIssues = [],
  item,
  ...props
}: any) {
  return props?.error ? (
    <RenderIssue {...item} {...props} />
  ) : (
    pageIssues.map((pages: any, i: number) => {
      return (
        <RenderIssue {...pages} {...props} key={`${i} ${pages?.selector}`} />
      )
    })
  )
}

export const RenderIssuesList = memo(RenderIssuesListComponent)
