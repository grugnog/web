import type { IssueData } from '@app/data/local/useIssueFeed'
import { ApolloError } from 'apollo-client'

export const sharedWebsiteDefaults = {
  issueFeed: { data: [] as IssueData[], open: false },
  loading: false,
  mutatationLoading: false,
  data: [],
  error: undefined as ApolloError | undefined,
  subscriptionData: {
    issueSubData: null,
  },
  refetch: (_: any): Promise<any> => {
    return _
  },
  addWebsite: (_: any): Promise<any> => {
    return _
  },
  removeWebsite: (_: any): Promise<any> => {
    return _
  },
  crawlWebsite: (_: any): Promise<any> => {
    return _
  },
  updateWebsite: (_: any): Promise<any> => {
    return _
  },
  setIssueFeedContent: (_: any, _open: boolean): void => {
    return _
  },
}
