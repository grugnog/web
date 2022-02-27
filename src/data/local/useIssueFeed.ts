import { useCallback, useState } from 'react'

const defaultState = {
  data: [],
  open: false,
}

export interface IssueData {
  pageUrl: string
  domain: string
  issues: {
    context: string
    message: string
    type: string
    selector: string
    code: string
  }
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
