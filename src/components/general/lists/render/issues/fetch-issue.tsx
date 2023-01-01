import { FC, memo } from 'react'
import { useIssue } from '@app/data/external/issues/issue'
import { InnerWrapper } from '../../list-wrapper'
import { LazyIssues } from '@app/components/feed/lazy-issues'

// issues over network with lazy rendering issues
const FetchIssueWrapper: FC<{ url?: string }> = (props) => {
  const { issue, loading } = useIssue(props.url)
  const issueSource = issue?.issues ?? []

  return (
    <InnerWrapper {...props} data={issueSource?.length} loading={loading}>
      <LazyIssues issues={issueSource} />
    </InnerWrapper>
  )
}

export const FetchIssue = memo(FetchIssueWrapper)
