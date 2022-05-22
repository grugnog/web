import React, { memo } from 'react'
import { IconButton } from '@material-ui/core'
import { GrHide, GrSync, GrView } from 'react-icons/gr'
import { IssueTitle } from './title'
import type { FeedComponentProps } from './interface'

// heading block for feed entry displaying website title that can toggle parent list.
export const FeedHeadingComponent = ({
  onToggleSection,
  onScanEvent,
  issue,
  sectionHidden,
}: FeedComponentProps & {
  onToggleSection(x: (x: boolean) => boolean): void
  sectionHidden?: boolean
}) => {
  const onScan = async () => {
    try {
      await onScanEvent(issue.pageUrl)
    } catch (e) {
      console.error(e)
    }
  }

  const onToggle = () => {
    onToggleSection((v: boolean) => !v)
  }

  return (
    <div className='flex px-2 place-items-center py-1 border border-x-0 border-t-0 h-15'>
      <IssueTitle pageUrl={issue.pageUrl} domain={issue?.domain} />
      <IconButton onClick={onToggle}>
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
  )
}

export const FeedHeading = memo(FeedHeadingComponent)
