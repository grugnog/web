import React from 'react'
import { issueSort } from '@app/lib'
import { RenderIssue } from './issues'

export function RenderIssuesList({ pageIssues = [], item, ...props }: any) {
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
