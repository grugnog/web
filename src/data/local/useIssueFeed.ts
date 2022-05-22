import { IssueData } from '@app/types'
import { useCallback, useState } from 'react'

const defaultState = {
  data: [],
  open: false,
}

export function useIssueFeed() {
  const [data, setIssueFeed] = useState<{ open: boolean; data: IssueData[] }>(
    defaultState
  )

  const setIssueFeedContent = useCallback(
    (newIssues?: IssueData[], open: boolean = true) => {
      setIssueFeed({
        open,
        data: newIssues && newIssues?.length ? newIssues : [],
      })
    },
    [setIssueFeed]
  )

  return {
    issueFeed: data ?? defaultState,
    setIssueFeedContent,
  }
}
