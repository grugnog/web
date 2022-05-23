import React, { memo } from 'react'
import { getErrorColor } from '@app/lib/base-colors'
import { Issue } from '@app/types'

type CellIssue = Partial<Issue> & {
  hideSelector?: boolean
  hidden?: boolean //the entire section is hidden
}

export function FeedIssueCardComponent({
  message,
  code,
  context,
  type: issueType = 'notice',
  selector,
  hideSelector,
  recurrence,
}: CellIssue) {
  return (
    <div className='px-3 py-2 flex flex-col space-y-1 place-content-between h-[inherit]'>
      <div>
        <div className='flex space-x-2 items-center pb-1'>
          <div
            className={`${getErrorColor(issueType + '')} w-3 h-3 rounded-full`}
          />
          <p className={'truncate text-sm font-bold'}>{code}</p>

          {recurrence ? (
            <div className='px-2 bg-gray-200 rounded'>
              <p className={'truncate text-sm font-bold'}>
                Recurrence: {recurrence}
              </p>
            </div>
          ) : null}
        </div>
        {!hideSelector ? (
          <p className='pb-1 text-gray-600 text-sm line-clamp-2'>{selector}</p>
        ) : null}
      </div>
      <p className={'text-base line-clamp-5 py-1'}>{message}</p>
      <pre
        className={`border text-black h-10 rounded overflow-x-hidden overflow-y-hidden hover:overflow-x-auto hover:overflow-y-auto p-2`}
        style={{ tabSize: 4, backgroundColor: 'rgba(187,239,253,0.25)' }}
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
  recurrence,
  hidden,
}: CellIssue) {
  return (
    <li
      className={`${
        !hidden ? 'visible' : 'hidden'
      } border border-t-0 border-r-0 border-l-0 h-[inherit]`}
    >
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
