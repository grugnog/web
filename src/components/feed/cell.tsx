import React, { memo, useState, FC } from 'react'
import { IconButton } from '@material-ui/core'
import { IssueFeedCell } from '../general/cells'

import { GrHide, GrSync, GrView } from 'react-icons/gr'
import { IssueTitle } from './title'
import type { IssueData } from '@app/data/local/useIssueFeed'

interface FeedCellComponent {
  issueIndex?: number
  onScanEvent: any
  issue: IssueData
}

const FeedCellComponent: FC<FeedCellComponent> = ({
  issueIndex,
  onScanEvent,
  issue,
}) => {
  const [sectionHidden, onToggleSection] = useState<boolean>(false)
  const pageIssues = issue?.issues

  return (
    <div>
      <div className='flex px-2 place-items-center py-1 border border-x-0 border-t-0 h-15'>
        <IssueTitle pageUrl={issue.pageUrl} />
        <IconButton onClick={() => onToggleSection((v) => !v)}>
          {sectionHidden ? (
            <GrView title={`Toggle items visible for ${issue.pageUrl}`} />
          ) : (
            <GrHide title={`Toggle items hidden for ${issue.pageUrl}`} />
          )}
        </IconButton>
        <IconButton onClick={async () => await onScanEvent(issue.pageUrl)}>
          <GrSync title={`Re scan ${issue.pageUrl} and sync`} />
        </IconButton>
      </div>
      <div
        className={`overflow-x-hidden${sectionHidden ? ' hidden' : 'visible'}`}
      >
        {pageIssues?.map((item: any, i: number) => {
          return (
            <IssueFeedCell
              key={i}
              issuesModal
              item={item}
              listIndex={issueIndex}
              url={issue.pageUrl}
            />
          )
        })}
      </div>
    </div>
  )
}

export const FeedCell = memo(FeedCellComponent)
