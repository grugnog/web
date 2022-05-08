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
  // issues only TODO: MOVE TO SEPERATE PROVIDER
  issueData: [],
  issueDataLoading: false,
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
  scanWebsite: (_: any): Promise<any> => {
    return _
  },
}
