import React, { memo, useState, FC } from 'react'
import { IconButton } from '@material-ui/core'
import { IssueFeedCell } from '../general/cells'

import { GrHide, GrSync, GrView } from 'react-icons/gr'
import { IssueTitle } from './title'
import type { IssueData } from '@app/data/local/useIssueFeed'
import { issueExtractor } from '@app/utils'

interface FeedCellComponent {
  issueIndex?: number
  onScanEvent: (u: string) => Promise<void>
  issue: IssueData
}

const FeedCellComponent: FC<FeedCellComponent> = ({
  issueIndex,
  onScanEvent,
  issue,
}) => {
  const [sectionHidden, onToggleSection] = useState<boolean>(false)

  const onScan = async () => {
    try {
      await onScanEvent(issue.pageUrl)
    } catch (e) {
      console.error(e)
    }
  }

  const pageIssues = issueExtractor(issue) // array of issues force

  return (
    <div>
      <div className='flex px-2 place-items-center py-1 border border-x-0 border-t-0 h-15'>
        <IssueTitle pageUrl={issue.pageUrl} domain={issue?.domain} />
        <IconButton onClick={() => onToggleSection((v) => !v)}>
          {sectionHidden ? (
            <GrView title={`Toggle items visible for ${issue.pageUrl}`} />
          ) : (
            <GrHide title={`Toggle items hidden for ${issue.pageUrl}`} />
          )}
        </IconButton>
        <IconButton onClick={onScan}>
          <GrSync title={`Re scan ${issue.pageUrl} and sync`} />
        </IconButton>
      </div>
      <ul
        className={`overflow-x-hidden${sectionHidden ? ' hidden' : ' visible'}`}
      >
        {pageIssues?.map((item: any, i: number) => {
          return (
            <IssueFeedCell
              key={`${i} ${issueIndex}`}
              item={item}
              hideSelector
            />
          )
        })}
      </ul>
    </div>
  )
}

export const FeedCell = memo(FeedCellComponent)
