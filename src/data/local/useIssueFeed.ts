import { useCallback, useState } from 'react'

const defaultState = {
  data: {},
  open: false,
}

export function useIssueFeed() {
  const [data, setIssueFeed] = useState<{ open: boolean; data: any }>(
    defaultState
  )

  const setIssueFeedContent = useCallback(
    (newIssues, open: boolean = true) => {
      setIssueFeed({
        open,
        data: newIssues,
      })
    },
    [setIssueFeed]
  )

  return {
    issueFeed: data ?? defaultState,
    setIssueFeedContent,
  }
}
