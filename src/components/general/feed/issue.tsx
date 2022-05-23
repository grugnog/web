import React, { memo } from 'react'
import { getErrorColor } from '@app/lib/base-colors'
import { Issue } from '@app/types'

type CellIssue = Partial<Issue> & {
  hideSelector?: boolean
}

export function FeedIssueCardComponent({
  message,
  code,
  context,
  type: issueType = 'notice',
  selector,
  hideSelector,
  recurrence
}: CellIssue) {
  return (
    <div className='p-3'>
      <div className='flex space-x-2 items-center pb-1'>
        <div
          className={`${getErrorColor(issueType + '')} w-3 h-3 rounded-full`}
        />
        <p className={'truncate text-sm font-light'}>{code}</p>
        {recurrence ? <div className='px-2 bg-gray-200 rounded'><p className={'truncate text-sm font-bold'}>Recurrence: {recurrence}</p></div> : null}
      </div>
      <p className={'text-lg'}>{message}</p>
      {hideSelector ? null : (
        <p className='pb-1 text-gray-600 line-clamp-2'>{selector}</p>
      )}
      <pre
        className={`overflow-x-auto p-2 block text-white`}
        style={{ tabSize: 4, backgroundColor: 'rgb(43, 43, 43)' }}
      >
        {context + ''}
      </pre>
    </div>
  )
}

export const FeedIssueCard = memo(FeedIssueCardComponent)

export function FeedIssueComponent({
  message,
  code,
  context,
  type: issueType = 'notice',
  selector,
  hideSelector,
  recurrence
}: CellIssue) {
  return (
    <li className='border border-t-0 border-r-0 border-l-0'>
      <FeedIssueCard
        selector={selector}
        type={issueType}
        context={context}
        code={code}
        message={message}
        hideSelector={hideSelector}
        recurrence={recurrence}
      />
    </li>
  )
}

export const FeedIssue = memo(FeedIssueComponent)
