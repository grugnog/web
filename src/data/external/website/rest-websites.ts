import { useIssueFeed } from '@app/data/local/useIssueFeed'
import { useSearchRest } from '@app/data/local/useSearchRest'

export const useRestWebsiteData = () => {
  const { website, ...rest } = useSearchRest()
  const { issueFeed, setIssueFeedContent } = useIssueFeed()

  return {
    setIssueFeedContent,
    issueFeed,
    data: [],
    ...rest,
  }
}
