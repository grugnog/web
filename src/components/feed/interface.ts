import { IssueData } from '@app/types'

// feed list interface for issues
export interface FeedComponentProps {
  issueIndex?: number
  onScanEvent: (url: string) => Promise<void>
  issue: IssueData
  isHidden?: boolean // determine if the section inits hidden
}
